// JSON get request to grab all saved headlines and append them to the #feed - also grabs the number of saved articles to display them on the navbar
$.getJSON("/api/saved", function(data) {
    // For each one
    $("#saved-num").text(data.length);
    for (var i = 0; i < data.length; i++) {
        console.log(data[i]);
        $("#feed").append('<div class="column"><div class="ui fluid card"><div class="image"><a class="header" href=' + data[i].link + '><img class="fluid" src="' + data[i].thumbnail + '"></a></div><div class="content"><a class="header" href="' + data[i].link + '">' + data[i].title + '</a></div><div class="ui small bottom attached red button unsave-btn" data-id="'  + data[i]._id + '"><i class="minus icon"></i>Remove from Saved</div></div></div>');
    }
});

// When the un-save button is clicked, grab the ID of that headline and use the /api/headlines/save/:id POST route to change the saved value to false
$(document).on("click", ".unsave-btn", function(){
    var headlineId = $(this).data("id");
    console.log(headlineId);
    $.ajax({
      method: "POST",
      url: "/api/headlines/unsave/" + headlineId
    }).done(function(data) {
        console.log("Removed from saved", data);
        location.reload();
    });
});