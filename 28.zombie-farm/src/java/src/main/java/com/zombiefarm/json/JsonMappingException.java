package com.zombiefarm.json;

// Fourni : levée quand un JSON ne peut pas être converti (JSON invalide, type inattendu, ...).
public class JsonMappingException extends RuntimeException {
    public JsonMappingException(String message) {
        super(message);
    }

    public JsonMappingException(String message, Throwable cause) {
        super(message, cause);
    }
}
