export const emptyPreferences = () => ({favorites:[],cooked:[],meals:[],basket:[],pantry:[],watchlist:[],seen:[],liked:[],searches:[],tasks:[],people:4,budget:''});
const isText=(s,n)=>typeof s==='string'&&s.length<=n;
const ids=(list,max)=>Array.isArray(list)&&list.length<=max&&list.every(s=>isText(s,200)&&!/[\u0000-\u001f]/.test(s));
export function validatePreferences(raw) {
 if (!raw||typeof raw!=='object'||Array.isArray(raw)) throw Error('INVALID_PREFERENCES');
 const p={...emptyPreferences(),...raw};
 if (!ids(p.favorites,200)||!ids(p.pantry,400)||!ids(p.seen,200)||!ids(p.liked,200)||!Number.isInteger(p.people)||p.people<1||p.people>30||!isText(p.budget,40)) throw Error('INVALID_PREFERENCES');
 if (!Array.isArray(p.meals)||p.meals.length>150||p.meals.some(m=>!m||!isText(m.slot,40)||!/^\d{4}-\d{2}-\d{2}:[0-6]$/.test(m.slot)||!isText(m.recipeId,80)||!Number.isInteger(m.servings)||m.servings<1||m.servings>30)||new Set(p.meals.map(m=>m.slot)).size!==p.meals.length)throw Error('INVALID_PREFERENCES');
 if (!Array.isArray(p.basket)||p.basket.length>50||p.basket.some(m=>!m||!isText(m.recipeId,80)||!Number.isInteger(m.servings)||m.servings<1||m.servings>30)||new Set(p.basket.map(m=>m.recipeId)).size!==p.basket.length)throw Error('INVALID_PREFERENCES');
 if (!Array.isArray(p.cooked)||p.cooked.length>100||p.cooked.some(c=>!c||!isText(c.recipeId,80)||!/^\d{4}-\d{2}-\d{2}$/.test(c.date)))throw Error('INVALID_PREFERENCES');
 if (!Array.isArray(p.searches)||p.searches.length>20||p.searches.some(s=>!isText(s,100)))throw Error('INVALID_PREFERENCES');
 if (!Array.isArray(p.tasks)||p.tasks.length>100||p.tasks.some(t=>!t||!isText(t.id,80)||!isText(t.text,300)||typeof t.done!=='boolean'))throw Error('INVALID_PREFERENCES');
 if (!Array.isArray(p.watchlist)||p.watchlist.length>100||p.watchlist.some(w=>!w||!isText(w.id,100)||!isText(w.title,240)||!isText(w.url,500)||!/^https:\/\/(www\.)?(themoviedb\.org|tvmaze\.com)\//.test(w.url)||w.artwork&&!/^https:\/\/(image\.tmdb\.org|static\.tvmaze\.com)\//.test(w.artwork)))throw Error('INVALID_PREFERENCES');
 return Object.fromEntries(Object.keys(emptyPreferences()).map(k=>[k,p[k]]));
}
