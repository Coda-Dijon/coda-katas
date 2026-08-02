using System.Diagnostics.CodeAnalysis;
using CsCheck;
using NFluent;
using static CSharpFunctionalExtensions.Result;
using Check = NFluent.Check;

namespace Luhn.Tests;

public class LuhnAlgorithmShould
{
    [Theory]
    [InlineData("")]
    [InlineData(null)]
    [InlineData("Invalid Number")]
    [InlineData("1234567812345678")]
    [InlineData("12345678123456781212")]
    public void Fail_For_Invalid_Number(string potentialLuhnNumber)
        => Check.That(LuhnNumber.Parse(potentialLuhnNumber))
            .Is(Failure<LuhnNumber>("Invalid Luhn Number"));

    [Theory]
    [InlineData("79927398713")]
    [InlineData("3782 822463 10005")]
    [InlineData("5555 5555 5555 4444")]
    [InlineData("6011 1111 1111 1117")]
    [InlineData("2222222222222224")]
    [InlineData("1234567890123452")]
    [InlineData("1111111111111117")]
    public void Parse_Valid_Number(string potentialLuhnNumber)
        => Check.That(
                LuhnNumber.Parse(potentialLuhnNumber)
                    .Value
                    .ToString()
            )
            .Is(potentialLuhnNumber.Replace(" ", ""));

    [Fact]
    [SuppressMessage("Sonar", "S2699", Justification = "CsCheck performs the assertion")]
    public void Parse_Generated_Numbers()
        => Gen.Int[2, 1000]
            .Sample(CanParseGeneratedNumber);

    private static bool CanParseGeneratedNumber(int x)
        => LuhnNumber.Parse(
            LuhnNumber.Generate(NumberSize.From(x))
        ).IsSuccess;
}