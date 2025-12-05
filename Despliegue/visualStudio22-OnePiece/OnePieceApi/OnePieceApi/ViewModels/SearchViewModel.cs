using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using OnePieceApi.Models;
using OnePieceApi.Services;
using System.Collections.ObjectModel;

namespace OnePieceApi.ViewModels;

public partial class SearchViewModel : ObservableObject
{
    private readonly OnePieceApiService _apiService;

    [ObservableProperty]
    string searchTerm = string.Empty;

    [ObservableProperty]
    ObservableCollection<Character> results = new();

    [ObservableProperty]
    bool isLoading;

    [ObservableProperty]
    string statusMessage = string.Empty;

    public SearchViewModel(OnePieceApiService apiService)
    {
        _apiService = apiService;
    }

    [RelayCommand]
    async Task Search()
    {
        if (string.IsNullOrWhiteSpace(SearchTerm))
        {
            StatusMessage = "Introduce un nombre para buscar.";
            return;
        }

        try
        {
            IsLoading = true;
            StatusMessage = "Buscando…";
            var list = await _apiService.SearchCharacters(SearchTerm);
            Results = new ObservableCollection<Character>(list);
            if (Results.Count == 0)
                StatusMessage = "No se encontraron resultados";
            else
                StatusMessage = string.Empty;
        }
        catch
        {
            StatusMessage = "Error en la búsqueda.";
            await Shell.Current.DisplayAlert("Error", "No se pudo realizar la búsqueda.", "OK");
        }
        finally
        {
            IsLoading = false;
        }
    }

    [RelayCommand]
    async Task GoToDetail(Character character)
    {
        if (character == null) return;
        await Shell.Current.GoToAsync("detail", new Dictionary<string, object> { { "id", character.Id } });
    }
}
