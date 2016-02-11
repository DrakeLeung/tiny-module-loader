/**
 * currentModule: save the module in current callstack
 */
let currentModule = null

/**
 * getModule: return a module object, after execute the code string
 *
 * @param string $code [a code string fetched from a file]
 * @return object
 */
export const getModule = code => {
  let module = {
    exports: null,
    exported: false,
    onExport: []
  }

  currentModule = module
  new Function ('', code)() // work with eval(), as well

  return module
}

export {
  currentModule,
  getModule
}
