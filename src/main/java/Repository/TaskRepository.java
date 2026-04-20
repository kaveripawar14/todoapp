package com.example.todoapp.repository;

import com.example.todoapp.model.Task;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class TaskRepository {

    private List<Task> tasks = new ArrayList<>();

    public List<Task> getAll() {
        return tasks;
    }

    public void add(Task task) {
        tasks.add(task);
    }

    public void delete(Long id) {
        tasks.removeIf(t -> t.getId().equals(id));
    }
}
