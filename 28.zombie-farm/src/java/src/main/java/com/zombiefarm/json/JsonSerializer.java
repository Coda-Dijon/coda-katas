package com.zombiefarm.json;

// À implémenter, par réflexion (java.lang.reflect).
public class JsonSerializer {
    public String serialize(Object object) {
        throw new UnsupportedOperationException("serialize n'est pas encore implémentée");
    }

    // Astuce : commencez par JsonParser.parse(json, Map.class) pour obtenir les champs du JSON.
    public <T> T deserialize(String json, Class<T> type) {
        throw new UnsupportedOperationException("deserialize n'est pas encore implémentée");
    }
}
