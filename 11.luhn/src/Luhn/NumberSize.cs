namespace Luhn;

public class NumberSize : IEquatable<NumberSize>
{
    private NumberSize(int size) => Size = size;

    public int Size { get; }

    public static NumberSize From(int x)
        => x >= 2
            ? new NumberSize(x)
            : throw new ArgumentException($"Invalid number size: {x}");

    public bool Equals(NumberSize? other)
        => other is not null && Size == other.Size;

    public override bool Equals(object? obj)
        => Equals(obj as NumberSize);

    public override int GetHashCode()
        => Size.GetHashCode();

    public static bool operator ==(NumberSize? left, NumberSize? right)
        => left?.Equals(right) ?? right is null;

    public static bool operator !=(NumberSize? left, NumberSize? right)
        => !(left == right);
}