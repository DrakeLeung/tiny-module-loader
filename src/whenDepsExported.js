/**
 * whenDepsExported: when dependency exported, export it
 *
 * @param function $cb       [callback function]
 * @param array    $deps     [dependencies array]
 * @param object   $myModule [currentModule]
 * @return object
 */
export const whenDepsExported = (cb, deps, myModule) => {
  if (!deps.every(dep => dep.exported)) return

  let args = deps.map(dep => dep.exports)
  let exports = cb.apply(null, args)

  if (myModule) {
    myModule.exports = exports
    myModule.exported = true
    myModule.onExport.forEach(f => f())
  }

  return exports
}
