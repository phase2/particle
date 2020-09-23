/**
 * Base css generation and global js logic.
 */

import './tailwind.tokens.css';

//Legacy

//Legacy CSS
import './legacy/css/footer.css';
import './legacy/css/global.css';
import './legacy/css/utc-sidebar-menu.css';
import './legacy/css/utc_department_info.css';
import './legacy/css/layout-builder.css';
import './legacy/css/off-canvas.css';
import './legacy/css/components/header/_utc_custom_header.css';
import './legacy/css/components/header/_main-navigation.css';
import './legacy/css/components/buttons/_buttons.css';
import './legacy/css/components/section/_section.css';
import './legacy/css/components/UTC-custom-blocks/_utc_blockquotes.css';
import './legacy/css/components/UTC-custom-blocks/_utc-button-group.css';
import './legacy/css/ckeditor/accordion.css';
import './legacy/css/ckeditor/jquery-overflow.css';
import './legacy/css/components/UTC-custom-blocks/_utc_employee.css';
import './legacy/css/components/card/_card.css';
import './legacy/css/components/UTC-custom-blocks/_utclib_item_card.css';
import './legacy/css/components/UTC-custom-blocks/_utclib_primo_search.css';
import './legacy/css/components/UTC-custom-blocks/_utclib_help_btn.css';
import './legacy/css/components/UTC-custom-blocks/_utclib_events_feed.css';
import './legacy/css/components/navigation/_breadcrumb.css';
import './legacy/css/components/navigation/_footer-menu.css';

import './legacy/css/information-technology/_header.css';
import './legacy/css/information-technology/_midpagewidget.css';

// import "./legacy/css/components/UTC-custom-blocks/";
// import "./legacy/css/components/field/";


//Legacy JS
import './legacy/js/utc-sidebar-menu.js';
import './legacy/js/utc-lib-chatbutton.js';
import './legacy/js/utc-lib-primosearch.js';
import './legacy/js/slick-custom-arrows.js';
// import './legacy/js/ckeditor-jquery.js';

// Export global variables.
export default {
  // Demo only, remove in practice
  GLOBAL_CONSTANT: 'particle',
};
