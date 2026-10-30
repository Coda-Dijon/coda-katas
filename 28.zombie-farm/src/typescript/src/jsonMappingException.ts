// Fourni : levée quand un JSON ne peut pas être converti (JSON invalide, type inattendu, ...).
export class JsonMappingException extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = "JsonMappingException";
  }
}
