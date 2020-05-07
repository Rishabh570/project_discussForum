
var window_height;
var window_width;
var navbar_initialized = false;
var nav_toggle;

var offCanvas = {
    sidenav: {
        // Sidenav is not visible by default.
        // Change to 1 if necessary
        sidenav_visible: 0
    },
    initSideNav: function initSideNav() {
        if (!navbar_initialized) {
            var $nav = $('nav');

            // Add the offcanvas class to the navbar if it's not initialized
            $nav.addClass('navbar-offcanvas');

            // Clone relevant navbars
            var $navtop = $nav.find('.navbar-top').first().clone(true);
            var $navbar = $nav.find('.navbar-collapse').first().clone(true);

            // Let's start with some empty vars
            var ul_content = '';
            var top_content = '';

            // Set min-height of the new sidebar to the screen height
            $navbar.css('min-height', window.screen.height);

            // Take the content of .navbar-top
            $navtop.each(function() {
                var navtop_content = $(this).html();
                top_content = top_content + navtop_content;
            });

            // Take the content of .navbar-collapse
            $navbar.children('ul').each(function() {
                var nav_content = $(this).html();
                ul_content = ul_content + nav_content;
            });

            // Wrap the new content inside an <ul>
            ul_content = '<ul class="navbar-nav sidebar-nav">' + ul_content + '</ul>';

            // Insert the html content into our cloned content
            $navbar.html(ul_content);
            $navtop.html(top_content);

            // Append the navbar to body,
            // and insert the content of the navicons navbar just below the logo/nav-image
            $('body').append($navbar);
            $('.nav-image').after($navtop);


            // Set the toggle-variable to the Bootstrap navbar-toggler button
            var $toggle = $('.navbar-toggler');

            // Add/remove classes on toggle and set the visiblity of the sidenav,
            // and append the overlay. Also if the user clicks the overlay,
            // the sidebar will close
            $toggle.on('click', function () {
                if (offCanvas.sidenav.sidenav_visible == 1) {
                    $('html').removeClass('nav-open');
                    offCanvas.sidenav.sidenav_visible = 0;
                    $('#overlay').remove();
                    setTimeout(function() {
                        $toggle.removeClass('toggled');
                    }, 300);
                } else {
                    setTimeout(function() {
                        $toggle.addClass('toggled');
                    }, 300);

                    // Add the overlay and make it close the sidenav on click
                    var div = '<div id="overlay"></div>';
                    $(div).appendTo("body").on('click', function() {
                        $('html').removeClass('nav-open');
                        offCanvas.sidenav.sidenav_visible = 0;
                        $('#overlay').remove();
                        setTimeout(function() {
                            $toggle.removeClass('toggled');
                        }, 300);
                    });

                    $('html').addClass('nav-open');
                    offCanvas.sidenav.sidenav_visible = 1;
                }
            });
            // Set navbar to initialized
            navbar_initialized = true;
        }
    }
};

$(document).ready(function () {
    window_width = $(window).width();

    nav_toggle = $('nav').hasClass('navbar-offcanvas') ? true : false;

    // Responsive checks
    if (window_width < 992 || nav_toggle) {
        offCanvas.initSideNav();
    }

    // Close the sidebar if the user clicks a link or a dropdown-item,
    // and close the sidebar
    $('.nav-link:not(.dropdown-toggle), .dropdown-item').on('click', function () {
        var $toggle = $('.navbar-toggler');

        $('html').removeClass('nav-open');
        offCanvas.sidenav.sidenav_visible = 0;
        setTimeout(function () {
            $toggle.removeClass('toggled');
        }, 300);
    });
});

$(window).resize(function () {
    window_width = $(window).width();

    // More responsive checks if the user resize the browser
    if (window_width < 992) {
        offCanvas.initSideNav();
    }

    if (window_width > 992 && !nav_toggle) {
        $('nav').removeClass('navbar-offcanvas');
        offCanvas.sidenav.sidenav_visible = 1;
        navbar_initialized = false;
    }
});

// Accordian JS

$(document).on("click", ".naccs .menu div", function() {
    var numberIndex = $(this).index();

    if (!$(this).is("active")) {
        $(".naccs .menu div").removeClass("active");
        $(".naccs ul li").removeClass("active");

        $(this).addClass("active");
        $(".naccs ul").find("li:eq(" + numberIndex + ")").addClass("active");

        var listItemHeight = $(".naccs ul")
            .find("li:eq(" + numberIndex + ")")
            .innerHeight();
        $(".naccs ul").height(listItemHeight + "px");
    }
});

function fillData()
{
    $.get(  '/profile/data',
        function(data)
        {
            let nameHead=document.getElementById("nameHeading");      let maildet=document.getElementById("maildet");
            let mobdet=document.getElementById("mobdet");             let locdet=document.getElementById("locdet");
            let profdet=document.getElementById("profdet");           let faceDet=document.getElementById("faceDet");
            let linkDet=document.getElementById("linkDet");           let instaDet=document.getElementById("instaDet");
            let schDet=document.getElementById("schDet");             let hobdet=document.getElementById("hobdet");
            let inputMobNo=document.getElementById("inputMobNo");     let inputState=document.getElementById("inputState");
            let inputCity=document.getElementById("inputCity");       let inputZip=document.getElementById("inputZip");
            let inputProf=document.getElementById("inputProf");       let inputEmail=document.getElementById("inputEmail");
            let inputFName=document.getElementById("inputFName");     let inputColDet=document.getElementById("inputColDet");
            let inputHobDet=document.getElementById("inputHobDet");   let inputSchDet=document.getElementById("inputSchDet");
            let inputLName=document.getElementById("inputLName");     let inputLinkDet=document.getElementById("inputLinkDet");
            let inputFaceDet=document.getElementById("inputFaceDet"); let inputInstaDet=document.getElementById("inputInstaDet");
            let colDet=document.getElementById("colDet");              let inputBioDet=document.getElementById("inputBio");
            let bioDet=document.getElementById("bio");
            maildet.innerHTML=`<strong> Email: </strong> ${data.mail}`
            mobdet.innerHTML=`<strong> Mobile No.: </strong> ${data.mob}`
            locdet.innerHTML=`<strong> Address: </strong> ${data.city} , ${data.state}`
            profdet.innerHTML=`<strong> Profession: </strong> ${data.prof}`
            schDet.innerHTML=`<strong> High School: </strong> ${data.schDet}`
            colDet.innerHTML=`<strong> College: </strong> ${data.colDet}`
            linkDet.innerHTML=`<strong> LinkedIn: </strong> <a>${data.linkDet}</a>`
            instaDet.innerHTML=`<strong> Instagram: </strong> <a>${data.instaDet}</a>`
            faceDet.innerHTML=`<strong> Facebook: </strong> <a>${data.faceDet}</a>`
            bioDet.innerHTML=`${data.bioDet}`;
            hobdet.innerHTML=`${data.hobbies}`;
            inputBioDet.value=data.bioDet;
            nameHead.innerText=data.fname+" "+data.lname;   inputMobNo.value=data.mob;
            inputFName.value=data.fname;                          inputLName.value=data.lname;
            inputCity.value=data.city;                      inputState.value=data.state;
            inputZip.value=data.zip;                        inputProf.value=data.prof;
            inputEmail.value=data.mail;                     inputHobDet.value=data.hobbies;
            inputFaceDet.value=data.faceDet;                inputLinkDet.value=data.linkDet;
            inputInstaDet.value=data.instaDet;              inputSchDet.value=data.schDet; 
            inputColDet.value=data.colDet;
        }
    )
}

$(function(){

    fillData();
    $("#updatePersonalDet").click(function(){
      
        let inputMobNo=document.getElementById("inputMobNo");       let inputState=document.getElementById("inputState");
        let inputCity=document.getElementById("inputCity");         let inputZip=document.getElementById("inputZip");
        let inputProf=document.getElementById("inputProf");         let inputEmail=document.getElementById("inputEmail");
        let inputFName=document.getElementById("inputFName");       let inputLName=document.getElementById("inputLName");

        $.post(
            '/profile/updatePersonalDet',
            {   mobno:inputMobNo.value,    city:inputCity.value,   state:inputState.value, zip:inputZip.value,prof:inputProf.value,
                firstName:inputFName.value, lastName:inputLName.value ,  email:inputEmail.value},
            function(data)
            {
                fillData();
            }
        )
    });
    $("#updateHobDet").click(function(){
      
        let inputHobbies=document.getElementById("inputHobDet");   
        $.post(
            '/profile/updateHobDet',
            {    hobbies:inputHobbies.value },
            function(data)
            {   fillData(); }
        )
    });
    $("#updateSocialHDet").click(function(){
      
        let inputLinkDet=document.getElementById("inputLinkDet");  
        let inputInstaDet=document.getElementById("inputInstaDet");  
        let inputFaceDet=document.getElementById("inputFaceDet");  
       
        $.post(
            '/profile/updateSocialHDet',
            {    faceDet:inputFaceDet.value, linkDet:inputLinkDet.value, instaDet:inputInstaDet.value},
            function(data)
            {   fillData(); }
        )
    });
    $("#updateEduDet").click(function(){
      
        let inputColDet=document.getElementById("inputColDet");   
        let inputSchDet=document.getElementById("inputSchDet");   
       
        $.post(
            '/profile/updateEduDet',
            {    colDet:inputColDet.value, schDet:inputSchDet.value },
            function(data)
            {   fillData(); }
        )
    });

    $('#updateBio').click(function(){
        let inputBioDet=document.getElementById("inputBio");
        $.post(
            '/profile/updateBioDet',
            {    bioDet:inputBioDet.value },
            function(data)
            {   fillData(); }
        )
    })
})
