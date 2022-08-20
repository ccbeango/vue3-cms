function is(val: any, type: string) {
  return Object.prototype.toString.call(val) === `[object ${type}]`
}

export function isArray(val: unknown): val is Array<any> {
  return val && Array.isArray(val)
}

// eslint-disable-next-line
export function isFunction<T = Function>(val: unknown): val is T {
  return is(val, 'Function') || is(val, 'AsyncFunction')
}

export function isRegExp(val: unknown): val is RegExp {
  return is(val, 'RegExp')
}

export function isObject(val: unknown): val is Record<any, any> {
  return is(val, 'Object')
}
