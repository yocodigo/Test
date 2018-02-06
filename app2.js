  $(document).ready(function(){
    console.log("document loaded");
});

$(".btn").on("click", function() {
    //Prevents the document from reloading
    event.preventDefault();

    //Global variables
    var apiKey = "feec332cd3344e9226a7105dd29cc5dae84c154d";
    var comicName = $("#comicSearch").val().trim();
    var queryURL = "https://comicvine.gamespot.com/api/characters/?api_key=" + apiKey + "&filter=name:" + comicName + "&limit=10&format=json";
    // var queryURL = "https://comicvine.gamespot.com/api/series_list/?api_key=" + apiKey + "&format=json";
    var proxy = 'https://cors-anywhere.herokuapp.com/';
    
    // Get the modal
    var modal = $('myModal');

    // Get the button that opens the modal
    var btn = $("myBtn");

    // Get the <span> element that closes the modal
    var span = $("close")[0]; 

    //AJAX API call to ComicVine    
    $.ajax({
      url: proxy + queryURL,
      method: 'GET'
    }).done(function(response) {
      console.log(response.results);
      // debugger;
      // console.log("The user input is: " + comicName);   
      // console.log(response.results[i]);
        for (var i = 0; i < response.results.length; i++) {
            // debugger;
            var character = response.results[i];
            var characterName = character.name; 
            var characterPublisher = character.publisher;
            var publisherName = characterPublisher.name;   
            // console.log(index);
            var lcCharacterName = characterName.toLowerCase();
            // console.log(lccharacterName);
            var lcComicName = comicName.toLowerCase();
            

            if (publisherName === "Marvel") {

                if (lcCharacterName === lcComicName) { 
                
                // console.log(characterName);
                $(".name").text(characterName);
                $(".realName").text(character.real_name);
                $(".birth").text(character.birth);
                $(".description").text(character.deck);
                $("img").attr("src", character.image.medium_url);
                }
            }
            else {
                $("#modal").css("display","block");
                $("close").click(function() {
                $("#modal").css("display", "none");
                }); 
            }
                          
 
        }
        
    });
});

//ALTERNATIVE MODAL CODE
// Get the modal
// var modal = document.getElementById('myModal');

// // Get the button that opens the modal
// var btn = document.getElementById("myBtn");

// // Get the <span> element that closes the modal
// var span = document.getElementsByClassName("close")[0];

// // When the user clicks the button, open the modal 
// btn.onclick = function() {
//     modal.style.display = "block";
// }

// // When the user clicks on <span> (x), close the modal
// span.onclick = function() {
//     modal.style.display = "none";
// }

// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//     if (event.target == modal) {
//         modal.style.display = "none";
//     }
// }