//Todo - delete this file - replaced by MovieDetailView.js
//Todo - no need to pass movies to the container
//todo - rename this to be more specific -> movie container etc, movie view
//todo - change this file to MovieListView.js
  MoviesApp.Container = Backbone.View.extend({

    template: MoviesApp.template("MovieContainer"),
    containerId: "MovieContainer",

  	initialize: function(options){
  		this.movies = options.movies;
      this.el = options.container;
  	},
  	render: function(){
      this.el.append(this.template(this));      
  	},
    movieContainerId: function(){
      return this.containerId;
    }
  });

  MoviesApp.Container.Movie = Backbone.View.extend({

  	template: MoviesApp.template("MovieDetail"),
  	initialize: function(options){
  		this.movie = options.movieDetails;
      this.el = options.container;
  	},
  	render: function(){
      return this.el.append(this.template(this));
  	},

    //These are the variables the teample (view) is expecting
  	name: function(){
  		return this.movie.name;
  	},
    /*
  	picUrl: function(){
  		return this.movie.picUrl;
  	},
    trailerUrl: function(){
      return this.movie.trailerUrl;
    },
    */
    movieDetailUrl: function(){

      //return "javascript:{window.location=http://www.google.com;"};
      return "#detail/"+this.movie.name;
    }

    //Todo : putting routes in the view good idea ?
  });