
// Set data again if is not yet defined
var morrisData = [];
var sensed = 0;
var data = [];

// Get the information from the web service and set it to the variables
function getWebService(){
    $.getJSON('http://localhost/index.php/api/heatmap/data?callback=?', function(data){
        // Handles the callback when the data returns
        sanitizeRawData(data);
        setDataRetrieved();
    })
    .done(function() {
        console.log( "success" );
    })
    .fail(function( jqxhr, textStatus, error ) {
        var err = textStatus + ", " + error;
        console.log( "Request Failed: " + err );
    });
};

// Make the needed changes to data for display
function sanitizeRawData(data) {

    // Initialize values
    window.data.veryLow = [];
    window.data.low = [];
    window.data.regular = [];
    window.data.high = [];
    window.data.veryHigh = [];

    // Iterate data
    data.forEach(function (point) {
        var sensor_value = point.sensor_value;

        switch (true) {
            case (sensor_value < 200):
                window.data.veryLow.push(point);
                break;
            case (sensor_value > 200 && sensor_value < 400):
                window.data.low.push(point);
                break;
            case (sensor_value > 400 && sensor_value < 600):
                window.data.regular.push(point);
                break;
            case (sensor_value > 600 && sensor_value < 800):
                window.data.high.push(point);
                break;
            case (sensor_value > 800 && sensor_value < 1000):
                window.data.veryHigh.push(point);
                break;
        }
    });
}

// Set Data to map
function setDataRetrieved() {
    console.log('Set Data Retrieved');

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

    var percentage = 200;

    colors.forEach(function(value){
        // Define an array and populate it in a random way
        var heatmapData = [];

        window.data.forEach(function (value) {
            var length = value.length;

            console.log('Length: ' + length);

            window.sensed = window.sensed + length;
            console.log('Sensed: ' + window.sensed);
            window.morrisData.push({label: (percentage - 200) + ' - ' + percentage, value: length});
            console.log('MorrisData: ' + JSON.stringify(window.morrisData));

            value.forEach(function (point) {
                heatmapData.push({location: new google.maps.LatLng(point.latitude, point.longitude), weight: 10});
            });
        });

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

        percentage = percentage + 200; // Upgrade percentage for next iteration
    });

    manipulateDOM();
}