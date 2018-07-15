$(document).ready(function(){


var giphyarray=["cat","dog","horses"];
var array;
$("#add-animal").on("click",function(){
    
    event.preventDefault();
    var animalx=$("#animal-input").val().trim();
    if(animalx.length>1){
        
        if(giphyarray.indexOf(animalx)===-1){
            giphyarray.push(animalx);
        console.log(giphyarray);
        } else{
            $(".giphy-form").hide()
            var repititvebutton =$(".rededent-button").text("The button is already there");
            setTimeout(function(){$(".giphy-form").show();$(".rededent-button").empty()},2000);
        
        }
    }else {
        $(".giphy-form").hide()
       var repititvebutton =$(".rededent-button").text("you should input animal name");
        setTimeout(function(){$(".giphy-form").show();$(".rededent-button").empty()},2000);
    }
    renderbutton(giphyarray);
});
// renderbutton();
function renderbutton(array){
    $(".giphybuttons").empty();
    console.log("giphy array"+ array.length);
for (var i=0; i < array.length; i++){
    
    var button=$("<button>");
    button.addClass("user-inputbutton");
    button.css({"background-color":"rgb(84, 122, 228)","border-radius":"6px",
                "border-color":"rgb(84, 122, 228)","margin":"4px"});
    button.attr("data-name", array[i]);
    
    button.text(array[i]);
    $(".giphybuttons").append(button);
     
}

displayMovieInfo();
return(array);
}
displayMovieInfo();
function displayMovieInfo() {
$(".user-inputbutton").on("click", function (){


   var animals=$(this).attr("data-name");
   console.log(animals);
   //var animals=cat;
   var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
   animals + "&api_key=oKfTDtwlvPJgZqbkQ0nY29zqC4BFLT0b&limit=5";

    //var queryURL="https://api.giphy.com/v1/gifs/search?q=" +
        //animals + "&api_key=dc6zaTOxFJmzC&limit=10";
    $.ajax({
        url:  queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response);
    
    var results = response.data;
        console.log("response + data "+results);
          // Looping over every result item
          for (var j = 0; j < results.length; j++) {

            // Creating and storing a div tag
            var animalDiv = $("<div>");
            var pdiv=$("<div>");
            animalDiv.css({"float":"left"});
            // Creating a paragraph tag with the result item's rating
            var p1 = $("<p>").html("Rating: " + results[j].rating+"<br>"+"Title: "+ results[j].title);
            // var p2 = $("<p>").text("Title: " + results[j].title);
            pdiv.css({"background-color":"violet","width":"200px","height":"80px"});
            // p2.css({"background-color":"violet"});
            // Creating and storing an image tag
            var animalImage = $("<img>");
             animalImage.addClass("giphy");
             animalImage.attr("data-state","still");
             animalImage.attr("data-still",results[j].images.fixed_height_still.url);
            // Setting the src attribute of the image to a property pulled off the result item
            animalImage.attr("data-animate",results[j].images.fixed_height.url);
          animalImage.attr("src", results[j].images.fixed_height_still.url);
          animalImage.css({"width":"200px","height":"180px"});
          animalDiv.css({"padding":"20px"})
            // Appending the paragraph and image tag to the animalDiv
            pdiv.append(p1);
            // pdiv.append(p2);
            animalDiv.append(pdiv);
            animalDiv.append(animalImage);

            // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
            $(".image-display").prepend(animalDiv);
            
            
          }
          $(".giphy").on("click",function(){
            var state=$(this).attr("data-state");
            console.log("state  "+state);
            if(state==="still"){
                $(this).attr("src",$(this).attr("data-animate"));
                $(this).attr("data-state","animate");
            }else{
                $(this).attr("src",$(this).attr("data-still"));
                $(this).attr("data-state","still");
            }
        });
        
    });

    
});
}


  //$(document).on("click", ".user-inputbutton", displayMovieInfo);
renderbutton(giphyarray);
});
