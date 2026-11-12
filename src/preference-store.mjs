import {emptyPreferences,validatePreferences} from './preferences.mjs';
export function preferenceStore(db){return {
 async read(owner){const row=await db.prepare('SELECT payload, version FROM app_preferences WHERE owner = ?').bind(owner).first();return {data:row?validatePreferences(JSON.parse(row.payload)):emptyPreferences(),version:row?.version||0};},
 async write(owner,data,expectedVersion){
  if(!Number.isSafeInteger(expectedVersion)||expectedVersion<0||expectedVersion>1e9)throw Error('INVALID_VERSION');
  const payload=JSON.stringify(validatePreferences(data)),version=expectedVersion+1;
  const result=expectedVersion===0?await db.prepare('INSERT INTO app_preferences (owner,payload,version,updated_at) VALUES (?,?,?,?) ON CONFLICT(owner) DO NOTHING').bind(owner,payload,version,Date.now()).run():await db.prepare('UPDATE app_preferences SET payload=?,version=?,updated_at=? WHERE owner=? AND version=?').bind(payload,version,Date.now(),owner,expectedVersion).run();
  if(result.meta.changes!==1)throw Error('PREFERENCE_CONFLICT');return {version};
 }
};}
