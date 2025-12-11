using CommunityToolkit.Mvvm.ComponentModel;
using OnePieceApi.Models;
using OnePieceApi.Services;
using System.Collections.ObjectModel;

namespace OnePieceApi.ViewModels;

[QueryProperty(nameof(Id), "id")]
public partial class CrewDetailViewModel : ObservableObject
{
    private readonly OnePieceApiService _apiService;

    [ObservableProperty]
    int id;

    [ObservableProperty]
    Crew crew = new();

    [ObservableProperty]
    bool isLoading;

    [ObservableProperty]
    ObservableCollection<Character> characters = new();

    public CrewDetailViewModel(OnePieceApiService apiService)
    {
        _apiService = apiService;
    }

    partial void OnIdChanged(int value)
    {
        LoadCrew();
    }

    async void LoadCrew()
    {
        try
        {
            IsLoading = true;
            var data = await _apiService.GetCrewById(Id);
            Crew = data ?? new Crew { Name = "Desconocida" };

            var list = await _apiService.GetCharactersByCrew(Crew.Name);
            Characters = new ObservableCollection<Character>(list);
        }
        catch
        {
            await Shell.Current.DisplayAlert("Error", "No se pudo cargar la tripulación.", "OK");
        }
        finally
        {
            IsLoading = false;
        }
    }
}
