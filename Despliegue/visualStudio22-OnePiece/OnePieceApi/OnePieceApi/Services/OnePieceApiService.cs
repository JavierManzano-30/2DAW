using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

// Services/OnePieceApiService.cs
using System.Net.Http.Json;
using OnePieceApp.Models;

namespace OnePieceApp.Services;

public class OnePieceApiService
{
    private readonly HttpClient _httpClient;
    private const string BaseUrl = "https://mi-api-onepiece.azurewebsites.net/api/";

    public OnePieceApiService(HttpClient httpClient)
    {
        _httpClient = httpClient;
        _httpClient.BaseAddress = new Uri(BaseUrl);
    }

    public async Task<List<Character>> GetAllCharacters()
    {
        return await _httpClient.GetFromJsonAsync<List<Character>>("characters") ?? new();
    }

    public async Task<Character?> GetCharacterById(int id)
    {
        return await _httpClient.GetFromJsonAsync<Character>($"characters/{id}");
    }

    public async Task<List<Character>> SearchCharacters(string term)
    {
        return await _httpClient.GetFromJsonAsync<List<Character>>($"characters/search/{term}") ?? new();
    }
}
