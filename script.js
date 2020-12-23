$(function () {
    //Marvel API
    var apiMarvelKey = "97a93e9e494106d892973948f5b253d9";
    var timeStamp = "1";
    var hash = "c32debe50244fc7a722036892da77e19";
    var characterSearchHistory = ["Wolverine","Cyclops","Thor","Black Widow"];

    // searchComicCharacter("Wolverine");
    createButtons();

    function searchComicCharacter(searchResult) {
        var marvelQueryURL = "https://gateway.marvel.com/v1/public/characters?name=" + searchResult + "&ts=" + timeStamp + "&apikey=" + apiMarvelKey + "&hash=" + hash;
        // https://gateway.marvel.com/v1/public/characters?name=cyclops&ts=1&apikey=97a93e9e494106d892973948f5b253d9&hash=c32debe50244fc7a722036892da77e19
        $.ajax({
            url: marvelQueryURL,
            method: "GET",
        }).then(function (data) {
            // $(".marvelDump").text(JSON.stringify(data,null,8));
            $(".marvelDump").empty();
            var nameEl = $("<div>").text(data.data.results[0].name);
            var descriptionEl = $("<div>").text(data.data.results[0].description);
            var wikiaLink = data.data.results[0].urls[1].url;
            var wikiaLinkEl = $("<a>").attr("href",wikiaLink).text("Wikia Link");
            var imageLink = data.data.results[0].thumbnail.path + "." + data.data.results[0].thumbnail.extension;
            var thumbnailEl = $("<img>").attr("src",imageLink)
            $(".marvelDump").append(nameEl,descriptionEl,wikiaLinkEl, thumbnailEl);
            if(!characterSearchHistory.includes(data.data.results[0].name)) {
                characterSearchHistory.push(data.data.results[0].name);
            }
        })
    }


    function createButtons() {
        $(".characterButtonsDump").empty();
        for(var buttonCount = 0; buttonCount < characterSearchHistory.length; buttonCount++) {
            var characterButtonEl = $("<button>").attr("value",characterSearchHistory[buttonCount]).text(characterSearchHistory[buttonCount]);
            characterButtonEl.attr("class","characterButton");
            $(".characterButtonsDump").append(characterButtonEl);
        }
    }

    $(".characterButton").on("click", function () {
        searchComicCharacter($(this).val());
    })
});



$function() {
    //giphy API
    var apiGiphyKey = "SL7Npc8K1yEe9sZwG498E44VaNV52n7A";
qIsSesrchResult = 
limit = 25;
offSet = 0&;
rating = "pg-13";

var giphyQueryURL = "https://api.giphy.com/v1/" + qIsSesrchResult + apiGiphyKey + "&q="   "&"+ "limit=" +limit+ & +"offset=" + offSet + "rating=" + rating +"&lang=en"
gifs/search?api_key=




console.log(marvelQueryURL);
$.ajax({
    url: giphyQueryURL,
    method: "GET",
}).then(function (data) {
    $(".giphyDump").text(JSON.stringify(data,null,4));
})


    

    // $.ajax({
    //     url: "https://cors-anywhere.herokuapp.com/https://marvel.com/universe/Magneto_(Max_Eisenhardt)?utm_campaign=apiRef&utm_source=97a93e9e494106d892973948f5b253d9",
    //     method: "GET",
    // }).then(function (data) {
    //     $(".marvelDump").text(data);
    //     console.log(data);
    //     console.log($(".masthead__copy").text());
    // })
    //https://cors-anywhere.herokuapp.com/https://marvel.com/universe/Magneto_(Max_Eisenhardt)?utm_campaign=apiRef&utm_source=97a93e9e494106d892973948f5b253d9
    // https://www.marvel.com/characters/magneto-max-eisenhardt?utm_campaign=apiRef&utm_source=97a93e9e494106d892973948f5b253d9
});