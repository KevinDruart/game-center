// on veut créer un serveur web on va prendre express
const express = require("express");

const app = express();
const port = 4000;

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.static("./public"));

app.get("/", (request, response) => {
  // on renvoie le fichier index.html
  response.render("index", { 
    pageTitle: "Game Center Mimr",
    cssFile: '/css/style.css',
    jsFile:"/js/index.js"
  });
});

app.get("/games/des", (request, response) => {
  response.render("diceRoller", {
    pageTitle: "Le jeu de dés",
    cssFile: "/css/diceRoller.css",
    jsFile: "/js/diceRoller/diceRoller.js",
  });
});

app.get("/games/fourchette", (request, response) => {
  response.render("fourchette", {
    pageTitle: "La fourchette",
    cssFile: "/css/fourchette.css",
    jsFile: "/js/fourchette/fourchette.js",
  });
});

app.listen(port, () => {
  console.log(`🚀 Server ready : http://localhost:${port}`);
});
