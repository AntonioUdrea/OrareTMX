async function loadData() {
  // Load line-based JSON
  const response = await fetch("data.json");
  const linesData = await response.json();

  populateLines(linesData);
  populateVehicles(linesData); // generate vehicle-based dropdown
}

// Line dropdown
function populateLines(data) {
  const select = document.getElementById("lineSelect");
  Object.keys(data).forEach(line => {
    const option = document.createElement("option");
    option.value = line;
    option.textContent = line;
    select.appendChild(option);
  });

  select.addEventListener("change", () => {
    showLineTimetable(data, select.value);
  });
}

function showLineTimetable(data, line) {
  const title = document.getElementById("lineTitle");
  title.textContent = line ? `Line ${line}` : "";

  const tbody = document.querySelector("#timetable tbody");
  tbody.innerHTML = "";

  if (!line) return;

  data[line].forEach(entry => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${entry.time}</td><td>${entry.vehicle}</td>`;
    tbody.appendChild(row);
  });
}

// Vehicle dropdown
function populateVehicles(linesData) {
  const vehicleData = {};

  // Transform linesData → vehicleData
  for (const line in linesData) {
    linesData[line].forEach(entry => {
      const vehicle = entry.vehicle.trim(); // trim spaces
      if (!vehicleData[vehicle]) vehicleData[vehicle] = [];
      vehicleData[vehicle].push({ time: entry.time, line });
    });
  }

  const select = document.getElementById("vehicleSelect");

  // Sort vehicle names alphabetically
  const sortedVehicles = Object.keys(vehicleData).sort((a, b) => a.localeCompare(b));

  sortedVehicles.forEach(vehicle => {
    const option = document.createElement("option");
    option.value = vehicle;
    option.textContent = vehicle;
    select.appendChild(option);
  });

  select.addEventListener("change", () => {
    showVehicleSchedule(vehicleData, select.value);
  });
}

function showVehicleSchedule(vehicleData, vehicle) {
  const container = document.getElementById("vehicleSchedule");
  container.innerHTML = "";

  if (!vehicle || !vehicleData[vehicle]) return;

  const title = document.createElement("h2");
  title.textContent = `${vehicle} Schedule`;
  container.appendChild(title);

  // Sort the schedule by time
  const sortedSchedule = vehicleData[vehicle].slice().sort((a, b) => {
    const [h1, m1] = a.time.split(":").map(Number);
    const [h2, m2] = b.time.split(":").map(Number);
    return h1 - h2 || m1 - m2;
  });

  const list = document.createElement("ul");
  sortedSchedule.forEach(entry => {
    const li = document.createElement("li");
    li.textContent = `${entry.time} → ${entry.line}`;
    list.appendChild(li);
  });

  container.appendChild(list);
}

// Init
loadData();
