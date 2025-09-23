"use strict";

// https://jsonplaceholder.typicode.com/posts

// Store section elements for better readability and maintainability
const sections = {
    first: document.getElementById('firstSection'),
    second: document.getElementById('secondSection'),
    third: document.getElementById('thirdSection'),
    notification: document.getElementById('notificationSection'),
    // email: document.getElementById('EmailSection'),
    purpose: document.getElementById('purposeQuestionnaire'),
    time: document.getElementById('timeQuestionnaire'),
    support: document.getElementById('supportTypeQuestionnaire'),
    abuse: document.getElementById('abuseTypeQuestionnaire'),
    help: document.getElementById('helpTypeQuestionnaire'),
    gender: document.getElementById('genderQuestionnaire'),
    body: document.getElementById('ContentBody')
};

// Variable to store the registered email for resending verification
let registeredEmail = null;

// Function to show a specific section and hide others
function showSection(sectionToShow) {
    // Hide all sections first
    for (const key in sections) {
    sections[key].classList.remove('active');
}
    // Show the requested section
    sectionToShow.classList.add('active');

}

// Event listener for signup link - shows second section (Create Account)
document.getElementById('signin-signup-link').addEventListener("click", function (e) { 
    e.preventDefault(); // Prevent default link behavior
    showSection(sections.second);
});

// Event listener for register button - shows third section (Register with Username)
// document.getElementById('signup-email-register-btn').addEventListener("click", function (e) {
//     e.preventDefault(); // Prevent default button behavior if it's in a form
//     showSection(sections.third);
// });

// Event listener for sign in buttons - shows first section (Sign In)
// document.getElementById('signup-email-signin-link').addEventListener("click", function (e) {
//     e.preventDefault(); // Prevent default link behavior
//     showSection(sections.first);
// });

// document.getElementById('signup-username-signin-link').addEventListener("click", function (e) {
//     e.preventDefault(); // Prevent default link behavior
//     showSection(sections.first);
// });

// Event listener for login signup link - shows second section (Create Account)
document.getElementById('login-signup-link').addEventListener("click", function (e) {
    e.preventDefault(); // Prevent default link behavior
    showSection(sections.second);
});

// document.querySelectorAll('#signUpBtn').forEach(btn => {
//     btn.addEventListener("click", function (e) {
//         e.preventDefault(); // Prevent default link behavior
//         showSection(sections.notification);
//         sections.body.style.height = '100vh';
//     })
// });



// Event listeners for questionnaire sections
// document.getElementById('notification-ok-btn').addEventListener("click", function () {
//     showSection(sections.email);
// });

// document.getElementById('notification-start-btn').addEventListener("click", function () {
//     showSection(sections.purpose);
// });

document.getElementById('questionnaire-purpose-next-btn').addEventListener("click", function () {
    const purposeCheckboxes = document.querySelectorAll('#purposeQuestionnaire input[type="checkbox"]');
    const isChecked = Array.from(purposeCheckboxes).some(cb => cb.checked);
    if (!isChecked) {
        notificationMessage.style.display = 'flex';
        notificationMessage.style.backgroundColor = '#E91919';
        notificationMessage.textContent = 'Please select at least one option before proceeding.';
        setTimeout(() => { notificationMessage.style.display = 'none'; }, 2000);
        return;
    }
    showSection(sections.time);
});

document.getElementById('questionnaire-time-next-btn').addEventListener("click", function () {
    const timeCheckboxes = document.querySelectorAll('#timeQuestionnaire input[type="checkbox"]');
    const isChecked = Array.from(timeCheckboxes).some(cb => cb.checked);
    if (!isChecked) {
        notificationMessage.style.display = 'flex';
        notificationMessage.style.backgroundColor = '#E91919';
        notificationMessage.textContent = 'Please select at least one option before proceeding.';
        setTimeout(() => { notificationMessage.style.display = 'none'; }, 2000);
        return;
    }
    showSection(sections.support);
});

document.getElementById('questionnaire-support-next-btn').addEventListener("click", function () {
    const supportCheckboxes = document.querySelectorAll('#supportTypeQuestionnaire input[type="checkbox"]');
    const isChecked = Array.from(supportCheckboxes).some(cb => cb.checked);
    if (!isChecked) {
        notificationMessage.style.display = 'flex';
        notificationMessage.style.backgroundColor = '#E91919';
        notificationMessage.textContent = 'Please select at least one option before proceeding.';
        setTimeout(() => { notificationMessage.style.display = 'none'; }, 2000);
        return;
    }
    showSection(sections.abuse);
});

document.getElementById('questionnaire-abuse-next-btn').addEventListener("click", function () {
    const abuseCheckboxes = document.querySelectorAll('#abuseTypeQuestionnaire input[type="checkbox"]');
    const isChecked = Array.from(abuseCheckboxes).some(cb => cb.checked);
    if (!isChecked) {
        notificationMessage.style.display = 'flex';
        notificationMessage.style.backgroundColor = '#E91919';
        notificationMessage.textContent = 'Please select at least one option before proceeding.';
        setTimeout(() => { notificationMessage.style.display = 'none'; }, 2000);
        return;
    }
    showSection(sections.help);
});

document.getElementById('questionnaire-help-next-btn').addEventListener("click", function () {
    const helpCheckboxes = document.querySelectorAll('#helpTypeQuestionnaire input[type="checkbox"]');
    const isChecked = Array.from(helpCheckboxes).some(cb => cb.checked);
    if (!isChecked) {
        notificationMessage.style.display = 'flex';
        notificationMessage.style.backgroundColor = '#E91919';
        notificationMessage.textContent = 'Please select at least one option before proceeding.';
        setTimeout(() => { notificationMessage.style.display = 'none'; }, 2000);
        return;
    }
    showSection(sections.gender);
});

document.getElementById('questionnaire-gender-next-btn').addEventListener("click", function (e) {
    e.preventDefault(); // Prevent default link behavior

    window.open("userHero.html", "_self");
    // Collect all selected checkboxes
    // theLoaderContainer.style.display = 'flex';
    // collectAndSendQuestionnaireData();
});

function collectAndSendQuestionnaireData() {
    const checkedBoxes = document.querySelectorAll('input[type="checkbox"]:checked');
    if (checkedBoxes.length === 0) {
        notificationMessage.style.display = 'flex';
        notificationMessage.style.backgroundColor = '#E91919';
        notificationMessage.textContent = 'Please select at least one option before submitting.';
        setTimeout(() => { notificationMessage.style.display = 'none'; }, 2000);
        return;
    }
    const questionnaireData = {};

    checkedBoxes.forEach(box => {
        const name = box.name;
        const value = box.value;

        if (!questionnaireData[name]) {
            questionnaireData[name] = [];
        }
        questionnaireData[name].push(value);
    });

    console.log('Collected questionnaire data:', questionnaireData);

    // Send to backend
    sendQuestionnaireToBackend(questionnaireData);

}

async function sendQuestionnaireToBackend(data) {
    theLoaderContainer.style.display = 'flex';
    try {
        const response = await fetch('https://safe-anchor-backend.onrender.com/api/victims/questionnaire', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        console.log('Questionnaire data sent successfully:', result);

        // Show success message
        if (response.ok) {
            
            setTimeout(() => {
                theLoaderContainer.style.display = 'none';
                notificationMessage.style.display = 'flex';
                notificationMessage.style.backgroundColor = '#21B24D';
                notificationMessage.textContent = 'Preferences saved successfully!';
            }, 1000);
    
            setTimeout(() => {
                notificationMessage.style.display = 'none';
                // Uncheck all checkboxes
                document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
                // Redirect to userHero.html
                // window.location.href = 'userHero.html';
                window.open("userHero.html", "_self");
            }, 2000);

        }

    } catch (error) {

theLoaderContainer.style.display = 'none';

        console.error('Error sending questionnaire data:', error);
        notificationMessage.style.display = 'flex';
        notificationMessage.style.backgroundColor = '#E91919';
        notificationMessage.textContent = 'Failed to save preferences. Please try again.';

        setTimeout(() => {
            notificationMessage.style.display = 'none';
        }, 2000);
    }
}

// Back button event listeners for questionnaires
document.querySelectorAll('.back-btn').forEach(btn => {
    btn.addEventListener("click", function () {
        const currentSection = this.closest('.notification-section');
        const currentId = currentSection.id;
        
        if (currentId === 'timeQuestionnaire') {
            showSection(sections.purpose);
        } else if (currentId === 'supportTypeQuestionnaire') {
            showSection(sections.time);
        } else if (currentId === 'abuseTypeQuestionnaire') {
            showSection(sections.support);
        } else if (currentId === 'helpTypeQuestionnaire') {
            showSection(sections.abuse);
        } else if (currentId === 'genderQuestionnaire') {
            showSection(sections.help);
        }
    });
});


// Optional: Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Return to first section when Escape key is pressed
        showSection(sections.first);
    }
});


// Getting hold of the inputted values in the sign in section
const usernameForSignIn = document.getElementById('signin-username');
const passwordForSignIn = document.getElementById('signin-password');
const signInForm = document.getElementsByClassName('signInForm');
const theLoaderContainer = document.querySelector('.loader-container');
const theLoader = document.querySelector('.loader');
const notificationMessage = document.getElementById('notificationMessage');


// Event listener for forgot password
document.querySelector('.forget-password').addEventListener('click', async function () {
    const username = usernameForSignIn.value.trim();

    if (username === '') {
        notificationMessage.style.backgroundColor = '#E91919';
        notificationMessage.textContent = 'Please enter your Username.';
        notificationMessage.style.display = 'flex';
        setTimeout(() => {
            notificationMessage.style.display = 'none';
        }, 2000);
        return;
    }

    // if (!email.includes('@') || !email.includes('.')) {
    //     notificationMessage.style.backgroundColor = '#E91919';
    //     notificationMessage.textContent = 'Please enter a valid email address.';
    //     notificationMessage.style.display = 'flex';
    //     setTimeout(() => {
    //         notificationMessage.style.display = 'none';
    //     }, 2000);
    //     return;
    // }

    // Show loader
    theLoaderContainer.style.display = 'flex';

    try {
        const response = await fetch('https://safe-anchor-backend.onrender.com/api/auth/forgot-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: username
            })
        });

        const data = await response.json();

        setTimeout(() => {
            theLoaderContainer.style.display = 'none';
            notificationMessage.style.display = 'flex';
            if (response.ok) {
                notificationMessage.style.backgroundColor = '#21B24D';
                notificationMessage.textContent = 'Password reset email sent successfully. Please check your inbox.';
            } else {
                notificationMessage.style.backgroundColor = '#E91919';
                notificationMessage.textContent = 'Failed to send reset email. Please try again.';
            }
        }, 1000);

        setTimeout(() => {
            notificationMessage.style.display = 'none';
        }, 4000);

        console.log('Forgot password response:', data);
    } catch (error) {
        setTimeout(() => {
            theLoaderContainer.style.display = 'none';
            notificationMessage.style.display = 'flex';
            notificationMessage.style.backgroundColor = '#E91919';
            notificationMessage.textContent = 'Error: ' + error.message;
        }, 1000);

        setTimeout(() => {
            notificationMessage.style.display = 'none';
        }, 2000);

        console.log('Forgot password error:', error);
    }
});


// For users with existing login details
document.getElementById('signin-submit-btn').addEventListener('click', async function (e) {
    e.preventDefault();
    const username = usernameForSignIn.value;
    const password = passwordForSignIn.value;
    console.log(username, password);

    if (username === '' || password === '') {
        notificationMessage.style.backgroundColor = '#E91919';
        notificationMessage.textContent = 'Please fill in the details';
        notificationMessage.style.display = 'flex';
        setTimeout(() => {
            notificationMessage.style.display = 'none';
        }, 2000);
        return;
    }

    // Username validation (basic: not empty, at least 3 characters)
    if (username.length < 3) {
        notificationMessage.style.backgroundColor = '#E91919';
        notificationMessage.textContent = 'Username must be at least 3 characters long';
        notificationMessage.style.display = 'flex';
        setTimeout(() => {
            notificationMessage.style.display = 'none';
        }, 2000);
        return;
    }

    // Password validation (basic: not empty, at least 6 characters)
    if (password.length < 6) {
        notificationMessage.style.backgroundColor = '#E91919';
        notificationMessage.textContent = 'Password must be at least 6 characters long';
        notificationMessage.style.display = 'flex';
        setTimeout(() => {
            notificationMessage.style.display = 'none';
        }, 2000);
        return;
    }

    // Show loader
    theLoaderContainer.style.display = 'flex';

    try {
        // Send data to backend using POST
        const response = await fetch('https://safe-anchor-backend.onrender.com/api/auth/login', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            username: username,
            password: password
            })
        });


        const data = await response.json();
       if (response.ok) {
            setTimeout(() => {
                theLoaderContainer.style.display = 'none';
                notificationMessage.style.display = 'flex';
                notificationMessage.style.backgroundColor = '#21B24D';
                notificationMessage.textContent = 'Success: Login successful.';
            }, 1000);

            setTimeout(() => {
                notificationMessage.style.display = 'none';
                // Store data before resetting fields
                localStorage.setItem('authToken', data.token);
                localStorage.setItem('username', username);
                // Reset fields
                usernameForSignIn.value = '';
                passwordForSignIn.value = '';

                // showSection(sections.purpose);
                // Redirect to new HTML file after successful sign in
                 window.location.href = 'userHero.html'; // Replace with your target HTML file
            }, 2000);

        } else {
            setTimeout(() => {
             theLoaderContainer.style.display = 'none';
             theLoaderContainer.style.display = 'none';
             notificationMessage.style.display = 'flex';
             notificationMessage.style.backgroundColor = '#E91919';
             notificationMessage.textContent = 'Login failed. Please check your credentials.';
         }, 2000);

        setTimeout(() => {
            notificationMessage.style.display = 'none';
        }, 4000);
       }
        console.log('Success:', data);

        return;

    } catch (error) {
        setTimeout(() => {
            theLoaderContainer.style.display = 'none';
            theLoaderContainer.style.display = 'none';
            notificationMessage.style.display = 'flex';
            notificationMessage.style.backgroundColor = '#E91919';
            notificationMessage.textContent = 'Error: ' + error.message;
        }, 1000);

        setTimeout(() => {
            notificationMessage.style.display = 'none';
        }, 2000);

        console.log('Error:', error);
        // Handle error, e.g., show error message
    }


})


// For login form after Email verification
document.getElementById('login-submit-btn').addEventListener('click', async function (e) {
    e.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    console.log(username, password);

    if (username === '' || password === '') {
        notificationMessage.style.backgroundColor = '#E91919';
        notificationMessage.textContent = 'Please fill in the details';
        notificationMessage.style.display = 'flex';
        setTimeout(() => {
            notificationMessage.style.display = 'none';
        }, 2000);
        return;
    }

    // Username validation (basic: not empty, at least 3 characters)
    if (username.length < 3) {
        notificationMessage.style.backgroundColor = '#E91919';
        notificationMessage.textContent = 'Username must be at least 3 characters long';
        notificationMessage.style.display = 'flex';
        setTimeout(() => {
            notificationMessage.style.display = 'none';
        }, 2000);
        return;
    }
    // Password validation (basic: not empty, at least 6 characters)
    if (password.length < 6) {
        notificationMessage.style.backgroundColor = '#E91919';
        notificationMessage.textContent = 'Password must be at least 6 characters long';
        notificationMessage.style.display = 'flex';
        setTimeout(() => {
            notificationMessage.style.display = 'none';
        }, 2000);
        return;
    }

    // Show loader
    theLoaderContainer.style.display = 'flex';

    try {
        // Send data to backend using POST
        const response = await fetch('https://safe-anchor-backend.onrender.com/api/auth/login', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            username: username,
            password: password
            })
        });


        const data = await response.json();


        setTimeout(() => {
            theLoaderContainer.style.display = 'none';
            notificationMessage.style.display = 'flex';
            notificationMessage.style.backgroundColor = '#21B24D';
            notificationMessage.textContent = 'Success: Data sent successfully.';
        }, 1000);

        setTimeout(() => {
            notificationMessage.style.display = 'none';
            // Store data before resetting fields
            localStorage.setItem('authToken', data.token);
            localStorage.setItem('username', username);
            // Reset fields
            document.getElementById('login-username').value = '';
            document.getElementById('login-password').value = '';

            showSection(sections.purpose);
            // Redirect to new HTML file after successful sign in
            //  window.location.href = 'userHero.html'; // Replace with your target HTML file
        }, 2000);


        console.log('Success:', data);
    } catch (error) {
        setTimeout(() => {
            theLoaderContainer.style.display = 'none';
            theLoaderContainer.style.display = 'none';
            notificationMessage.style.display = 'flex';
            notificationMessage.style.backgroundColor = '#E91919';
            notificationMessage.textContent = 'Error: ' + error.message;
        }, 1000);

        setTimeout(() => {
            notificationMessage.style.display = 'none';
        }, 2000);

        console.log('Error:', error);
        // Handle error, e.g., show error message
    }


})


// For new users with email address
const signUpEmail = document.getElementById('signup-email-email');
const signUpFirstname = document.getElementById('signup-email-firstname');
const signUpUsername = document.getElementById('signup-email-username');
const signUpLastname = document.getElementById('signup-email-lastname');
const signUpPhone = document.getElementById('signup-email-phone');
const signUpPassword = document.getElementById('signup-email-password');
const signUpConfirmPassword = document.getElementById('signup-email-confirm-password');

document.getElementById('signup-email-submit-btn').addEventListener("click", async function (e) {
    e.preventDefault();
    const email = signUpEmail.value.trim();
    const username = signUpUsername.value.trim();
    const firstName = signUpFirstname.value.trim();
    const lastName = signUpLastname.value.trim();
    const fullName = firstName + ' ' + lastName;
    const phoneNumber = signUpPhone.value.trim();
    const password = signUpPassword.value;
    const confirmPassword = signUpConfirmPassword.value;
    console.log(email, password, fullName, phoneNumber, confirmPassword);

    // Validation
    if (email === '' || username === '' || firstName === '' || lastName === '' || phoneNumber === '' || password === '' || confirmPassword === '') {
        notificationMessage.style.backgroundColor = '#E91919';
        notificationMessage.textContent = 'Please fill in all the details';
        notificationMessage.style.display = 'flex';
        setTimeout(() => {
            notificationMessage.style.display = 'none';
        }, 2000);
        return;
    }

    // Email validation
    if (!email.includes('@') || !email.includes('.')) {
        notificationMessage.style.backgroundColor = '#E91919';
        notificationMessage.textContent = 'Please enter a valid email address';
        notificationMessage.style.display = 'flex';
        setTimeout(() => {
            notificationMessage.style.display = 'none';
        }, 2000);
        return;
    }

    // First name validation (at least 1 character, letters only)
    const nameRegex = /^[a-zA-Z]+$/;
    if (!nameRegex.test(firstName)) {
        notificationMessage.style.backgroundColor = '#E91919';
        notificationMessage.textContent = 'Please enter a valid first name (letters only)';
        notificationMessage.style.display = 'flex';
        setTimeout(() => {
            notificationMessage.style.display = 'none';
        }, 2000);
        return;
    }

    // Last name validation (at least 1 character, letters only)
    if (!nameRegex.test(lastName)) {
        notificationMessage.style.backgroundColor = '#E91919';
        notificationMessage.textContent = 'Please enter a valid last name (letters only)';
        notificationMessage.style.display = 'flex';
        setTimeout(() => {
            notificationMessage.style.display = 'none';
        }, 2000);
        return;
    }

    // Phone number validation (basic: digits, spaces, dashes, parentheses, 10-15 characters)
    const phoneRegex = /^[\d\s\-\(\)]{10,15}$/;
    if (!phoneRegex.test(phoneNumber)) {
        notificationMessage.style.backgroundColor = '#E91919';
        notificationMessage.textContent = 'Please enter a valid phone number';
        notificationMessage.style.display = 'flex';
        setTimeout(() => {
            notificationMessage.style.display = 'none';
        }, 2000);
        return;
    }

    // Password strength validation
    if (password.length < 8) {
        notificationMessage.style.backgroundColor = '#E91919';
        notificationMessage.textContent = 'Password must be at least 8 characters long';
        notificationMessage.style.display = 'flex';
        setTimeout(() => {
            notificationMessage.style.display = 'none';
        }, 2000);
        return;
    }

    // Check for at least one uppercase, one lowercase, one number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;
    if (!passwordRegex.test(password)) {
        notificationMessage.style.backgroundColor = '#E91919';
        notificationMessage.textContent = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
        notificationMessage.style.display = 'flex';
        setTimeout(() => {
            notificationMessage.style.display = 'none';
        }, 2000);
        return;
    }

    // Confirm password
    if (password !== confirmPassword) {
        notificationMessage.style.backgroundColor = '#E91919';
        notificationMessage.textContent = 'Passwords do not match';
        notificationMessage.style.display = 'flex';
        setTimeout(() => {
            notificationMessage.style.display = 'none';
        }, 2000);
        return;
    }

    // Show loader
    theLoaderContainer.style.display = 'flex';

    try {
        // Send data to backend for registration
        const response = await fetch('https://safe-anchor-backend.onrender.com/api/auth/register', {
            method: 'POST',
            headers: {
                 'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                username: username,
                firstName: firstName,
                lastName: lastName,
                password: password,
                confirmPassword: confirmPassword,
                phone: phoneNumber,
                userType: "victim"
            })
        });


        const data = await response.json();


            registeredEmail = email; // Store email for resending
            localStorage.setItem('email', email); // Store email in localStorage
            setTimeout(() => {
                theLoaderContainer.style.display = 'none';
                notificationMessage.style.display = 'flex';
                notificationMessage.style.backgroundColor = '#21B24D';
                notificationMessage.textContent = 'Registration successful! Please check your email for verification.';
            }, 1000);

            setTimeout(() => {
                notificationMessage.style.display = 'none';
                // Reset fields
                signUpEmail.value = '';
                signUpFirstname.value = '';
                signUpLastname.value = '';
                signUpPhone.value = '';
                signUpPassword.value = '';
                signUpConfirmPassword.value = '';
                // Show email verification section
                showSection(sections.notification);
            }, 3000);
        

        console.log('Registration Success:', data);
    } catch (error) {
        setTimeout(() => {
            theLoaderContainer.style.display = 'none';
            notificationMessage.style.display = 'flex';
            notificationMessage.style.backgroundColor = '#E91919';
            notificationMessage.textContent = 'Registration failed: ' + error.message;
        }, 1000);

        setTimeout(() => {
            notificationMessage.style.display = 'none';
        }, 2000);

        console.log('Registration Error:', error);
    }
})


// Email OTP verification function

document.getElementById('verification-form').addEventListener('submit', async function (e) {
    e.preventDefault();
    const code = document.getElementById('verification-code').value.trim();
    if (code.length !== 6) {
        document.getElementById('verification-error').textContent = 'Please enter a valid 6-digit code.';
        document.getElementById('verification-error').style.display = 'block';
        return;
    }
    // Hide error
    document.getElementById('verification-error').style.display = 'none';
    // Show loader
    theLoaderContainer.style.display = 'flex';
    try {
        const response = await fetch('https://safe-anchor-backend.onrender.com/api/auth/verify-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                otp: code
            })
        });
        const data = await response.json();
        setTimeout(() => {
            theLoaderContainer.style.display = 'none';
            if (response.ok) {
                notificationMessage.style.display = 'flex';
                notificationMessage.style.backgroundColor = '#21B24D';
                notificationMessage.textContent = 'Verification successful!';
                setTimeout(() => {
                    notificationMessage.style.display = 'none';
                    showSection(sections.third); // Show the next section
                }, 2000);
            } else {
                document.getElementById('verification-error').textContent = data.message || 'Verification failed.';
                document.getElementById('verification-error').style.display = 'block';
            }
        }, 2000);
    } catch (error) {
        setTimeout(() => {
            theLoaderContainer.style.display = 'none';
            document.getElementById('verification-error').textContent = 'Error: ' + error.message;
            document.getElementById('verification-error').style.display = 'block';
        }, 1000);
    }
});


// For resending verification code
document.querySelector('.resend-email').addEventListener('click', async function () {

    // Show loader
    theLoaderContainer.style.display = 'flex';

    if (!registeredEmail) {

        notificationMessage.style.display = 'flex';
        notificationMessage.style.backgroundColor = '#E91919';
        notificationMessage.textContent = 'No email to resend to. Please register first.';
        setTimeout(() => {
            notificationMessage.style.display = 'none';
        }, 2000);
        return;
    }
    try {

        const response = await fetch('https://safe-anchor-backend.onrender.com/api/auth/resend-otp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: registeredEmail
            })
        });

        if (response.ok) {
            setTimeout(() => {
                theLoaderContainer.style.display = 'none';
                notificationMessage.style.display = 'flex';
                notificationMessage.style.backgroundColor = '#21B24D';
                notificationMessage.textContent = 'Verification code resent to ' + registeredEmail;
            }, 2000);
    
            setTimeout(() => { notificationMessage.style.display = 'none'; }, 4000);
            
        } else {
            setTimeout(() => {
            theLoaderContainer.style.display = 'none';
            notificationMessage.style.display = 'flex';
            notificationMessage.style.backgroundColor = '#E91919';
            notificationMessage.textContent = 'Failed to resend code';
        }, 2000);

        setTimeout(() => { notificationMessage.style.display = 'none'; }, 4000);
        }

    } catch (error) {
        setTimeout(() => {
            theLoaderContainer.style.display = 'none';
            notificationMessage.style.display = 'flex';
            notificationMessage.style.backgroundColor = '#E91919';
            notificationMessage.textContent = 'Failed to resend code: ' + error.message;
        }, 2000);

        setTimeout(() => { notificationMessage.style.display = 'none'; }, 4000);
    }
});



// document.getElementById('signup-email-submit-btn').addEventListener("click", function (e) {
// e.preventDefault();
//     showSection(sections.notification);
//  })



// document.getElementById('signup-email-submit-btn').addEventListener("click", async function (e) {
//     showSection(sections.third);
// })
 
// document.getElementById('verification-form').addEventListener("click", function (e) {
//     e.preventDefault();
//     showSection(sections.third);
//  })

// Testing Verification form submit handler


// for new users with username
// const signUpUsername = document.getElementById('signup-username-username');
// const signUpUsernameEmail = document.getElementById('signup-username-email');
// const signUpUsernamePhone = document.getElementById('signup-username-phone');
// const signUpUsernamePassword = document.getElementById('signup-username-password');
// const signUpUsernameConfirmPassword = document.getElementById('signup-username-confirm-password');

// document.getElementById('signup-username-submit-btn').addEventListener("click", async function (e) {
//     e.preventDefault();
//     const username = signUpUsername.value.trim();
//     const email = signUpUsernameEmail.value.trim();
//     const phoneNumber = signUpUsernamePhone.value.trim();
//     const password = signUpUsernamePassword.value;
//     const confirmPassword = signUpUsernameConfirmPassword.value;
//     console.log(email, password, username, phoneNumber, confirmPassword);

//     // Validation
//     if (email === '' || username === '' || phoneNumber === '' || password === '' || confirmPassword === '') {
//         notificationMessage.style.backgroundColor = '#E91919';
//         notificationMessage.textContent = 'Please fill in all the details';
//         notificationMessage.style.display = 'flex';
//         setTimeout(() => {
//             notificationMessage.style.display = 'none';
//         }, 2000);
//         return;
//     }

//     // Email validation
//     if (!email.includes('@') || !email.includes('.')) {
//         notificationMessage.style.backgroundColor = '#E91919';
//         notificationMessage.textContent = 'Please enter a valid email address';
//         notificationMessage.style.display = 'flex';
//         setTimeout(() => {
//             notificationMessage.style.display = 'none';
//         }, 2000);
//         return;
//     }

//     // Full name validation (at least 2 characters, letters and spaces only)
//     const nameRegex = /^[a-zA-Z\s]{2,}$/;
//     if (!nameRegex.test(username)) {
//         notificationMessage.style.backgroundColor = '#E91919';
//         notificationMessage.textContent = 'Please enter a valid full name (at least 2 characters, letters only)';
//         notificationMessage.style.display = 'flex';
//         setTimeout(() => {
//             notificationMessage.style.display = 'none';
//         }, 2000);
//         return;
//     }

//     // Phone number validation (basic: digits, spaces, dashes, parentheses, 10-15 characters)
//     const phoneRegex = /^[\d\s\-\(\)]{10,15}$/;
//     if (!phoneRegex.test(phoneNumber)) {
//         notificationMessage.style.backgroundColor = '#E91919';
//         notificationMessage.textContent = 'Please enter a valid phone number';
//         notificationMessage.style.display = 'flex';
//         setTimeout(() => {
//             notificationMessage.style.display = 'none';
//         }, 2000);
//         return;
//     }

//     // Password strength validation
//     if (password.length < 8) {
//         notificationMessage.style.backgroundColor = '#E91919';
//         notificationMessage.textContent = 'Password must be at least 8 characters long';
//         notificationMessage.style.display = 'flex';
//         setTimeout(() => {
//             notificationMessage.style.display = 'none';
//         }, 2000);
//         return;
//     }

//     // Check for at least one uppercase, one lowercase, one number
//     const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;
//     if (!passwordRegex.test(password)) {
//         notificationMessage.style.backgroundColor = '#E91919';
//         notificationMessage.textContent = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
//         notificationMessage.style.display = 'flex';
//         setTimeout(() => {
//             notificationMessage.style.display = 'none';
//         }, 2000);
//         return;
//     }

//     // Confirm password
//     if (password !== confirmPassword) {
//         notificationMessage.style.backgroundColor = '#E91919';
//         notificationMessage.textContent = 'Passwords do not match';
//         notificationMessage.style.display = 'flex';
//         setTimeout(() => {
//             notificationMessage.style.display = 'none';
//         }, 2000);
//         return;
//     }

//     // Show loader
//     theLoaderContainer.style.display = 'flex';

//     try {
//         // Send data to backend for registration
//         const response = await fetch('https://safe-anchor-backend.onrender.com/api/auth/login', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 username: username,
//                 email: email,
//                 phoneNumber: phoneNumber,
//                 password: password
//             })
//         });

//         const data = await response.json();

//         if (response.ok) {
//             registeredEmail = email; // Store email for resending
//             localStorage.setItem('email', email); // Store email in localStorage
//             setTimeout(() => {
//                 theLoaderContainer.style.display = 'none';
//                 notificationMessage.style.display = 'flex';
//                 notificationMessage.style.backgroundColor = '#21B24D';
//                 notificationMessage.textContent = 'Registration successful! Please check your email for verification.';
//             }, 1000);

//             setTimeout(() => {
//                 notificationMessage.style.display = 'none';
//                 // Reset fields
//                 signUpUsername.value = '';
//                 signUpUsernameEmail.value = '';
//                 signUpUsernamePhone.value = '';
//                 signUpUsernamePassword.value = '';
//                 signUpUsernameConfirmPassword.value = '';
//                 // Show email verification section
//                 showSection(sections.notification);
//             }, 3000);
//         }

//         console.log('Registration Success:', data);
//     } catch (error) {
//         setTimeout(() => {
//             theLoaderContainer.style.display = 'none';
//             notificationMessage.style.display = 'flex';
//             notificationMessage.style.backgroundColor = '#E91919';
//             notificationMessage.textContent = 'Registration failed: ' + error.message;
//         }, 1000);

//         setTimeout(() => {
//             notificationMessage.style.display = 'none';
//         }, 2000);

//         console.log('Registration Error:', error);
//     }
// })



// document.getElementById('login-submit-btn').addEventListener('click', function (e) {
//     e.preventDefault();
//     showSection(sections.purpose);
// })


// document.getElementById('login-submit-btn').addEventListener('click', function (e) {
//     e.preventDefault();
//     showSection(sections.purpose);
// })