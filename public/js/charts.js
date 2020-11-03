let productCount = {}
let productNames = []
let prodCountValue = []

let monthlySales = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0 }
let months = []
let monthlyTotal = []

$.ajax('/getAllProducts', {
    success: function(data, status, xhr) {
        $('#products').text(data.length)
    }
});

$.ajax('/getAllUsers', {
    success: function(data, status, xhr) {
        $('#employee').text(data.length)
    }
});

$.ajax('/getAllSales', {
    success: function(data, status, xhr) {
        $('#totalSalesRecorded').text(data.length)
        data.forEach(element => {
            let date = new Date(element.dateRecorded)

            monthlySales[date.getMonth()] = monthlySales[date.getMonth()] ? monthlySales[date.getMonth()] + element.total : monthlySales[date.getMonth()] + element.total

            element.products.forEach(prod => {
                productCount[prod.productName] = productCount[prod.productName] ? productCount[prod.productName] + prod.qty : prod.qty
            });

        });

        //GET TOP 10 PRODUCTS
        var sortable = [];
        for (var count in productCount) {
            sortable.push([count, productCount[count]]);
        }

        sortable.sort(function(a, b) {
            return a[1] - b[1];
        });
        sortable.reverse();
        sortable.splice(10)

        sortable.forEach(element => {
            if (productNames.indexOf(element[0]) === -1) {
                productNames.push(element[0])
            }
            prodCountValue.push(element[1])
        })

        console.log(productNames)
        console.log(prodCountValue)

        //GET MONTHLY SALES REPORT
        for (const month in monthlySales) {
            monthlyTotal.push(monthlySales[month])
        }
    }

});



var topProducts = document.getElementById('topProducts').getContext('2d')

var firstChart = new Chart(topProducts, {
    type: 'bar',
    data: {
        labels: productNames,
        datasets: [{
            data: prodCountValue,
            backgroundColor: [
                'rgba(255, 99, 132, 0.4)',
                'rgba(54, 162, 235, 0.4)',
                'rgba(255, 206, 86, 0.4)',
                'rgba(75, 192, 192, 0.4)',
                'rgba(153, 102, 255, 0.4)',
                'rgba(255, 159, 64, 0.4)',
                'rgba(200, 245, 66, 0.4)',
                'rgba(97, 250, 20, 0.4)',
                'rgba(251, 0, 255, 0.4)',
                'rgba(3, 36, 252, 0.4)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(200, 245, 66, 1)',
                'rgba(97, 250, 20, 1)',
                'rgba(251, 0, 255, 1)',
                'rgba(3, 36, 252, 1)'
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


var salesReport = document.getElementById('salesReport').getContext('2d');

var secondChart = new Chart(salesReport, {
    type: 'line',
    data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [{
            data: monthlyTotal,
            backgroundColor: [
                'rgba(75, 192, 192, .5)',
                'rgba(255, 99, 132, .5)',
                'rgba(3, 36, 252, .5)',
                'rgba(54, 162, 235, .5)',
                'rgba(255, 206, 86, .5)',
                'rgba(153, 102, 255, .5)',
                'rgba(255, 159, 64, .5)',
                'rgba(200, 245, 66, .5)',
                'rgba(97, 250, 20, .5)',
                'rgba(251, 0, 255, .5)',
                'rgba(0, 255, 247,.5)',
                'rgba(255, 0, 102, .5)'
            ],
            borderColor: [
                'rgba(3, 36, 252, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(200, 245, 66, 1)',
                'rgba(97, 250, 20, 1)',
                'rgba(251, 0, 255, 1)',
                'rgba(0, 255, 247,1)',
                'rgba(255, 0, 102, 1)'
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