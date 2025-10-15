const sections = {
    profile: document.getElementById('profile'),
    security: document.getElementById('security'),
    notifications: document.getElementById('notifications'),
    other: document.getElementById('other'),
};


// Tab switching
document.querySelectorAll(".tabs button").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tabs button").forEach(b => b.classList.remove("active"));
    document.querySelectorAll(".tab-panel").forEach(p => p.classList.remove("active"));
    btn.classList.add("active");
    document.getElementById(btn.dataset.tab).classList.add("active");
  });
});

// Toggle switches
document.querySelectorAll(".toggle").forEach(toggle => {
  toggle.addEventListener("click", () => {
    toggle.classList.toggle("active");
  });
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