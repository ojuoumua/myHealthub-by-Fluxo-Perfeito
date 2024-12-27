// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
        form.addEventListener('submit', function (event) {
            if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
            }

            form.classList.add('was-validated')
        }, false)
        })

    $(document).ready(function () {
        if (localStorage.isLogged == 'true') { window.location.replace('index.html') }
        
        // Validate credentials
        $('#loginForm').submit(function (e) {
            e.preventDefault();
            e.stopPropagation();
            const email = $('#loginEmail').val().trim();
            const password = $('#loginPassword').val().trim();
            const users = JSON.parse(localStorage.users);
            // console.log(users);
            // console.log(email);
            // console.log(users[email]);
            const user = users.find((user)=>user.email==email);
            if (user) { 
                $('#loginEmailError').hide();     
            }
            else {
                // Email Error
                // console.log('emailError')
                $('#loginEmailError').show();
                $('#loginPasswordError').hide(); 
                $('#loginPassword').val('')
                return false
            }
            if (user.password == password) {
                $('loginPasswordError').hide(); 
            }
            else {
                // Password Error
                $('#loginPasswordError').show(); 
                $('#loginPassword').val('')
                return false
            }
            localStorage.currentUser = JSON.stringify(user);
            localStorage.isLogged = true;
            window.location.replace('index.html')
        })

        // Set max birthDate
        const today = new Date().toISOString().split('T')[0];
        var _date = today.split('-')
        var _18yAgo = [(parseInt(_date[0])-18).toString(), _date[1], _date[2]].join('-')
        console.log(_18yAgo)
        $('#birthDate').prop('max', _18yAgo)

        // Validate new user
        $('#signupForm').submit(function (e) {
            var valid = true;
            e.preventDefault();
            e.stopPropagation();
            $('#role').val($('#role').val().trim());
            $('#fullName').val($('#fullName').val().trim());
            $('#email').val($('#email').val().trim());
            $('#phone').val($('#phone').val().trim());
            const role = $('#role').val()||'utente';
            const fullName = $('#fullName').val();
            const email = $('#email').val();
            const password = $('#password').val();
            const confirmPassword = $('#password').val();
            const phone = $('#phone').val();
            if (role == 'utente') {
                $('#healthId').val($('#healthId').val().trim());
            }
            const healthId = $('#healthId').val();
            const birthDate = $('#birthDate').val().trim();
            // Get existing users
            const users = (localStorage.users) ? JSON.parse(localStorage.users) : [];
            // Check Full Name
            if (!$('#fullName')[0].checkValidity()) { 
                valid = false;
                $('#fullNameError').show() 
            }
            else { $('#fullNameError').hide() }
            // Check if email is already registered
            if (users.find((user) => user.email == $('#email').val())) { 
                valid = false;
                $('#emailError').html('O email introduzido já está registado')
                $('#emailError').show() 
            }
            else { 
                if (!$('#email')[0].checkValidity()) { 
                valid = false;
                $('#emailError').html('O email não tem um formato válido')
                    $('#emailError').show() 
                }
                else { $('#emailError').hide() }
            }
            // Check password
            $('#confirmPasswordError').hide();
            if (!$('#password')[0].checkValidity()) { 
                valid = false;
                $('#passwordError').show() 
            }
            else { 
                $('#passwordError').hide() 
                // Confirm password
                if (password != confirmPassword) { 
                    valid = false;
                    $('#confirmPasswordError').show()
                }
                else { $('#confirmPasswordError').hide() }
            }
            
            if (role == 'utente') {
                // Check healthId
                if (!$('#healthId')[0].checkValidity()) {
                    valid = false;
                    $('#healthIdError').show()
                }
                else { $('#healthIdError').hide() }

                // Check Birth Date
                // if (!birthDate < _18yAgo) {
                // if (!$('#birthDate')[0].checkValidity()) {
                if (!(new Date(birthDate).getTime() < new Date(_18yAgo).getTime())) { 
                    valid = false;
                    $('#birthDateError').show(); }
                else { $('#birthDateError').hide(); }            
            }
            console.log(!valid)
            if (!valid) { return }
            users.push({"fullName":fullName,"healthId":healthId,"email":email,"password":password,"birthDate":birthDate,"role":role,"phone":phone});
            localStorage.users = JSON.stringify(users)
            window.location.replace('login.html')
        })

        $('#showSignupForm').click(function () {
            $('input').val('');
            $('#loginContainer').hide();
            $('#signupContainer').show();
        })

        $('#showLoginForm').click(function () {
            $('input').val('');
            $('#signupContainer').hide();
            $('#loginContainer').show();
        })

        $('#user-tab').click(function () {
            $('#signupForm').removeClass('was-validated');
            $('input').val('');
            $('#healthId').prop('disabled', false)
            $('#healthId').show()
            // $('#healthId').val('')
            $('#birthDate').prop('disabled', false)
            $('#birthDate').show()
            // $('#birthDate').val('')
            $('#userType').val('utente')
            $('#user-tab').addClass('fw-bold')
            $('#admin-tab').removeClass('fw-bold')
        })

        $('#admin-tab').click(function () {
            $('#signupForm').removeClass('was-validated');
            $('input').val('');
            $('#healthId').prop('disabled', true);
            $('#healthId').hide();
            $('#healthIdError').hide();
            $('#birthDate').prop('disabled', true);
            $('#birthDate').hide();
            $('#birthDateError').hide();
            $('#userType').val('técnico');
            $('#user-tab').removeClass('fw-bold');
            $('#admin-tab').addClass('fw-bold');
        })

        $('#signupContainer').hide();
        $('#loginContainer').show();
        $('input').val('');
    })

})()
