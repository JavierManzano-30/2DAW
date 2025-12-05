using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

// ViewModels/CharactersViewModel.cs
using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using OnePieceApp.Models;
using OnePieceApp.Services;
using System.Collections.ObjectModel;

namespace OnePieceApp.ViewModels;

public partial class CharactersViewModel : ObservableObject
{
    private readonly OnePieceApiService _apiService;

    [ObservableProperty]
    ObservableCollection<Character> characters = new();

    [ObservableProperty]
    bool isLoading;

    [ObservableProperty]
    string statusMessage;

    public CharactersViewModel(OnePieceApiService apiService)
    {
        _apiService = apiService;
        LoadCharactersCommand.Execute(null);
    }

    [RelayCommand]
    async Task LoadCharacters()
    {
        try
        {
            IsLoading = true;
            StatusMessage = "Cargando tripulación…";
            var list = await _apiService.GetAllCharacters();
            Characters = new ObservableCollection<Character>(list);
            if (Characters.Count == 0)
                StatusMessage = "No se encontraron personajes.";
            else
                StatusMessage = string.Empty;
        }
        catch (Exception)
        {
            StatusMessage = "Error al cargar personajes.";
            await Shell.Current.DisplayAlert("Error", "No se pudieron cargar los personajes.", "OK");
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
