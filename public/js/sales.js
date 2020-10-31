$(document).ready(function() {
    var orderList = []
    var products
    var sales

    $.ajax('/getAllProducts', {
        success: function(data, status, xhr) {
            products = data
        }
    });

    $.ajax('/getAllSales', {
        success: function(data, status, xhr) {
            sales = data
            $('#invoiveNumberDisplay').text(sales[sales.length - 1].invoiceNumber + 1)
            $('#invoiceNumber').val(parseInt(sales[sales.length - 1].invoiceNumber) + 1)
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
        $("#itemCount").val(orderList.length)
        $("#productOrderList").val(JSON.stringify(orderList))
    }




    function display() {
        $('#tableBody').empty()
        orderList.forEach(productOrder => {
            $('#orderTable').prepend("<tr><input class='prodIndx' type = 'hidden' value=" + productOrder.id + "><td>" + productOrder.productNumber + "</td><td>" + productOrder.productName + "</td><td>" + productOrder.price + "</td><td>" + productOrder.qty + "</td><td>" + productOrder.total + "</td><td><button class='btn btn-danger remove'><i class='fa fa-trash'></i></button></td></tr>")
        })

    }


    function addOrder() {
        if ($('#prodNum').val() != "") {

            let productNumber = $('#prodNum').val()

            let quantity = $('#qty').val() == "" ? 1 : parseInt($('#qty').val())

            let product = products.find(products => products.product_number == productNumber);

            if (product != undefined && product.qty > 0) {
                orderList.push({ 'id': orderList.length, 'productNumber': product.product_number, 'productName': product.product_name, 'price': product.price, 'qty': quantity, 'total': quantity * product.price });

            } else {
                alert("Product not found!")
            }

            $('#prodNum').val('')
            $('#qty').val('')
            display()
            getTotal()

        } else {
            alert("Enter product number!")
        }
    }


    function checkAmountTendered() {
        let total = $('#total').val()
        let cashTendered = $('#cashTendered').val()

        if (cashTendered < total) {
            alert("Not Enough Amount!")
        }

    }


    $('#orderTable').on('click', '.remove', function() {
        let res = confirm("Remove this Item")
        if (res == true) {
            let index = $(this).parents('tr').children('.prodIndx').val();
            orderList.splice(index, 1)
            display()
            getTotal()
        }
    });



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

    $('#cashTendered').keyup(function(e) {
        if (e.keyCode == 13) {
            checkAmountTendered()
        }

    })


});