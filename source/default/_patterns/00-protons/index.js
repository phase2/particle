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
import "./legacy/css/layout-builder.css";
import "./legacy/css/off-canvas.css";
import "./legacy/css/components/header/_utc_custom_header.css";
import "./legacy/css/components/header/_main-navigation.css";
// import "./legacy/css/components/field/";


//Legacy JS
import './legacy/js/utc-sidebar-menu.js';

// Export global variables.
export default {
  // Demo only, remove in practice
  GLOBAL_CONSTANT: 'particle',
};
