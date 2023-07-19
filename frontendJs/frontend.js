// Membuat objek WebSocket
const socket = new WebSocket("wss://scbe.ndntel-u.my.id:9696");

// Menangani event open
socket.onopen = function() {
  console.log('Koneksi WebSocket berhasil dibuka');
};

// Menangani event message
socket.onmessage = function(event) {
  const messagesDiv = document.getElementById('messages');
  const message = document.createElement('p');
  message.textContent = 'Pesan dari server: ' + event.data;
  messagesDiv.appendChild(message);
};

// Menangani event error
socket.onerror = function(error) {
  console.error('Terjadi kesalahan pada WebSocket:', error);
};

// Menangani event close
socket.onclose = function(event) {
  console.log('Koneksi WebSocket ditutup. Kode penutup:', event.code);
};

// Menangani pengiriman pesan
const form = document.getElementById('inputinpasien');
const input = document.getElementById('message-input');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const message = input.value;
  socket.send(message);
  input.value = '';
});