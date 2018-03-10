$.getJSON("/api/headlines", function(data) {
    // For each one
    for (var i = 0; i < data.length; i++) {
        console.log(data[i]);
      $("#feed").append('<div class="column"><div class="ui fluid card"><div class="image"><a class="header" data-id' + data[i]._id + '><img class="fluid" src="' + data[i].thumbnail + '"></a></div><div class="content"><a class="header" href="' + data[i].link + '">' + data[i].title + '</a></div><div class="ui small bottom attached blue button save-btn" data-id="'  + data[i]._id + '"><i class="like icon"></i>Save Article</div></div></div>');
    }
});

// $(document).on("click", ".save-btn"){
//     var articleToSave = $(this).data("id");
//     articleToSave.saved = true;
//     // Using a patch method to be semantic since this is an update to an existing record in our collection
//     $.ajax({
//       method: "PUT",
//       url: "/headlines",
//       data: articleToSave
//     }).then(function(data) {
//       // If successful, mongoose will send back an object containing a key of "ok" with the value of 1
//       // (which casts to 'true')
//       if (data.ok) {
//         // Run the initPage function again. This will reload the entire list of articles
//         initPage();
//       }
//     });
// }