using System.Text.Json;
using OnePieceApi.Models;

namespace OnePieceApi.Services;

public class OnePieceApiService
{
    private readonly HttpClient _httpClient;
    private const string BaseUrl = "https://api-onepiece-final-gdh7anbmfsakb6ew.spaincentral-01.azurewebsites.net/api/";
    private const string PlaceholderImage = "https://placehold.co/400x400?text=One+Piece";
    private static readonly Dictionary<string, string> CharacterImages = new(StringComparer.OrdinalIgnoreCase)
    {
        { "Monkey D Luffy", "luffy.jpeg" },
        { "Luffy", "luffy.jpeg" },
        { "Roronoa Zoro", "zoro.jpeg" },
        { "Zoro", "zoro.jpeg" },
        { "Sanji", "sanji.jpeg" },
        { "Nami", "nami.jpeg" },
        { "Usopp", "usopp.jpeg" },
        { "Usop", "usopp.jpeg" },
        { "Chopper", "chopper.jpeg" },
        { "Tony Tony Chopper", "chopper.jpeg" },
        { "Tony-Tony Chopper", "chopper.jpeg" },
        { "Brook", "brook.jpeg" },
        { "Franky", "franky.jpeg" },
        { "Nico Robin", "robin.jpeg" },
        { "Robin", "robin.jpeg" }
    };

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

    public async Task<List<Character>> GetCharactersByCrew(string crewName)
    {
        if (string.IsNullOrWhiteSpace(crewName))
            return new List<Character>();

        var all = await GetAllCharacters();
        var normalizedCrew = crewName.Replace("Tripulación:", string.Empty, StringComparison.OrdinalIgnoreCase).Trim();

        return all
            .Where(c =>
            {
                var raw = c.Crew?.Trim() ?? string.Empty;
                return string.Equals(raw, crewName.Trim(), StringComparison.OrdinalIgnoreCase) ||
                       string.Equals(raw, normalizedCrew, StringComparison.OrdinalIgnoreCase);
            })
            .ToList();
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

        var tokens = term
            .Split(new[] { ',', ';' }, StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries)
            .ToList();

        // Permite buscar múltiples personajes o por tripulación
        return characters.Where(c =>
        {
            if (tokens.Count > 1)
            {
                return tokens.Any(t =>
                    c.Name.Contains(t, StringComparison.OrdinalIgnoreCase) ||
                    (!string.IsNullOrWhiteSpace(c.Crew) && c.Crew.Contains(t, StringComparison.OrdinalIgnoreCase)));
            }

            var single = tokens.FirstOrDefault() ?? term;
            return c.Name.Contains(single, StringComparison.OrdinalIgnoreCase) ||
                   (!string.IsNullOrWhiteSpace(c.Crew) && c.Crew.Contains(single, StringComparison.OrdinalIgnoreCase));
        }).ToList();
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
            Image = EnsureCharacterImage(ReadString(element, "image", "img", "photo"), ReadString(element, "name", "nombre")),
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
            {
                if (property.ValueKind == JsonValueKind.Object)
                {
                    // Si viene un objeto, intenta devolver el campo "name" interno
                    if (property.TryGetProperty("name", out var innerName) && innerName.ValueKind != JsonValueKind.Null)
                        return innerName.ToString();
                    continue;
                }

                return property.ToString();
            }
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
            Name = NormalizeCrewName(ReadString(element, "name", "crew")),
            Captain = ReadString(element, "captain", "leader"),
            Ship = ReadString(element, "ship", "boat", "vessel"),
            Bounty = string.Empty,
            Image = EnsureImage(ReadString(element, "image", "img")),
            Description = ReadString(element, "description", "about", "resume")
        };
    }

    private static string NormalizeCrewName(string name)
    {
        if (string.IsNullOrWhiteSpace(name))
            return string.Empty;

        var trimmed = name.Trim();
        // Quita sufijo "crew" y añade prefijo en español
        if (trimmed.EndsWith("crew", StringComparison.OrdinalIgnoreCase))
        {
            trimmed = trimmed[..^4].Trim();
        }

        return $"Tripulación: {trimmed}";
    }

    private static string EnsureImage(string url) =>
        string.IsNullOrWhiteSpace(url) ? PlaceholderImage : url;

    private static string EnsureCharacterImage(string url, string name)
    {
        if (!string.IsNullOrWhiteSpace(url) && !url.StartsWith("http", StringComparison.OrdinalIgnoreCase))
            return url;

        if (!string.IsNullOrWhiteSpace(url))
            return url;

        if (!string.IsNullOrWhiteSpace(name) && CharacterImages.TryGetValue(name.Trim(), out var local))
            return local;

        return PlaceholderImage;
    }
}
