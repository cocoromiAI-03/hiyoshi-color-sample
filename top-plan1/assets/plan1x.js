/* 案1 の調整版（決定版）の案内パネル v0.11.0
   ヘッダーは A「横のグラデーション」に決定したので、切り替えボタンは外した（v0.10.0 の切り替え版は color-sample-v0.10.0/ に凍結） */
(function () {
  function get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  var box = document.createElement('div');
  box.id = 'jsample';
  box.setAttribute('role', 'region');
  box.setAttribute('aria-label', '配色見本の案内');
  box.innerHTML =
    '<div class="js-h"><div class="js-t"><span class="js-sw" style="background:linear-gradient(90deg,#BD5170,#9B3B56)"></span>案1の調整版（決定）' +
    '<small>ヘッダー：横のグラデーション＋白い文字</small>' +
    '<small>最初の画面と写真の帯は案1、ほかは6月の色・見本です</small></div>' +
    '<button type="button" class="js-x" aria-label="小さくする">×</button></div>' +
    '<div class="js-body"><div class="js-bar" aria-hidden="true"></div>' +
    '<div class="js-f"><a href="../">説明へ</a><a href="../../top-plans/">前の3案</a></div></div>';
  document.body.appendChild(box);
  if (get('jP1Min') === '1') box.classList.add('min');
  box.querySelector('.js-x').addEventListener('click', function (e) { e.stopPropagation(); box.classList.add('min'); set('jP1Min', '1'); });
  box.addEventListener('click', function () { if (box.classList.contains('min')) { box.classList.remove('min'); set('jP1Min', '0'); } });
})();
