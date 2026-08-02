using System.Text.RegularExpressions;
using CSharpFunctionalExtensions;
using static System.Linq.Enumerable;
using static System.Security.Cryptography.RandomNumberGenerator;
using static System.String;

namespace Luhn;

public partial class LuhnNumber : ValueObject
{
    private readonly string _luhnNumber;
    private LuhnNumber(string luhnNumber) => _luhnNumber = luhnNumber;

    public static Result<LuhnNumber> Parse(string potentialLuhnNumber)
        => IsValidFormat(potentialLuhnNumber)
            ? ParseSafely(potentialLuhnNumber)
            : InvalidNumber();

    public static string Generate(NumberSize n)
        => Range(0, n.Size - 1)
            .Select(_ => GetInt32(0, 10))
            .ToArray()
            .Map(digits => $"{Concat(digits)}{GenerateCheckDigit(digits)}");

    private static bool IsValidFormat(string potentialLuhnNumber)
        => !IsNullOrWhiteSpace(potentialLuhnNumber)
           && OnlyNumberRegex().IsMatch(Sanitize(potentialLuhnNumber));

    private static Result<LuhnNumber> ParseSafely(string potentialLuhnNumber)
        => Sanitize(potentialLuhnNumber)
            .Select(c => c - '0')
            .ToArray()
            .Map(ToResult);

    private static Result<LuhnNumber> ToResult(int[] sanitizedNumber)
        => IsValidSumOfNumbers(CheckSum(sanitizedNumber))
            ? Result.Success(new LuhnNumber(Concat(sanitizedNumber)))
            : InvalidNumber();

    private static int CheckSum(int[] sanitizedNumber)
        => sanitizedNumber
            .Reverse()
            .Select(Digit)
            .Sum(x => x);

    private static int Digit(int x, int index)
    {
        if (index % 2 != 1) return x;
        var n = x * 2;
        return n > 9 ? n - 9 : n;
    }

    private static bool IsValidSumOfNumbers(int number) => number % 10 == 0;
    private static Result<LuhnNumber> InvalidNumber() => Result.Failure<LuhnNumber>("Invalid Luhn Number");
    private static string Sanitize(string potentialLuhnNumber) => potentialLuhnNumber.Replace(" ", "");

    protected override IEnumerable<object> GetEqualityComponents()
    {
        yield return _luhnNumber;
    }

    public override string ToString() => _luhnNumber;

    [GeneratedRegex("^[0-9]+$")]
    private static partial Regex OnlyNumberRegex();

    private static int GenerateCheckDigit(int[] digits)
        => CheckSum(digits.Append(0).ToArray())
            .Map(sum => (10 - sum % 10) % 10);
}