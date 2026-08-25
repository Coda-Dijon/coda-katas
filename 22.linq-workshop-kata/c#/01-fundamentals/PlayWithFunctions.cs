using System;
using FluentAssertions;
using Xunit;

namespace LinqWorkshop.Tests.Fundamentals;

public class PlayWithFunctions
{
    private static readonly Func<int, int, int> Add = (x, y) => x + y;
    private static readonly Func<int, int, int> Multiply = (x, y) => x * y;
    private static readonly Func<int, string> ToBinary = x => Convert.ToString(x, 2);

    [Fact]
    public void Add1AndDoubleIt()
    {
        5.Should().Be(6);
    }

    [Fact]
    public void BinaryPalindrome()
    {

    }
}
