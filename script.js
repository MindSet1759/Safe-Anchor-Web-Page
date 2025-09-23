"use-strict";

// FAQ functionality
function faqFunc() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = item.querySelector('.faq-icon i');

        question.addEventListener('click', () => {
            // Toggle active class
            item.classList.toggle('active');

            // Toggle answer visibility
            if (item.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
            } else {
                answer.style.maxHeight = '0';
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
            }

            // Close other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-answer').style.maxHeight = '0';
                    otherItem.querySelector('.faq-icon i').classList.remove('fa-chevron-up');
                    otherItem.querySelector('.faq-icon i').classList.add('fa-chevron-down');
                }
            });
        });
    });
}

faqFunc();

// Navbar toggle functionality for menu-icon
const menuIcon = document.getElementById('menuIcon');
const menuBars = document.getElementById('menuBars');
const removeIcon = document.getElementById('removeIcon');
const modalSignup = document.querySelector('.modal-signup');

menuIcon.addEventListener('click', function(event) {
    // console.log(event.target);
    
    if (event.target === menuBars) {
        modalSignup.style.display = 'flex';
    menuBars.style.display = 'none';
    removeIcon.style.display = 'flex';
    } else if (event.target === removeIcon){
        modalSignup.style.display = 'none';
    menuBars.style.display = 'inline-block';
    removeIcon.style.display = 'none';
    }
    
})

const signInOptions = document.querySelectorAll('.sign-in-btn');
const ModalContents = document.querySelector('.modal-content');
const signInOptionsModal = document.querySelector('.modal');

signInOptions.forEach(btn => {
    btn.addEventListener('click', function () {
        signInOptionsModal.style.display = 'block';
        ModalContents.style.display = 'block';
    })
})

// window.onclick = function() {
//     ModalContents.style.display = 'none';
// }

// Show sign-in modal when any "Book Session" button is clicked
const expertButtons = document.querySelectorAll('.expert-btn');
const signInModal = document.getElementById('signInModal');
const closeBtn = document.querySelector('.close');

expertButtons.forEach(button => {
    button.addEventListener('click', () => {
        signInModal.style.display = 'block';
    });
});

// Close modal when clicking the close button
closeBtn.addEventListener('click', () => {
    signInModal.style.display = 'none';
});

// Close modal when clicking outside the modal content
window.addEventListener('click', (event) => {
    if (event.target === signInModal) {
        signInModal.style.display = 'none';
    }
});

document.querySelector('.exit-btn').addEventListener('click', function () {
    window.open('', '_self').close();

})

const heartIcons = document.querySelectorAll('.fa-heart');

heartIcons.forEach(icon => {
    icon.addEventListener('click', function() {
        if (icon.classList.contains('fa-regular')) {
            icon.classList.remove('fa-regular');
            icon.classList.add('fa-solid');
            icon.classList.add('heart-active'); // Add red color class
        } else {
            icon.classList.add('fa-regular');
            icon.classList.remove('fa-solid');
            icon.classList.remove('heart-active'); // Remove red color class
        }
    });
});
