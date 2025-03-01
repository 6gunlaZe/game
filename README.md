///////////////////////////////////////trang bị otp6: xác định loại trang bị (1->5)
  // 1: vũ khí (vu-khi)
  // 2: áo (ao)
  // 3: giáp (giap)
  // 4: tay (tay)
  // 5: giày (chan)
          
////////////////////////     Kiểm tra kỹ năng trong inventory (otp6 === 9) skill
        skillName: skill.otp0,      // Tên kỹ năng
        skillPower: skill.otp1,     // Độ tăng của skill
        skillEffect: skill.otp2,    // Chỉ số tác động của skill (dame, def, crit,...)
        manaCost: skill.otp3,       // Mana tiêu tốn khi sử dụng skill
        attackCount: skill.otp4,    // Số đòn đánh có hiệu quả
        skillLevel: skill.otp5     // Cấp độ của skill

//////////////////////////////// Tính toán các thay đổi dựa trên kỹ năng otp2
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
  
 //số lượt hồi chiêu (cooldownTurns) otp7
 // Sắp xếp kỹ năng theo mức độ ưu tiên (otp8)
