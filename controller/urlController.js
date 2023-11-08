const { UrlModel } = require("../model/url.model");

const  urlExists = require('url-exists');
// const  {nanoid} = require("nanoid")
const shortid =require('short-id');



// url is valid or not check
const validURL= async(req,res,next)=>{
    const {url}= req.body;
    urlExists(url, function(err, exists) {
        if(err){
            return res.send({"msg":"Invalid URL"})
        }
        else{
            console.log("url",exists)
            next()
        }
});
}

 const shortURL= async(req,res)=>{
    const {url, customUrl, expiryDate}= req.body;
    let id= shortid.generate();
    const newURL= new UrlModel({url,customUrl,expiryDate,id})
    
    try {
        await newURL.save();
        res.status(200).send({"msg":`http:URLshortener.com/${newURL.customUr}`,id})
    } catch (error) {
        res.status(400).send({"err_shortURL":error.message})
    }
}

const redirectToURL=async(req,res)=>{
    const id= req.params.id;
    const originalLink= await UrlModel.findOne({id})
    if(!originalLink){
        return res.status(400).send({"error":"URL not found"})
    }
    originalLink.visits+=1;
    await originalLink.save()
    console.log(originalLink.url)
    res.redirect(originalLink.url)
    // res.send({"msg":`${originalLink.url}`})

}

module.exports={
    validURL,
    shortURL,
    redirectToURL
}