$(document).ready(function() {
console.log("document loaded");

    function modal() {
        $('#myModal').modal('show');
    }

    $("#inputButton").on("click", function() {
        //Prevents the document from reloading
        event.preventDefault();

        //Global variables
        var apiKey = "feec332cd3344e9226a7105dd29cc5dae84c154d";
        var comicName = $("#characterInput").val().trim();

        $("#characterInput").text("");

        var queryURL = "https://comicvine.gamespot.com/api/characters/?api_key=" + apiKey + "&filter=name:" + comicName + "&limit=100&format=json";
        
        // var queryURL = "https://comicvine.gamespot.com/api/series_list/?api_key=" + apiKey + "&format=json";
        var proxy = 'https://cors-anywhere.herokuapp.com/';
            
        //Boolean variable for character matching
        var charFound = false;

        //Boolean variable for publisher matching
        var isMarvel = false;

        //AJAX API call to ComicVine    
        $.ajax({
          url: proxy + queryURL,
          method: 'GET'
        }).done(function(response) {
          console.log(response.results);

            for (var i = 0; i < response.results.length; i++) {
                // debugger;
                var character = response.results[i];
                // console.log(character);
                //Targets character key
                var characterName = character.name; 
                
                //Targets publisher key
                var characterPublisher = character.publisher;
                
                var characterImage = character.image.original_url;
                // console.log(characterImage);
                
                //Targets publisher name key
                var publisherName = characterPublisher.name;   
                
                //Lower cases the returned string 
                var lcCharacterName = characterName.toLowerCase();
                // console.log(lcCharacterName);
                
                //Lower cases the user input string
                var lcComicName = comicName.toLowerCase();
                console.log(lcComicName);
                
                //Assigns the response id value to originId
                var originId = response.results[i].id;

                if (lcCharacterName === lcComicName) {     
                    charFound = true;
                    break;
                }
            }
            
            if (charFound) {
                 if (publisherName === "Marvel") {
                    isMarvel = true;
                }
                 else {
                   modal();
                }
            }
            console.log(characterImage);
            if (isMarvel) {
                $("#characterName").text("Character Name: " + characterName);
                //Add name to slide 1
                $("#marvel1").text(characterName);
                $("#realName").text("Real Name: " + character.real_name);
                $("#birthDate").text("Birth Date: " + character.birth);
                // $("#description").html("<div>" + character.description + "</div>");
                $("#character_bio").append("<div>" + character.description + "</div>");
                // $(".slide1").css("background-image", "url(characterImage)");
                $(".slide1").html("<img src=" + characterImage + " height=" + 500 + " width=" + 806.25 + "></img>");
            }
        });
    });
});

//ALTERNATIVE ALIAS CODE
// console.log(lcComicName);
            // var characterAlias = response.results[i].aliases;    

            // var lcCharacterAlias = characterAlias.toLowerCase();

            // var enter = '\n';

            // var arrayOfAlias = lcCharacterAlias.split(enter);
            
            // var index = arrayOfAlias.indexOf(comicName);