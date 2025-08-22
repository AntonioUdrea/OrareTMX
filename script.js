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
      if (!vehicleData[entry.vehicle]) vehicleData[entry.vehicle] = [];
      vehicleData[entry.vehicle].push({ time: entry.time, line });
    });
  }

  const select = document.getElementById("vehicleSelect");
  Object.keys(vehicleData).forEach(vehicle => {
    const option = document.createElement("option");
    option.value = vehicle;
    option.textContent = vehicle;
    select.appendChild(option);
  });

  select.addEventListener("change", () => {
    showVehicleSchedule(vehicleData, select.value);
  });
}
function populateVehicles(linesData) {
  const vehicleData = {};

  // Transform linesData → vehicleData
  for (const line in linesData) {
    linesData[line].forEach(entry => {
      if (!vehicleData[entry.vehicle]) vehicleData[entry.vehicle] = [];
      vehicleData[entry.vehicle].push({ time: entry.time, line });
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

// Init
loadData();

