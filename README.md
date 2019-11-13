JVanilla
=======
![Build Status][github-actions-image]

JVanilla is a super-ligth replacement for jQuery library with simple JS Vanilla code. It supports event handling, ajax calls and other fun stuff.
We can use the library method calls in the same JQuery way.

Usage 
-----

<script type="text/javascript" src="JVanilla.js"></script>

<script type="text/javascript">

    j(document).ready(function () {
        j('#btn_id').on('click', function(e) {
            if (event !== undefined) {
                event.preventDefault();
            }
            j(this).addClass('clicked')
        });

        JVanilla('#other_btn_id').hide();

        j("#paragraph_id").append("<p>More awesome content!!!</p>");
        $('#paragraph_id').css('color', 'red');

        j().ajax({
                method: 'GET',
                url: 'http://localhost/project/get_employee_list.php',
                success: function (resp) {

                    j("#div_list_results").html(resp);

                    j('.edit').on('click',function(){
                        alert('You press the edit button')
                    });

                },
                error: function (resp) {
                    console.log(resp);
                }
            }
        );

    });

</script>

Browser compatibility
---------------------
* IE 8+
* Chrome 8+
* Firefox 10+
* Safari 3+
* Opera 10.6+

Copyright and license
---------------------
The license is available within the repository in the [LICENSE][license] file.
