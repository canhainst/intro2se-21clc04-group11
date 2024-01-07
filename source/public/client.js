// public/client.js
$(function () {
    const socket = io();
  
    $('form').submit(function(){
      const message = $('#input').val();
      socket.emit('chat message', message);
      $('#input').val('');
      return false;
    });
  
    socket.on('chat message', function(msg){
      $('#messages').append($('<li>').text(msg));
    });
  });
  