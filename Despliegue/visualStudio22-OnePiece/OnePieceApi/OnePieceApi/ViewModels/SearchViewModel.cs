using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

// ViewModels/SearchViewModel.cs
using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using OnePieceApp.Models;
using OnePieceApp.Services;
using System.Collections.ObjectModel;

namespace OnePieceApp.ViewModels;

public partial class SearchViewModel : ObservableObject
{
    private readonly OnePieceApiService _apiService;

    [ObservableProperty]
    string searchTerm;

    [ObservableProperty]
    ObservableCollection<Character> results = new();

    [ObservableProperty]
    bool isLoading;

    [ObservableProperty]
    string statusMessage;

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
        await Shell.Current.GoToAsync($"detail?id={character.Id}");
    }
}
