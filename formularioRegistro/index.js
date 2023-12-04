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

  //Actualizacion de los parametros de form a mysql
app.post("/user-form", function(req, res) {
    //Hemos usado el let solo para id y el datos.### para name
  const datos = req.body;
  let carre = datos.carrera;
  let nombresComple = datos.nombresCompletos;
  let Ndni = datos.dni;
  let fechaNaci = datos.fechaNacimiento;
  let correo = datos.correo;
  let contra = datos.contraseña;
  
  //Hemos usado el let en la sintaxi de mysql 
  let registrar = "INSERT INTO RECLAMOS carrera, (nombresCompletos, dni, fechaNacimiento, correo, contraseña) VALUES ('" + carre + "','" + nombresComple + "','" + Ndni + "','" + fechaNaci + "','" + correo + "','" + contra + "')";

  conexion.query(registrar, function(error) {
    if (error) {
      throw error;
    } else {
      console.log(
        "CARRERA: " + datos.carre + "\n" + 
        "NOMBRESCOMPLETO: " + datos.nombresComple + "\n" + 
        "NUMERODNI: " + datos.Ndni + "\n" +
        "FNACIMIENTO: " + datos.fechaNaci + "\n" + 
        "CORREO: " + datos.correo + "\n" + 
        "CONTRA: " +datos.contra + "\n" 
      )
    }
  });
});