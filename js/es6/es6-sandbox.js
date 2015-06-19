"use strict";
{ 
    let $ = jQuery;
    // A demo Drupal behavior
    Drupal.behaviors.es6Sandbox = {
        attach: (context, settings) => {
          const es6Message = "Hello from the future!";
          console.log(es6Message);
          $("body").addClass("test-from-es6");
        }
    };
}
