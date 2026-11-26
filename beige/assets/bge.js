/* ベージュで決めた見本：左下パネル（ページ移動だけ） v0.23.0
   パターンは <head> のスクリプトで fv2（ベージュ）に固定。切り替えボタンは無い
   ?shot=1 のときはパネルを出さない（説明ページの縮小画像を撮るため） */
(function () {
  if (/[?&]shot=1\b/.test(location.search)) return;
  var me = document.currentScript;
  var page = (me && me.getAttribute('data-page')) || 'top';
  var PAGES = [['top', 'トップ'], ['gastro', '消化器内科・内視鏡'], ['general', '総合内科'], ['ent', '耳鼻咽喉科'],
    ['mental', '心療内科・精神科'], ['derm', '美容皮膚科'], ['checkups', '健康診断'], ['fever', '発熱外来']];
  function get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

  var box = document.createElement('div');
  box.id = 'jsample';
  box.setAttribute('role', 'region');
  box.setAttribute('aria-label', '配色見本の案内');
  box.innerHTML =
    '<div class="js-h"><div class="js-t">ベージュで統一（トップは総合内科の色）' +
    '<small>最初の画面の背景は全科ベージュ・ヘッダーは6月の色のグラデーション（見本です。本番ではありません）</small></div>' +
    '<button type="button" class="js-x" aria-label="小さくする">×</button></div>' +
    '<div class="js-body">' +
    '<label><span style="position:absolute;left:-9999px">ページ</span><select aria-label="ページを選ぶ">' +
    PAGES.map(function (p) { return '<option value="' + p[0] + '"' + (p[0] === page ? ' selected' : '') + '>' + p[1] + '</option>'; }).join('') +
    '</select></label>' +
    '<div class="js-f"><a href="../">説明ページへ</a><span>ほかのリンクは本番に移動します</span></div></div>';
  document.body.appendChild(box);

  box.querySelector('select').addEventListener('change', function (e) { location.href = '../' + e.target.value + '/'; });

  if (get('jBgeMin') === '1') box.classList.add('min');
  box.querySelector('.js-x').addEventListener('click', function (e) { e.stopPropagation(); box.classList.add('min'); set('jBgeMin', '1'); });
  box.addEventListener('click', function () { if (box.classList.contains('min')) { box.classList.remove('min'); set('jBgeMin', '0'); } });
})();
