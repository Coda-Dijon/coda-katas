package com.zombiefarm.models;

import com.zombiefarm.json.JsonIgnore;
import com.zombiefarm.json.JsonName;

import java.util.ArrayList;
import java.util.List;

public class Zombie {
    // Convention collective des morts-vivants
    public static final int MAX_HOURS_PER_DAY = 24;

    @JsonName("zombie_name")
    private String name;
    private int hoursWorkedToday;
    private double brainsPerHour;
    private boolean unionized;
    private Necromancer supervisor;
    private List<BodyPart> missingBodyParts = new ArrayList<>();
    private List<String> skills = new ArrayList<>();
    // RGPD des morts-vivants : l'identité humaine ne doit jamais sortir de l'élevage
    @JsonIgnore
    private String humanIdentity;

    public Zombie() {
    }

    public Zombie(String name,
                  int hoursWorkedToday,
                  double brainsPerHour,
                  boolean unionized,
                  Necromancer supervisor,
                  List<BodyPart> missingBodyParts,
                  List<String> skills,
                  String humanIdentity) {
        this.name = name;
        this.hoursWorkedToday = hoursWorkedToday;
        this.brainsPerHour = brainsPerHour;
        this.unionized = unionized;
        this.supervisor = supervisor;
        this.missingBodyParts = missingBodyParts;
        this.skills = skills;
        this.humanIdentity = humanIdentity;
    }
}
