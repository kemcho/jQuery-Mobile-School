//Todo - add a logic here to see if the MoviesApp is defined before doing this.
MoviesApp.MovieDetailView = Backbone.View.extend({
  template: MoviesApp.template("MovieDetails"),

  initialize : function(options){
  	this.movies = options.movies;
  	this.currentMovieName = options.movieName;
  	this.currentMovie = this.getCurrentMovieObject(this.movies,this.currentMovieName);
  	console.log("current movie objec - "+JSON.stringify(this.currentMovie));

  },
  render : function(){

  	//console.log("I am going to show you this movie - "+this.currentMovieName);
    var movieDetailsPage = $(this.template(this));
    return movieDetailsPage;
  },

  //Define variables for the template
  movieName: function(){
  	return this.currentMovie.name;
  },

  moviePicUrl: function(){
  	return this.currentMovie.picUrl;
  },

  trailerUrl: function(){
  	return this.currentMovie.trailerUrl;
  },

  movieDetailPageId: function(){
  	return "MovieDetailPageId";
  },

  //iterates through all movies and sets the current movie Object 
  //Todo - What happens if you dont find the movie
  getCurrentMovieObject: function(movies, currentMovieName){
  	var currentMovie;
  	$.each(movies, function(i, movie){
  		if(movie.name == currentMovieName){
  			currentMovie = movie;
  			return false;
  		}
  	});
  	return currentMovie;
  }
});
