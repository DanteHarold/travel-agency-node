// const express = require("express");
import express from "express";
import router from "./routes/index.js";
import db from "./config/db.js";

const app = express();

//*Conectar la BD

db.authenticate()
  .then(() => console.log("Base de Datos Conectada"))
  .catch((e) => console.log(e));

//*Definir Puerto
const port = process.env.PORT || 4000;

//*Habilitar Pug
app.set("view engine", "pug");

//*Obtener el Año Actual

app.use((req, res, next) => {
  const year = new Date();
  res.locals.actualYear = year.getFullYear();
  res.locals.nombreSitio = "Agencia de Viajes";
  next();
});

//*Agregar Body Parser leer datos del formulario
app.use(express.urlencoded({ extended: true }));

//*Definir Carpeta Publica
app.use(express.static("public"));

//*Agregar Router
app.use("/", router);

app.listen(port, () => {
  console.log(`El Servidor está corriendo en el puerto ${port}`);
});
