/* 案1 の調整版：パネルでヘッダーの濃淡（a 横グラデーション／b 電車の帯風／c 縦グラデーション）を切り替える v0.10.0
   URL の ?h=a|b|c で直接開ける（記憶は jP1Head）。各科のリンクは 6月の色の見本へ */
(function () {
  var HS = [
    ['a', '横グラデ', 'linear-gradient(90deg,#BD5170,#AE4664 55%,#9B3B56)'],
    ['b', '電車の帯風', 'linear-gradient(to top,#FFA0A7 0 3px,#AA415E 3px)'],
    ['c', '縦グラデ', 'linear-gradient(180deg,#BD5170,#9E3C58)']
  ];
  var TITLE = { a: 'ヘッダー：横のグラデーション', b: 'ヘッダー：電車の帯風（2色）', c: 'ヘッダー：縦のグラデーション' };
  function get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  var h = document.documentElement;
  var box = document.createElement('div');
  box.id = 'jsample';
  box.setAttribute('role', 'region');
  box.setAttribute('aria-label', 'ヘッダーの濃淡の切り替え');
  box.innerHTML =
    '<div class="js-h"><div class="js-t"><span class="js-sw"></span>案1の調整版<small class="js-ttl"></small>' +
    '<small>最初の画面と写真の帯は案1、ほかは6月の色・見本です</small></div>' +
    '<button type="button" class="js-x" aria-label="小さくする">×</button></div>' +
    '<div class="js-body"><div class="js-seg" role="group" aria-label="ヘッダーの濃淡">' +
    HS.map(function (x) { return '<button type="button" data-h="' + x[0] + '"><span class="sw2" style="background:' + x[2] + '"></span>' + x[1] + '</button>'; }).join('') +
    '</div><div class="js-f"><a href="../">説明へ</a><a href="../../top-plans/">前の3案</a></div></div>';
  document.body.appendChild(box);
  function now() { return h.classList.contains('hb') ? 'b' : h.classList.contains('hc') ? 'c' : 'a'; }
  function pick(m) {
    h.classList.remove('ha', 'hb', 'hc');
    h.classList.add('p1x', 'h' + m);
    box.querySelectorAll('[data-h]').forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-h') === m ? 'true' : 'false'); });
    box.querySelector('.js-ttl').textContent = TITLE[m];
    box.querySelector('.js-sw').style.background = HS.filter(function (x) { return x[0] === m; })[0][2];
    set('jP1Head', m);
    try { history.replaceState(null, '', location.pathname + '?h=' + m + location.hash); } catch (e) {}
  }
  pick(now());
  box.querySelectorAll('[data-h]').forEach(function (b) { b.addEventListener('click', function () { pick(b.getAttribute('data-h')); }); });
  if (get('jP1HeadMin') === '1') box.classList.add('min');
  box.querySelector('.js-x').addEventListener('click', function (e) { e.stopPropagation(); box.classList.add('min'); set('jP1HeadMin', '1'); });
  box.addEventListener('click', function () { if (box.classList.contains('min')) { box.classList.remove('min'); set('jP1HeadMin', '0'); } });
})();
