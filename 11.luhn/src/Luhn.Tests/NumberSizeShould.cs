using CsCheck;
using NFluent;
using Check = NFluent.Check;

namespace Luhn.Tests;

public class NumberSizeShould
{
    [Theory]
    [InlineData(1)]
    [InlineData(0)]
    [InlineData(-10)]
    public void Not_Instantiate_When_Size_Is_Invalid(int x)
        => Check.ThatCode(() => NumberSize.From(x))
            .Throws<ArgumentException>();

    [Fact]
    public void Be_Equals_By_Value()
        => Gen.Int[2, 1000]
            .Sample(x => NumberSize.From(x) == NumberSize.From(x));
}