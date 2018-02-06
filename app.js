  $(document).ready(function(){
    console.log("document loaded");
});

$(".btn").on("click", function() {
    //Prevents the document from reloading
    event.preventDefault();

    //Global variables
    var apiKey = "feec332cd3344e9226a7105dd29cc5dae84c154d";
    var comicName = $("#comicSearch").val().trim();
    var queryURL = "https://comicvine.gamespot.com/api/characters/?api_key=" + apiKey + "&filter=name:" + comicName + "&format=json";
    var proxy = 'https://cors-anywhere.herokuapp.com/';
    

    //AJAX API call to ComicVine    
    $.ajax({
      url: proxy + queryURL,
      method: 'GET'
    }).done(function(response) {
      console.log(response.results);
      // debugger;
      console.log("The user input is: " + comicName);   
        for (var i = 0; i < response.results.length; i++) {
        //     debugger;
            var aliasString = response.results[i].name;
            var lcAliasString = aliasString.toLowerCase();
            // console.log(lcAliasString);
            var enter = '\n';

            var arrayOfStrings = lcAliasString.split(enter);
            
            var index = arrayOfStrings.indexOf(comicName);
            console.log(arrayOfStrings);
            console.log(index);

        //  // console.log(response.results);
        //  //    var resultName = response.results[i].aliases;
        //  //    console.log(resultName);
        //  //    var lcResultName = resultName.toLowerCase();
        //  //    var lcComicName = comicName.toLowerCase();


        //  //    // var result = lcResultName.match(/lcComicName/);
        //  //    var result= lcResultName.search(new RegExp(lcComicName, "i"));
        //     // var result = resultName.match(/comicName/i);
        //     // var result = resultName.toLowerCase().indexOf(comicName);
        //     // if (result != -1 && (resultName.length === comicName.length)) {
               if (index != -1) { 
                console.log(response.results[i].name);
            }
            
        //     // if (result) {
        //     //     console.log(response.results[i].name);
        //     // }
        }

    });
});

// var string = "Stackoverflow is the BEST";
// var result = string.match(/best/i);
// // result == 'BEST';

// if (result){
//     alert('Matched');
// }

// var result= string.search(new RegExp(searchstring, "i"));

// var string="Stackoverflow is the BEST"; 
// var searchstring="best";

// // lowercase both strings
// var lcString=string.toLowerCase();
// var lcSearchString=searchstring.toLowerCase();

// var result = lcString.indexOf(lcSearchString)>=0;
// alert(result);

// $("#comicImage").attr("src", response.results[0].image.original_url);

// var result = response.results[i].name.search(new RegExp(comicName, "i"));
            // var result = response.results[i].image.original_url;

// function splitString(stringToSplit, separator) {
//   var arrayOfStrings = stringToSplit.split(separator);

//   console.log('The original string is: "' + stringToSplit + '"');
//   console.log('The separator is: "' + separator + '"');
//   console.log('The array has ' + arrayOfStrings.length + ' elements: ' + arrayOfStrings.join(' / '));
// }

// var tempestString = 'Oh brave new world that has such people in it.';
// var monthString = 'Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec';

// var space = ' ';
// var comma = ',';

// splitString(tempestString, space);
// splitString(tempestString);
// splitString(monthString, comma);            

  




// splitString(aliasString, enter);
// splitString(tempestString);
// splitString(monthString, comma);            

