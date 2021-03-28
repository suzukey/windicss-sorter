// import findUp from 'find-up'
import { Config } from 'windicss/types/interfaces'

export function resolveConfig(): Config {
  return {}
}

// function readConfig(path?: string): NodeRequire | undefined {
//   if (path === undefined) {
//     path = findUp.sync('tailwind.config.js', {
//       cwd: __dirname,
//     })
//     if (!path) return
//   }

//   return require(path)
// }
