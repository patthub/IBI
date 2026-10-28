// Checks that every lesson, chat and quiz in the course is well formed. Run: node test.js
const assert = require('assert');
const { COURSE } = require('./content.js');

const ids = new Set();
for (const m of COURSE) for (const L of m.lessons) {
  assert(!ids.has(L.id), `duplicate lesson id ${L.id}`); ids.add(L.id);
  for (const b of L.blocks) {
    assert(b.t, `${L.id}: block without type`);
    if (b.t === 'chat') {
      assert(b.turns.length && b.turns[0][0] === 'ty', `${L.id}: chat must start with a prompt`);
      b.turns.forEach(([who, text], i) => {
        assert(['ty', 'model', 'model!'].includes(who), `${L.id}: unknown speaker ${who}`);
        assert((who === 'ty') === (i % 2 === 0), `${L.id}: prompt and answer must alternate`);
        assert(text.trim(), `${L.id}: empty turn`);
      });
      assert(b.how, `${L.id}: chat without comment`);
    }
    if (b.t === 'quiz') assert(b.answer >= 0 && b.answer < b.options.length, `${L.id}: quiz answer out of range: ${b.q}`);
  }
}
console.log('all good');
