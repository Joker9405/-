const FIELD_MAP = {
  zhh: 'zhh',
  chs: 'chs',
  en: 'en',
  aliases: 'aliases',
  variants_chs: 'variants_chs',
  variants_en: 'variants_en',
  notes: 'notes',
  examples: 'examples'
};

const DATA_PATHS = [
  '../data/lexeme.csv',
  '../data/seed.csv'
];

const $q = document.getElementById('q');
const $btn = document.getElementById('btnSearch');
const $results = document.getElementById('results');

let DB = [];

function csvParse(csvText) {
  // lightweight CSV parser: handles commas by simple split; keep template simple.
  const lines = csvText.split(/\r?\n/).filter(x => x.trim().length);
  const header = lines.shift().split(',').map(h => h.trim());
  return lines.map(line => {
    const cols = line.split(','); // simple
    const obj = {};
    header.forEach((h, i) => obj[h] = (cols[i] || '').trim());
    return obj;
  });
}

async function loadData() {
  for (const p of DATA_PATHS) {
    try {
      const res = await fetch(p + '?t=' + Date.now());
      if (!res.ok) continue;
      const txt = await res.text();
      const rows = csvParse(txt);
      if (rows && rows.length) {
        return rows;
      }
    } catch(e) { /* try next */ }
  }
  return [];
}

function norm(s) {
  return (s || '').toLowerCase().trim().replace(/\s+/g, '');
}

function includesAny(hay, needles) {
  hay = norm(hay);
  return needles.some(n => hay.includes(norm(n)));
}

// Very small Levenshtein distance for fuzzy (distance<=2)
function lev(a, b) {
  a = norm(a); b = norm(b);
  const m = Array.from({length: a.length + 1}, (_, i) => [i]);
  for (let j = 0; j <= b.length; j++) m[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i-1] === b[j-1] ? 0 : 1;
      m[i][j] = Math.min(m[i-1][j] + 1, m[i][j-1] + 1, m[i-1][j-1] + cost);
    }
  }
  return m[a.length][b.length];
}

function matchQuery(row, q) {
  const fields = [FIELD_MAP.zhh, FIELD_MAP.chs, FIELD_MAP.en, FIELD_MAP.aliases];
  const needles = [q];
  // hard includes
  if (fields.some(f => includesAny(row[f], needles))) return 3;
  // alias split
  const al = (row[FIELD_MAP.aliases]||'').split('|').map(x=>x.trim()).filter(Boolean);
  if (al.some(a => includesAny(a, needles))) return 2;
  // fuzzy: any field within distance <= 2
  const all = fields.map(f => row[f]||'').join(' ');
  if (lev(all, q) <= 2) return 1;
  return 0;
}

function speakHK(text) {
  // Web Speech API; browser dependent
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = 'zh-HK';
  speechSynthesis.speak(utter);
}

function render(results) {
  if (!results.length) {
    $results.className = 'results empty';
    $results.innerHTML = '<div class="placeholder">没有找到结果，换个说法再试试。</div>';
    return;
  }
  $results.className = 'results';
  const r = results[0]; // best match
  const aliases = (r[FIELD_MAP.aliases]||'').split('|').filter(Boolean);
  const variantsChs = (r[FIELD_MAP.variants_chs]||'').split('|').filter(Boolean);
  const variantsEn = (r[FIELD_MAP.variants_en]||'').split('|').filter(Boolean);
  const examples = (r[FIELD_MAP.examples]||'').split('||').filter(Boolean);

  $results.innerHTML = `
    <div class="result-grid">
      <div class="card">
        <h3>${r[FIELD_MAP.zhh] || '(未填写粤语正字)'}</h3>
        <div class="row">
          <button class="speaker" data-say="${r[FIELD_MAP.zhh] || ''}">🔊 读粤语</button>
          ${aliases.map(a=>`<span class="badge alias">${a}</span>`).join('')}
        </div>
        <div class="kv"><span class="k">中文：</span>${r[FIELD_MAP.chs] || '-'}</div>
        <div class="kv"><span class="k">English：</span>${r[FIELD_MAP.en] || '-'}</div>
        <div class="kv"><span class="k">备注：</span>${r[FIELD_MAP.notes] || '-'}</div>
        <div class="btn-example" id="btnEx">example 扩展</div>
        <div class="examples" id="exList">
          ${examples.map(e=>`<div>· ${e}</div>`).join('') || '<div>暂无示例</div>'}
        </div>
      </div>
      <div class="card">
        <h3>变体 Variants</h3>
        <div class="row">
          ${variantsChs.map(v=>`<span class="badge variant">${v}</span>`).join('')}
          ${variantsEn.map(v=>`<span class="badge variant">${v}</span>`).join('')}
        </div>
        <div class="kv" style="margin-top:10px;"><span class="k">全部匹配数：</span>${results.length}</div>
      </div>
    </div>
  `;

  document.querySelectorAll('.speaker').forEach(btn => {
    btn.addEventListener('click', () => speakHK(btn.dataset.say || ''));
  });
  document.getElementById('btnEx').addEventListener('click', () => {
    const ex = document.getElementById('exList');
    ex.style.display = ex.style.display === 'block' ? 'none' : 'block';
  });
}

function search() {
  const q = $q.value.trim();
  if (!q) return;
  // score & sort desc
  const ranked = DB.map(row => ({row, score: matchQuery(row, q)}))
                   .filter(x => x.score > 0)
                   .sort((a,b)=>b.score-a.score)
                   .map(x => x.row);
  render(ranked);
}

$q.addEventListener('keydown', e => { if (e.key === 'Enter') search(); });
$btn.addEventListener('click', search);

(async function init() {
  DB = await loadData();
  // console.log('Loaded rows:', DB.length);
})();