//navbar js //

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

// navbar ends here //


// chatroom js //

let socket = io();
socket.on('connected', () => {
	console.log("Connected " + socket.id)
})


$(document).ready(() => {

    let uid;
	$.get(
		'/chatroom/card/data',
		function(data)
		{
			let cardId=document.getElementById("cardDiv");
			cardId.textContent = "Card ID: "+data.cardDet.cid;
			let user = document.getElementById("userDiv");
			user.textContent = "USER ID: "+data.user;
			let initiator = document.getElementById("initiator");
			initiator.textContent = "Initiator:"+data.initiator;
			let keywords = document.getElementById("keywords");
			keywords.textContent="keywords: "+data.cardDet.keywords;
			let  Description = document.getElementById("Description");
			Description.textContent = "Description :"+data.cardDet.description;
			let msgList = document.getElementById('msglist');
            uid=data.uid;
			if(data != undefined && data.messages != undefined) {
				let loadedmsg="";
				data.messages.forEach(msg => {
					const content = `
						<div class="message" onclick="window.location.href='/profile/others/${msg.uid}'">
							<p><strong>@${msg.author}: </strong></p>
							<p>${msg.message}</p>
							<br>
						</div>`;

					loadedmsg += content;
				});
				msgList.innerHTML=loadedmsg;

			}
            socket.emit('send_msg', {
                user: data.user,
                message:"inc#U",
                cardId:data.cardDet.cid,
                uid:uid
            })

		}
    )
    let notiSection=$('#notiSection');
    $.get(
        '/card/notifications',
        function(data){
            notiSection.empty();
            for(let row of data){
                notiSection.append(` <li onclick="window.location.href='/chatroom/card/${row}'"> 
                <div class="notify_data">
                  <div class="title"> chat id: ${row}  </div>
                  <div class="sub_title"> has unseen messages </div>
                </div>
              </li>  `);
            }
            notiSection.append(`<li class="show_all">
            <p class="link">Show All Activities</p>
          </li> `);
        }
    )




	$('#sendbtn').click(function () {
		let cardId=document.getElementById("cardDiv").textContent;
		let user=document.getElementById("userDiv").textContent;
		socket.emit('send_msg', {
            user: user.substr(9),
			message: $('#exampleFormControlTextarea1').val(),
            cardId:cardId.substr(9),
            uid:uid
        })
    })
	socket.on('recv_msg', function (data) {
        let acitveId = document.getElementById("activeId");
        let cardId=document.getElementById("cardDiv").textContent;
        let usersactive = data.activeId;
        acitveId.textContent = "Active users: " + usersactive;
        cardId=cardId.substr(9);
        cardId=parseInt(cardId)  
        if(data.message != "inc#U" && data.cardId==cardId) {
        	$('#msglist').append($(`<div class="message-heading"  onclick="window.location.href='/profile/others/${data.uid}'" ><strong>@${data.user}:</strong></div>
			<div class="message-body">${data.message} </div><br>`))
		}
    })


})

// chatroom js ends here //
