document.addEventListener("DOMContentLoaded", function() {
    loadExercises();
    loadCardio();
    loadBuik();
});

function loadExercises() {
    let workoutData = JSON.parse(localStorage.getItem("workoutLog"));
    if (!workoutData || workoutData.length === 0) {
        workoutData = [
            { nummer: 75, oefening: "Chest Press", gewicht: 15, herhalingen: "4x6" },
            { nummer: 92, oefening: "Lat Machine", gewicht: 20, herhalingen: "4x6" },
            { nummer: 94, oefening: "Vertical Traction", gewicht: 20, herhalingen: "4x6" },
            { nummer: 74, oefening: "Shoulder Press", gewicht: 10, herhalingen: "4x6" },
            { nummer: 58, oefening: "Triceps Press MS", gewicht: 5, herhalingen: "4x6" },
            { nummer: 57, oefening: "Biceps Curl MS", gewicht: 5, herhalingen: "4x6" },
            { nummer: 7, oefening: "Horizontal Leg Press", gewicht: 60, herhalingen: "15x" },
            { nummer: 13, oefening: "Standing Gluteus (stand 4/5)", gewicht: 25, herhalingen: "15x" },
            { nummer: 15, oefening: "Abductor Machine", gewicht: 20, herhalingen: "15x" },
            { nummer: 16, oefening: "Adductor Machine", gewicht: 20, herhalingen: "15x" }
        ];
        localStorage.setItem("workoutLog", JSON.stringify(workoutData));
    }
    const tableBody = document.querySelector("#workoutTable tbody");
    tableBody.innerHTML = "";

    workoutData.forEach((exercise, index) => {
        let gewichtInput;
        if (exercise.nummer == 57 || exercise.nummer == 58) {
            gewichtInput = `<input type="number" min="0" step="2.5" value="${exercise.gewicht}" onchange="updateExercise(${index}, 'gewicht', this.value)"/> kg`;
        } else {
            gewichtInput = `<input type="number" min="0" step="5" value="${exercise.gewicht}" onchange="updateExercise(${index}, 'gewicht', this.value)"/> kg`;
        }
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${exercise.nummer || ''}</td>
            <td>${exercise.oefening}</td>
            <td>${gewichtInput}</td>
            <td><input type="text" value="${exercise.herhalingen}" onchange="updateExercise(${index}, 'herhalingen', this.value)"/></td>
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

function loadCardio() {
    let cardioData = JSON.parse(localStorage.getItem("cardioLog"));
    if (!cardioData || cardioData.length === 0) {
        cardioData = [
            { type: "Cardio", oefening: "Crosstrainer", duur: 10 },
            { type: "Cardio", oefening: "Fietsen", duur: 10 },
            { type: "Cardio", oefening: "Loopband", duur: 0 }
        ];
        localStorage.setItem("cardioLog", JSON.stringify(cardioData));
    }
    const tableBody = document.querySelector("#cardioTable tbody");
    tableBody.innerHTML = "";
    cardioData.forEach((item, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>
                <select onchange="updateCardio(${index}, 'type', this.value)">
                    <option value="Cardio"${item.type === 'Cardio' ? ' selected' : ''}>Cardio</option>
                    <option value="Fitness"${item.type === 'Fitness' ? ' selected' : ''}>Fitness</option>
                </select>
            </td>
            <td>${item.oefening}</td>
            <td><input type="number" min="0" step="5" value="${item.duur}" onchange="updateCardio(${index}, 'duur', this.value)"/> min</td>
        `;
        tableBody.appendChild(row);
    });
}

function updateCardio(index, field, value) {
    const cardioData = JSON.parse(localStorage.getItem("cardioLog")) || [];
    cardioData[index][field] = field === 'duur' ? Number(value) : value;
    localStorage.setItem("cardioLog", JSON.stringify(cardioData));
}

function loadBuik() {
    let buikData = JSON.parse(localStorage.getItem("buikLog"));
    if (!buikData || buikData.length === 0) {
        buikData = [
            { oefening: "3x Bovenbuik", herhalingen: "10x" },
            { oefening: "3x Zijkant", herhalingen: "10x" },
            { oefening: "3x Onderbuik", herhalingen: "10x" }
        ];
        localStorage.setItem("buikLog", JSON.stringify(buikData));
    }
    const tableBody = document.querySelector("#buikTable tbody");
    tableBody.innerHTML = "";
    buikData.forEach((item, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.oefening}</td>
            <td><input type="text" value="${item.herhalingen}" onchange="updateBuik(${index}, this.value)" /></td>
        `;
        tableBody.appendChild(row);
    });
}

function updateBuik(index, value) {
    const buikData = JSON.parse(localStorage.getItem("buikLog")) || [];
    buikData[index].herhalingen = value;
    localStorage.setItem("buikLog", JSON.stringify(buikData));
}

function clearWorkoutLog() {
    if (confirm('Weet je zeker dat je het schema wilt resetten?')) {
        localStorage.removeItem("workoutLog");
        localStorage.removeItem("cardioLog");
        localStorage.removeItem("buikLog");
        loadExercises();
        loadCardio();
        loadBuik();
    }
}
