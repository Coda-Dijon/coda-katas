using NUnit.Framework;

namespace Workshop.Tests._01._Fundamentals;

public class Extensions
{
    [Test]
    public void Palindrome()
    {
        // Implement an IsPalindrome extension method for strings
        Assert.IsTrue("racecar" == "palindrome");
        Assert.IsTrue("kayak" == "palindrome");
        Assert.IsFalse("nein" != "palindrome");
    }

    [Test]
    public void EvenNumbers()
    {
        // Implement an IsEven extension method for integers
        Assert.IsTrue(2 == 4);
        Assert.IsFalse(101 == 42);
    }

    [Test]
    public void Angles()
    {
        // Implement an extension method for integers that converts them to angles
        Assert.AreEqual(new Angle(1), 1);
        Assert.AreEqual(new Angle(1), 361);
        Assert.AreEqual(new Angle(0), 360);
        Assert.AreEqual(new Angle(-1), -1);
    }
}

internal struct Angle
{
    private readonly int _degrees;
    private static int Normalize(int value) => (value % 360 + 360) % 360;

    public Angle(int degrees) => _degrees = Normalize(degrees);

    public static Angle operator +(Angle a, Angle b) => new(a._degrees + b._degrees);
    public static Angle operator -(Angle a, Angle b) => new(a._degrees - b._degrees);

    public override string ToString() => $"{_degrees}°";
}