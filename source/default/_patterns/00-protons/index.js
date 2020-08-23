/**
 * Base css generation and global js logic.
 */

import './tailwind.tokens.css';

//Legacy

//Legacy CSS
import './legacy/css/footer.css';
import "./legacy/css/global.css";
import "./legacy/css/utc-sidebar-menu.css";
import "./legacy/css/utc_department_info.css";

//Legacy JS
import './legacy/js/utc-sidebar-menu.js';

// Export global variables.
export default {
  // Demo only, remove in practice
  GLOBAL_CONSTANT: 'particle',
};
