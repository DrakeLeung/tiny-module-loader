import {
  currentModule,
  getModule
} from './getModule'

import {fetchDeps} from './fetchDeps'
import {whenDepsExported} from './whenDepsExported'

/**
 * define: main function
 *
 * @param Array    $deps     [dependencies array]
 * @param function $callback [when deps loaded, execute it]
 * @return none
 */
export const define = (deps, callback) => {
  let myModule = currentModule
  const getDeps = deps.map(fetchDeps)

  Promise.all(getDeps)
    .then(codes => {
      const modules = codes.map(getModule)

      modules.forEach(m =>
        !m.exported && m.onExport.push(() =>
          whenDepsExported(callback, modules, myModule)
        )
      )

      whenDepsExported(callback, modules, myModule)
    })
    // .then(modules => whenDepsExported(callback, modules, myModule))
}
