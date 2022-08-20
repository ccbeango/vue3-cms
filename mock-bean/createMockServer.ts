import fg from 'fast-glob'
import { build } from 'esbuild'
import path from 'path'
import module from 'module'
import chokidar from 'chokidar'
import URL from 'url'
import { pathToRegexp, match, MatchResult } from 'path-to-regexp'

import type { IncomingMessage, NextHandleFunction } from 'connect'

import type {
  MockOptions,
  MockMethod,
  NodeModuleWithCompile,
  RespThisType,
  Recordable
} from './types'
import { isFunction, isObject } from './utils'

let mockData: MockMethod[] = []

function loggerOutput(
  title: string,
  msg: string,
  type: 'info' | 'error' = 'info'
) {
  const tag = type === 'info' ? `[vite:mock]` : `[vite:mock-error]`
  return console.log(
    `${new Date().toLocaleTimeString()} ${tag} ${title} ${msg}`
  )
}

export async function createMockServer(options: MockOptions) {
  // appEntry?: string
  // mockPath?: string
  // configPath?: string
  // ignore?: RegExp | ((fileName: string) => boolean)
  // watch?: boolean
  // localEnabled?: boolean
  // prodEnabled?: boolean
  // logger?: boolean
  // options = {
  //   mockPath: 'mock2',
  //   watch: true,
  //   logger: true,
  //   ...options
  // }

  const { mockPath = 'mock2', watch = true, logger = true } = options

  if (mockData.length > 0) return
  const absMockPath = path.join(process.cwd(), mockPath || '')

  mockData = await getMockConfig(absMockPath)
  createWatch({ watch, logger, absMockPath })
}

function createWatch(options: {
  watch: boolean
  logger: boolean
  absMockPath: string
}) {
  const { watch, logger, absMockPath } = options

  if (!watch) return
  const watchDir = [absMockPath]

  const watcher = chokidar.watch(watchDir, {
    ignoreInitial: true
  })

  watcher.on('all', async (event, file) => {
    logger && loggerOutput(`bean mock file ${event}`, file)
    mockData = await getMockConfig(absMockPath)
  })
}

function cleanRequireCache(absMockPath: string) {
  if (!require.cache) return
  Object.keys(require).forEach(file => {
    if (file === absMockPath || !!~file.indexOf(absMockPath)) {
      Reflect.deleteProperty(require.cache, file)
    }
  })
}

async function getMockConfig(absMockPath: string) {
  cleanRequireCache(absMockPath)

  const mockFilenameList = fg
    .sync('**/*Mock.{ts,js}', { cwd: absMockPath })
    .map(filename => path.join(absMockPath, filename))

  let ret: MockMethod[] = []
  try {
    const mockConfigList = await resolveModule(mockFilenameList)
    ret = ret.concat(...mockConfigList)
  } catch (error) {
    loggerOutput('mock reload error', error)
    ret = []
  }

  return ret
}

async function resolveModule(path: string[]) {
  // compile ts to js
  const result = await build({
    entryPoints: path,
    outdir: 'outdir',
    write: false,
    platform: 'node',
    bundle: true,
    format: 'cjs',
    metafile: true,
    target: 'es2015'
  })

  return result.outputFiles.map((item, index) =>
    loadMockConfigFromBundledFile(path[index], item.text)
  )
}

// 加载定义的Mock接口配置文件
function loadMockConfigFromBundledFile(fileName: string, bundledCode: string) {
  const extension = path.extname(fileName)
  // @ts-expect-error 该字段解析错误
  const extensions = module.Module._extensions

  const loaderExt = extension in extensions ? extension : '.js'
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const defaultLoader = extensions[loaderExt]!

  // 通过Module._extensions重写模块加载策略
  // 将esbuild生成的代码编译成可执行模块
  extensions[loaderExt] = (module: NodeModule, filename: string) => {
    if (filename === fileName) {
      ;(module as NodeModuleWithCompile)._compile(bundledCode, filename)
    } else {
      defaultLoader(module, filename)
    }
  }

  if (require && require.cache) {
    Reflect.deleteProperty(require.cache, fileName)
  }
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const raw = require(fileName)
  extensions[loaderExt] = defaultLoader

  return raw.__esModule ? raw.default : raw
}

function parseJson(req: IncomingMessage): Promise<Recordable> {
  return new Promise(resolve => {
    let body = ''
    let jsonStr = ''
    req.on('data', chunk => {
      body += chunk
    })
    req.on('end', () => {
      try {
        jsonStr = JSON.parse(body)
      } catch (error) {
        jsonStr = ''
      }
      resolve(jsonStr as any)
    })
  })
}

function sleep(time: number) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('')
    }, time)
  })
}

export async function requestMiddleware(options: any) {
  const { logger = true } = options

  const middleware: NextHandleFunction = async (req, res, next) => {
    let queryParams: URL.UrlWithParsedQuery
    if (req.url) {
      queryParams = URL.parse(req.url, true)
    }

    const reqUrl = queryParams.pathname

    const matchRequest = mockData.find(item => {
      if (
        !item.url ||
        (item.method && item.method.toUpperCase() !== req.method)
      ) {
        return false
      }
      return pathToRegexp(item.url).test(reqUrl)
    })

    if (!matchRequest) {
      return next()
    }

    const isGet = req.method && req.method.toUpperCase() === 'GET'
    const { response, rawResponse, timeout, statusCode, url } = matchRequest

    if (timeout) {
      await sleep(timeout)
    }

    const urlMatch = match(url, {
      decode: decodeURIComponent
    })

    let query = queryParams.query
    if (reqUrl) {
      if ((isGet && JSON.stringify(query) === '{}') || !isGet) {
        const mathResult = urlMatch(reqUrl) as MatchResult
        const params = mathResult.params
        if (JSON.stringify(params) !== '{}') {
          query = (urlMatch(reqUrl) as any).params || {}
        } else {
          query = queryParams.query || {}
        }
      }
    }

    const self: RespThisType = {
      req,
      res,
      parseJson: parseJson.bind(null, req)
    }
    if (isFunction(rawResponse)) {
      await rawResponse.bind(self)(req, res)
    } else {
      const body = await parseJson(req)
      res.setHeader('Content-Type', 'application/json')
      res.statusCode = statusCode || 200
      const mockResponse = isFunction(response)
        ? response.bind(self)({
            url: req.url,
            body,
            query,
            headers: req.headers
          })
        : response
      res.end(JSON.stringify(mockResponse))
    }

    logger && loggerOutput('request invoke', req.url!)
    return
  }

  return middleware
}
