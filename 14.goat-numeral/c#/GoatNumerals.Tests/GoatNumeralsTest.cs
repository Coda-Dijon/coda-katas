using System.Text.RegularExpressions;
using FluentAssertions;
using FsCheck;
using FsCheck.Xunit;
using Xunit;
using static System.String;
using static GoatNumerals.GoatNumeralsConverter;

namespace GoatNumerals.Tests
{
    public partial class GoatNumeralsTest
    {
        [Fact]
        public void GenerateEmptyFor0()
            => Convert(0)
                .Should()
                .Be(Empty);

        [Theory]
        [InlineData(1, "M")]
        [InlineData(3, "MMM")]
        [InlineData(4, "MBa")]
        [InlineData(5, "Ba")]
        [InlineData(10, "Meh")]
        [InlineData(13, "MehMMM")]
        [InlineData(50, "Baa")]
        [InlineData(100, "Meeh")]
        [InlineData(500, "Baaa")]
        [InlineData(1000, "🐐")]
        [InlineData(2499, "🐐🐐MeehBaaaMehMeehMMeh")]
        [InlineData(2900, "🐐🐐Meeh🐐")]
        public void GenerateGoatNumeralsForNumbers(int number, string expectedGoatNumeral)
            => Convert(number)
                .Should()
                .Be(expectedGoatNumeral);

        [GeneratedRegex("^(?:M|Ba|Meh|Baa|Meeh|Baaa|🐐)+$")]
        private static partial Regex ValidGoatRegex();

        private static readonly Arbitrary<int> ValidNumbers = Gen.Choose(1, 3999).ToArbitrary();

        [Property]
        public void ReturnsOnlyValidSymbolsForValidNumbers()
            => Prop.ForAll(ValidNumbers,
                    n => AllGoatCharactersAreValid(Convert(n)))
                .QuickCheckThrowOnFailure();

        private static bool AllGoatCharactersAreValid(string goatNumber) => ValidGoatRegex().IsMatch(goatNumber);

        private static readonly Arbitrary<int> InvalidNumbers = Arb.Default.Int32().Filter(x => x is <= 0 or > 3999);

        [Property]
        public void ReturnsEmptyForAnyInvalidNumber()
            => Prop.ForAll(InvalidNumbers, n => Convert(n) == Empty)
                .QuickCheckThrowOnFailure();
    }
}