const { UrlModel } = require("../model/url.model");

const  urlExists = require('url-exists');
// const  {nanoid} = require("nanoid")
const shortid =require('short-id');



// url is valid or not check
const validURL= async(req,res,next)=>{
    const {url}= req.body;
    urlExists(url, function(err, exists) {
        if(err){
            return res.send({"err":"Invalid URL"})
        }
        else if(exists===false){
            return res.send({"err":"Invalid URL"})
        }
        else{
            console.log("url",exists)
            next()
        }
});
}

 const shortURL= async(req,res)=>{
    const {url, customUrl, expiryTime}= req.body;
    let id= shortid.generate();
    const newURL= new UrlModel({url,customUrl,expiryTime,id})
    
    try {
        await newURL.save();
        res.status(200).send({"msg":`http:url-shortener.com/${newURL.customUrl}`,id})
    } catch (error) {
        res.status(400).send({"err_shortURL":error.message,"URL_exist":"URL Already Exist"})
    }
}

const redirectToURL=async(req,res)=>{
    const id= req.params.id;
    const customUrl= req.params.customUrl
    console.log("Curl",customUrl)
    const originalLink= await UrlModel.findOne({id})
    console.log(id)
    console.log(originalLink)
    if(!originalLink){
        return res.status(400).send({"error":"URL not found"})
    }
    originalLink.visits+=1;
    await originalLink.save()
    console.log(originalLink.url)
    res.redirect(originalLink.url)
    // res.send({"msg":`${originalLink.url}`})

}
const deleteURL = async (req, res) => {
    const id = req.params.id;

    try {
        const deletedURL = await UrlModel.findOneAndDelete({ id });

        if (!deletedURL) {
            return res.status(404).json({ error: "URL not found" });
        }

        res.status(200).json({ message: "URL deleted successfully", deletedURL });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
};
module.exports={
    validURL,
    shortURL,
    redirectToURL,
    deleteURL
}