export const preview = () => `
import {defineCustomElements} from '../dist-stencil/esm/loader';
import { addDecorator, addParameters } from '@storybook/web-components'
import { withA11y } from '@storybook/addon-a11y'

defineCustomElements().then();
// Enable a11y checks for all stories
addDecorator(withA11y)

`
