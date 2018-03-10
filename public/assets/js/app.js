$(document).ready(function(){
    $(document).on("click", ".save-btn", headlineSave);
    $(document).on("click", ".scrape-btn", headlineScrape);

    $.getJSON("/headlines", function(data) {
        // For each one
        for (var i = 0; i < data.length; i++) {
            console.log(data)[i];
          // Display the apropos information on the page
          $("#feed").append('<div class="column"><div class="ui fluid card"><div class="content"><img src="' + data[i].image + '"><a class="header" data-id' + data[i]._id + '>' + data[i].title + '</a></div></div><div class="ui small bottom attached blue button save-btn"><i class="like icon"></i>Save Article</div></div></div>');
        }
    });
})

