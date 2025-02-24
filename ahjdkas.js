



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
    finalDamage -= target.defense;  // Phòng thủ của người chơi giảm sát thương người chơi gây ra
  }

  // Đảm bảo rằng sát thương không âm
  finalDamage = Math.max(0, finalDamage);

  return {
    damage: finalDamage,  // Sát thương tính ra sau khi giảm phòng thủ
    isCrit: isCrit       // Kiểm tra nếu là chí mạng
  };
}

// Cập nhật hàm `startBossFight` để chọn mục tiêu là người chơi hoặc boss
function startBossFight(targetPlayer = null) {
  // Kiểm tra nếu có mục tiêu, nếu không thì chọn boss làm mục tiêu mặc định
  let target = targetPlayer || boss;  // Mặc định chọn boss làm mục tiêu nếu không có player mục tiêu
  
  // Kiểm tra nếu target là người chơi, gán `isPlayer` là true, nếu là boss thì gán `isBoss` là true
  if (target && target.hp > 0) {
    target.isBoss = target.name && target.name.toLowerCase() === "big boss";  // Kiểm tra boss theo tên
    target.isPlayer = !target.isBoss;  // Nếu không phải boss, là người chơi
  }

  // Bắt đầu việc cập nhật báo cáo mỗi 5 giây (5000ms)
  reportInterval = setInterval(() => {
    if (target.hp <= 0) {  // Kiểm tra nếu mục tiêu (boss hoặc player) đã chết
      displayDamageReport();  // Gửi báo cáo ngay lập tức khi mục tiêu chết
      sendMessage(-4676989627, `${target.name} đã chết!`, { parse_mode: 'HTML' });
      clearInterval(reportInterval);  // Dừng báo cáo khi mục tiêu chết
    } else {
      displayDamageReport();  // Nếu mục tiêu còn sống, tiếp tục báo cáo
      sendFourButtons(-4676989627);
    }
  }, 5000);  // Mỗi 5 giây gọi báo cáo

  // Cập nhật các đòn tấn công của người chơi (theo tốc độ đánh)
  players.forEach(player => {
    const attackSpeed = player['attach-speed']; // Tốc độ đánh của người chơi
    const damage = calculatePlayerDamage(player, target); // Tính sát thương mỗi đòn đánh

    // Tấn công theo tốc độ đánh của người chơi
    setInterval(() => {
      recordPlayerAttack(player, target); // Ghi nhận sát thương khi tấn công
    }, attackSpeed * 1000);  // Tốc độ đánh tính theo giây
  });
}

// Cập nhật hàm `recordPlayerAttack` để sử dụng mục tiêu tùy chọn
function recordPlayerAttack(player, target) {
  const playerReport = playerDamageReport.find(r => r.id === player.id);

  // Tính sát thương của người chơi (đã bao gồm phòng thủ của mục tiêu)
  const { damage, isCrit } = calculatePlayerDamage(player, target);

  // Ghi nhận đòn đánh và tổng sát thương của người chơi
  playerReport.attacks.push({ damage, isCrit });
  playerReport.totalDamage += damage;

  // Trừ HP của mục tiêu với sát thương cuối cùng nếu mục tiêu còn sống
  if (target.hp > 0) {
    target.hp -= damage;
    console.log(`${target.name} bị tấn công! HP còn lại: ${target.hp}`);
  }
}

// Hàm khởi tạo dữ liệu người chơi và bắt đầu trận đấu
async function initGame() {
  try {
    // Lấy dữ liệu người chơi từ GitHub
    const player1 = await getPlayerStat(12345, token);
    const player2 = await getPlayerStat(67890, token);
    const player3 = await getPlayerStat(11223, token);

    players = [player1, player2, player3];  // Lưu mảng người chơi

    // Khởi tạo báo cáo sát thương
    playerDamageReport = players.map(player => ({
      id: player.id,
      attacks: [],
      totalDamage: 0
    }));

    startBossFight();  // Bắt đầu trận đấu với boss là mục tiêu mặc định
  } catch (error) {
    console.error(error);  // Nếu có lỗi khi lấy dữ liệu người chơi
  }
}

// Khởi động game
initGame();



Chọn mục tiêu:

Nếu bạn muốn chọn mục tiêu là một người chơi, bạn chỉ cần gọi hàm startBossFight và truyền vào một mục tiêu là người chơi đó.
Nếu không truyền gì, mục tiêu mặc định sẽ là boss.
Ví dụ gọi hàm với mục tiêu là người chơi:
javascript
Sao chép
startBossFight(players[1]);  // Chọn player thứ hai làm mục tiêu
Với cách này, bạn có thể linh hoạt chọn mục tiêu cho trận đấu và hiển thị các báo cáo sát thương chi tiết cho cả người chơi và boss.




















function updateSkillsBasedOnInventory(player, token) {
  // 1: Kiểm tra kỹ năng trong inventory (otp6 === 9)
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

      // Cập nhật dữ liệu lên GitHub
      updatePlayerStat(player.id, { "skills": player.skills }, token);
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

  // Sắp xếp kỹ năng theo mức độ ưu tiên (otp8)
  player.skills.sort((a, b) => b.otp8 - a.otp8); // Sắp xếp giảm dần theo mức độ ưu tiên

  // Lặp qua tất cả các kỹ năng của người chơi
  player.skills.forEach(skill => {
    // Kiểm tra hồi chiêu (otp7) trước khi áp dụng kỹ năng
    if (skill.remainingTurns > 0 && skill.cooldownTurns <= 0) {
      // Tính toán các thay đổi dựa trên kỹ năng
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













