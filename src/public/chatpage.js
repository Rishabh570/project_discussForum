let socket = io();
socket.on('connected', () => {
	console.log("Connected " + socket.id)
})


$(document).ready(() => {
	console.log("chatpage loaded...");
	$.get(
		'/chatroom/card/data',
		function(data)
		{
			console.log("dataaaaaaa = ", data);
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
			data.messages.forEach(msg => {
				const content = `\
					<div class="message">\
						<p><strong>@${msg.author}: </strong></p>\
						<p>${msg.message}</p>\
						<br>\
					</div>\
				`;

				msgList.innerHTML += content;
			});

		}
	)

	$('#form-input-submit').click(function () {
		let cardId=document.getElementById("cardDiv").textContent;
		let user=document.getElementById("userDiv").textContent;
		socket.emit('send_msg', {
            user: user.substr(9),
			message: $('#exampleFormControlTextarea1').val(),
			cardId:cardId.substr(9)
        })
    })
	socket.on('recv_msg', function (data) {

        $('#msglist').append($(`<div class="message-heading">${data.user}:</div>
		<div class="message-body">${data.message} </div>
		<br>`))
    })


})
