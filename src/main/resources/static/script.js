let loggedInUser = "";

// SHOW SIGNUP
function showSignup() {
    document.getElementById("signupDiv").style.display = "block";
}

// SIGNUP
function signup() {
    const username = document.getElementById("signupUsername").value;
    const password = document.getElementById("signupPassword").value;

    fetch("/auth/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
    })
    .then(res => res.text())
    .then(data => alert(data));
}

// LOGIN
function login() {
    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;

    fetch("/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
    })
    .then(res => res.text())
    .then(data => {
        alert(data);

        if (data === "Login successful") {

            loggedInUser = username;

            // Hide auth
            document.getElementById("authSection").style.display = "none";

            // Show profile
            document.getElementById("profileSection").style.display = "block";
            document.getElementById("profileName").innerText = username;

            // Show todo
            document.getElementById("todoSection").style.display = "block";
        }
    });
}

// ADD TASK
function addTask() {

    const taskInput = document.getElementById("taskInput");
    const task = taskInput.value;

    if (task === "") return;

    const table = document.getElementById("taskTable");

    const row = table.insertRow();

    const cell1 = row.insertCell(0);
    cell1.innerText = task;

    const cell2 = row.insertCell(1);
    cell2.innerText = "Pending";

    const cell3 = row.insertCell(2);
    const doneBtn = document.createElement("button");
    doneBtn.innerText = "Done";

    doneBtn.onclick = function () {
        cell2.innerText = "Done";

        const time = new Date().toLocaleTimeString();
        cell3.innerText = "Done (" + time + ")";

        const cell4 = row.insertCell(3);

        const yesBtn = document.createElement("button");
        yesBtn.innerText = "Yes";

        const noBtn = document.createElement("button");
        noBtn.innerText = "No";

        yesBtn.onclick = function () {
            row.remove();
        };

        noBtn.onclick = function () {
            cell4.innerText = "Good Job!";
        };

        cell4.appendChild(yesBtn);
        cell4.appendChild(noBtn);
    };

    cell3.appendChild(doneBtn);

    taskInput.value = "";
}
