chat = {
	last: 0,

	refresh: function () {
		$.ajax({
			'url': '/messages.json?since=' + chat.last,
			'dataType': 'json',
			success: function (data) {
				chat.last = data.last;
				var rows = '';
				$.each(data.messages, function (x) {
					var msg = data.messages[x];
					rows += '<tr>';
					rows += '<td>' + msg.datetime + '</td>';
					rows += '<td>' + msg.nickname + '</td>';
					rows += '<td>' + msg.message + '</td>';
					rows += '</tr>';
				});
				$('#chat tbody').append(rows);

				$('html').animate({ scrollTop: $(document).height() }, 'slow');
			}
		});
	},

	on_form_submit: function () {
		var nick = $('input[name="nickname"]').val();
		var text = $('input[name="message"]').val();

		$.ajax({
			url: '/',
			type: 'POST',
			data: {'nickname': nick, 'message': text},
			success: function () {
				// scroll
			},
			beforeSend: function () {
				$('input[name="message"]').attr('value', '');
				$('input[type="submit"]').attr('disabled', 'disabled');
			},
			complete: function () {
				$('input[type="submit"]').attr('disabled', '');
				$('input[name="message"]').focus();
			}
		});

		return false;
	},

	start: function () {
		window.setInterval(this.refresh, 5000);
		$('form').submit(chat.on_form_submit);
		$('input[name="message"]').focus();
		this.refresh();
	}
};

$(document).ready(function () {
	chat.start();
});
