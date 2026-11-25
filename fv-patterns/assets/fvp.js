/* 最初の画面の背景7パターンの見本：パネル（パターンの切り替え＋ページ移動） v0.15.0（v0.12.0 は5パターン、v0.13.0 で6・7を追加、v0.14.0 で6・7の濃さを変更、v0.15.0 で6をブルーグレー濃いめに）
   パターンは html の fv1〜fv7（と fvL＝明るい背景 1〜3・6 ／ fvD＝暗い背景 4・5・7）で切り替わる。<head> のスクリプトが ?p= か記憶（jFvPat）から最初の値を決める
   ?shot=1 のときはパネルを出さない（説明ページの縮小画像を撮るため） */
(function () {
  if (/[?&]shot=1\b/.test(location.search)) return;
  var me = document.currentScript;
  var page = (me && me.getAttribute('data-page')) || 'top';
  var PAGES = [['top', 'トップ'], ['gastro', '消化器内科・内視鏡'], ['general', '総合内科'], ['ent', '耳鼻咽喉科'],
    ['mental', '心療内科・精神科'], ['derm', '美容皮膚科'], ['checkups', '健康診断'], ['fever', '発熱外来']];
  var PATS = [
    ['1', 'ブルーグレー', '#F3F5F8', 'うすいブルーグレー（②の色）'],
    ['2', 'ベージュ', '#F6F2F0', 'ベージュ（案1の色）'],
    ['3', 'おまかせ', '#FFFFFF', 'おまかせ：白＋各科の濃い色の文字'],
    ['4', 'グレー', '#686D72', 'グレー＋写真の色味をおさえる'],
    ['5', 'ネイビー', '#253F5C', 'ネイビー（②の色）'],
    ['6', 'ブルーグレー濃いめ', '#BCC7D2', 'ブルーグレー濃いめ（①より濃く、グレー寄り）'],
    ['7', 'うすいネイビー', '#5C6F85', 'うすいネイビー（⑤のネイビーより少しうすく）']
  ];
  var h = document.documentElement;
  function get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function light(m) { return /^[1236]$/.test(m); }
  function cur() { for (var i = 1; i <= 7; i++) if (h.classList.contains('fv' + i)) return String(i); return '1'; }

  var box = document.createElement('div');
  box.id = 'jsample';
  box.setAttribute('role', 'region');
  box.setAttribute('aria-label', '配色見本の案内');
  box.innerHTML =
    '<div class="js-h"><div class="js-t">最初の画面の背景（7パターン）' +
    '<small>6月の色＋ヘッダーはグラデーション（見本です。本番ではありません）</small></div>' +
    '<button type="button" class="js-x" aria-label="小さくする">×</button></div>' +
    '<div class="js-body">' +
    '<div class="js-pat" role="group" aria-label="背景のパターン">' +
    PATS.map(function (p) {
      return '<button type="button" data-p="' + p[0] + '" title="' + p[3] + '"><i style="background:' + p[2] + '"></i>' + p[0] + ' ' + p[1] + '</button>';
    }).join('') + '</div>' +
    '<p class="js-name" aria-live="polite"></p>' +
    '<label><span style="position:absolute;left:-9999px">ページ</span><select aria-label="ページを選ぶ">' +
    PAGES.map(function (p) { return '<option value="' + p[0] + '"' + (p[0] === page ? ' selected' : '') + '>' + p[1] + '</option>'; }).join('') +
    '</select></label>' +
    '<div class="js-f"><a href="../">説明ページへ</a><span>ほかのリンクは本番に移動します</span></div></div>';
  document.body.appendChild(box);

  var btns = box.querySelectorAll('.js-pat button');
  function show() {
    var m = cur();
    for (var i = 0; i < btns.length; i++) btns[i].setAttribute('aria-pressed', btns[i].getAttribute('data-p') === m ? 'true' : 'false');
    box.querySelector('.js-name').textContent = m + '. ' + PATS[Number(m) - 1][3];
  }
  function apply(m) {
    for (var i = 1; i <= 7; i++) h.classList.remove('fv' + i);
    h.classList.remove('fvL', 'fvD');
    h.classList.add('fv' + m, light(m) ? 'fvL' : 'fvD');
    set('jFvPat', m);
    try { history.replaceState(null, '', location.pathname + '?p=' + m); } catch (e) {}
    show();
  }
  for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener('click', function (e) { e.stopPropagation(); apply(this.getAttribute('data-p')); });
  }
  box.querySelector('select').addEventListener('change', function (e) { location.href = '../' + e.target.value + '/?p=' + cur(); });
  show();

  if (get('jFvMin') === '1') box.classList.add('min');
  box.querySelector('.js-x').addEventListener('click', function (e) { e.stopPropagation(); box.classList.add('min'); set('jFvMin', '1'); });
  box.addEventListener('click', function () { if (box.classList.contains('min')) { box.classList.remove('min'); set('jFvMin', '0'); } });
})();
