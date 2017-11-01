/**
 * Created by Stefan on 30/10/2017
 */

var HomeView = Backbone.View.extend({
    el : '#main',
    events : {
        'click .coffee-shop-name' : 'showSingleCofeeShop'
    },
    render : function(){
        let template = loadTemplate('../templates/home.html');
        this.$el.html(template(this.model));

        let contentContainer = document.querySelector('#content');

        let date = new Date();
        let formattedDate = moment(date).format('YYYYMMDD');

        (function getLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition, geolocationDenied);
            } else {
                contentContainer.innerHTML = '<div class="error geolocation-error">Error: Geolocation is not supported by this browser.</div>';
            }
        })();
        
        function showPosition(position) {
            let container = document.querySelector('.list');

            $.ajax({
                method: 'GET',
                data: {
                  client_id: 'PYMHQS1HKI4BTDOSZVGCYZSGISZBUU1W0D4XVRXWPYXI0MXW',
                  client_secret: 'VG1BLQSGV4XZHS2IWJBSU3MXO3G2HBCWLGZEHFCWK44RYTJY',
                  ll: position.coords.latitude + ',' + position.coords.longitude,
                  query: 'coffee',
                  v: formattedDate,
                  limit: 10,
                  openNow: 1,
                  venuePhotos: 1,
                  sortByDistance: 1
                },
                url: 'https://api.foursquare.com/v2/venues/explore?',
                success: function(response) {
                    console.log(response);

                    $(container).empty();

                    let coffeeShops = response.response.groups[0].items;

                    for (let coffeeShop of coffeeShops) {
                        console.log(coffeeShop);
                        var venueImage = coffeeShop.venue.featuredPhotos.items[0];

                        if (coffeeShop.venue.location.distance <= 1000) {
                            container.innerHTML += '<li class="single-venue clearfix"><div class="featured-image-wrapper"><img class="featured-image" src="' + venueImage.prefix + '110x110' + venueImage.suffix + '" data-id="' + coffeeShop.venue.id + '" /></div><a class="coffee-shop-name" data-id="' + coffeeShop.venue.id + '" href="#">' + coffeeShop.venue.name + '</a> <div class="venue-distance-container"><span class="venue-distance">' + coffeeShop.venue.location.distance + '</span> meters away from you</div> <div class="venue-price-container">Price range: <span class="venue-price">'+ coffeeShop.venue.price.tier + '</span></div></li>';
                        }
                    }

                    var options = {
                        valueNames: [ 'venue-distance', 'venue-price' ]
                    };
                    
                    var userList = new List('main', options);
                },
                error: function(xhr) {
                    console.log(xhr);
                    console.log('error occured');
                    container.innerHTML = '<div class="error">Error occurred. Please refresh the page and try again.</div>';
                }
            });
            
        }

        function geolocationDenied() {
            contentContainer.innerHTML = '<div class="geolocation-error">Error: Unable to retrieve your location</div>';
          }

        return this;
    },

    showSingleCofeeShop: function(e) {
        e.preventDefault();

        let distance = $(e.target).siblings('.venue-distance-container').find('.venue-distance').html();
        console.log(distance);
        let venueId = e.target.dataset.id;

        let date = new Date();
        let today = moment(date).format('YYYYMMDD');

        $.ajax({
            method: 'get',
            url: 'https://api.foursquare.com/v2/venues/' + venueId + '?',
            data: {
                client_id: 'PYMHQS1HKI4BTDOSZVGCYZSGISZBUU1W0D4XVRXWPYXI0MXW',
                client_secret: 'VG1BLQSGV4XZHS2IWJBSU3MXO3G2HBCWLGZEHFCWK44RYTJY',
                v: today
            },
            success: function(response) {
                let singleShop = response.response.venue;
                let venueImages = singleShop.photos.groups[0].items;
                let tips = singleShop.tips.groups[0].items;
                let coffeeTips = [];

                new SingleShopView().render();

                $('.single-shop-name').text(singleShop.name);
                $('.price-range-content').text(singleShop.price.message);
                $('.current-distance-content').text(distance);

                for (let venueImage of venueImages) {
                    $('.slideshow').append('<div class="item"><img src="' + venueImage.prefix + '300x300' + venueImage.suffix + '" alt="Venue Image" /></div>');
                }

                $('.owl-carousel').owlCarousel({
                    loop:true,
                    autoplay:true,
                    margin:10,
                    responsiveClass:true,
                    nav: false,
                    responsive:{
                        0:{
                            items:1
                        },
                        350:{
                            items: 2
                        },
                        600:{
                            items:3
                        },
                        992:{
                            items:5
                        }
                    }
                });

                for (let tip of tips) {
                    if (tip.text.includes('coffee')) {
                        coffeeTips.push(tip);
                    } 
                }

                console.log(coffeeTips.length);

                if (coffeeTips.length == 0) {
                    $('.user-reviews-coffee').append('<div class="no-coffee-reviews">Sorry, but there are no reviews about coffee in this venue.</div>')
                }

                for (let coffeeTip of coffeeTips) {
                    $('.user-reviews-coffee').append('<div class="tip-coffee">' + coffeeTip.text + '</div>');
                }
                
                
            },
            error: function(xhr) {
                console.log(xhr);
                let singleShopWrapper = $('.single-shop-wrapper');
                singleShopWrapper.innerHTML = '<div class="error">Error occurred. Please refresh the page and try again.</div>';
            }
        });
    }
});

//@ sourceURL=http://dynamic/home.js
