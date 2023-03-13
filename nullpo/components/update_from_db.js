const dbClient = require('pg/lib/client');
const config = require('config');
let dbclient;
if(process.env.NODE_ENV === "heroku"){
        dbclient = new dbClient({
	        user: process.env.DATABASE_USER,
	        password: process.env.DATABASE_PASS,
	        host: process.env.DATABASE_HOST,
	        port: 5432,
	        database: process.env.DATABASE,
	        ssl: true
        });
} else {
        dbclient = new dbClient({
                user: config.get('DATABASE_USER'),
                password: config.get('DATABASE_PASS'),
                host: config.get('DATABASE_HOST'),
                port: 5432,
                database: config.get('DATABASE'),
                ssl: true
        });
}

function update_from_db(mode,type){
        var query = "SELECT * FROM rental;";
        if(mode === "load"){
                if(type === "rental" || type === "all"){
                        var query = "SELECT * FROM rental;";
                        const test = [];
                        var row = [];
                        dbclient.query(query, function(err, result) {
                                if (err) {
                                        console.error("[update_from_db] query error", err);
                                        process.exit(1);
                                } else {
                                        for (var i = 0; i < result.rows.length; i++) {
                                                row = result.rows[i];
                                        }
                                        console.log(test);
                                }
                        });
                }
        }
        else if(mode === "save"){
                if(type === "rental" || type === "all"){
                        /*保存の処理*/
                }
        }
        dbclient.query(query,(err,res) => {
                if(err){       
                        console.log(err);
                }
                else{
                        console.log(res.rows);
                        console.log("[update_from_db] success");
                        return;
                }
        });
}
module.exports = update_from_db;