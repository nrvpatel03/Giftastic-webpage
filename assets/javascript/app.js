
$(document).ready(function(){
    //manipulating css with jquery, having fun, trying stuff
    //array of different hex codes for colors of submit button
    var arrayOfColors =["#FF9A85","#97EB5A","#48DFA1","#485ADF","#BD48DF","#D53E7E"];
    var randomColor = arrayOfColors[Math.floor(Math.random()*5)];
    $(".btn").mouseover(function(){
        $(this).css("background-color", randomColor);
        $(this).addClass("animated infinite rubberBand");
    }).mouseout(function(){
        $(this).css("background-color", "yellow");
        $(this).removeClass("animated infinite rubberBand");
    })
//=====================================================================================================



//generating buttons based on user input (value)
    function makeButton(value){
        var newButton = $("<button>");
        newButton.addClass("newButton");
        newButton.attr("feeling-name",value);
        newButton.css("background-color", randomColor);
        newButton.text(value);
        $("#buttonDiv").append(newButton);
    }



//=====================================CLICK FUNCTIONS================================================
//function to create buttons based on user input with styling. Also user can press enter to submit
    $("#submitButtonId").click(function(){
        var feeling = $("#emotionInput").val();
        makeButton(feeling);
        $("#emotionInput").val("");
    });
    //press enter to submit feeling
    $("#emotionInput").keypress(function(event){
        if(event.keyCode === 13){
            $("#submitButtonId").trigger("click");
        }
    });

//function to perform ajax request on buttons generated by user.
//have to use document.on click for new buttons because we are dynamically adding new buttons.
//The document has new elements added, this will find them.

    $(document).on("click",".newButton",function(){
        //create query url need limit variable
        var part = "http://api.giphy.com/v1/gifs/search?q="
        var apiKey = "&api_key=Uzca876e5K4XznLnTjHlBZeb0IwrFA0p&limit="
        var input = $(this).attr("feeling-name");
        var queryUrl = part + input + apiKey + "3";
        $(".page").css("height","auto");
        $.ajax({
            url: queryUrl,
            method: "GET"
        }).then(function(response){
            //iterate through response array and grab the image urls
            for(var i = 0; i<response.data.length; i++){
                var gif = $("<div class='gif'>");
                var img = $("<img>");
                var rating = $("<p>");
                //moving images, need to figure out how to pause
                img.attr("src",response.data[i].images.original.url);
                rating.text(response.data[i].rating);
                rating.css("background-color","white");
                gif.append(img);
                gif.append(rating);
                gif.css("margin-right","20px");
                $(".gifDiv").prepend(gif);
            }
        })
    });

});