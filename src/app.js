const express = require("express");

const { auth } = require("express-oauth2-jwt-bearer");
const errorHandler = require("./middlewares/errorHandler");


require('dotenv').config();

// Configuracion Middleware con el Servidor de Autorización 
const autenticacion = auth({
  audience: process.env.OAUTH_AUDIENCE,
  issuerBaseURL: process.env.OAUTH_URL,
  tokenSigningAlg: "RS256",
});


const app = express();
app.use(express.json());

// Importamos el Router de Libros
const librosRouter = require("./routes/libros");

//Configuramos el middleware de autenticacion
app.use("/api/libros", autenticacion,  librosRouter);

app.use(errorHandler);

app.listen(3000, () => {
  console.log("Servidor iniciado en el puerto 3000");
});

module.exports = app;



// // eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InBNSWhvbzg5VUxkeUlPRmFfNFBtXyJ9.eyJodHRwczovL2V4YW1wbGUuY29tL2NsaWVudF9uYW1lIjoiQ2xpZW50ZSBBUEkgUHJvZHVjdG8iLCJpc3MiOiJodHRwczovL2Rldi11dG4tZnJjLWlhZXcuYXV0aDAuY29tLyIsInN1YiI6IlFpVzhBbEg5b3lrQmc3b2ZCckhzNlRvWXZyZG1oT2VFQGNsaWVudHMiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjMwMDAvYXBpL2JpYmxpb3RlY2EiLCJpYXQiOjE3MDM4NzUyNjksImV4cCI6MTcwMzk2MTY2OSwiYXpwIjoiUWlXOEFsSDlveWtCZzdvZkJySHM2VG9ZdnJkbWhPZUUiLCJzY29wZSI6InJlYWQ6bGlicm9zIHdyaXRlOmxpYnJvcyIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.j4xQPBUIY5AVfZb3AprFZg0ZIXJOubCTPKQMnczCcYniehNVf1X8ju2VYPxngGc3AtV2tNIE0RL-A_w2RfW43pXKaFYwx0W_BO3o1I3gx-o9FzKhhbvMVXdSz50-Uzn38ZWxadgqsPgU4MqcBVFp8_JUeAdVmqfV1TgAWTklMLReGTxOD17u7P0zGWokgvGLvEYh9qPm-6qXkIgmxGs4Q66z44YuUElpZmdf4dt1ag81tUOdJY8yjrgTd0rhYh-4IkGwauE8kJui8B_CbMF6LT9oumiO8fIcuptKFxiAQHaO7N2CdmHinEYCqkqeuiMplxSKOGnxC3vE7XolAVqBmQ
// curl --location 'http://localhost:3000/api/libros' \
// --header 'Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InBNSWhvbzg5VUxkeUlPRmFfNFBtXyJ9'