$(function () {
    //Marvel API
    var apiMarvelKey = "97a93e9e494106d892973948f5b253d9";
    var otherComicAPIKey = "10224034962282884";
    var hash = "c32debe50244fc7a722036892da77e19";
    var characterSearchHistory = [];
    var apiGiphyKey = "SL7Npc8K1yEe9sZwG498E44VaNV52n7A";
    var characterList = ["Thor", "Spider-Man", "Deadpool", "Iron Man", "Hulk", "Wolverine", "Captain America", "Doctor Strange", "Black Panther", "Groot",
        "Scarlet Witch", "Rocket Raccoon", "Black Widow", "Punisher", "Silver Surfer", "Vision", "Hawkeye", "Gambit", "Jean Grey", "Nightcrawler",
        "Professor X", "Winter Soldier", "Cable", "Colossus", "Drax", "Odin", "Gamora", "Thing", "Blade", "Human Torch", "Nova"];
    var offsetNum = 0;
    var acceptedGIFs = [];
    var intelligenceVal = 0;
    var strengthVal = 0;
    var speedVal = 0;
    var durabilityVal = 0;
    var powerVal = 0;
    var combatVal = 0;
    var ctx = $("#radarChart");
    var radarChart = {
        type: "radar",
        data: {
            labels: ["Intelligence", "Strength", "Speed", "Durability", "Power", "Combat"],
            datasets: [{
                data: [intelligenceVal, strengthVal, speedVal, durabilityVal, powerVal, combatVal],
                pointBackgroundColor: [
                    "rgba(199, 75, 246, 0.7)",   //Intelligence
                    "rgba(248, 113, 46, 0.7)",    //Strength
                    "rgba(255, 234, 86, 0.7)",    //Speed
                    "rgba(50, 151, 255, 0.7)",   //Durability
                    "rgba(222, 33, 16, 0.7)",   //Power
                    "rgba(84, 202, 149, 0.7)"],  //Combat
                fill: true,
                backgroundColor: "rgba(237, 29, 36, 0.3)"
            }]
        },
        options: {
            responsive: false,
            maintainAspectRatio: true,
            scale: {
                ticks: {
                    beginAtZero: true,
                    max: 5
                },
                pointLabels: {
                    fontColor: [
                        "rgba(199, 75, 246, 1)",   //Intelligence
                        "rgba(248, 113, 46, 1)",    //Strength
                        "rgba(255, 234, 86, 1)",    //Speed
                        "rgba(50, 151, 255, 1)",   //Durability
                        "rgba(222, 33, 16, 1)",   //Power
                        "rgba(84, 202, 149, 1)"   //Combat
                    ],
                    fontSize: 15
                }
            },
            legend: {
                display: false
            },
            tooltips: {
                enabled: false
            }
        }
    };
    var myRadarChart = new Chart(ctx, radarChart);

    init();

    //Creates chart with each character's stats such as intelligence, strength, speed - ERIC
    function createRadarChart(searchResult) {
        var comicCharacterQueryURL = "https://www.superheroapi.com/api.php/" + otherComicAPIKey + "/search/" + searchResult;
        $.ajax({
            url: comicCharacterQueryURL,
            method: "GET",
        }).then(function (data) {
            intelligenceVal = parseInt(data.results[0].powerstats.intelligence) / 20;
            strengthVal = parseInt(data.results[0].powerstats.strength) / 20;
            speedVal = parseInt(data.results[0].powerstats.speed) / 20;
            durabilityVal = parseInt(data.results[0].powerstats.durability) / 20;
            powerVal = parseInt(data.results[0].powerstats.power) / 20;
            combatVal = parseInt(data.results[0].powerstats.combat) / 20;

            radarChart.data.datasets[0].data = [intelligenceVal, strengthVal, speedVal, durabilityVal, powerVal, combatVal];
            myRadarChart.update();
        })
    }

    $(".searchBar").on("submit", function (event) {
        event.preventDefault();
        searchComicCharacter($(".characterSelect").val());
        offsetNum = 0;
        acceptedGIFs = [];
        giphyF($(".characterSelect").val());
        createRadarChart($(".characterSelect").val());
        $(".characterSelect").val("");
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

    var storedButtons;
    function init() {
        storedButtons = JSON.parse(localStorage.getItem("buttons"));
        if (storedButtons !== null) {
            characterSearchHistory = storedButtons;
        }
        createButtons();
        searchComicCharacter(localStorage.getItem("lastSearched"));
        // ^^^ if we do marvel-specific placehoder, might want to remove above line!
        createSearchOptions();
        searchComicCharacter(localStorage.getItem("lastSearched"));
        giphyF(localStorage.getItem("lastSearched"));
        createRadarChart(localStorage.getItem("lastSearched"));
    }

    //Creates the character buttons
    function createButtons() {
        if (characterSearchHistory.length > 0) {
            $(".searchHistoryHeader").text("Search History");
            $("#searchHistoryNavbar").attr("class", "navbar-burger");
            $("#searchHistory").attr("class", "card p-3 searchHistory is-align-content-stretch");
        }
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
        offsetNum = 0;
        acceptedGIFs = [];
        giphyF($(this).val());
        createRadarChart($(this).val());
    })

    // toggles the search history on mobile version

    $(".navigation").on("click", ".navbar-burger", function () {
        // $(".navbar-menu").toggleClass("is-active");
        if ($(".navbar-menu").attr("display", "none")) {
            $(".navbar-menu").attr("display", "inline-flex");
        } else if ($(".navbar-menu").attr("display", "inline-flex")) {
            $(".navbar-menu").attr("display", "none");
        }

        //toggle attribute display:none
        // $(".navbar-menu").toggleClass("is-active");     //toggle attribute display: inline-flex

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
        var giphyQueryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + apiGiphyKey + "&q=marvel " + searchResult + "&limit=25&offset=" + offsetNum + "&rating=g&lang=en";
        $(".GIFspot").empty();
        $(".GIFheader").empty();

        $.ajax({
            url: giphyQueryURL,
            method: "GET",
        }).then(function (data) {

            // filter system that looks at the GIF title to verify that the GIF is relevant to the superhero

            for (var i = 0; i < data.pagination.count; i++) {
                var GIFtitle = data.data[i].title.toLowerCase();
                // console.log(GIFtitle);

                if (acceptedGIFs.length < 10) {
                    if (GIFtitle.indexOf(searchResult.toLowerCase()) !== -1 && GIFtitle.indexOf((searchResult + "s").toLowerCase()) === -1) {
                        //makes sure that the superhero is in the title; makes sure that hero name is not actually referring to sports team
                        acceptedGIFs.push(data.data[i].images.original.url);
                    }
                }
            }
            // gets all GIFs from search with superhero in the title

            //accepted gifs no longer getting into array! b/c not getting to 10 GIFs! ==> dont think loop is working? Brute it first...
            // want it to stop when it stops getting GIFs (b/c SOMETHING IS STOPPING IT)    or it's not looping even once ==> no print (not enough)

            if (acceptedGIFs.length >= 10 || offsetNum >= 125) {
                $(".GIFheader").append("<h3 id='GIFheader'> Action Shots </h3>");

                for (var i = 0; i < acceptedGIFs.length; i++) {
                    $(".GIFspot").append("<img src=" + acceptedGIFs[i] + " class='m-3'>");
                }
            }

            if (acceptedGIFs.length < 10 && offsetNum < 125) {
                offsetNum += 25;
                giphyF(searchResult);
                // sends additional ajax requests if there weren't enough GIFs grabbed; stops after 5 additional searches
            }
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
