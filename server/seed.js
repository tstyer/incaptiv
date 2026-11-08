import pg from 'pg';
import {readFile} from 'node:fs/promises';
if(!process.env.DATABASE_URL)throw Error('Set DATABASE_URL in .env');
const pool=new pg.Pool({connectionString:process.env.DATABASE_URL});
try{
 await pool.query('CREATE TABLE IF NOT EXISTS demo_snapshots (id text PRIMARY KEY, payload jsonb NOT NULL)');
 const data=JSON.parse(await readFile(new URL('./data.json',import.meta.url)));
 await pool.query('INSERT INTO demo_snapshots VALUES ($1,$2) ON CONFLICT (id) DO UPDATE SET payload=EXCLUDED.payload',['glasshouse',data]);
 console.log('Seeded demo snapshot');
}finally{await pool.end();}
