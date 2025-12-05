using CommunityToolkit.Mvvm.ComponentModel;
using OnePieceApi.Models;
using OnePieceApi.Services;

namespace OnePieceApi.ViewModels;

[QueryProperty(nameof(Id), "id")]
public partial class CharacterDetailViewModel : ObservableObject
{
    private readonly OnePieceApiService _apiService;

    [ObservableProperty]
    int id;

    [ObservableProperty]
    Character character = new();

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
