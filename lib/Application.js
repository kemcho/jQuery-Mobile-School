(function(){
  var MoviesApp = {};
  window.MoviesApp = MoviesApp;


  //given the name of the template, it returns the compiled javascript of that template.
  var template = function(name) {
    return Mustache.compile($('#'+name+'-template').html());
  };


  MoviesApp.Index = Backbone.View.extend({

  	initialize: function(options){
  		this.movies = options.movies;
  	},
  	render: function(){
      var self = this;
      $.each(this.movies, function(i, movie){
        self.addMovie(movie);
      });

      //Todo : finc out what does this return statement do ?
      return this;
  	},
  	addMovie: function(movie){
  		var movieView = new MoviesApp.Index.Movie({movieDetails: movie});
  		this.$el.append(movieView.render().el.innerHTML);
      //console.log(movieView.render().el.innerHTML);
  	}
  });


  MoviesApp.Index.Movie = Backbone.View.extend({

  	template: template("MovieDetail"),
  	initialize: function(options){
  		this.movie = options.movieDetails;
  	},
  	render: function(){

  		//Simply show the collection
  		this.$el.html(this.template(this));
      //console.log(this.$el.html());
  		
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
    	"": "index"
    },
    index: function(){
    	var index = new MoviesApp.Index({movies: this.movies});
    	this.el.empty();
    	this.el.append(index.render().el.innerHTML);
      //Refresh the list view
      $('#MovieContainer').listview('refresh');
    }
  });


  //This is the entry point to our client side application
  MoviesApp.boot = function(container){

  	//Get the json from the server 
    $.getJSON("./movie-details-with-video.json", function(movieDetails){

  		container = $(container);
	  	var router = new MoviesApp.Router({el: container, movies: movieDetails});
    	Backbone.history.start();
    });
    //Todo :: Error handling when json does not return ?
    //Figure out what is the matter with this innerHTML all the time? 
  }

})()