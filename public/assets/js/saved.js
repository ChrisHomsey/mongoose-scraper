$.getJSON("/api/saved", function(data) {
    // For each one
    for (var i = 0; i < data.length; i++) {
        console.log(data[i]);
      $("#feed").append('<div class="column"><div class="ui fluid card"><div class="image"><a class="header" data-id' + data[i]._id + '><img class="fluid" src="' + data[i].thumbnail + '"></a></div><div class="content"><a class="header" href="' + data[i].link + '">' + data[i].title + '</a></div><div class="ui small bottom attached blue button save-btn" data-id="'  + data[i]._id + '"><i class="like icon"></i>Save Article</div></div></div>');
    }
});