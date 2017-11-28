function initMap() {
    /*
     * Define the map where everything will be output
     */
    var land = new google.maps.LatLng(28.86325183, -105.9143659);

    /*
     * Land Corners
     * 28.866835, -105.918783
     * 28.864375, -105.908539
     * 28.862426, -105.919921
     * 28.860004, -105.910343
     */
    map = new google.maps.Map(document.getElementById('map'), {
        center: land,
        zoom: 17,
        mapTypeId: 'satellite'
    });

    var colors = [
        '#FFFF00',
        '#BFFF00',
        '#80FF00',
        '#00FF00',
        '#04B404'
    ];

    colors.forEach(function(value){
        // Define an array and populate it in a random way
        var heatmapData = [];

        // Let's set a iterations variable so they aren't the same in each one
        var iterations = Math.floor((Math.random() * 200) + 1);

        for(k=0; k < iterations; k++) {
            randomOne = Math.random() / 500;
            randomTwo = Math.random() / 500;

            lat = 28.863 + randomOne;
            long = -105.914 + randomTwo;

            heatmapData.push({location: new google.maps.LatLng(lat, long), weight: 10});
        };

        // Create the heatmap layer with data
        var heatmap = new google.maps.visualization.HeatmapLayer({
            data: heatmapData
        });

        // Set the gradient color for this iteration
        var gradient = [
            'rgba(0, 255, 255, 0)',
            value
        ];

        // Include options into the layer
        heatmap.set('gradient', heatmap.get('gradient') ? null : gradient);
        heatmap.set('radius', heatmap.get('radius') ? null : 5);

        // Combine it into the google map
        heatmap.setMap(map);
    });
}