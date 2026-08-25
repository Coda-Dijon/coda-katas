package linq_workshop.fundamentals;

import org.junit.jupiter.api.Test;

import java.util.function.BiFunction;
import java.util.function.Function;

import static org.assertj.core.api.Assertions.assertThat;

class PlayWithFunctionsTest {

    private static final BiFunction<Integer, Integer, Integer> add = (x, y) -> x + y;
    private static final BiFunction<Integer, Integer, Integer> multiply = (x, y) -> x * y;
    private static final Function<Integer, String> toBinary = Integer::toBinaryString;

    @Test
    void add1AndDoubleIt() {
        assertThat(5).isEqualTo(6);
    }

    @Test
    void binaryPalindrome() {

    }
}
