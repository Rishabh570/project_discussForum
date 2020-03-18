let socket = io();
socket.on('connected', () => {
    console.log("Connected " + socket.id)
})

$(document).ready(() => {

	/*$('#form-input-submit').click(e => {
		e.preventDefault();
		const msg = $('#exampleFormControlTextarea1').val();
		let cardId=document.getElementById("cardDiv").textContent;
		$.ajax({
			url: `http://localhost:2121/chatroom/card/${cardId.substr(9)}`,
			method: 'POST',
			data: {message: msg},
			dataType: 'json'
		})
		.done((data) => {
			console.log("successfully saved message!");
		})
		.fail(err => {
			console.log("error saving message :(");
		})

	})*/
	
	$('#form-input-submit').click(function () {
		console.log('sending');
		socket.emit('send_msg', {
            user: document.getElementById("userDiv").textContent,
			message: $('#exampleFormControlTextarea1').val(),
			cardId=document.getElementById("cardDiv").textContent
        })
    })
	socket.on('recv_msg', function (data) {
        $('#msglist').append($(`<div class="message-heading">${data.user}:</div>
		<div class="message-body">${data.message} </div>
		<br>`))
    })


})
