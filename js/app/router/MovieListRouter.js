  MoviesApp.Router = Backbone.Router.extend({
    initialize: function(options){
    	this.el = options.el;
    	this.movies = options.movies;
    },
    routes:{
      //router will match the REST url and call the approriate action,
      //in this case "" stands for the default action that gets triggered.
    	"": "index",
      "detail/:name": "showMovieDetail"
    },
    index: function(){
      console.log("rendering index page");
      var movieListView = new MoviesApp.MovieListView({movies:this.movies});
      var movieListPage = movieListView.render();

      //Start from clean slate and re render the details.
      this.el.empty();
      movieListPage.appendTo( this.el );
      
      $("#" + movieListView.movieContainerId()).listview();
      $.mobile.changePage($("#mainPage"));
    },

    showMovieDetail: function(name){  
      var movieDetailView = new MoviesApp.MovieDetailView({movies: this.movies, movieName: name });
      var movieDetailsPage = movieDetailView.render();
      //append the new page to the page container
      movieDetailsPage.appendTo( $.mobile.pageContainer );
      //go to the newly created page
      $.mobile.changePage( movieDetailsPage );
      //$.mobile.changePage( "#detail/:"+name , { reverse: false, changeHash: false } );
    }

  });