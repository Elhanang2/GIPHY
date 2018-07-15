$(document).ready(function(){

//list of array from user input 
var giphyarray=["cat","dog","horses"];
var array;
//on click on add-animal the button will be created with the user input name 
$("#add-animal").on("click",function(){
    
    event.preventDefault();
    var animalx=$("#animal-input").val().trim();
    //if user input the name it will check if the name is inside the list if it is
    //it will not add to the list if it not there it will add
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
// this function create an array of name of the buttons 
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
//this function will listen to the user button click and  output the images 
function displayMovieInfo() {
$(".user-inputbutton").on("click", function (){


   var animals=$(this).attr("data-name");
   console.log(animals);
   var queryURL = "https://www.omdbapi.com/?t=" + animals + "&y=&plot=short&apikey=trilogy";//new
   var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
   animals + "&api_key=oKfTDtwlvPJgZqbkQ0nY29zqC4BFLT0b&limit=5";
    $.ajax({
        url:  queryURL,
        method: "GET"
    }).then(function(response){
        
    var results = response.data;
    // $(".image-display").text(JSON.stringify(response));//new
          // Looping over every result item
          for (var j = 0; j < results.length; j++) {

            // Creating and storing a div tag
            var animalDiv = $("<div>");
            var pdiv=$("<div>");
            animalDiv.css({"float":"left"});
            // Creating a paragraph tag with the result item's rating
            var p1 = $("<p>").html("Rating: " + results[j].rating+"<br>"+"Title: "+ results[j].title);
            // creating css for div
            pdiv.css({"background-color":"violet","width":"200px","height":"80px"});
           
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
            animalDiv.append(pdiv);
            animalDiv.append(animalImage);

            // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
            $(".image-display").prepend(animalDiv);
            
            
          }
          //on click on giphy the image will stop or animate
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

renderbutton(giphyarray);
});
