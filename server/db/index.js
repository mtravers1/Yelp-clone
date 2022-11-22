const { Pool } = require("pg")

const pool=new Pool(
    //to hide information use the .env to set the information
    // {
    // user: 'postgres',
    // host: 'localhost',
    // database: 'yelp',
    // password: 'Taper101',
    // port: 3002
    // }
)
module.exports={
    query: (text, params)=> pool.query(text, params)
}