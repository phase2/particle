import fs from 'fs'
import { exec } from 'child_process'

const distFolder = './dist' // add your scripts to folder named scripts
const packagesFolder = './packages'
const files = fs.readdirSync(distFolder) // reading files from folders

enum CopyFiles {
  README = 'README.md',
  PACKAGE = 'package.json',
}

/**
 * iterates through all dist packages and references the dist folder to the packages folder and grabs files unrelated to JS or TS that are required for publishing the package
 *  */

files.forEach((packageName: string) => {
  const path = `${packagesFolder}/${packageName}`
  const b = fs.readdirSync(path).forEach((item: string) => {
    if (item === CopyFiles.README || item === CopyFiles.PACKAGE) {
      exec(
        `cp ${path}/${item} ${distFolder}/${packageName}/${item}`,
        { shell: '/bin/bash' },
        (err: any, stdout: any, stderr: any) => {
          console.log(
            `successfully wrote ${path}/${item} to dist`,
            stdout,
            stderr
          )
        }
      )
    }
  })
})
