const express= require("express");
const { validURL, shortURL, redirectToURL, deleteURL } = require("../controller/urlController");

const urlRouter= express.Router()

urlRouter.post("/",validURL,shortURL);
urlRouter.get("/:id/:customUrl", redirectToURL)
urlRouter.delete("/delete/:id", deleteURL);

module.exports={urlRouter}