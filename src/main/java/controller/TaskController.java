<!DOCTYPE html>
<html>
<head>
    <title>Todo App</title>
    <style>
        body {
            font-family: Arial;
            text-align: center;
            background: #f4f4f4;
        }

        h1 {
            color: #333;
        }

        input {
            padding: 10px;
            width: 200px;
        }

        button {
            padding: 10px;
            margin: 5px;
            cursor: pointer;
        }

        table {
            margin: auto;
            margin-top: 20px;
            border-collapse: collapse;
            width: 60%;
            background: white;
        }

        th, td {
            padding: 10px;
            border: 1px solid #ccc;
        }

        th {
            background: #333;
            color: white;
        }
    </style>
</head>
<body>

<h1>Todo App</h1>

<!-- ADD TASK -->
<input type="text" id="taskInput" placeholder="Enter task">
<button onclick="addTask()">Add Task</button>

<!-- TABLE -->
<table>
    <thead>
        <tr>
            <th>Task</th>
            <th>Status</th>
            <th>Action</th>
            <th>Clear Task</th>
        </tr>
    </thead>
    <tbody id="taskTable"></tbody>
</table>

<script src="script.js"></script>

</body>
</html>
