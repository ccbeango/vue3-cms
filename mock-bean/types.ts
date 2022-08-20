import type { IncomingMessage, ServerResponse } from 'http'

export interface MockOptions {
  mockPath?: string
  watch?: boolean
  logger?: boolean
}

export interface RespThisType {
  req: IncomingMessage
  res: ServerResponse
  parseJson: () => any
}

export type Recordable<T = any> = Record<string, T>

export interface MockMethod {
  url: string
  method?: 'get' | 'post' | 'put' | 'delete' | 'patch'
  timeout?: number
  statusCode?: number
  response?:
    | ((
        this: RespThisType,
        opt: {
          url: Recordable
          body: Recordable
          query: Recordable
          headers: Recordable
        }
      ) => any)
    | any
  rawResponse?: (
    this: RespThisType,
    req: IncomingMessage,
    res: ServerResponse
  ) => void
}

export interface NodeModuleWithCompile extends NodeModule {
  _compile(code: string, filename: string): any
}
