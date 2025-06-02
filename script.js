document.addEventListener("DOMContentLoaded", loadExercises);

function loadExercises() {
    const workoutData = JSON.parse(localStorage.getItem("workoutLog")) || [];
    const tableBody = document.querySelector("#workoutTable tbody");
    tableBody.innerHTML = "";

    workoutData.forEach((exercise, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td><input type="text" value="${exercise.oefening}" onchange="updateExercise(${index}, 'oefening', this.value)"/></td>
            <td><input type="number" value="${exercise.gewicht}" onchange="updateExercise(${index}, 'gewicht', this.value)"/></td>
            <td><input type="number" value="${exercise.herhalingen}" onchange="updateExercise(${index}, 'herhalingen', this.value)"/></td>
            <td><button onclick="deleteExercise(${index})">Verwijderen</button></td>
        `;
        tableBody.appendChild(row);
    });
}

function addExercise() {
    const workoutData = JSON.parse(localStorage.getItem("workoutLog")) || [];
    workoutData.push({ oefening: "Nieuwe oefening", gewicht: 0, herhalingen: 0 });
    localStorage.setItem("workoutLog", JSON.stringify(workoutData));
    loadExercises();
}

function updateExercise(index, field, value) {
    const workoutData = JSON.parse(localStorage.getItem("workoutLog")) || [];
    workoutData[index][field] = value;
    localStorage.setItem("workoutLog", JSON.stringify(workoutData));
}

function deleteExercise(index) {
    const workoutData = JSON.parse(localStorage.getItem("workoutLog")) || [];
    workoutData.splice(index, 1);
    localStorage.setItem("workoutLog", JSON.stringify(workoutData));
    loadExercises();
}

function exportData() {
    const workoutData = localStorage.getItem("workoutLog");
    const blob = new Blob([workoutData], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "workout_log.json";
    a.click();
}

function importData() {
    const file = document.querySelector("#importFile").files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            localStorage.setItem("workoutLog", event.target.result);
            loadExercises();
        };
        reader.readAsText(file);
    }
}
