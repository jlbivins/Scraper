// EXAMPLE SCRAPING FOR https://www.npr.org/sections/news/

// In order run this file make sure you have the axios and cheerio npm packages installed first.


var axios = require("axios");
var cheerio = require("cheerio");
var router = require("express").Router();
var db = require('../models');

router.get('/scrape',(req,res)=>{
    axios.get("https://www.npr.org/sections/news/")
  .then(function (res) {

    //console.log(res.data)


    var $ = cheerio.load(res.data);
    console.log("scraping");



    // Now, find and loop through each 'article' element that has the "item" class
    // (i.e, the element holding the articles)
    $("article.item").each(function (i, element) {
    
      //We create an article object to hold our data.  
      var article = {};

      article.title = $(this).find("h2.title").text().trim();
      article.link = $(this).find("h2.title").find("a").attr("href");
      article.summary = $(this).find("p.teaser").text().trim().split("•")[1].trim();

      console.log(article);
      //then insert each article into mongo/mongoose db
        db.Article.create(article);
    })

  })
});

 module.exports = router;
//function scrape(){
// axios.get("https://www.npr.org/sections/news/")
//   .then(function (res) {

//     //console.log(res.data)


//     var $ = cheerio.load(res.data);
//     console.log("scraping");



//     // Now, find and loop through each 'article' element that has the "item" class
//     // (i.e, the element holding the articles)
//     $("article.item").each(function (i, element) {
    
//       //We create an article object to hold our data.  
//       var article = {};

//       article.title = $(this).find("h2.title").text().trim();
//       article.url = $(this).find("h2.title").find("a").attr("href");
//       article.summary = $(this).find("p.teaser").text().trim().split("•")[1].trim();

//       console.log(article);
//       //then insert each article into mongo/mongoose db

//     })

//   })

