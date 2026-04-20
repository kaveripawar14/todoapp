const API = "/tasks";

function loadTasks() {
    fetch(API)
        .then(res => res.json())
        .then(data => {
            const table = document.getElementById("taskTable");
            table.innerHTML = "";

            data.forEach(task => {
                const row = document.createElement("tr");

                row.innerHTML = `
                    <td>${task.name}</td>
                    <td>${task.dueDate || "No Date"}</td>

                    <td>
                        ${task.completed 
                            ? "✔ Done" 
                            : `<button class="blue" onclick="markDone(${task.id})">Pending</button>`
                        }
                    </td>

                    <td>${task.completedTime || "-"}</td>

                    <td>
                        ${task.cleared
                            ? `<span style="color: green; font-weight: bold;">Good Job! 🎉</span>`
                            : `
                                <button class="red" onclick="clearTask(${task.id})">Yes</button>
                                <button class="green" onclick="sayGoodJob(${task.id})">No</button>
                            `
                        }
                    </td>
                `;

                table.appendChild(row);
            });
        });
}

function addTask() {
    const input = document.getElementById("taskInput");
    const date = document.getElementById("dateInput");

    if (input.value === "") {
        alert("Enter task!");
        return;
    }

    const task = {
        id: Date.now(),
        name: input.value,
        completed: false,
        dueDate: date.value,
        completedTime: "",
        cleared: false // ⭐ NEW
    };

    fetch(API, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(task)
    }).then(() => {
        input.value = "";
        loadTasks();
    });
}

// ✔ Done
function markDone(id) {
    fetch(API)
        .then(res => res.json())
        .then(data => {
            const task = data.find(t => t.id === id);
            if (!task) return;

            const now = new Date();
            const time = now.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
            });

            task.completed = true;
            task.completedTime = time;

            fetch(API + "/" + id, { method: "DELETE" })
                .then(() => {
                    fetch(API, {
                        method: "POST",
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify(task)
                    }).then(loadTasks);
                });
        });
}

// ❌ YES → delete
function clearTask(id) {
    fetch(API + "/" + id, {
        method: "DELETE"
    }).then(loadTasks);
}

// 👍 NO → save Good Job permanently
function sayGoodJob(id) {
    fetch(API)
        .then(res => res.json())
        .then(data => {
            const task = data.find(t => t.id === id);
            if (!task) return;

            task.cleared = true;

            fetch(API + "/" + id, { method: "DELETE" })
                .then(() => {
                    fetch(API, {
                        method: "POST",
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify(task)
                    }).then(loadTasks);
                });
        });
}

loadTasks();
