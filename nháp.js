

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







// Hàm cộng thêm giá trị vào các thông số người chơi
function addToPlayerStats({ playerId, ...statsToAdd }) {
  // Lấy thông số người chơi từ API
  getPlayerStat(playerId, token)
    .then(player => {
      let updatedStat = player.stats || {};  // Lấy thông số người chơi ban đầu (nếu có)

      // Cộng thêm giá trị vào các thông số người chơi
      Object.keys(statsToAdd).forEach(key => {
        updatedStat[key] = updatedStat[key] ? updatedStat[key] + statsToAdd[key] : statsToAdd[key];
      });

      // Cập nhật lại thông số người chơi qua API
      updatePlayerStat(playerId, updatedStat, token)
        .then(() => {
          console.log('Thông số người chơi đã được cập nhật lên server');
          game_log(`Thông số người chơi đã được cập nhật: ${JSON.stringify(updatedStat)}`);
        })
        .catch(error => console.error('Lỗi khi cập nhật thông số người chơi:', error));
    })
    .catch(error => console.error('Lỗi khi lấy thông số người chơi:', error));
}

// Ví dụ sử dụng hàm addToPlayerStats để cộng thêm giá trị
const statsToAdd = {
  playerId: 12345,   // playerId cần được truyền vào
  attack: 50,        // Cộng thêm 50 vào attack
  dame: 100,         // Cộng thêm 100 vào dame
  exp: 500           // Cộng thêm 500 vào exp
};

addToPlayerStats(statsToAdd);
























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
