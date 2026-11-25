/* 2026-06-23〜29 の色の見本：パネルは「どのページか」とページ移動だけ（配色の切り替えなし） v0.8.0 */
(function () {
  var me = document.currentScript;
  var page = (me && me.getAttribute('data-page')) || 'top';
  var PAGES = [['top', 'トップ', '#FFA0A7'], ['gastro', '消化器内科・内視鏡', '#FFA0A7'], ['general', '総合内科', '#F8B62D'], ['ent', '耳鼻咽喉科', '#81B732'], ['mental', '心療内科・精神科', '#0A65AC'], ['derm', '美容皮膚科', '#4FBAC9'], ['checkups', '健康診断', '#F29C78'], ['fever', '発熱外来', '#E60012']];
  function get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  var cur = PAGES.filter(function (p) { return p[0] === page; })[0] || PAGES[0];
  var box = document.createElement('div');
  box.id = 'jsample';
  box.setAttribute('role', 'region');
  box.setAttribute('aria-label', '配色見本の案内');
  box.innerHTML =
    '<div class="js-h"><div class="js-t"><span class="js-sw" style="background:' + cur[2] + '"></span>2026年6月23〜29日の色' +
    '<small>' + cur[1] + '（見本です。本番ではありません）</small></div>' +
    '<button type="button" class="js-x" aria-label="小さくする">×</button></div>' +
    '<div class="js-body">' +
    '<label><span style="position:absolute;left:-9999px">ページ</span><select aria-label="ページを選ぶ" style="margin-top:8px">' +
    PAGES.map(function (p) { return '<option value="' + p[0] + '"' + (p[0] === page ? ' selected' : '') + '>' + p[1] + '</option>'; }).join('') +
    '</select></label>' +
    '<div class="js-f"><a href="../">一覧へ</a><span>ほかのリンクは本番に移動します</span></div></div>';
  document.body.appendChild(box);
  box.querySelector('select').addEventListener('change', function (e) { location.href = '../' + e.target.value + '/'; });
  if (get('jJuneMin') === '1') box.classList.add('min');
  box.querySelector('.js-x').addEventListener('click', function (e) { e.stopPropagation(); box.classList.add('min'); set('jJuneMin', '1'); });
  box.addEventListener('click', function () { if (box.classList.contains('min')) { box.classList.remove('min'); set('jJuneMin', '0'); } });
})();
