Discourse.DiscourseCategorydropComponent = Ember.Component.extend({
  classNameBindings: ['category::no-category', 'categories:has-drop'],
  tagName: 'li',

  iconClass: function() {
    if (this.get('expanded')) { return "icon icon-caret-down"; }
    return "icon icon-caret-right";
  }.property('expanded'),

  badgeStyle: function() {
    var category = this.get('category');
    if (category) {
      return Discourse.HTML.categoryStyle(category);
    } else {
      return "background-color: #eee; color: #333";
    }
  }.property('category'),

  actions: {
    expand: function() {
      if (this.get('expanded')) {
        this.close();
        return;
      }

      if (this.get('categories')) {
        this.set('expanded', true);
      }
      var self = this,
          $dropdown = this.$()[0];

      $('html').on('click.category-drop', function(e) {
        var $target = $(e.target),
            closest = $target.closest($dropdown);

        return ($(e.currentTarget).hasClass('badge-category') || (closest.length && closest[0] === $dropdown)) ? true : self.close();
      });
    }
  },

  categoryChanged: function() {
    this.close();
  }.observes('category', 'parentCategory'),

  close: function() {
    $('html').off('click.category-drop');
    this.set('expanded', false);
  },

  willDestroyElement: function() {
    $('html').off('click.category-drop');
  }

});
