using System.Text.Json;
using OnePieceApi.Models;

namespace OnePieceApi.Services;

public class OnePieceApiService
{
    private readonly HttpClient _httpClient;
    private const string BaseUrl = "https://api-onepiece-final-gdh7anbmfsakb6ew.spaincentral-01.azurewebsites.net/api/";

    public OnePieceApiService(HttpClient httpClient)
    {
        _httpClient = httpClient;
        if (_httpClient.BaseAddress == null)
        {
            _httpClient.BaseAddress = new Uri(BaseUrl);
        }
    }

    public async Task<List<Character>> GetAllCharacters()
    {
        var root = await FetchJson("personajes");
        if (root == null)
            throw new InvalidOperationException("La API no devolvió datos.");

        var list = ExtractArray(root.Value)
            .Select(MapCharacter)
            .ToList();

        if (list.Count == 0)
            throw new InvalidOperationException("No se encontraron personajes en la respuesta de la API.");

        return list;
    }

    public async Task<Character?> GetCharacterById(int id)
    {
        var root = await FetchJson($"personaje/{id}");
        if (root == null)
            return null;

        if (root.Value.ValueKind == JsonValueKind.Object)
        {
            if (root.Value.TryGetProperty("data", out var data) && data.ValueKind == JsonValueKind.Object)
                return MapCharacter(data);

            return MapCharacter(root.Value);
        }

        if (root.Value.ValueKind == JsonValueKind.Array)
        {
            var first = root.Value.EnumerateArray().FirstOrDefault();
            return first.ValueKind != JsonValueKind.Undefined ? MapCharacter(first) : null;
        }

        return null;
    }

    public async Task<List<Crew>> GetCrews()
    {
        var root = await FetchJson("tripulaciones");
        if (root == null)
            throw new InvalidOperationException("La API no devolvió tripulaciones.");

        var list = ExtractArray(root.Value)
            .Select(MapCrew)
            .ToList();

        if (list.Count == 0)
            throw new InvalidOperationException("No se encontraron tripulaciones en la respuesta de la API.");

        return list;
    }

    public async Task<Crew?> GetCrewById(int id)
    {
        var root = await FetchJson($"tripulacion/{id}");
        if (root == null)
            return null;

        if (root.Value.ValueKind == JsonValueKind.Object)
            return MapCrew(root.Value);

        if (root.Value.ValueKind == JsonValueKind.Array)
        {
            var first = root.Value.EnumerateArray().FirstOrDefault();
            return first.ValueKind != JsonValueKind.Undefined ? MapCrew(first) : null;
        }

        return null;
    }

    public async Task<List<Character>> SearchCharacters(string term)
    {
        var characters = await GetAllCharacters();
        if (string.IsNullOrWhiteSpace(term))
            return characters;

        return characters
            .Where(c => c.Name.Contains(term, StringComparison.OrdinalIgnoreCase))
            .ToList();
    }

    private async Task<JsonElement?> FetchJson(string path)
    {
        var response = await _httpClient.GetAsync(path);
        response.EnsureSuccessStatusCode();

        await using var stream = await response.Content.ReadAsStreamAsync();
        using var document = await JsonDocument.ParseAsync(stream);
        return document.RootElement.Clone();
    }

    private static IEnumerable<JsonElement> ExtractArray(JsonElement root)
    {
        if (root.ValueKind == JsonValueKind.Array)
            return root.EnumerateArray();

        if (root.ValueKind == JsonValueKind.Object)
        {
            if (root.TryGetProperty("data", out var data) && data.ValueKind == JsonValueKind.Array)
                return data.EnumerateArray();

            if (root.TryGetProperty("results", out var results) && results.ValueKind == JsonValueKind.Array)
                return results.EnumerateArray();

            if (root.TryGetProperty("characters", out var characters) && characters.ValueKind == JsonValueKind.Array)
                return characters.EnumerateArray();
        }

        return Enumerable.Empty<JsonElement>();
    }

    private static Character MapCharacter(JsonElement element)
    {
        return new Character
        {
            Id = ReadInt(element, "id"),
            Name = ReadString(element, "name", "nombre"),
            Image = ReadString(element, "image", "img", "photo"),
            Bounty = ReadString(element, "bounty", "bountyString", "bounty_berry"),
            Crew = ReadString(element, "crew", "affiliation", "family"),
            Age = ReadString(element, "age"),
            Fruit = ReadString(element, "fruit", "devil_fruit", "devilFruit"),
            Description = ReadString(element, "description", "resume", "about")
        };
    }

    private static string ReadString(JsonElement element, params string[] names)
    {
        foreach (var name in names)
        {
            if (element.TryGetProperty(name, out var property) && property.ValueKind != JsonValueKind.Null && property.ValueKind != JsonValueKind.Undefined)
                return property.ToString();
        }

        return string.Empty;
    }

    private static int ReadInt(JsonElement element, params string[] names)
    {
        foreach (var name in names)
        {
            if (element.TryGetProperty(name, out var property))
            {
                if (property.ValueKind == JsonValueKind.Number && property.TryGetInt32(out var value))
                    return value;

                if (int.TryParse(property.ToString(), out var parsed))
                    return parsed;
            }
        }

        return 0;
    }

    private static Crew MapCrew(JsonElement element)
    {
        return new Crew
        {
            Id = ReadInt(element, "id"),
            Name = ReadString(element, "name", "crew"),
            Captain = ReadString(element, "captain", "leader"),
            Ship = ReadString(element, "ship", "boat", "vessel"),
            Bounty = ReadString(element, "bounty", "total_bounty"),
            Image = ReadString(element, "image", "img"),
            Description = ReadString(element, "description", "about", "resume")
        };
    }
}
