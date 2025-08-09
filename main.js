const slider = document.querySelector("#events ul.move");
const items = slider.querySelectorAll("li");
const itemWidth = items[0].offsetWidth + 16; // li幅 + gap

// 複製して無限ループ用にする
slider.innerHTML += slider.innerHTML;

let scrollPosition = 0;

setInterval(() => {
    scrollPosition += itemWidth;
    slider.scrollTo({
        left: scrollPosition,
        behavior: "smooth"
    });

    if (scrollPosition >= itemWidth * items.length) {
        scrollPosition = 0;
        setTimeout(() => {
            slider.scrollTo({ left: 0, behavior: "auto" });
        }, 600); // smooth後に瞬時リセット
    }
}, 6000);


//
function updateDate() {
  const dateElement = document.getElementById("currentDate");
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  dateElement.textContent = `${year}.${month}.${day}`;
}

function checkOpenStatus() {
  const openImg = document.getElementById("OPENImg");
  const closeImg = document.getElementById("CLOSEImg");
  const now = new Date();

  const hour = now.getHours();
  const day = now.getDay(); // 0=日曜, 1=月曜, 2=火曜, 3=水曜, 4=木曜, 5=金曜, 6=土曜
  const date = now.getDate();

  let isClosed = false;

  // 時間判定（0:00-8:59, 20:01-23:59）
  if (hour < 9 || hour >= 20) {
    isClosed = true;
  }

  // 毎週火曜日はCLOSE
  if (day === 2) {
    isClosed = true;
  }

  // 金曜日の最終週判定
  if (day === 5) {
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    if (date > lastDay - 7) {
      isClosed = true;
    }
  }

  // 表示切り替え
  if (isClosed) {
    openImg.style.display = "none";
    closeImg.style.display = "inline";
  } else {
    openImg.style.display = "inline";
    closeImg.style.display = "none";
  }
}

// ✅ ページ読み込み時に実行
window.onload = function() {
  updateDate();
  checkOpenStatus();
  // ✅ 1分ごとに更新
  setInterval(() => {
    updateDate();
    checkOpenStatus();
  }, 60000);
};
