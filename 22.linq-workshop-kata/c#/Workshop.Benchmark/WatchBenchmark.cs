using System.Text.Json;
using BenchmarkDotNet.Attributes;
using Workshop.Benchmark.Watch;
using static System.IO.File;

namespace Workshop.Benchmark;

[MarkdownExporter, HtmlExporter, CsvExporter, RPlotExporter]
public class WatchBenchmark
{
    private readonly Component _watch = DeserializeWatch();

    [Benchmark]
    public void AllComponents() => _watch.GetAllComponents();

    [Benchmark]
    public void AllComponentsOptimized() => _watch.GetAllComponentsOptimized();

    [Benchmark]
    public void AllComponentsWithLinQ() => _watch.GetAllComponentsWithLinQ();

    [Benchmark]
    public void GroupByTypes() => _watch.GroupByType();

    [Benchmark]
    public void GroupByTypesWithLinQ() => _watch.GroupByTypeWithLinQ();

    private static readonly JsonSerializerOptions ReadOptions = new()
    {
        PropertyNameCaseInsensitive = true
    };

    private static Component? DeserializeWatch()
        => JsonSerializer.Deserialize<Component>(
            ReadAllText("watch.json"),
            ReadOptions
        );
}