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

