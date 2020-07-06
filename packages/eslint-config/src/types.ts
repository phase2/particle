export interface ESLintConfig {
  extends: string[]
  plugins: string[]
  root?: boolean
  globals?: any
  env?: any
  rules: any
  overrides?: any[]
}
