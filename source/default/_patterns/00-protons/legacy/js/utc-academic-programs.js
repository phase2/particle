(function($, Drupal, drupalSettings) {
  "use strict";
  Drupal.behaviors.academicprograms = {
      attach: function(context, settings) {
        //console.log("utc-academic-programs.js is loaded.")
        
        $(window).resize(function() {
          $('.loader-box').css('color', 'hsl(' + Math.floor((window.innerWidth / 360)*100)  + ', 70%, 70%)');
        });

          if (window.location.href.indexOf("degrees-and-programs") > -1) {
            $('body').addClass('utc-programs-page');
          }
          $(window).scroll(function(){
            if ($(this).scrollTop() > 925) {
               $('.program-table thead').addClass('scrolled');
            } else {
               $('.program-table thead').removeClass('scrolled');
            }
          });
          var programHeadline = $(".utc-programs-page .program-page-title-and-crumbs");
          var programOverlay = $(".utc-programs-page .program-overlay");

          $(programOverlay).css({"z-index":"-1","opacity":".75"});
          $('.utcloadingcontainer').css("display","none");

          function ghostMainContent(){
             $(programHeadline).css('opacity','.25');
              $(programOverlay).css('z-index','2');
          }
          function unghostMainContent(){
            $(programHeadline).css('opacity','1');
            $(programOverlay).css('z-index','-1');
          }
          function togglediv(getProgramBtnDetailId) {
            $(".offscreen-program-details").each(function(){
              var detailId= $(this).attr('id');
              if (detailId == getProgramBtnDetailId){
                $('.offscreen-program-details').css('right','-650px').removeClass('detail-open');
                $(this).css('right','0').addClass('detail-open');
              } 
              ghostMainContent();
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
          $(document).mouseup(function (e) {
            if ($(e.target).
                closest(".offscreen-program-details").
                length=== 0) {
                $(".offscreen-program-details").css("right","-650px");
                unghostMainContent();
            }
          }); 
          $('.utc-programs-page').each(function(){
            $(this).find( ".offscreen-program-details" ).wrapAll( "<div class='program-window'></div>" );
          });
          //create toggle button
          $('.form-item-field-online-available-value label').remove();
          $('.form-item-field-online-available-value input').wrapAll( "<label class='toggle'></label>");
          $('<div class="slider"></div>').insertAfter($('.form-item-field-online-available-value input'));

          
      }
  };
}(jQuery, Drupal, drupalSettings));
