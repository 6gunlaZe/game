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







function updatePlayerStat(playerId, updatedStat) {
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

        // Cập nhật lại file JSON lên GitHub
        const commitMessage = `Cập nhật thông số người chơi với ID ${playerId}`;

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






function sendPlayerStatsToTelegram(playerId, chatId) {
  getPlayerStat(playerId)  // Lấy thông tin nhân vật từ GitHub
    .then(player => {

    updateWeaponBasedOnInventory(player);
     let weaponhp = calculateHP(player) - player.hp_max
          let weaponDame = calculateWeaponDamage(player) - player.dame; // Gọi hàm để tính dame của vũ khí
        let weapondef = calculateDEF(player) - player['def-dame'];
  let weapondef1 = calculateDEFskill(player) - player['def-skill'];
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
    })
    .catch(error => {
      console.error(error);
      sendMessage(chatId, 'Lỗi khi lấy thông tin nhân vật!');
    });
}







sendPlayerStatsToTelegram(12345, 6708647498);


















function calculateWeaponDamage(player) {
  // Lấy giá trị otp0 của vũ khí
  let dame0 = player.dame;	
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
    updateWeaponBasedOnInventory(player);

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
  // Lặp qua các kỹ năng của player và kiểm tra nếu kỹ năng đã hết hiệu lực
  player.skills.forEach(skill => {
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
    "2": 1.11, 
    "3": 1.16,  
    "4": 1.19,  
    "5": 1.23,  
    "6": 1.26,
    "7": 1.30,
    "8": 1.36,
    "9": 1.41,
    "10": 1.46,
    "11": 1.51,
    "12": 1.56,
    "13": 1.62,
    "14": 1.68,
    "15": 1.75,
    "16": 1.82,
    "17": 1.90,
    "18": 1.99,
    "19": 2.10,
};



// Tạo vòng lặp mỗi 20 giây (20000 milliseconds)
const bossInterval = setInterval(() => {
  // Kiểm tra nếu boss chết (hp <= 0)
  if (boss.hp <= 0) {
    // Thay đổi boss mới
    boss = {
      id: "boss001",
      name: "Big Boss",
      hp: 20000,         // Máu của boss
      lv:10, 
      damage: 50,       // Sát thương của boss
      defense: 50,       // Phòng thủ của boss
      isAlive: true,     // Trạng thái sống của boss
      boss:1,
    };
    boss.hp = 20000
    let textMessage = "Có boss mới\nhttps://same-mangrove-seed.glitch.me/";

    sendMessage(6708647498, textMessage)
    console.log("Boss đã chết, tạo boss mới:", boss);
  } else {
    console.log(`Boss hiện tại: ${boss.name}, HP: ${boss.hp}`);
  }
}, 20000);  // Lặp lại mỗi 20 giây (20000ms)





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

  // Kiểm tra xem người chơi có chí mạng không
  const isCrit = Math.random() < critChance / 100; // Xác suất chí mạng (từ 0 đến 1)
  let finalDamage = isCrit ? baseDamage * critMultiplier : baseDamage; // Sát thương cuối cùng khi có chí mạng

  // Nếu mục tiêu là boss
  if (target && target.isBoss) {
    finalDamage -= target.defense;  // Phòng thủ của boss giảm sát thương người chơi gây ra
  }
  // Nếu mục tiêu là người chơi
  else if (target && target.isPlayer) {
    finalDamage -= target['def-dame'];  // Phòng thủ của người chơi giảm sát thương người chơi gây ra
  }

  // Đảm bảo rằng sát thương không âm
  finalDamage = Math.max(0, finalDamage);

  // Lấy thông tin của người chơi đang tấn công
  const playertarget = players.indexOf(target) + 1; // Xác định người chơi tấn công (1, 2, hoặc 3)

  return {
    damage: finalDamage,  // Sát thương tính ra sau khi giảm phòng thủ
    isCrit: isCrit,       // Kiểm tra nếu là chí mạng
    playertarget: playertarget // Thông tin về người chơi tấn công
  };
}




function recordPlayerAttack(player, target) {

  if (player.hp <= 0) return

  updatePlayerStatsBasedOnSkills(player);
  
  const playerReport = playerDamageReport.find(r => r.id === player.id);

  // Tính sát thương của người chơi (đã bao gồm phòng thủ của mục tiêu)
  const { damage, isCrit, playertarget } = calculatePlayerDamage(player, target);  // Lấy playertarget từ hàm

  // Ghi nhận đòn đánh và tổng sát thương của người chơi
  playerReport.attacks.push({ damage, isCrit, playertarget });  // Lưu playertarget cùng với thông tin đòn đánh
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

  // Tính toán tốc độ tấn công và sát thương
  const attackSpeed = player['attach-speed'];  // Tốc độ đánh của player
  const damage = calculatePlayerDamage(player, target);  // Tính sát thương mỗi đòn đánh của player

  // Tấn công theo tốc độ đánh của player
  const attackInterval = setInterval(() => {
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

  // Kiểm tra nếu tìm thấy playerReport và lấy totalDamage
  if (playerReport) {
    const totalDamage = playerReport.totalDamage;
    sendMessage(-4676989627, `Tổng sát thương của ${player.name}: ${totalDamage}`, { parse_mode: 'HTML' });
    console.log(`Tổng sát thương của ${player.name}: ${totalDamage}`);
        // Đặt lại totalDamage sau khi lấy giá trị
    playerReport.totalDamage = 0;  // Đặt lại totalDamage về 0 (hoặc giá trị khác nếu cần)
    
    if(target.boss == 1)
      {
    const item  = checkdropitem(target.lv, itemsrate) //// itemsrate là danh sách item drop có thể thay đổi danh sách này tùy loại quái, hàm này trả về tên item và chỉ quan tâm opt56
          addItemToInventory(player.id, item)  
        sendMessage(-4676989627, `check drop ${player.name}`, { parse_mode: 'HTML' });
      }
    
    return totalDamage;  // Trả về tổng sát thương nếu tìm thấy
  } else {
    console.log("Không tìm thấy playerReport với id này.");
    return 0;  // Trả về 0 nếu không tìm thấy
  }
}







// danh sách các món đồ drop chuẩn, kể cả sách skill, ngọc ép
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
  
  
  
  
  "gem_dame_18": { "otp0": "gem_dame_18", "otp1": 1, "otp6": 8, "otp9": 0 },
  
  
  
  
  "skill_crit": { "otp0": "skill_crit", "otp1": 30, "otp2": 1, "otp3": 10, "otp4": 3, "otp5": 2, "otp6": 9, "otp7": 5, "otp8": 1, "otp9": 0 }

  
  
  
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
  updatePlayerStat(playerId, { inventory: player.inventory })
    .then((message) => {
      console.log(message);  // In ra thông báo cập nhật thành công
    })
    .catch((err) => {
      console.error(err);  // In ra lỗi nếu có
    });
}






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
            
            increaseGemOtp1AndUpdateGitHub(player, number);
            return number; // Trả về số thứ tự của item
        }
    }
    
    // Nếu không tìm thấy itemId
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
      updatePlayerStat(player.id, { inventory: player.inventory })
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
      updatePlayerStat(player.id, { inventory: player.inventory })
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





function checkdropitem(lvboss, itemsrate) {
    // Bước 1: Lọc các item có otp5 nhỏ hơn lvboss
    let filteredItems = Object.keys(itemsrate).filter(itemKey => itemsrate[itemKey].otp5 <= lvboss);
    console.log('Filtered Items based on otp5 <= lvboss:', filteredItems);

    // Nếu không có item nào thỏa mãn điều kiện otp5 <= lvboss, trả về null 
    if (filteredItems.length === 0) {
        console.log('Không có món đồ nào thỏa mãn otp5 <= lvboss');
        return null ;
    }

    // Bước 2: Kiểm tra điều kiện với random và otp6
    let randomValue = Math.floor(Math.random() * 10000) + 1;  // Random từ 1 đến 100
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




// otp5 = lv boss   opt6 = rate số càng lớn tỉ lệ ra càng nhiều
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
  "T11_skyspear": {"otp0": "T11_skyspear", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T12_frost_spear": {"otp0": "T12_frost_spear", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T13_venom_spear": {"otp0": "T13_venom_spear", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T14_runespear": {"otp0": "T14_runespear", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T15_legendary_spear": {"otp0": "T15_legendary_spear", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  
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
  "T11_flame_armor": {"otp0": "T11_flame_armor", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T12_wind_armor": {"otp0": "T12_wind_armor", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T13_battle_armor": {"otp0": "T13_battle_armor", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T14_runes_armor": {"otp0": "T14_runes_armor", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T15_legendary_armor": {"otp0": "T15_legendary_armor", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  
  "T1_shield": {"otp0": "T1_shield", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 10, "otp6": 900},
  "T2_iron_shield": {"otp0": "T2_iron_shield", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 20, "otp6": 700},
  "T3_steel_shield": {"otp0": "T3_steel_shield", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 30, "otp6": 400},
  "T4_silver_shield": {"otp0": "T4_silver_shield", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 40, "otp6": 300},
  "T5_frost_shield": {"otp0": "T5_frost_shield", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 50, "otp6": 200},
  "T6_fire_shield": {"otp0": "T6_fire_shield", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 60, "otp6": 100},
  "T7_thunder_shield": {"otp0": "T7_thunder_shield", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T8_mythical_shield": {"otp0": "T8_mythical_shield", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T9_obsidian_shield": {"otp0": "T9_obsidian_shield", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T10_ragnarok_shield": {"otp0": "T10_ragnarok_shield", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  
  "T1_gloves": {"otp0": "T1_gloves", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 10, "otp6": 900},
  "T2_iron_gloves": {"otp0": "T2_iron_gloves", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 20, "otp6": 700},
  "T3_steel_gloves": {"otp0": "T3_steel_gloves", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 30, "otp6": 400},
  "T4_silver_gloves": {"otp0": "T4_silver_gloves", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 40, "otp6": 300},
  "T5_frost_gloves": {"otp0": "T5_frost_gloves", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 50, "otp6": 200},
  "T6_fire_gloves": {"otp0": "T6_fire_gloves", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 60, "otp6": 100},
  "T7_thunder_gloves": {"otp0": "T7_thunder_gloves", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T8_mythical_gloves": {"otp0": "T8_mythical_gloves", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T9_obsidian_gloves": {"otp0": "T9_obsidian_gloves", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T10_ragnarok_gloves": {"otp0": "T10_ragnarok_gloves", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  
  "T1_boots": {"otp0": "T1_boots", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 10, "otp6": 900},
  "T2_iron_boots": {"otp0": "T2_iron_boots", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 20, "otp6": 700},
  "T3_steel_boots": {"otp0": "T3_steel_boots", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 30, "otp6": 400},
  "T4_silver_boots": {"otp0": "T4_silver_boots", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 40, "otp6": 300},
  "T5_frost_boots": {"otp0": "T5_frost_boots", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 50, "otp6": 200},
  "T6_fire_boots": {"otp0": "T6_fire_boots", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 60, "otp6": 100},
  "T7_thunder_boots": {"otp0": "T7_thunder_boots", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T8_mythical_boots": {"otp0": "T8_mythical_boots", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T9_obsidian_boots": {"otp0": "T9_obsidian_boots", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T10_ragnarok_boots": {"otp0": "T10_ragnarok_boots", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  
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
  "T11_flame_axe": {"otp0": "T11_flame_axe", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T12_wind_axe": {"otp0": "T12_wind_axe", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T13_battle_axe": {"otp0": "T13_battle_axe", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T14_runes_axe": {"otp0": "T14_runes_axe", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T15_legendary_axe": {"otp0": "T15_legendary_axe", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  
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
  "T11_moonblade": {"otp0": "T11_moonblade", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T12_stormblade": {"otp0": "T12_stormblade", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T13_nightblade": {"otp0": "T13_nightblade", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T14_runesword": {"otp0": "T14_runesword", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T15_legendaryblade": {"otp0": "T15_legendaryblade", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  
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
  "T11_windstaff": {"otp0": "T11_windstaff", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T12_stormstaff": {"otp0": "T12_stormstaff", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T13_runesstaff": {"otp0": "T13_runesstaff", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T14_legendarystaff": {"otp0": "T14_legendarystaff", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T15_ultimaterstaff": {"otp0": "T15_ultimaterstaff", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  
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
  "T11_quickbow": {"otp0": "T11_quickbow", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T12_rune_bow": {"otp0": "T12_rune_bow", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T13_venombow": {"otp0": "T13_venombow", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T14_hawkbow": {"otp0": "T14_hawkbow", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},
  "T15_legendarybow": {"otp0": "T15_legendarybow", "otp1": 0, "otp2": 0, "otp3": 0, "otp4": 0, "otp5": 0, "otp6": 0},

  
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
      return `${critSymbol} ${targetEmojis}`;
    }).join(', ').padStart(35, ' ');  // Hiển thị tất cả các đòn tấn công

    
let checkhpp = `${'👦🏻'}   ${players[0].hp}-------|-------   ${'🐐'}   ${players[1].hp} -------  | -------  ${'🐣'}   ${players[2].hp} \n`;

    
    // Xây dựng báo cáo
    let report = checkhpp;
    report += `| ${name} | ${total}  ${now} |\n`;

    // Chỉ hiển thị thông tin của boss nếu target.boss === 1
    
      report += `| ${'🐉 Boss HP:'.padEnd(25, ' ')} | ${bossHP.toString().padStart(12, ' ')} | ${bossHPPercentage.toFixed(0)}% |`;
    
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
        text += `${monster.name} (Level ${monster.level})\n`;
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
    
    sendMessage(chatId, `Bạn đã chọn quái vật: ${selectedMonster.name} (Level ${selectedMonster.level})`);
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
}
 
  
  
  
  else if (data === 'cuong_hoa') {
    sendMessage(chatId, 'Bạn đã chọn cường hóa. Hãy chọn vật phẩm để cường hóa.');
    handleItemsForPlayer(chatId)
    sendMainMenu(chatId)
  }
// Xử lý lựa chọn item
else if (data.startsWith('item_')) {
  const itemName = data.substring(5);  // Lấy toàn bộ phần sau 'item_'

  // Trả về toàn bộ tên item (ví dụ: 'T1_spear')
  sendMessage(chatId, `Bạn đã chọn item: ${itemName}`);
}

  // Xử lý lựa chọn mua mặt hàng trong Shop
  else if (data.startsWith('buy_')) {
    const itemName = data.split('_')[1];
    const item = shopItems.find(item => item.name === itemName);
    sendMessage(chatId, `Bạn đã chọn mua ${item.name} với giá ${item.price} vàng.`);
    sendMainMenu(chatId)
  }
  
  
  else if (data === 'armor_stats' || data === 'shield_stats' || data === 'boots_stats' || data === 'weapon_stats') {
    trangbiForPlayer(chatId, data);  // Gọi hàm để hiển thị item dựa trên loại module được chọn
  }
 else if (data.startsWith('trangbi_')) {
    const itemName = data.substring(8);  // Lấy toàn bộ phần sau 'trangbi_'
  Menutrangbi(chatId)

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
  { level: 1, name: "Quái vật 1" },
  { level: 2, name: "Quái vật 2" },
  { level: 3, name: "Quái vật 3" },
  { level: 4, name: "Quái vật 4" },
  { level: 5, name: "Quái vật 5" },
  { level: 6, name: "Quái vật 6" },
  { level: 7, name: "Quái vật 7" },
  { level: 8, name: "Quái vật 8" },
  { level: 9, name: "Quái vật 9" },
  { level: 10, name: "Quái vật 10" },
];



// Danh sách mặt hàng trong shop
const shopItems = [
  { name: "Item 1", price: 100 },
  { name: "Item 2", price: 200 },
  { name: "Item 3", price: 300 },
  { name: "Item 4", price: 400 },
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
        { text: 'Cường hóa', callback_data: 'cuong_hoa' }
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
        { text: 'Weapon Stats', callback_data: 'weapon_stats' }
      ]
    ]
  };

  const text = 'Lựa chọn để thay đổi trang bị:';
  sendMessage(chatId, text, reply_markup);
}






// Giả sử data là thông tin người chơi và id người chơi cần tìm
function handleItemsForPlayer( playerId_bot) {
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
      filteredItems.push(item.otp0);  // Lấy giá trị otp0 (tên item)
    }
  });

  // Debug - kiểm tra danh sách item lọc được
  console.log(`Danh sách item lọc được: ${filteredItems.length}`);

  // Tạo danh sách các nút item để người dùng chọn
  const itemButtons = filteredItems.map(item => [
    { text: item, callback_data: `item_${item}` }  // Mã callback chứa tên item
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

  if (!player) {
    console.log("Không tìm thấy người chơi với id " + playerId_bot);
    return;
  }

  // Các danh sách item theo loại
  const categoryMap = {
    armor_stats: armorStats,
    shield_stats: shieldStats,
    boots_stats: bootsStats,
    weapon_stats: weaponStats
  };

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
      filteredItems.push(item.otp0);  // Lấy giá trị otp0 (tên item)
    }
  });

  // Debug - kiểm tra danh sách item lọc được
  console.log(`Danh sách item lọc được: ${filteredItems.length}`);

  // Tạo danh sách các nút item để người dùng chọn
  const itemButtons = filteredItems.map(item => [
    { text: item, callback_data: `trangbi_${item}` }  // Mã callback chứa tên item
  ]);

  const reply_markup = {
    inline_keyboard: itemButtons
  };

  // Gửi tin nhắn với danh sách item và các nút
  sendMessage(playerId_bot, `Danh sách item của bạn:`, reply_markup);
}


















































// Gọi hàm sendMainMenu khi người dùng đăng nhập
sendMainMenu(6708647498);  
Menutrangbi(6708647498)






