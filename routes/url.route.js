const express= require("express");
const { validURL, shortURL, redirectToURL } = require("../controller/urlController");

const urlRouter= express.Router()

urlRouter.post("/",validURL,shortURL);
urlRouter.get("/:id/:customUrl", redirectToURL)
module.exports={urlRouter}