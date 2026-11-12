/** Pure, provider-independent kitchen calculations. No household data or credentials. */
export function servings(value) {
  const n = Number(value);
  if (!Number.isInteger(n) || n < 1 || n > 30) throw new RangeError('Välj 1–30 personer.');
  return n;
}
const units = {g:['g',1],kg:['g',1000],ml:['ml',1],cl:['ml',10],dl:['ml',100],l:['ml',1000],msk:['ml',15],tsk:['ml',5],oz:['ml',29.5735295625],st:['st',1]};
const round = n => Math.round((n + Number.EPSILON) * 1e6) / 1e6;
export function scale(recipe, value) {
  const n = servings(value);
  if (!Number.isFinite(recipe.base) || recipe.base <= 0) throw new Error('Receptets grundportioner saknas.');
  return recipe.ingredients.map(([id, quantity, unit, name]) => {
    if (quantity !== null && (!Number.isFinite(quantity) || quantity < 0)) throw new Error('Ogiltig grundmängd.');
    if (quantity !== null && !units[unit]) throw new Error('Enheten stöds inte.');
    return {id, name, unit, quantity:quantity === null ? null : round(quantity * n / recipe.base)};
  });
}
export function amount(item, liquidUnit = 'auto') {
  if (item.quantity === null) return 'Efter smak';
  let n = item.quantity, unit = item.unit;
  if (units[unit]?.[0] === 'ml') {
    n *= units[unit][1];
    unit = liquidUnit === 'cl' ? 'cl' : liquidUnit === 'oz' ? 'oz' : n >= 1000 ? 'l' : n >= 100 ? 'dl' : 'ml';
    n /= units[unit][1];
  } else if (unit === 'g' && n >= 1000) {n /= 1000; unit = 'kg';}
  const whole = Math.floor(n), rest = round(n-whole);
  const fraction = unit === 'st' ? ({0.25:'¼',0.5:'½',0.75:'¾'})[rest] : undefined;
  const display = fraction ? (whole ? whole+' ' : '')+fraction : new Intl.NumberFormat('sv-SE',{maximumFractionDigits:2}).format(n);
  return display+' '+unit;
}
/** Rebuild from recipe selections on every change: never add a resized recipe twice. */
export function shoppingList(selections, recipes) {
  const result = new Map();
  for (const selection of selections) {
    const recipe = recipes.find(r => r.id === selection.recipeId);
    if (!recipe) continue;
    for (const item of scale(recipe, selection.servings)) {
      const normalized = item.quantity === null ? [item.unit,1] : units[item.unit];
      // Taste-only mixtures must not merge salt+pepper with salt+thyme.
      const key = item.id+'|'+normalized[0]+(item.quantity === null ? '|'+item.name : '');
      const entry = result.get(key);
      const quantity = item.quantity === null ? null : round(item.quantity * normalized[1]);
      if (entry) {if (quantity !== null) entry.quantity = round(entry.quantity+quantity);}
      else result.set(key,{...item,key,unit:normalized[0],quantity});
    }
  }
  return [...result.values()].sort((a,b)=>a.name.localeCompare(b.name,'sv'));
}
const normalize = value => String(value||'').toLocaleLowerCase('sv').normalize('NFD').replace(/[\u0300-\u036f]/g,'');
const stop = new Set(['jag','har','hemma','med','och','en','ett','lite','vill','laga','av','pa','recept','kan','gora','vad','mat','i','det','finns','som','till']);
export function searchRecipes(query, recipes) {
  const words = normalize(query).split(/[^a-z0-9]+/).filter(w=>w&&!stop.has(w));
  return recipes.map(recipe=>{
    const hay = normalize([recipe.title,recipe.description,...recipe.ingredients.map(i=>i[3])].join(' '));
    return {recipe,score:words.filter(w=>hay.includes(w)).length};
  }).filter(r=>!words.length||r.score===words.length).map(r=>r.recipe);
}
export function scalingNote(recipe, count) {
  return [recipe.category==='drinks'?'Mängderna gäller glas. Lägg i is, kolsyra och garnering vid servering.':'Tillagningstiden ökar inte automatiskt med portionerna. Anpassa kärl och tillaga i omgångar vid behov.',
    recipe.category==='drinks'?'Blanda gärna en mindre provmängd först. Kyl glasen och tillsätt kolsyra sist.':count>recipe.base*2?'Stort sällskap: smaka av salt och kryddor stegvis. Kontrollera genomstekning i varje omgång.':'Smaka av kryddor, syra och vätska efter hand.',
    recipe.ingredients.some(i=>i[2]==='st')?'Delar av ägg eller grönsaker är beräknade mängder. Mät upp den del som behövs.':''].filter(Boolean).join(' ');
}
export function suggestWeek(recipes,{favorites=/** @type {string[]} */ ([]),onlyFavorites=false,seed=0}={}) {
 const all=recipes.filter(r=>r.category!=='drinks'&&(!onlyFavorites||favorites.includes(r.id)));
 if(!all.length)return [];
 const chosen=[];const sequence=['everyday','vegetarian','italian','fish','asian','weekend','everyday'];
 for(let day=0;day<7;day++){
  const unused=all.filter(r=>!chosen.includes(r.id));
  const pool=unused.length?unused:all;
  const preferred=pool.filter(r=>r.category===sequence[day]);
  const choices=preferred.length?preferred:pool;
  const liked=choices.filter(r=>favorites.includes(r.id));
  const options=liked.length?liked:choices;
  chosen.push(options[(Math.abs(seed)+day)%options.length].id);
 }
 return chosen;
}
