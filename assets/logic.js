
    var topics = ["Destiny2", "Pokemon", "Leagueoflegends"]




function displayGameGifs() {
    var games = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + games + "&api_key=6fE29OZd2bUfdLp3dWJz0aGR4MWx7f72&limit=10";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);

        var results = response.data;

        for( var i=0; i < results.length; i++) {
            var rating = results[i].rating;
            var gamesDiv = $("<div>");
            var p = $("<p>").text("Rating: " + rating);
            var gameImage = $("<img>");
           
            gameImage.attr(
                "src", results[i].images.fixed_height_still.url
            );
            gameImage.attr(
                "data-still", results[i].images.fixed_height_still.url
            );
            gameImage.attr(
                "data-animate", results[i].images.fixed_height.url,
            );
            gameImage.attr(
                "data-state", "still"
            );
            gameImage.attr(
                "class", "gif"
            );




            gamesDiv.append(p);
            gamesDiv.append(gameImage);
            $("#gifs-go-here").prepend(gamesDiv);

        }
        $(".gif").on("click", function(){
            var state = $(this).attr("data-state");
        
        
            if(state === "still") {
                $(this).attr("src",$(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
            }
            else{
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            }
        });
    })
};

function renderButtons() {
    $("#buttons-go-here").empty();

    for (var i = 0; i < topics.length; i++) {
        var a = $("<button>");
        a.addClass("games");
        a.attr("data-name", topics[i]);
        a.text(topics[i]);
        $("#buttons-go-here").append(a);
    }
};

$("#add-game").on("click", function(event) {
    event.preventDefault();

    var game = $("#game-input").val().trim();
    topics.push(game);
    renderButtons();
})

$(document).on("click", ".games", displayGameGifs,);



renderButtons();


