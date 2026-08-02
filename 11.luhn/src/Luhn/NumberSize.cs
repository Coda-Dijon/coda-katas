namespace Luhn;

public class NumberSize
{
    private readonly int _size;
    private NumberSize(int size) => _size = size;

    public int Size => _size;

    public static NumberSize From(int x) 
        => x >= 2 
            ? new NumberSize(x) 
            : throw  new ArgumentException($"Invalid number size: {x}");
}