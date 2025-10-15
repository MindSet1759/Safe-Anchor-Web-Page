// Load appointments dynamically from backend
async function loadAppointments() {
  try {
    const resToday = await fetch("http://localhost:5000/api/appointments/today");
    const todayAppointments = await resToday.json();

    const resRequests = await fetch("http://localhost:5000/api/appointments/requests");
    const requestAppointments = await resRequests.json();

    // Fill today's appointments table
    const todayList = document.getElementById("todayList");
    todayList.innerHTML = "";
    todayAppointments.forEach(appt => {
      todayList.innerHTML += `
        <tr>
          <td><img src="Landing page Assets/Avatar 1.jpg" class="icon"> ${appt.patientName}</td>
          <td>${appt.gender}</td>
          <td>${appt.date}</td>
          <td>${appt.time}</td>
          <td>${appt.treatment}</td>
          <td><a href="#">View</a></td>
        </tr>
      `;
    });

    // Fill appointment requests table
    const requestList = document.getElementById("requestList");
    requestList.innerHTML = "";
    requestAppointments.forEach(req => {
      requestList.innerHTML += `
        <tr>
          <td>${req.patientName}</td>
          <td>${req.gender}</td>
          <td>${req.date}</td>
          <td>${req.time}</td>
          <td>${req.treatment}</td>
          <td>${req.status}</td>
        </tr>
      `;
    });

  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Tab switching
document.querySelectorAll(".tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));
    tab.classList.add("active");
    document.getElementById(tab.dataset.tab).classList.add("active");
  });
});

// === Hamburger sidebar toggle (for mobile) ===
document.addEventListener("DOMContentLoaded", () => {
  // Load appointments
  loadAppointments();

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

  // === View All logic ===
  const viewAllToday = document.querySelector(".view-all");
  const viewAllRequest = document.querySelector(".view-all2");

  const welcomeCard = document.querySelector(".welcome-card"); // 👈 add this
  const smallAppointments = document.querySelector(".appointments");
  const todaySection = document.querySelector(".today-appointments");
  const requestSection = document.querySelector(".appointment-requests");

  if (viewAllToday) {
    viewAllToday.addEventListener("click", () => {
      welcomeCard.style.display = "none";       // hide welcome card
      smallAppointments.style.display = "none"; // hide preview
      todaySection.style.display = "block";     // show today list
      requestSection.style.display = "none";    // hide requests
    });
  }

  if (viewAllRequest) {
    viewAllRequest.addEventListener("click", () => {
      welcomeCard.style.display = "none";       // hide welcome card
      smallAppointments.style.display = "none"; // hide preview
      requestSection.style.display = "block";   // show requests
      todaySection.style.display = "none";      // hide today
    });
  }

});


// Exit functionality

document.querySelector('.quick-exit').addEventListener('click', function () {
     window.close();
})