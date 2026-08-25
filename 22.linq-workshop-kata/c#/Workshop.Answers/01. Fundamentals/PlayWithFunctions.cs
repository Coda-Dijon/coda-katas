using System;
using NUnit.Framework;

namespace Workshop.Answers._01._Fundamentals;

public class PlayWithFunctions
{
    private static readonly Func<int, int, int> Add = (x, y) => x + y;
    private static readonly Func<int, int, int> Multiply = (x, y) => x * y;
    private static readonly Func<int, string> ToBinary = x => Convert.ToString(x, 2);

    [Test]
    public void Add1AndDoubleIt()
    {
        // Create an Add1 function based on Add function
        // Create a Double function based on Multiply
        // Compose the 2 functions together to implement the Add1AndDouble function
        var Add1 = (int x) => Add(x, 1);
        var Double = (int x) => Multiply(x, 2);
        var Add1AndDouble = (int x) => Double(Add1(x));

        Assert.AreEqual(6, Add1AndDouble(2));
    }

    [Test]
    public void BinaryPalindrome()
    {
        // Implement a function that checks if a number is a binary palindrome
        // Taking a number and a function that converts it to a string
        Assert.IsTrue(IsPalindrome(9, x => ToBinary(x))); // 9 in binary is 1001, which is a palindrome
        Assert.IsFalse(IsPalindrome(10, ToBinary)); // 10 in binary is 1010, which is not a palindrome
    }

    private static bool IsPalindrome(int value, Func<int, string> converter) => converter(value).IsPalindrome();
}