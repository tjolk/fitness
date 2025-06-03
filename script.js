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
        // Gewicht picker
        const gewichtSelect = document.createElement('select');
        gewichtSelect.className = 'gewicht-wheel';
        if (exercise.nummer == 57 || exercise.nummer == 58) {
            for (let v = 0; v <= 50; v += 2.5) {
                const displayVal = (Math.round(v * 10) / 10).toFixed(1).replace('.0', '');
                const option = document.createElement('option');
                option.value = v;
                option.textContent = displayVal + ' kg';
                if (Number(v) === Number(exercise.gewicht)) option.selected = true;
                gewichtSelect.appendChild(option);
            }
        } else if (index === 6) {
            for (let v = 0; v <= 100; v += 10) {
                const option = document.createElement('option');
                option.value = v;
                option.textContent = v + ' kg';
                if (v === exercise.gewicht) option.selected = true;
                gewichtSelect.appendChild(option);
            }
        } else {
            for (let v = 0; v <= 100; v += 5) {
                const option = document.createElement('option');
                option.value = v;
                option.textContent = v + ' kg';
                if (v === exercise.gewicht) option.selected = true;
                gewichtSelect.appendChild(option);
            }
        }
        gewichtSelect.onchange = e => updateExercise(index, 'gewicht', e.target.value);
        const gewichtCenter = document.createElement('span');
        gewichtCenter.className = 'picker-center-wrapper';
        gewichtCenter.appendChild(gewichtSelect);

        // Herhalingen picker
        let herhalingenCenter;
        if (index < 6) {
            const select = document.createElement('select');
            select.className = 'herhalingen-wheel';
            for (let v = 12; v <= 32; v += 4) {
                const option = document.createElement('option');
                option.value = v;
                option.textContent = v + 'x';
                if (v === exercise.herhalingen) option.selected = true;
                select.appendChild(option);
            }
            select.onchange = e => updateExercise(index, 'herhalingen', e.target.value);
            herhalingenCenter = document.createElement('span');
            herhalingenCenter.className = 'picker-center-wrapper';
            herhalingenCenter.appendChild(select);
        } else if (index >= workoutData.length - 4) {
            const select = document.createElement('select');
            select.className = 'herhalingen-wheel';
            for (let v = 10; v <= 25; v += 5) {
                const option = document.createElement('option');
                option.value = v;
                option.textContent = v + 'x';
                if (v === exercise.herhalingen) option.selected = true;
                select.appendChild(option);
            }
            select.onchange = e => updateExercise(index, 'herhalingen', e.target.value);
            herhalingenCenter = document.createElement('span');
            herhalingenCenter.className = 'picker-center-wrapper';
            herhalingenCenter.appendChild(select);
        } else {
            herhalingenCenter = document.createElement('span');
            const input = document.createElement('input');
            input.type = 'number';
            input.min = '0';
            input.max = '50';
            input.step = '1';
            input.value = exercise.herhalingen;
            input.inputMode = 'numeric';
            input.pattern = '[0-9]*';
            input.onchange = e => updateExercise(index, 'herhalingen', e.target.value);
            input.className = 'herhalingen-input';
            const unit = document.createElement('span');
            unit.textContent = 'x';
            unit.className = 'number-wheel-unit';
            herhalingenCenter.appendChild(input);
            herhalingenCenter.appendChild(unit);
        }

        // Table row
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${exercise.nummer || ''}</td>
            <td>${exercise.oefening}</td>
            <td></td>
            <td></td>
        `;
        row.children[2].innerHTML = '';
        row.children[2].appendChild(gewichtCenter);
        row.children[3].innerHTML = '';
        row.children[3].appendChild(herhalingenCenter);
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

// --- Cardio Table with Custom Picker ---
const loadCardio = () => {
    let cardioData = getCardioData();
    if (!cardioData.length) {
        setCardioData(defaultCardio);
        cardioData = [...defaultCardio];
    }
    const tableBody = document.querySelector("#cardioTable tbody");
    tableBody.innerHTML = "";
    cardioData.forEach((item, index) => {
        // Duur picker
        const select = document.createElement('select');
        select.className = 'duur-wheel';
        for (let v = 0; v <= 60; v += 5) {
            const option = document.createElement('option');
            option.value = v;
            option.textContent = v + ' min';
            if (Number(v) === Number(item.duur)) option.selected = true;
            select.appendChild(option);
        }
        select.onchange = e => updateCardio(index, 'duur', e.target.value);
        const duurCenter = document.createElement('span');
        duurCenter.className = 'picker-center-wrapper';
        duurCenter.appendChild(select);
        // Cardio type picker
        const typeSelect = document.createElement('select');
        typeSelect.className = 'cardio-type-select';
        typeSelect.onchange = e => updateCardio(index, 'type', e.target.value);
        ["Cardio", "Fitness"].forEach(val => {
            const opt = document.createElement('option');
            opt.value = val;
            opt.textContent = val;
            if (item.type === val) opt.selected = true;
            typeSelect.appendChild(opt);
        });
        const row = document.createElement("tr");
        const typeCell = document.createElement('td');
        typeCell.appendChild(typeSelect);
        const oefeningCell = document.createElement('td');
        oefeningCell.textContent = item.oefening;
        const duurCell = document.createElement('td');
        duurCell.appendChild(duurCenter);
        row.appendChild(typeCell);
        row.appendChild(oefeningCell);
        row.appendChild(duurCell);
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
        const select = document.createElement('select');
        select.className = 'herhalingen-wheel';
        for (let v = 6; v <= 24; v += 2) {
            const option = document.createElement('option');
            option.value = v;
            option.textContent = v + 'x';
            if (v === item.herhalingen) option.selected = true;
            select.appendChild(option);
        }
        select.onchange = e => updateBuik(index, e.target.value);
        const buikCenter = document.createElement('span');
        buikCenter.className = 'picker-center-wrapper';
        buikCenter.appendChild(select);
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.oefening}</td>
            <td></td>
        `;
        row.children[1].appendChild(buikCenter);
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
    if (confirm('Weet je zeker dat je het schema wilt terugzetten?')) {
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
