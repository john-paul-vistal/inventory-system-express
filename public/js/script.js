$(document).ready(function() {

    //Tooltip
    $("[data-toggle=tooltip]").tooltip();

    //Hide and Show of Sidebar
    $("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("active");
    });


    //Logout
    $('#logout').click(function() {
        Swal.fire({
            title: 'Are you sure?',
            text: "You will be logged out to your accout!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Logout'
        }).then((result) => {
            if (result.value == true) {
                window.location = "logout.php";
            }
        })
    });


    // ADMIN PROFILE IMAGE PICKER
    var readURLadmin = function(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function(e) {
                $('#avatar').attr('src', e.target.result);
            }

            reader.readAsDataURL(input.files[0]);
        }
    }

    $("#imagePicker").on('change', function() {
        readURLadmin(this);
    });

    //BLOG IMAGE PICKER
    var readURLblog = function(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function(e) {
                $('#featuredPhoto').attr('src', e.target.result);
            }

            reader.readAsDataURL(input.files[0]);
        }
    }

    $("#blog_image").on('change', function() {
        readURLblog(this);
    });

    //SEARCH FOR BLOGS
    $('#searchInput').on('keyup', function() {
        var input, filter, cards, cardContainer, title, i;
        input = document.getElementById("searchInput");
        filter = input.value.toUpperCase();
        cardContainer = document.getElementById("blogRecords");
        cards = cardContainer.getElementsByClassName("blog");
        for (i = 0; i < cards.length; i++) {
            title = cards[i].querySelector(".card-content h5.title");
            if (title.innerText.toUpperCase().indexOf(filter) > -1) {
                $(cards[i]).parent().fadeIn("slow");
                $(cards[i]).parent().css('display', 'block')
            } else {
                $(cards[i]).parent().fadeOut("slow");
                $(cards[i]).parent().css('display', 'none')
            }
        }

    });
    //SEARCH FOR ADMINS
    $('#searchAdmin').on('keyup', function() {
        var input, filter, cards, cardContainer, name, i;
        input = document.getElementById("searchAdmin");
        filter = input.value.toUpperCase();
        cardContainer = document.getElementById("adminRecords");
        cards = cardContainer.getElementsByClassName("admins");
        for (i = 0; i < cards.length; i++) {
            name = cards[i].querySelector(".card-body h4.name");
            if (name.innerText.toUpperCase().indexOf(filter) > -1) {
                $(cards[i]).parent().fadeIn("slow");
                $(cards[i]).parent().css('display', 'block')
            } else {
                $(cards[i]).parent().fadeOut("slow");
                $(cards[i]).parent().css('display', 'none')
            }
        }

    });


    $('#edit').on('click', function() {
        $('#edit').text("Update")
        $('#prodName').addClass('editable')
        $('#prodName').attr('readonly', false)

        $('#brand').addClass('editable')
        $('#brand').attr('readonly', false)

        $('#price').addClass('editable')
        $('#price').attr('readonly', false)

        $('#prodName').addClass('editable')
        $('#prodName').attr('readonly', false)

    });


}); //end code