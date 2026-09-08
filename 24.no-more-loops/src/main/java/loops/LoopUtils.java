package loops;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Consumer;
import java.util.function.IntConsumer;

public class LoopUtils {
    private LoopUtils() {
        /* This utility class should not be instantiated */
    }

    public static List<Integer> forLoop(int debut, int fin) {
        var result = new ArrayList<Integer>();
        for (int i = debut; i < fin; i++) {
            result.add(i);
        }
        return result;
    }

    public static void forLoop(int debut, int fin, IntConsumer consumer) {
        for (int i = debut; i < fin; i++) {
            consumer.accept(i);
        }
    }


    public static void forEachInList(List<Integer> list, IntConsumer consumer) {
        for (var i : list) {
            consumer.accept(i);
        }
    }

    public static <T> void forEachGenericInList(List<T> list, Consumer<T> consumer) {
        for (var i : list) {
            consumer.accept(i);
        }
    }

    public static <T> void forEachGenericInListWithoutFor(List<T> list, Consumer<T> consumer) {
        list.forEach(consumer);
    }

    public static <T> void callConsumerRecursively(List<T> list, Consumer<T> consumer, int index) {
        if (index >= list.size()) return;
        consumer.accept(list.get(index));
        callConsumerRecursively(list, consumer, index + 1);
    }
}