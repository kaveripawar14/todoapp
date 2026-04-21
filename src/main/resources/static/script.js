const API = "/tasks";

// 🔄 LOAD TASKS
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
                            : `<button onclick="markDone(${task.id})">Pending</button>`
                        }
                    </td>

                    <td>${task.completedTime || "-"}</td>

                    <td>
                        ${task.cleared
                            ? `<span style="color: green; font-weight: bold;">Good Job!</span>`
                            : `
                                <button onclick="clearTask(${task.id})">Yes</button>
                                <button onclick="sayGoodJob(${task.id})">No</button>
                            `
                        }
                    </td>
                `;

                table.appendChild(row);
            });
        })
        .catch(err => console.error("Load error:", err));
}

// ➕ ADD TASK
function addTask() {
    const input = document.getElementById("taskInput");
    const date = document.getElementById("dateInput");

    if (!input.value.trim()) {
        alert("Enter task!");
        return;
    }

    const task = {
        name: input.value.trim(),
        completed: false,
        dueDate: date ? date.value : "",
        completedTime: "",
        cleared: false
    };

    fetch(API, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(task)
    })
    .then(() => {
        input.value = "";
        if (date) date.value = "";
        loadTasks();
    });
}

// ✔ MARK DONE (UPDATE)
function markDone(id) {
    fetch(API)
        .then(res => res.json())
        .then(data => {
            const task = data.find(t => t.id === id);
            if (!task) return;

            const time = new Date().toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
            });

            task.completed = true;
            task.completedTime = time;

            fetch(API + "/" + id, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(task)
            }).then(loadTasks);
        });
}

// ❌ DELETE TASK (YES)
function clearTask(id) {
    fetch(API + "/" + id, { method: "DELETE" })
        .then(loadTasks);
}

// 👍 GOOD JOB (NO → UPDATE)
function sayGoodJob(id) {
    fetch(API)
        .then(res => res.json())
        .then(data => {
            const task = data.find(t => t.id === id);
            if (!task) return;

            task.cleared = true;

            fetch(API + "/" + id, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(task)
            }).then(loadTasks);
        });
}

// 🔥 INITIAL LOAD
window.onload = loadTasks;
