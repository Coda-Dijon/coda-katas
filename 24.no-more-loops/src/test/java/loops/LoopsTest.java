package loops;

import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicReference;

import static org.junit.jupiter.api.Assertions.assertEquals;

class LoopUtilsTest {
    @Test
    void forReturnIndexes() {
        var result = LoopUtils.forLoop(0, 5);
        assertEquals(List.of(0, 1, 2, 3, 4), result);
    }

    @Test
    void forTakeAConsumer() {
        var result = new ArrayList<Integer>();

        LoopUtils.forLoop(0, 5, result::add);

        assertEquals(List.of(0, 1, 2, 3, 4), result);
    }

    @Test
    void callActionForEachValue() {
        var numbers = List.of(10, 20, 30);
        var result = new ArrayList<Integer>();

        LoopUtils.forEachInList(numbers, result::add);

        assertEquals(numbers, result);
    }

    @Test
    void callActionForEachGenericValue() {
        var characters = List.of('c', 'o', 'd', 'a');
        var result = new ArrayList<Character>();
        LoopUtils.forEachGenericInList(characters, result::add);

        assertEquals(characters, result);
    }

    @Test
    void callActionForEachGenericValueWithoutFor() {
        var characters = List.of('c', 'o', 'd', 'a');
        var result = new AtomicReference<>("");
        LoopUtils.forEachGenericInListWithoutFor(characters, c -> result.updateAndGet(v -> v + c));

        assertEquals("coda", result.get());
    }

    @Test
    void callActionRecursively() {
        var characters = List.of('c', 'o', 'd', 'a');
        var result = new AtomicReference<>("");
        LoopUtils.callConsumerRecursively(characters,
                c -> result.updateAndGet(v -> v + c), 0
        );
        assertEquals("coda", result.get());
    }
}