/* 見本用パネル：どのページの見本か・色の出し方の切り替え・ページ移動 */
(function () {
  var me = document.currentScript;
  var page = (me && me.getAttribute('data-page')) || 'top';
  var PAGES = [
    ['top', 'トップ', '#FFA0A7'], ['gastro', '消化器内科・内視鏡', '#FFA0A7'], ['general', '総合内科', '#F8B62D'],
    ['ent', '耳鼻咽喉科', '#81B732'], ['mental', '心療内科・精神科', '#0A65AC'], ['derm', '美容皮膚科', '#4FBAC9'],
    ['checkups', '健康診断', '#F29C78'], ['fever', '発熱外来', '#E60012']
  ];
  function get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  var cur = PAGES.filter(function (p) { return p[0] === page; })[0] || PAGES[0];
  var box = document.createElement('div');
  box.id = 'jsample';
  box.setAttribute('role', 'region');
  box.setAttribute('aria-label', '配色見本の操作');
  box.innerHTML =
    '<div class="js-h"><div class="js-t"><span class="js-sw" style="background:' + cur[2] + '"></span>配色見本：2026年6月の色' +
    '<small>' + cur[1] + '（本番ではありません）</small></div>' +
    '<button type="button" class="js-x" aria-label="小さくする">×</button></div>' +
    '<div class="js-body">' +
    '<div class="js-seg" role="group" aria-label="色の出し方">' +
    '<button type="button" data-m="faithful">当時どおり</button><button type="button" data-m="readable">文字を読みやすく</button></div>' +
    '<label><span style="position:absolute;left:-9999px">ページ</span><select aria-label="ページを選ぶ">' +
    PAGES.map(function (p) { return '<option value="' + p[0] + '"' + (p[0] === page ? ' selected' : '') + '>' + p[1] + '</option>'; }).join('') +
    '</select></label>' +
    '<div class="js-f"><a href="../../">色見本の一覧へ</a><span>リンクは本番に移動します</span></div></div>';
  document.body.appendChild(box);

  function mode(m) {
    document.documentElement.classList.toggle('jr', m === 'readable');
    box.querySelectorAll('[data-m]').forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-m') === m ? 'true' : 'false'); });
    set('jSampleMode', m);
  }
  mode(get('jSampleMode') === 'readable' ? 'readable' : 'faithful');
  box.querySelectorAll('[data-m]').forEach(function (b) { b.addEventListener('click', function () { mode(b.getAttribute('data-m')); }); });
  box.querySelector('select').addEventListener('change', function (e) { location.href = '../' + e.target.value + '/'; });
  if (get('jSampleMin') === '1') box.classList.add('min');
  box.querySelector('.js-x').addEventListener('click', function (e) { e.stopPropagation(); box.classList.add('min'); set('jSampleMin', '1'); });
  box.addEventListener('click', function () { if (box.classList.contains('min')) { box.classList.remove('min'); set('jSampleMin', '0'); } });
})();
