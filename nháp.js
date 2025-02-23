

const playerId = 12345;

// Gọi hàm để lấy thông số người chơi
getPlayerStat(playerId, token)
  .then(player => {
  
    const playerDame = player.dame;  // Lấy giá trị dame
   game_log(`Dame của người chơi: ${playerDame}`);

    // Cập nhật thông số người chơi
    const updatedStat = {
      dame: 200,  // Cập nhật damage
      exp: 3000,  // Cập nhật điểm kinh nghiệm
    };
    updatePlayerStat(playerId, updatedStat, token);
  })
  .catch(error => {
    console.error(error);
  });









// Hàm lấy thông số người chơi từ GitHub thông qua GitHub API
function getPlayerStat(playerId, token) {
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
      // Dữ liệu sẽ được trả về dưới dạng Base64, cần giải mã
      const fileContent = atob(data.content); // Giải mã nội dung Base64
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

// Hàm cập nhật thông số người chơi trên GitHub thông qua GitHub API
function updatePlayerStat(playerId, updatedStat, token) {
  const repoOwner = '6gunlaZe';  // Tên người sở hữu repo
  const repoName = 'game';  // Tên repository
  const filePath = 'playersData.json';  // Đường dẫn tới file JSON trong repo

  // Sử dụng GitHub API để lấy dữ liệu hiện tại từ GitHub
  fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`, {
    method: 'GET',
    headers: {
      'Authorization': `token ${token}`,
      'Accept': 'application/vnd.github.v3+json',
    },
  })
  .then(response => response.json())
  .then(data => {
    // Dữ liệu sẽ được trả về dưới dạng Base64, cần giải mã
    const fileContent = atob(data.content); // Giải mã nội dung Base64
    const jsonData = JSON.parse(fileContent); // Chuyển đổi nội dung thành JSON

    // Tìm người chơi trong dữ liệu
    const player = jsonData.players.find(p => p.id === playerId);
    if (player) {
      // Cập nhật thông số trong player
      Object.assign(player, updatedStat);

      // Cập nhật lại dữ liệu
      const updatedData = JSON.stringify(jsonData, null, 2);

      // Cập nhật lại file JSON lên GitHub
      const commitMessage = `Cập nhật thông số người chơi với ID ${playerId}`;

      // Lấy SHA của file để thực hiện cập nhật
      getFileSHA(repoOwner, repoName, filePath, token).then(fileSha => {
        fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`, {
          method: 'PUT',
          headers: {
            'Authorization': `token ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: commitMessage,
            content: btoa(updatedData),  // Mã hóa lại dữ liệu thành Base64
            sha: fileSha,  // SHA của file hiện tại
          }),
        })
        .then(response => response.json())
        .then(data => {
          console.log('Dữ liệu đã được cập nhật:', data);
        })
        .catch(error => console.error('Lỗi khi cập nhật dữ liệu:', error));
      });
    } else {
      console.log('Không tìm thấy người chơi với ID:', playerId);
    }
  })
  .catch(error => console.error('Lỗi khi lấy dữ liệu hiện tại:', error));
}

// Hàm lấy SHA của file từ GitHub
function getFileSHA(repoOwner, repoName, filePath, token) {
  return fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`, {
    method: 'GET',
    headers: {
      'Authorization': `token ${token}`,
    },
  })
  .then(response => response.json())
  .then(data => data.sha)
  .catch(error => console.error('Lỗi khi lấy SHA của file:', error));
}

// Cách sử dụng










































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

  sendMessage(chatId, text, reply_markup); // Gửi tin nhắn với inline keyboard
}

// Hàm gửi tin nhắn phản hồi (reply)
function sendMessage(chatId, text, reply_markup = {}) {
  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
  const payload = {
    chat_id: chatId,
    text: text,
    reply_markup: reply_markup // Đảm bảo không gửi null
  };

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
  sendMessage(6708647498, 'Bot is now starting...!');
	sendSyntaxExamples(6708647498);
  getUpdates(); // Gọi hàm getUpdates lần đầu tiên
}, 2000);






function sendPlayerStatsToTelegram(playerId, chatId, token) {
  getPlayerStat(playerId, token)  // Lấy thông tin nhân vật từ GitHub
    .then(player => {
	  
	        let weaponDame = calculateWeaponDamage(player) - player.dame; // Gọi hàm để tính dame của vũ khí

      // Chuẩn bị thông tin nhân vật
      const playerStats = `
🧑‍💻 **Thông tin nhân vật**:
- 🆔 **ID**: ${player.id}
- ⚔️ **Dame**:  ${player.dame} + ${weaponDame}
- 🌟 **exp**: ${player.exp}
- 🏆 **Level**: ${player.level}
- ❤️ **Health**: ${player.health}
- 🔋 **Mana**: ${player.mana}
- 🛡️ : ${player['def-dame']} (Giảm sát thương nhận vào)
- 🎽 : ${player['def-skill']} (Giảm hiệu quả kỹ năng đối phương)
- 🎯 : ${player['NeTranh']} (Tỉ lệ né tránh)
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



🧳 **Inventory**: ${player.inventory.join(', ')}
      `;
      
      // Gửi thông tin qua Telegram
      sendMessage(chatId, playerStats);  // Gửi tin nhắn đến chatId (ID người dùng hoặc ID kênh)
    })
    .catch(error => {
      console.error(error);
      sendMessage(chatId, 'Lỗi khi lấy thông tin nhân vật!');
    });
}







sendPlayerStatsToTelegram(12345, 6708647498, token);



















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
    return 0;  // Trả về 0 nếu không có vũ khí hợp lệ
  }
}







function calculateHP(player) {
  // Lấy giá trị otp0 của vũ khí
  let dame0 = player.health;	
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
    return 0;  // Trả về 0 nếu không có vũ khí hợp lệ
  }
}

function calculateDEF(player) {
  // Lấy giá trị otp0 của vũ khí
  let dame0 = player.health;	
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
    return 0;  // Trả về 0 nếu không có vũ khí hợp lệ
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







