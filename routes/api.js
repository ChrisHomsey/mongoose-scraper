module.exports = (app, cheerio, request) => {
    
    // A GET route for scraping the echojs website
app.get("/scrape", function(req, res) {
    // First, we grab the body of the html with request
    request("https://www.reddit.com/r/FloridaMan", function(error, response, html) {
        // Load the HTML into cheerio and save it to a variable
        // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
        var $ = cheerio.load(html);
        // An empty object to save the data that we'll scrape
        var result = {};

        $("div.link").each(function(i, element){
            i=i+2;
            // Add the text and href of every link, and save them as properties of the result object
            result.thumbnail = $(this)
            .children("img")
            .attr("src");
            result.title = $(this)
            .children("a.title")
            .text();
            result.link = $(this)
            .children("a.title")
            .attr("href");
            // Create a new Article using the `result` object built from scraping
            db.Article.create(result)
            .then(function(dbArticle) {
                // View the added result in the console
                console.log(dbArticle);
            })
            .catch(function(err) {
                // If an error occurred, send it to the client
                return res.json(err);
            });
        });
      // If we were able to successfully scrape and save an Article, send a message to the client
      res.render('index', { activeHome: true });
    });
  });


}