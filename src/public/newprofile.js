
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
            let nameHead=document.getElementById("nameHeading");
            let maildet=document.getElementById("maildet");
            let mobdet=document.getElementById("mobdet");
            let locdet=document.getElementById("locdet");
            let profdet=document.getElementById("profdet");
            let edudet=document.getElementById("edudet");
            let socialdet=document.getElementById("socialdet");
            let hobdet=document.getElementById("hobdet");
            maildet.innerHTML=`<strong> Email: </strong> ${data.mail}`
            mobdet.innerHTML=`<strong> Mobile No.: </strong> ${data.mob}`
            locdet.innerHTML=`<strong> Address: </strong> ${data.address}`
            profdet.innerHTML=`<strong> Profession: </strong> ${data.prof}`
            edudet.innerHTML=`${data.edu}`
            socialdet.innerHTML=`${data.socialH}`
            hobdet.innerHTML=`${data.hobbies}`
            nameHead.innerText=data.name;

        }
    )
}

$(function(){

        fillData();

    let updatePersonalDet=document.getElementById("updatePersonalDet");
    updatePersonalDet.innerText="hehehe";
    $("#updatePersonalDet").click(function(){
        console.log("why post?");
        updatePersonalDet.innerText="yayaya";
        let inputMobNo=document.getElementById("inputMobNo");
        let inputState=document.getElementById("inputState");
        let inputCity=document.getElementById("inputCity");
        let inputZip=document.getElementById("inputZip");
        let inputProf=document.getElementById("inputProf");
        let inputEmail=document.getElementById("inputEmail");
        let inputName=document.getElementById("inputName");
        console.log("why post?");
        $.post(
            '/profile/update',
            {mobno:inputMobNo.val(),city:inputCity.val(),state:inputState.val(),zip:inputZip.val(),prof:inputProf.val(),
            name:inputName.val(),email:inputEmail.val()},
            function(data)
            {
                fillData();
            }
        )
    });

})
