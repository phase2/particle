/**
 * Fontawesome Javascript SVG api
 *
 * https://fontawesome.com/how-to-use/with-the-api/setup/getting-started
 */

import { library, dom } from '@fortawesome/fontawesome-svg-core';

// Import specific icons required. This format applies tree-shaking
import { faUserAstronaut } from '@fortawesome/free-solid-svg-icons/faUserAstronaut';
import { faRocket } from '@fortawesome/free-solid-svg-icons/faRocket';
import { faSpaceShuttle } from '@fortawesome/free-solid-svg-icons/faSpaceShuttle';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';

// Add specific icons required
library.add(faUserAstronaut, faRocket, faSpaceShuttle, faUser);

// Replace any existing <i> tags with <svg> and set up a MutationObserver to
// continue doing this as the DOM changes.
export default () => dom.watch();
