(function(){
  var MoviesApp = {};
  window.MoviesApp = MoviesApp;

  //given the name of the template, it returns the compiled javascript of that template.
  MoviesApp.template = function(name) {
    return Mustache.compile($('#'+name+'-template').html());
  };

  //This is the entry point to our client side application
  MoviesApp.boot = function(container){

    //Todo : Use the input parameter #Movies container in here.
  	//Get the json from the server 
    $.getJSON("./movie-details-with-video.json", function(moviesDetails){

  		container = $(container);
	  	var router = new MoviesApp.Router({el: container, movies: moviesDetails});
    	Backbone.history.start();
    });
  }

})()