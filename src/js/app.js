$(function(){
    
        require('../js/home.js');
        require('../js/single.js');
    
        var Application = Backbone.Router.extend({
            
            routes : {  ''                                  : 'home',
                        'single(/)'                         : 'singleShopView',
                        'stefan(/)'                         : 'stefanPage'
                        },
    
            home : function(){
                var homeView = new HomeView();
                homeView.render();
            },
    
            singleShopView: function() {
                var singleShopView = new SingleShopView();
                singleShopView.render();
            }
        });
    
        var application = new Application();

        Backbone.history.start();

    
    });