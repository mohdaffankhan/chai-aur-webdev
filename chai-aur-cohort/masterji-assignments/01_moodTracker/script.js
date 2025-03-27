document.addEventListener("DOMContentLoaded", function () {
    initializeCalendar();
    initializeMoodChart();
    setupMoodSelection();
    setupMoodLogging();
});

/* Initializes the FullCalendar instance and loads mood events. */
function initializeCalendar() {
    const calendarEl = document.getElementById("calendar");

    if (!calendarEl) {
        console.error("Calendar element not found!");
        return;
    }

    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: "dayGridMonth",
        events: loadMoodEvents(),
        eventDisplay: "background",
    });

    calendar.render();
}

/* Loads mood events from localStorage and maps them to calendar events.*/
function loadMoodEvents() {
    const moodLogs = JSON.parse(localStorage.getItem("moodLogs")) || [];
    const moodColors = {
        Happy: "#FFD700",
        Neutral: "#808080",
        Sad: "#1E90FF",
        Excited: "#FF4500",
        Angry: "#FF0000",
    };

    return moodLogs.map((log) => ({
        title: log.mood,
        start: log.date,
        backgroundColor: moodColors[log.mood],
        display: "background",
    }));
}

/**
 * Handles mood selection, ensuring only one mood button is selected at a time.
 */
function setupMoodSelection() {
    document.querySelectorAll(".mood-btn").forEach((button) => {
        button.addEventListener("click", function () {
            document.querySelectorAll(".mood-btn").forEach((btn) => btn.classList.remove("selected"));
            this.classList.add("selected");
        });
    });
}

/**
 * Handles mood logging, storing the selected mood in localStorage and refreshing the page.
 */
function setupMoodLogging() {
    document.querySelector(".submit").addEventListener("click", function () {
        const selectedMood = document.querySelector(".mood-btn.selected")?.dataset.mood;
        if (!selectedMood) {
            alert("Please select a mood!");
            return;
        }

        const today = new Date().toISOString().split("T")[0];
        let moodLogs = JSON.parse(localStorage.getItem("moodLogs")) || [];

        // Remove any existing mood entry for today
        moodLogs = moodLogs.filter((log) => log.date !== today);

        // Add new mood entry for today
        moodLogs.push({ date: today, mood: selectedMood });

        localStorage.setItem("moodLogs", JSON.stringify(moodLogs));

        location.reload(); // Reload to update calendar and chart
    });
}

/**
 * Initializes the mood trend chart using Chart.js.
 */
function initializeMoodChart() {
    const ctx = document.getElementById("moodChart").getContext("2d");

    if (!ctx) {
        console.error("Mood chart canvas not found!");
        return;
    }

    const moodMapping = {
        Angry: 0,
        Sad: 1,
        Neutral: 2,
        Excited: 3,
        Happy: 4,
    };

    const moodLogs = JSON.parse(localStorage.getItem("moodLogs")) || [];
    const sortedMoodLogs = moodLogs.sort((a, b) => new Date(a.date) - new Date(b.date));

    const labels = sortedMoodLogs.map((log) => log.date);
    const moodValues = sortedMoodLogs.map((log) => moodMapping[log.mood]);

    new Chart(ctx, {
        type: "line",
        data: {
            labels: labels,
            datasets: [
                {
                    label: "Mood Trends",
                    data: moodValues,
                    borderColor: "blue",
                    backgroundColor: "rgba(0, 0, 255, 0.2)",
                    fill: true,
                    tension: 0.3,
                },
            ],
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1,
                        callback: (value) => Object.keys(moodMapping).find((key) => moodMapping[key] === value),
                    },
                },
            },
        },
    });
}
