package linq_workshop.fundamentals;

import org.junit.jupiter.api.Test;

import static linq_workshop.fundamentals.Basics.isEven;
import static linq_workshop.fundamentals.Basics.isPalindrome;
import static linq_workshop.fundamentals.Basics.toAngle;
import static org.assertj.core.api.Assertions.assertThat;

class BasicsTest {

    @Test
    void palindrome() {
        assertThat(isPalindrome("racecar")).isTrue();
        assertThat(isPalindrome("kayak")).isTrue();
        assertThat(isPalindrome("nein")).isFalse();
    }

    @Test
    void evenNumbers() {
        assertThat(isEven(2)).isTrue();
        assertThat(isEven(101)).isFalse();
    }

    @Test
    void angles() {
        assertThat(toAngle(1)).isEqualTo(new Angle(1));
        assertThat(toAngle(361)).isEqualTo(new Angle(1));
        assertThat(toAngle(360)).isEqualTo(new Angle(0));
        assertThat(toAngle(-1)).isEqualTo(new Angle(-1));
    }
}

final class Basics {

    private Basics() {
    }

    static boolean isPalindrome(String value) {
        throw new UnsupportedOperationException();
    }

    static boolean isEven(int number) {
        throw new UnsupportedOperationException();
    }

    static Angle toAngle(int degrees) {
        throw new UnsupportedOperationException();
    }
}

record Angle(int degrees) {

    Angle {
        degrees = normalize(degrees);
    }

    private static int normalize(int value) {
        return (value % 360 + 360) % 360;
    }

    Angle plus(Angle other) {
        return new Angle(degrees + other.degrees);
    }

    Angle minus(Angle other) {
        return new Angle(degrees - other.degrees);
    }

    @Override
    public String toString() {
        return degrees + "°";
    }
}
