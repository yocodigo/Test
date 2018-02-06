$(document).ready(function() {
console.log("document loaded");

    function modal() {
        $('#myModal').modal('show');
    }

    $("#characterInput").on("click", function() {
        //Prevents the document from reloading
        event.preventDefault();

        //Global variables
        var apiKey = "feec332cd3344e9226a7105dd29cc5dae84c154d";
        var comicName = $("#comicSearch").val().trim();
        var queryURL = "https://comicvine.gamespot.com/api/characters/?api_key=" + apiKey + "&filter=name:" + comicName + "&limit=10&format=json";
        
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
                
                //Targets character key
                var characterName = character.name; 
                
                //Targets publisher key
                var characterPublisher = character.publisher;
                
                //Targets publisher name key
                var publisherName = characterPublisher.name;   
                
                //Lower cases the returned string 
                var lcCharacterName = characterName.toLowerCase();
                
                //Lower cases the user input string
                var lcComicName = comicName.toLowerCase();

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

            if (isMarvel) {
                $("#characterName").text(characterName);
                $("#realName").text(character.real_name);
                $("#birthDate").text(character.birth);
                $("#description").html(character.description);
                // $(".slide").html("src", character.image.medium_url);
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