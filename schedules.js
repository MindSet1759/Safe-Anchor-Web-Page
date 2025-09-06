// Calendar setup
const monthYear = document.getElementById("monthYear");
const calendarBody = document.getElementById("calendarBody");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const details = document.getElementById("details");

let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

// Example events
let events = {
  "2025-03-30": "📞 Call Session",
  "2025-03-15": "💬 Chat Session with Dr. Jane Doe"
};

// Month names
let months = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

// Render calendar
function showCalendar(month, year) {
  calendarBody.innerHTML = "";
monthYear.innerHTML = months[month] + " " + year;

let firstDay = new Date(year, month).getDay();
let daysInMonth = 32 - new Date(year, month, 32).getDate();

let date = 1;
for (let i = 0; i < 6; i++) {
  let row = document.createElement("tr");

  for (let j = 0; j < 7; j++) {
    if (i === 0 && j < firstDay) {
      let cell = document.createElement("td");
      row.appendChild(cell);
    } else if (date > daysInMonth) {
      break;
    } else {
      let cell = document.createElement("td");
      cell.innerHTML = date;

      // Lock the correct date for this cell
      let thisDate = date;
      let eventKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(thisDate).padStart(2, '0')}`;

      // Add event if it exists
      if (events[eventKey]) {
        let eventDiv = document.createElement("div");
        eventDiv.classList.add("event");
        eventDiv.textContent = events[eventKey];
        eventDiv.style.background = eventKey.includes("30") ? "#ffe4c4" : "#d5f1ff";
        cell.appendChild(eventDiv);
      }

      // Click handler
      cell.addEventListener("click", (e) => {
        const selectedDate = new Date(year, month, thisDate);
        const weekday = selectedDate.toLocaleDateString('en-US', { weekday: 'long' });
        const existingEvent = events[eventKey] || "";
        const detailsBox = document.querySelector("#details .details-box");
        const eventInputBox = document.getElementById("eventInputBox");
        const eventText = document.getElementById("eventText");
        const saveBtn = document.getElementById("saveEvent");
        const cancelBtn = document.getElementById("cancelEvent");

        // Update details section
        detailsBox.innerHTML = `
          <img src="Landing page Assets/booksession image.png" alt="Schedule Icon" class="icon"/>
          <h3>${weekday}, ${months[month]} ${thisDate}, ${year}</h3>
          <p><strong>Event:</strong> ${existingEvent || "No event for this day."}</p>
          <div class="event-buttons">
            ${existingEvent ? `
              <button id="editEventBtn">✏️ Edit</button>
              <button id="deleteEventBtn">❌ Delete</button>
            ` : `
              <button id="addEventBtn">➕ Add Event</button>
            `}
          </div>
        `;

        // Button handlers
        setTimeout(() => {
          const editBtn = document.getElementById("editEventBtn");
          const deleteBtn = document.getElementById("deleteEventBtn");
          const addBtn = document.getElementById("addEventBtn");

          const openInputBox = () => {
            eventText.value = existingEvent;
            const rect = detailsBox.getBoundingClientRect();
            eventInputBox.style.left = rect.left + window.scrollX + "px";
            eventInputBox.style.top = rect.bottom + window.scrollY + 10 + "px";
            eventInputBox.style.display = "block";

            saveBtn.onclick = () => {
              const newEvent = eventText.value.trim();
              if (newEvent === "") {
                delete events[eventKey];
              } else {
                events[eventKey] = newEvent;
              }
              eventInputBox.style.display = "none";
              showCalendar(currentMonth, currentYear);
            };

            cancelBtn.onclick = () => {
              eventInputBox.style.display = "none";
            };
          };

          if (editBtn) editBtn.onclick = openInputBox;
          if (addBtn) addBtn.onclick = openInputBox;

          if (deleteBtn) {
            deleteBtn.onclick = () => {
              if (confirm("Are you sure you want to delete this event?")) {
                delete events[eventKey];
                showCalendar(currentMonth, currentYear);

                // Update details after deletion
                detailsBox.innerHTML = `
                  <img src="Landing page Assets/booksession image.png" alt="Schedule Icon" class="icon"/>
                  <h3>${weekday}, ${months[month]} ${thisDate}, ${year}</h3>
                  <p>No event for this day.</p>
                  <div class="event-buttons">
                    <button id="addEventBtn">Add Event</button>
                  </div>
                `;
              }
            };
          }
        }, 0);
      });

      row.appendChild(cell);
      date++;
    }
  }

  calendarBody.appendChild(row);
}
}

// Initial load
showCalendar(currentMonth, currentYear);

