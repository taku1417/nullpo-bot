const dbClient = require('pg/lib/client');
const dbclient = new dbClient({
	user: process.env.DATABASE_USER,
	password: process.env.DATABASE_PASS,
	host: process.env.DATABASE_HOST,
	port: 5432,
	database: process.env.DATABASE,
	ssl: true
});

function update_from_db(mode,type){
        var query = "SELECT * FROM rental;";
        dbclient.connect(function(err) {
                if (err) {
                        console.error("[update_from_db] error", err);
                        process.exit(1);
                }
        });
        if(mode === "load"){
                if(type === "rental" || type === "all"){
                        var query = "SELECT * FROM rental;";
                        dbclient.query(query, function(err, result) {
                                if (err) {
                                        console.error("[update_from_db] query error", err);
                                        process.exit(1);
                                } else {
                                        const fields = result.fields;
                                        const types = result._types._types.builtins;
                                        const columns = [];
                                        fields.forEach( f => {
                                                const dt = Object.keys(types).reduce( (r, key) => {
                                                        return types[key] === f.dataTypeID ? key : r;
                                                }, null);
                                                columns.push({columnName: f.name, type: dt});
                                                });
                                        console.log(columns);
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