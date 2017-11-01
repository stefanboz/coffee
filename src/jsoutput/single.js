/**
 * Created by Stefan on 30/10/2017
 */

var SingleShopView = Backbone.View.extend({
    el: '#content',
    events: {
        'click .back': 'showAllVenues'
    },
    render: function () {
        var template = loadTemplate('../templates/single.html');
        this.$el.html(template(this.model));

        return this;
    },
    showAllVenues: function (e) {
        e.preventDefault();
        new HomeView().render();
    }
});

//@ sourceURL=http://dynamic/single.js