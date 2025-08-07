// index.js
const maxPerGroup = 100;             // 每組最多顯示次數
const storageKey  = 'surveyCounts';  // localStorage 的儲存鍵

// 讀取已儲存的計數，若不存在則初始化為0
let counts = JSON.parse(localStorage.getItem(storageKey) || '[]');
if (counts.length === 0) counts = new Array(urls.length).fill(0);

function pickUrl() {
  // 找出尚未達到上限的組別索引
  const candidates = [];
  for (let i = 0; i < counts.length; i++) {
    if (counts[i] < maxPerGroup) candidates.push(i);
  }

  // 若全部組別都已達到上限，可設定跳轉到結束頁面或其他預設連結
  if (candidates.length === 0) {
    return 'https://your-domain.com/finish.html';
  }

  // 從候選組別隨機挑選一個
  const index = candidates[Math.floor(Math.random() * candidates.length)];
  counts[index] += 1;                            // 更新計數
  localStorage.setItem(storageKey, JSON.stringify(counts));  // 寫回 storage
  return urls[index];
}

// 將瀏覽器導向挑選出來的問卷連結
window.location.href = pickUrl();
