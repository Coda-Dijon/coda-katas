package loops;

import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicReference;

import static org.junit.jupiter.api.Assertions.assertEquals;

class LoopUtilsTest {

    // Étape 1 : une boucle for indexée classique.
    // Décommentez au fur et à mesure de votre implémentation.
    @Test
    void forReturnIndexes() {
        // var result = LoopUtils.forLoop(0, 5);
        // assertEquals(List.of(0, 1, 2, 3, 4), result);
    }

    // Étape 2 : même boucle, mais le résultat est produit via un Consumer plutôt que retourné.
    @Test
    void forTakeAConsumer() {
        // var result = new ArrayList<Integer>();
        //
        // LoopUtils.forLoop(0, 5, result::add);
        //
        // assertEquals(List.of(0, 1, 2, 3, 4), result);
    }

    // Étape 3 : plus le droit d'indexer manuellement (for (int i...)) -> une boucle for-each uniquement.
    @Test
    void callActionForEachValue() {
        // var numbers = List.of(10, 20, 30);
        // var result = new ArrayList<Integer>();
        //
        // LoopUtils.forEachInList(numbers, result::add);
        //
        // assertEquals(numbers, result);
    }

    // Étape 4 : même contrainte, rendue générique (fonctionne pour n'importe quel type d'élément).
    @Test
    void callActionForEachGenericValue() {
        // var characters = List.of('c', 'o', 'd', 'a');
        // var result = new ArrayList<Character>();
        // LoopUtils.forEachGenericInList(characters, result::add);
        //
        // assertEquals(characters, result);
    }

    // Étape 5 : plus le droit d'écrire la moindre boucle (for, for-each, while...) -> déléguez à la bibliothèque standard.
    @Test
    void callActionForEachGenericValueWithoutFor() {
        // var characters = List.of('c', 'o', 'd', 'a');
        // var result = new AtomicReference<>("");
        // LoopUtils.forEachGenericInListWithoutFor(characters, c -> result.updateAndGet(v -> v + c));
        //
        // assertEquals("coda", result.get());
    }

    // Étape 6 : plus le droit à une boucle, ni à une méthode d'itération native (forEach, streams...) -> seule la récursivité vous reste.
    @Test
    void callActionRecursively() {
        // var characters = List.of('c', 'o', 'd', 'a');
        // var result = new AtomicReference<>("");
        // LoopUtils.callConsumerRecursively(characters,
        //         c -> result.updateAndGet(v -> v + c), 0
        // );
        // assertEquals("coda", result.get());
    }
}
