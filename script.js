$(function () {
    //Marvel API
    var apiMarvelKey = "97a93e9e494106d892973948f5b253d9";
    var timeStamp = "1";
    var hash = "c32debe50244fc7a722036892da77e19";
    var searchResult = prompt("What comic character do you want to search?");
    var marvelQueryURL = "https://gateway.marvel.com/v1/public/characters?name=" + searchResult + "&ts=" + timeStamp + "&apikey=" + apiMarvelKey + "&hash=" + hash;
    //https://gateway.marvel.com/v1/public/characters?name=cyclops&ts=1&apikey=97a93e9e494106d892973948f5b253d9&hash=c32debe50244fc7a722036892da77e19
    console.log(marvelQueryURL);
    $.ajax({
        url: marvelQueryURL,
        method: "GET",
    }).then(function (data) {
        $(".marvelDump").text(JSON.stringify(data,null,4));
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
});