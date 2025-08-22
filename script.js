async function loadData() {
  const response = await fetch("data.json");
  return await response.json();
}

function populateLines(data) {
  const select = document.getElementById("lineSelect");
  select.innerHTML = "";

  Object.keys(data).forEach(line => {
    const option = document.createElement("option");
    option.value = line;
    option.textContent = line;
    select.appendChild(option);
  });

  select.addEventListener("change", () => {
    showTimetable(data, select.value);
  });
}

function showTimetable(data, line) {
  const title = document.getElementById("lineTitle");
  title.textContent = `Line ${line}`;

  const tbody = document.querySelector("#timetable tbody");
  tbody.innerHTML = "";

  data[line].forEach(entry => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${entry.time}</td>
      <td>${entry.vehicle}</td>
    `;
    tbody.appendChild(row);
  });
}

(async () => {
  const data = await loadData();
  populateLines(data);
})();