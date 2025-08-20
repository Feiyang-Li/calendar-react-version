import pkg from 'pg';
const {Pool} = pkg;

export default function DbReconnection(val) {
    const pool = new Pool(val)
pool.connect()
  .then(client => {
    console.log("Connected to PostgreSQL ✅");
    client.release();
  })
   .catch(err => console.error("Connection error", err.stack));
}