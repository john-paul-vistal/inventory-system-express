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
                window.location = "/logout";
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

        $('#edit').css('display', 'none')

        $('#update').css("display", "inline")

        $('#prodName').addClass('editable')
        $('#prodName').attr('readonly', false)

        $('#brand').addClass('editable')
        $('#brand').attr('readonly', false)

        $('#price').addClass('editable')
        $('#price').attr('readonly', false)

        $('#qty').addClass('editable')
        $('#qty').attr('readonly', false)

    });

    $('#edit').on('click', function() {

        $('#edit').css('display', 'none')

        $('#update').css("display", "inline")

        $('#fullname').addClass('editable')
        $('#fullname').attr('readonly', false)

        $('#email').addClass('editable')
        $('#email').attr('readonly', false)

        $('#username').addClass('editable')
        $('#username').attr('readonly', false)

        $('#password').addClass('editable')
        $('#password').attr('readonly', false)

        $('#gender').addClass('editable')
        $('#gender').attr('readonly', false)

        $('#birthDate').addClass('editable')
        $('#birthDate').attr('readonly', false)

    });



    //Attach Image
    $(".imgAdd").click(function() {
        $(this).closest(".row").find('.imgAdd').before('<div class="col-md-3 imgUp"><div class="imagePreview"></div><label class="btn btn-info">Upload Image<input type="file" class="uploadFile img uploadButton" value="Upload Photo"></label></div>');
    });

    $(document).on("click", "i.del", function() {
        $(this).parent().remove();
    });

    $(function() {
        $(document).on("change", ".uploadFile", function() {
            var uploadFile = $(this);
            var files = !!this.files ? this.files : [];
            if (!files.length || !window.FileReader) return; // no file selected

            if (/^image/.test(files[0].type)) { // image ra ang ma upload
                var reader = new FileReader(); // instance ni sya sa file reader
                reader.readAsDataURL(files[0]); // read ang file nga gi upload

                reader.onloadend = function() { // e background sa div ang selected image
                    uploadFile.closest(".imgUp").find('.imagePreview').css("background-image", "url(" + this.result + ")");
                }
            }

        });
    });


}); //end code