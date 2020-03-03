$(document).ready(() => {

	$('#form-input-submit').click(e => {
		e.preventDefault();
		console.log("Chat Submit button clicked!")
		const msg = $('#exampleFormControlTextarea1').val();
		let cardId=document.getElementById("cardDiv").textContent;
		$.ajax({
			url: `chatroom/card/${cardId.substr(9)}`, 			// yaha "card/roomID" bhejni h kisi tarah
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

	})


})
