(function($, Drupal, drupalSettings) {
    "use strict";

    Drupal.behaviors.topworkbenchmenu = {
        attach: function(context, settings) {

            /***get the workbench's footer homepage link and turn twm block title into a home link.****/
            var homepage = document.querySelector('.department-info-- .social-media-links--platforms a[title="Back to our departmental homepage"]');
            var homepageHref = homepage.href;
            var twmBlockTitle = document.querySelector('.region-top-workbench-menu .block__title');
            var twmBlockTitleSpan = document.querySelector('.region-top-workbench-menu .block__title .title-text');
            var twmBlockTitleText = twmBlockTitleSpan.textContent;
            var replacementBlockTitleHTML = '<a href="'+ homepageHref +'" title="'+ twmBlockTitleText +'" class="homepage-link" ><span class="title-text">'+ twmBlockTitleText +'</a>';
            twmBlockTitle.innerHTML = replacementBlockTitleHTML ;

            /***define the needles***/
            var handshake = "Handshake";
            var facebook = "Facebook";
            var twitter = "Twitter";
            var instagram = "Instagram";
            var linkedin = "LinkedIn";
            var youtube = "YouTube";
            var blog = "Blog";

            /***define the haystacks***/
            var haystack = document.querySelectorAll(".twm-link");
            var i;

            /***find the needles in the haystack and add social icons***/
            for (i = 0; i < haystack.length; i++) {
                if(haystack[i].innerHTML == handshake){
                    haystack[i].insertAdjacentHTML("afterbegin", '<span style="width:21px;display:inline-block"><img src="/sites/default/files/2023-02/handshake.png" style="height:15px;width:auto;display:inline;margin-top:-6px"></span>');
                }else if(haystack[i].innerHTML == facebook){
                   haystack[i].insertAdjacentHTML("afterbegin", '<span style="width:21px;display:inline-block"><i class="fa-brands fa-facebook-f"></i></span>');
                }else if(haystack[i].innerHTML == twitter){
                    haystack[i].insertAdjacentHTML("afterbegin", '<span style="width:21px;display:inline-block"><i class="fa-brands fa-twitter"></i></span>');
                }else if(haystack[i].innerHTML == instagram){
                    haystack[i].insertAdjacentHTML("afterbegin", '<span style="width:21px;display:inline-block"><i class="fa-brands fa-instagram"></i></span>');
                }else if(haystack[i].innerHTML == linkedin){
                    haystack[i].insertAdjacentHTML("afterbegin", '<span style="width:21px;display:inline-block"><i class="fa-brands fa-linkedin-in"></i></span>');
                }else if(haystack[i].innerHTML == youtube){
                    haystack[i].insertAdjacentHTML("afterbegin", '<span style="width:21px;display:inline-block"><i class="fa-brands fa-youtube"></i></span>');
                }else if(haystack[i].innerHTML.indexOf(blog) !== -1){
                    haystack[i].insertAdjacentHTML("afterbegin", '<span style="width:21px;display:inline-block"><i class="fa-solid fa-blog"></i></span>');
                }
            }
        }
    };
}(jQuery, Drupal, drupalSettings));