using System;
using FluentAssertions;
using Xunit;

namespace LinqWorkshop.Tests.Fundamentals;

public class Extensions
{
    [Fact]
    public void Palindrome()
    {
        "racecar".IsPalindrome().Should().BeTrue();
        "kayak".IsPalindrome().Should().BeTrue();
        "nein".IsPalindrome().Should().BeFalse();
    }

    [Fact]
    public void EvenNumbers()
    {
        2.IsEven().Should().BeTrue();
        101.IsEven().Should().BeFalse();
    }

    [Fact]
    public void Angles()
    {
        1.ToAngle().Should().Be(new Angle(1));
        361.ToAngle().Should().Be(new Angle(1));
        360.ToAngle().Should().Be(new Angle(0));
        (-1).ToAngle().Should().Be(new Angle(-1));
    }
}

internal static class StringExtensions
{
    public static bool IsPalindrome(this string str)
        => throw new NotImplementedException();
}

internal static class IntExtensions
{
    public static bool IsEven(this int number)
        => throw new NotImplementedException();

    public static Angle ToAngle(this int degrees)
        => throw new NotImplementedException();
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
