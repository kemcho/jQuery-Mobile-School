(function(){
  var MoviesApp = {};
  window.MoviesApp = MoviesApp;

  //given the name of the template, it returns the compiled javascript of that template.
  var template = function(name) {
    return Mustache.compile($('#'+name+'-template').html());
  };


  MoviesApp.Container = Backbone.View.extend({

    template: template("MovieContainer"),
    containerId: $('#MovieContainer'),

  	initialize: function(options){
  		this.movies = options.movies;
  	},
  	render: function(){
      $("#Movies").append(this.template(this));

      var self = this;
      $.each(this.movies, function(i, movie){
        self.addMovie(movie);
      });

      $("#MovieContainer").listview();
  	},
  	addMovie: function(movie){
  		var movieView = new MoviesApp.Container.Movie({movieDetails: movie});      
      //Todo : Fix this element reference, it should come in a generic manner.
      //The reason why this is hardcoded is that #MovieContainer does not exists in the begening of the code
      //It gets generated when we append the parent container to the main page.
  		$("#MovieContainer").append(movieView.render().el.innerHTML);
  	}
  });


  MoviesApp.Container.Movie = Backbone.View.extend({

  	template: template("MovieDetail"),
  	initialize: function(options){
  		this.movie = options.movieDetails;
  	},
  	render: function(){

  		//Simply show the collection
  		this.$el.html(this.template(this));
  		return this;
  	},

    //These are the variables the teample (view) is expecting
  	name: function(){
  		return this.movie.name;
  	},

  	picUrl: function(){
  		return this.movie.picUrl;
  	},

    trailerUrl: function(){
      return this.movie.trailerUrl;
    }

  });

  MoviesApp.Router = Backbone.Router.extend({
    initialize: function(options){
    	this.el = options.el;
    	this.movies = options.movies;
    },
    routes:{
      //router will match the REST url and call the approriate action,
      //in this case "" stands for the default action that gets triggered.
    	"": "index"
    },
    index: function(){
    	var index = new MoviesApp.Container({movies: this.movies});
    	this.el.empty();
      index.render();
    }
  });


  //This is the entry point to our client side application
  MoviesApp.boot = function(container){

    //Todo : Use the input parameter #Movies container in here.
  	//Get the json from the server 
    $.getJSON("./movie-details-with-video.json", function(movieDetails){

  		container = $(container);
	  	var router = new MoviesApp.Router({el: container, movies: movieDetails});
    	Backbone.history.start();
    });
  }

})()

//Todo :: Error handling when json does not return ?
//Figure out what is the matter with this innerHTML all the time? 