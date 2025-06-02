document.addEventListener("DOMContentLoaded", loadExercises);

function loadExercises() {
    let workoutData = JSON.parse(localStorage.getItem("workoutLog"));
    if (!workoutData || workoutData.length === 0) {
        workoutData = [
            { nummer: 75, oefening: "Chest Press", gewicht: 0, herhalingen: 0 },
            { nummer: 92, oefening: "Lat Machine", gewicht: 0, herhalingen: 0 },
            { nummer: 94, oefening: "Vertical Traction", gewicht: 0, herhalingen: 0 },
            { nummer: 74, oefening: "Shoulder Press", gewicht: 0, herhalingen: 0 },
            { nummer: 58, oefening: "Triceps Press MS", gewicht: 0, herhalingen: 0 },
            { nummer: 57, oefening: "Biceps Curl MS", gewicht: 0, herhalingen: 0 },
            { nummer: 7, oefening: "Horizontal Leg Press", gewicht: 0, herhalingen: 0 },
            { nummer: 13, oefening: "Standing Gluteus (stand 4/5)", gewicht: 0, herhalingen: 0 },
            { nummer: 15, oefening: "Abductor Machine", gewicht: 0, herhalingen: 0 },
            { nummer: 16, oefening: "Adductor Machine", gewicht: 0, herhalingen: 0 }
        ];
        localStorage.setItem("workoutLog", JSON.stringify(workoutData));
    }
    const tableBody = document.querySelector("#workoutTable tbody");
    tableBody.innerHTML = "";

    workoutData.forEach((exercise, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${exercise.nummer || ''}</td>
            <td>${exercise.oefening}</td>
            <td><input type="number" min="0" step="5" value="${exercise.gewicht}" onchange="updateExercise(${index}, 'gewicht', this.value)"/> kg</td>
            <td><input type="number" value="${exercise.herhalingen}" onchange="updateExercise(${index}, 'herhalingen', this.value)"/></td>
        `;
        tableBody.appendChild(row);
    });
}

function addExercise() {
    const workoutData = JSON.parse(localStorage.getItem("workoutLog")) || [];
    workoutData.push({ nummer: '', oefening: "Nieuwe oefening", gewicht: 0, herhalingen: 0 });
    localStorage.setItem("workoutLog", JSON.stringify(workoutData));
    loadExercises();
}

function updateExercise(index, field, value) {
    const workoutData = JSON.parse(localStorage.getItem("workoutLog")) || [];
    workoutData[index][field] = value;
    localStorage.setItem("workoutLog", JSON.stringify(workoutData));
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

function clearWorkoutLog() {
    localStorage.removeItem("workoutLog");
    loadExercises();
}
