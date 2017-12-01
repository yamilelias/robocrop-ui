/*!
 * Start Bootstrap - Robocrop UI v1.0.0 (https://github.com/yamilelias/robocrop-ui)
 * Copyright 2013-2017 Yamil Elias
 * Licensed under MIT (https://github.com/yamilelias/robocrop-ui/LICENSE)
 */

// This function is to manipulate the DOM and display the data from the service
function manipulateDOM() {
    // Print plants sensed
    document.getElementById('sensed').innerHTML = window.sensed;

    // Print raw data to table
    var table = document.getElementById('rawdata');

    window.data.forEach(function(item, index){
        // Create row
        var row = table.insertRow();

        // Create elements in row
        var lat = row.insertCell(0);
        var long = row.insertCell(1);
        var sensor = row.insertCell(2);

        lat.innerHTML = item.latitude;
        long.innerHTML = item.longitude;
        sensor.innerHTML = item.sensor_value;
    });
}