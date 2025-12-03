/**
 * 文件名: source/js/admire.js
 * 用途: 处理 "我所敬佩的人" 卡片的点击展开逻辑
 */

function toggleAdmireDetails(cardElement) {
  // 找到当前卡片对应的详情区域
  // 假设详情区域紧跟在卡片 div 后面
  const details = cardElement.nextElementSibling;
  
  if (!details || !details.classList.contains('admire-details')) {
    console.warn('未找到对应的详情区域');
    return;
  }

  // 切换卡片本身的激活状态（用于箭头旋转）
  cardElement.classList.toggle('active');
  
  // 切换详情区域的展开状态
  if (details.classList.contains('open')) {
    details.classList.remove('open');
  } else {
    details.classList.add('open');
  }
}