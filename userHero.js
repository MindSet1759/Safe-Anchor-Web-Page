document.addEventListener('DOMContentLoaded', async function () {
    const token = localStorage.getItem('authToken');
    const username = localStorage.getItem('username');

    if (!token) {
        // No token found, redirect to Sign In page
        window.location.href = 'userFlow.html';
        return;
    }

    try {
        const response = await fetch('https://safe-anchor-backend.onrender.com/api/victims/profile', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const profile = await response.json();

            // Display user profile information on the page
            // Assuming there is an element with id 'profile-info' to show the data
            const profileInfo = document.querySelector('.victimName');
            if (profileInfo) {
                profileInfo.textContent = ` ${username}
                `;
            }
        } else {
            // Token invalid or request failed, redirect to Sign In page
            localStorage.removeItem('authToken');
            window.location.href = 'userFlow.html';
        }
    } catch (error) {
        console.error('Error fetching profile:', error);
        localStorage.removeItem('authToken');
        window.location.href = 'userFlow.html';
    }
});

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
// const chatsSidebar = document.getElementById('chatsSideBar');
const userChatMessages = document.getElementById('userChatMessages');
const chatAppContainer = document.getElementById('chatAppContainer');
const userChatHeader = document.getElementById('userChatHeader');
const messagesArea = document.getElementById('messagesArea');
const messageSideBar = document.getElementById('messageSideBar');
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

    console.log('Navigation clicked:', navText);

    // Hide all content areas and sidebars
    contentArea.classList.remove('active');
    rightSidebar.classList.remove('active');
    expertArea.classList.remove('active');
    // chatsSidebar.classList.remove('active');
    notificationArea.classList.remove('active');
    messagesArea.classList.remove('active');
    messageSideBar.classList.remove('active');
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
        console.log('Showing contentArea and rightSidebar');

    } else if (navText === 'experts') {
        // Experts layout: 0.2fr 1fr
        mainSection.style.gridTemplateColumns = '0.2fr 1fr';
        contentArea.classList.remove('active');
        rightSidebar.classList.remove('active');
        expertArea.classList.add('active');
        // chatsSidebar.classList.add('active');
        messagesArea.classList.remove('active');
        messageSideBar.classList.remove('active');
        resourcesArea.classList.remove('active');
        resourcesAreaContents.classList.remove('active');
        notificationArea.classList.remove('active');
        bookSectionArea.classList.remove('active');
        articleArea.classList.remove('active');
        settingsArea.classList.remove('active');
        console.log('Showing expertArea');

    }  else if (navText === 'resources') {
        // Resources layout: 1fr 3fr 2fr
        mainSection.style.gridTemplateColumns = '1fr 3fr 2fr';
        contentArea.classList.remove('active');
        rightSidebar.classList.remove('active');
        expertArea.classList.remove('active');
        // chatsSidebar.classList.remove('active');
        notificationArea.classList.remove('active');
        messagesArea.classList.remove('active');
        messageSideBar.classList.remove('active');
        resourcesArea.classList.add('active');
        resourcesAreaContents.classList.add('active');
        bookSectionArea.classList.remove('active');
        articleArea.classList.remove('active');
        settingsArea.classList.remove('active');
        console.log('Showing resourcesArea and resourcesAreaContents');

    } else if (navText === 'notifications') {
        mainSection.style.gridTemplateColumns = '0.6fr 3fr 0fr';
        contentArea.classList.remove('active');
        rightSidebar.classList.remove('active');
        expertArea.classList.remove('active');
        // chatsSidebar.classList.remove('active');
        notificationArea.classList.add('active');
        messagesArea.classList.remove('active');
        messageSideBar.classList.remove('active');
        resourcesArea.classList.remove('active');
        resourcesAreaContents.classList.remove('active');
        bookSectionArea.classList.remove('active');
        articleArea.classList.remove('active');
        settingsArea.classList.remove('active');
        helpArea.classList.remove('active');
        console.log('Showing notificationArea');

    } else if (navText === 'articles') {
        mainSection.style.gridTemplateColumns = '0.6fr 3fr 0fr';
        contentArea.classList.remove('active');
        rightSidebar.classList.remove('active');
        expertArea.classList.remove('active');
        // chatsSidebar.classList.remove('active');
        notificationArea.classList.remove('active');
        messagesArea.classList.remove('active');
        messageSideBar.classList.remove('active');
        resourcesArea.classList.remove('active');
        resourcesAreaContents.classList.remove('active');
        bookSectionArea.classList.remove('active');
        articleArea.classList.add('active');
        settingsArea.classList.remove('active');
        helpArea.classList.remove('active');
        console.log('Showing articleArea');

    } else if (navText === 'settings') {
        mainSection.style.gridTemplateColumns = '1fr 3fr 1fr';
        contentArea.classList.remove('active');
        rightSidebar.classList.remove('active');
        expertArea.classList.remove('active');
        // chatsSidebar.classList.remove('active');
        notificationArea.classList.remove('active');
        messagesArea.classList.remove('active');
        messageSideBar.classList.remove('active');
        resourcesArea.classList.remove('active');
        resourcesAreaContents.classList.remove('active');
        bookSectionArea.classList.remove('active');
        articleArea.classList.remove('active');
        settingsArea.classList.add('active');
        helpArea.classList.remove('active');
        console.log('Showing settingsArea');

    } else if (navText === 'help' || navText == 'support') {
        // Help layout: 1fr 3fr 1fr
        mainSection.style.gridTemplateColumns = '1fr 3fr 1fr';
        contentArea.classList.remove('active');
        rightSidebar.classList.remove('active');
        expertArea.classList.remove('active');
        // chatsSidebar.classList.remove('active');
        notificationArea.classList.remove('active');
        messagesArea.classList.remove('active');
        messageSideBar.classList.remove('active');
        resourcesArea.classList.remove('active');
        resourcesAreaContents.classList.remove('active');
        bookSectionArea.classList.remove('active');
        articleArea.classList.remove('active');
        settingsArea.classList.remove('active');
        helpArea.classList.add('active');
        console.log('Showing helpArea');
    } else if (navText === 'messages') {
        // message layout: 0.6fr 1.6fr 2fr
        mainSection.style.gridTemplateColumns = '0.6fr 1.2fr 2fr';
        contentArea.classList.remove('active');
        rightSidebar.classList.remove('active');
        expertArea.classList.remove('active');
        // chatsSidebar.classList.remove('active');
        notificationArea.classList.remove('active');
        messagesArea.classList.add('active');
        messageSideBar.classList.add('active');
        resourcesArea.classList.remove('active');
        resourcesAreaContents.classList.remove('active');
        bookSectionArea.classList.remove('active');
        articleArea.classList.remove('active');
        settingsArea.classList.remove('active');
        helpArea.classList.remove('active');
        console.log('Showing messagesArea and messageSideBar');
    }
}

// SafeAnchor logo functionality
document.querySelector('.header-logo').addEventListener('click', function () {
     mainSection.style.gridTemplateColumns = '1fr 3fr 1fr';
        contentArea.classList.add('active');
    rightSidebar.classList.add('active');
     notificationArea.classList.remove('active');
    messagesArea.classList.remove('active');
    messageSideBar.classList.remove('active');
    resourcesArea.classList.remove('active');
    resourcesAreaContents.classList.remove('active');
    bookSectionArea.classList.remove('active');
    articleArea.classList.remove('active');
    settingsArea.classList.remove('active');
    helpArea.classList.remove('active');
})

// Add click event listeners to nav items
navItems.forEach(item => {
    item.addEventListener('click', function() {
        handleNavigation(item);
    });
});

// Account icon functionality to navigate to settings
const accountIcon = document.querySelector('.notifications img[alt="account-icon"]');
accountIcon.addEventListener('click', toSettingsPage);
    
const accountIcon2 = document.querySelector('.avatarIcon').addEventListener('click', toSettingsPage)


    function toSettingsPage() {
    // Remove active class from all menu items
    navItems.forEach(item => {
        item.classList.remove('active');
    });

    // Add active class to settings menu item
    const settingsMenu = Array.from(navItems).find(item => item.querySelector('span').textContent.toLowerCase() === 'settings');
    if (settingsMenu) {
        settingsMenu.classList.add('active');
    }

    // Handle grid layout and content for settings
    mainSection.style.gridTemplateColumns = '1fr 3fr 1fr';
    contentArea.classList.remove('active');
    rightSidebar.classList.remove('active');
    expertArea.classList.remove('active');
    // chatsSidebar.classList.remove('active');
    notificationArea.classList.remove('active');
    messagesArea.classList.remove('active');
    messageSideBar.classList.remove('active');
    resourcesArea.classList.remove('active');
    resourcesAreaContents.classList.remove('active');
    bookSectionArea.classList.remove('active');
    articleArea.classList.remove('active');
    settingsArea.classList.add('active');
    helpArea.classList.remove('active');
    console.log('Showing settingsArea via account icon');
};

// Navigation functionality ends here

// Chat functionality starts here
// This section handles switching between chat messages and chat app

// functionality for chat messages

//  userChatHeader.addEventListener("click", function() {
//     userChatMessages.classList.remove('active');
//     chatAppContainer.classList.add('active');
//  })

// Chat functionality ends here

// Icon click functionalities start here
// This section handles clicks on notification and book session icons to show respective areas

//  functionality for notification icon

const NotifyIcon = document.querySelector('.notify-icon');
const viewAllNotification = document.querySelector('.notification-container span');
const NotifyIcon2 = document.querySelector('.notify-icon2');
const BookSessionIcon = document.querySelector('.books-session');
const BookSessionBtn2 = document.querySelector('.expert-book-btn');
const BookSessionBtn3 = document.querySelector('.upcoming-session-texts span');

// Function to show book session area
function showBookSessionArea() {
    mainSection.style.gridTemplateColumns = '0.6fr 3fr 0fr';
    contentArea.classList.remove('active');
    rightSidebar.classList.remove('active');
    expertArea.classList.remove('active');
    messagesArea.classList.remove('active');
    messageSideBar.classList.remove('active');
    resourcesArea.classList.remove('active');
    resourcesAreaContents.classList.remove('active');
    notificationArea.classList.remove('active');
    bookSectionArea.classList.add('active');
    settingsArea.classList.remove('active');
    helpArea.classList.remove('active');
    expertModal.style.display = 'none';
}

 // Function to show notification area
 function showNotificationArea() {
    mainSection.style.gridTemplateColumns = '0.6fr 3fr 0fr';
    contentArea.classList.remove('active');
    rightSidebar.classList.remove('active');
    expertArea.classList.remove('active');
    // chatsSidebar.classList.remove('active');
    messagesArea.classList.remove('active');
    messageSideBar.classList.remove('active');
    resourcesArea.classList.remove('active');
    resourcesAreaContents.classList.remove('active');
    bookSectionArea.classList.remove('active');
    notificationArea.classList.add('active');
    articleArea.classList.remove('active');
    settingsArea.classList.remove('active');
    helpArea.classList.remove('active');
 }

 NotifyIcon.addEventListener('click', showNotificationArea);
 NotifyIcon2.addEventListener('click', showNotificationArea);
 viewAllNotification.addEventListener('click', showNotificationArea);

 //  functionality for booksession icon

 BookSessionIcon.addEventListener('click', showBookSessionArea);
 BookSessionBtn2.addEventListener('click', showBookSessionArea);
 BookSessionBtn3.addEventListener('click', showBookSessionArea);

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
 
//  For booking session form
 modalBtn1.addEventListener('click', function(e) {
     e.preventDefault();
     

     // Update modal2 with selected values
     const selectedExpert = expertSelect.options[expertSelect.selectedIndex].text.split(' - ')[0];
     const dateInput = document.getElementById('bookingDate').value;
     const timeInput = document.getElementById('bookingTime').value;

     // if Empty 
     if (dateInput === '' || timeInput === '') {
         alert('Please select a Date and time');
         return;
     } 

     modal1.style.display = 'none';
     modal2.style.display = 'block';

     // Format date to "Mon 05/12" format
     const dateObj = new Date(dateInput);
     const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
     const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
     const day = dateObj.getDate().toString().padStart(2, '0');
     const formattedDate = `${dayName} ${month}/${day}`;

     // Update modal2 elements
     // Replace the span inside <p>Chat Session with<span>Dr.Jane Doe</span></p>
     const modal2ProfileP = document.querySelector('.modal2-profile-image p');
     if (modal2ProfileP) {
         modal2ProfileP.innerHTML = `Chat Session with<span>${selectedExpert}</span>`;
     }
     document.querySelector('.modal2-DateTime-detail-1 span').textContent = formattedDate;
     document.querySelector('.appointment-DateTime-details span').textContent = formattedDate;
     document.querySelector('.modal2-DateTime-detail-2 span').textContent = timeInput;
     document.querySelector('.appointment-DateTime-detail-2 span').textContent = timeInput;
      document.getElementById('selectedExpert').textContent = `${selectedExpert}`;
 });
 
//  For sending the booking session details to the backend
 modalBtn2.addEventListener('click', async function(e) {
     e.preventDefault();

     const selectedExpert = expertSelect.value;
     const reason = document.getElementById('reason-text').value;
    //  const questions = document.getElementById('question-text').value;
     const dateInput = document.getElementById('bookingDate').value;
     const timeInput = document.getElementById('bookingTime').value;
     const scheduledAt = new Date(`${dateInput}T${timeInput}`).toISOString();
     const durationTime = 0;
     const data = {
  expertId: selectedExpert,
  scheduledAt: scheduledAt,
  notes: reason,
  duration: durationTime,
     }
     console.log(data);

     try {
         const token = localStorage.getItem('authToken');
         const response = await fetch('https://safe-anchor-backend.onrender.com/api/sessions/book', {
             method: 'POST',
             headers: {
                'Authorization': 'Bearer ' + token,
                 'Content-Type': 'application/json'
             },
             body: JSON.stringify(data)
         });
         const result = await response.json();
         console.log(result);

         if (response.ok) {
             alert('Booking confirmed successfully!');
             modal1.style.display = 'none';
             modal2.style.display = 'none';
             btn.style.display = 'none';
             appointmentInformation.style.display = 'block';
         } else {
             alert('Failed to confirm booking. Please try again.');
         }
     } catch (error) {
         console.error('Error confirming booking:', error);
         alert('An error occurred while confirming the booking.');
     }

    

 });

// modalBtn2.addEventListener('click', async function (e) {
//      appointmentInformation.style.display = 'block';
//      modal2.style.display = 'none';
//      btn.style.display = 'none';
//  })
 
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
        // chatsSidebar.classList.remove('active');
        notificationArea.classList.remove('active');
        messagesArea.classList.remove('active');
        messageSideBar.classList.remove('active');
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

// Event listeners for reschedule and cancel buttons
const rescheduleBtn = document.querySelector('.reschedule-btn');
const cancelBtn = document.querySelector('.cancel-Btn');

rescheduleBtn.addEventListener('click', async function () {
    modal1.style.display = 'block';
    // try {
    //     const response = await fetch('https://safe-anchor-backend.onrender.com/api/sessions/{id}', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             // Add necessary data like session ID, new date/time, etc.
    //             sessionId: 'current-session-id', // Replace with actual session ID
    //             newDate: '2023-12-05', // Example, replace with user input
    //             newTime: '10:00'
    //         })
    //     });
    //     if (response.ok) {
    //         const result = await response.json();
            
    //     } else {
    //         alert('Failed to reschedule session.');
    //     }
    // } catch (error) {
    //     console.error('Error rescheduling session:', error);
    //     alert('An error occurred while rescheduling.');
    // }
});

cancelBtn.addEventListener('click', async function () {
    
    //   modalContent.style.display = 'none';
    appointmentInformation.style.display = 'none';
    btn.style.display = 'block';
    
   
        // try {
        //     const response = await fetch('https://safe-anchor-backend.onrender.com/api/sessions/{id}', {
        //         method: 'DELETE',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify({
        //             sessionId: 'current-session-id' 
        //         })
        //     });
        //     if (response.ok) {
        //         const result = await response.json();
        //         console.log(result);
        //         alert('Session cancelled successfully!');

        //         // Update UI, e.g., hide appointment information
        //         modalContent.style.display = 'none';
        //         appointmentInformation.style.display = 'none';
        //     } else {
        //         alert('Failed to cancel session.');
        //     }
        // } catch (error) {
        //     console.error('Error cancelling session:', error);
        //     alert('An error occurred while cancelling.');
        // }
    
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


// Calendar month-year arrow click functionality
// document.querySelector('.month-year img').addEventListener('click', nextMonth);

// Saftey tips navigations
const safteyLeftIcon = document.getElementById('safteyLeftIcon');
const safteyRightIcon = document.getElementById('safteyRightIcon');
const tipContent1 = document.getElementById('tipContent1');
const tipContent2 = document.getElementById('tipContent2');
const tipContent3 = document.getElementById('tipContent3');

let currentTip = 1;

// Function to show the current tip
function showTip(tipNumber) {
    // Hide all tips
    tipContent1.style.display = 'none';
    tipContent2.style.display = 'none';
    tipContent3.style.display = 'none';

    // Show the current tip
    if (tipNumber === 1) {
        tipContent1.style.display = 'block';
    } else if (tipNumber === 2) {
        tipContent2.style.display = 'block';
    } else if (tipNumber === 3) {
        tipContent3.style.display = 'block';
    }
}

// Start by showing the first tip
showTip(currentTip);

// Event listener for left icon (previous tip)
safteyLeftIcon.addEventListener('click', function() {
    if (currentTip > 1) {
        currentTip--;
        showTip(currentTip);
    }
});

// Event listener for right icon (next tip)
safteyRightIcon.addEventListener('click', function() {
    if (currentTip < 3) {
        currentTip++;
        showTip(currentTip);
    }
});

// Message toggle functionality
const messageInfos = document.querySelectorAll('.each-message-info');
const messageDiv = document.querySelector('.message-div');
const chatInterface = document.querySelector('.message-div2');
const chatInputDiv = document.querySelector('.chat-input-div');
const chatProfileSpan = document.querySelector('.profile span');
const messagesContainer = document.querySelector('.messages-container');
const chatInput = document.querySelector('.chat-input-div input');
const sendBtn = document.querySelector('.message-actions img[alt="send-button"]');

messageInfos.forEach(info => {
    info.addEventListener('click', function() {
        const username = info.querySelector('.user-chat-text p').textContent;
        chatProfileSpan.textContent = username;
        messageDiv.style.display = 'none';
        chatInterface.style.display = 'block';
        chatInputDiv.style.display = 'flex';
    });
});

// Function to send message
function sendMessage() {
    const message = chatInput.value.trim();
    if (!message) return;

    // Add user message
    const userMsg = document.createElement('div');
    userMsg.className = 'user-message';
    userMsg.innerHTML = `
        <div class="user-textmessages">
            <div>
                <div class="user-text">${message}</div>
                <div class="user-message-time">
                    <span>${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                </div>
            </div>
            <img src="Landing page Assets/Avatar 7.png" alt="user image">
        </div>
    `;
    messagesContainer.appendChild(userMsg);
    chatInput.value = '';

    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // Create and show typing indicator
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'expert-typing';
    typingIndicator.innerHTML = `
        <img src="Landing page Assets/OP image.png" alt="bot image">
        <div>
            <div class="expert-text">Typing...</div>
            <div class="expert-message-time">
                <span>now</span>
            </div>
        </div>
    `;
    messagesContainer.appendChild(typingIndicator);

    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // Hide typing indicator after a short delay and add bot message
    setTimeout(() => {
        messagesContainer.removeChild(typingIndicator);
        // Add bot message
        const botMsg = document.createElement('div');
        botMsg.className = 'expert-message';
        botMsg.innerHTML = `
            <img src="Landing page Assets/OP image.png" alt="bot image">
            <div>
                <div class="expert-text">Thank you for your message. How can I help you today?</div>
                <div class="expert-message-time">
                    <span>${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                </div>
            </div>
        `;
        messagesContainer.appendChild(botMsg);

        // Scroll to bottom
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 2000);
}

// Event listeners for sending message
sendBtn.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});


// const backToMessages = document.getElementById("arrowLeftMessage");
// backToMessages.addEventListener('click', function () {
//     messageSideBar.style.display = 'none';
// })

// Expert Modal Functionality
const expertModal = document.getElementById('expertModal');
const expertName = document.getElementById('expertName');
const expertAbout = document.getElementById('expertAbout');
const closeBtn = document.querySelector('.expert-modal-close');
const expertModalContent = document.querySelector('.expert-modal-content');
const tabBtns = document.querySelectorAll('.expert-tab-btn');
const expertAboutContent = document.querySelector('.expert-about p');
let currentExpertName = '';
let currentExpertSpeciality = '';
let currentExpertImage = '';

// Functionality for .each-expert buttons
const eachExpertBtns = document.querySelectorAll('.each-expert .expert-btn');
eachExpertBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        let card = btn.parentElement;
        while (card && !card.classList.contains('each-expert')) {
            card = card.parentElement;
        }
        if (card) {
            const name = card.querySelector('.expert-name').textContent;
            const speciality = card.querySelector('.expert-speciality').textContent;
            const image = card.querySelector('img').src;
            currentExpertName = name;
            currentExpertSpeciality = speciality;
            currentExpertImage = image;
            expertName.textContent = name;
            expertAbout.textContent = speciality;
            // Update modal profile image
            const modalImg = document.querySelector('.Expert-Profile-Info img');
            if (modalImg) {
                modalImg.src = image;
            }
            // Set initial tab content
            updateTabContent('about');
            expertModal.style.display = 'flex';
        }
    });
});

// Functionality for .user-experts buttons
const userExpertsBtns = document.querySelectorAll('.user-experts .expert-btn');
userExpertsBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        let card = btn.parentElement;
        while (card && !card.classList.contains('user-experts')) {
            card = card.parentElement;
        }
        if (card) {
            const name = card.querySelector('.expert-name').textContent;
            const speciality = card.querySelector('.expert-speciality').textContent;
            const image = card.querySelector('img').src;
            currentExpertName = name;
            currentExpertSpeciality = speciality;
            currentExpertImage = image;
            expertName.textContent = name;
            expertAbout.textContent = speciality;
            // Update modal profile image
            const modalImg = document.querySelector('.Expert-Profile-Info img');
            if (modalImg) {
                modalImg.src = image;
            }
            // Set initial tab content
            updateTabContent('about');
            expertModal.style.display = 'flex';
        }
    });
});

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const tabId = btn.getAttribute('data-tab');
        updateTabContent(tabId);
    });
});

function updateTabContent(tabId) {
    let content = '';
    if (tabId === 'about') {
        content = `Hello, I'm <span id="expertName">${currentExpertName}</span>, a <span id="expertAbout">${currentExpertSpeciality}</span> dedicated to helping survivors of abuse reclaim their sense of safety, self-worth, and purpose. Over the past 12 years, I have worked with individuals who have experienced emotional, physical, and sexual abuse, guiding them through the journey from crisis to confidence.<br>
My approach blends trauma-informed therapy, cognitive behavioural techniques, and mindfulness-based practices to create a safe and supportive space where healing can begin`;
    } else if (tabId === 'schedule') {
        content = 'Click Book a Session to schedule a confidential first meeting.';
    } else if (tabId === 'sessions') {
        content = '';
    } else if (tabId === 'review') {
        content = `${currentExpertName} patience and understanding gave me the courage to open up for the first time in years.`;
    }
    expertAboutContent.innerHTML = content;
}

closeBtn.addEventListener('click', () => {
    expertModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === expertModal) {
        expertModal.style.display = 'none';
    }
});


// switch between message and calls
const chatHeader1 = document.getElementById('chatHeader1');
const chatHeader2 = document.getElementById('chatHeader2');
const userChatContents = document.getElementById('userChatContents');
const userCallsContents = document.getElementById('userCallsContents');
const ChatMessageImg = document.getElementById('ChatMessageImg');
const VideoCallImg = document.getElementById('VideoCallImg');

function MsgCalls(e) {
    console.log(e.target);
    if (e.target !== chatHeader1) {
        chatHeader2.classList.add('active');
        userCallsContents.classList.add('active');
        VideoCallImg.classList.add('active');
        chatHeader1.classList.remove('active');
        userChatContents.classList.remove('active');
        ChatMessageImg.classList.remove('active');
    } 
    else if (e.target !== chatHeader2) {
        chatHeader2.classList.remove('active');
        userCallsContents.classList.remove('active');
        VideoCallImg.classList.remove('active');
        chatHeader1.classList.add('active');
        userChatContents.classList.add('active');
         ChatMessageImg.classList.add('active');
    }
}

// Heart icon toggle functionality
const heartIcons = document.querySelectorAll('.fa-heart');

heartIcons.forEach(icon => {
    icon.addEventListener('click', function() {
        if (icon.classList.contains('fa-regular')) {
            icon.classList.remove('fa-regular');
            icon.classList.add('fa-solid');
        } else {
            icon.classList.add('fa-regular');
            icon.classList.remove('fa-solid');
        }
    });
});

chatHeader1.addEventListener("click", MsgCalls);
chatHeader2.addEventListener("click", MsgCalls);



// Exit functionality

document.querySelector('.exit-container').addEventListener('click', function () {
     window.close();
    // window.close('userHero.html');
})
