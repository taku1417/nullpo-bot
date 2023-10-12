const config = require('config');
process.env.NODE_ENV === 'default';
const express = require('express');
const throw_webhook = require('./function/throw_webhook');
const app = express();
const PORT= process.env.PORT || 1417;
app.listen(PORT,()=>{
    console.log("listening server on port " + PORT);
})

app.get( '/', function( req, res ){
	res.contentType( 'application/json; charset=utf-8' );
	res.write( JSON.stringify( { status: true }, null, 2 ) );
	res.write( "準備中...");
	res.end();
  });

app.get( '/ping', async function( req, res ){
	res.contentType( 'application/json; charset=utf-8' );
	
});