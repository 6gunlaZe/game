



if (boss.hp <= 0) {
  boss = {
    id: "boss002",        // Mã ID mới cho boss mới
    name: "New Boss",     // Tên boss mới
    hp: 20000,            // Máu của boss mới
    damage: 150,          // Sát thương của boss mới
    defense: 50,          // Phòng thủ của boss mới
    isAlive: true,        // Boss mới còn sống
    boss: 1,
  };
}







async function updateAllPlayersStats() {
  try {
    // Lấy thông tin người chơi từ server, đồng thời xử lý tất cả các request
    const playerStats = await Promise.all([
      getPlayerStat(12345).catch(error => { console.error('Lỗi khi lấy dữ liệu player 12345:', error); return null; }),
      getPlayerStat(67890).catch(error => { console.error('Lỗi khi lấy dữ liệu player 67890:', error); return null; }),
      getPlayerStat(11223).catch(error => { console.error('Lỗi khi lấy dữ liệu player 11223:', error); return null; })
    ]);

    // Kiểm tra dữ liệu trả về từ server
    if (playerStats.some(player => player === null)) {
      console.error("Lỗi khi lấy thông tin một số người chơi. Dừng quá trình.");
      return;
    }

    // Lọc ra tất cả các người chơi có kỹ năng với run === 1
    const playersToUpdate = playerStats.filter(player => 
      player.skills && Array.isArray(player.skills) && !player.skills.some(skill => skill.run === 1)
    );

    // Cập nhật trang bị cho các player không bị lọc
    for (let player of playersToUpdate) {
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

    // Cập nhật lại biến toàn cục players chỉ với các player.id trùng với playerStats
    for (let i = 0; i < playerStats.length; i++) {
      const updatedPlayer = playerStats[i];

      // Tìm player trong players có id trùng với updatedPlayer.id
      const playerIndex = players.findIndex(player => player.id === updatedPlayer.id);

      if (playerIndex !== -1) {
        // Cập nhật thông tin cho player có id trùng
        players[playerIndex] = updatedPlayer;
      }
    }

    console.log("Cập nhật chỉ số người chơi đã hoàn tất.");
  } catch (error) {
    console.error("Lỗi khi lấy thông tin người chơi từ server:", error);
  }
}

























function updateSkillsBasedOnInventory(player, token) {
  // 1: Kiểm tra kỹ năng trong inventory (otp6 === 9)
    // Sắp xếp kỹ năng theo mức độ ưu tiên (otp8) //số lượt hồi chiêu (cooldownTurns) otp7

  const skillItems = player.inventory.filter(item => item.otp6 === 9); // Lọc các kỹ năng từ inventory

  if (skillItems.length > 0) {
    skillItems.forEach(skill => {
      // Cập nhật thông tin kỹ năng vào "skills"
      const skillData = {
        skillName: skill.otp0,      // Tên kỹ năng
        skillPower: skill.otp1,     // Độ tăng của skill
        skillEffect: skill.otp2,    // Chỉ số tác động của skill (dame, def, crit,...)
        manaCost: skill.otp3,       // Mana tiêu tốn khi sử dụng skill
        attackCount: skill.otp4,    // Số đòn đánh có hiệu quả
        skillLevel: skill.otp5     // Cấp độ của skill
      };

      // Kiểm tra xem kỹ năng đã có trong player.skills chưa
      if (!player.skills) {
        player.skills = []; // Nếu chưa có, khởi tạo mảng kỹ năng
      }

      // Thêm hoặc cập nhật kỹ năng vào player.skills
      const existingSkillIndex = player.skills.findIndex(existingSkill => existingSkill.skillName === skillData.skillName);
      if (existingSkillIndex !== -1) {
        // Cập nhật kỹ năng nếu đã tồn tại
        player.skills[existingSkillIndex] = skillData;
      } else {
        // Thêm mới kỹ năng vào danh sách
        player.skills.push(skillData);
      }

      console.log(`Cập nhật kỹ năng ${skillData.skillName}:`, skillData);

      // Cập nhật dữ liệu lên GitHub //không cần cập nhật chỉ lưu cục bộ
    //  updatePlayerStat(player.id, { "skills": player.skills }, token);
    });
  } else {
    console.log("Không có kỹ năng trong inventory.");
  }
}




























// Hàm để cập nhật chỉ số của người chơi khi sử dụng kỹ năng
function updatePlayerStatsBasedOnSkills(player) {
  // Kiểm tra nếu player có kỹ năng
  if (!player.skills || player.skills.length === 0) {
    console.log("Không có kỹ năng nào.");
    return;
  }

  // Sắp xếp kỹ năng theo mức độ ưu tiên (otp8) //số lượt hồi chiêu (cooldownTurns) otp7
  player.skills.sort((a, b) => b.otp8 - a.otp8); // Sắp xếp giảm dần theo mức độ ưu tiên

  // Lặp qua tất cả các kỹ năng của người chơi
  player.skills.forEach(skill => {
    // Kiểm tra hồi chiêu (otp7) trước khi áp dụng kỹ năng
    if (skill.remainingTurns > 0 && skill.cooldownTurns <= 0) {
      // Tính toán các thay đổi dựa trên kỹ năng otp2
      switch(skill.skillEffect) {
        case 1: // Tăng dame
          player.dame += skill.skillPower * skill.skillLevel;
          break;
        case 2: // Tăng def
          player["def-dame"] += skill.skillPower * skill.skillLevel;
          break;
        case 3: // Tăng crit%
          player["crit-%"] += skill.skillPower * skill.skillLevel;
          break;
        case 4: // Tăng crit damage
          player["crit-x"] += skill.skillPower * skill.skillLevel;
          break;
        case 5: // Tăng mana
          player.mana += skill.skillPower * skill.skillLevel;
          break;
        // Thêm các hiệu ứng khác tùy thuộc vào yêu cầu của bạn
      }

      // Giảm mana khi sử dụng kỹ năng
      player.mana -= skill.manaCost;

      // In ra kết quả
      console.log(`Sau khi sử dụng ${skill.skillName}:`);
      console.log(`Dame: ${player.dame}, Def: ${player["def-dame"]}, Crit: ${player["crit-%"]}, Mana: ${player.mana}`);

      // Giảm số lượt của kỹ năng (remainingTurns)
      skill.remainingTurns -= 1;

      // Cập nhật số lượt hồi chiêu (cooldownTurns) sau khi sử dụng kỹ năng
      skill.cooldownTurns = skill.otp7;

      console.log(`Số lượt còn lại của ${skill.skillName}: ${skill.remainingTurns}`);
      console.log(`Số lượt hồi chiêu của ${skill.skillName}: ${skill.cooldownTurns}`);
    } else if (skill.cooldownTurns > 0) {
      // Giảm số lượt hồi chiêu nếu kỹ năng đang hồi chiêu
      skill.cooldownTurns -= 1;
      console.log(`Kỹ năng ${skill.skillName} đang hồi chiêu, còn lại ${skill.cooldownTurns} lượt`);
    }
  });
}

// Hàm để kiểm tra kỹ năng hết hiệu lực và xóa kỹ năng
function checkSkillExpirationAndRemove(player) {
  // Xóa các kỹ năng hết hiệu lực
  player.skills = player.skills.filter(skill => {
    if (skill.remainingTurns <= 0) {
      // Sau khi số lượt còn lại là 0, giảm các chỉ số đã được tăng lên
      switch(skill.skillEffect) {
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

      // In ra thông báo kỹ năng đã hết hiệu lực
      console.log(`${skill.skillName} đã hết hiệu lực!`);
      console.log(`Dame: ${player.dame}, Def: ${player["def-dame"]}, Crit: ${player["crit-%"]}, Mana: ${player.mana}`);

      // Trả về false để loại bỏ kỹ năng khỏi player.skills
      return false;
    }
    // Trả về true để giữ lại kỹ năng
    return true;
  });
}

// Giả sử player có một kỹ năng và chúng ta sử dụng kỹ năng đó
let player = {
  dame: 200,
  "def-dame": 50,
  "crit-%": 15,
  "crit-x": 2,
  mana: 100,
  skills: [
    {
      skillName: "skill_1",
      skillPower: 200,
      skillEffect: 1,  // Tăng dame
      manaCost: 30,
      attackCount: 3, // Tổng số đòn đánh có hiệu lực
      skillLevel: 1,
      remainingTurns: 3, // Đặt số lượt ban đầu
      otp7: 2, // Hồi chiêu sau 2 lượt đánh
      otp8: 5, // Mức độ ưu tiên của kỹ năng (ưu tiên cao)
      cooldownTurns: 0 // Số lượt hồi chiêu
    }
  ]
};

// Cập nhật chỉ số của player khi sử dụng skill
updatePlayerStatsBasedOnSkills(player);

// Kiểm tra và giảm các chỉ số sau mỗi lượt đánh, xóa kỹ năng nếu cần
setInterval(() => {
  // Giả sử mỗi lần gọi là một lượt đánh
  updatePlayerStatsBasedOnSkills(player);
  checkSkillExpirationAndRemove(player);
}, 1000); // Gọi mỗi giây hoặc sau mỗi lượt đánh, tùy thuộc vào logic game của bạn




















// Tính sát thương giữa người tấn công và người phòng thủ
async function calculateDamageByBot(players, attackerBotId, targetIndex) {
  // Tìm người tấn công dựa trên ID bot
  const attacker = players.find(player => player.id_bot === attackerBotId);
  if (!attacker) {
    console.log("Không tìm thấy người tấn công!");
    return;
  }

  // Lấy người bị tấn công (mục tiêu)
  const target = players[targetIndex];
  if (!target) {
    console.log("Không tìm thấy mục tiêu!");
    return;
  }

  // Lấy chỉ số cần thiết của người tấn công và phòng thủ
  const attackDamage = attacker.dame;
  const defenderDefDame = target['def-dame'];
  const critChance = attacker['crit-%'];  // Tỉ lệ chí mạng
  const critDamage = attacker['crit-x'];  // Hệ số chí mạng
  const damageReduction = target['PhanDame']; // Tỉ lệ giảm sát thương

  // Tính sát thương gốc trước khi áp dụng các yếu tố khác
  let baseDamage = attackDamage - defenderDefDame;  // Sát thương sau khi trừ phòng thủ
  baseDamage = baseDamage > 0 ? baseDamage : 0;  // Đảm bảo không có sát thương âm

  // Kiểm tra chí mạng (tính xác suất chí mạng)
  const isCrit = Math.random() < critChance / 100;
  if (isCrit) {
    baseDamage *= critDamage;  // Nếu là chí mạng, nhân với hệ số chí mạng
  }

  // Áp dụng giảm sát thương từ phản dame
  baseDamage *= (1 - damageReduction / 100);  // Giảm sát thương do phản dame

  // Cập nhật máu của người phòng thủ
  target.health -= baseDamage;

  // Đảm bảo máu không giảm dưới 0
  if (target.health < 0) target.health = 0;

  // Trả về kết quả
  return {
    attacker: attacker.name,
    defender: target.name,
    damage: baseDamage,
    defenderHealth: target.health,
    isCrit: isCrit,
  };
}



// Gọi hàm tính sát thương mà không gán vào biến
calculateDamageByBot(players, 6708647498, 1).then(result => {
  console.log(`Sát thương gây ra từ ${result.attacker} đến ${result.defender}: ${result.damage}`);
  console.log(`Máu còn lại của ${result.defender}: ${result.defenderHealth}`);
  if (result.isCrit) {
    console.log("Đây là một đòn chí mạng!");
  }
});













