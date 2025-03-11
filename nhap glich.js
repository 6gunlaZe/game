// https://replit.com/@untilyouleesin/hkghhh#index.js
const token1 = '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2344';  // Thay bằng token GitHub của bạn
const token = token1.slice(0, -4);  // Bỏ đi 4 ký tự cuối

const fs = require('fs');  // Đảm bảo bạn yêu cầu thư viện fs


const fetch = require('node-fetch');  // Đối với Node.js


const playerId = 12345;


////////////////////////



const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Cung cấp tệp tĩnh từ thư mục public
app.use(express.static(path.join(__dirname, 'public')));

// Đối tượng lưu trạng thái của người dùng
const userSelections = {};  // Lưu trữ lựa chọn của người dùng theo socket.id

// Các nhóm tùy chọn
const optionGroups = {
  group1: ['Option 1', 'Option 2', 'Option 3'],
  group2: ['Option 4', 'Option 5', 'Option 6'],
  group3: ['Option 7', 'Option 8', 'Option 9'],
};

// Lắng nghe kết nối WebSocket từ client
io.on('connection', (socket) => {
  console.log('A user connected');

  // Lắng nghe sự kiện 'userOption' từ client
  socket.on('userOption', (option) => {
    console.log('User selected:', option);

    // Kiểm tra xem người dùng đã chọn nhóm chưa
    if (!userSelections[socket.id]) {
      // Người dùng chưa chọn gì, lưu nhóm của họ dựa trên tùy chọn đầu tiên
      const selectedGroup = getOptionGroup(option);
      if (selectedGroup) {
        userSelections[socket.id] = {
          selectedGroup: selectedGroup,
          selectedOptions: [option], // Lưu tùy chọn người dùng đã chọn
        };
        // Thực thi hành động tùy chọn
        handleOption(option);
       // io.emit('chatMessage', `User selected: ${option}`);
      } else {
        socket.emit('chatMessage', 'Invalid option.');
      }
    } else {
      // Người dùng đã chọn nhóm, kiểm tra xem tùy chọn có hợp lệ không
      const userGroup = userSelections[socket.id].selectedGroup;
      if (optionGroups[userGroup].includes(option)) {
        // Nếu tùy chọn thuộc nhóm người dùng đã chọn
        handleOption(option);  // Luôn thực hiện tác vụ mỗi lần chọn
       // io.emit('chatMessage', `User selected: ${option}`);
      } else {
        socket.emit('chatMessage', `You can only select options from the same group: ${userGroup}`);
      }
    }
  });

  // Lắng nghe sự kiện disconnect
  socket.on('disconnect', () => {
    console.log('User disconnected');
    delete userSelections[socket.id]; // Xóa người dùng khỏi danh sách khi họ rời đi
  });
});

// Hàm xử lý tùy chọn
function handleOption(option) {
  switch (option) {
    case 'Option 1':
      performTaskForOption1();
      break;
    case 'Option 2':
      performTaskForOption2();
      break;
    case 'Option 3':
      performTaskForOption3();
      break;
    case 'Option 4':
      performTaskForOption4();
      break;
    case 'Option 5':
      performTaskForOption5();
      break;
    case 'Option 6':
      performTaskForOption6();
      break;
    case 'Option 7':
      performTaskForOption7();
      break;
    case 'Option 8':
      performTaskForOption8();
      break;
    case 'Option 9':
      performTaskForOption9();
      break;
    default:
      console.log('No task assigned for this option.');
  }
}



function performTaskForOption1() {
  console.log('Executing task for Option 1');
  startBossFight(players[1],players[0]);
  startBossFight(players[0],players[1]);
  io.emit('chatMessage', 'Tiến Atk Hải');
}

function performTaskForOption2() {
  console.log('Executing task for Option 2');
    startBossFight(players[2],players[0]);
  startBossFight(players[0],players[2]);
  io.emit('chatMessage', 'Tiến Atk Hoàng');
}

function performTaskForOption3() {
  console.log('Executing task for Option 3');
   startBossFight(boss,players[0]);
  io.emit('chatMessage', 'Tiến Atk BOSS');
}

function performTaskForOption4() {
  console.log('Executing task for Option 4');
    startBossFight(players[1],players[0]);
  startBossFight(players[0],players[1]);
  io.emit('chatMessage', 'Hải Atk Tiến');
}

function performTaskForOption5() {
  console.log('Executing task for Option 5');
    startBossFight(players[2],players[1]);
  startBossFight(players[1],players[2]);
  io.emit('chatMessage', 'Hải Atk Hoàng');
}

function performTaskForOption6() {
  console.log('Executing task for Option 6');
     startBossFight(boss,players[1]);
  io.emit('chatMessage', 'Hải Atk BOSS');
}

function performTaskForOption7() {
  console.log('Executing task for Option 7');
      startBossFight(players[2],players[0]);
  startBossFight(players[0],players[2]);
  io.emit('chatMessage', 'Hoàng Atk Tiến');
}

function performTaskForOption8() {
  console.log('Executing task for Option 8');
  startBossFight(players[2],players[1]);
  startBossFight(players[1],players[2]);
  io.emit('chatMessage', 'Hoàng Atk Hải');
}

function performTaskForOption9() {
  console.log('Executing task for Option 9');
     startBossFight(boss,players[2]);
  io.emit('chatMessage', 'Hoàng Atk BOSS');
}






// Hàm xác định nhóm của một tùy chọn
function getOptionGroup(option) {
  if (optionGroups.group1.includes(option)) {
    return 'group1';
  } else if (optionGroups.group2.includes(option)) {
    return 'group2';
  } else if (optionGroups.group3.includes(option)) {
    return 'group3';
  } else {
    return null;
  }
}

// Khởi động server
server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});







//////////////////////////





// Hàm lấy thông số người chơi từ GitHub thông qua GitHub API
function getPlayerStat(playerId) {
  const repoOwner = '6gunlaZe';  // Tên người sở hữu repo
  const repoName = 'game';  // Tên repository
  const filePath = 'playersData.json';  // Đường dẫn tới file JSON trong repo

  // Trả về một Promise, sẽ resolve với đối tượng player
  return new Promise((resolve, reject) => {
    // Sử dụng GitHub API để lấy nội dung file playersData.json
    fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`, {
      method: 'GET',
      headers: {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json',
      },
    })
    .then(response => response.json())
    .then(data => {
      // Dữ liệu sẽ được trả về dưới dạng Base64, cần giải mã bằng Buffer
      const fileContent = Buffer.from(data.content, 'base64').toString('utf-8');  // Giải mã Base64
      const jsonData = JSON.parse(fileContent); // Chuyển đổi nội dung thành JSON

      // Tìm người chơi trong dữ liệu
      const player = jsonData.players.find(p => p.id === playerId);
      if (player) {
        resolve(player);  // Trả về đối tượng người chơi
      } else {
        reject('Không tìm thấy người chơi với ID: ' + playerId);
      }
    })
    .catch(error => reject('Lỗi khi lấy thông số người chơi: ' + error));
  });
}







function updatePlayerStat(playerId, updatedStat, commit = 0 ) {
  return new Promise((resolve, reject) => {
    const repoOwner = '6gunlaZe';  // Tên người sở hữu repo
    const repoName = 'game';  // Tên repository
    const filePath = 'playersData.json';  // Đường dẫn tới file JSON trong repo

    // Lấy SHA của file từ GitHub trước khi thực hiện cập nhật
    fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`, {
      method: 'GET',
      headers: {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json',
      },
    })
    .then(response => response.json())
    .then(data => {
      // Thay vì atob, sử dụng Buffer trong Node.js
      const fileContent = Buffer.from(data.content, 'base64').toString('utf-8');  // Giải mã Base64 bằng Buffer
      const jsonData = JSON.parse(fileContent); // Chuyển đổi nội dung thành JSON

      // Cập nhật thông tin người chơi
      const player = jsonData.players.find(p => p.id === playerId);
      if (player) {
        Object.assign(player, updatedStat);

        // Cập nhật lại dữ liệu
        const updatedData = JSON.stringify(jsonData, null, 2);

    // Xử lý thông báo commit tùy theo giá trị của commit
    let commitMessage = `Cập nhật thông số người chơi với ID ${playerId}`;
    switch (commit) {
      case 1:
        commitMessage = `Cập nhật thông số người chơi ${playerId}: cập nhật vàng`;
        break;
      case 2:
        commitMessage = `Cập nhật thông số người chơi ${playerId}: cập nhật lv fram quái`;
        break;
      case 3:
        commitMessage = `Cập nhật thông số người chơi ${playerId}: +gem`;
        break;
      case 4:
        commitMessage = `Cập nhật thông số người chơi ${playerId}: cập nhật đồ mới`;
        break;
      case 5:
        commitMessage = `Cập nhật thông số người chơi ${playerId}: Thay đổi trang bị`;
        break;
      case 6:
        commitMessage = `Cập nhật thông số người chơi ${playerId}: +otp9 của ngọc / skill`;
        break;
              case 7:
        commitMessage = `Cập nhật thông số người chơi ${playerId}: ép ngọc`;
        break;
              case 8:
        commitMessage = `Cập nhật thông số người chơi ${playerId}: cường hóa`;
        break;
              case 9:
        commitMessage = `Cập nhật thông số người chơi ${playerId}: up skill`;
        break;
              case 10:
        commitMessage = `Cập nhật thông số người chơi ${playerId}: +otp9 của ngọc / skill`;
        break;
              case 11:
        commitMessage = `Cập nhật thông số người chơi ${playerId}: - gold shop`;
        break;
              case 12:
        commitMessage = `Cập nhật thông số người chơi ${playerId}: +otp9 của ngọc / skill`;
        break;
      default:
        // Giữ commit mặc định nếu commit không hợp lệ hoặc không có giá trị
        commitMessage = `Cập nhật thông số người chơi với ID ${playerId}`;
        break;
    }

        // Sử dụng SHA mới nhất của file từ GitHub
        const fileSha = data.sha;

        fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`, {
          method: 'PUT',
          headers: {
            'Authorization': `token ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: commitMessage,
            content: Buffer.from(updatedData, 'utf-8').toString('base64'),  // Mã hóa lại dữ liệu thành Base64
            sha: fileSha,  // Sử dụng SHA của file hiện tại
          }),
        })
        .then(response => response.json())
        .then(data => {
          resolve(data);  // Resolve Promise khi thành công
        })
        .catch(error => {
          reject('Lỗi khi cập nhật dữ liệu lên GitHub: ' + error);
        });
      } else {
        reject('Không tìm thấy người chơi với ID: ' + playerId);
      }
    })
    .catch(error => reject('Lỗi khi lấy dữ liệu hiện tại từ GitHub: ' + error));
  });
}



function getFileSHA(repoOwner, repoName, filePath) {
  return fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`, {
    method: 'GET',
    headers: {
      'Authorization': `token ${token}`,
      'Accept': 'application/vnd.github.v3+json',
    },
  })
  .then(response => response.json())
  .then(data => data.sha)
  .catch(error => console.error('Lỗi khi lấy SHA của file:', error));
}





















////////////////////////////////////
///////////////////////////////////



let codemode = 0

///////////////
const botToken = '7823637456:AAHGyKokFrUdLM-kaBhP6M_wg90fKOWwqY4'; // Thay YOUR_BOT_TOKEN bằng token của bạn

// Các mẫu cú pháp (dễ dàng thay đổi tại đây)
const syntaxExamples = [
  { key: 'reset', value: '1' },
  { key: 'fram', value: '1' },
  { key: 'bank', value: '1' },
  { key: 'crypt', value: '1' }
];

let lastUpdateId = 0;  // Biến để lưu trữ ID của bản cập nhật cuối cùng
const messageTimeout = 10 * 1000; // 10 giây (tính bằng milliseconds)
const initialDelay = 30 * 1000;  // 30 giây (tính bằng milliseconds)
const callbackTimeout = 10 * 1000; // 10 giây cho thời gian nhấn nút

let callbackQueryTimes = new Map();  // Lưu trữ thời gian nút callback query

// Hàm lấy các bản cập nhật từ Telegram
async function getUpdates() {
  const url = `https://api.telegram.org/bot${botToken}/getUpdates?offset=${lastUpdateId + 1}&timeout=30`;

  console.log('Fetching updates...');  // Debug log: Đang gọi API

  try {
    const response = await fetch(url);
    const data = await response.json();

    console.log('Data received:', data);  // Debug log: Xem dữ liệu trả về từ API

    if (data.ok && data.result.length > 0) {
      for (let update of data.result) {
        lastUpdateId = update.update_id;
        const message = update.message;

        if (message) {
          const messageTime = new Date(message.date * 1000);  // Convert timestamp to Date object
          const currentTime = new Date();
          const timeDiff = currentTime - messageTime;  // Tính sự chênh lệch thời gian (milliseconds)

          // Chỉ xử lý tin nhắn nếu nó được gửi trong vòng 10 giây
          if (timeDiff <= messageTimeout) {
            console.log('Processing message:', message);  // Debug log: Xử lý tin nhắn
            analyzeMessage(message.text, message.chat.id);
          } else {
            console.log('Message is too old. Skipping...');
          }
        } else if (update.callback_query) {
          console.log('Processing callback query:', update.callback_query);  // Debug log: Xử lý callback query
          handleCallbackQuery(update.callback_query);
        }
      }
    }
  } catch (error) {
    console.error('Error:', error);
  }

  // Đợi một khoảng thời gian trước khi tiếp tục lấy các bản cập nhật tiếp theo
  setTimeout(getUpdates, 2000);  // Gọi lại getUpdates sau 2 giây để tiếp tục nhận tin nhắn mới
}

// Hàm phân tích tin nhắn theo dạng (key, data)
function analyzeMessage(text, chatId) {
  if (text) {
    const regex = /^\(([^,]+),\s*(.+)\)$/;  // Kiểm tra định dạng (key, data)
    const match = text.match(regex);

    if (match) {
      const key = match[1].trim();
      let data = match[2].trim();
      if (!isNaN(data)) {
        data = parseFloat(data);  // Nếu là số, chuyển thành số
      }

      console.log('Matched key:', key);  // Debug log: Xem key
      console.log('Matched data:', data);  // Debug log: Xem data

      performTask(key, data, chatId);
      sendMessage(chatId, `Data received: ${key} = ${data}`);
    } else {
      // Chỉ gửi cú pháp mẫu khi người dùng nhập sai cú pháp
      sendSyntaxExamples(chatId);
    }
  }
}

// Hàm trả về các cú pháp mẫu
function getSyntaxExamples() {
  return syntaxExamples.map(example => `(${example.key}, ${example.value})`).join('\n');
}

// Hàm gửi các ví dụ cú pháp đúng cho người dùng
function sendSyntaxExamples(chatId) {
  const text = `Bạn đã nhập sai cú pháp. Hãy thử một trong các cú pháp sau:\n\n` + getSyntaxExamples();

  // Tạo các nút inline keyboard từ mảng syntaxExamples
  const reply_markup = {
    inline_keyboard: syntaxExamples.map(example => {
      return [
        { text: `Gửi (${example.key}, ${example.value})`, callback_data: `(${example.key}, ${example.value})` }
      ];
    })
  };
sendMainMenu(chatId);  
Menutrangbi(chatId)
sendPlayerStatsToTelegram(chatId);
var GrapStatsText = "Chỉ số cường hóa: " + Object.entries(GrapStats).map(([key, value]) => `${key}= ${value}`).join(', ');
console.log(GrapStatsText);  
 sendMessage(chatId, GrapStatsText) 
  
let textop = "Tỉ lệ cường hóa (thất bại = mất item): ";
for (let otp5 = 0; otp5 <= 10; otp5++) {
    // Tính toán tỉ lệ ôp đồ theo công thức đúng
    let result = Math.max(100 - (Math.pow(otp5, 1.65) * 2.2), 10);
    
    // Thêm kết quả vào chuỗi với định dạng
    textop += `${otp5+1} = ${result.toFixed(0)}%, `;
}

// Xóa dấu phẩy và khoảng trắng thừa ở cuối chuỗi
textop = textop.slice(0, -2);

// Log chuỗi kết quả cuối cùng
console.log("Chuỗi kết quả cuối cùng: ", textop);

// Gửi tin nhắn (giả sử bạn có một hàm sendMessage(chatId, textop) để gửi tin nhắn)
sendMessage(chatId, textop);

  
  
 
  
  
 let textop1 = "Tỉ lệ nâng skill: ";
for (let otp5 = 0; otp5 <= 3; otp5++) {
    // Tính toán tỉ lệ ôp đồ theo công thức đúng
    let result = Math.max(100 - (otp5) * 30, 10) 
    // Thêm kết quả vào chuỗi với định dạng
    textop1 += `${otp5+1} = ${result.toFixed(0)}%, `;
}

// Xóa dấu phẩy và khoảng trắng thừa ở cuối chuỗi
textop1 = textop1.slice(0, -2);

// Log chuỗi kết quả cuối cùng
console.log("Chuỗi kết quả cuối cùng: ", textop1);

sendMessage(chatId, textop1); 
  

  
 // sendMessage(chatId, text, reply_markup); // Gửi tin nhắn với inline keyboard
}






// Hàm gửi tin nhắn phản hồi (reply)
function sendMessage(chatId, text, reply_markup = {}) {
  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
  const payload = {
    chat_id: chatId,
    text: text,
    reply_markup: reply_markup // Đảm bảo không gửi null
  };

  let formattedMessage = text.replace(/\n/g, '<br>');
  // Gửi thông điệp đã được thay thế
  io.emit('chatMessage', formattedMessage);  // Sẽ gửi HTML với thẻ <br> cho xuống dòng
  if ( chatId == -4676989627)return
  console.log('Sending message:', payload);  // Debug log: Xem payload

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
  .then(response => response.json())
  .then(data => console.log('Message sent:', data))
  .catch(error => console.error('Error sending message:', error));
}



// Hàm xử lý khi người dùng nhấn vào nút trong inline keyboard
function handleCallbackQuery(callbackQuery) {
  const chatId = callbackQuery.message.chat.id;
  const text = callbackQuery.data;

  console.log('Handling callback query:', text);  // Debug log: Xử lý callback query

  // Kiểm tra thời gian của callback query
  const currentTime = new Date().getTime();
  const timestamp = callbackQuery.message.date * 1000;  // Lấy thời gian tạo của message chứa callback query
  const timeDiff = currentTime - timestamp;

  // Nếu thời gian quá lâu (10 giây), bỏ qua xử lý
  if (timeDiff > callbackTimeout) {
    console.log('Callback query expired. Skipping...');
          sendSyntaxExamples(chatId);
    return;  // Bỏ qua callback query nếu thời gian quá lâu
  }

  // Nếu không quá lâu, thực hiện xử lý bình thường
  const regex = /^\(([^,]+),\s*(.+)\)$/;  // Kiểm tra định dạng (key, data)
  const match = text.match(regex);

  if (match) {
    const key = match[1].trim();
    let data = match[2].trim();
    if (!isNaN(data)) {
      data = parseFloat(data);  // Nếu là số, chuyển thành số
    }

    // Xử lý nhiệm vụ với key và data
    performTask(key, data, chatId);
    sendMessage(chatId, `Data received: ${key} = ${data}`);
  } else {
    sendMessage(chatId, 'Dữ liệu không hợp lệ!');
  }
}

// Hàm thực hiện nhiệm vụ (ví dụ: ghi lại dữ liệu hoặc thực hiện hành động khác)
function performTask(key, data, chatId) {
  console.log(`Nhiệm vụ thực hiện: key = ${key}, data = ${data}`);

  if (key === 'reset') {
    console.log('Thực hiện reset!');
    parent.api_call("disconnect_character", {name: "haiz"});
    sendMessage(chatId, 'Nhiệm vụ reset đã hoàn thành!');
  } else if (key === 'fram') {
    console.log('Thực hiện fram!');
                respawn()
    sendMessage(chatId, 'Nhiệm vụ fram đã hoàn thành!');
  } else if (key === 'bank') {
    console.log('Thực hiện bank!');
    sendMessage(chatId, 'Nhiệm vụ bank đã hoàn thành!');
  } else if (key === 'crypt') {
    console.log('Thực hiện crypt!');
                codemode = 1
              Key.push(data); 
    sendMessage(chatId, 'Nhiệm vụ crypt đã hoàn thành!');
  } else {
    console.log('Không có nhiệm vụ xác định cho key:', key);  // Debug log: Kiểm tra trường hợp không có nhiệm vụ
    sendMessage(chatId, `Không có nhiệm vụ xác định cho key: ${key}`);
  }
}

// Khởi động bot sau khi chờ 30 giây
setTimeout(() => {
  //sendMessage(6708647498, 'Bot is now starting...!');
  //sendSyntaxExamples(6708647498);
  getUpdates(); // Gọi hàm getUpdates lần đầu tiên
}, 2000);







function sendPlayerStatsToTelegram(chatId) {
  // Tìm player dựa trên id_bot từ biến players
  let player = players.find(p => p.id_bot === chatId); // Tìm player bằng id_bot (chatId)

  if (!player) {
    console.log("Không tìm thấy player với id_bot:", chatId);
    sendMessage(chatId, 'Không tìm thấy thông tin nhân vật!');
    return;
  }

  // Tính toán các chỉ số
  let weaponhp = calculateHP(player) - player.hp_max - player.level * 50;
  let weaponDame = calculateWeaponDamage(player) - player.dame - player.level * 5;
  let weapondef = calculateDEF(player) - player['def-dame'] - player.level * 2;
  let weapondef1 = calculateDEFskill(player) - player['def-skill'] - player.level * 2;

  // Chuẩn bị thông tin nhân vật
  const playerStats = `
🧑‍💻 **Thông tin nhân vật**:
- 🆔 **ID**: ${player.id}
- ⚔️ **Dame**:  ${player.dame} + ${weaponDame}
- 🌟 **exp**: ${player.exp}
- 🏆 **Level**: ${player.level}
- ❤️ **HP**: ${player.hp_max} + ${weaponhp}
- 🔋 **Mana**: ${player.mana}
- 🛡️ : ${player['def-dame']} + ${weapondef} (Giảm sát thương nhận vào)
- 🎽 : ${player['def-skill']} + ${weapondef1} (Giảm hiệu quả kỹ năng đối phương)
- 🍃 : ${player['NeTranh']} (Tỉ lệ né tránh)
- ⚡ : ${player['crit-%']} (Tỷ lệ chí mạng)
- 💣 : ${player['crit-x']} (Lượng sát thương chí mạng)
- ⏱️ : ${player['attach-speed']} (Tốc độ tấn công)
- 🌍 : ${player['attach-range']} (Phạm vi tấn công)
- 🩸 : ${player['HutMau']} (Tỷ lệ hút máu)
- 💥 : ${player['PhanDame']} (Phản sát thương)
**Trang bị**:
- 👕: ${player['trang-bi'].ao.otp0} (${player['trang-bi'].ao.otp1}-${player['trang-bi'].ao.otp2}-${player['trang-bi'].ao.otp3}-${player['trang-bi'].ao.otp4}) ✨${player['trang-bi'].ao.otp5}
- 🛡️: ${player['trang-bi'].giap.otp0} (${player['trang-bi'].giap.otp1}-${player['trang-bi'].giap.otp2}-${player['trang-bi'].giap.otp3}-${player['trang-bi'].giap.otp4}) ✨${player['trang-bi'].giap.otp5}
- ✋: ${player['trang-bi'].tay.otp0} (${player['trang-bi'].tay.otp1}-${player['trang-bi'].tay.otp2}-${player['trang-bi'].tay.otp3}-${player['trang-bi'].tay.otp4}) ✨${player['trang-bi'].tay.otp5}
- 🦵: ${player['trang-bi'].chan.otp0} (${player['trang-bi'].chan.otp1}-${player['trang-bi'].chan.otp2}-${player['trang-bi'].chan.otp3}-${player['trang-bi'].chan.otp4}) ✨${player['trang-bi'].chan.otp5}
- ⚔️: ${player['trang-bi']['vu-khi'].otp0} (${player['trang-bi']['vu-khi'].otp1}-${player['trang-bi']['vu-khi'].otp2}-${player['trang-bi']['vu-khi'].otp3}-${player['trang-bi']['vu-khi'].otp4}) ✨${player['trang-bi']['vu-khi'].otp5}
  `;

  // Gửi thông tin qua Telegram
  sendMessage(chatId, playerStats);  // Gửi tin nhắn đến chatId (ID người dùng hoặc ID kênh)
}













function calculateWeaponDamage(player) {
  // Lấy giá trị otp0 của vũ khí
  let dame0 = player.dame;	
  dame0 += player.level * 5
  let otp0 = player['trang-bi']['vu-khi'].otp0;
   let otp5 = player['trang-bi']['vu-khi'].otp5;
  // Lấy giá trị dame cơ bản từ weaponStats dựa trên otp0
  var damevk = weaponStats[otp0];
  var grapvk = GrapStats[otp5];

  // Kiểm tra xem damevk có tồn tại (tức là otp0 có trong weaponStats)
  if (damevk) {
    // Nếu tồn tại, tính tổng dame từ dame cơ bản và các giá trị otp1, otp2, otp3, otp4
    let dame = damevk + player['trang-bi']['vu-khi'].otp1 +
               player['trang-bi']['vu-khi'].otp2 +
               player['trang-bi']['vu-khi'].otp3 +
               player['trang-bi']['vu-khi'].otp4;
if(grapvk)dame=dame*grapvk
    dame = dame0 + Math.round(dame)
    return dame;  // Trả về giá trị dame tính được
  } else {
    console.log("otp0 không tồn tại trong weaponStats!"); // Nếu otp0 không có trong weaponStats
    return dame0;  // Trả về 0 nếu không có vũ khí hợp lệ
  }
}







function calculateHP(player) {
  // Lấy giá trị otp0 của vũ khí
  let dame0 = player.hp_max;	
  dame0 += player.level * 50
  let otp0 = player['trang-bi']['ao'].otp0;
   let otp5 = player['trang-bi']['ao'].otp5;
  // Lấy giá trị dame cơ bản từ weaponStats dựa trên otp0
  var damevk = armorStats[otp0];
  var grapvk = GrapStats[otp5];

  // Kiểm tra xem damevk có tồn tại (tức là otp0 có trong weaponStats)
  if (damevk) {
    // Nếu tồn tại, tính tổng dame từ dame cơ bản và các giá trị otp1, otp2, otp3, otp4
    let dame = damevk + player['trang-bi']['ao'].otp1 +
               player['trang-bi']['ao'].otp2 +
               player['trang-bi']['ao'].otp3 +
               player['trang-bi']['ao'].otp4;
if(grapvk)dame=dame*grapvk
    dame = dame0 + Math.round(dame)
    return dame;  // Trả về giá trị dame tính được
  } else {
    console.log("otp0 không tồn tại trong weaponStats!"); // Nếu otp0 không có trong weaponStats
    return dame0;  // Trả về 0 nếu không có vũ khí hợp lệ
  }
}

function calculateDEF(player) {
  // Lấy giá trị otp0 của vũ khí
  let dame0 = player['def-dame'];	
  dame0 += player.level * 2
  let otp0 = player['trang-bi']['tay'].otp0;
   let otp5 = player['trang-bi']['tay'].otp5;
  let otp01 = player['trang-bi']['chan'].otp0;
   let otp51 = player['trang-bi']['chan'].otp5;

  // Lấy giá trị dame cơ bản từ weaponStats dựa trên otp0
  var damevk = glovesStats[otp0];
  var grapvk = GrapStats[otp5];
  var damevk1 = bootsStats[otp01];
  var grapvk1 = GrapStats[otp51];
  // Kiểm tra xem damevk có tồn tại (tức là otp0 có trong weaponStats)
  if (damevk) {
    // Nếu tồn tại, tính tổng dame từ dame cơ bản và các giá trị otp1, otp2, otp3, otp4
    let dame = damevk + player['trang-bi']['tay'].otp1 +
               player['trang-bi']['tay'].otp2 +
               player['trang-bi']['tay'].otp3 +
               player['trang-bi']['tay'].otp4;
if(grapvk)dame=dame*grapvk
    dame0  += Math.round(dame)
  }
  if (damevk1) {
    // Nếu tồn tại, tính tổng dame từ dame cơ bản và các giá trị otp1, otp2, otp3, otp4
    let dame = damevk1 + player['trang-bi']['chan'].otp1 +
               player['trang-bi']['chan'].otp2 +
               player['trang-bi']['chan'].otp3 +
               player['trang-bi']['chan'].otp4;
if(grapvk1)dame=dame*grapvk
    dame0  += Math.round(dame)
  }


    return dame0;  // Trả về 0 nếu không có vũ khí hợp lệ

}


function calculateDEFskill(player) {
  // Lấy giá trị otp0 của vũ khí
  let dame0 = player['def-skill'];	
  dame0 += player.level * 2
  let otp0 = player['trang-bi']['giap'].otp0;
   let otp5 = player['trang-bi']['giap'].otp5;


  // Lấy giá trị dame cơ bản từ shieldStats dựa trên otp0
  var damevk = shieldStats[otp0];
  var grapvk = GrapStats[otp5];

  // Kiểm tra xem damevk có tồn tại (tức là otp0 có trong weaponStats)
  if (damevk) {
    // Nếu tồn tại, tính tổng dame từ dame cơ bản và các giá trị otp1, otp2, otp3, otp4
    let dame = damevk + player['trang-bi']['giap'].otp1 +
               player['trang-bi']['giap'].otp2 +
               player['trang-bi']['giap'].otp3 +
               player['trang-bi']['giap'].otp4;
if(grapvk)dame=dame*grapvk
    dame0  += Math.round(dame)
  }

    return dame0;  // Trả về 0 nếu không có vũ khí hợp lệ

}






function updateWeaponBasedOnInventory(player) {
  // 1: vũ khí (vu-khi)
  // 2: áo (ao)
  // 3: giáp (giap)
  // 4: tay (tay)
  // 5: giày (chan)

  const items = ['vu-khi', 'ao', 'giap', 'tay', 'chan']; // Các trang bị
  items.forEach(item => {
    const equipmentInInventory = player.inventory.find(equipment => equipment.otp6 === items.indexOf(item) + 1);

    if (equipmentInInventory) {
      // Cập nhật trang bị từ inventory vào "trang-bi"
      player["trang-bi"][item] = {
        otp0: equipmentInInventory.otp0,
        otp1: equipmentInInventory.otp1,
        otp2: equipmentInInventory.otp2,
        otp3: equipmentInInventory.otp3,
        otp4: equipmentInInventory.otp4,
        otp5: equipmentInInventory.otp5
      };

      console.log(`Cập nhật ${item}:`, player["trang-bi"][item]);

      // Cập nhật dữ liệu lên GitHub
    // updatePlayerStat(player.id, { "trang-bi": player["trang-bi"] });
    }
  });

}






// Hàm cập nhật trang bị cho player dựa trên id_bot
function updatePlayerEquip( id_bot, itemId) {
    // Tìm player theo id_bot
  let vukhi = 1
    let player = players.find(p => p.id_bot === id_bot);
    let type = ""
    // Nếu không tìm thấy player, trả về thông báo
    if (!player) {
        console.log("Không tìm thấy player với id_bot: " + id_bot);
        return;
    }

  
  
      player.inventory.forEach(item => {
        if (item.otp0 === itemId) {
            // Kiểm tra trang bị thuộc loại nào và cập nhật
            if (armorStats.hasOwnProperty(itemId)) {
                type = "armor"
                            console.log("HPmax ban đầu: " + player.hp_max);
                player.hp_max += thaydoitrangbi_Re(player, type, itemId)
              console.log("cập nhật lại HP: " + player.hp_max);

            } else if (shieldStats.hasOwnProperty(itemId)) {
                type = "defenseSkill"
                player['def-skill'] += thaydoitrangbi_Re(player, type, itemId)

            } else if (glovesStats.hasOwnProperty(itemId)) {
                type = "defense"
                player['def-dame'] += thaydoitrangbi_Re(player, type, itemId)

            } else if (bootsStats.hasOwnProperty(itemId)) {
                type = "defenseBoots"
                player['def-dame'] += thaydoitrangbi_Re(player, type, itemId)

            } else if (weaponStats.hasOwnProperty(itemId)) {
                type = "weapon"
                player.dame += thaydoitrangbi_Re(player, type, itemId)

            }
        }
    });
  
  
  
  
  
  
    // Lặp qua inventory để tìm trang bị cần cập nhật
    let updated = false;
    player.inventory.forEach(item => {
        if (item.otp0 === itemId) {
            // Kiểm tra trang bị thuộc loại nào và cập nhật
            if (armorStats.hasOwnProperty(itemId)) {
                player["trang-bi"]["ao"] = { ...item };
                updated = true;
            } else if (shieldStats.hasOwnProperty(itemId)) {
                player["trang-bi"]["giap"] = { ...item };
                updated = true;
            } else if (glovesStats.hasOwnProperty(itemId)) {
                player["trang-bi"]["tay"] = { ...item };
                updated = true;
            } else if (bootsStats.hasOwnProperty(itemId)) {
                player["trang-bi"]["chan"] = { ...item };
                updated = true;
            } else if (weaponStats.hasOwnProperty(itemId)) {
                player["trang-bi"]["vu-khi"] = { ...item };
                updated = true;
              vukhi = 2
            }
        }
    });

    // Nếu trang bị đã được cập nhật, gọi hàm updatePlayerStat để cập nhật dữ liệu
    if (updated) {
        updatePlayerStat(player.id, { "trang-bi": player["trang-bi"] }, 5);
      
      if (vukhi == 2){
        checkcharDownandUp(player);
        const message1112 = generateWeaponTypeInfo();  
              sendMessage(player.id_bot, message1112);  

                     }
      
    } else {
        console.log("Không tìm thấy trang bị hợp lệ.");
    }
}








function updatePlayersHpToMax() {
  // Kiểm tra nếu biến toàn cục players có dữ liệu
  if (players && Array.isArray(players)) {
    // Duyệt qua tất cả các người chơi và cập nhật hp thành hp_max
    players.forEach(player => {
      if (player.hp_max !== undefined) {  // Kiểm tra nếu player có thuộc tính hp_max
        player.hp = player.hp_max;  // Cập nhật hp = hp_max
      }
    });

    console.log("Cập nhật hp cho tất cả người chơi thành công!");
  } else {
    console.log("Không có dữ liệu người chơi!");
  }
}




function updateAllPlayersStats(players) {
for (let player of players) {
  try {
    // Cập nhật trang bị của người chơi từ kho đồ
    //updateWeaponBasedOnInventory(player);

    // Tính toán các chỉ số của người chơi sau khi cập nhật trang bị
    let updatedDame = calculateWeaponDamage(player); // Tính toán sát thương vũ khí
    let updatedHP = calculateHP(player); // Tính toán HP từ áo giáp
    let updatedDEF = calculateDEF(player); // Tính toán phòng thủ
    let updatedDEFSkill = calculateDEFskill(player); // Tính toán phòng thủ kỹ năng

    // Cập nhật lại các chỉ số của người chơi trong đối tượng player
    player.dame = updatedDame; // Cập nhật sát thương
    player.hp_max = updatedHP; // Cập nhật HP
    player['def-dame'] = updatedDEF; // Cập nhật phòng thủ
    player['def-skill'] = updatedDEFSkill; // Cập nhật phòng thủ kỹ năng
  } catch (error) {
    console.error(`Lỗi khi cập nhật chỉ số cho người chơi ${player.id}:`, error);
  }
}
}

























var armorStats = {
    "T1_armor": 200,
    "T2_iron_armor": 400,
    "T3_steel_armor": 600,
    "T4_silver_armor": 900,
    "T5_frost_armor": 1200,
    "T6_fire_armor": 1400,
    "T7_thunder_armor": 2000,
    "T8_mythical_armor": 2600,
    "T9_obsidian_armor": 3300,
    "T10_ragnarok_armor": 4000,
    "T11_flame_armor": 4800,
    "T12_wind_armor": 5800,
    "T13_battle_armor": 7000,
    "T14_runes_armor": 8400,
    "T15_legendary_armor": 10200
};

var shieldStats = {
    "T1_shield": 15,
    "T2_iron_shield": 30,
    "T3_steel_shield": 50,
    "T4_silver_shield": 80,
    "T5_frost_shield": 120,
    "T6_fire_shield": 150,
    "T7_thunder_shield": 200,
    "T8_mythical_shield": 260,
    "T9_obsidian_shield": 330,
    "T10_ragnarok_shield": 400,
    "T11_flame_shield": 480,
    "T12_wind_shield": 600,
    "T13_battle_shield": 740,
    "T14_runes_shield": 870,
    "T15_legendary_shield": 1040
};

var glovesStats = {
    "T1_gloves": 10,
    "T2_iron_gloves": 20,
    "T3_steel_gloves": 30,
    "T4_silver_gloves": 40,
    "T5_frost_gloves": 50,
    "T6_fire_gloves": 60,
    "T7_thunder_gloves": 80,
    "T8_mythical_gloves": 100,
    "T9_obsidian_gloves": 120,
    "T10_ragnarok_gloves": 140,
    "T11_flame_gloves": 160,
    "T12_wind_gloves": 190,
    "T13_battle_gloves": 230,
    "T14_runes_gloves": 280,
    "T15_legendary_gloves": 320
};

var bootsStats = {
    "T1_boots": 18,
    "T2_iron_boots": 36,
    "T3_steel_boots": 54,
    "T4_silver_boots": 72,
    "T5_frost_boots": 90,
    "T6_fire_boots": 108,
    "T7_thunder_boots": 135,
    "T8_mythical_boots": 162,
    "T9_obsidian_boots": 198,
    "T10_ragnarok_boots": 225,
    "T11_flame_boots": 255,
    "T12_wind_boots": 300,
    "T13_battle_boots": 360,
    "T14_runes_boots": 430,
    "T15_legendary_boots": 500
};








var weaponStats = {
    // Đao (Axe)
    "T1_axe": 20,
    "T2_iron_axe": 35,
    "T3_steel_axe": 55,
    "T4_war_axe": 80,
    "T5_frost_axe": 125,
    "T6_fire_axe": 185,
    "T7_thunder_axe": 230,
    "T8_iron_waraxe": 290,
    "T9_obsidian_axe": 360,
    "T10_ragnarok_axe": 450,
    "T11_flame_axe": 530,
    "T12_wind_axe": 680,
    "T13_battle_axe": 880,
    "T14_runes_axe": 1190,
    "T15_legendary_axe": 1320,

    // Kiếm (Sword)
    "T1_sword": 25,
    "T2_ironblade": 38,
    "T3_steelblade": 65,
    "T4_silverblade": 90,
    "T5_fireblade": 145,
    "T6_woodblade": 215,
    "T7_shadowblade": 270,
    "T8_bloodsword": 340,
    "T9_soulblade": 420,
    "T10_dragonblade": 520,
    "T11_moonblade": 620,
    "T12_stormblade": 780,
    "T13_nightblade": 990,
    "T14_runesword": 1320,
    "T15_legendaryblade": 1490,

    // Gậy (Staff)
    "T1_woodenstaff": 20,
    "T2_ironstaff": 35,
    "T3_steelstaff": 55,
    "T4_froststaff": 80,
    "T5_firestaff": 125,
    "T6_lightningstaff": 185,
    "T7_crystalstaff": 230,
    "T8_shadowstaff": 290,
    "T9_mysticstaff": 360,
    "T10_thunderstaff": 450,
    "T11_windstaff": 530,
    "T12_stormstaff": 680,
    "T13_runesstaff": 880,
    "T14_legendarystaff": 1190,
    "T15_ultimaterstaff": 1320,

    // Cung (Bow) - Đã chỉnh sửa
    "T1_shortbow": 28,
    "T2_woodenbow": 42,
    "T3_steelbow": 69,
    "T4_longbow": 98,
    "T5_frostbow": 155,
    "T6_flamebow": 225,
    "T7_windbow": 290,
    "T8_shadowbow": 360,
    "T9_thunderbow": 450,
    "T10_stormbow": 560,
    "T11_quickbow": 670,
    "T12_rune_bow": 840,
    "T13_venombow": 1060,
    "T14_hawkbow": 1400,
    "T15_legendarybow": 1590,

    // Thương (Spear) - Đã chỉnh sửa để bằng với Cung (Bow)
    "T1_spear": 32,
    "T2_woodenspear": 48,
    "T3_steelspear": 79,
    "T4_iron_spear": 108,
    "T5_trident": 169,
    "T6_war_spear": 245,
    "T7_darkspear": 320,
    "T8_dragonspear": 395,
    "T9_storm_spear": 498,
    "T10_thunder_spear": 610,
    "T11_skyspear": 720,
    "T12_frost_spear": 900,
    "T13_venom_spear": 1130,
    "T14_runespear": 1470,
    "T15_legendary_spear": 1680,
};








// Cập nhật kỹ năng cho từng player trong mảng players
function updateSkillsBasedOnInventory(players) {
  players.forEach(player => {
    // Lọc các kỹ năng từ inventory (otp6 === 9)
    const skillItems = player.inventory.filter(item => item.otp6 === 9);
    console.log(`Player ${player.id} dame =  ${player.dame} .`);
    if (skillItems.length > 0) {
      // Sắp xếp kỹ năng theo mức độ ưu tiên (otp8) và số lượt hồi chiêu (otp7)
      skillItems.sort((a, b) => {
        // Sắp xếp theo otp8 (mức độ ưu tiên) giảm dần
        if (a.otp8 !== b.otp8) return b.otp8 - a.otp8;
        // Nếu otp8 giống nhau, sắp xếp theo otp7 (số lượt hồi chiêu) tăng dần
        return a.otp7 - b.otp7;
      });

      skillItems.forEach(skill => {
        // Cập nhật thông tin kỹ năng vào "skills"
        const skillData = {
          skillName: skill.otp0,      // Tên kỹ năng
          skillPower: skill.otp1,     // Độ tăng của skill
          skillEffect: skill.otp2,    // Chỉ số tác động của skill (damage, heal, crit,...)
          manaCost: skill.otp3,       // Mana tiêu tốn khi sử dụng skill
          attackCount: skill.otp4,    // Số đòn đánh có hiệu quả
          otp4: skill.otp4,         //tạo giá trị mặc định
          otp7: skill.otp7,         //tạo giá trị mặc định
          otp8: skill.otp8,         //tạo giá trị mặc định
          run: skill.otp8 - skill.otp8,
          skillLevel: skill.otp5,  // Cấp độ của skill
          cooldownTurns: skill.otp7 - skill.otp7   //số lượt hồi chiêu
        };

        // Kiểm tra xem kỹ năng đã có trong player.skills chưa
        if (!player.skills) {
          player.skills = []; // Nếu chưa có, khởi tạo mảng kỹ năng
        }

        // Thêm hoặc cập nhật kỹ năng vào player.skills
        const existingSkillIndex = player.skills.findIndex(existingSkill => existingSkill.skillName === skillData.skillName);
        if (existingSkillIndex !== -1) {
          //không cần Cập nhật kỹ năng nếu đã tồn tại 
        //  player.skills[existingSkillIndex] = skillData;
        } else {
          // Thêm mới kỹ năng vào danh sách
          player.skills.push(skillData);
        }

        console.log(`Cập nhật kỹ năng ${skillData.skillName} cho player ${player.id}:`, skillData);

        // Cập nhật dữ liệu lên GitHub (nếu cần thiết)
        // updatePlayerStat(player.id, { "skills": player.skills }, token);
      });
    } else {
      console.log(`Player ${player.id} không có kỹ năng trong inventory.`);
    }
  });
}























// tránh gọi quá nhiều lần liên tục nếu không sẽ lỗi 409
// Hàm để cập nhật chỉ số của người chơi khi sử dụng kỹ năng
function updatePlayerStatsBasedOnSkills(player) {
  // Kiểm tra nếu player có kỹ năng
  if (!player.skills || player.skills.length === 0) {
    console.log("Không có kỹ năng nào.");
    return;
  }
  console.log(`Player ${player.id} dame =  ${player.dame} .`);
  // Sắp xếp kỹ năng theo mức độ ưu tiên (otp8) //số lượt hồi chiêu (cooldownTurns) otp7
  player.skills.sort((a, b) => b.otp8 - a.otp8); // Sắp xếp giảm dần theo mức độ ưu tiên

  // Lặp qua tất cả các kỹ năng của người chơi
  player.skills.forEach(skill => {
    // Kiểm tra hồi chiêu (otp7) trước khi áp dụng kỹ năng
    if (skill.attackCount > 0 && skill.cooldownTurns <= 0) {
      skill.run = 1
      if(skill.attackCount == skill.otp4) //chỉ tăng 1 lần đầu
      {
        
      // Tính toán các thay đổi dựa trên kỹ năng otp2
      switch(skill.skillEffect) {
        case 1: // Tăng dame
          player.dame += skill.skillPower * skill.skillLevel;
          break;
        case 2: // Tăng def
          player['def-dame'] += skill.skillPower * skill.skillLevel;
          break;
        case 3: // Tăng crit%
          player['crit-%'] += skill.skillPower * skill.skillLevel;
          break;
        case 4: // Tăng crit damage
          player['crit-x'] += skill.skillPower * skill.skillLevel;
          break;
        case 5: // Tăng mana
          player.mana += skill.skillPower * skill.skillLevel;
          break;
          
          case 6: // Tăng hp
          player.hp_max += skill.skillPower * skill.skillLevel;
          break;
          
          case 7: // Tăng attack speed
          player['attach-speed'] += skill.skillPower * skill.skillLevel;
          break;
          
          case 8: // Tăng def skill
          player['def-skill'] += skill.skillPower * skill.skillLevel;
          break;
          
          case 9: // Tăng né tránh
          player.NeTranh += skill.skillPower * skill.skillLevel;
          break;
          
          case 10: // Tăng hút máu
          player.HutMau += skill.skillPower * skill.skillLevel;
          break;
          
          case 11: // Tăng phản dame
          player.PhanDame += skill.skillPower * skill.skillLevel;
          break;
          
          case 12: // Tăng attack range
          player['attach-range'] += skill.skillPower * skill.skillLevel;
          break;
          
          
          
          
          
        // Thêm các hiệu ứng khác tùy thuộc vào yêu cầu của bạn
      }
      }
      // Giảm mana khi sử dụng kỹ năng
      player.mana -= skill.manaCost;

      // In ra kết quả
      console.log(`Sau khi ${skill.run} sử dụng ${skill.skillName}:`);
      console.log(`Dame: ${player.dame}, Def: ${player["def-dame"]}, Crit: ${player["crit-%"]}, Mana: ${player.mana}`);

      // Giảm số lượt của kỹ năng (attackCount)
      skill.attackCount -= 1;

      // Nếu hết lượt còn lại, bắt đầu thời gian hồi chiêu (cooldownTurns)
      if (skill.attackCount <= 0) {
        skill.cooldownTurns = skill.otp7; // Đặt lại số lượt hồi chiêu
      }

      console.log(`Số lượt còn lại của ${skill.skillName}: ${skill.attackCount}`);
      console.log(`Số lượt hồi chiêu của ${skill.skillName}: ${skill.cooldownTurns}`);
    } else if (skill.cooldownTurns > 0) {
      // Giảm số lượt hồi chiêu nếu kỹ năng đang hồi chiêu
      skill.cooldownTurns -= 1;
      
      console.log(`Kỹ năng ${skill.skillName} đang hồi chiêu, ${skill.run} còn lại ${skill.cooldownTurns} lượt`);
    }
  });
}

function checkSkillExpirationAndRemove(player) {
  if (!player.skills || player.skills.length === 0) {
    console.log("Không có kỹ năng nào.");
    return;
  }
  console.log(`Player ${player.id} dame =  ${player.dame} .`);
  
  const playerReport = playerDamageReport.find(r => r.id === player.id);
    // Bảng ánh xạ tên kỹ năng và emoji
const skillEmojiMap = {
  1: "💪",   // Ví dụ: skillEffect 1 => emoji 🛡️
  2: "🛡️",    // Ví dụ: skillEffect 2 => emoji ⚔️
  3: "✴️",    // Ví dụ: skillEffect 3 => emoji 🔥
  4: "☄️",   // Ví dụ: skillEffect 1 => emoji 🛡️
  5: "💧",    // Ví dụ: skillEffect 2 => emoji ⚔️
  6: "🍷",    // Ví dụ: skillEffect 3 => emoji 🔥
  7: "🚀",   // Ví dụ: skillEffect 1 => emoji 🛡️
  8: "🎽",    // Ví dụ: skillEffect 2 => emoji ⚔️
  9: "🍃",    // Ví dụ: skillEffect 3 => emoji 🔥
  10: "🧛",   // Ví dụ: skillEffect 1 => emoji 🛡️
  11: "♻",    // Ví dụ: skillEffect 2 => emoji ⚔️
  12: "😈",    // Ví dụ: skillEffect 3 => emoji 🔥
  13: "🛡️",   // Ví dụ: skillEffect 1 => emoji 🛡️
  14: "⚔️",    // Ví dụ: skillEffect 2 => emoji ⚔️
  15: "🔥",    // Ví dụ: skillEffect 3 => emoji 🔥
  // Thêm các ánh xạ khác nếu cần...
};

  

// Kiểm tra xem đã có thuộc tính `skill` trong `playerReport` hay chưa
if (playerReport.skill === undefined) {
  // Nếu chưa có `skill`, gán nó là chuỗi rỗng
  playerReport.skill = "📓";
} else {
  // Nếu đã có `skill`, đặt lại giá trị của `skill` thành chuỗi rỗng
  playerReport.skill = "📓";
}
  
  
  
  
  
  
  
  
  // Lặp qua các kỹ năng của player và kiểm tra nếu kỹ năng đã hết hiệu lực
  player.skills.forEach(skill => {
    
    
if (skill.run === 1) {
  const skillEmoji = skillEmojiMap[skill.skillEffect] || "🎮";  // Tra cứu emoji dựa trên tên kỹ năng

  // Kiểm tra xem đã có thuộc tính `skill` trong playerReport hay chưa
  if (playerReport.skill === undefined) {
    // Nếu chưa có, gán giá trị skill bằng emoji của kỹ năng
    playerReport.skill = skillEmoji;
  } else {
    // Nếu đã có `skill`, nối emoji vào giá trị hiện tại của skill
    playerReport.skill += skillEmoji;
  }

  console.log(`${skill.skillName} đang chạy! ${skillEmoji}`);
}

    
    
    if (skill.attackCount <= 0) {
      // Reset lại số lượt tấn công (attackCount) của kỹ năng
      skill.attackCount = skill.otp4; // Reset lại theo số đòn tấn công ban đầu
      skill.run = 0
      // Sau khi số lượt còn lại là 0, giảm các chỉ số đã được tăng lên
      switch (skill.skillEffect) {
        case 1: // Giảm dame
          player.dame -= skill.skillPower * skill.skillLevel;
          break;
        case 2: // Giảm def
          player["def-dame"] -= skill.skillPower * skill.skillLevel;
          break;
        case 3: // Giảm crit%
          player["crit-%"] -= skill.skillPower * skill.skillLevel;
          break;
        case 4: // Giảm crit damage
          player["crit-x"] -= skill.skillPower * skill.skillLevel;
          break;
        case 5: // Giảm mana
          player.mana -= skill.skillPower * skill.skillLevel;
          break;
          
              case 6: // Tăng hp
          player.hp_max -= skill.skillPower * skill.skillLevel;
          break;
          
          case 7: // Tăng attack speed
          player['attach-speed'] -= skill.skillPower * skill.skillLevel;
          break;
          
          case 8: // Tăng def skill
          player['def-skill'] -= skill.skillPower * skill.skillLevel;
          break;
          
          case 9: // Tăng né tránh
          player.NeTranh -= skill.skillPower * skill.skillLevel;
          break;
          
          case 10: // Tăng hút máu
          player.HutMau -= skill.skillPower * skill.skillLevel;
          break;
          
          case 11: // Tăng phản dame
          player.PhanDame -= skill.skillPower * skill.skillLevel;
          break;
          
          case 12: // Tăng attack range
          player['attach-range'] -= skill.skillPower * skill.skillLevel;
          break;      
          
          
          
          
          
          
          
      }

      // In ra thông báo kỹ năng đã hết hiệu lực và được reset
      console.log(`${skill.skillName} đã hết hiệu lực và được reset!`);
      console.log(`Dame: ${player.dame}, Def: ${player["def-dame"]}, Crit: ${player["crit-%"]}, Mana: ${player.mana}`);

      // Đặt lại số lượt hồi chiêu (cooldownTurns)
      skill.cooldownTurns = skill.otp7; // Đặt lại số lượt hồi chiêu sau khi hết hiệu lực
      console.log(`Số lượt hồi chiêu của ${skill.skillName} đã được đặt lại: ${skill.cooldownTurns}`);
    }
  });
}




























var GrapStats = {
    "1": 1.07, 
    "2": 1.13, 
    "3": 1.18,  
    "4": 1.22,  
    "5": 1.27,  
    "6": 1.31,
    "7": 1.35,
    "8": 1.40,
    "9": 1.47,
    "10": 1.54,
    "11": 1.62,
    "12": 1.76,
    "13": 1.92,
    "14": 2.18,
    "15": 2.35,
    "16": 2.62,
    "17": 2.90,
    "18": 3.59,
    "19": 4.10,
};









let boss = {
  id: "boss001",
  name: "Big Boss",
  hp: 20000, // Máu của boss
  lv:10, 
  damage: 50,       // Sát thương của boss
  defense: 50,       // Phòng thủ của boss
  isAlive: true,     // Trạng thái sống của boss
  boss:1,
};



let players = [];



// Cập nhật hàm tính sát thương với mục tiêu có thể là người chơi hoặc boss
function calculatePlayerDamage(player, target) {
  const baseDamage = player.dame; // Sát thương cơ bản của người chơi
  const critChance = player['crit-%']; // Tỉ lệ chí mạng
  const critMultiplier = player['crit-x']; // Nhân đôi sát thương khi chí mạng
  const range = player['attach-range'];  //tỉ lệ đánh 2 lần liên tiếp
  const hutmau = player.HutMau; 
  let isNetranh = false
  let isPhandame = false
  
  // Kiểm tra xem người chơi có chí mạng không
  const isCrit = Math.random() < critChance / 100; // Xác suất chí mạng (từ 0 đến 1)
  const isRange = Math.random() < range / 100; // Xác suất chí mạng (từ 0 đến 1)
  const isHutmau = Math.random() < hutmau / 100; 

  let finalDamage = isCrit ? baseDamage * critMultiplier : baseDamage; // Sát thương cuối cùng khi có chí mạng
      finalDamage = isRange ? finalDamage * 2 : finalDamage;
      player.hp += isHutmau ? finalDamage : 0;
  
  
  
  
  // Nếu mục tiêu là boss
  if (target && target.boss == 1) {
    finalDamage -= target.defense;  // Phòng thủ của boss giảm sát thương người chơi gây ra
  }
  // Nếu mục tiêu là người chơi
  else if (target && target.boss == 0) {
    finalDamage -= target['def-dame'];  // Phòng thủ của người chơi giảm sát thương người chơi gây ra
    
    const netranh = target.NeTranh;
    const phandame = target.PhanDame;
     isNetranh = Math.random() < netranh / 100; 
     isPhandame = Math.random() < phandame / 100; 
     finalDamage = isNetranh ? 0 : finalDamage;
     player.hp -= isPhandame ? finalDamage : 0;
    
  }

  // Đảm bảo rằng sát thương không âm
  finalDamage = Math.max(0, finalDamage);

  // Lấy thông tin của người chơi đang tấn công
  const playertarget = players.indexOf(target) + 1; // Xác định người chơi tấn công (1, 2, hoặc 3)

  return {
    damage: finalDamage,  // Sát thương tính ra sau khi giảm phòng thủ
    isCrit: isCrit,       // Kiểm tra nếu là chí mạng
    isNetranh : isNetranh,
    isPhandame : isPhandame,
    isRange : isRange,
    isHutmau : isHutmau,
    playertarget: playertarget // Thông tin về người chơi tấn công
  };
}




function recordPlayerAttack(player, target) {

  if (player.hp <= 0) return

  updatePlayerStatsBasedOnSkills(player);
  
  const playerReport = playerDamageReport.find(r => r.id === player.id);

  
  // Tính sát thương của người chơi (đã bao gồm phòng thủ của mục tiêu)
const result = calculatePlayerDamage(player, target);  // Lấy toàn bộ kết quả từ hàm

// Destructure các thuộc tính từ result
const { damage, isCrit, playertarget, isNetranh, isPhandame, isRange, isHutmau } = result;

// Ghi nhận đòn đánh và tổng sát thương của người chơi
playerReport.attacks.push({ damage, isCrit, playertarget, isNetranh, isPhandame, isRange, isHutmau });


  playerReport.totalDamage += damage;
  checkSkillExpirationAndRemove(player);
  if (target.hp > 0) {
    target.hp -= damage;
    
  }
    displayDamageReportplayer(player, target)

}




let attackIntervals = [];  // Mảng lưu trữ các vòng lặp tấn công và thông tin người tấn công

// Mảng để lưu trữ tất cả các setInterval báo cáo
let reportIntervals = [];

function startBossFight(targetPlayer = null, a = null) {
  // Kiểm tra nếu có mục tiêu, nếu không thì chọn boss làm mục tiêu mặc định
  let target = targetPlayer || boss;  // Mặc định chọn boss làm mục tiêu nếu không có player mục tiêu
  
    handlePlayerAttack(a, target);
}



// Hàm dừng tất cả các vòng lặp tấn công
function stopAllAttacks() {
  attackIntervals.forEach(intervalObj => clearInterval(intervalObj.intervalId));
  attackIntervals = [];  // Xóa mảng chứa các vòng lặp tấn công
  console.log("Boss đã chết, dừng tất cả các vòng lặp tấn công.");
}








// Hàm dừng tấn công của một người chơi cụ thể
function stopAttackOfPlayer(player) {
  const existingInterval = attackIntervals.find(intervalObj => intervalObj.a === player);
  if (existingInterval) {
    clearInterval(existingInterval.intervalId);  // Dừng vòng lặp cũ
    attackIntervals = attackIntervals.filter(intervalObj => intervalObj.a !== player);  // Xóa 'a' khỏi danh sách lưu trữ
    console.log(`${player.name} đã bị dừng tấn công vì mục tiêu không phải boss`);
  }
}

function handlePlayerAttack(player, target) {
  // Kiểm tra xem đã có vòng lặp tấn công cho player chưa
  const existingInterval = attackIntervals.find(intervalObj => intervalObj.a === player);
  if (existingInterval) {
    clearInterval(existingInterval.intervalId);  // Dừng vòng lặp cũ
    attackIntervals = attackIntervals.filter(intervalObj => intervalObj.a !== player);  // Xóa 'a' khỏi danh sách lưu trữ
  }

  // Kiểm tra nếu player đã chết, dừng tấn công
if (player.hp <= 0) {
  console.log(`${player.name} đã chết, dừng tấn công.`);
  clearInterval(existingInterval.intervalId);  // Dừng vòng lặp nếu player chết
  sendMessage(player.id_bot, `${player.name} đã chết và không thể tấn công nữa.`, { parse_mode: 'HTML' });
  return;  // Dừng hàm nếu player đã chết
}


  
  // Tính toán tốc độ tấn công và sát thương
  const attackSpeed = player['attach-speed'];  // Tốc độ đánh của player
  const damage = calculatePlayerDamage(player, target);  // Tính sát thương mỗi đòn đánh của player

  // Tấn công theo tốc độ đánh của player
  const attackInterval = setInterval(() => {
    
    // Kiểm tra nếu player đã chết trong khi tấn công
if (player.hp <= 0) {
  clearInterval(attackInterval);  // Dừng vòng lặp nếu player chết
  console.log(`${player.name} đã chết, dừng tấn công.`);
  sendMessage(player.id_bot, `${player.name} đã chết và không thể tiếp tục tấn công.`, { parse_mode: 'HTML' });
  return;  // Dừng vòng lặp nếu player chết
}

    
    
    if (target.hp <= 0) {  // Kiểm tra nếu mục tiêu đã chết
      clearInterval(attackInterval);  // Dừng vòng lặp tấn công nếu mục tiêu đã chết
      console.log(`${target.name} đã chết, dừng tấn công.`);
      sendMessage(-4676989627, `${target.name} đã chết!`, { parse_mode: 'HTML' });
            // Dừng tất cả các báo cáo liên quan đến mục tiêu này
      if(target.boss === 1)dropItem(player,target)
      // Dừng tất cả các vòng lặp tấn công nếu boss chết
      if (target.name === "big boss" && target.hp <= 0) {
        stopAllAttacks();  // Dừng tất cả các vòng lặp tấn công khi boss chết
      }

      // Dừng vòng tấn công của player nếu mục tiêu không phải boss
      if (target.boss === 0) {
        stopAttackOfPlayer(player);
      }
      return;  // Dừng vòng lặp tấn công
    }

    recordPlayerAttack(player, target); // Ghi nhận sát thương khi tấn công
  }, attackSpeed * 1000);  // Tốc độ đánh tính theo giây

  // Lưu thông tin vòng lặp tấn công của 'a'
  attackIntervals.push({ intervalId: attackInterval, a: player });
  console.log(`${player.name} đang tấn công ${target.name}`);
}


// Hàm dropItem nhận vào đối tượng player
function dropItem(player,target) {
  // Tìm playerReport tương ứng với player.id
  const playerReport = playerDamageReport.find(report => report.id === player.id);
  let tangrate = 0
  // Kiểm tra nếu tìm thấy playerReport và lấy totalDamage
  if (playerReport) {
    const totalDamage = playerReport.totalDamage;
    sendMessage(-4676989627, `Tổng sát thương của ${player.name}: ${totalDamage}`, { parse_mode: 'HTML' });
    console.log(`Tổng sát thương của ${player.name}: ${totalDamage}`);
        // Đặt lại totalDamage sau khi lấy giá trị
    playerReport.totalDamage = 0;  // Đặt lại totalDamage về 0 (hoặc giá trị khác nếu cần)
    
    tangrate = Math.round(totalDamage / 100);
    
if (target.boss == 1) {
    const item = checkdropitem(target.lv, itemsrate, tangrate);  // Kiểm tra drop item
    if (item !== null) {  // Nếu item không phải null
        addItemToInventory(player.id, item);  // Thêm item vào inventory
        sendMessage(-4676989627, `check drop ${player.name} - Món đồ rơi: ${item}`, { parse_mode: 'HTML' });
    } else {
        console.log('Không có món đồ nào được rơi.');  // In ra nếu không có item rơi
        // Gửi thông báo khi không có item rơi
        sendMessage(-4676989627, `Không có món đồ nào rơi từ boss ${target.boss} cho người chơi ${player.name}.`, { parse_mode: 'HTML' });
    }
}

  player.gold = Number(player.gold); // Đảm bảo player.gold là kiểu số
  player.gold += Math.round(totalDamage / 10);
    
  player.exp = Number(player.exp); // Đảm bảo player.gold là kiểu số
  player.exp += Math.round(totalDamage / 10);    
    
    return totalDamage;  // Trả về tổng sát thương nếu tìm thấy
  } else {
    console.log("Không tìm thấy playerReport với id này.");
    return 0;  // Trả về 0 nếu không tìm thấy
  }
}









// danh sách các món đồ drop chuẩn, kể cả sách skill, ngọc ép / nghĩa là các chỉ số chuẩn ban đầu của item
const items = {
  "T1_spear": {"otp0": "T1_spear", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T2_woodenspear": {"otp0": "T2_woodenspear", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T3_steelspear": {"otp0": "T3_steelspear", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T4_iron_spear": {"otp0": "T4_iron_spear", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T5_trident": {"otp0": "T5_trident", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T6_war_spear": {"otp0": "T6_war_spear", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T7_darkspear": {"otp0": "T7_darkspear", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T8_dragonspear": {"otp0": "T8_dragonspear", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T9_storm_spear": {"otp0": "T9_storm_spear", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T10_thunder_spear": {"otp0": "T10_thunder_spear", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T11_skyspear": {"otp0": "T11_skyspear", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T12_frost_spear": {"otp0": "T12_frost_spear", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T13_venom_spear": {"otp0": "T13_venom_spear", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T14_runespear": {"otp0": "T14_runespear", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T15_legendary_spear": {"otp0": "T15_legendary_spear", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  
  "T1_armor": {"otp0": "T1_armor", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T2_iron_armor": {"otp0": "T2_iron_armor", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T3_steel_armor": {"otp0": "T3_steel_armor", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T4_silver_armor": {"otp0": "T4_silver_armor", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T5_frost_armor": {"otp0": "T5_frost_armor", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T6_fire_armor": {"otp0": "T6_fire_armor", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T7_thunder_armor": {"otp0": "T7_thunder_armor", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T8_mythical_armor": {"otp0": "T8_mythical_armor", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T9_obsidian_armor": {"otp0": "T9_obsidian_armor", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T10_ragnarok_armor": {"otp0": "T10_ragnarok_armor", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T11_flame_armor": {"otp0": "T11_flame_armor", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T12_wind_armor": {"otp0": "T12_wind_armor", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T13_battle_armor": {"otp0": "T13_battle_armor", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T14_runes_armor": {"otp0": "T14_runes_armor", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T15_legendary_armor": {"otp0": "T15_legendary_armor", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  
  "T1_shield": {"otp0": "T1_shield", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T2_iron_shield": {"otp0": "T2_iron_shield", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T3_steel_shield": {"otp0": "T3_steel_shield", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T4_silver_shield": {"otp0": "T4_silver_shield", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T5_frost_shield": {"otp0": "T5_frost_shield", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T6_fire_shield": {"otp0": "T6_fire_shield", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T7_thunder_shield": {"otp0": "T7_thunder_shield", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T8_mythical_shield": {"otp0": "T8_mythical_shield", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T9_obsidian_shield": {"otp0": "T9_obsidian_shield", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T10_ragnarok_shield": {"otp0": "T10_ragnarok_shield", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  
  "T1_gloves": {"otp0": "T1_gloves", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T2_iron_gloves": {"otp0": "T2_iron_gloves", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T3_steel_gloves": {"otp0": "T3_steel_gloves", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T4_silver_gloves": {"otp0": "T4_silver_gloves", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T5_frost_gloves": {"otp0": "T5_frost_gloves", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T6_fire_gloves": {"otp0": "T6_fire_gloves", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T7_thunder_gloves": {"otp0": "T7_thunder_gloves", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T8_mythical_gloves": {"otp0": "T8_mythical_gloves", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T9_obsidian_gloves": {"otp0": "T9_obsidian_gloves", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T10_ragnarok_gloves": {"otp0": "T10_ragnarok_gloves", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  
  "T1_boots": {"otp0": "T1_boots", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T2_iron_boots": {"otp0": "T2_iron_boots", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T3_steel_boots": {"otp0": "T3_steel_boots", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T4_silver_boots": {"otp0": "T4_silver_boots", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T5_frost_boots": {"otp0": "T5_frost_boots", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T6_fire_boots": {"otp0": "T6_fire_boots", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T7_thunder_boots": {"otp0": "T7_thunder_boots", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T8_mythical_boots": {"otp0": "T8_mythical_boots", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T9_obsidian_boots": {"otp0": "T9_obsidian_boots", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T10_ragnarok_boots": {"otp0": "T10_ragnarok_boots", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  
  "T1_axe": {"otp0": "T1_axe", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T2_iron_axe": {"otp0": "T2_iron_axe", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T3_steel_axe": {"otp0": "T3_steel_axe", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T4_war_axe": {"otp0": "T4_war_axe", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T5_frost_axe": {"otp0": "T5_frost_axe", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T6_fire_axe": {"otp0": "T6_fire_axe", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T7_thunder_axe": {"otp0": "T7_thunder_axe", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T8_iron_waraxe": {"otp0": "T8_iron_waraxe", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T9_obsidian_axe": {"otp0": "T9_obsidian_axe", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T10_ragnarok_axe": {"otp0": "T10_ragnarok_axe", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T11_flame_axe": {"otp0": "T11_flame_axe", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T12_wind_axe": {"otp0": "T12_wind_axe", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T13_battle_axe": {"otp0": "T13_battle_axe", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T14_runes_axe": {"otp0": "T14_runes_axe", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T15_legendary_axe": {"otp0": "T15_legendary_axe", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  
  // Kiếm (Sword)
  "T1_sword": {"otp0": "T1_sword", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T2_ironblade": {"otp0": "T2_ironblade", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T3_steelblade": {"otp0": "T3_steelblade", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T4_silverblade": {"otp0": "T4_silverblade", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T5_fireblade": {"otp0": "T5_fireblade", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T6_woodblade": {"otp0": "T6_woodblade", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T7_shadowblade": {"otp0": "T7_shadowblade", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T8_bloodsword": {"otp0": "T8_bloodsword", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T9_soulblade": {"otp0": "T9_soulblade", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T10_dragonblade": {"otp0": "T10_dragonblade", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T11_moonblade": {"otp0": "T11_moonblade", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T12_stormblade": {"otp0": "T12_stormblade", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T13_nightblade": {"otp0": "T13_nightblade", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T14_runesword": {"otp0": "T14_runesword", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T15_legendaryblade": {"otp0": "T15_legendaryblade", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  
  // Gậy (Staff)
  "T1_woodenstaff": {"otp0": "T1_woodenstaff", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T2_ironstaff": {"otp0": "T2_ironstaff", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T3_steelstaff": {"otp0": "T3_steelstaff", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T4_froststaff": {"otp0": "T4_froststaff", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T5_firestaff": {"otp0": "T5_firestaff", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T6_lightningstaff": {"otp0": "T6_lightningstaff", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T7_crystalstaff": {"otp0": "T7_crystalstaff", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T8_shadowstaff": {"otp0": "T8_shadowstaff", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T9_mysticstaff": {"otp0": "T9_mysticstaff", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T10_thunderstaff": {"otp0": "T10_thunderstaff", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T11_windstaff": {"otp0": "T11_windstaff", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T12_stormstaff": {"otp0": "T12_stormstaff", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T13_runesstaff": {"otp0": "T13_runesstaff", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T14_legendarystaff": {"otp0": "T14_legendarystaff", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T15_ultimaterstaff": {"otp0": "T15_ultimaterstaff", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  
  "T1_shortbow": {"otp0": "T1_shortbow", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T2_woodenbow": {"otp0": "T2_woodenbow", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T3_steelbow": {"otp0": "T3_steelbow", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T4_longbow": {"otp0": "T4_longbow", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T5_frostbow": {"otp0": "T5_frostbow", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T6_flamebow": {"otp0": "T6_flamebow", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T7_windbow": {"otp0": "T7_windbow", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T8_shadowbow": {"otp0": "T8_shadowbow", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T9_thunderbow": {"otp0": "T9_thunderbow", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T10_stormbow": {"otp0": "T10_stormbow", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T11_quickbow": {"otp0": "T11_quickbow", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T12_rune_bow": {"otp0": "T12_rune_bow", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T13_venombow": {"otp0": "T13_venombow", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T14_hawkbow": {"otp0": "T14_hawkbow", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T15_legendarybow": {"otp0": "T15_legendarybow", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  
  
  
  
"gem_dame_5": { "otp0": "gem_dame_5", "otp1": 1, "otp6": 8, "otp9": 1 },
"gem_dame_7": { "otp0": "gem_dame_7", "otp1": 1, "otp6": 8, "otp9": 1 },
"gem_dame_9": { "otp0": "gem_dame_9", "otp1": 1, "otp6": 8, "otp9": 1 },
"gem_dame_12": { "otp0": "gem_dame_12", "otp1": 1, "otp6": 8, "otp9": 1 },
"gem_dame_15": { "otp0": "gem_dame_15", "otp1": 1, "otp6": 8, "otp9": 1 },
"gem_dame_18": { "otp0": "gem_dame_18", "otp1": 1, "otp6": 8, "otp9": 1 },
"gem_dame_21": { "otp0": "gem_dame_21", "otp1": 1, "otp6": 8, "otp9": 1 },
"gem_dame_25": { "otp0": "gem_dame_25", "otp1": 1, "otp6": 8, "otp9": 1 },
"gem_dame_30": { "otp0": "gem_dame_30", "otp1": 1, "otp6": 8, "otp9": 1 },
"gem_dame_35": { "otp0": "gem_dame_35", "otp1": 1, "otp6": 8, "otp9": 1 },
"gem_dame_40": { "otp0": "gem_dame_40", "otp1": 1, "otp6": 8, "otp9": 1 },
"gem_dame_45": { "otp0": "gem_dame_45", "otp1": 1, "otp6": 8, "otp9": 1 },
"gem_dame_50": { "otp0": "gem_dame_50", "otp1": 1, "otp6": 8, "otp9": 1 },
"gem_dame_55": { "otp0": "gem_dame_55", "otp1": 1, "otp6": 8, "otp9": 1 },
"gem_dame_60": { "otp0": "gem_dame_60", "otp1": 1, "otp6": 8, "otp9": 1 },
"gem_dame_65": { "otp0": "gem_dame_65", "otp1": 1, "otp6": 8, "otp9": 1 },
"gem_dame_70": { "otp0": "gem_dame_70", "otp1": 1, "otp6": 8, "otp9": 1 },
"gem_dame_80": { "otp0": "gem_dame_80", "otp1": 1, "otp6": 8, "otp9": 1 },
"gem_dame_90": { "otp0": "gem_dame_90", "otp1": 1, "otp6": 8, "otp9": 1 },
"gem_dame_100": { "otp0": "gem_dame_100", "otp1": 1, "otp6": 8, "otp9": 1 },

  
  
"gem_def_5": { "otp0": "gem_def_5", "otp1": 1, "otp6": 8, "otp9": 1 },
"gem_def_7": { "otp0": "gem_def_7", "otp1": 1, "otp6": 8, "otp9": 1 },
"gem_def_9": { "otp0": "gem_def_9", "otp1": 1, "otp6": 8, "otp9": 1 },
"gem_def_12": { "otp0": "gem_def_12", "otp1": 1, "otp6": 8, "otp9": 1 },
"gem_def_15": { "otp0": "gem_def_15", "otp1": 1, "otp6": 8, "otp9": 1 },
"gem_def_18": { "otp0": "gem_def_18", "otp1": 1, "otp6": 8, "otp9": 1 },
"gem_def_21": { "otp0": "gem_def_21", "otp1": 1, "otp6": 8, "otp9": 1 },
"gem_def_25": { "otp0": "gem_def_25", "otp1": 1, "otp6": 8, "otp9": 1 },
"gem_def_30": { "otp0": "gem_def_30", "otp1": 1, "otp6": 8, "otp9": 1 },
"gem_def_35": { "otp0": "gem_def_35", "otp1": 1, "otp6": 8, "otp9": 1 },
"gem_def_40": { "otp0": "gem_def_40", "otp1": 1, "otp6": 8, "otp9": 1 },
"gem_def_45": { "otp0": "gem_def_45", "otp1": 1, "otp6": 8, "otp9": 1 },
"gem_def_50": { "otp0": "gem_def_50", "otp1": 1, "otp6": 8, "otp9": 1 },
"gem_def_55": { "otp0": "gem_def_55", "otp1": 1, "otp6": 8, "otp9": 1 },
"gem_def_60": { "otp0": "gem_def_60", "otp1": 1, "otp6": 8, "otp9": 1 },
"gem_def_65": { "otp0": "gem_def_65", "otp1": 1, "otp6": 8, "otp9": 1 },
"gem_def_70": { "otp0": "gem_def_70", "otp1": 1, "otp6": 8, "otp9": 1 },
"gem_def_80": { "otp0": "gem_def_80", "otp1": 1, "otp6": 8, "otp9": 1 },
"gem_def_90": { "otp0": "gem_def_90", "otp1": 1, "otp6": 8, "otp9": 1 },
"gem_def_100": { "otp0": "gem_def_100", "otp1": 1, "otp6": 8, "otp9": 1 },
  
  
  
"gem_defskill_5": { "otp0": "gem_defskill_5", "otp1": 1, "otp6": 8, "otp9": 1 },
"gem_defskill_7": { "otp0": "gem_defskill_7", "otp1": 1, "otp6": 8, "otp9": 1 },
"gem_defskill_9": { "otp0": "gem_defskill_9", "otp1": 1, "otp6": 8, "otp9": 1 },
"gem_defskill_12": { "otp0": "gem_defskill_12", "otp1": 1, "otp6": 8, "otp9": 1 },
"gem_defskill_15": { "otp0": "gem_defskill_15", "otp1": 1, "otp6": 8, "otp9": 1 },
"gem_defskill_18": { "otp0": "gem_defskill_18", "otp1": 1, "otp6": 8, "otp9": 1 },
"gem_defskill_21": { "otp0": "gem_defskill_21", "otp1": 1, "otp6": 8, "otp9": 1 },
"gem_defskill_25": { "otp0": "gem_defskill_25", "otp1": 1, "otp6": 8, "otp9": 1 },
"gem_defskill_30": { "otp0": "gem_defskill_30", "otp1": 1, "otp6": 8, "otp9": 1 },
"gem_defskill_35": { "otp0": "gem_defskill_35", "otp1": 1, "otp6": 8, "otp9": 1 },
"gem_defskill_40": { "otp0": "gem_defskill_40", "otp1": 1, "otp6": 8, "otp9": 1 },
"gem_defskill_45": { "otp0": "gem_defskill_45", "otp1": 1, "otp6": 8, "otp9": 1 },
"gem_defskill_50": { "otp0": "gem_defskill_50", "otp1": 1, "otp6": 8, "otp9": 1 },
"gem_defskill_55": { "otp0": "gem_defskill_55", "otp1": 1, "otp6": 8, "otp9": 1 },
"gem_defskill_60": { "otp0": "gem_defskill_60", "otp1": 1, "otp6": 8, "otp9": 1 },
"gem_defskill_65": { "otp0": "gem_defskill_65", "otp1": 1, "otp6": 8, "otp9": 1 },
"gem_defskill_70": { "otp0": "gem_defskill_70", "otp1": 1, "otp6": 8, "otp9": 1 },
"gem_defskill_80": { "otp0": "gem_defskill_80", "otp1": 1, "otp6": 8, "otp9": 1 },
"gem_defskill_90": { "otp0": "gem_defskill_90", "otp1": 1, "otp6": 8, "otp9": 1 },
"gem_defskill_100": { "otp0": "gem_defskill_100", "otp1": 1, "otp6": 8, "otp9": 1 },
  
  
  
  
"gem_hp_50": { "otp0": "gem_hp_50", "otp1": 1, "otp6": 8, "otp9": 1 },
"gem_hp_70": { "otp0": "gem_hp_70", "otp1": 1, "otp6": 8, "otp9": 1 },
"gem_hp_90": { "otp0": "gem_hp_90", "otp1": 1, "otp6": 8, "otp9": 1 },
"gem_hp_120": { "otp0": "gem_hp_120", "otp1": 1, "otp6": 8, "otp9": 1 },
"gem_hp_150": { "otp0": "gem_hp_150", "otp1": 1, "otp6": 8, "otp9": 1 },
"gem_hp_180": { "otp0": "gem_hp_180", "otp1": 1, "otp6": 8, "otp9": 1 },
"gem_hp_210": { "otp0": "gem_hp_210", "otp1": 1, "otp6": 8, "otp9": 1 },
"gem_hp_250": { "otp0": "gem_hp_250", "otp1": 1, "otp6": 8, "otp9": 1 },
"gem_hp_300": { "otp0": "gem_hp_300", "otp1": 1, "otp6": 8, "otp9": 1 },
"gem_hp_350": { "otp0": "gem_hp_350", "otp1": 1, "otp6": 8, "otp9": 1 },
"gem_hp_400": { "otp0": "gem_hp_400", "otp1": 1, "otp6": 8, "otp9": 1 },
"gem_hp_450": { "otp0": "gem_hp_450", "otp1": 1, "otp6": 8, "otp9": 1 },
"gem_hp_500": { "otp0": "gem_hp_500", "otp1": 1, "otp6": 8, "otp9": 1 },
"gem_hp_550": { "otp0": "gem_hp_550", "otp1": 1, "otp6": 8, "otp9": 1 },
"gem_hp_600": { "otp0": "gem_hp_600", "otp1": 1, "otp6": 8, "otp9": 1 },
"gem_hp_650": { "otp0": "gem_hp_650", "otp1": 1, "otp6": 8, "otp9": 1 },
"gem_hp_700": { "otp0": "gem_hp_700", "otp1": 1, "otp6": 8, "otp9": 1 },
"gem_hp_800": { "otp0": "gem_hp_800", "otp1": 1, "otp6": 8, "otp9": 1 },
"gem_hp_900": { "otp0": "gem_hp_900", "otp1": 1, "otp6": 8, "otp9": 1 },
"gem_hp_1000": { "otp0": "gem_hp_1000", "otp1": 1, "otp6": 8, "otp9": 1 },
 
  
  
  

  
  "skill_dame1": { "otp0": "skill_dame1", "otp1": 10, "otp2": 1, "otp3": 10, "otp4": 3, "otp5": 1, "otp6": 9, "otp7": 5, "otp8": 1, "otp9": 1 },
  "skill_dame2": { "otp0": "skill_dame2", "otp1": 20, "otp2": 1, "otp3": 20, "otp4": 3, "otp5": 1, "otp6": 9, "otp7": 7, "otp8": 1, "otp9": 1 },
  "skill_dame3": { "otp0": "skill_dame3", "otp1": 30, "otp2": 1, "otp3": 30, "otp4": 3, "otp5": 1, "otp6": 9, "otp7": 9, "otp8": 1, "otp9": 1 },
  "skill_dame4": { "otp0": "skill_dame4", "otp1": 40, "otp2": 1, "otp3": 50, "otp4": 2, "otp5": 1, "otp6": 9, "otp7": 12, "otp8": 1, "otp9": 1 },
  "skill_dame5": { "otp0": "skill_dame5", "otp1": 50, "otp2": 1, "otp3": 80, "otp4": 2, "otp5": 1, "otp6": 9, "otp7": 15, "otp8": 1, "otp9": 1 },
  "skill_dame6": { "otp0": "skill_dame6", "otp1": 60, "otp2": 1, "otp3": 100, "otp4": 2, "otp5": 1, "otp6": 9, "otp7": 16, "otp8": 1, "otp9": 1 },
  "skill_dame7": { "otp0": "skill_dame7", "otp1": 70, "otp2": 1, "otp3": 150, "otp4": 2, "otp5": 1, "otp6": 9, "otp7": 17, "otp8": 1, "otp9": 1 },
  "skill_dame8": { "otp0": "skill_dame8", "otp1": 80, "otp2": 1, "otp3": 180, "otp4": 1, "otp5": 1, "otp6": 9, "otp7": 18, "otp8": 1, "otp9": 1 },
  "skill_dame9": { "otp0": "skill_dame9", "otp1": 90, "otp2": 1, "otp3": 210, "otp4": 1, "otp5": 1, "otp6": 9, "otp7": 19, "otp8": 1, "otp9": 1 },
  "skill_dame10": { "otp0": "skill_dame10", "otp1": 100, "otp2": 1, "otp3": 310, "otp4": 1, "otp5": 1, "otp6": 9, "otp7": 20, "otp8": 1, "otp9": 1 },

  "skill_def": { "otp0": "skill_def", "otp1": 50, "otp2": 2, "otp3": 100, "otp4": 2, "otp5": 1, "otp6": 9, "otp7": 8, "otp8": 1, "otp9": 1 },
  "skill_def": { "otp0": "skill_def", "otp1": 50, "otp2": 2, "otp3": 100, "otp4": 2, "otp5": 1, "otp6": 9, "otp7": 8, "otp8": 1, "otp9": 1 },

  "skill_crit": { "otp0": "skill_crit", "otp1": 3, "otp2": 3, "otp3": 100, "otp4": 4, "otp5": 1, "otp6": 9, "otp7": 8, "otp8": 1, "otp9": 1 },
  "skill_crit1": { "otp0": "skill_crit1", "otp1": 5, "otp2": 3, "otp3": 200, "otp4": 2, "otp5": 1, "otp6": 9, "otp7": 5, "otp8": 1, "otp9": 1 },
 
  "skill_critX": { "otp0": "skill_critX", "otp1": 1, "otp2": 4, "otp3": 100, "otp4": 5, "otp5": 1, "otp6": 9, "otp7": 10, "otp8": 1, "otp9": 1 },
  "skill_critX1": { "otp0": "skill_critX1", "otp1": 2, "otp2": 4, "otp3": 100, "otp4": 5, "otp5": 1, "otp6": 5, "otp7": 10, "otp8": 1, "otp9": 1 },
  
  "skill_mana": { "otp0": "skill_mana", "otp1": 800, "otp2": 5, "otp3": 10, "otp4": 8000, "otp5": 1, "otp6": 9, "otp7": 10, "otp8": 1, "otp9": 1 },
  
  "skill_hp": { "otp0": "skill_hp", "otp1": 300, "otp2": 6, "otp3": 10, "otp4": 4000, "otp5": 1, "otp6": 9, "otp7": 5, "otp8": 1, "otp9": 1 },
  
  "skill_speed": { "otp0": "skill_speed", "otp1": -0.25, "otp2": 7, "otp3": 10, "otp4": 2, "otp5": 1, "otp6": 9, "otp7": 5, "otp8": 1, "otp9": 1 },
  "skill_speed1": { "otp0": "skill_speed1", "otp1": -0.4, "otp2": 7, "otp3": 10, "otp4": 2, "otp5": 1, "otp6": 9, "otp7": 3, "otp8": 1, "otp9": 1 },
  
  "skill_defskill": { "otp0": "skill_defskill", "otp1": 50, "otp2": 8, "otp3": 20, "otp4": 5, "otp5": 1, "otp6": 9, "otp7": 5, "otp8": 1, "otp9": 1 },
  
  "skill_NeTranh": { "otp0": "skill_NeTranh", "otp1": 3, "otp2": 9, "otp3": 50, "otp4": 4, "otp5": 1, "otp6": 9, "otp7": 4, "otp8": 1, "otp9": 1 },
  "skill_NeTranh1": { "otp0": "skill_NeTranh1", "otp1": 5, "otp2": 9, "otp3": 50, "otp4": 3, "otp5": 1, "otp6": 9, "otp7": 3, "otp8": 1, "otp9": 1 },
  
  "skill_HutMau": { "otp0": "skill_HutMau", "otp1": 3, "otp2": 10, "otp3": 50, "otp4": 3, "otp5": 1, "otp6": 9, "otp7": 3, "otp8": 1, "otp9": 1 },
  "skill_HutMau1": { "otp0": "skill_HutMau1", "otp1": 5, "otp2": 10, "otp3": 50, "otp4": 3, "otp5": 1, "otp6": 9, "otp7": 5, "otp8": 1, "otp9": 1 },
  
  "skill_PhanDame": { "otp0": "skill_PhanDame", "otp1": 3, "otp2": 11, "otp3": 50, "otp4": 4, "otp5": 1, "otp6": 9, "otp7": 4, "otp8": 1, "otp9": 1 },
  "skill_PhanDame1": { "otp0": "skill_PhanDame1", "otp1": 5, "otp2": 11, "otp3": 50, "otp4": 3, "otp5": 1, "otp6": 9, "otp7": 5, "otp8": 1, "otp9": 1 },

  "skill_range": { "otp0": "skill_range", "otp1": 3, "otp2": 12, "otp3": 50, "otp4": 4, "otp5": 1, "otp6": 9, "otp7": 4, "otp8": 1, "otp9": 1 },
  "skill_range1": { "otp0": "skill_range1", "otp1": 5, "otp2": 12, "otp3": 50, "otp4": 2, "otp5": 1, "otp6": 9, "otp7": 2, "otp8": 1, "otp9": 1 },

  
  
};







// Hàm thêm đồ vào inventory của người chơi
function addItemToInventory(playerId, itemId) {
  // Tìm người chơi có id tương ứng
  const player = players.find(p => p.id === playerId);
  
  if (!player) {
    console.log(`Không tìm thấy người chơi với id: ${playerId}.`);
    return;
  }
  
  // Kiểm tra xem itemId có tồn tại trong items hay không
  if (!(itemId in items)) {
    console.log(`Không tìm thấy món đồ với id: ${itemId}.`);
    return;
  }
  
  // Lấy thông tin món đồ từ items
  const item = items[itemId];
  
  // Kiểm tra nếu món đồ đã có trong inventory
  if (player.inventory.some(i => i.otp0 === itemId)) {
    console.log(`Món đồ ${itemId} đã có trong inventory của ${player.name}.`);
    findItemOrder(player, itemId)
   // increaseGemOtp1AndUpdateGitHub(player, 5)

    
    return;
  }

  // Thêm món đồ vào inventory của người chơi
  player.inventory.push(item);
  
  console.log(`Đã thêm món đồ ${itemId} vào inventory của ${player.name}.`);

  // Cập nhật lại dữ liệu người chơi sau khi thêm món đồ
  updatePlayerStat(playerId, { inventory: player.inventory }, 4)
    .then((message) => {
      console.log(message);  // In ra thông báo cập nhật thành công
    })
    .catch((err) => {
      console.error(err);  // In ra lỗi nếu có
    });
}





  // Kiểm tra nếu món đồ đã có trong inventory

function findItemOrder(player, itemId) {
    // Các đối tượng chứa dữ liệu các item
    let number = 0;
    const allStats = [
        armorStats,
        shieldStats,
        glovesStats,
        bootsStats,
        weaponStats
    ];

    // Lặp qua tất cả các đối tượng để tìm kiếm itemId
    for (let i = 0; i < allStats.length; i++) {
        const stats = allStats[i];
        
        // Kiểm tra xem itemId có tồn tại trong object này không
        if (stats.hasOwnProperty(itemId)) {
            // Lấy số thứ tự của item theo format T1, T2, ..., T15
            const itemLevel = itemId.match(/^T(\d+)_/); // Lấy số sau "T"
            if (itemLevel) {
                number = parseInt(itemLevel[1], 10); // Convert số đó thành số nguyên
            }
            
            increaseGemOtp1AndUpdateGitHub(player, number);  //nếu là trang bị đã có thì tăng lên 1 của gem theo bậc
            return number; // Trả về số thứ tự của item
        }
    }
    
    // nếu các item drop không phải trang bị thì sẽ auto +1 ở chỉ số otp9
  increaseItemOtp1AndUpdateGitHub(player, itemId)
    return null;
}




function increaseGemOtp1AndUpdateGitHub(player, increaseValue) {
  return new Promise((resolve, reject) => {
    // Log toàn bộ inventory để kiểm tra
    console.log(player.inventory);

    // Tìm item "gem" trong inventory của người chơi
    const gemItem = player.inventory.find(item => item.otp0 === 'gem');
    
    if (gemItem) {
      // Kiểm tra giá trị otp1 và khởi tạo nếu không phải số hợp lệ
      if (typeof gemItem.otp1 !== 'number') {
        console.log(`Giá trị otp1 của gem không phải là số hợp lệ, khởi tạo lại.`);
        gemItem.otp1 = 0; // Khởi tạo giá trị mặc định nếu không hợp lệ
      }

      // Tăng giá trị otp1 của gem lên
      gemItem.otp1 += increaseValue;

      // Sau khi cập nhật giá trị otp1, gọi hàm cập nhật lên GitHub
      updatePlayerStat(player.id, { inventory: player.inventory }, 3)
        .then(result => {
          console.log('Dữ liệu đã được cập nhật lên GitHub:', result);
          resolve('Dữ liệu đã được cập nhật lên GitHub: ' + result);
        })
        .catch(error => {
          console.error('Lỗi khi cập nhật dữ liệu lên GitHub:', error);
          reject('Lỗi khi cập nhật dữ liệu lên GitHub: ' + error);
        });
    } else {
      reject('Không tìm thấy item gem trong inventory của người chơi.');
    }
  });
}



function increaseItemOtp1AndUpdateGitHub(player, itemId) {
  return new Promise((resolve, reject) => {
    // Log toàn bộ inventory để kiểm tra
    console.log(player.inventory);

    // Tìm item theo itemId trong inventory của người chơi
    const item = player.inventory.find(item => item.otp0 === itemId);
    
    if (item) {
      // Kiểm tra giá trị otp1 và khởi tạo nếu không phải số hợp lệ
      if (typeof item.otp9 !== 'number') {
        console.log(`Giá trị otp9 của item ${itemId} không phải là số hợp lệ, khởi tạo lại.`);
        item.otp9 = 0; // Khởi tạo giá trị mặc định nếu không hợp lệ
      }

      // Tăng giá trị otp1 của item lên 1
      item.otp9 += 1;

      // Sau khi cập nhật giá trị otp1, gọi hàm cập nhật lên GitHub
      updatePlayerStat(player.id, { inventory: player.inventory }, 6)
        .then(result => {
          console.log('Dữ liệu đã được cập nhật lên GitHub:', result);
          resolve('Dữ liệu đã được cập nhật lên GitHub: ' + result);
        })
        .catch(error => {
          console.error('Lỗi khi cập nhật dữ liệu lên GitHub:', error);
          reject('Lỗi khi cập nhật dữ liệu lên GitHub: ' + error);
        });
    } else {
      reject(`Không tìm thấy item ${itemId} trong inventory của người chơi.`);
    }
  });
}





function checkdropitem(lvboss, itemsrate, tangrate) {
  
      // Kiểm tra tangrate, nếu không phải là số hoặc không nhập, gán tangrate = 0
    if (isNaN(tangrate) || tangrate === undefined) {
        tangrate = 0;
    }
  
    // Bước 1: Lọc các item có otp5 nhỏ hơn lvboss
    let filteredItems = Object.keys(itemsrate).filter(itemKey => itemsrate[itemKey].otp5 <= lvboss);
    console.log('Filtered Items based on otp5 <= lvboss:', filteredItems);

    // Nếu không có item nào thỏa mãn điều kiện otp5 <= lvboss, trả về null 
    if (filteredItems.length === 0) {
        console.log('Không có món đồ nào thỏa mãn otp5 <= lvboss');
        return null ;
    }

    // Bước 2: Kiểm tra điều kiện với random và otp6
    let randomValue = Math.floor(Math.random() * 10000) + 1 - tangrate;  // Random từ 1 đến 100
    console.log('Random Value:', randomValue);

    // Lọc lại những item có otp6 lớn hơn randomValue
    filteredItems = filteredItems.filter(itemKey => itemsrate[itemKey].otp6 > randomValue);
    console.log('Filtered Items after checking otp6 > randomValue:', filteredItems);

    // Bước 3: Nếu có ít nhất 1 item đủ điều kiện, chọn ngẫu nhiên 1 item
    if (filteredItems.length > 0) {
        let randomIndex = Math.floor(Math.random() * filteredItems.length);  // Lấy chỉ số ngẫu nhiên
        console.log('Selected Item:', filteredItems[randomIndex]);  // In ra món đồ đã chọn
        return filteredItems[randomIndex];  // Trả về tên item đã chọn
    }

    // Nếu không tìm thấy item nào thỏa mãn, trả về null 
    console.log('Không có món đồ nào thỏa mãn otp6 > randomValue');
    return null ;
}




// otp5 = lv boss   opt6 = rate số càng lớn tỉ lệ ra càng nhiều , danh sách này chỉ càn quan tâm otp5 - 6
const itemsrate = {
  "T1_spear": {"otp0": "T1_spear", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 900},
  "T2_woodenspear": {"otp0": "T2_woodenspear", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 700},
  "T3_steelspear": {"otp0": "T3_steelspear", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 5, "otp6": 500},
  "T4_iron_spear": {"otp0": "T4_iron_spear", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 10, "otp6": 300},
  "T5_trident": {"otp0": "T5_trident", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 15, "otp6": 250},
  "T6_war_spear": {"otp0": "T6_war_spear", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 20, "otp6": 200},
  "T7_darkspear": {"otp0": "T7_darkspear", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 30, "otp6": 150},
  "T8_dragonspear": {"otp0": "T8_dragonspear", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 40, "otp6": 130},
  "T9_storm_spear": {"otp0": "T9_storm_spear", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 50, "otp6": 110},
  "T10_thunder_spear": {"otp0": "T10_thunder_spear", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 60, "otp6": 100},
  "T11_skyspear": {"otp0": "T11_skyspear", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 70, "otp6": 0},
  "T12_frost_spear": {"otp0": "T12_frost_spear", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 80, "otp6": 0},
  "T13_venom_spear": {"otp0": "T13_venom_spear", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 90, "otp6": 0},
  "T14_runespear": {"otp0": "T14_runespear", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 100, "otp6": 0},
  "T15_legendary_spear": {"otp0": "T15_legendary_spear", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 110, "otp5": 0, "otp6": 0},
  
  "T1_armor": {"otp0": "T1_armor", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 900},
  "T2_iron_armor": {"otp0": "T2_iron_armor", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 700},
  "T3_steel_armor": {"otp0": "T3_steel_armor", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 5, "otp6": 500},
  "T4_silver_armor": {"otp0": "T4_silver_armor", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 10, "otp6": 300},
  "T5_frost_armor": {"otp0": "T5_frost_armor", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 15, "otp6": 250},
  "T6_fire_armor": {"otp0": "T6_fire_armor", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 20, "otp6": 200},
  "T7_thunder_armor": {"otp0": "T7_thunder_armor", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 30, "otp6": 150},
  "T8_mythical_armor": {"otp0": "T8_mythical_armor", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 40, "otp6": 130},
  "T9_obsidian_armor": {"otp0": "T9_obsidian_armor", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 50, "otp6": 110},
  "T10_ragnarok_armor": {"otp0": "T10_ragnarok_armor", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 60, "otp6": 100},
  "T11_flame_armor": {"otp0": "T11_flame_armor", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 70, "otp6": 0},
  "T12_wind_armor": {"otp0": "T12_wind_armor", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 80, "otp6": 0},
  "T13_battle_armor": {"otp0": "T13_battle_armor", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 90, "otp6": 0},
  "T14_runes_armor": {"otp0": "T14_runes_armor", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 100, "otp6": 0},
  "T15_legendary_armor": {"otp0": "T15_legendary_armor", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 110, "otp6": 0},
  
  "T1_shield": {"otp0": "T1_shield", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 10, "otp6": 900},
  "T2_iron_shield": {"otp0": "T2_iron_shield", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 20, "otp6": 700},
  "T3_steel_shield": {"otp0": "T3_steel_shield", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 30, "otp6": 400},
  "T4_silver_shield": {"otp0": "T4_silver_shield", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 40, "otp6": 300},
  "T5_frost_shield": {"otp0": "T5_frost_shield", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 50, "otp6": 200},
  "T6_fire_shield": {"otp0": "T6_fire_shield", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 60, "otp6": 100},
  "T7_thunder_shield": {"otp0": "T7_thunder_shield", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 70, "otp6": 0},
  "T8_mythical_shield": {"otp0": "T8_mythical_shield", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 80, "otp6": 0},
  "T9_obsidian_shield": {"otp0": "T9_obsidian_shield", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 90, "otp6": 0},
  "T10_ragnarok_shield": {"otp0": "T10_ragnarok_shield", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 100, "otp6": 0},
  
  "T1_gloves": {"otp0": "T1_gloves", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 10, "otp6": 900},
  "T2_iron_gloves": {"otp0": "T2_iron_gloves", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 20, "otp6": 700},
  "T3_steel_gloves": {"otp0": "T3_steel_gloves", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 30, "otp6": 400},
  "T4_silver_gloves": {"otp0": "T4_silver_gloves", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 40, "otp6": 300},
  "T5_frost_gloves": {"otp0": "T5_frost_gloves", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 50, "otp6": 200},
  "T6_fire_gloves": {"otp0": "T6_fire_gloves", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 60, "otp6": 100},
  "T7_thunder_gloves": {"otp0": "T7_thunder_gloves", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 70, "otp6": 0},
  "T8_mythical_gloves": {"otp0": "T8_mythical_gloves", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 80, "otp6": 0},
  "T9_obsidian_gloves": {"otp0": "T9_obsidian_gloves", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 90, "otp6": 0},
  "T10_ragnarok_gloves": {"otp0": "T10_ragnarok_gloves", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 100, "otp6": 0},
  
  "T1_boots": {"otp0": "T1_boots", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 10, "otp6": 900},
  "T2_iron_boots": {"otp0": "T2_iron_boots", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 20, "otp6": 700},
  "T3_steel_boots": {"otp0": "T3_steel_boots", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 30, "otp6": 400},
  "T4_silver_boots": {"otp0": "T4_silver_boots", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 40, "otp6": 300},
  "T5_frost_boots": {"otp0": "T5_frost_boots", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 50, "otp6": 200},
  "T6_fire_boots": {"otp0": "T6_fire_boots", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 60, "otp6": 100},
  "T7_thunder_boots": {"otp0": "T7_thunder_boots", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 70, "otp6": 0},
  "T8_mythical_boots": {"otp0": "T8_mythical_boots", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 80, "otp6": 0},
  "T9_obsidian_boots": {"otp0": "T9_obsidian_boots", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 90, "otp6": 0},
  "T10_ragnarok_boots": {"otp0": "T10_ragnarok_boots", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 100, "otp6": 0},
  
  "T1_axe": {"otp0": "T1_axe", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 900},
  "T2_iron_axe": {"otp0": "T2_iron_axe", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 700},
  "T3_steel_axe": {"otp0": "T3_steel_axe", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 5, "otp6": 500},
  "T4_war_axe": {"otp0": "T4_war_axe", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 10, "otp6": 300},
  "T5_frost_axe": {"otp0": "T5_frost_axe", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 15, "otp6": 250},
  "T6_fire_axe": {"otp0": "T6_fire_axe", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 20, "otp6": 200},
  "T7_thunder_axe": {"otp0": "T7_thunder_axe", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 30, "otp6": 150},
  "T8_iron_waraxe": {"otp0": "T8_iron_waraxe", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 40, "otp6": 130},
  "T9_obsidian_axe": {"otp0": "T9_obsidian_axe", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 50, "otp6": 110},
  "T10_ragnarok_axe": {"otp0": "T10_ragnarok_axe", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 60, "otp6": 100},
  "T11_flame_axe": {"otp0": "T11_flame_axe", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 70, "otp6": 0},
  "T12_wind_axe": {"otp0": "T12_wind_axe", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 80, "otp6": 0},
  "T13_battle_axe": {"otp0": "T13_battle_axe", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 90, "otp6": 0},
  "T14_runes_axe": {"otp0": "T14_runes_axe", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 100, "otp6": 0},
  "T15_legendary_axe": {"otp0": "T15_legendary_axe", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 110, "otp5": 0, "otp6": 0},
  
  // Kiếm (Sword)
  "T1_sword": {"otp0": "T1_sword", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 900},
  "T2_ironblade": {"otp0": "T2_ironblade", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 700},
  "T3_steelblade": {"otp0": "T3_steelblade", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 5, "otp6": 500},
  "T4_silverblade": {"otp0": "T4_silverblade", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 10, "otp6": 300},
  "T5_fireblade": {"otp0": "T5_fireblade", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 15, "otp6": 250},
  "T6_woodblade": {"otp0": "T6_woodblade", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 20, "otp6": 200},
  "T7_shadowblade": {"otp0": "T7_shadowblade", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 30, "otp6": 150},
  "T8_bloodsword": {"otp0": "T8_bloodsword", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 40, "otp6": 130},
  "T9_soulblade": {"otp0": "T9_soulblade", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 50, "otp6": 110},
  "T10_dragonblade": {"otp0": "T10_dragonblade", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 60, "otp6": 100},
  "T11_moonblade": {"otp0": "T11_moonblade", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 70, "otp6": 0},
  "T12_stormblade": {"otp0": "T12_stormblade", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 80, "otp6": 0},
  "T13_nightblade": {"otp0": "T13_nightblade", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 90, "otp6": 0},
  "T14_runesword": {"otp0": "T14_runesword", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 100, "otp6": 0},
  "T15_legendaryblade": {"otp0": "T15_legendaryblade", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 110, "otp5": 0, "otp6": 0},
  
  // Gậy (Staff)
  "T1_woodenstaff": {"otp0": "T1_woodenstaff", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 900},
  "T2_ironstaff": {"otp0": "T2_ironstaff", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 700},
  "T3_steelstaff": {"otp0": "T3_steelstaff", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 5, "otp6": 500},
  "T4_froststaff": {"otp0": "T4_froststaff", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 10, "otp6": 300},
  "T5_firestaff": {"otp0": "T5_firestaff", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 15, "otp6": 250},
  "T6_lightningstaff": {"otp0": "T6_lightningstaff", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 20, "otp6": 200},
  "T7_crystalstaff": {"otp0": "T7_crystalstaff", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 30, "otp6": 150},
  "T8_shadowstaff": {"otp0": "T8_shadowstaff", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 40, "otp6": 130},
  "T9_mysticstaff": {"otp0": "T9_mysticstaff", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 50, "otp6": 110},
  "T10_thunderstaff": {"otp0": "T10_thunderstaff", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 60, "otp6": 100},
  "T11_windstaff": {"otp0": "T11_windstaff", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 70, "otp6": 0},
  "T12_stormstaff": {"otp0": "T12_stormstaff", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 80, "otp6": 0},
  "T13_runesstaff": {"otp0": "T13_runesstaff", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 90, "otp6": 0},
  "T14_legendarystaff": {"otp0": "T14_legendarystaff", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 100, "otp6": 0},
  "T15_ultimaterstaff": {"otp0": "T15_ultimaterstaff", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 110, "otp6": 0},
  
  "T1_shortbow": {"otp0": "T1_shortbow", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 900},
  "T2_woodenbow": {"otp0": "T2_woodenbow", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 700},
  "T3_steelbow": {"otp0": "T3_steelbow", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 5, "otp6": 500},
  "T4_longbow": {"otp0": "T4_longbow", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 10, "otp6": 300},
  "T5_frostbow": {"otp0": "T5_frostbow", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 15, "otp6": 250},
  "T6_flamebow": {"otp0": "T6_flamebow", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 20, "otp6": 200},
  "T7_windbow": {"otp0": "T7_windbow", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 30, "otp6": 150},
  "T8_shadowbow": {"otp0": "T8_shadowbow", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 40, "otp6": 130},
  "T9_thunderbow": {"otp0": "T9_thunderbow", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 50, "otp6": 110},
  "T10_stormbow": {"otp0": "T10_stormbow", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 60, "otp6": 100},
  "T11_quickbow": {"otp0": "T11_quickbow", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 70, "otp6": 0},
  "T12_rune_bow": {"otp0": "T12_rune_bow", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 80, "otp6": 0},
  "T13_venombow": {"otp0": "T13_venombow", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 90, "otp6": 0},
  "T14_hawkbow": {"otp0": "T14_hawkbow", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 100, "otp6": 0},
  "T15_legendarybow": {"otp0": "T15_legendarybow", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 110, "otp6": 0},

  
  "gem_dame_18": { "otp0": "gem_dame_18", "otp5": 1, "otp6": 800 },
  
  
  
  
  "skill_crit": { "otp0": "skill_crit", "otp1": 30, "otp2": 1, "otp3": 10, "otp4": 3, "otp5": 2, "otp6": 900 }

  
  
};








function displayDamageReportplayer(player, target) {
  // Tính toán phần trăm máu của boss và target
  const bossHPPercentage = (boss.hp / 20000) * 100;  // 20000 là HP ban đầu của boss
  const targetPercentage = (target.hp / target.hp_max) * 100;  
  const bossHP = boss.hp
  // Chỉ hiển thị báo cáo cho người chơi cụ thể
  const targetPlayerId = player.id; // Giả sử bạn muốn hiển thị báo cáo cho người chơi này

  // Lọc ra báo cáo của người chơi cần hiển thị
  const playerReport = playerDamageReport.find(playerReport => playerReport.id === targetPlayerId);

  if (playerReport) {
    // Lấy tên người chơi và HP từ players
    const player = players.find(p => p.id === playerReport.id);
    const playerName = player.name;  // Tên người chơi
    const playerHP = player.hp;  // Máu hiện tại của người chơi
    const playerMaxHP = player.hp_max;  // Máu tối đa của người chơi
    const playerHPPercentage = (playerHP / playerMaxHP) * 100;  // Phần trăm máu của người chơi

    // Lấy tên và HP của target (boss)
    const targetHP = target.hp;
    const targetMaxHP = target.hp_max;
    const targetHPPercentage = (targetHP / targetMaxHP) * 100;  // Phần trăm máu của target

    // Căn chỉnh tên và sát thương cho đều đặn và thêm biểu tượng cho tên và tổng sát thương
let name;
    
if (playerName === 'tien') {
  name = "       ";  // 7 dấu cách
} else if (playerName === 'khi') {
  name = "--------------------->";  // 14 dấu cách
} else {
  name = "--------------------------------------------->";  // 21 dấu cách cho các giá trị khác
}
    
    
    
    
    const total = `💥`;  // Thêm biểu tượng cho tổng sát thương

    // Hiển thị từng đòn đánh trong giây hiện tại (bao gồm cả chí mạng và không chí mạng)
    const now = playerReport.attacks.map(attack => {
      const damage = attack.damage.toFixed(0);  // Làm tròn sát thương
      // Thêm emoji ⚡ khi chí mạng
      const critSymbol = attack.isCrit ? `${damage} ⚡` : damage;

      
      const b11 = attack.isNetranh ? `🍃` : '';
      const c11 = attack.isPhandame ? `🦔` : '';
      const d11 = attack.isRange ? `⚔︎` : '';
      const e11 = attack.isHutmau  ? `🩸` : '';

      // Tạo biến để lưu giá trị của skill
      const playerSkill = (playerReport.skill === undefined) ? "" : playerReport.skill;


      
      
      // Hiển thị các emoji tùy theo giá trị playertarget
      let targetEmojis = '';
      if (attack.playertarget === 1) {
        targetEmojis = '👦🏻';  // Emoji cho playertarget = 1
      } else if (attack.playertarget === 2) {
        targetEmojis = '🐐';  // Emoji cho playertarget = 2
      } else if (attack.playertarget === 3) {
        targetEmojis = '🐣';  // Emoji cho playertarget = 3
      }

      // Kết hợp cả chí mạng và emoji playertarget
      return `${critSymbol} ${b11} ${c11} ${d11} ${e11} ${playerSkill} ${targetEmojis}`;
    }).join(', ').padStart(35, ' ');  // Hiển thị tất cả các đòn tấn công

    
let checkhpp = `${'👦🏻'}   ${players[0].hp}-------|-------   ${'🐐'}   ${players[1].hp} -------  | -------  ${'🐣'}   ${players[2].hp} \n`;

    
    // Xây dựng báo cáo
    let report = checkhpp;
    report += `| ${name} | ${total}  ${now} |\n`;

    // Chỉ hiển thị thông tin của boss nếu target.boss === 1
    
      report += `| ${'🐉 Boss HP:'.padEnd(25, ' ')} | ${bossHP.toString().padStart(12, ' ')} | ${bossHPPercentage.toFixed(0)}% | dame T-K-G: `;
    
    report += bossAttack(players, boss) 
    report += '\n'

    report += '===========================\n';

    // Reset lại các đòn tấn công cho người chơi
    playerReport.attacks = [];  

    // Gửi báo cáo qua Telegram bot với định dạng HTML
    sendMessage(-4676989627, report, { parse_mode: 'HTML' });  
    console.log(report);  // Hiển thị báo cáo
  } else {
    console.log("Không tìm thấy báo cáo cho người chơi này.");
  }
}







// Khai báo biến toàn cục
let playerDamageReport = [];
// Hàm khởi tạo dữ liệu người chơi và bắt đầu trận đấu
async function initGame() {
  try {
    // Lấy dữ liệu người chơi từ GitHub
    const player1 = await getPlayerStat(12345);
    const player2 = await getPlayerStat(67890);
    const player3 = await getPlayerStat(11223);
    players = [player1, player2, player3];  // Lưu mảng người chơi
    // Khởi tạo báo cáo sát thương
    calculateMonstersKilledByChatId(6708647498);

    checkcharDownandUp(player1)
    checkcharDownandUp(player2)
    checkcharDownandUp(player3)
    calculatePlayerLevel(player1)
    calculatePlayerLevel(player2)
    calculatePlayerLevel(player3)
    
    playerDamageReport = players.map(player => ({
      id: player.id,
      attacks: [],
      totalDamage: 0
    }));
    updateSkillsBasedOnInventory(players)
    
    updateAllPlayersStats(players)
    updatePlayersHpToMax();
    startBossFight(boss,players[0]);
    startBossFight(boss,players[1]);
    startBossFight(boss,players[2]);
  } catch (error) {
    console.error(error);  // Nếu có lỗi khi lấy dữ liệu người chơi
  }
}

// Khởi động game
initGame();










// Hàm tính toán sát thương mà mỗi người chơi nhận được
function bossAttack(players, boss) {
  // Lọc người chơi còn sống
  const alivePlayers = players.filter(player => player.hp > 0);
  const aliveCount = alivePlayers.length;

  // Kiểm tra nếu không có người chơi sống
  if (aliveCount === 0) {
    return "No players alive";
  }

  // Nếu boss đã chết (hp <= 0), trả về chuỗi rỗng
  if (boss.hp <= 0) {
    return "";
  }

  // Chia đều sát thương cho các người chơi còn sống
  const damagePerPlayer = boss.damage / aliveCount;

  // Tạo mảng chứa sát thương thực tế mà mỗi người chơi nhận được
  const result = players.map(player => {
    if (player.hp > 0) {
      // Tính sát thương thực sự mà người chơi nhận được sau khi trừ phòng thủ
      const damageAfterDef = Math.max(0, damagePerPlayer - player["def-skill"]);
      player.hp -= damageAfterDef
      // Trả về sát thương mà người chơi nhận được
      return damageAfterDef;
    } else {
      return 0;  // Nếu người chơi đã chết, bỏ qua
    }
  });

  // Trả về kết quả dưới dạng chuỗi
  return result.join("-");
}

















function sendFourButtons(chatId) {
  const reply_markup = {
    inline_keyboard: [
      [
        { text: 'tien', callback_data: 'button_1' },
        { text: 'hai', callback_data: 'button_2' },
        { text: 'hoang', callback_data: 'button_3' },
        { text: 'BOSS', callback_data: 'button_4' }  // Thêm nút thứ 4
      ]
    ]
  };

  const text = 'Hãy chọn một mục tiêu:';

  sendMessage(chatId, text, reply_markup);  // Gửi tin nhắn với bốn nút
}






// Mảng chứa thông tin người dùng (userId và tên)
const userNames = {
  6708647498: 'Tien',
  987654321: 'Hai',
  111222333: 'Hoang',
  444555666: 'Duc'
  // Bạn có thể thêm nhiều người dùng và ID tương ứng ở đây
};



function handleCallbackQuery(callbackQuery) {
  const chatId = callbackQuery.message.chat.id;
  const messageId = callbackQuery.message.message_id;
  const data = callbackQuery.data;  // Lấy dữ liệu từ callback query
  const userId = callbackQuery.from.id;  // Lấy ID của người nhấn
  const playerattack = players.find(p => p.id_bot === userId);  // Tra cứu người chơi từ players
  const userName = userNames[userId] || 'Người dùng không xác định';  // Tên người dùng

  // Xử lý các lựa chọn module chính
  if (data === 'modun_fram') {
    sendFramModule(chatId);  // Gọi module Fram
    sendMessage(chatId, `${userName} đã chọn Modun Fram!`);
  } else if (data === 'modun_op_do') {
    sendEquipmentModule(chatId);  // Gọi module Ốp đồ
    sendMessage(chatId, `${userName} đã chọn Modun Ốp đồ!`);
  } else if (data === 'modun_shop') {
    sendShopModule(chatId);  // Gọi module Shop
    sendMessage(chatId, `${userName} đã chọn Modun Shop!`);
  }

  // Xử lý các lựa chọn trong module Fram (Level)
  else if (data.startsWith('fram_level')) {
    // Tách phạm vi cấp độ từ callback_data
    const levelRange = data.split('_')[2];  // Lấy phần "1_10" từ data "fram_level_1_10"
    
    // Kiểm tra xem levelRange có hợp lệ không
    console.log(`Dữ liệu cấp độ nhận được: ${levelRange}`);

    // Tách minLevel và maxLevel từ chuỗi "1_10"
    let [minLevel, maxLevel] = levelRange.split('_').map(Number);  // Chuyển từ chuỗi "1_10" thành [1, 10]

    // Log minLevel và maxLevel
    console.log(`minLevel: ${minLevel}, maxLevel: ${maxLevel}`);

// Nếu maxLevel không hợp lệ, gán maxLevel = minLevel + 10
    if (isNaN(maxLevel)) {
      maxLevel = minLevel + 10;
    }

    // Log lại minLevel và maxLevel sau khi điều chỉnh
    console.log(`Sau khi điều chỉnh, minLevel: ${minLevel}, maxLevel: ${maxLevel}`);

    // Lọc quái vật theo cấp độ
    const monstersInLevelRange = monsters.filter(monster => {
      const level = parseInt(monster.level); // Chuyển cấp độ quái vật sang số
      console.log(`Kiểm tra quái vật: ${monster.name}, Level: ${level}`);
      return level >= minLevel && level <= maxLevel;  // So sánh đúng cấp độ quái vật
    });

    // Debug - kiểm tra danh sách quái vật lọc được
    console.log(`Quái vật trong phạm vi cấp độ: ${monstersInLevelRange.length}`);

    // Tạo danh sách các nút quái vật để người dùng chọn
    const monsterButtons = monstersInLevelRange.map(monster => [
      { text: `${monster.name} (Level ${monster.level})`, callback_data: `fram_monster_${monster.name}` }  // Mã callback chứa tên quái vật
    ]);

    // Thêm nút quay lại vào cuối danh sách quái vật
    monsterButtons.push([
      { text: 'Quay lại', callback_data: 'modun_fram' }
    ]);

    const reply_markup = {
      inline_keyboard: monsterButtons
    };

    // Kiểm tra nếu có quái vật trong phạm vi cấp độ
    if (monstersInLevelRange.length > 0) {
      // Gửi danh sách quái vật cho người dùng
      sendMainMenu(chatId)
      let text = `Quái vật trong cấp độ ${minLevel}-${maxLevel}:\n`;
      
      monstersInLevelRange.forEach(monster => {
        text += `(Level ${monster.level})  hp-${monster.hp} dame-${monster.dame} def-${monster.def} \n`;
      });
      sendMessage(chatId, text, reply_markup);  // Gửi tin nhắn với danh sách quái vật và các nút
    } else {
      // Nếu không có quái vật, thông báo người dùng và vẫn giữ nút quay lại
      sendMessage(chatId, `Không có quái vật nào trong cấp độ ${minLevel}-${maxLevel}.`, reply_markup);
    }
  }

  // Xử lý lựa chọn quái vật trong Fram
  else if (data.startsWith('fram_monster_')) {
    const monsterName = data.split('_')[2];  // Lấy tên quái vật từ callback data
    const selectedMonster = monsters.find(monster => monster.name === monsterName);
    const monstersKilled = calculateMonstersKilledByChatId(chatId, selectedMonster.name)
    sendMessage(chatId, `Bạn đã chọn quái vật: ${selectedMonster.name} (Level ${selectedMonster.level}), số lượng kill trong 5p = ${monstersKilled} `);
    
    // Gọi hàm updatePlayerStat với biến newFramValue
updatePlayerStat(playerattack.id, { framlv: selectedMonster.level }, 2)
  .then((message) => {
    console.log(message);  // In ra thông báo cập nhật thành công
  })
  .catch((err) => {
    console.error(err);  // In ra lỗi nếu có
  });

  }

  // Xử lý các lựa chọn khác (Shop, Ép ngọc, Cường hóa, v.v.)
  else if (data === 'button_1') {
    startBossFight(players[0], playerattack);  // Start fight với Tiến
    sendMessage(chatId, `${userName} đã chọn Tiến!`);
  } else if (data === 'button_2') {
    startBossFight(players[1], playerattack);  // Start fight với Hải
    sendMessage(chatId, `${userName} đã chọn Hải!`);
  } else if (data === 'button_3') {
    startBossFight(players[2], playerattack);  // Start fight với Hoàng
    sendMessage(chatId, `${userName} đã chọn Hoàng!`);
  } else if (data === 'button_4') {  // Thêm điều kiện xử lý cho nút 4 (BOSS)
    startBossFight(boss, playerattack);  // Start fight với BOSS
    sendMessage(chatId, `${userName} đã chọn BOSS!`);
  }
  
  
      // Xử lý lựa chọn trong module Ốp đồ
  else if (data === 'skill_') {
    sendMessage(chatId, 'Lựa chọn skill để nâng cấp.');
    handlesSkills(chatId)
  }
  // Xử lý lựa chọn skill
else if (data.startsWith('selecskillreal_')) {
  const itemName = data.substring(15);  
  checkskillup(chatId, itemName)
  sendMessage(chatId, `Bạn đã chọn skill: ${itemName}`);
}
  
  
    // Xử lý lựa chọn trong module Ốp đồ
  else if (data === 'ep_ngoc') {
    sendMessage(chatId, 'Bạn đã chọn ép ngọc. Hãy chọn loại ngọc cần ép.');
    handleEpNgocForPlayer(chatId)
    sendMainMenu(chatId)
  }
 // Xử lý lựa chọn item ép ngọc
else if (data.startsWith('epngoc_')) {
  const itemName = data.substring(7);  // Lấy toàn bộ phần sau 'epngoc_'

  // Trả về toàn bộ tên item (ví dụ: 'T1_spear')
  sendMessage(chatId, `Bạn đã chọn item để ép ngọc: ${itemName}`);
  trangbiForPlayerWithCategory(chatId, itemName)
  
}
 else if (data.startsWith('epngocreal_')) {
  const data1 = data.substring(11);  

  // Trả về toàn bộ tên item (ví dụ: 'T1_spear')
  processPlayerAndUpdate(chatId, data1) 
}
  
  
  
  
  
  else if (data === 'cuong_hoa') {
    sendMessage(chatId, 'Bạn đã chọn cường hóa. Hãy chọn vật phẩm để cường hóa.');
    handleItemsForPlayer(chatId)
    sendMainMenu(chatId)
  }
// Xử lý lựa chọn item
else if (data.startsWith('item_')) {
  const itemName = data.substring(5);  // Lấy toàn bộ phần sau 'item_'
   enhanceItem(chatId, itemName)
  // Trả về toàn bộ tên item (ví dụ: 'T1_spear')
  sendMessage(chatId, `Bạn đã chọn item: ${itemName}`);
}

// Xử lý lựa chọn mua mặt hàng trong Shop
else if (data.startsWith('buy_')) {
    const itemName = data.split('_')[1];
    const item = shopItems.find(item => item.name === itemName);
    
    // Kiểm tra nếu item tồn tại
    if (item) {
        // Kiểm tra nếu người chơi có đủ vàng để mua
        if (playerattack.gold >= item.price) {
            // Giảm vàng của người chơi và thêm item vào kho đồ
            playerattack.gold -= item.price;
          
                // Gọi hàm updatePlayerStat với 
   updatePlayerStat(playerattack.id, { gold: playerattack.gold }, 11)
  .then((message) => {
    console.log(message);  // In ra thông báo cập nhật thành công
  })
  .catch((err) => {
    console.error(err);  // In ra lỗi nếu có
  });
          
          
            handleItemEffects(playerattack, item)

            sendMessage(chatId, `Bạn đã mua ${item.name} với giá ${item.price} vàng. Bạn còn ${playerattack.gold} vàng.`);
        } else {
            sendMessage(chatId, `Bạn không đủ vàng để mua ${item.name}. Bạn cần ${item.price - playerattack.gold} vàng nữa.`);
        }
    } else {
        sendMessage(chatId, `Món hàng ${itemName} không tồn tại trong cửa hàng.`);
    }
    
    sendMainMenu(chatId);  // Hiển thị lại menu chính sau khi thực hiện mua
}

  
  
  else if (data === 'armor_stats' || data === 'shield_stats' || data === 'boots_stats' || data === 'weapon_stats' || data === 'gloves_stats') {
    trangbiForPlayer(chatId, data);  // Gọi hàm để hiển thị item dựa trên loại module được chọn
  }
 else if (data.startsWith('trangbi_')) {
    const itemName = data.substring(8);  // Lấy toàn bộ phần sau 'trangbi_'
  Menutrangbi(chatId)
   updatePlayerEquip(chatId, itemName)
    // Trả về toàn bộ tên item (ví dụ: 'T1_spear')
    sendMessage(chatId, `Bạn đã trang bị item: ${itemName}`);
  }


    
  
  
  
  
  
  
  
  
  
  
  
  

  // Xóa các nút sau khi nhấn chỉ đối với người nhấn
  const updatedReplyMarkup = { inline_keyboard: [] };

  // Chỉnh sửa tin nhắn để xóa các nút
  const url = `https://api.telegram.org/bot${botToken}/editMessageReplyMarkup`;
  const payload = {
    chat_id: chatId,
    message_id: messageId, // Tin nhắn của người nhấn
    reply_markup: updatedReplyMarkup  // Xóa các nút
  };

  // Gửi yêu cầu xóa nút
  fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
    .then(response => response.json())
    .then(data => {
      console.log('Nút đã bị xóa:', data);
    })
    .catch(error => console.error('Lỗi xóa nút:', error));
}






const monsters = [
  { level: 1, name: "monsters1", dame: 10, def: 5, hp: 100 },
  { level: 2, name: "Quái vật 2", dame: 15, def: 7, hp: 120 },
  { level: 3, name: "Quái vật 3", dame: 20, def: 10, hp: 140 },
  { level: 4, name: "Quái vật 4", dame: 25, def: 12, hp: 160 },
  { level: 5, name: "Quái vật 5", dame: 30, def: 15, hp: 180 },
  { level: 6, name: "Quái vật 6", dame: 35, def: 17, hp: 200 },
  { level: 7, name: "Quái vật 7", dame: 40, def: 20, hp: 220 },
  { level: 8, name: "Quái vật 8", dame: 45, def: 23, hp: 240 },
  { level: 9, name: "Quái vật 9", dame: 50, def: 25, hp: 260 },
  { level: 10, name: "Quái vật 10", dame: 55, def: 30, hp: 280 }
];





// Danh sách mặt hàng trong shop
const shopItems = [
  { name: "Bùa +5% rate", price: 10000 },
  { name: "Bùa +10% rate", price: 50000 },
  { name: "Bùa +15% rate", price: 300000 },
  { name: "Bùa triệu hồi boss lv1", price: 40000 },
    { name: "Bùa triệu hồi boss lv5", price: 100000 },
    { name: "Bùa triệu hồi boss lv10", price: 400000 },
    { name: "Bùa triệu hồi boss lv20", price: 600000 },
    { name: "Bùa triệu hồi boss lv30", price: 900000 },
    { name: "Bùa triệu hồi boss lv40", price: 1400000 },
    { name: "Bùa triệu hồi boss lv50", price: 2000000 },
    { name: "Bùa triệu hồi boss lv60", price: 3400000 },
    { name: "Bùa triệu hồi boss lv70", price: 5400000 },

  // Thêm các mặt hàng khác nếu cần
];


// Module 1: Fram
function sendFramModule(chatId) {
  const reply_markup = {
    inline_keyboard: [
      [
        { text: 'Level 1-10', callback_data: 'fram_level_1_10' },
        { text: 'Level 11-20', callback_data: 'fram_level_11_20' },
        { text: 'Level 21-30', callback_data: 'fram_level_21_30' },
        { text: 'Level 31-40', callback_data: 'fram_level_31_40' }
      ]
    ]
  };

  const text = 'Chọn cấp độ để thấy quái vật:';
  sendMessage(chatId, text, reply_markup);
}

// Module 2: Ốp đồ
function sendEquipmentModule(chatId) {
  const reply_markup = {
    inline_keyboard: [
      [
        { text: 'Ép ngọc', callback_data: 'ep_ngoc' },
        { text: 'Cường hóa', callback_data: 'cuong_hoa' },
        { text: 'Skill', callback_data: 'skill_' }
      ]
    ]
  };

  const text = 'Chọn hành động ốp đồ:';
  sendMessage(chatId, text, reply_markup);
}

// Module 3: Shop
function sendShopModule(chatId) {
  const reply_markup = {
    inline_keyboard: shopItems.map(item => [
      { text: `${item.name} - ${item.price} vàng`, callback_data: `buy_${item.name}` }
    ])
  };

  const text = 'Chọn mặt hàng trong shop:';
  sendMessage(chatId, text, reply_markup);
}

// Hàm gửi 3 nút chính khi người dùng đăng nhập
function sendMainMenu(chatId) {
  const reply_markup = {
    inline_keyboard: [
      [
        { text: 'Modun Fram', callback_data: 'modun_fram' },
        { text: 'Modun Ốp đồ', callback_data: 'modun_op_do' },
        { text: 'Modun Shop', callback_data: 'modun_shop' }
      ]
    ]
  };

  const text = 'Chào mừng bạn đã đăng nhập! Chọn một module để tiếp tục:';
  sendMessage(chatId, text, reply_markup);
}




function Menutrangbi(chatId) {
  const reply_markup = {
    inline_keyboard: [
      [
        { text: 'Armor Stats', callback_data: 'armor_stats' },
        { text: 'Shield Stats', callback_data: 'shield_stats' },
        { text: 'Boots Stats', callback_data: 'boots_stats' },
        { text: 'Weapon Stats', callback_data: 'weapon_stats' },
        { text: 'Gloves Stats', callback_data: 'gloves_stats' }
      ]
    ]
  };

  const text = 'Lựa chọn để thay đổi trang bị:';
  sendMessage(chatId, text, reply_markup);
}





function handleItemsForPlayer(playerId_bot) {
  // Tìm kiếm người chơi theo id
  const player = players.find(player => player.id_bot === playerId_bot);

  if (!player) {
    console.log("Không tìm thấy người chơi với id " + playerId_bot);
    return;
  }

  // Lọc các item trong inventory có otp6 không phải là 8 hoặc 9
  const filteredItems = [];
  player.inventory.forEach(item => {
    if (item.otp6 !== 7 && item.otp6 !== 8 && item.otp6 !== 9) {
      filteredItems.push(item);  // Thêm toàn bộ item vào mảng filteredItems
    }
  });

  // Debug - kiểm tra danh sách item lọc được
  console.log(`Danh sách item lọc được: ${filteredItems.length}`);

  // Tạo danh sách các nút item để người dùng chọn, bao gồm tên item và otp5
  const itemButtons = filteredItems.map(item => [
    { 
      text: `${item.otp0} - cấp CH: ${item.otp5}`,  // Hiển thị tên item và giá trị otp5
      callback_data: `item_${item.otp0}`  // Mã callback chứa tên item
    }
  ]);

  const reply_markup = {
    inline_keyboard: itemButtons
  };

  // Gửi tin nhắn với danh sách item và các nút
  sendMessage(playerId_bot, `Danh sách item của bạn:`, reply_markup);
}






// Xử lý ép ngọc cho người chơi
function handleEpNgocForPlayer(playerId_bot) {
  // Tìm kiếm người chơi theo id
  const player = players.find(player => player.id_bot === playerId_bot);

  if (!player) {
    console.log("Không tìm thấy người chơi với id " + playerId_bot);
    return;
  }

  // Lọc các item trong inventory có otp6 == 8
  const filteredItems = [];
  player.inventory.forEach(item => {
    if (item.otp6 === 8) {  // Chỉ lấy item có otp6 == 8
      filteredItems.push(item.otp0);  // Lấy giá trị otp0 (tên item)
    }
  });

  // Debug - kiểm tra danh sách item lọc được
  console.log(`Danh sách item ép ngọc lọc được: ${filteredItems.length}`);

  // Tạo danh sách các nút item để người dùng chọn
  const itemButtons = filteredItems.map(item => [
    { text: item, callback_data: `epngoc_${item}` }  // Sử dụng callback_data mới 'epngoc_${item}'
  ]);

  const reply_markup = {
    inline_keyboard: itemButtons
  };

  // Gửi tin nhắn với danh sách item ép ngọc và các nút
  sendMessage(playerId_bot, `Danh sách item có thể ép ngọc của bạn:`, reply_markup);
}




// Hàm lọc và hiển thị item
function trangbiForPlayer(playerId_bot, selectedCategory) {
  // Tìm kiếm người chơi theo id
  const player = players.find(player => player.id_bot === playerId_bot);
let allDisplayText = "";  // Khởi tạo biến lưu danh sách các displayText

  if (!player) {
    console.log("Không tìm thấy người chơi với id " + playerId_bot);
    return;
  }

  // Các danh sách item theo loại
  const categoryMap = {
    armor_stats: armorStats,
    shield_stats: shieldStats,
    boots_stats: bootsStats,
    weapon_stats: weaponStats,
    gloves_stats: glovesStats
  };
  
  const categoryIcons = {
  armor_stats: "❤️",   // Biểu tượng giáp
  shield_stats: "🎽",  // Biểu tượng khiên
  boots_stats: "🛡️",    // Biểu tượng giày
  weapon_stats: "⚔️",  // Biểu tượng vũ khí
  gloves_stats: "🛡️"   // Biểu tượng găng tay
};
  
  const categoryIcon = categoryIcons[selectedCategory];


  // Lấy danh sách item dựa trên loại được chọn
  const selectedCategoryItems = categoryMap[selectedCategory];

  // Kiểm tra nếu loại không hợp lệ
  if (!selectedCategoryItems) {
    console.log("Loại module không hợp lệ: " + selectedCategory);
    return;
  }


  // Lọc các item trong inventory có tên trùng với tên trong selectedCategoryItems
  const filteredItems = [];
  player.inventory.forEach(item => {
    // Kiểm tra nếu otp0 (tên item) trùng với bất kỳ item nào trong selectedCategoryItems
    if (selectedCategoryItems.hasOwnProperty(item.otp0)) {
      filteredItems.push(item);  // Thêm toàn bộ item vào mảng filteredItems
    }
  });

  // Debug - kiểm tra danh sách item lọc được
  console.log(`Danh sách item lọc được: ${filteredItems.length}`);

  // Tạo danh sách các nút item để người dùng chọn, bao gồm tên item và thông tin chi tiết
  const itemButtons = filteredItems.map(item => {
    const itemName = item.otp0;  // Tên item (dựa trên otp0)
    const otp1 = item.otp1;
    const otp2 = item.otp2;
    const otp3 = item.otp3;
    const otp4 = item.otp4;
    const otp5 = item.otp5;

    // Lấy giá trị chỉ số từ selectedCategoryItems (ví dụ: từ armorStats, shieldStats...)
    const categoryValue = selectedCategoryItems[itemName];  // Lấy giá trị chỉ số cho item từ categoryMap

    // Tính toán tỷ lệ từ GrapStats dựa trên otp5
    const grapMultiplier = GrapStats[otp5] || 1; // Nếu otp5 không có trong GrapStats, dùng tỷ lệ 1 (không thay đổi)

    // Tính giá trị thực của chỉ số với tỷ lệ từ GrapStats
    const finalValue = (otp1 + otp2 + otp3 + otp4 + categoryValue) * grapMultiplier;

    // Tính giá trị hiển thị cho text của nút item (bao gồm thông tin otp1, otp2, otp3 và otp5)
    const displayText = `${itemName} ${categoryIcon}: ${finalValue.toFixed(0)}/${otp5}⭐ :${otp1}-${otp2}-${otp3}-${otp4}  `;
    
  // Thêm displayText vào danh sách các displayText
    allDisplayText += displayText + "\n";  // Thêm mỗi displayText vào chuỗi, cách nhau bằng dấu xuống dòng
    
    return [
      { text: displayText, callback_data: `trangbi_${itemName}` }  // Mã callback chứa tên item
    ];
  });

  const reply_markup = {
    inline_keyboard: itemButtons
  };

  // Gửi tin nhắn với danh sách item và các nút
  if (filteredItems.length > 0) {
    sendMessage(playerId_bot, `Danh sách item của bạn:\n${allDisplayText}`, reply_markup);
  } else {
    sendMessage(playerId_bot, `Không có item`);
    Menutrangbi(playerId_bot)
  }
}












let landau = {};  // Đảm bảo landau là một đối tượng để lưu trạng thái cho mỗi chatId
let activeLoops = {}; // Đối tượng lưu trữ trạng thái vòng lặp cho mỗi chatId

// Hàm chính xử lý vòng lặp cho mỗi chatId
function calculateMonstersKilledByChatId(chatId, monsterName) {
  const currentTime = Date.now(); // Lấy thời gian hiện tại

  // Khởi tạo nếu chưa có đối tượng cho chatId này
  if (!activeLoops[chatId]) {
    activeLoops[chatId] = {
      isRunning: false, // Khởi tạo isRunning với giá trị false
      lastExecutedTime: currentTime, // Khởi tạo lastExecutedTime với thời gian hiện tại
    };
  }

  if (landau[chatId] == 1)landau[chatId] = 2;
  
  // Thiết lập lần đầu tiên cho chatId này
  if (!landau[chatId]) { 
    landau[chatId] = 1; // Đánh dấu đã thực hiện lần đầu
    let player = players.find(p => p.id_bot === chatId); 
    const bossLevel = player.framlv;

    // Tìm tên quái vật dựa trên level từ mảng monsters
    const selectedMonster = monsters.find(monster => monster.level === bossLevel);

    if (selectedMonster) {
      activeLoops[chatId].monsterName = selectedMonster.name;
      startCalculatingMonsters(chatId, selectedMonster.name);
            console.log(`frammmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm 11111111111111111`);
      console.log(`Gán monsterName từ level ${bossLevel}: ${selectedMonster.name}`);
    } else {
      console.error(`Không tìm thấy quái vật với level ${bossLevel}`);
    }
  }

  if (monsterName) {
    activeLoops[chatId].monsterName = monsterName;
  }

  // Kiểm tra xem vòng lặp đã bắt đầu cho chatId này chưa
  if (activeLoops[chatId] && activeLoops[chatId].isRunning) {
    console.log("Vòng lặp hiện tại đang chạy, vui lòng đợi...");
    return; // Nếu vòng lặp trước chưa kết thúc, không thực hiện gì cả
  }

  // Nếu vòng lặp chưa chạy, đánh dấu vòng lặp này là đang chạy
  activeLoops[chatId].isRunning = true;

  // Bắt đầu vòng lặp sau 30 giây (currentTime + 300000)
  let nextTime = currentTime + 300000;

  // Kiểm tra các mốc thời gian của các người chơi khác để đảm bảo cách nhau ít nhất 1 giây
  for (const id in activeLoops) {
    if (activeLoops.hasOwnProperty(id) && id !== chatId) {
      const otherLoopStartTime = activeLoops[id].lastExecutedTime;
      // Nếu khoảng cách giữa vòng lặp hiện tại và vòng lặp khác dưới 1 giây
      if (Math.abs(otherLoopStartTime - nextTime) < 1000) {
        nextTime = otherLoopStartTime + 1000;  // Dời vòng lặp hiện tại lên 1 giây sau vòng lặp kia
      }
    }
  }

  // Cập nhật lại thời gian bắt đầu vòng lặp cho chatId
  activeLoops[chatId].lastExecutedTime = nextTime;

  // Gọi hàm tính toán lần đầu tiên ngay lập tức
  if (landau[chatId] == 2)startCalculatingMonsters(chatId, activeLoops[chatId].monsterName);

  // Sau thời gian tính toán sẽ tự động gọi vòng lặp tiếp theo cho chatId này
  setTimeout(() => {
    // Khi vòng lặp kết thúc, đánh dấu là đã chạy xong
    activeLoops[chatId].isRunning = false;

    // Cập nhật lại thông số quái vật (vì có thể thay đổi giữa các vòng lặp)
    let updatedMonsterName = activeLoops[chatId].monsterName;
    const monster = monsters.find(m => m.name === updatedMonsterName);

    if (monster) {
      // Gọi lại vòng lặp với thông số quái vật mới sau mỗi vòng lặp
      console.log("Vòng lặp hoàn tất, tiếp tục vòng lặp mới với quái vật cập nhật.");
      calculateMonstersKilledByChatId(chatId, updatedMonsterName); // Tiếp tục vòng lặp
                  console.log(`frammmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm 22222222222222222`);
    } else {
      console.error("Quái vật không tồn tại hoặc thông số quái vật đã thay đổi.");
    }

  }, nextTime - currentTime); // Thực hiện vòng lặp sau khoảng thời gian từ currentTime đến nextTime
}













// Hàm tính toán số lượng quái vật giết được
function startCalculatingMonsters(chatId, monsterName) {
  let player = players.find(p => p.id_bot === chatId); // Tìm player bằng id_bot (chatId)
  if (!player) {
    console.error("Không tìm thấy người chơi với id_bot: " + chatId);
    return;
  }
  //activeLoops[chatId].monsterName = monsterName

  // Tìm quái vật bằng tên
  const monster = monsters.find(m => m.name == monsterName);
  if (!monster) {
    console.error("Quái vật không tồn tại.");
    return;
  }

  const baseDamage = player.dame;
  const critChance = player['crit-%'] / 100;
  const critMultiplier = player['crit-x'];

  const attacksPerSecond = 1 / player['attach-speed'];
  const totalAttacks = attacksPerSecond * 60 * 5; // 5 phút = 300 giây
  
  let monstersKilled = 0;
  let totalDamageDealt = 0;

  let remainingMonsterHp = monster.hp;
  for (let i = 0; i < totalAttacks; i++) {
    const isCriticalHit = Math.random() < critChance;  
    const damageDealt = isCriticalHit ? baseDamage * critMultiplier : baseDamage;
    
    totalDamageDealt += damageDealt;
    remainingMonsterHp -= damageDealt;
    
    if (remainingMonsterHp <= 0) {
      monstersKilled++;
      remainingMonsterHp = monster.hp; 
    }
  }

  const averageDamage = totalDamageDealt / totalAttacks;

  sendMessage(chatId, `Sát thương trung bình thực tế: ${averageDamage.toFixed(2)} / Tổng số tấn công: ${totalAttacks}, HP quái: ${monster.hp}, Số lượng quái vật giết trong 5 phút: ${monstersKilled}`);

  
  player.gold = Number(player.gold); // Đảm bảo player.gold là kiểu số
  player.gold += Math.round(totalDamageDealt / 100);
  
  player.exp = Number(player.exp); // Đảm bảo player.gold là kiểu số
  player.exp += Math.round(totalDamageDealt / 100);
  
      // Gọi hàm updatePlayerStat với 
  updatePlayerStat(player.id, { exp: player.exp, gold: player.gold }, 1)
  .then((message) => {
    console.log(message);  // In ra thông báo cập nhật thành công
  })
  .catch((err) => {
    console.error(err);  // In ra lỗi nếu có
  });
  
  return monstersKilled;

  }
  
  





// Mảng ánh xạ category sang danh sách item tương ứng
const categoryItemMap = {
  dame: weaponStats,        // dame -> items tương ứng với vk
  hp: armorStats,          // hp -> items tương ứng với áo
  def: [glovesStats, bootsStats],  // def -> tay và chân
  defskill: shieldStats    // defskill -> giáp
};

// Hàm lọc và hiển thị item dựa trên category tính toán từ data
function trangbiForPlayerWithCategory(playerId_bot, data) {
  // Tìm kiếm người chơi theo id
  const player = players.find(player => player.id_bot === playerId_bot);

  if (!player) {
    console.log("Không tìm thấy người chơi với id " + playerId_bot);
    return;
  }

  // Tách giá trị category từ data
  const category = extractCategoryFromData(data);
  //const number = extractNumberFromData(data);

  // Kiểm tra xem category có hợp lệ không
  if (!categoryItemMap[category]) {
    console.log("Không tìm thấy module cho category: " + category);
    return;
  }

  // Lấy danh sách items từ categoryItemMap
  const items = categoryItemMap[category];

  // Nếu category có nhiều item (ví dụ: def có tay và chân)
  const filteredItems = [];
  if (Array.isArray(items)) {
    items.forEach(itemModule => {
      player.inventory.forEach(item => {
        if (itemModule.hasOwnProperty(item.otp0)) {
          filteredItems.push(item.otp0);  // Lấy giá trị otp0 (tên item)
        }
      });
    });
  } else {
    // Trường hợp category chỉ có một loại item (dame, hp, defskill)
    player.inventory.forEach(item => {
      if (items.hasOwnProperty(item.otp0)) {
        filteredItems.push(item.otp0);  // Lấy giá trị otp0 (tên item)
      }
    });
  }

  
  
 // Tạo một chuỗi chứa thông tin chi tiết về các item và các nút
let itemDetailsText = "Thông tin chi tiết về các item đã lọc:\n\n";
  
  
  
    player.inventory.forEach(item => {
      // Kiểm tra nếu otp0 của item có trong filteredItems
      if (filteredItems.includes(item.otp0)) {
        // Lấy các giá trị otp1, otp2, otp3, otp4, otp5
  itemDetailsText += `
    Tên: ${item.otp0}
    - gem 1: ${item.otp1}
    - gem 2: ${item.otp2}
    - gem 3: ${item.otp3}
    - gem 4: ${item.otp4}
    - Cường Hóa: ${item.otp5} 🌟  \n` ;
      }
    });  
  
  
  
  // Debug - kiểm tra danh sách item lọc được
  console.log(`Danh sách item lọc được cho category ${category}: ${filteredItems.length}`);

  // Tạo danh sách các nút item để người dùng chọn
  const itemButtons = filteredItems.map(item => [
    { text: item, callback_data: `epngocreal_${item}_${data}` }  // Mã callback chứa tên item
  ]);

  const reply_markup = {
    inline_keyboard: itemButtons
  };

  // Gửi tin nhắn với danh sách item và các nút
  if (filteredItems.length > 0){
    sendMessage(playerId_bot, itemDetailsText, reply_markup);
  }
}

// Hàm tách category từ data (ví dụ: gem_dame_18)
function extractCategoryFromData(data) {
  const parts = data.split('_');  // Tách chuỗi thành các phần từ dấu "_"
  return parts[1];  // Trả về phần thứ 2 (dame, hp, def, defskill)
}
// Hàm tách số từ data
function extractNumberFromData(data) {
  const parts = data.split('_');  // Tách chuỗi thành các phần từ dấu "_"
  return parts[2];  // Trả về phần thứ 3 (số 18)
}






// Hàm thực thi các bước để cập nhật dữ liệu người chơi
function processPlayerAndUpdate(playerId_bot, data) {
  
  // Tìm người chơi có id_bot tương ứng
  const player = players.find(player => player.id_bot === playerId_bot);

  if (!player) {
    console.log("Không tìm thấy người chơi với id_bot " + playerId_bot);
    return;
  }
        console.log(`Dữ liệu nhận được ${data}`);

  const { itemName, category, number } = processData(data);  // Tách dữ liệu thành itemName, category, và number
  
   const spearItem = player.inventory.find(item => item.otp0 === itemName);
    const gemDameItem = player.inventory.find(item => item.otp0 === category);

  
  if (!spearItem)return
  
  if (spearItem.otp5 > 0){
     sendMessage(playerId_bot, `Không thể ép ngọc item đã cường hóa`);
    return
  }
  
  
  if (!gemDameItem)return
  
  
      // Kiểm tra và giảm tỉ lệ ép theo các giá trị otp1, otp2, otp3, otp4
    const otpValues = [spearItem.otp1, spearItem.otp2, spearItem.otp3, spearItem.otp4];
    let reductionRate = 100;

    otpValues.forEach(otp => {
      if (otp > 0) {
        reductionRate -= 15;  // Mỗi otp > 0 giảm tỉ lệ ép 20%
      }
    });

  

  let random = Math.random() * 100 - player.rate
  player.rate = 0
  
  if (random <= reductionRate ) {
  
  
       sendMessage(playerId_bot, `${random.toFixed(2)} / ${reductionRate} Ép ngọc thành công`);

  
  // Bước 1: Kiểm tra và xử lý gem_dame_18
  if (gemDameItem) {
    console.log(`Tìm thấy ${category} trong inventory.`);

    if (gemDameItem.otp9 === 1) {
      // Xóa gem_dame_18 nếu otp9 = 1
      console.log(`Giảm giá trị otp9 xuống 1, xóa ${category}`);
      player.inventory = player.inventory.filter(item => item.otp0 !== category);
    } else if (gemDameItem.otp9 > 1) {
      // Trừ otp9 đi 1 nếu otp9 > 1
      console.log(`Giảm otp9 đi 1 cho ${category}`);
      gemDameItem.otp9 -= 1;
    }
  } else {
    console.log(`Không tìm thấy category ${category} trong inventory.`);
  }

  // Bước 2: Tìm kiếm T1_spear và kiểm tra các otp1, otp2, otp3, otp4
 
  if (spearItem) {
    console.log(`Tìm thấy ${itemName} trong inventory.`);
    const otpValues = [spearItem.otp1, spearItem.otp2, spearItem.otp3, spearItem.otp4];
    const minOtpValue = Math.min(...otpValues);  // Tìm giá trị nhỏ nhất trong otp1, otp2, otp3, otp4

    if (minOtpValue < number) {
      console.log(`Cập nhật giá trị otp nhỏ nhất (${minOtpValue}) thành ${number}.`);
      // Cập nhật giá trị otp nhỏ nhất nếu minOtpValue nhỏ hơn number
      if (minOtpValue === spearItem.otp1) {
        spearItem.otp1 = number;
      } else if (minOtpValue === spearItem.otp2) {
        spearItem.otp2 = number;
      } else if (minOtpValue === spearItem.otp3) {
        spearItem.otp3 = number;
      } else if (minOtpValue === spearItem.otp4) {
        spearItem.otp4 = number;
      }
    } else {
      console.log(`Không cần cập nhật ${itemName} vì giá trị nhỏ nhất (${minOtpValue}) đã lớn hơn ${number}.`);
    }
  } else {
    console.log(`Không tìm thấy itemName ${itemName} trong inventory.`);
  }

  }    
  else {
  console.log("Nâng cấp thất bại!");  
   sendMessage(playerId_bot, `${random.toFixed(2)} / ${reductionRate} Ép ngọc thất bại`);

      // Bước 1: Kiểm tra và xử lý gem_dame_18
  if (gemDameItem) {
    console.log(`Tìm thấy ${category} trong inventory.`);

    if (gemDameItem.otp9 === 1) {
      // Xóa gem_dame_18 nếu otp9 = 1
      console.log(`Giảm giá trị otp9 xuống 1, xóa ${category}`);
      player.inventory = player.inventory.filter(item => item.otp0 !== category);
    } else if (gemDameItem.otp9 > 1) {
      // Trừ otp9 đi 1 nếu otp9 > 1
      console.log(`Giảm otp9 đi 1 cho ${category}`);
      gemDameItem.otp9 -= 1;
    }
  } else {
    console.log(`Không tìm thấy category ${category} trong inventory.`);
  }
    
  }
    
    
    
    
    
    
  // Bước 3: Cập nhật thông tin người chơi với hàm updatePlayerStat
  const updatedStat = {
    inventory: player.inventory,  // Cập nhật lại inventory
    // Thêm các thay đổi khác nếu cần
  };

  updatePlayerStat(player.id, updatedStat, 7)
    .then((message) => {
      console.log("Cập nhật thành công:", message);
    })
    .catch((err) => {
      console.error("Lỗi khi cập nhật:", err);
    });
}


function processData(data) {
  // Tìm vị trí của "epngocreal_" và "gem" trong chuỗi
  const itemStart = 0;  // Vị trí bắt đầu của itemName
  const gemIndex = data.indexOf('gem');  // Vị trí bắt đầu của "gem"
  
  if (gemIndex === -1) {
    console.error("Không tìm thấy 'gem' trong dữ liệu.");
    return;
  }

  // Tách phần itemName (ví dụ: "T2_iron_axe")
  const itemName = data.slice(itemStart, gemIndex);  // Cắt đúng phần itemName
  const cleanedItemName = itemName.endsWith('_') ? itemName.slice(0, -1) : itemName; // Loại bỏ _ ở cuối

  // Tách phần category (ví dụ: "gem_dame_18") và số cuối (18)
  const categoryAndNumber = data.slice(gemIndex);  // Bao gồm "gem_dame_18"
  
  // Tách phần category và số
  const parts = categoryAndNumber.split('_');
  const category = parts.join('_');  // "gem_dame_18"
  const number = parseInt(parts[parts.length - 1]);  // Lấy số cuối cùng (18)

  return { itemName: cleanedItemName, category, number };
}








function enhanceItem(playerId, itemId) {
  let checkup = 0
    let number = 0;
  let random = 0;
    const allStats = [
        armorStats,
        shieldStats,
        glovesStats,
        bootsStats,
        weaponStats
    ];

    // Lặp qua tất cả các đối tượng để tìm kiếm itemId
    for (let i = 0; i < allStats.length; i++) {
        const stats = allStats[i];
        
        // Kiểm tra xem itemId có tồn tại trong object này không
        if (stats.hasOwnProperty(itemId)) {
            // Lấy số thứ tự của item theo format T1, T2, ..., T15
            const itemLevel = itemId.match(/^T(\d+)_/); // Lấy số sau "T"
            if (itemLevel) {
                number = parseInt(itemLevel[1], 10); // Convert số đó thành số nguyên
               console.log(`number = ${number} `);
            }
            break;  // Thoát khỏi vòng lặp nếu đã tìm thấy itemId
        }
    }

    // Tìm người chơi với playerId
    const player = players.find(p => p.id_bot === playerId);
    if (!player) {
        console.log(`Không tìm thấy người chơi với id: ${playerId}.`);
        return;
    }

    // Tìm item trong inventory
    const item = player.inventory.find(i => i.otp0 === itemId);
  const itemGem = player.inventory.find(i => i.otp0 === "gem");
    if (!item) {
        console.log(`Không tìm thấy item ${itemId} trong inventory.`);
        return;
    }
      if (!itemGem) {
        console.log(`Không tìm thấy item ${itemGem} trong inventory.`);
        return;
    }
    //number = (3 * Math.pow(3, item.otp5))*number;
       number = item.otp5 * number + number;
    // Kiểm tra trị số otp1 của item
    if (number <= itemGem.otp1) {
        // Nếu number < otp1, tiến hành nâng cấp item (tăng otp5)
        checkup = Math.max(100 - (Math.pow(item.otp5, 1.65) * 2.2), 10)
      
      random = Math.random() * 100 - player.rate
      player.rate = 0
      if ( random <= Math.max(100 - (Math.pow(item.otp5, 1.65) * 2.2), 10)  ) {
  console.log("Cường hóa thành công!");
                item.otp5 += 1;
        itemGem.otp1 -= number
        sendMessage(playerId, `(${random.toFixed(2)} / ${checkup.toFixed(2)}) Item ${itemId}: đã được cường hóa tăng lên ${item.otp5}.  gem - ${number} còn lại (${itemGem.otp1}) `);
        console.log(`Nâng cấp ${itemId}: otp5 đã được tăng lên ${item.otp5}.  gem - ${number} còn lại (${itemGem.otp1}) `);
} else {
  console.log("Cường hóa thất bại!");
  itemGem.otp1 -= number
  player.inventory = player.inventory.filter(item => item.otp0 !== itemId);  //xóa item
  
        sendMessage(playerId, `(${random.toFixed(2)} / ${checkup.toFixed(2)}) Cường hóa ${itemId}: thất bại đã mất item.  gem - ${number} còn lại (${itemGem.otp1}) `);
        console.log(`Nâng cấp ${itemId}: thất bại, đã mất item.  gem - ${number} còn lại (${itemGem.otp1}) `);
}

      

      

    } else {
        console.log(`Không thể nâng cấp ${itemId} vì không đủ gem (${itemGem.otp1} ) / cần thiết gem = ${number}  `);
        sendMessage(playerId, `Không thể nâng cấp ${itemId} vì không đủ gem (${itemGem.otp1}) / cần thiết gem = ${number}  `);

    }
 if (checkup == 0) return 
    // Cập nhật lại thông tin người chơi sau khi nâng cấp
    const updatedStat = {
        inventory: player.inventory,
        // Thêm các thay đổi khác nếu cần
    };

    // Gọi hàm updatePlayerStat để lưu lại dữ liệu
    updatePlayerStat(player.id, updatedStat, 8)
        .then((message) => {
            console.log("Cập nhật thành công:", message);
        })
        .catch((err) => {
            console.error("Lỗi khi cập nhật:", err);
        });
}






// Xử lý ép ngọc cho người chơi (cập nhật cho kỹ năng)
function handlesSkills(playerId_bot) {
  // Tìm kiếm người chơi theo id
  const player = players.find(player => player.id_bot === playerId_bot);

  if (!player) {
    console.log("Không tìm thấy người chơi với id " + playerId_bot);
    return;
  }

  // Lọc các item trong inventory có otp6 == 9 (kỹ năng)
  const filteredSkills = [];
  player.inventory.forEach(item => {
    if (item.otp6 === 9) {  // Lọc kỹ năng có otp6 == 9
      // Lưu thông tin kỹ năng
      filteredSkills.push({
        skillName: item.otp0,        // Tên kỹ năng
        skillPower: item.otp1,       // Độ tăng của skill
        skillEffect: item.otp2,      // Chỉ số tác động của skill (dame, def, crit,...)
        manaCost: item.otp3,         // Mana tiêu tốn khi sử dụng skill
        attackCount: item.otp4,      // Số đòn đánh có hiệu quả
        skillLevel: item.otp5,        // Cấp độ của skill
        hoichieu: item.otp7,
        soluong: item.otp9,
        uutien: item.otp8,
      });
    }
  });

  // Debug - kiểm tra danh sách kỹ năng lọc được
  console.log(`Danh sách kỹ năng lọc được: ${filteredSkills.length}`);

  if (filteredSkills.length === 0) {
    sendMessage(playerId_bot, "Bạn không có kỹ năng nào có thể ép ngọc.");
    return;
  }

  // Mảng để chuyển đổi các giá trị tác động (1 = dame, 2 = def, 3 = hp, 4 = mana)
  const effectTypes = {
    1: 'Dame (Tấn công)',
    2: 'Def (Phòng thủ)',
    3: 'HP (Sức khỏe)',
    4: 'Mana (Năng lượng)'
  };

  // Tạo danh sách các nút item để người dùng chọn
  const skillButtons = filteredSkills.map(skill => [
    { 
      text: skill.skillName, 
      callback_data: `selecskillreal_${skill.skillName}`  // Sử dụng callback_data mới 'epngoc_${skill.skillName}'
    }
  ]);

  const reply_markup = {
    inline_keyboard: skillButtons
  };

  // Tạo nội dung thông báo chi tiết kỹ năng
  let skillDetails = "Danh sách kỹ năng của bạn:\n\n";
  filteredSkills.forEach(skill => {
    // Chuyển đổi giá trị tác động (otpEffect) thành tên trực quan hơn
    const effectDescription = effectTypes[skill.skillEffect] || 'Không xác định';

    skillDetails += `
      Tên sách kỹ năng: ${skill.skillName}
      Chỉ số tăng = +${skill.skillPower} ${effectDescription}
      Mana tiêu tốn /1đòn: ${skill.manaCost} mana
      Số đòn hiệu quả: ${skill.attackCount}
      Sử dụng lại sau : ${skill.hoichieu} đòn đánh
      Cấp độ kỹ năng: ${skill.skillLevel} (X chỉ số)
      Mức độ ưu tiên: ${skill.uutien} (9 >>> 0)
      Số lượng trong kho: ${skill.soluong}
      ----------------------
    `;
  });

  // Gửi tin nhắn với danh sách kỹ năng và các nút
  sendMessage(playerId_bot, skillDetails, reply_markup);
}








function checkskillup(playerId, itemId) {
    let checkup = 0;
    let number = 0;
    let random = 0
    // Tìm người chơi với playerId
    const player = players.find(p => p.id_bot === playerId);
    if (!player) {
        console.log(`Không tìm thấy người chơi với id: ${playerId}.`);
        return;
    }

    // Tìm item trong inventory
    const item = player.inventory.find(i => i.otp0 === itemId);

    if (!item) {
        console.log(`Không tìm thấy item ${itemId} trong inventory.`);
        return;
    }


    // Lấy giá trị otp9 và otp5 của item
    const otp9 = item.otp9;
    const otp5 = item.otp5;
    number = (3 * Math.pow(3, item.otp5));
    // Kiểm tra xem otp9 có lớn hơn otp5 không
    if (otp9 >= number) {
      
        checkup = Math.max(100 - (otp5) * 30, 10);
        random = Math.random() * 100 - player.rate
      player.rate = 0
            if (random <= Math.max(100 - (otp5) * 30, 10) ) {
  console.log("Cường hóa thành công!");
      item.otp5 += 1;
        item.otp9 -= number;
        console.log(`Nâng cấp thành công! ${itemId}: đã được tăng lên ${item.otp5}. sách còn lại: ${item.otp9}`);
        sendMessage(playerId, `(${random.toFixed(2)} / ${checkup}) Item ${itemId}: đã được cường hóa tăng lên ${item.otp5}. sách còn lại: ${item.otp9}`);
} else {
  console.log("Nâng cấp thất bại!");
  item.otp9 -= number
        sendMessage(playerId, `(${random.toFixed(2)} / ${checkup}) Nâng cấp ${itemId}: thất bại.  sách - ${number} còn lại (${item.otp9}) `);
        console.log(`(${random.toFixed(2)}) Nâng cấp ${itemId}: thất bại.  sách - ${number} còn lại (${item.otp9}) `);
}
      
      
      
    } else {
        console.log(`Không thể nâng cấp ${itemId} vì không đủ sách (${otp9}) / cần thiết sách = ${number}.`);
        sendMessage(playerId, `Không thể nâng cấp ${itemId} vì không đủ sách (${otp9}) / cần thiết sách = ${number}.`);
    }

    if (checkup === 0) return;

    // Cập nhật lại thông tin người chơi sau khi nâng cấp
    const updatedStat = {
        inventory: player.inventory,
        // Thêm các thay đổi khác nếu cần
    };

    // Gọi hàm updatePlayerStat để lưu lại dữ liệu
    updatePlayerStat(player.id, updatedStat, 9)
        .then((message) => {
            console.log("Cập nhật thành công:", message);
        })
        .catch((err) => {
            console.error("Lỗi khi cập nhật:", err);
        });
}









// Hàm xử lý các tác dụng của món item
function handleItemEffects(player, item) {
    // Kiểm tra item và thực hiện các hành động phù hợp
    if (item.name === "Bùa +5% rate") {
        player.rate = 5;  
        sendMessage(player.id_bot, `Tỷ lệ may mắn của bạn đã tăng thêm ${player.rate}%.`, { parse_mode: 'HTML' });

    } else if (item.name === "Bùa +10% rate") {
        // Tăng tỷ lệ may mắn
        player.rate = 10;
        sendMessage(player.id_bot, `Tỷ lệ may mắn của bạn đã tăng thêm ${player.rate}%.`, { parse_mode: 'HTML' });
    } else if (item.name === "Bùa +15% rate") {
        // Tăng tỷ lệ may mắn
        player.rate = 15;
        sendMessage(player.id_bot, `Tỷ lệ may mắn của bạn đã tăng thêm ${player.rate}%.`, { parse_mode: 'HTML' });
      
    } else if (item.name === "Bùa triệu hồi boss lv1") {
        // Triệu hồi boss cấp 1 (Giả sử hàm triệu hồi boss đã được định nghĩa)
        summonBoss(players, 1);  // Triệu hồi boss cấp 1
        sendMessage(player.id_bot, "Boss cấp 1 đã được triệu hồi!", { parse_mode: 'HTML' });

    } else if (item.name === "Bùa triệu hồi boss lv5") {
        // Triệu hồi boss cấp 5
        summonBoss(players, 5);  // Triệu hồi boss cấp 5
        sendMessage(player.id_bot, "Boss cấp 5 đã được triệu hồi!", { parse_mode: 'HTML' });

    } else if (item.name === "Bùa triệu hồi boss lv10") {
        // Triệu hồi boss cấp 10
        summonBoss(players, 10);  // Triệu hồi boss cấp 10
        sendMessage(player.id_bot, "Boss cấp 10 đã được triệu hồi!", { parse_mode: 'HTML' });

    } else if (item.name === "Bùa triệu hồi boss lv20") {
        // Triệu hồi boss cấp 20
        summonBoss(players, 20);  // Triệu hồi boss cấp 20
        sendMessage(player.id_bot, "Boss cấp 20 đã được triệu hồi!", { parse_mode: 'HTML' });

    } else if (item.name === "Bùa triệu hồi boss lv30") {
        // Triệu hồi boss cấp 30
        summonBoss(players, 30);  // Triệu hồi boss cấp 30
        sendMessage(player.id_bot, "Boss cấp 30 đã được triệu hồi!", { parse_mode: 'HTML' });

    } else if (item.name === "Bùa triệu hồi boss lv40") {
        // Triệu hồi boss cấp 40
        summonBoss(players, 40);  // Triệu hồi boss cấp 40
        sendMessage(player.id_bot, "Boss cấp 40 đã được triệu hồi!", { parse_mode: 'HTML' });

    } else if (item.name === "Bùa triệu hồi boss lv50") {
        // Triệu hồi boss cấp 50
        summonBoss(players, 50);  // Triệu hồi boss cấp 50
        sendMessage(player.id_bot, "Boss cấp 50 đã được triệu hồi!", { parse_mode: 'HTML' });

    } else if (item.name === "Bùa triệu hồi boss lv60") {
        // Triệu hồi boss cấp 60
        summonBoss(players, 60);  // Triệu hồi boss cấp 60
        sendMessage(player.id_bot, "Boss cấp 60 đã được triệu hồi!", { parse_mode: 'HTML' });

    } else if (item.name === "Bùa triệu hồi boss lv70") {
        // Triệu hồi boss cấp 70
        summonBoss(players, 70);  // Triệu hồi boss cấp 70
        sendMessage(player.id_bot, "Boss cấp 70 đã được triệu hồi!", { parse_mode: 'HTML' });

    }
}


// Hàm summonBoss để triệu hồi boss mới và tăng sức mạnh theo cấp độ
function summonBoss(players, level) {
    // Tính toán sức mạnh boss theo cấp độ
    let hp = Math.round(20000 * Math.pow(1.07, level));
    
    // Damage tăng theo hệ số mũ nhỏ (17% mỗi cấp)
    let damage = Math.round(50 * Math.pow(1.15, level) + (level * 5));
    
    // Defense tăng tuyến tính (tăng 2 mỗi cấp)
    let defense = 50 + (level * 7);

    // Kiểm tra nếu boss đã chết (hp <= 0)
    if (boss.hp <= 0) {
        // Thay đổi boss mới với sức mạnh theo cấp độ
        boss = {
            id: "boss001",
            name: "Big Boss",
            hp: hp,                      // HP được tính toán theo cấp độ
            lv: level,                   // Cấp độ boss
            damage: damage,              // Sát thương được tính toán theo cấp độ
            defense: defense,            // Phòng thủ được tính toán theo cấp độ
            isAlive: true,               // Trạng thái sống của boss
            boss: 1,
        };
        
        // Gửi thông báo về boss mới
        let textMessage = `Có boss mới cấp ${level}\n  ${boss.name}, Cấp: ${boss.lv}, HP: ${boss.hp}, Damage: ${boss.damage}, Defense: ${boss.defense} \n https://same-mangrove-seed.glitch.me/`;
        sendMessage(6708647498, textMessage);
            //thêm các sendMessage khi có người chơi khác

      
      
    //updateSkillsBasedOnInventory(players)
    
    //updateAllPlayersStats(players)
      
    updatePlayersHpToMax();
      
    startBossFight(boss,players[0]);
    startBossFight(boss,players[1]);
    startBossFight(boss,players[2]); 
      
      
      
      
      
      
    } else {
        console.log(`Boss hiện tại chưa chết: ${boss.name}, Cấp: ${boss.lv}, HP: ${boss.hp}, Damage: ${boss.damage}, Defense: ${boss.defense}`);
      sendMessage(6708647498, `Boss hiện tại chưa chết: ${boss.name}, Cấp: ${boss.lv}, HP: ${boss.hp}, Damage: ${boss.damage}, Defense: ${boss.defense}`);
      //thêm các sendMessage khi có người chơi khác
      
      
      
    }
}
 









function thaydoitrangbi_Re(player, type, item2) {
  let result = 0;  // Biến lưu kết quả cho item 1
  let item2Total = 0;  // Biến lưu kết quả cho item 2
  let item;
  let chenh = 0
  // Định nghĩa item dựa trên loại tính toán
  switch (type) {
    case 'weapon':
      if (!player['trang-bi']['vu-khi'] || !player['trang-bi']['vu-khi'].otp0) {
        console.log("Weapon item does not exist or is incomplete!");
        item = {
          otp0: 0,
          otp5: 0,
          otp1: 0,
          otp2: 0,
          otp3: 0,
          otp4: 0,
          stats: weaponStats,
          grapStats: GrapStats
        };
      } else {
        item = {
          otp0: player['trang-bi']['vu-khi'].otp0,
          otp5: player['trang-bi']['vu-khi'].otp5,
          otp1: player['trang-bi']['vu-khi'].otp1,
          otp2: player['trang-bi']['vu-khi'].otp2,
          otp3: player['trang-bi']['vu-khi'].otp3,
          otp4: player['trang-bi']['vu-khi'].otp4,
          stats: weaponStats,
          grapStats: GrapStats
        };
      }
      break;

    case 'armor':
      if (!player['trang-bi']['ao'] || !player['trang-bi']['ao'].otp0) {
        console.log("Armor item does not exist or is incomplete!");
        item = {
          otp0: 0,
          otp5: 0,
          otp1: 0,
          otp2: 0,
          otp3: 0,
          otp4: 0,
          stats: armorStats,
          grapStats: GrapStats
        };
      } else {
        item = {
          otp0: player['trang-bi']['ao'].otp0,
          otp5: player['trang-bi']['ao'].otp5,
          otp1: player['trang-bi']['ao'].otp1,
          otp2: player['trang-bi']['ao'].otp2,
          otp3: player['trang-bi']['ao'].otp3,
          otp4: player['trang-bi']['ao'].otp4,
          stats: armorStats,
          grapStats: GrapStats
        };
      }
      break;

    case 'defense':
      if (!player['trang-bi']['tay'] || !player['trang-bi']['tay'].otp0) {
        console.log("Gloves item does not exist or is incomplete!");
        item = {
          otp0: 0,
          otp5: 0,
          otp1: 0,
          otp2: 0,
          otp3: 0,
          otp4: 0,
          stats: glovesStats,
          grapStats: GrapStats
        };
      } else {
        item = {
          otp0: player['trang-bi']['tay'].otp0,
          otp5: player['trang-bi']['tay'].otp5,
          otp1: player['trang-bi']['tay'].otp1,
          otp2: player['trang-bi']['tay'].otp2,
          otp3: player['trang-bi']['tay'].otp3,
          otp4: player['trang-bi']['tay'].otp4,
          stats: glovesStats,
          grapStats: GrapStats
        };
      }
      break;

    case 'defenseBoots':
      if (!player['trang-bi']['chan'] || !player['trang-bi']['chan'].otp0) {
        console.log("Boots item does not exist or is incomplete!");
        item = {
          otp0: 0,
          otp5: 0,
          otp1: 0,
          otp2: 0,
          otp3: 0,
          otp4: 0,
          stats: bootsStats,
          grapStats: GrapStats
        };
      } else {
        item = {
          otp0: player['trang-bi']['chan'].otp0,
          otp5: player['trang-bi']['chan'].otp5,
          otp1: player['trang-bi']['chan'].otp1,
          otp2: player['trang-bi']['chan'].otp2,
          otp3: player['trang-bi']['chan'].otp3,
          otp4: player['trang-bi']['chan'].otp4,
          stats: bootsStats,
          grapStats: GrapStats
        };
      }
      break;

    case 'defenseSkill':
      if (!player['trang-bi']['giap'] || !player['trang-bi']['giap'].otp0) {
        console.log("Shield item does not exist or is incomplete!");
        item = {
          otp0: 0,
          otp5: 0,
          otp1: 0,
          otp2: 0,
          otp3: 0,
          otp4: 0,
          stats: shieldStats,
          grapStats: GrapStats
        };
      } else {
        item = {
          otp0: player['trang-bi']['giap'].otp0,
          otp5: player['trang-bi']['giap'].otp5,
          otp1: player['trang-bi']['giap'].otp1,
          otp2: player['trang-bi']['giap'].otp2,
          otp3: player['trang-bi']['giap'].otp3,
          otp4: player['trang-bi']['giap'].otp4,
          stats: shieldStats,
          grapStats: GrapStats
        };
      }
      break;

    default:
      console.log("Unknown type!");
      return 0;
  }

  // Lấy giá trị cơ bản từ `stats` theo `otp0` của item
  let baseStat = item.stats[item.otp0];
  let grapStat = item.grapStats[item.otp5];

  // Kiểm tra xem `baseStat` có tồn tại không
  if (baseStat) {
    let total = baseStat + item.otp1 + item.otp2 + item.otp3 + item.otp4;

    if (grapStat) total *= grapStat;

    result = Math.round(total);
  }

  // Tìm item2 trong inventory của player dựa trên tên otp0
  let item2Stat = null;
  if (item2 && player.inventory) {
    // Giả sử trong inventory của player có cấu trúc tương tự như item
    let foundItem = player.inventory.find(inventoryItem => inventoryItem.otp0 === item2);
    if (foundItem) {
      item2Stat = foundItem;
    }
  }

  // Nếu tìm thấy item2, tính toán tương tự và so sánh
  if (item2Stat) {
    let baseStat2 = item.stats[item2Stat.otp0];  // Dùng stats từ item1
    let grapStat2 = item.grapStats[item2Stat.otp5];  // Dùng grapStats từ item1

    if (baseStat2) {
      let item2Total = baseStat2 + item2Stat.otp1 + item2Stat.otp2 + item2Stat.otp3 + item2Stat.otp4;

      if (grapStat2) item2Total *= grapStat2;

      item2Total =  Math.round(item2Total);

      console.log(`Item 1 Total: ${result}`);
      console.log(`Item 2 Total: ${item2Total}`);

      chenh = item2Total - result;  // Tính độ chênh lệch chính xác
    }
  } else {
    console.log("Item2 not found in player's inventory!");
    chenh = 0;  // Nếu không tìm thấy item2, độ chênh lệch là 0
  }

  console.log(`Độ tăng chỉ số ============ : ${chenh}`);
  return chenh;
}









function calculatePlayerLevel(player) {
  let level = 1;
  let baseExp = 1000; // EXP cần để lên cấp đầu tiên (có thể thay đổi)
  let multiplier = 1.68; // Hệ số để tăng độ khó (càng lớn thì độ khó càng cao)
  let totalExp = player.exp
  let expRequired = baseExp; // EXP yêu cầu cho cấp độ hiện tại
  
  // Tính cấp độ dựa trên EXP hiện tại
  while (totalExp >= expRequired) {
    totalExp -= expRequired; // Trừ EXP đã dùng cho cấp hiện tại
    level++; // Tăng level lên
    expRequired = Math.round(baseExp * Math.pow(level, multiplier)); // Tính EXP cần cho cấp tiếp theo
  }
  
  player.level = level
  return level;
}







// Các chỉ số tăng cho từng loại vũ khí (char)
const charStats = {
  1: {
    hp_max: 5000,   // Đao (Axe) tăng health_max
    mana: 100,        // Đao (Axe) tăng mana
    "def-dame": 10,   // Đao (Axe) tăng def-dame
  },
  2: {
    hp_max: 30,   // Kiếm (Sword) tăng health_max
    mana: 50,         // Kiếm (Sword) tăng mana
    "crit-%": 50,      // Kiếm (Sword) tăng crit-%
  },
  3: {
    hp_max: 40,   // Gậy (Staff) tăng health_max
    mana: 5000,   // Gậy (Staff) tăng def-dame
    "crit-%": 10,     // Gậy (Staff) tăng crit-%
  },
  4: {
    hp_max: 20,   // Cung (Bow) tăng health_max
    mana: 150,        // Cung (Bow) tăng mana
    "attach-speed": -0.8, // Cung (Bow) tăng attach-speed
  },
  5: {
    hp_max: 25,   // Thương (Spear) tăng health_max
    "def-skill": 1000,  // Thương (Spear) tăng def-skill
    "crit-x": 1,      // Thương (Spear) tăng crit-x
  },
  6: {
    // Loại vũ khí không xác định không tăng thuộc tính nào
    mana: 0,
  }
};





// Hàm kiểm tra loại vũ khí và cập nhật biến char trong player
function getWeaponType(weaponName, player) {
  if (weaponName.includes("axe")) {
    player.char = 1;  // Đao (Axe)
  } else if (weaponName.includes("sword")) {
    player.char = 2;  // Kiếm (Sword)
  } else if (weaponName.includes("staff")) {
    player.char = 3;  // Gậy (Staff)
  } else if (weaponName.includes("bow")) {
    player.char = 4;  // Cung (Bow)
  } else if (weaponName.includes("spear")) {
    player.char = 5;  // Thương (Spear)
  } else {
    player.char = 6;  // Loại vũ khí không xác định
  }
}



// Hàm tính toán và cập nhật thuộc tính của người chơi
function checkcharUP(player) {
  const weaponName = player["trang-bi"]["vu-khi"].otp0;  // Lấy tên vũ khí từ "vu-khi"
  if (weaponStats[weaponName]) {
    // Nếu vũ khí tồn tại trong weaponStats, cập nhật loại vũ khí cho player
    getWeaponType(weaponName, player);

    // Lấy các chỉ số tăng theo char
    const statIncrease = charStats[player.char];

    // Cập nhật các thuộc tính của người chơi
    for (let stat in statIncrease) {
      player[stat] += statIncrease[stat];  // Tăng các thuộc tính theo chỉ số tăng
    }
    console.log(`${player.name} có vũ khí: ${weaponName}, Loại: ${player.char}, Các thuộc tính mới:`, player);
  } else {
    // Nếu vũ khí không tồn tại trong weaponStats, thông báo không xác định
    console.log(`${player.name} có vũ khí "${weaponName}" không xác định.`);
  }
}






// Hàm trừ đi chỉ số khi thay đổi vũ khí
function checkcharDownandUp(player) {

  const weaponName = player["trang-bi"]["vu-khi"].otp0;  // Lấy tên vũ khí từ "vu-khi"
  
  // Nếu player.char chưa được xác định, gán giá trị mặc định là 6 (loại vũ khí không xác định)
  const previousChar = player.char !== undefined ? player.char : 6;  // Kiểm tra nếu player.char đã được gán giá trị, nếu chưa thì mặc định là 6

  if (weaponStats[weaponName]) {
    // Nếu vũ khí tồn tại trong weaponStats, cập nhật loại vũ khí cho player
    getWeaponType(weaponName, player);  // Cập nhật loại vũ khí mới

    // Lấy các chỉ số giảm theo char cũ
    const previousStatDecrease = charStats[previousChar];

    // Trừ các thuộc tính của người chơi (lúc trước)
    for (let stat in previousStatDecrease) {
      player[stat] -= previousStatDecrease[stat];  // Giảm các thuộc tính theo chỉ số giảm
    }

    // Lấy các chỉ số tăng theo char mới
    const statIncrease = charStats[player.char];

    // Cập nhật các thuộc tính của người chơi với chỉ số mới
    for (let stat in statIncrease) {
      player[stat] += statIncrease[stat];  // Tăng các thuộc tính theo chỉ số tăng
    }

    console.log(`${player.name} thay đổi vũ khí: ${weaponName}, Loại: ${player.char}, Các thuộc tính mới:`, player);
  } else {
    // Nếu vũ khí không tồn tại trong weaponStats, thông báo không xác định
    console.log(`${player.name} có vũ khí "${weaponName}" không xác định.`);
  }
}









// Hàm tạo thông báo tổng quát khi bắt đầu game cho các loại vũ khí
function generateWeaponTypeInfo() {
  let message = "Thông tin về các loại vũ khí và chỉ số tăng:\n";

  // Duyệt qua các loại vũ khí (char)
  for (let char in charStats) {
    let statIncrease = charStats[char];
    message += `\nLoại vũ khí ${getWeaponName(char)}:`;

    // Thêm các chỉ số vào thông báo
    if (statIncrease.hp_max) {
      message += `\n  - Tăng HP Max: ${statIncrease.hp_max}`;
    }
    if (statIncrease.mana) {
      message += `\n  - Tăng Mana: ${statIncrease.mana}`;
    }
    if (statIncrease["def-dame"]) {
      message += `\n  - Tăng Def-Dame: ${statIncrease["def-dame"]}`;
    }
    if (statIncrease["crit-%"]) {
      message += `\n  - Tăng Crit-Rate: ${statIncrease["crit-%"]}%`;
    }
    if (statIncrease["attach-speed"]) {
      message += `\n  - Tăng Attach-Speed: ${statIncrease["attach-speed"]}`;
    }
    if (statIncrease["def-skill"]) {
      message += `\n  - Tăng Def-Skill: ${statIncrease["def-skill"]}`;
    }
    if (statIncrease["crit-x"]) {
      message += `\n  - Tăng Crit-X: ${statIncrease["crit-x"]}`;
    }
  }

  return message;
}

// Hàm trả về tên vũ khí theo loại (char)
function getWeaponName(char) {
  switch (char) {
    case '1': return "Đao (Axe)";
    case '2': return "Kiếm (Sword)";
    case '3': return "Gậy (Staff)";
    case '4': return "Cung (Bow)";
    case '5': return "Thương (Spear)";
    case '6': return "Vũ khí không xác định";
    default: return "Vũ khí không xác định";
  }
}

// Gọi hàm khi game bắt đầu hoặc khi người chơi cần thông báo
//  const message = generateWeaponTypeInfo();










































// Gọi hàm sendMainMenu khi người dùng đăng nhập
sendMainMenu(6708647498);  
Menutrangbi(6708647498)
