package com.zombiefarm.models;

import com.zombiefarm.json.JsonName;

public class Necromancer {
    private String name;
    @JsonName("dark_title")
    private String title;
    private int yearsOfService;

    public Necromancer() {
    }

    public Necromancer(String name, String title, int yearsOfService) {
        this.name = name;
        this.title = title;
        this.yearsOfService = yearsOfService;
    }
}
