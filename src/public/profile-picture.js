$(document).ready(() => {
	$.get('/profile/get-profile-pic', data => {
		$('#profile-picture').attr("src", data);
	})
	// $.get('/profile/get-cover-picture', data => {
	// 	$('#cover-picture').attr("src", data);
	// })
})
