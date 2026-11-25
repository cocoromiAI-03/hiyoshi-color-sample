/* トップの配色案の見本：パネルで 案1／案2／案3／6月の色（もと）を切り替える v0.9.0
   URL の ?p=1|2|3|june で直接開ける（記憶は jTopPlan）。各科のリンクは 6月の色の見本へ */
(function () {
  var PLANS = [
    ['1', '案1 ピンク×墨', 'linear-gradient(90deg,#FFA0A7 0 55%,#34302F 55%)'],
    ['2', '案2 白×グラファイト', 'linear-gradient(90deg,#fff 0 40%,#2B3036 40% 70%,#F8B62D 70% 80%,#81B732 80% 90%,#FFA0A7 90%)'],
    ['3', '案3 ネイビー×えんじ', 'linear-gradient(90deg,#1E3A66 0 70%,#A94A5C 70%)'],
    ['june', '6月の色（もと）', '#FFA0A7']
  ];
  var TITLE = { '1': '案1　ピンク × 墨（すみ）', '2': '案2　白 × グラファイト ＋ 各科の色', '3': '案3　ネイビー × えんじ', june: '6月の色（もと・比べる用）' };
  function get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  var h = document.documentElement;
  var box = document.createElement('div');
  box.id = 'jsample';
  box.setAttribute('role', 'region');
  box.setAttribute('aria-label', '配色案の切り替え');
  box.innerHTML =
    '<div class="js-h"><div class="js-t"><span class="js-sw"></span><span class="js-ttl"></span>' +
    '<small>トップの配色案（各科は6月の色）・見本です</small></div>' +
    '<button type="button" class="js-x" aria-label="小さくする">×</button></div>' +
    '<div class="js-body"><div class="js-seg" role="group" aria-label="配色案">' +
    PLANS.map(function (p) { return '<button type="button" data-p="' + p[0] + '"><span class="sw2" style="background:' + p[2] + ';box-shadow:inset 0 0 0 1px rgba(255,255,255,.35)"></span>' + p[1] + '</button>'; }).join('') +
    '</div><div class="js-f"><a href="../">配色案の説明へ</a><span>各科のリンクは6月の色の見本へ</span></div></div>';
  document.body.appendChild(box);
  function now() { return h.classList.contains('tp1') ? '1' : h.classList.contains('tp2') ? '2' : h.classList.contains('tp3') ? '3' : 'june'; }
  function plan(p) {
    h.classList.remove('tp', 'tp1', 'tp2', 'tp3');
    if (p !== 'june') h.classList.add('tp', 'tp' + p);
    box.querySelectorAll('[data-p]').forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-p') === p ? 'true' : 'false'); });
    box.querySelector('.js-ttl').textContent = TITLE[p];
    box.querySelector('.js-sw').style.background = PLANS.filter(function (x) { return x[0] === p; })[0][2];
    set('jTopPlan', p);
    try { history.replaceState(null, '', location.pathname + '?p=' + p + location.hash); } catch (e) {}
  }
  plan(now());
  box.querySelectorAll('[data-p]').forEach(function (b) { b.addEventListener('click', function () { plan(b.getAttribute('data-p')); }); });
  if (get('jTopPlanMin') === '1') box.classList.add('min');
  box.querySelector('.js-x').addEventListener('click', function (e) { e.stopPropagation(); box.classList.add('min'); set('jTopPlanMin', '1'); });
  box.addEventListener('click', function () { if (box.classList.contains('min')) { box.classList.remove('min'); set('jTopPlanMin', '0'); } });
})();
