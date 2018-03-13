module.exports = (app, db, cheerio, request) => {
    
    // A GET route for scraping the floridaman subreddit
    app.get("/api/scrape", function(req, res) {
        // First, we grab the body of the html with request
        request("https://www.reddit.com/r/FloridaMan", function(error, response, html) {
            // Load the HTML into cheerio and save it to a variable
            // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
            var $ = cheerio.load(html);
            // An empty object to save the data that we'll scrape
            var result = {};

            $("div.link").each(function(i, element){
                if (i > 1) {
                    // Add the text and href of every link, and save them as properties of the result object
                    result.title = $(this)
                    .find("a.title")
                    .text();
                    result.link = $(this)
                    .children("a.thumbnail")
                    .attr("href");
                    result.thumbnail = $(this)
                    .find("a.thumbnail img")
                    .attr("src");

                    console.log(result);

                    // Create a new Headline using the `result` object built from scraping
                    db.Headline.create(result)
                    .then(function(dbHeadline) {
                        // View the added result in the console
                        console.log(dbHeadline);
                    })
                    .catch(function(err) {
                        // If an error occurred, send it to the client
                        return res.json(err);
                    });
                }
            });
            // If we were able to successfully scrape and save an Headline, redirect back to home
            res.redirect('/');
        });
    });

    // // Route for getting all Headlines from the db
    // app.get("/api/headlines", function(req, res) {
    //     // Grab every document in the Headlines collection
    //     db.Headline.find({ 'saved': false }).populate("note")
    //     .then(function(dbHeadline) {
    //         // If we were able to successfully find Headlines, send them back to the client
    //         res.json(dbHeadline);
    //     })
    //     .catch(function(err) {
    //         // If an error occurred, send it to the client
    //         res.json(err);
    //     });
    // });

    // Route for finding saved headlines (for couting the amount saved)
    app.get("/api/saved", function(req, res) {
        // Grab every document in the Headlines collection
        db.Headline.find({ 'saved': true })
        .then(function(dbHeadline) {
            // If we were able to successfully find Headlines, send them back to the client
            res.json(dbHeadline);
        })
        .catch(function(err) {
            res.json(err);
        });
    });

    // Get and populate comments from a Headline
    app.get("/api/headlines/:id", function(req, res){
        db.Note.findOne({ _id: req.params.id })
        .populate("note")
        .then(function(dbHeadline){
            res.json(dbHeadline);
        }).catch(function(err){
            res.json(err);
        })
    })

    // Create a comment
    app.post("/api/headlines/:id", function(req, res){
        db.Note.create(req.body)
        .then(function(dbNote){
            return db.Headline.findOneAndUpdate({ _id: req.params.id }, { $push: { note: dbNote } })
            .then(function(dbHeadline){
                res.json(dbHeadline);
            });
        }).catch(function(err){
            res.json(err);
        })
    });

    // Route for saving headlines
    app.post("/api/headlines/save/:id", function(req, res){
        db.Headline.findOneAndUpdate({ _id: req.params.id }, { saved: true })
        .then(function(dbReturn){
            res.redirect("/");
        });
    });

    // Route for unsaving headlines
    app.post("/api/headlines/unsave/:id", function(req, res){
        db.Headline.findOneAndUpdate({ _id: req.params.id }, { saved: false })
        .then(function(dbReturn){
            res.redirect("/saved");
        });
    });


}

