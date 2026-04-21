package com.example.todoapp.controller;

import com.example.todoapp.model.Task;
import com.example.todoapp.service.TaskService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tasks")
@CrossOrigin
public class TaskController {

    private final TaskService service;

    public TaskController(TaskService service) {
        this.service = service;
    }

    // 🔄 GET ALL
    @GetMapping
    public List<Task> getAll() {
        return service.getAllTasks();
    }

    // ➕ ADD
    @PostMapping
    public String addTask(@RequestBody Task task) {
        service.addTask(task);
        return "Task added";
    }

    // ❌ DELETE
    @DeleteMapping("/{id}")
    public String deleteTask(@PathVariable Long id) {
        service.deleteTask(id);
        return "Task deleted";
    }

    // ✏ UPDATE (IMPORTANT 🔥)
    @PutMapping("/{id}")
    public Task updateTask(@PathVariable Long id, @RequestBody Task updatedTask) {
        return service.updateTask(id, updatedTask);
    }
}
