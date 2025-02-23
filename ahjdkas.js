










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
































