$(document).ready(() => {

	$('#form-input-submit').click(e => {
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

	})


})
