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