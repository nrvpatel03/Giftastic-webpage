
$(document).ready(function(){
    //manipulating css with jquery, having fun, trying stuff
    //array of different hex codes for colors of submit button
    var arrayOfColors =["#FF9A85","#97EB5A","#48DFA1","#485ADF","#BD48DF","#D53E7E"]
    
    $(".btn").mouseover(function(){
        $(this).css("background-color", arrayOfColors[Math.floor(Math.random()*5)]);
        $(this).addClass("animated infinite rubberBand");
    }).mouseout(function(){
        $(this).css("background-color", "gray");
        $(this).removeClass("animated infinite rubberBand");
    })


});