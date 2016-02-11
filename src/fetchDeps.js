/**
 * fetchDeps: fetch dependencies using Ajax
 *
 * @param string $name [the url of the module]
 * @return promise object
 */
export const fetchDeps = name =>
  new Promise((resolve, reject) => {
    let req = new XMLHttpRequest()

    req.addEventListener('load', () => {
      if (req.status < 400) resolve(req.responseText)
      else reject(req.status)
    }, false)

    req.addEventListener('error', () => {
      reject(req.status)
    }, false)

    req.open('GET', name, true)
    req.send(null)
  })
