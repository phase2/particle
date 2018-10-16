/**
 * Fontawesome Javascript SVG api
 *
 * https://fontawesome.com/how-to-use/with-the-api/setup/getting-started
 */

import { library, dom } from '@fortawesome/fontawesome-svg-core';
// Import specific icons required
import {
  faUserAstronaut,
  faRocket,
  faSpaceShuttle,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

// Add specific icons required
library.add(faUserAstronaut, faRocket, faSpaceShuttle, faUser);

// Replace any existing <i> tags with <svg> and set up a MutationObserver to
// continue doing this as the DOM changes.
export default () => dom.watch();
