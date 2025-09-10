"use strict";

// For calendar
let theCalender = document.querySelector("#calendar");
let calendarDays = document.querySelector("#days");
let theCurrentMonth = document.querySelector("#currentMonth");
let thedaysWeek = document.querySelector("#daysWeek");
let eachDayDiv = document.getElementById('eachDayDiv');

let currentMonth = new Date().getMonth(); //The current month we are in
let currentYear = new Date().getFullYear(); //The current year we are in

let monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

let dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// Displaying the current Month and Year
theCurrentMonth.textContent = `${monthNames[currentMonth]} ${currentYear}`;
theCurrentMonth.style.color = "#0B1A43";

function showCalendar() {
    // Clear previous calendar days
    thedaysWeek.innerHTML = "";
    eachDayDiv.innerHTML = "";

    // Day headers
    dayHeaders.forEach((day) => {
        const dayHeader = document.createElement('div');
        dayHeader.className = "calendar-day day-header";
        dayHeader.textContent = day;
        dayHeader.style.color = "#020304d1";
        dayHeader.style.fontSize = "14px";
        thedaysWeek.appendChild(dayHeader);
    });

    // Get first day of month and number of days
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate(); //The 0 here means the last day of the previous month, which is the current month we are in.
    
    // Empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-day disabled';
        emptyDay.style.color = '#0B1A434D';
        eachDayDiv.appendChild(emptyDay);
    }

    // Today's date of the current month
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Resetting time to midnight for accurate comparison and also gives the current date and time (i.e., "now").
    
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.textContent = day;
        
        // Add click event to select a day
        dayElement.addEventListener('click', function () {
            // Remove 'selected' class from all days
            document.querySelectorAll('.calendar-day').forEach(d => d.classList.remove('selected'));
            // Add 'selected' class to the clicked day if not disabled
            if (!dayElement.classList.contains('disabled')) {
                dayElement.classList.add('selected');
            }
        });
        
        const currentDate = new Date(currentYear, currentMonth, day);
        currentDate.setHours(0, 0, 0, 0); //which constructs a date from the specified year, month, and day.
        
        // Disable past dates
        if (currentDate < today) {
            dayElement.classList.add('disabled');
        }
        
        eachDayDiv.appendChild(dayElement);
    }
}

showCalendar();

function nextMonth() {
    currentMonth++;
    
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    
    theCurrentMonth.textContent = `${monthNames[currentMonth]} ${currentYear}`;
    showCalendar();
}

function previousMonth() {
    currentMonth--;
    
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    theCurrentMonth.textContent = `${monthNames[currentMonth]} ${currentYear}`;
    showCalendar();
}

// Navigation functionality starts here
// This section handles the navigation between different sections of the dashboard, updating the layout and showing/hiding content areas

// Navigation functionality
const navItems = document.querySelectorAll('.nav-bar-menu .menu');
const contentArea = document.getElementById('contentArea');
const expertArea = document.getElementById('expertArea');
const rightSidebar = document.getElementById('rightSideBar');
const chatsSidebar = document.getElementById('chatsSideBar');
const userChatMessages = document.getElementById('userChatMessages');
const chatAppContainer = document.getElementById('chatAppContainer');
const userChatHeader = document.getElementById('userChatHeader');
const resourcesArea = document.getElementById('resourcesArea');
const resourcesAreaContents = document.getElementById('resourcesAreaContents');
const helpArea = document.getElementById('helpArea');
const notificationArea = document.getElementById('notificationArea');
const bookSectionArea = document.getElementById('bookSectionArea');
const articleArea = document.getElementById('articleArea');
const settingsArea = document.getElementById('settingsArea');
const mainSection = document.querySelector('.main-section');



// debugger;
// Navigation functionality
function handleNavigation(navItem) {
    // Remove active class from all menu items
    navItems.forEach(item => {
        item.classList.remove('active');
    });

    // Add active class to clicked menu item
    navItem.classList.add('active');

    // Get the nav item text
    const navText = navItem.querySelector('span').textContent.toLowerCase();

    // Hide all content areas and sidebars
    contentArea.classList.remove('active');
    rightSidebar.classList.remove('active');
    expertArea.classList.remove('active');
    chatsSidebar.classList.remove('active');
    notificationArea.classList.remove('active');
    resourcesArea.classList.remove('active');
    resourcesAreaContents.classList.remove('active');
    bookSectionArea.classList.remove('active');
    articleArea.classList.remove('active');
    settingsArea.classList.remove('active');
    helpArea.classList.remove('active');

    // Handle grid layout and content based on nav item
    if (navText === 'home') {
        // Home layout: 1fr 3fr 1fr
        mainSection.style.gridTemplateColumns = '1fr 3fr 1fr';
        contentArea.classList.add('active');
        rightSidebar.classList.add('active');

    } else if (navText === 'experts') {
        // Experts layout: 1fr 3fr 2fr
        mainSection.style.gridTemplateColumns = '1fr 3fr 2fr';
        contentArea.classList.remove('active');
        rightSidebar.classList.remove('active');
        expertArea.classList.add('active');
        chatsSidebar.classList.add('active');
        resourcesArea.classList.remove('active');
        resourcesAreaContents.classList.remove('active');
        notificationArea.classList.remove('active');
        bookSectionArea.classList.remove('active');
        articleArea.classList.remove('active');
        settingsArea.classList.remove('active');

    }  else if (navText === 'resources') {
        // Resources layout: 1fr 3fr 2fr
        mainSection.style.gridTemplateColumns = '1fr 3fr 2fr';
        contentArea.classList.remove('active');
        rightSidebar.classList.remove('active');
        expertArea.classList.remove('active');
        chatsSidebar.classList.remove('active');
        notificationArea.classList.remove('active');
        resourcesArea.classList.add('active');
        resourcesAreaContents.classList.add('active');
        bookSectionArea.classList.remove('active');
        articleArea.classList.remove('active');
        settingsArea.classList.remove('active');

    } else if (navText === 'notifications') {
        mainSection.style.gridTemplateColumns = '0.6fr 3fr 0fr';
        contentArea.classList.remove('active');
        rightSidebar.classList.remove('active');
        expertArea.classList.remove('active');
        chatsSidebar.classList.remove('active');
        notificationArea.classList.add('active');
        resourcesArea.classList.remove('active');
        resourcesAreaContents.classList.remove('active');
        bookSectionArea.classList.remove('active');
        articleArea.classList.remove('active');
        settingsArea.classList.remove('active');
        helpArea.classList.remove('active');

    } else if (navText === 'articles') {
        mainSection.style.gridTemplateColumns = '0.6fr 3fr 0fr';
        contentArea.classList.remove('active');
        rightSidebar.classList.remove('active');
        expertArea.classList.remove('active');
        chatsSidebar.classList.remove('active');
        notificationArea.classList.remove('active');
        resourcesArea.classList.remove('active');
        resourcesAreaContents.classList.remove('active');
        bookSectionArea.classList.remove('active');
        articleArea.classList.add('active');
        settingsArea.classList.remove('active');
        helpArea.classList.remove('active');

    } else if (navText === 'settings') {
        mainSection.style.gridTemplateColumns = '1fr 3fr 1fr';
        contentArea.classList.remove('active');
        rightSidebar.classList.remove('active');
        expertArea.classList.remove('active');
        chatsSidebar.classList.remove('active');
        notificationArea.classList.remove('active');
        resourcesArea.classList.remove('active');
        resourcesAreaContents.classList.remove('active');
        bookSectionArea.classList.remove('active');
        articleArea.classList.remove('active');
        settingsArea.classList.add('active');
        helpArea.classList.remove('active');

    } else if (navText === 'help'|| navText == 'support') {
        // Help layout: 1fr 3fr 1fr
        mainSection.style.gridTemplateColumns = '1fr 3fr 1fr';
        contentArea.classList.remove('active');
        rightSidebar.classList.remove('active');
        expertArea.classList.remove('active');
        chatsSidebar.classList.remove('active');
        notificationArea.classList.remove('active');
        resourcesArea.classList.remove('active');
        resourcesAreaContents.classList.remove('active');
        bookSectionArea.classList.remove('active');
        articleArea.classList.remove('active');
        settingsArea.classList.remove('active');
        helpArea.classList.add('active');
    }
}

// Add click event listeners to nav items
navItems.forEach(item => {
    item.addEventListener('click', function() {
        handleNavigation(item);
    });
});
// Navigation functionality ends here

// Chat functionality starts here
// This section handles switching between chat messages and chat app

// functionality for chat messages

 userChatHeader.addEventListener("click", function() {
    userChatMessages.classList.remove('active');
    chatAppContainer.classList.add('active');
 })

// Chat functionality ends here

// Icon click functionalities start here
// This section handles clicks on notification and book session icons to show respective areas

//  functionality for notification icon

const NotifyIcon = document.querySelector('.notify-icon');
const NotifyIcon2 = document.querySelector('.notify-icon2');
const BookSessionIcon = document.querySelector('.books-session');

 NotifyIcon.addEventListener('click', function() {
    mainSection.style.gridTemplateColumns = '0.6fr 3fr 0fr';
    contentArea.classList.remove('active');
    rightSidebar.classList.remove('active');
    expertArea.classList.remove('active');
    chatsSidebar.classList.remove('active');
    resourcesArea.classList.remove('active');
    resourcesAreaContents.classList.remove('active');
    bookSectionArea.classList.remove('active');
    notificationArea.classList.add('active');
    articleArea.classList.remove('active');
    settingsArea.classList.remove('active');
    helpArea.classList.remove('active');
 })
 
 NotifyIcon2.addEventListener('click', function() {
    mainSection.style.gridTemplateColumns = '0.6fr 3fr 0fr';
    contentArea.classList.remove('active');
    rightSidebar.classList.remove('active');
    expertArea.classList.remove('active');
    chatsSidebar.classList.remove('active');
    resourcesArea.classList.remove('active');
    resourcesAreaContents.classList.remove('active');
    bookSectionArea.classList.remove('active');
    notificationArea.classList.add('active');
    articleArea.classList.remove('active');
    settingsArea.classList.remove('active');
    helpArea.classList.remove('active');
 })

 //  functionality for booksession icon

 BookSessionIcon.addEventListener('click', function() {
    mainSection.style.gridTemplateColumns = '0.6fr 3fr 0fr';
    contentArea.classList.remove('active');
    rightSidebar.classList.remove('active');
    expertArea.classList.remove('active');
    chatsSidebar.classList.remove('active');
    resourcesArea.classList.remove('active');
    resourcesAreaContents.classList.remove('active');
    notificationArea.classList.remove('active');
    bookSectionArea.classList.add('active');
    settingsArea.classList.remove('active');
    helpArea.classList.remove('active');

 })

// Icon click functionalities end here

// Modal functionality starts here
// This section handles the booking session modals, opening, closing, and progressing through steps

// Modal functionality
const modal1 = document.getElementById('bookModal-1');
const modal2 = document.getElementById('bookModal-2');
const modalBtn1 = document.getElementById('modalBtn1');
const modalBtn2 = document.getElementById('modal2Btn');
const btn = document.getElementById('bookSessionBtn');
const articleReadMoreBtn = document.querySelectorAll('.resources-btn');
const span = document.querySelectorAll('.close');
const modalContent = document.querySelector('.modal-content');
const appointmentInformation = document.querySelector('.appointment-information');

 btn.addEventListener('click', function(e) {
     e.preventDefault();
     modal1.style.display = 'block';
 });
 
 modalBtn1.addEventListener('click', function(e) {
     // mainSection.style.gridTemplateColumns = '1fr 3fr 1fr';
     e.preventDefault();
     modal1.style.display = 'none';
     modal2.style.display = 'block';
 });
 
 modalBtn2.addEventListener('click', function(e) {
     // mainSection.style.gridTemplateColumns = '1fr 3fr 1fr';
     e.preventDefault();
     modal1.style.display = 'none';
     modal2.style.display = 'none';
     btn.style.display = 'none';
     appointmentInformation.style.display = 'block';
 });
 
 span.forEach(closeBtn => {
     closeBtn.addEventListener('click', function() {
         modal1.style.display = 'none';
         modal2.style.display = 'none';
     })
 })
 
 window.onclick = function(event) {
     if (event.target == modal1 || event.target == modal2) {
         modal1.style.display = 'none';
         modal2.style.display = 'none';
     }
 }

// Modal functionality ends here

// Read more button functionality starts here
// This section handles the read more buttons in resources to show articles

 // Read more button functionality
 articleReadMoreBtn.forEach(button => {
    button.addEventListener('click', function() {
        mainSection.style.gridTemplateColumns = '0.6fr 3fr 0fr';
        contentArea.classList.remove('active');
        rightSidebar.classList.remove('active');
        expertArea.classList.remove('active');
        chatsSidebar.classList.remove('active');
        notificationArea.classList.remove('active');
        resourcesArea.classList.remove('active');
        resourcesAreaContents.classList.remove('active');
        bookSectionArea.classList.remove('active');
        articleArea.classList.add('active');
        settingsArea.classList.remove('active');

    })
 })

// Read more button functionality ends here

// Settings page switching starts here
// This section handles switching between different settings pages (profile, security, notifications, other settings)

const profileSpan = document.getElementById('profile');
const securitySpan = document.getElementById('security');
const notificationsSpan = document.getElementById('notifications');
const otherSettingsSpan = document.getElementById('other-settings');

const profilePage = document.querySelector('.profile-page');
const securityPage = document.querySelector('.security-page');
const notificationPage = document.querySelector('.notification-page');
const otherSettingsPage = document.querySelector('.other-settings-page');

function switchSettingsPage(page, span) {
    // Remove active from all pages
    profilePage.classList.remove('active');
    securityPage.classList.remove('active');
    notificationPage.classList.remove('active');
    otherSettingsPage.classList.remove('active');

    // Remove active from all spans
    profileSpan.classList.remove('active');
    securitySpan.classList.remove('active');
    notificationsSpan.classList.remove('active');
    otherSettingsSpan.classList.remove('active');

    // Add active to selected
    page.classList.add('active');
    span.classList.add('active');
}

profileSpan.addEventListener('click', () => switchSettingsPage(profilePage, profileSpan));
securitySpan.addEventListener('click', () => switchSettingsPage(securityPage, securitySpan));
notificationsSpan.addEventListener('click', () => switchSettingsPage(notificationPage, notificationsSpan));
otherSettingsSpan.addEventListener('click', () => switchSettingsPage(otherSettingsPage, otherSettingsSpan));

// Settings page switching ends here

// Toggle switch functionality starts here
// This section handles the toggle switch for anonymous mode, changing the name input placeholder

const toggleSwitch = document.getElementById('toggleSwitch');
toggleSwitch.addEventListener('change', function() {
    const nameInput = document.querySelector('input[name="name"]');
    if (this.checked) {
        // Enable anonymous mode
        if (nameInput) {
            nameInput.placeholder = 'Enter pseudonym';
        }
    } else {
        // Disable anonymous mode
        if (nameInput) {
            nameInput.placeholder = 'Enter full name';
        }
    }
});

// Toggle switch functionality ends here

const menuIcon = document.querySelector('.fa-bars');
const cancelIcon = document.querySelector('.fa-x');
menuIcon.addEventListener('click', function() {
    menuIcon.style.display = 'none';
    cancelIcon.style.display = 'block';

    const leftSidebar = document.querySelector('.left-sidebar');
    if (leftSidebar.style.display === 'none' || leftSidebar.style.display === '') {
        leftSidebar.style.display = 'block';
       
    } else {
    leftSidebar.style.display = 'block';
    }
});

cancelIcon.addEventListener('click', function() {
    menuIcon.style.display = 'block';
    cancelIcon.style.display = 'none';

    const leftSidebar = document.querySelector('.left-sidebar');
    if (leftSidebar.style.display === 'block' || leftSidebar.style.display === '') {
        leftSidebar.style.display = 'none';
       
    } else {
    leftSidebar.style.display = 'block';
    }
});




// const searchIcon = document.querySelector(".searchIcon");
// const InputContainer = document.querySelector(".input-container");

// searchIcon.addEventListener("click", function() {
//     InputContainer.style.display  = 'flex';
//     searchIcon.style.display = 'none';
// })

