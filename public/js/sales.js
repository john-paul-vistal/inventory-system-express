$(document).ready(function() {
    var orderList = []
    var products
    var sales

    $.ajax('/getAllProducts', {
        success: function(data, status, xhr) { // success callback function
            products = data
        }
    });

    $.ajax('/getAllSales', {
        success: function(data, status, xhr) { // success callback function
            sales = data
            $('#invoiveNumberDisplay').text(sales[sales.length - 1].invoiceNumber + 1)
            $('#invoiceNumber').val(sales[sales.length - 1].invoiceNumber + 1)
        }
    });

    function getTotal() {

        let total = 0
        orderList.forEach(productOrder => {

            total += productOrder.total

        })

        $("#totalDisplay").text(total)
        $("#itemCountDisplay").text(orderList.length)
        $("#total").val(total)
        $("#itemCount").val(total)
        $("#productOrderList").val(JSON.stringify(orderList))
    }

    function display() {
        $('#tableBody').empty()
        orderList.forEach(productOrder => {
            $('#orderTable').prepend("<tr><td>" + productOrder.productNumber + "</td><td>" + productOrder.productName + "</td><td>" + productOrder.price + "</td><td>" + productOrder.qty + "</td><td>" + productOrder.total + "</td><td><button class='btn btn-danger'><i class='fa fa-trash'></i></button></td></tr>")
        })

    }


    function addOrder() {
        if ($('#prodNum').val() != "") {

            let productNumber = $('#prodNum').val()

            let quantity = $('#qty').val() == "" ? 1 : $('#qty').val()

            let product = products.find(products => products.product_number == productNumber);

            if (product != undefined && product.qty > 0) {
                orderList.push({ 'id': orderList.length + 1, 'productNumber': product.product_number, 'productName': product.product_name, 'price': product.price, 'qty': quantity, 'total': quantity * product.price });

            } else {
                console.log("Product not found!")
            }

            $('#prodNum').val('')
            $('#qty').val('')
            display()
            getTotal()

        } else {
            console.log("Enter product number!")
        }
    }


    function removeOrder() {

    }




    //ADD BUTTON
    $('#order').on('click', function() {
        addOrder()
    })

    //ENTER PRODUCT NUMBER
    $('#prodNum').keyup(function(e) {
        if (e.keyCode == 13) {
            addOrder()
        }
    });

    //ENTER QTY
    $('#qty').keyup(function(e) {
        if (e.keyCode == 13) {
            addOrder()
        }
    });


    $('#cashTendered').keyup(function(e) {

        let total = $('#total').val()
        let cashTendered = $('#cashTendered').val()
        $('#change').val(cashTendered - total)

    })


});