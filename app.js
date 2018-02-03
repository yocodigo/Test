 $(document).ready(function(){

    $('#moviesView').hide();
    $('#comicsView').hide();

    var marvel = {
        phaseOne: [{
                title: "Iron Man",
                imdb: "tt0371746",
                character: "Iron Man",
            },
            {   title: "The Incredible Hulk",
                imdb: "tt0800080",
                character: "Hulk"
            },
            {   title: "Iron Man 2",
                imdb: "tt1228705",
                character: "Iron Man",
            },
            {   title: "Thor",
                imdb: "tt0800369",
                character: "Thor",
            },
            {   title: "Captain America: The First Avenger",
                imdb: "tt0800369",
                character: "Captain America",
            },
            {   title: "The Avengers",
                imdb: "tt0848228",
                character: "Avengers",
            }],

        phaseTwo: [{
                title: "Iron Man 3",
                imdb: "tt1300854",
                character: "Iron Man",
            },
            {   title: "Thor: The Dark World",
                imdb: "tt1981115",
                character: "Thor",
            },
            {   title: "Captain America: The Winter Soldier",
                imdb: "tt1843866",
                character: "Captain America",
            },
            {   title: "Guardians of the Galaxy",
                imdb: "tt2015381",
                character: "Guardians of the Galaxy",
            },
            {   title: "Avengers: Age of Ultron",
                imdb: "tt2395427",
                character: "Ultron",
            },
            {   title: "Ant-Man",
                imdb: "tt0478970",
                character: "Hank Pym",
            }],

        phaseThree: [{
                title: "Captain America: Civil War",
                imdb: "tt3498820",
                character: "Captain America",
            },
            {   title: "Doctor Strange",
                imdb: "tt1211837",
                character: "Doctor Strange",
            },
            {   title: "Guardians of the Galaxy",
                imdb: "tt3896198",
                character: "Groot",
            },
            {   title: "Thor: Ragnarok",
                imdb: "tt3501632",
                character: "Thor",
            },
            {   title: "Black Panther",
                imdb: "tt1825683",
                character: "Black Panther",
            },
            {   title: "Avengers: Infinity War - Part One",
                imdb: "tt4154756",
                character: "Thanos",

            }],
    };

    $(".headline").on("click", function () {
        $('#moviesView').html("");
        $('#comicsView').html("");
        $('#moviesView').show();
        $('#comicsView').show();
        var movie = $(this).attr('data-imdb');
        var queryURL = "http://www.omdbapi.com/?i=" + movie + "&plot=full&r=json";
        $.ajax({url: queryURL, method: 'GET'}).done(function(response) {
            console.log(movie);
            console.log(response);

            var movieDiv = $('<div class="movieDiv">');
            makeElem('<h1 class = "infoTitle">', 'Movie Info', movieDiv)
            if (response.Poster != 'N/A'){
                var image = $('<img>').attr("src", response.Poster);
                movieDiv.append(image);
            }
            makeElem('<h3>', response.Title, movieDiv)
            
            makeElem('<p>', "Director: "+ response.Director, movieDiv)
            makeElem('<p>', "Writer: "+ response.Writer, movieDiv)
            makeElem('<p>', "Actors: "+ response.Actors, movieDiv)
            makeElem('<p>', "Rating: " + response.Rated, movieDiv)
            makeElem('<p>', "Released: " + response.Released, movieDiv)
            makeElem('<p>', "Plot: " + response.Plot, movieDiv)
            
            $('#moviesView').prepend(movieDiv);
        }); 
        
        var characterName = $(this).attr('data-character');
    // Variables needed for the hash
        var ts = new Date().getTime(); 
        var PRIV_KEY = "3499aabd8ee3bb9d5eecc7291c61677eb88ed4f6"
        var API_KEY = "665fa53043b7e63a68ee728c296f464a";
        var hash = CryptoJS.MD5(ts+PRIV_KEY + API_KEY);
    // apikey for the end of the url
        var apiKey = "665fa53043b7e63a68ee728c296f464a";
    // url to pass through the ajax call
        var url = "https://gateway.marvel.com/v1/public/characters?name=" + characterName + "&ts=" + ts + "&hash=" + hash + "&apikey=" + apiKey;
        console.log(url); // console log of url
    // ajax call
        $.ajax({ url: url, method: "GET" }).done(function(data) {
        // console.log(data);  // console log of full data return
    // drilling down to the needed data and place in a variable
            var refinedResults = data.data.results[0];
            console.log(characterName); // console log of hero name
            console.log(refinedResults); // console log of comic result
    // Useful results from refinded results
            // 1. comics --  its an object, a resource list containing comics which feature this character.
            // 2. description -- description of the comic, a short bio or description of the character.             
            // 3. events --  its an object, a resource list of events in which this character appears.
            // 4. name -- name of the comic, the name of the character.,
            // 5. series --  its an object, a resource list of series in which this character appears.
            // 6. stories --  its an object, a resource list of stories in which this character appears.
            // 7. thumbnail  --  its an object, a representative image for this character.
    // store the refined results in variables
            var comicResults = refinedResults.comics.items; // comics object
            var descriptionResults = refinedResults.description; // description item
            var eventsResults = refinedResults.events.items; // events object
            var nameResults = refinedResults.name; // name item
            var seriesResults = refinedResults.series.items; // series object
            var storiesResults = refinedResults.stories.items; // stories object
            var thumbnailResultsPath = refinedResults.thumbnail.path; // thumbnail path item
            var thumbnailResultsExtension = refinedResults.thumbnail.extension; // thumbnail extension item
            var thumbnailResults = thumbnailResultsPath + "." +thumbnailResultsExtension; // thumbnail concatinated item

    // creating a div for the comic info to go in
            var comicDiv = $('<div class="comicDiv">');
            makeElem('<h1 class="infoTitle">', "Comic Info", comicDiv);
            if (thumbnailResults != "N/A"){
                var image = $("<img>").attr("src", thumbnailResults);
                image.addClass("images");
                comicDiv.append(image);
            }
            makeElem("<h3>", nameResults, comicDiv);
            // gets the plot of the comic if there is one
            if (descriptionResults != ""){
                makeElem("<p>", "Comic Plot: " + descriptionResults, comicDiv);
            }
            // gets the image of the comic if there is one
            
    // injecting comic info to html doc
            $("#comicsView").prepend(comicDiv);
         });


   })

    function displayPhase () {
        
        for (var i = 0; i < marvel.phaseOne.length; i++) {

            var marvelLi = $('<li class="pull">');
            makeElem('<a href="#">', marvel.phaseOne[i].title, marvelLi)
            marvelLi.attr("data-imdb", marvel.phaseOne[i].imdb)
            marvelLi.attr("data-character", marvel.phaseOne[i].character)
            $("#pOne").append(marvelLi);
        }

        for (var i = 0; i < marvel.phaseTwo.length; i++) {
            var marvelLi = $('<li class="pull">');
            makeElem('<a href="#">', marvel.phaseTwo[i].title, marvelLi)
            marvelLi.attr("data-imdb", marvel.phaseTwo[i].imdb)
            marvelLi.attr("data-character", marvel.phaseTwo[i].character)
            $("#pTwo").append(marvelLi);
        }

        for (var i = 0; i < marvel.phaseThree.length; i++) {
            var marvelLi = $('<li class="pull">');
            makeElem('<a href="#">', marvel.phaseThree[i].title, marvelLi)
            marvelLi.attr("data-imdb", marvel.phaseThree[i].imdb)
            marvelLi.attr("data-character", marvel.phaseThree[i].character)
            $("#pThree").append(marvelLi);
        }
    }

    // omdb drop down call
   $(document).on("click", ".pull", function (){
        $('#moviesView').html("");
        $('#moviesView').show();
        var movie = $(this).attr('data-imdb');
        var queryURL = "http://www.omdbapi.com/?i=" + movie + "&plot=full&r=json";
        $.ajax({url: queryURL, method: 'GET'}).done(function(response) {
            console.log(movie);
            console.log(response);
    // creating a div for the movie info to go in
            var movieDiv = $('<div class="movieDiv">');
            makeElem('<h1 class = "infoTitle">', 'Movie Info', movieDiv)
            if (response.Poster != 'N/A'){
                var image = $('<img>').attr("src", response.Poster);
                movieDiv.append(image);
            }
            makeElem('<h3>', response.Title, movieDiv)
            
            makeElem('<p>', "Director: "+ response.Director, movieDiv)
            makeElem('<p>', "Writer: "+ response.Writer, movieDiv)
            makeElem('<p>', "Actors: "+ response.Actors, movieDiv)
            makeElem('<p>', "Rating: " + response.Rated, movieDiv)
            makeElem('<p>', "Released: " + response.Released, movieDiv)
            makeElem('<p>', "Plot: " + response.Plot, movieDiv)
            
            $('#moviesView').prepend(movieDiv);
        }); 
   })
    // marvel drop down call
    $(document).on("click", ".pull", function (){
        $('#comicsView').html("");
        $('#comicsView').show();
        var characterName = $(this).attr('data-character');
    // Variables needed for the hash
        var ts = new Date().getTime(); 
        var PRIV_KEY = "3499aabd8ee3bb9d5eecc7291c61677eb88ed4f6"
        var API_KEY = "665fa53043b7e63a68ee728c296f464a";
        var hash = CryptoJS.MD5(ts+PRIV_KEY + API_KEY);
    // apikey for the end of the url
        var apiKey = "665fa53043b7e63a68ee728c296f464a";
    // url to pass through the ajax call
        var url = "https://gateway.marvel.com/v1/public/characters?name=" + characterName + "&ts=" + ts + "&hash=" + hash + "&apikey=" + apiKey;
        console.log(url); // console log of url
    // ajax call
        $.ajax({ url: url, method: "GET" }).done(function(data) {
        // console.log(data);  // console log of full data return
    // drilling down to the needed data and place in a variable
            var refinedResults = data.data.results[0];
            console.log(characterName); // console log of hero name
            console.log(refinedResults); // console log of comic result
    // Useful results from refinded results
            // 1. comics --  its an object, a resource list containing comics which feature this character.
            // 2. description -- description of the comic, a short bio or description of the character.             
            // 3. events --  its an object, a resource list of events in which this character appears.
            // 4. name -- name of the comic, the name of the character.,
            // 5. series --  its an object, a resource list of series in which this character appears.
            // 6. stories --  its an object, a resource list of stories in which this character appears.
            // 7. thumbnail  --  its an object, a representative image for this character.
    // store the refined results in variables
            var comicResults = refinedResults.comics.items; // comics object
            var descriptionResults = refinedResults.description; // description item
            var eventsResults = refinedResults.events.items; // events object
            var nameResults = refinedResults.name; // name item
            var seriesResults = refinedResults.series.items; // series object
            var storiesResults = refinedResults.stories.items; // stories object
            var thumbnailResultsPath = refinedResults.thumbnail.path; // thumbnail path item
            var thumbnailResultsExtension = refinedResults.thumbnail.extension; // thumbnail extension item
            var thumbnailResults = thumbnailResultsPath + "." +thumbnailResultsExtension; // thumbnail concatinated item

    // creating a div for the comic info to go in
            var comicDiv = $('<div class="comicDiv">');
            makeElem('<h1 class="infoTitle">', "Comic Info", comicDiv);
            if (thumbnailResults != "N/A"){
                var image = $("<img>").attr("src", thumbnailResults);
                image.addClass("images");
                comicDiv.append(image);
            }
            makeElem("<h3>", nameResults, comicDiv);
            // gets the plot of the comic if there is one
            if (descriptionResults != ""){
                makeElem("<p>", "Comic Plot: " + descriptionResults, comicDiv);
            }
            // gets the image of the comic if there is one
            
    // injecting comic info to html doc
            $("#comicsView").prepend(comicDiv);
         });
    })

//  Doesn't Work Yet
    // function wikia() {
    //  var articleID = 7139;
    //  var queryURL = "http://marvel.wikia.com/api/v1/Articles/AsSimpleJson?id=" + articleID;
    //  // http://marvel.wikia.com/api/v1/Articles/AsSimpleJson?id=7139
    //  console.log(queryURL);
    //  $.ajax({url: queryURL, method: 'GET'}).done(function(response) {
    //      console.log(response);
    //      var wikiaDiv = $('<div class = "wikiaDiv">');
    //      makeElem('<p>','<b>Character Info</b>', wikiaDiv)
    //      makeElem('<p>',response.sections.title, wikiaDiv)

    //  $('#wikiaView').prepend(wikiaDiv);
 //         });
 //     };
    

// make new element function
    function makeElem(type, data, elemToappendTo){
        var childElem = $(type).text(data);
        elemToappendTo.append(childElem);
    }

// display movie info function
    function displayMovieInfo(){
    // grabbing user input
        var movie = $('#characterSearch').val().trim();
    // url to pass through the ajax call
        var queryURL = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&r=json";
        $.ajax({url: queryURL, method: 'GET'}).done(function(response) {
            console.log(movie);
            console.log(response);
    // creating a div for the movie info to go in
            var movieDiv = $('<div class="movieDiv">');
            makeElem('<h1 class = "infoTitle">', 'Movie Info', movieDiv)
            if (response.Poster != 'N/A'){
                var image = $('<img>').attr("src", response.Poster);
                movieDiv.append(image);
            }
            makeElem('<h3>', response.Title, movieDiv)
            
            makeElem('<p>', "Director: "+ response.Director, movieDiv)
            makeElem('<p>', "Writer: "+ response.Writer, movieDiv)
            makeElem('<p>', "Actors: "+ response.Actors, movieDiv)
            makeElem('<p>', "Rating: " + response.Rated, movieDiv)
            makeElem('<p>', "Released: " + response.Released, movieDiv)
            makeElem('<p>', "Plot: " + response.Plot, movieDiv)
            
            $('#moviesView').prepend(movieDiv);
        }); 
    }
// display comic info function
    function displayComicInfo() {
    // grabbing user input
        var characterName = $('#characterSearch').val();
    // Variables needed for the hash
        var ts = new Date().getTime(); 
        var PRIV_KEY = "3499aabd8ee3bb9d5eecc7291c61677eb88ed4f6"
        var API_KEY = "665fa53043b7e63a68ee728c296f464a";
        var hash = CryptoJS.MD5(ts+PRIV_KEY + API_KEY);
    // apikey for the end of the url
        var apiKey = "665fa53043b7e63a68ee728c296f464a";
    // url to pass through the ajax call
        var url = "https://gateway.marvel.com/v1/public/characters?name=" + characterName + "&ts=" + ts + "&hash=" + hash + "&apikey=" + apiKey;
        console.log(url); // console log of url
    // ajax call
        $.ajax({ url: url, method: "GET" }).done(function(data) {
        // console.log(data);  // console log of full data return
    // drilling down to the needed data and place in a variable
            var refinedResults = data.data.results[0];
            console.log(characterName); // console log of hero name
            console.log(refinedResults); // console log of comic result
    // Useful results from refinded results
            // 1. comics --  its an object, a resource list containing comics which feature this character.
            // 2. description -- description of the comic, a short bio or description of the character.             
            // 3. events --  its an object, a resource list of events in which this character appears.
            // 4. name -- name of the comic, the name of the character.,
            // 5. series --  its an object, a resource list of series in which this character appears.
            // 6. stories --  its an object, a resource list of stories in which this character appears.
            // 7. thumbnail  --  its an object, a representative image for this character.
    // store the refined results in variables
            var comicResults = refinedResults.comics.items; // comics object
            var descriptionResults = refinedResults.description; // description item
            var eventsResults = refinedResults.events.items; // events object
            var nameResults = refinedResults.name; // name item
            var seriesResults = refinedResults.series.items; // series object
            var storiesResults = refinedResults.stories.items; // stories object
            var thumbnailResultsPath = refinedResults.thumbnail.path; // thumbnail path item
            var thumbnailResultsExtension = refinedResults.thumbnail.extension; // thumbnail extension item
            var thumbnailResults = thumbnailResultsPath + "." +thumbnailResultsExtension; // thumbnail concatinated item

    // creating a div for the comic info to go in
            var comicDiv = $('<div class="comicDiv">');
            makeElem('<h1 class="infoTitle">', "Comic Info", comicDiv);
            if (thumbnailResults != "N/A"){
                var image = $("<img>").attr("src", thumbnailResults);
                image.addClass("images");
                comicDiv.append(image);
            }
            makeElem("<h3>", nameResults, comicDiv);
            // gets the plot of the comic if there is one
            if (descriptionResults != ""){
                makeElem("<p>", "Comic Plot: " + descriptionResults, comicDiv);
            }
            // gets the image of the comic if there is one
            
    // injecting comic info to html doc
            $("#comicsView").prepend(comicDiv);
         });
    }



// -----------------------------------------------------------------------------------------------------------------------------------------------------           
    $('#characterSubmit').on('click', function(){
    // clear the previous infomation with each button click
        $('#moviesView').html("");
        $('#comicsView').html("");
        $('#moviesView').show();
        $('#comicsView').show();
    // display info if movic and comic areas
        displayMovieInfo();
        displayComicInfo();
    });
    displayPhase ();    
});