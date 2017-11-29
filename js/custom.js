
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
        sensor.innerHTML = item.value;
    });
}