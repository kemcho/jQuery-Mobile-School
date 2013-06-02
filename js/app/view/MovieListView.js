MoviesApp.MovieListView = Backbone.View.extend({

	movieListViewTemplate: MoviesApp.template("MovieListView"),

	initialize: function(options){
      this.movies = options.movies;
      this.containerId = options.containerId;
	},

	render: function(){

      var movieListItems = $(this.movieListViewTemplate(this));
      return movieListItems;
    },

	movieContainerId: function(){
	  return "MovieContainer";
	},

	movieItemDetails: function(){
      	var movieItemDetailsArray = [];
      	var self = this;
    	$.each(this.movies, function(i, movie){
			var obj = {};
			obj["movieName"] = movie.name;
			obj["movieDetailUrl"] = self.getMovieDetailUrl(movie.name);
			movieItemDetailsArray.push(obj);
		});
		return movieItemDetailsArray;
	},

	//Todo - see if you can avoid hard coding routes here but rather calling the Router ?
	getMovieDetailUrl: function(movieName){
      return "#detail/"+movieName;
	}

});