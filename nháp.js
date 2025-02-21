

// Lấy thông số người chơi
getPlayerStat(12345, token);

// Cập nhật thông số người chơi
const updatedStat = {
  dame: 150,
  exp: 2000,
};
updatePlayerStat(12345, updatedStat, token);







// Hàm lấy thông số người chơi từ GitHub thông qua GitHub API
function getPlayerStat(playerId, token) {
  const repoOwner = '6gunlaZe';  // Tên người sở hữu repo
  const repoName = 'game';  // Tên repository
  const filePath = 'playersData.json';  // Đường dẫn tới file JSON trong repo

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
      console.log('Thông số người chơi:', player);  // In thông số người chơi
    } else {
      console.log('Không tìm thấy người chơi với ID:', playerId);
    }
  })
  .catch(error => console.error('Lỗi khi lấy thông số người chơi:', error));
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
