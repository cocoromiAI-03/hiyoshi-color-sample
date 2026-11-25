/* 見本用パネル：どのページの見本か・配色の切り替え・ページ移動
   v0.3.0: 「新しい配色案」を追加。URL の ?c=june / readable / new で直接開ける
   v0.4.0: 新しい案を「もとのピンクが主役＋ネイビーの差し色」に変更（各科は6月の色・発熱外来だけ落ち着いた赤）
   v0.5.0: トップだけ「ネイビー基調＋ピンクの差し色（ボタン・アイコン）」に差し替え
   v0.6.0: トップを②v0.3.0 の色に戻し、もとのピンクの細い線を差し色として追加
   v0.7.0: 細い線を戻し、「各科の色が映える案」（?c=new2）を追加。ボタンを2段に */
(function () {
  var me = document.currentScript;
  var page = (me && me.getAttribute('data-page')) || 'top';
  var PAGES = [
    ['top', 'トップ', '#FFA0A7', '#253F5C', 'linear-gradient(90deg,#1E3A66 0 50%,#F8B62D 50% 75%,#81B732 75%)'], ['gastro', '消化器内科・内視鏡', '#FFA0A7', '#FFA0A7', '#FFA0A7'],
    ['general', '総合内科', '#F8B62D', '#F8B62D', '#F8B62D'], ['ent', '耳鼻咽喉科', '#81B732', '#81B732', '#81B732'],
    ['mental', '心療内科・精神科', '#0A65AC', '#0A65AC', '#0A65AC'], ['derm', '美容皮膚科', '#4FBAC9', '#4FBAC9', '#4FBAC9'],
    ['checkups', '健康診断', '#F29C78', '#F29C78', '#F29C78'], ['fever', '発熱外来', '#E60012', '#BF3F48', '#BF3F48']
  ];
  var MODES = { faithful: 'june', readable: 'readable', b: 'new', b2: 'new2' };
  var TITLE = { faithful: '2026年6月の色', readable: '6月の色・文字を読みやすく', b: 'ネイビー案（②のトップ）', b2: '各科の色が映える案（トップを調整）' };
  function get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  var h = document.documentElement;
  var cur = PAGES.filter(function (p) { return p[0] === page; })[0] || PAGES[0];
  var box = document.createElement('div');
  box.id = 'jsample';
  box.setAttribute('role', 'region');
  box.setAttribute('aria-label', '配色見本の操作');
  box.innerHTML =
    '<div class="js-h"><div class="js-t"><span class="js-sw"></span><span class="js-ttl"></span>' +
    '<small>' + cur[1] + '（見本です。本番ではありません）</small></div>' +
    '<button type="button" class="js-x" aria-label="小さくする">×</button></div>' +
    '<div class="js-body">' +
    '<div class="js-seg" role="group" aria-label="配色">' +
    '<button type="button" data-m="faithful">6月の色</button><button type="button" data-m="readable">6月・読みやすく</button>' +
    '<button type="button" data-m="b">ネイビー案（②）</button><button type="button" data-m="b2">各科が映える案</button></div>' +
    '<label><span style="position:absolute;left:-9999px">ページ</span><select aria-label="ページを選ぶ">' +
    PAGES.map(function (p) { return '<option value="' + p[0] + '"' + (p[0] === page ? ' selected' : '') + '>' + p[1] + '</option>'; }).join('') +
    '</select></label>' +
    '<div class="js-f"><a class="js-home" href="../../">色見本の一覧へ</a><span>ほかのリンクは本番に移動します</span></div></div>';
  document.body.appendChild(box);

  function nowMode() { return h.classList.contains('jb2') ? 'b2' : h.classList.contains('jb') ? 'b' : (h.classList.contains('jr') ? 'readable' : 'faithful'); }
  // 見本どうしのリンクに今の配色を付けておく（ブラウザが記憶できない環境でも配色が引き継がれる）
  function tagLinks(m) {
    document.querySelectorAll('a[href]').forEach(function (a) {
      var href = a.getAttribute('href');
      var mm = href.match(/^\.\.\/(top|gastro|general|ent|mental|derm|checkups|fever)\/(\?c=\w+)?(#.*)?$/);
      if (mm) a.setAttribute('href', '../' + mm[1] + '/?c=' + MODES[m] + (mm[3] || ''));
    });
    var home = box.querySelector('.js-home');
    home.setAttribute('href', (m === 'b' || m === 'b2') ? '../../proposal/' : '../../');
    home.textContent = (m === 'b' || m === 'b2') ? '新しい配色案の説明へ' : '色見本の一覧へ';
  }
  function mode(m) {
    h.classList.toggle('jr', m === 'readable');
    h.classList.toggle('jb', m === 'b' || m === 'b2');
    h.classList.toggle('jb2', m === 'b2');
    box.querySelectorAll('[data-m]').forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-m') === m ? 'true' : 'false'); });
    box.querySelector('.js-ttl').textContent = TITLE[m];
    box.querySelector('.js-sw').style.background = m === 'b2' ? cur[4] : m === 'b' ? cur[3] : cur[2];
    set('jSampleMode', m);
    tagLinks(m);
    try { history.replaceState(null, '', location.pathname + '?c=' + MODES[m] + location.hash); } catch (e) {}
  }
  mode(nowMode());
  box.querySelectorAll('[data-m]').forEach(function (b) { b.addEventListener('click', function () { mode(b.getAttribute('data-m')); }); });
  box.querySelector('select').addEventListener('change', function (e) { location.href = '../' + e.target.value + '/?c=' + MODES[nowMode()]; });
  if (get('jSampleMin') === '1') box.classList.add('min');
  box.querySelector('.js-x').addEventListener('click', function (e) { e.stopPropagation(); box.classList.add('min'); set('jSampleMin', '1'); });
  box.addEventListener('click', function () { if (box.classList.contains('min')) { box.classList.remove('min'); set('jSampleMin', '0'); } });
})();
