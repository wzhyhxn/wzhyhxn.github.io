/* source/js/diet.js */

// 1. 定义弹窗结构：【改动】删除了关闭按钮 div
const modalTemplate = `
<div id="diet-modal-overlay">
  <div id="diet-modal-content">
    <div class="modal-img-side" id="modal-img-container">
      <img id="modal-img-entity" src="" alt="大图详情">
    </div>
  </div>
</div>
`;

// 2. 初始化逻辑
function initDietPage() {
  const container = document.getElementById('diet-container');
  if (!container) return; 

  // 注入弹窗骨架
  if (!document.getElementById('diet-modal-overlay')) {
    document.body.insertAdjacentHTML('beforeend', modalTemplate);
  }

  // 渲染列表
  if (typeof dietData === 'undefined' || !Array.isArray(dietData)) {
    container.innerHTML = '<div style="text-align:center;">暂无数据</div>';
    return;
  }

  let html = '';
  dietData.forEach((item, index) => {
    // 列表旋转样式
    const listStyle = item.rotateList ? `style="transform: rotate(${item.rotateList}deg);"` : '';

    html += `
      <div class="diet-card" data-index="${index}">
        <div class="diet-img-box">
          <img src="${item.image}" loading="lazy" ${listStyle}>
          <div class="diet-date">${item.date}</div>
        </div>
        <div class="diet-content">
          <div class="diet-title">${item.title}</div>
          <div class="diet-desc">${item.desc}</div>
          <div class="diet-rating">${item.star}</div>
        </div>
      </div>
    `;
  });
  container.innerHTML = html;

  // 绑定列表点击事件
  const cards = document.querySelectorAll('.diet-card .diet-img-box');
  cards.forEach(box => {
    box.addEventListener('click', function(e) {
      const parentCard = this.closest('.diet-card');
      const index = parentCard.getAttribute('data-index');
      openDietModal(index);
    });
  });

  // 【改动】绑定关闭事件：点击模糊区域即可返回
  const overlay = document.getElementById('diet-modal-overlay');
  if (overlay) {
      overlay.addEventListener('click', function(e) {
          // 逻辑：只要点击的 id 不是那个大图本身(modal-img-entity)，就说明点的是背景，执行关闭
          if (e.target.id !== 'modal-img-entity') {
              closeDietModal();
          }
      });
  }
}

// 3. 打开弹窗
function openDietModal(index) {
  const item = dietData[index];
  const overlay = document.getElementById('diet-modal-overlay');
  const imgContainer = document.getElementById('modal-img-container');
  const modalImg = document.getElementById('modal-img-entity');
  
  if (!item || !overlay || !modalImg) return;

  // 填充图片
  modalImg.src = item.image;
  
  // 弹窗旋转逻辑
  if (item.rotateModal) {
      modalImg.style.transform = `rotate(${item.rotateModal}deg)`;
  } else {
      modalImg.style.transform = ''; 
  }

  // 设置模糊背景
  if (imgContainer) {
    imgContainer.style.setProperty('--bg-image-url', `url('${item.image}')`);
  }

  // 显示
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// 4. 关闭弹窗
function closeDietModal() {
  const overlay = document.getElementById('diet-modal-overlay');
  const imgContainer = document.getElementById('modal-img-container');
  const modalImg = document.getElementById('modal-img-entity');
  
  if (overlay) {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
    
    setTimeout(() => {
       if(modalImg) {
         modalImg.src = '';
         modalImg.style.transform = ''; 
       }
       if(imgContainer) imgContainer.style.removeProperty('--bg-image-url');
    }, 300);
  }
}

document.addEventListener("DOMContentLoaded", initDietPage);
document.addEventListener("pjax:complete", initDietPage);