// Handle sending messages
const input = document.querySelector(".chat-footer input");
const sendBtn = document.querySelector(".chat-footer .send");
const chatBody = document.querySelector(".chat-body");

sendBtn.addEventListener("click", () => {
  if (input.value.trim() !== "") {
    let msg = document.createElement("div");
    msg.classList.add("msg", "right");
    msg.innerHTML = `<span class="bubble">${input.value}</span>
                     <span class="time">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>`;
    chatBody.appendChild(msg);
    chatBody.scrollTop = chatBody.scrollHeight;
    input.value = "";
  }
});

// Press Enter to send
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    sendBtn.click();
  }
});

