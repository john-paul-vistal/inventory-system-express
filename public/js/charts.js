let top_products
let count = {}
let counts = []
let value = []
$.ajax('/getAllSales', {
    success: function(data, status, xhr) {
        data.forEach(element => {
            console.log(element.total)
            element.products.forEach(prod => {
                count[prod.productName] = count[prod.productName] ? count[prod.productName] + 1 : 1
                if (counts.indexOf(prod.productName) === -1) {
                    counts.push(prod.productName)
                }

            });
        });
        for (const key in count) {
            value.push(count[key])
        }
    }
});



var ctx1 = document.getElementById('myChart1').getContext('2d')

var myChart1 = new Chart(ctx1, {
    type: 'bar',
    data: {
        labels: counts,
        datasets: [{
            data: value,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        title: {
            display: true,
            text: "Top Products"
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },
        animation: {
            duration: 5000,
            easing: 'linear'
        },
        legend: {
            display: false
        }
    }
});


var ctx2 = document.getElementById('myChart2').getContext('2d');

var myChart2 = new Chart(ctx2, {
    type: 'line',
    data: {
        labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
        datasets: [{
            data: [12, 20, 3, 5, 2, 3, 12, 18, 3, 5, 2, 3, 3, 5, 2, 3, 2, 3, 12, 16, 3],
            backgroundColor: [
                'rgba(75, 192, 192, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        title: {
            display: true,
            text: "Monthly Sales Report"
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },
        animation: {
            duration: 5000,
            easing: 'easeInQuad'
        },
        legend: {
            display: false
        }
    }
});