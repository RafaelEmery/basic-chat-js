var socket = io('http://localhost:3000');

function renderMessage(message) {
    var html = '<div class="message"><strong>' + message.author + '</strong>: ' + message.message + '</div>';
    
    $('.messages').append(html);
}

socket.on('previousMessages', function(messages) {
    for (message of messages) {
        renderMessage(message);
    }
});

socket.on('receivedMessage', function(message) {
    renderMessage(message);
});

$('form').submit(function(event) {
    event.preventDefault();

    var author = $('input[name=username]').val();
    var message = $('input[name=message]').val();

    if (author.length && message.length) {
        var messageObject = {
            author: author,
            message: message
        };

        renderMessage(messageObject);

        socket.emit('sendMessage', messageObject);
    }
});