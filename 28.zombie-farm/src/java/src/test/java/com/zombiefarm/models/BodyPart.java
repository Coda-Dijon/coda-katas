package com.zombiefarm.models;

public class BodyPart {
    private String name;
    private boolean reattachable;

    public BodyPart() {
    }

    public BodyPart(String name, boolean reattachable) {
        this.name = name;
        this.reattachable = reattachable;
    }
}
