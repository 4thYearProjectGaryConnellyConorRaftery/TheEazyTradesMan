package com.projectBackEnd.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.NamedQuery;

import org.hibernate.annotations.GenericGenerator;

@Entity
@NamedQuery(name = "Todo.findAll", query = "SELECT t FROM Todo t")
public class Todo {

    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String id;
    private String task;
    private String description;

    public String getId() {
        return id;
    }

    public void setId(final String id) {
        this.id = id;
    }

    public String getTask() {
        return task;
    }

    public void setTask(final String task) {
        this.task = task;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(final String description) {
        this.description = description;
    }

    @Override
    public String toString() {
        return "Todo{" + "id=" + id + ", task=" + task + ", description=" + description + '}';
    }

}