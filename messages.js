document.addEventListener("DOMContentLoaded", () => {
  const chatsTab = document.querySelector(".chats-tab");
  const callsTab = document.querySelector(".calls-tab");
  const chatsList = document.querySelector(".chats-list");
  const callsList = document.querySelector(".calls-list");

  // Show Chats by default
  chatsTab.classList.add("active");
  chatsList.style.display = "block";
  callsList.style.display = "none";

  // Toggle to Chats
  chatsTab.addEventListener("click", () => {
    chatsTab.classList.add("active");
    callsTab.classList.remove("active");
    chatsList.style.display = "block";
    callsList.style.display = "none";
  });

  // Toggle to Calls
  callsTab.addEventListener("click", () => {
    callsTab.classList.add("active");
    chatsTab.classList.remove("active");
    callsList.style.display = "block";
    chatsList.style.display = "none";
  });
});



// Handle sending messages
const input = document.querySelector(".chat-footer input");
const sendBtn = document.querySelector(".chat-footer .send");
const chatBody = document.querySelector(".chat-body");

function sendMessage(text, side = "right") {
  if (text.trim() === "") return;

  // Create message container
  const msg = document.createElement("div");
  msg.classList.add("msg", side);

  msg.innerHTML = `
    <div class="bubble">${text}</div>
    <span class="time">${new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    })}</span>
  `;

  chatBody.appendChild(msg);
  chatBody.scrollTop = chatBody.scrollHeight; // auto-scroll
}

// Button click
sendBtn.addEventListener("click", () => {
  sendMessage(input.value, "right");
  input.value = "";
});

// Press Enter
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault(); // prevent new line
    sendBtn.click();
  }
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