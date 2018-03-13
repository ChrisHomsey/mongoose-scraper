
$.getJSON("/api/saved", function(data) {
    $("#saved-num").text(data.length);
});

// Open comments modal and request comment for this headline
$(document).on("click", ".comment-btn", function(){
    var headlineId = $(this).data("id");
    $("#comment-modal-" + headlineId).modal('show');
    $.ajax({
        method: "GET",
        url: "/api/headlines/" + headlineId
    }).done(function(data){
        if (data) {
            for (var i = 0; i < data.length; i++) {
                $("#comments").append('<div class="comment"><div class="content"><a class="author">' + data[i].title + '</a></div><div class="text">' + data[i].body + '</div></div>');
            }
        }
    }); 
});

// Submit comment
$(document).on("click", "#comment-submit", function(){
    var headlineId = $(this).data("id");
    var newTitle = $("#comment-title-" + headlineId).val();
    var newBody = $("#comment-body-" + headlineId).val();
    $.ajax({
        method: "POST",
        url: "/api/headlines/" + headlineId,
        data: {
            title: newTitle,
            body: newBody
        }
    }).done(function(data){
        $("#comments-" + headlineId).append("<h3>" + newTitle + "</h3><p>" + newBody + "</p>");
    })
})

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