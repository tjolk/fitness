// Fitness Schedule App Script
// Loads and manages Cardio, Krachttraining, and Buik tables with localStorage persistence

document.addEventListener("DOMContentLoaded", () => {
    loadExercises();
    loadCardio();
    loadBuik();
});

// --- Krachttraining Table ---
const getWorkoutData = () => JSON.parse(localStorage.getItem("workoutLog")) || [];
const setWorkoutData = data => localStorage.setItem("workoutLog", JSON.stringify(data));

const defaultWorkout = [
    { nummer: 75, oefening: "Chest Press", gewicht: 15, herhalingen: 24 },
    { nummer: 92, oefening: "Lat Machine", gewicht: 20, herhalingen: 24 },
    { nummer: 94, oefening: "Vertical Traction", gewicht: 20, herhalingen: 24 },
    { nummer: 74, oefening: "Shoulder Press", gewicht: 10, herhalingen: 24 },
    { nummer: 58, oefening: "Triceps Press MS", gewicht: 5, herhalingen: 24 },
    { nummer: 57, oefening: "Biceps Curl MS", gewicht: 5, herhalingen: 24 },
    { nummer: 7, oefening: "Horizontal Leg Press", gewicht: 60, herhalingen: 15 },
    { nummer: 13, oefening: "Standing Gluteus (stand 4/5)", gewicht: 25, herhalingen: 15 },
    { nummer: 15, oefening: "Abductor Machine", gewicht: 20, herhalingen: 15 },
    { nummer: 16, oefening: "Adductor Machine", gewicht: 20, herhalingen: 15 }
];

const loadExercises = () => {
    let workoutData = getWorkoutData();
    if (!workoutData.length) {
        setWorkoutData(defaultWorkout);
        workoutData = [...defaultWorkout];
    }
    const tableBody = document.querySelector("#workoutTable tbody");
    tableBody.innerHTML = "";
    workoutData.forEach((exercise, index) => {
        const step = (exercise.nummer == 57 || exercise.nummer == 58) ? 2.5 : 5;
        const gewichtInput = `<span class="weight-input-wrapper"><input type="number" min="0" step="${step}" value="${exercise.gewicht}" onchange="updateExercise(${index}, 'gewicht', this.value)" /> kg</span>`;
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${exercise.nummer || ''}</td>
            <td>${exercise.oefening}</td>
            <td>${gewichtInput}</td>
            <td><input type="number" min="0" value="${exercise.herhalingen}" onchange="updateExercise(${index}, 'herhalingen', this.value)" /> x</td>
        `;
        tableBody.appendChild(row);
    });
};

const updateExercise = (index, field, value) => {
    const workoutData = getWorkoutData();
    workoutData[index][field] = (field === 'gewicht' || field === 'herhalingen') ? Number(value) : value;
    setWorkoutData(workoutData);
    loadExercises();
};

// --- Cardio Table ---
const getCardioData = () => JSON.parse(localStorage.getItem("cardioLog")) || [];
const setCardioData = data => localStorage.setItem("cardioLog", JSON.stringify(data));

const defaultCardio = [
    { type: "Cardio", oefening: "Crosstrainer", duur: 10 },
    { type: "Cardio", oefening: "Fietsen", duur: 10 },
    { type: "Cardio", oefening: "Loopband", duur: 0 }
];

const loadCardio = () => {
    let cardioData = getCardioData();
    if (!cardioData.length) {
        setCardioData(defaultCardio);
        cardioData = [...defaultCardio];
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
};

const updateCardio = (index, field, value) => {
    const cardioData = getCardioData();
    cardioData[index][field] = (field === 'duur') ? Number(value) : value;
    setCardioData(cardioData);
    loadCardio();
};

// --- Buik Table ---
const getBuikData = () => JSON.parse(localStorage.getItem("buikLog")) || [];
const setBuikData = data => localStorage.setItem("buikLog", JSON.stringify(data));

const defaultBuik = [
    { oefening: "3x Bovenbuik", herhalingen: 10 },
    { oefening: "3x Zijkant", herhalingen: 10 },
    { oefening: "3x Onderbuik", herhalingen: 10 }
];

const loadBuik = () => {
    let buikData = getBuikData();
    if (!buikData.length) {
        setBuikData(defaultBuik);
        buikData = [...defaultBuik];
    }
    const tableBody = document.querySelector("#buikTable tbody");
    tableBody.innerHTML = "";
    buikData.forEach((item, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.oefening}</td>
            <td><input type="number" min="0" value="${item.herhalingen}" onchange="updateBuik(${index}, this.value)" /> x</td>
        `;
        tableBody.appendChild(row);
    });
};

const updateBuik = (index, value) => {
    const buikData = getBuikData();
    buikData[index].herhalingen = Number(value);
    setBuikData(buikData);
    loadBuik();
};

// --- Import/Export/Reset ---
const clearWorkoutLog = () => {
    if (confirm('Weet je zeker dat je het schema wilt resetten?')) {
        localStorage.removeItem("workoutLog");
        localStorage.removeItem("cardioLog");
        localStorage.removeItem("buikLog");
        loadExercises();
        loadCardio();
        loadBuik();
    }
};

// Expose only clearWorkoutLog for button usage
window.clearWorkoutLog = clearWorkoutLog;
