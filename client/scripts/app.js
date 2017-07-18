var Movie = Backbone.Model.extend({
  
  defaults: {
    like: true
  },

  toggleLike: function() {
    // console.log('pressed');
    if (this.get('like')) {
      this.set('like', false);
      
//sort the .collection below
    } else {
      this.set('like', true);
//sort the .collection below
    }
    this.collection.sortByField('like');
  }
  
});

var Movies = Backbone.Collection.extend({

  model: Movie,

  initialize: function() {
    this.comparator = 'title';
  },
  
  //comparator: 'title', // WEIRD!!!

  sortByField: function(field) {
    //this.set('comparator', field);
    //console.log(this);
    //return this.get('comparator');
    this.comparator = field;
    this.sort(this.comparator);
  }

});

var AppView = Backbone.View.extend({

  events: {
    'click form input': 'handleClick'
    // 'click button': 'handleClick'
  },

  handleClick: function(e) {
    console.log(e);
    var field = $(e.target).val();
    this.collection.sortByField(field);
  },

  render: function() {
    new MoviesView({
      el: this.$('#movies'),
      collection: this.collection
    }).render();
  }

});

var MovieView = Backbone.View.extend({

  template: _.template('<div class="movie"> \
                          <div class="like"> \
                            <button><img src="images/<%- like ? \'up\' : \'down\' %>.jpg"></button> \
                          </div> \
                          <span class="title"><%- title %></span> \
                          <span class="year">(<%- year %>)</span> \
                          <div class="rating">Fan rating: <%- rating %> of 10</div> \
                        </div>'),

  initialize: function() {
    this.model.on('change:like', this.render, this);
  },

  events: {
    'click button': 'handleClick'
  },

  handleClick: function(e) {
    // your code here
    this.model.toggleLike();
    // this.collection.sortByField('like');
    //console.log(this);
    //var field = $(e.target).val();
    // this.model.collection.sortByField('like');
  },


    

// handleClick: function(e) {
//     console.log(e);
//     var field = $(e.target).val();
//     this.collection.sortByField(field);
//   },

  render: function() {
    this.$el.html(this.template(this.model.attributes));
    return this.$el;
  }

});

var MoviesView = Backbone.View.extend({

  initialize: function() {
    this.collection.on('sort', this.render, this);
    // this.collection.on('change:like', this.model.sortByField(), this);
    

  },

  render: function() {
    
    this.$el.empty();
    this.collection.forEach(this.renderMovie, this);
  },

  renderMovie: function(movie) {
    var movieView = new MovieView({model: movie});
    this.$el.append(movieView.render());
  }

});
