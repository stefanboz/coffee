var HomeView = Backbone.View.extend({
    el: '#main',
    render: function () {
        var template = loadTemplate('../templates/home.html');
        this.$el.html(template(this.model));

        let contentContainer = document.querySelector('#content');

        (function getLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition, geolocationDenied);
            } else {
                contentContainer.innerHTML = '<div class="geolocation-error">Error: Geolocation is not supported by this browser.</div>';
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
                    v: '20171030',
                    limit: 10,
                    openNow: 1,
                    venuePhotos: 1,
                    sortByDistance: 1
                },
                url: 'https://api.foursquare.com/v2/venues/explore?',
                success: function (response) {
                    console.log(response);

                    $(container).empty();

                    let coffeeShops = response.response.groups[0].items;

                    for (let coffeeShop of coffeeShops) {
                        console.log(coffeeShop);
                        var venueImage = coffeeShop.venue.featuredPhotos.items[0];

                        if (coffeeShop.venue.location.distance <= 1000) {
                            container.innerHTML += '<li class="single-venue clearfix"><div class="featured-image-wrapper"><img class="featured-image" src="' + venueImage.prefix + '110x110' + venueImage.suffix + '" data-id="' + coffeeShop.venue.id + '" /></div><a class="coffee-shop-name" data-id="' + coffeeShop.venue.id + '" href="#">' + coffeeShop.venue.name + '</a> <div class="venue-distance-container"><span class="venue-distance">' + coffeeShop.venue.location.distance + '</span> meters away from you</div> <div class="venue-price-container">Price range: <span class="venue-price">' + coffeeShop.venue.price.tier + '</span></div></li>';
                        }
                    }

                    var options = {
                        valueNames: ['venue-distance', 'venue-price']
                    };

                    var userList = new List('main', options);
                },
                error: function (xhr) {
                    console.log(xhr);
                }
            });
        }

        function geolocationDenied() {
            contentContainer.innerHTML = '<div class="geolocation-error">Error: Unable to retrieve your location</div>';
        }

        return this;
    }
});

//@ sourceURL=http://dynamic/home.js