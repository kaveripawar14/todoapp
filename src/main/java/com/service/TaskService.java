package com.example.todoapp.service;

import com.example.todoapp.model.Task;
import com.example.todoapp.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    private final TaskRepository repo;

    public TaskService(TaskRepository repo) {
        this.repo = repo;
    }

    // 🔄 GET ALL
    public List<Task> getAllTasks() {
        return repo.getAll();
    }

    // ➕ ADD
    public void addTask(Task task) {
        repo.add(task);
    }

    // ❌ DELETE
    public void deleteTask(Long id) {
        repo.delete(id);
    }

    // ✏ UPDATE (MOST IMPORTANT 🔥)
    public Task updateTask(Long id, Task updatedTask) {
        List<Task> tasks = repo.getAll();

        for (Task task : tasks) {
            if (task.getId().equals(id)) {
                task.setName(updatedTask.getName());
                task.setCompleted(updatedTask.isCompleted());
                task.setDueDate(updatedTask.getDueDate());
                task.setCompletedTime(updatedTask.getCompletedTime());
                task.setCleared(updatedTask.isCleared());
                return task;
            }
        }

        return null;
    }
}
