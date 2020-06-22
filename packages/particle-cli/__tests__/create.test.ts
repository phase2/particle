import create from '../lib/create'
import repoPackage from '../package.json'

const { name } = repoPackage

describe(`${name}/create`, () => {
  it('show log', () => {
    expect(create()).toBeTruthy()
  })
})
