/*------------------------------------------------------------------
Theme Name: Shuttle
Theme URL: http://codnauts.com
Author: Codnauts
Author URI: http://themeforest.net/user/codnauts
Version: 1.0
License: Regular or Extended from ThemeForest only
Plugin Licenses: GPL or MIT
Last change: first release
Primary use: App & Mobile Website  
-------------------------------------------------------------------*/

// Adding strict mode
"use strict";

// This script prevents links from opening in Mobile Safari. https://gist.github.com/1042026
(function(a, b, c) {
	if (c in b && b[c]) {
		var d, e = a.location,
			f = /^(a|html)$/i;
		a.addEventListener("click", function(a) {
			d = a.target;
			while (!f.test(d.nodeName)) d = d.parentNode;
			"href" in d && (d.href.indexOf("http") || ~d.href.indexOf(e.host)) && (a.preventDefault(), e.href = d.href)
		}, !1)
	}
})(document, window.navigator, "standalone")

// Tabs
$('ul.tabs').tabs();

// Modal
$('.modal-trigger').leanModal();

// Accordion
$('.collapsible').collapsible({
    accordion: true
});

// Drag
$('.drag-target').remove();

// Right Sidebar
$('#open-right').sideNav({ // Trigger id
    menuWidth: 280, // Default is 240
    edge: 'right', // Choose the horizontal origin
    closeOnClick: false // Closes side-nav on <a> clicks, useful for Angular/Meteor
});

// Left Sidebar
$('#open-left').sideNav({ // Trigger id
    menuWidth: 280, // Default is 240
    edge: 'left', // Choose the horizontal origin
    closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
});

// Swipebox
$('.swipebox').swipebox();

// Masonry
$('.grid').masonry({
    itemSelector: '.grid-item'
});

// Reinitialize masonry inside each panel after the relative tab link is clicked - 
$('.tab a').on('click', function() {
  // do async to allow menu to open
  setTimeout( function() {
     $('.grid').masonry({
    itemSelector: '.grid-item'
     }, 1);
  });
});

// Material Layout
$('.parallax').parallax();
$(function () {
    var hBanner = $('.hero-material').height();
    var cbHeight = hBanner - 86;
    var hHeight = hBanner - 86; // for Title
    $(window).scroll(function () {
        var scroll = $(window).scrollTop();
        if (scroll >= cbHeight) {
            $(".nav-material").addClass('nav-bg');
        }
        if (scroll <= cbHeight) {
            $(".nav-material").removeClass('nav-bg');
        }
        // For heading Title
        if (scroll >= hHeight) {
            $(".banner-title").hide();
            $(".nav-material .title").show();
        }
        if (scroll <= hHeight) {
            $(".banner-title").show();
            $(".nav-material .title").hide();
        }
    });
});

// Add Primary Color To Header After Scroll Down
$(function() {
    //caches a jQuery object containing the header element
    var header = $("#toolbar.transparent");
    $(window).scroll(function() {
        var scroll = $(window).scrollTop();

        if (scroll >= 350) {
            header.removeClass('transparent').addClass("primary-color");
        } else {
            header.removeClass("primary-color").addClass('transparent');
        }
    });
});

// Sliders
var swiper = new Swiper('.swiper-slider', { // Default
    pagination: '.swiper-pagination',
    paginationClickable: true,
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    autoplay: false,
    loop: true,
    paginationType: 'progress',
});

var swiper = new Swiper('.testimonials', { // Testimonial
    pagination: '.swiper-pagination',
    slidesPerView: 1,
    centeredSlides: true,
    paginationClickable: true,
    spaceBetween: 20,
    loop: true,
});

var swiper = new Swiper('.slider-sliced', { // Sliced
    pagination: '.swiper-pagination',
    slidesPerView: 1,
    centeredSlides: true,
    paginationClickable: true,
    spaceBetween: 0,
});

var swiper = new Swiper('.swiper-slider-full', { // Sliced
    pagination: '.swiper-pagination',
    slidesPerView: 1,
    centeredSlides: true,
    paginationClickable: true,
    spaceBetween: 0,
});

var swiper = new Swiper('.slider-drawer', { // Drawer
    pagination: '.swiper-pagination',
    slidesPerView: 1,
    centeredSlides: true,
    paginationClickable: true,
    spaceBetween: 0,
});

var swiper = new Swiper('.steps', { // Walkthrough
    pagination: '.swiper-pagination',
    slidesPerView: 1,
    centeredSlides: true,
    paginationClickable: true,
    spaceBetween: 0,
});

// MixItUp
$(function () {
if(localStorage.getItem("User") == '00002'){
    $("#uname").html(localStorage.getItem("User_Name"));
}
if(localStorage.getItem("User") == '00003'){
    
}
if(localStorage.getItem("User") == '00006'){
    $("#uname").html(localStorage.getItem("User_Name"));
}
//My Customized Scripts
$("#login").on("submit", function(e){
    e.preventDefault();
    var fdata = $("#login").serialize();
    $.ajax({
       url:"http://apkser.laksanasoft.com/",
       data:fdata,
       type:"GET",
       beforeSend:function(){
        $("#preloader").show();
        $("#emsg").hide();
       },
       success: function(str){
       console.log(str);
       $("#preloader").hide();
       if(str.Status == 'Active'){
        if(str.Roll_Id == '00002'){
        localStorage.setItem("Role",'SR');
        localStorage.setItem("User",str.Roll_Id);
        localStorage.setItem("Emp_Code",str.Emp_Code);
        localStorage.setItem("User_Name",str.User_Name);
        location.href="Screen_SR.html";
         }

        if(str.Roll_Id == '00003'){
        localStorage.setItem("Role",'SM');
        localStorage.setItem("User",str.Roll_Id);
        localStorage.setItem("Emp_Code",str.Emp_Code);
        localStorage.setItem("User_Name",str.User_Name);
        location.href="Screen_SM.html";
         }

        if(str.Roll_Id == '00006'){
        localStorage.setItem("Role",'DB');
        localStorage.setItem("User",str.Roll_Id);
        localStorage.setItem("Customer_Code",str.Customer_Id);
        localStorage.setItem("User_Name",str.Customer_Name);
        location.href="Screen_DB.html";
         }

       }else{
         $("#emsg").show();
         $("#login")[0].reset();
       }
       }
    });
});
//My Customized Scripts Close
    var layout = 'grid', // Store the current layout as a variable
        $container = $('#filter'), // Cache the MixItUp container
        $changeLayout = $('#ChangeLayout'); // Cache the changeLayout button
    // Instantiate MixItUp with some custom options:
    $container.mixItUp({
        animation: {
            animateChangeLayout: true, // Animate the positions of targets as the layout changes
            animateResizeTargets: true, // Animate the width/height of targets as the layout changes
            effects: 'fade rotateX(-40deg) translateZ(-100px)'
        },
        layout: {
            containerClass: 'grid' // Add the class 'list' to the container on load
        }
    });
    // MixItUp does not provide a default "change layout" button, so we need to make our own and bind it with a click handler:
    $changeLayout.on('click', function () {
        // If the current layout is a list, change to grid:
        if (layout == 'grid') {
            layout = 'list';
            $changeLayout.text('Grid'); // Update the button text
            $container.mixItUp('changeLayout', {
                containerClass: layout // change the container class to "grid"
            });
            // Else if the current layout is a grid, change to list:  
        } else {
            layout = 'grid';
            $changeLayout.text('List'); // Update the button text
            $container.mixItUp('changeLayout', {
                containerClass: layout // Change the container class to 'list'
            });
        }
    });
  
    // init swiper layout
    window.onload = function () {
        setTimeout(function () {
            ResizeHandler = ResizeHandler || function () { };
            ResizeHandler();
        }, 500)
    };

});

function showProducts(igroup){
        var fdata = {"Group_Id":igroup};
        $.ajax({
           url:"http://apkser.laksanasoft.com/Login/getproductsbyid",
           type:"GET",
           data:fdata,
           beforeSend:function(str){
             $("#ploader").show();
           },
           success: function(data){
             var toAppend='';
             $("#product").empty();
            if(data.length > 0){
              $("#ploader").hide();
             $.each(data,function(i,o){
               $("#sdata").show();
//toAppend += '<li onclick="addItems(\''+o.Item_Code+'\',\''+o.Item_Name+'\',\''+o.No_Of_Unit_Per_Case+'\',\''+o.No_Of_Packs+'\',\''+o.Weight+'\',\''+o.Case_Units+'\',\''+o.Price+'\');">'+o.Item_Name+'</li>';
//toAppend += '<option value="'+o.Item_Code+','+o.Item_Name+','+o.No_Of_Unit_Per_Case+','+o.No_Of_Packs+','+o.Weight+','+o.Case_Units+','+o.Price+'">'+o.Item_Name+'</option>';
toAppend += '<option value="'+o.Item_Code+'">'+o.Item_Name+'</option>';
                    });
                    $("#product").append(toAppend);
            }else{
                $("#sdata").hide();
            }
           }
        });
    }
    function doOperation(data){
      console.log(data);
      var fdata = {"Item_Code":data};
      $.ajax({
         url:"http://apkser.laksanasoft.com/Login/getiteminfobyid",
         data:fdata,
         type:"GET",
         success: function(str){
           console.log(str);
           $("#itemname").val(str[0].Item_Name);
           $("#qtyunits").val(str[0].No_Of_Unit_Per_Case);
           $("#qtypacks").val(str[0].No_Of_Packs);
           $("#price").val(str[0].Price);
           $("#weight").val(str[0].Weight);
           $("#actualqty").val(str[0].No_Of_Unit_Per_Case);
           $("#perbox").val(str[0].Per);
           $("#taxrate").val(str[0].Taxrate);
           $("#itemcode").val(data);
         }
      });

    }

function logout(){
localStorage.removeItem("Role");
localStorage.removeItem("User");
localStorage.removeItem("Emp_Code");
localStorage.removeItem("User_Name");
location.href="index.html";
}