```

BenchmarkDotNet v0.14.0, macOS Sonoma 14.6.1 (23G93) [Darwin 23.6.0]
Intel Core i5-8279U CPU 2.40GHz (Coffee Lake), 1 CPU, 8 logical and 4 physical cores
.NET SDK 8.0.100
  [Host]     : .NET 8.0.0 (8.0.23.53103), X64 RyuJIT AVX2
  DefaultJob : .NET 8.0.0 (8.0.23.53103), X64 RyuJIT AVX2


```
| Method                 | Mean            | Error         | StdDev         | Median          |
|----------------------- |----------------:|--------------:|---------------:|----------------:|
| AllComponents          |    99,312.05 ns |  1,977.998 ns |   2,707.507 ns |    99,218.39 ns |
| AllComponentsOptimized |        13.31 ns |      0.285 ns |       0.305 ns |        13.33 ns |
| AllComponentsWithLinQ  |        36.11 ns |      0.751 ns |       0.894 ns |        36.28 ns |
| GroupByTypes           |   176,688.20 ns |  3,456.335 ns |   4,494.212 ns |   176,610.90 ns |
| GroupByTypesWithLinQ   | 1,211,539.73 ns | 36,503.318 ns | 102,958.262 ns | 1,172,532.24 ns |
