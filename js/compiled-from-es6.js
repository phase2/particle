"use strict";
{
    (function () {
        var $ = jQuery;
        // A demo Drupal behavior
        Drupal.behaviors.es6Sandbox = {
            attach: function attach(context, settings) {
                var es6Message = "Hello from the future!";
                console.log(es6Message);
                $("body").addClass("test-from-es6");
            }
        };
    })();
}
//# sourceMappingURL=compiled-from-es6.js.map
