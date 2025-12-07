using CommunityToolkit.Mvvm.ComponentModel;
using OnePieceApi.Models;
using OnePieceApi.Services;

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
