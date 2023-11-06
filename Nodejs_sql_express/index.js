const mysql = require('mysql');

const conex = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'sakila'
});

conex.connect((err)=>{
    if(err){
        throw err;
    }else{
        console.log('conexion realizado con exitosa');
    }
});

conex.query('SELECT  * FROM actor', function(err,result, fields){
    if(err) throw err;

    result.forEach(result => {
        console.log(result);
        
    });
})
conex.end();