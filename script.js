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
    console.log(event.target);
    
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