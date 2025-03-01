// Khởi tạo kết nối với server WebSocket
const socket = io();

// Lắng nghe sự kiện 'chatMessage' từ server và hiển thị tin nhắn
socket.on('chatMessage', (msg) => {
  const messagesDiv = document.getElementById('messages');
  const newMessage = document.createElement('div');

  // Sử dụng innerHTML để hiển thị thẻ <br> thay vì textContent
  newMessage.innerHTML = msg;  // Dùng innerHTML thay vì textContent

  messagesDiv.appendChild(newMessage);
  messagesDiv.scrollTop = messagesDiv.scrollHeight; // Tự động cuộn xuống dưới
});

// Gửi lựa chọn khi người dùng nhấn nút
function sendOption(option) {
  socket.emit('userOption', option);  // Gửi thông tin về tùy chọn đã chọn lên server
}
