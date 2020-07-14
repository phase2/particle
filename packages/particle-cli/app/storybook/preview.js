import { addDecorator, addParameters } from '@storybook/react'
import { withA11y } from '@storybook/addon-a11y'

// Enable a11y checks for all stories
addDecorator(withA11y)

// sorts stories alphebetically
addParameters({
  options: {
    storySort: (a: any, b: any) =>
      a[1].kind === b[1].kind
        ? 0
        : a[1].id.localeCompare(b[1].id, undefined, { numeric: true }),
  },
})
