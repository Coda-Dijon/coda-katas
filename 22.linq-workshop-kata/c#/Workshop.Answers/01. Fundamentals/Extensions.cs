using System.Linq;
using NUnit.Framework;

namespace Workshop.Answers._01._Fundamentals;

public class Extensions
{
    [Test]
    public void Palindrome()
    {
        Assert.IsTrue("racecar".IsPalindrome());
        Assert.IsTrue("kayak".IsPalindrome());
        Assert.IsFalse("nein".IsPalindrome());
    }

    [Test]
    public void EvenNumbers()
    {
        Assert.IsTrue(2.IsEven());
        Assert.IsFalse(101.IsEven());
    }

    [Test]
    public void Angles()
    {
        Assert.AreEqual(new Angle(1), 1.ToAngle());
        Assert.AreEqual(new Angle(1), 361.ToAngle());
        Assert.AreEqual(new Angle(0), 360.ToAngle());
        Assert.AreEqual(new Angle(-1), (-1).ToAngle());
    }
}

internal static class StringExtensions
{
    public static bool IsPalindrome(this string str)
        => !string.IsNullOrEmpty(str) && str.SequenceEqual(str.Reverse());
}

internal static class IntExtensions
{
    public static bool IsEven(this int number) => number % 2 == 0;
    public static Angle ToAngle(this int degrees) => new(degrees);
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