var moviesInfoFile = "./movie-details-with-video.json";

 $.getJSON(moviesInfoFile, function(movies){
   //Start off with an empty list every time to get the latest from server
   $('#movieList').empty();
   
   //add the movie items as list
   $.each(movies, function(i, movie){
     $('#movieList').append(generateMovieLink(movie));
   });

   //refresh the list view to show the latest changes
   $('#movieList').listview('refresh');

 });

  //creates a movie link list item
 function generateMovieLink(movie){

  //debugger;
  return '<li><a href="javascript:void(0)'
        + '" onclick="goToMovieDetailPage(\''
        + movie.name 
        + '\',\''
        + movie.picUrl
        + '\',\''
        + movie.trailerUrl +'\')">' 
        + movie.name 
        + '</a></li>';
 }

 function goToMovieDetailPage(movieName, moviePicUrl, movieTrailerUrl){

  //create the page html template
  var moviePage = $("<div data-role='page' data-url=dummyUrl><div data-role='header'><h1>"
                  + movieName + "</h1></div><div data-role='content'>"
                  + '<a href="javascript:void(0)"  data-role="button" data-theme="a" onclick="showTrailerPage(\''
                  + movieName + '\',\''
                  + movieTrailerUrl + '\')">Trailer</a>'
                  + "<img border='0' src='" 
                  + moviePicUrl + "' width=204 height=288></img>"
                  + "</div><div data-role='footer'><h4>" 
                  + movieName + "</h4></div></div>");

  //append the new page to the page container
  moviePage.appendTo( $.mobile.pageContainer );

  //go to the newly created page
  $.mobile.changePage( moviePage );
 } 

 function showTrailerPage(movieName, videoUrl){
  var trailerPage = $("<div data-role='page' id='moviePlayer' data-url=dummyUrl><div data-role='header'><h1>" + movieName + "</h1></div><div data-role='content'>"
    + "<iframe width='560' height='315' src='" + videoUrl +"' frameborder='0' allowfullscreen seamless></iframe><div data-role='footer'>Footer<div>");

  trailerPage.appendTo( $.mobile.pageContainer );
  $.mobile.changePage( trailerPage );

  $("#moviePlayer iframe").attr("width",400).attr("height",400);

 } 
