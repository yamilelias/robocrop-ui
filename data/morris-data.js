$(function() {
    Morris.Donut({
        element: 'morris-donut-chart',
        data: window.totals,
        colors: [
            '#FFFF00',
            '#BFFF00',
            '#80FF00',
            '#00FF00',
            '#04B404'
        ],
        resize: true
    });
    
});
