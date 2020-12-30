$(function () {
    //Marvel API
    var apiMarvelKey = "97a93e9e494106d892973948f5b253d9";
    var hash = "c32debe50244fc7a722036892da77e19";
    var characterSearchHistory = ["Wolverine", "Cyclops", "Thor", "Black Widow"];
    var apiGiphyKey = "SL7Npc8K1yEe9sZwG498E44VaNV52n7A";
    var characterList = ["Thor", "Spider-Man", "Deadpool", "Iron Man", "Hulk", "Wolverine", "Captain America", "Doctor Strange", "Black Panther", "Groot",
        "Scarlet Witch", "Rocket Raccoon", "Black Widow", "Punisher", "Silver Surfer", "Vision", "Hawkeye", "Gambit", "Jean Grey", "Nightcrawler",
        "Professor X", "Winter Soldier", "Cable", "Colossus", "Drax", "Odin", "Gamora", "Thing", "Blade", "Human Torch", "Nova"];

    init();

    $(".searchDropdownBar").on("submit", function (event) {
        event.preventDefault();
        searchComicCharacter($(".characterSelect").val());
        giphyF($(".characterSelect").val());
    })

    function createSearchOptions() {
        for (var characterCount = 0; characterCount < characterList.length; characterCount++) {
            var characterOption = $("<option>").val(characterList[characterCount]).text(characterList[characterCount]);
            $(".characterSelect").append(characterOption);
        }
    }

    function searchComicCharacter(searchResult) {
        var marvelQueryURL = "https://gateway.marvel.com/v1/public/characters?name=" + searchResult + "&ts=1&apikey=" + apiMarvelKey + "&hash=" + hash;
        // https://gateway.marvel.com/v1/public/characters?name=cyclops&ts=1&apikey=97a93e9e494106d892973948f5b253d9&hash=c32debe50244fc7a722036892da77e19
        $.ajax({
            url: marvelQueryURL,
            method: "GET",
        }).then(function (data) {
            $("#characterName").text(data.data.results[0].name);
            $("#characterDescription").text(data.data.results[0].description);
            var wikiaLink = data.data.results[0].urls[1].url;
            $("#wikiaLink").attr("href", wikiaLink).text("Wikia Link");
            var imageLink = data.data.results[0].thumbnail.path + "." + data.data.results[0].thumbnail.extension;
            $("#heroPic").attr("src", imageLink).attr("class", "characterProfileImage")
            if (!characterSearchHistory.includes(data.data.results[0].name)) {
                characterSearchHistory.unshift(data.data.results[0].name);
                createButtons();
                localStorage.setItem("buttons", JSON.stringify(characterSearchHistory));
            }
            //Records the last searched character and stores to local storage
            localStorage.setItem("lastSearched", data.data.results[0].name);
        })
    }

    function init() {
        var storedButtons = JSON.parse(localStorage.getItem("buttons"));
        if (storedButtons !== null) {
            characterSearchHistory = storedButtons;
        }
        createButtons();
        searchComicCharacter(localStorage.getItem("lastSearched"));
        //
        createSearchOptions();
    }

    //Creates the character buttons
    function createButtons() {
        $(".searchHistory").empty();
        for (var buttonCount = 0; buttonCount < characterSearchHistory.length; buttonCount++) {
            var characterButtonEl = $("<button>").attr("value", characterSearchHistory[buttonCount]).text(characterSearchHistory[buttonCount]);
            characterButtonEl.attr("class", "characterButton button is-warning");
            var deleteButtonEl = $("<button>").attr("value", characterSearchHistory[buttonCount]).attr("class", "deleteButton button is-danger is-outlined");
            var spanEl = $("<span>").attr("class", "icon is-small");
            var iconEl = $("<i>").attr("class", "fas fa-times");
            var buttonContainer = $("<div>").attr("class", "field is-grouped");
            buttonContainer.append(characterButtonEl);
            buttonContainer.append(deleteButtonEl);
            spanEl.append(iconEl);
            deleteButtonEl.append(spanEl);
            $(".searchHistory").append(buttonContainer);
        }
    }

    //Delete button for character buttons - ERIC
    $(".searchHistory").on("click", ".deleteButton", function () {
        characterSearchHistory.splice(characterSearchHistory.indexOf($(this).val()), 1)
        createButtons();
        localStorage.setItem("buttons", JSON.stringify(characterSearchHistory));
    })

    $(".searchHistory").on("click", ".characterButton", function () {
        searchComicCharacter($(this).val());
        giphyF($(this).val());
    })

    //Search Bar
    // $(".searchBar").on("submit", function (event) {
    //     event.preventDefault();
    //     searchComicCharacter($(".searchInput").val());
    //     $(".searchInput").val("");
    //     giphyF($(".searchInput").val());
    // })

    function giphyF(searchResult) {
        //giphy API
        var giphyQueryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + apiGiphyKey + "&q=marvel " + searchResult + "&limit=25&offset=&rating=g&lang=en";
        //console.log(giphyQueryURL);
        $.ajax({
            url: giphyQueryURL,
            method: "GET",
        }).then(function (data) {
            // $(".giphyDump").text(JSON.stringify(data, null, 4));
            console.log(giphyQueryURL);
            //for (i = 0; i < 10; i++) {
            var giphy = data.data[0].images.original.url;
            var giphya = data.data[1].images.original.url;
            var giphyb = data.data[2].images.original.url;
            var giphyc = data.data[3].images.original.url;
            var giphyd = data.data[4].images.original.url;
            var giphye = data.data[5].images.original.url;
            var giphyf = data.data[6].images.original.url;
            var giphyg = data.data[7].images.original.url;
            var giphyh = data.data[8].images.original.url;
            var giphyi = data.data[9].images.original.url;
            $("#giphy1").attr("src", giphy)
            $("#giphy2").attr("src", giphya)
            $("#giphy3").attr("src", giphyb)
            $("#giphy4").attr("src", giphyc)
            $("#giphy5").attr("src", giphyd)
            $("#giphy6").attr("src", giphye)
            $("#giphy7").attr("src", giphyf)
            $("#giphy8").attr("src", giphyg)
            $("#giphy9").attr("src", giphyh)
            $("#giphy10").attr("src", giphyi)


            // }

        })
    }



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
