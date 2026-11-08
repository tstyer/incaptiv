import http from 'node:http';
import {readFile} from 'node:fs/promises';
import {answer} from './answers.js';
const fixture=JSON.parse(await readFile(new URL('./data.json',import.meta.url)));
let pool;
if(process.env.DATABASE_URL){const {Pool}=await import('pg');pool=new Pool({connectionString:process.env.DATABASE_URL});}
async function dataset(){
 if(!pool)return fixture;
 const {rows}=await pool.query('SELECT payload FROM demo_snapshots WHERE id = $1',['glasshouse']);
 if(!rows[0])throw Error('Run npm run seed first');return rows[0].payload;
}
const server=http.createServer(async(req,res)=>{
 res.setHeader('Content-Type','application/json');
 const send=(status,body)=>{res.writeHead(status);res.end(JSON.stringify(body));};
 try{
 const path=new URL(req.url,'http://localhost').pathname;
 if(req.method==='GET'&&path==='/health')return send(200,{ok:true,storage:pool?'postgresql':'fixture'});
 if(req.method==='GET'&&path==='/api/dashboard')return send(200,await dataset());
 if(req.method==='POST'&&path==='/api/chat'){
 let body='';for await(const part of req){body+=part;if(body.length>8192)return send(413,{error:'Request too large'});}
 let parsed;try{parsed=JSON.parse(body);}catch{return send(400,{error:'Invalid JSON'});}
 if(typeof parsed.message!=='string'||!parsed.message.trim()||parsed.message.length>500)return send(400,{error:'Message must contain 1–500 characters'});
 return send(200,{reply:answer(parsed.message,await dataset()),demo:true});
 }
 send(404,{error:'Not found'});
 }catch(error){console.error(error.message);send(500,{error:'Unable to load data. Check backend configuration.'});}
});
server.listen(Number(process.env.PORT||3001),'0.0.0.0',()=>console.log('Incaptiv demo API listening on port '+(process.env.PORT||3001)));
