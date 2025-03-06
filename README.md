  // Kiểm tra xem damevk có tồn tại (tức là otp0 có trong weaponStats)
    // Nếu tồn tại, tính tổng dame từ dame cơ bản và các giá trị otp1, otp2, otp3, otp4
otp5 = cấp cường hóa = xdame theo 1 file


///////////////////////////////////////trang bị otp6: xác định loại trang bị (1->5)
  // 1: vũ khí (vu-khi) +dame
  // 2: áo (ao) +hp
  // 3: giáp (giap) +DEFskill
  // 4: tay (tay) +def
  // 5: giày (chan) + def

  9 = sách skill
  8 = ngọc (opt9 là xếp chồng)
  7 = item khác (ví dụ gem, vv)
          
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
// chồng lấp để tăng level item (otp9)
