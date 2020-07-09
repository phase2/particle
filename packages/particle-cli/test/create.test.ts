// import mock from 'mock-fs'
// @ts-ignore
import mockSpawn from 'mock-spawn'

import create from '../src/create'
import repoPackage from '../package.json'

const spawn = mockSpawn()
require('child_process').spawn = spawn

const { name } = repoPackage
describe(`${name}/create`, () => {
  it('show log', () => {
    expect(create({})).toBeTruthy()
  })
})
