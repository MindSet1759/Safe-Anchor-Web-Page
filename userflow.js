"use strict";

// Store section elements for better readability and maintainability
const sections = {
    first: document.getElementById('firstSection'),
    second: document.getElementById('secondSection'), 
    third: document.getElementById('thirdSection'),
    notification: document.getElementById('notificationSection'),
    email: document.getElementById('EmailSection'),
    purpose: document.getElementById('purposeQuestionnaire'),
    time: document.getElementById('timeQuestionnaire'),
    support: document.getElementById('supportTypeQuestionnaire'),
    abuse: document.getElementById('abuseTypeQuestionnaire'),
    help: document.getElementById('helpTypeQuestionnaire'),
    gender: document.getElementById('genderQuestionnaire'),
    body: document.getElementById('ContentBody')
};

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
document.getElementById('signUpLink').addEventListener("click", function (e) {
    e.preventDefault(); // Prevent default link behavior
    showSection(sections.second);
});

// Event listener for register button - shows third section (Register with Username)
document.getElementById('registerBtn').addEventListener("click", function (e) {
    e.preventDefault(); // Prevent default button behavior if it's in a form
    showSection(sections.third);
});

// Event listener for sign in buttons - shows first section (Sign In)
document.getElementById('signInBtn2').addEventListener("click", function (e) {
    e.preventDefault(); // Prevent default link behavior
    showSection(sections.first);
});

document.getElementById('signInBtn3').addEventListener("click", function (e) {
    e.preventDefault(); // Prevent default link behavior
    showSection(sections.first);
});

document.querySelectorAll('#signUpBtn').forEach(btn => {
    btn.addEventListener("click", function (e) {
        e.preventDefault(); // Prevent default link behavior
        showSection(sections.notification);
        sections.body.style.height = '100vh';
    })
});

// Event listeners for questionnaire sections
document.getElementById('okBtn').addEventListener("click", function () {
    showSection(sections.email);
});

document.getElementById('startBtn').addEventListener("click", function () {
    showSection(sections.purpose);
});

document.getElementById('purposeNextBtn').addEventListener("click", function () {
    showSection(sections.time);
});

document.getElementById('timeNextBtn').addEventListener("click", function () {
    showSection(sections.support);
});

document.getElementById('supportNextBtn').addEventListener("click", function () {
    showSection(sections.abuse);
});

document.getElementById('abuseNextBtn').addEventListener("click", function () {
    showSection(sections.help);
});

document.getElementById('helpNextBtn').addEventListener("click", function () {
    showSection(sections.gender);
});

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
