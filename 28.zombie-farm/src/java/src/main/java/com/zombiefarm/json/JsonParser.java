package com.zombiefarm.json;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;

// Fourni : transforme un texte JSON en arbre de valeurs Java.
//   objet  -> Map<String, Object> (les clés gardent leur ordre)
//   tableau -> List<Object>
//   chaîne -> String
//   nombre -> Long s'il est entier, Double sinon
//   true / false -> Boolean
//   null   -> null
// L'appelant choisit le type attendu pour la racine, par exemple :
//   Map<String, Object> fields = JsonParser.parse("{\"zombie_name\":\"Gérard\"}", Map.class);
// Les valeurs à l'intérieur de l'arbre restent des Object : à vous de tester leur type.
public final class JsonParser {
    private static final Pattern NUMBER = Pattern.compile("-?(0|[1-9]\\d*)(\\.\\d+)?([eE][+-]?\\d+)?");

    private final String text;
    private int position;

    private JsonParser(String text) {
        this.text = text;
    }

    public static <T> T parse(String json, Class<T> type) {
        if (json == null) throw new JsonMappingException("JSON invalide : le texte est null");
        var parser = new JsonParser(json);
        parser.skipWhitespace();
        var tree = parser.readValue();
        parser.skipWhitespace();
        if (parser.position != json.length()) throw parser.error("fin du texte attendue");

        if (!type.isInstance(tree)) {
            throw new JsonMappingException(
                    "La racine du JSON est " + describe(tree) + ", impossible de la lire comme " + type.getSimpleName());
        }
        return type.cast(tree);
    }

    private static String describe(Object tree) {
        return switch (tree) {
            case Map<?, ?> ignored -> "un objet";
            case List<?> ignored -> "un tableau";
            case String ignored -> "une chaîne";
            case Number ignored -> "un nombre";
            case Boolean ignored -> "un booléen";
            case null, default -> "null";
        };
    }

    private Object readValue() {
        return switch (peek()) {
            case '{' -> readObject();
            case '[' -> readArray();
            case '"' -> readString();
            case 't' -> readLiteral("true", Boolean.TRUE);
            case 'f' -> readLiteral("false", Boolean.FALSE);
            case 'n' -> readLiteral("null", null);
            default -> readNumber();
        };
    }

    private Map<String, Object> readObject() {
        var object = new LinkedHashMap<String, Object>();
        expect('{');
        skipWhitespace();
        if (tryConsume('}')) return object;
        do {
            skipWhitespace();
            var key = readString();
            skipWhitespace();
            expect(':');
            skipWhitespace();
            object.put(key, readValue());
            skipWhitespace();
        } while (tryConsume(','));
        expect('}');
        return object;
    }

    private List<Object> readArray() {
        var array = new ArrayList<>();
        expect('[');
        skipWhitespace();
        if (tryConsume(']')) return array;
        do {
            skipWhitespace();
            array.add(readValue());
            skipWhitespace();
        } while (tryConsume(','));
        expect(']');
        return array;
    }

    private String readString() {
        expect('"');
        var builder = new StringBuilder();
        while (true) {
            char c = next();
            if (c == '"') return builder.toString();
            if (c != '\\') {
                builder.append(c);
                continue;
            }
            char escaped = next();
            switch (escaped) {
                case '"', '\\', '/' -> builder.append(escaped);
                case 'b' -> builder.append('\b');
                case 'f' -> builder.append('\f');
                case 'n' -> builder.append('\n');
                case 'r' -> builder.append('\r');
                case 't' -> builder.append('\t');
                case 'u' -> builder.append(readUnicodeEscape());
                default -> throw error("échappement inconnu \\" + escaped);
            }
        }
    }

    private char readUnicodeEscape() {
        if (position + 4 > text.length()) throw error("échappement \\u incomplet");
        var hex = text.substring(position, position + 4);
        position += 4;
        try {
            return (char) Integer.parseInt(hex, 16);
        } catch (NumberFormatException e) {
            throw error("échappement \\u" + hex + " invalide");
        }
    }

    private Object readLiteral(String literal, Object value) {
        if (!text.startsWith(literal, position)) throw error("valeur inattendue");
        position += literal.length();
        return value;
    }

    private Object readNumber() {
        var matcher = NUMBER.matcher(text).region(position, text.length());
        if (!matcher.lookingAt()) throw error("valeur inattendue");
        position = matcher.end();
        var number = matcher.group();
        return matcher.group(2) == null && matcher.group(3) == null
                ? (Object) Long.parseLong(number)
                : (Object) Double.parseDouble(number);
    }

    private void skipWhitespace() {
        while (position < text.length() && Character.isWhitespace(text.charAt(position))) position++;
    }

    private char peek() {
        if (position >= text.length()) throw error("fin du texte inattendue");
        return text.charAt(position);
    }

    private char next() {
        char c = peek();
        position++;
        return c;
    }

    private void expect(char expected) {
        if (next() != expected) {
            position--;
            throw error("'" + expected + "' attendu");
        }
    }

    private boolean tryConsume(char expected) {
        if (position < text.length() && text.charAt(position) == expected) {
            position++;
            return true;
        }
        return false;
    }

    private JsonMappingException error(String message) {
        return new JsonMappingException("JSON invalide à la position " + position + " : " + message);
    }
}
