const express = require("express");
const mysql = require("mysql");
const path = require("path");
const app = express();
const servermysql = express();

let conexion = mysql.createConnection({
    host: "localhost",
    user: "frank",
    password: "admin",
    database: "libroReclamos"
});


conexion.connect(function (error) {
    if (error) {
      throw error;
    } else {
      console.log("Conexión exitosa");
    }
  });

  const puerto = process.env.PUERTO || 3000;

  app.listen(puerto, function () {
    console.log("Servidor funcionando en puerto: " + puerto);
  });

  app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//definimos las carpetas
app.use("/css", express.static(path.join(__dirname, 'css')));
app.use("/img", express.static(path.join(__dirname, 'img')));

app.get("/",function(req,res){
  var filepath = path.join(__dirname,"formulario.html")
  res.sendFile(filepath) ;
});

  //Actualizacion de los parametros de form a mysql
app.post("/user-form", function(req, res) {
    //Hemos usado el let solo para id y el datos.### para name
  const datos = req.body;
  let carre = datos.especialidad;
  let nombresComple = datos.nombre;
  let Ndni = datos.dni;
  let fechaNaci = datos.edad;
  let correo = datos.correo_electronico;
  let contra = datos.contraseña;
  
  //Hemos usado el let en la sintaxi de mysql 
  let registrar = "INSERT INTO RECLAMOS (carrera,nombresCompletos, dni, fechaNacimiento, correo, contraseña) VALUES ('" + carre + "','" + nombresComple + "','" + Ndni + "','" + fechaNaci + "','" + correo + "','" + contra + "')";

  conexion.query(registrar, function(error) {
    if (error) {
      throw error;
    } else {
      console.log(
        "CARRERA: " + datos.especialidad + "\n" + 
        "NOMBRESCOMPLETO: " + datos.nombre + "\n" + 
        "NUMERODNI: " + datos.dni + "\n" +
        "FNACIMIENTO: " + datos.edad + "\n" + 
        "CORREO: " + datos.correo_electronico + "\n" + 
        "CONTRA: " +datos.contraseña + "\n" 
      )
    }
  });
});