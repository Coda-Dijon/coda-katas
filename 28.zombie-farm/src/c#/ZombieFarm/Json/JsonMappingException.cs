namespace ZombieFarm.Json;

// Fourni : levée quand un JSON ne peut pas être converti (JSON invalide, type inattendu, ...).
public class JsonMappingException(string message, Exception? innerException = null)
    : Exception(message, innerException);
