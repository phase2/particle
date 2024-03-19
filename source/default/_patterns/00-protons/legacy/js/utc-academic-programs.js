

(function($, Drupal, drupalSettings) {
    "use strict";
    Drupal.behaviors.academicprograms = {
        attach: function(context, settings) {
          //console.log("utc-academic-programs.js is loaded.")
            if (document.location.pathname.indexOf("/academic-affairs/registrar/utc-programs") == 0) {
                document.body.className = "utc-programs-page";
            }
            
            var programOverlay = document.querySelector(".utc-programs-page .program-overlay");

            $(programOverlay).css({"z-index":"-1","opacity":".75"});
            $('.utcloadingcontainer').css("display","none");

            function ghostMainContent(){
                programOverlay.style.zIndex= "2";
            }
            function unghostMainContent(){
                programOverlay.style.zIndex= "-1";
            }
            function togglediv(id) {
              document.querySelectorAll(".offscreen-program-details").forEach(function(div) {
                if (div.id == id) {
                  // Toggle specified DIV
                  div.style.right = div.style.right == "0" ? "-650px" : "0";
                } else {
                  // Hide other DIVs
                  div.style.right = "-650px";
                }
                ghostMainContent()
              });
            }
            $(".program-btn").each(function(){
              var getProgramBtnDetailId = $(this).attr('data-src');
              $(this).on("click",function(){
                togglediv(getProgramBtnDetailId);
              });
            });
            $(".close-btn").each(function(){
              var parentId = $(this).closest('.offscreen-program-details').attr('id');
              $(this).on("click",function(){
                $("#"+parentId).css("right","-650px");
                unghostMainContent();
              });
            });
        }
    };
}(jQuery, Drupal, drupalSettings));
  