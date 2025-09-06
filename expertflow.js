"use strict";


// Store section elements for better readability and maintainability
const sections = {
    first: document.getElementById('firstSection'),
    second: document.getElementById('secondSection'),
    third: document.getElementById('thirdSection'),
    notification: document.getElementById('notificationSection'),
    email: document.getElementById('EmailSection'),
    expertise: document.getElementById('expertQuestionnaire'),
    time: document.getElementById('timeQuestionnaire'),
    work: document.getElementById('workQuestionnaire'),
    support: document.getElementById('supportTypeQuestionnaire'),
    training: document.getElementById('trainingQuestionnaire'),
    experience: document.getElementById('experienceQuestionnaire'),
    certificate: document.getElementById('certificateQuestionnaire'),
    CV: document.getElementById('CVQuestionnaire'),
    gender: document.getElementById('genderQuestionnaire')
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

// Fixed: Added missing event listener for signInBtn to enable sign-in functionality
document.getElementById('signInBtn').addEventListener("click", function (e) {
    e.preventDefault(); // Prevent default link behavior
    showSection(sections.notification);
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


document.querySelectorAll('.signUpBtn').forEach(btn => {
    btn.addEventListener("click", function (e) {
        e.preventDefault(); // Prevent default link behavior
        showSection(sections.notification);
    })
});


// Event listeners for questionnaire sections
document.getElementById('okBtn').addEventListener("click", function () {
    showSection(sections.email);
});


document.getElementById('startBtn').addEventListener("click", function () {
    showSection(sections.expertise);
});


document.getElementById('expertiseNextBtn').addEventListener("click", function () {
    showSection(sections.time);
});


document.getElementById('timeNextBtn').addEventListener("click", function () {
    showSection(sections.work);
});


document.getElementById('workNextBtn').addEventListener("click", function () {
    showSection(sections.support);
});


document.getElementById('supportNextBtn').addEventListener("click", function () {
    showSection(sections.training);
});


document.getElementById('trainingNextBtn').addEventListener("click", function () {
    showSection(sections.experience);
});


document.getElementById('experienceNextBtn').addEventListener("click", function () {
    showSection(sections.certificate);
});


document.getElementById('certificateNextBtn').addEventListener("click", function () {
    showSection(sections.CV);
});


document.getElementById('CVNextBtn').addEventListener("click", function () {
    showSection(sections.gender);
});


// Optional: Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Return to first section when Escape key is pressed
        showSection(sections.first);
    }
});

