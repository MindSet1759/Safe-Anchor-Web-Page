const notifications = [
  { 
    title: "Announcement", 
    text: "Calendar updates coming soon.", 
    time: "1 hour ago",
    details: "Our development team will push a new calendar update this week. Stay tuned for new scheduling improvements."
  },
  { 
    title: "New Session Request", 
    text: "You have a new session request from John Janet.", 
    time: "2 hours ago",
    details: "John Janet has requested a session for tomorrow at 3PM. You can confirm or reschedule from the Schedules tab."
  },
  { 
    title: "Emergency Alert", 
    text: "Immediate attention needed for an emergency.", 
    time: "4 hours ago",
    details: "Patient John Doe triggered an emergency alert from the mobile app. Location: Room 302, Ward B."
  },
  { 
    title: "New Message", 
    text: "You have received a new message from Mr Michael.", 
    time: "4 days ago",
    details: "Mr Michael: 'Thanks for your help last session. Looking forward to our next appointment.'"
  },
  { 
    title: "Session Completed", 
    text: "Your session with Joshua has been completed.", 
    time: "4 days ago",
    details: "Session summary: 45 minutes, patient reported improved progress. Notes saved under patient file."
  }
];

const list = document.getElementById("notifications-list");

notifications.forEach(n => {
  const item = document.createElement("div");
  item.classList.add("notification-item");

  item.innerHTML = `
    <img src="Landing page Assets/notify-icon.png" alt="Notification Icon" class="notif-bell"/>
    <div class="notification-info">
      <div class="notification-title">${n.title}</div>
      <div class="notification-text">${n.text}</div>
      <div class="notification-details">${n.details}</div>
    </div>
    <div class="notification-time">${n.time}</div>
  `;

  // Click toggle
  item.addEventListener("click", () => {
    item.classList.toggle("active");
  });

  list.appendChild(item);
});



// === Hamburger sidebar toggle (for mobile) ===
document.addEventListener("DOMContentLoaded", () => {
  
  const hamburger = document.getElementById("hamburger");
  const sidebar = document.querySelector(".sidebar");

  // Create overlay dynamically
  const overlay = document.createElement("div");
  overlay.classList.add("overlay");
  document.body.appendChild(overlay);

  // Toggle on hamburger click
  if (hamburger) {
    hamburger.addEventListener("click", () => {
      sidebar.classList.toggle("active");
      overlay.classList.toggle("active");
    });
  }

  // Close sidebar when clicking overlay
  overlay.addEventListener("click", () => {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
  });
});