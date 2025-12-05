using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

// ViewModels/CharacterDetailViewModel.cs
using CommunityToolkit.Mvvm.ComponentModel;
using OnePieceApp.Models;
using OnePieceApp.Services;

namespace OnePieceApp.ViewModels;

[QueryProperty(nameof(Id), "id")]
public partial class CharacterDetailViewModel : ObservableObject
{
    private readonly OnePieceApiService _apiService;

    [ObservableProperty]
    int id;

    [ObservableProperty]
    Character character;

    [ObservableProperty]
    bool isLoading;

    public CharacterDetailViewModel(OnePieceApiService apiService)
    {
        _apiService = apiService;
    }

    partial void OnIdChanged(int value)
    {
        LoadCharacter();
    }

    async void LoadCharacter()
    {
        try
        {
            IsLoading = true;
            Character = await _apiService.GetCharacterById(Id) ?? new Character { Name = "Desconocido" };
        }
        catch
        {
            await Shell.Current.DisplayAlert("Error", "No se pudo cargar el personaje.", "OK");
        }
        finally
        {
            IsLoading = false;
        }
    }
}
