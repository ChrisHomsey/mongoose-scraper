// JSON get request to grab all headlines and append them to the #feed
$.getJSON("/api/headlines", function(data) {
    // For each one
    for (var i = 0; i < data.length; i++) {
        console.log(data[i]);
      $("#feed").append('<div class="column"><div class="ui fluid card"><div class="image"><a class="header" href="' + data[i].link + '"><img class="fluid" src="' + data[i].thumbnail + '"></a></div><div class="content"><a class="header" href="' + data[i].link + '">' + data[i].title + '</a></div><div class="ui small bottom attached blue button save-btn" data-id="'  + data[i]._id + '"><i class="like icon"></i>Save Article</div></div></div>');
    }
});

// Grabs the number of saved articles to display them on the navbar
$.getJSON("/api/saved", function(data) {
    $("#saved-num").text(data.length);
});


// When the save button is clicked, grab the ID of that article and use the /api/headlines/save/:id POST route to change the saved value to true
$(document).on("click", ".save-btn", function(){
    var headlineId = $(this).data("id");
    console.log(headlineId);
    $.ajax({
      method: "POST",
      url: "/api/headlines/save/" + headlineId
    }).done(function(data) {
        console.log("Saved article", data);
        location.reload();
    });
});

