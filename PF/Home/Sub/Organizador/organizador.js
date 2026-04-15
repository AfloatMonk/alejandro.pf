const calendar = document.getElementById("calendar");
        const data = {};

        function addActivity() {
            const date = document.getElementById("date").value;
            const activity = document.getElementById("activity").value;

            if (!date || !activity) {
                alert("Completa la fecha y la actividad");
                return;
            }

            if (!data[date]) {
                data[date] = [];
            }

            data[date].push(activity);
            document.getElementById("activity").value = "";
            renderCalendar();
        }

        function renderCalendar() {
            calendar.innerHTML = "";

            Object.keys(data).sort().forEach(date => {
                const dayDiv = document.createElement("div");
                dayDiv.className = "day";

                dayDiv.innerHTML = `<h3>${date}</h3>`;

                data[date].forEach(act => {
                    const actDiv = document.createElement("div");
                    actDiv.className = "activity";
                    actDiv.textContent = act;
                    dayDiv.appendChild(actDiv);
                });

                calendar.appendChild(dayDiv);
            });
        }
        