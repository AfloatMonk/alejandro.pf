let data = JSON.parse(localStorage.getItem("mis_actividades")) || {};

const calendar = document.getElementById("calendar");

function addActivity() {
    const dateInput = document.getElementById("date");
    const date = dateInput.value;
    const activity = document.getElementById("activity").value.trim();

    if (!date || !activity) {
        alert("Completa la fecha y la actividad");
        return;
    }

    const selectedDate = new Date(date);
    const minDate = new Date("2026-01-01");

    if (selectedDate < minDate) {
        alert("El calendario inicia en 2026");
        return;
    }

    if (!data[date]) {
        data[date] = [];
    }

    data[date].push(activity);

    localStorage.setItem("mis_actividades", JSON.stringify(data));

    document.getElementById("activity").value = "";

    renderCalendar();
}


function limpiarActividadesPasadas() {
    const hoy = new Date();

    const limite = new Date();
    limite.setDate(hoy.getDate() - 7);

    Object.keys(data).forEach(date => {
        const fechaActividad = new Date(date);

        if (fechaActividad < limite) {
            delete data[date];
        }
    });

    localStorage.setItem("mis_actividades", JSON.stringify(data));
}

function renderCalendar() {
    limpiarActividadesPasadas();

    calendar.innerHTML = "";

    Object.keys(data).sort().forEach(date => {
        const dayDiv = document.createElement("div");
        dayDiv.className = "day";

        const [y, m, d] = date.split("-");
        dayDiv.innerHTML = `<h3>${d}/${m}/${y}</h3>`;

        data[date].forEach((act, index) => {
            const actDiv = document.createElement("div");
            actDiv.className = "activity";
            actDiv.style.display = "flex";
            actDiv.style.justifyContent = "space-between";

            const textSpan = document.createElement("span");
            textSpan.textContent = act;

            const btnBorrar = document.createElement("button");
            btnBorrar.textContent = "✕";
            btnBorrar.style.color = "red";
            btnBorrar.style.cursor = "pointer";

            btnBorrar.onclick = () => eliminarActividad(date, index);

            actDiv.appendChild(textSpan);
            actDiv.appendChild(btnBorrar);
            dayDiv.appendChild(actDiv);
        });

        calendar.appendChild(dayDiv);
    });
}

function eliminarActividad(date, index) {
    if (confirm("¿Estás seguro de eliminar esta actividad?")) {
        data[date].splice(index, 1);

        if (data[date].length == 0) {
            delete data[date];
        }

        localStorage.setItem("mis_actividades", JSON.stringify(data));

        renderCalendar();
    }
    if (diffDays <= 2) {
    textSpan.style.color = "red";
} else if (diffDays <= 4) {
    textSpan.style.color = "orange";
}
}

renderCalendar();