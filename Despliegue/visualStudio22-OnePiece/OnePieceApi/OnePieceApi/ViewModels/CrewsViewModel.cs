using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using OnePieceApi.Models;
using OnePieceApi.Services;
using System.Collections.ObjectModel;

namespace OnePieceApi.ViewModels;

public partial class CrewsViewModel : ObservableObject
{
    private readonly OnePieceApiService _apiService;

    [ObservableProperty]
    ObservableCollection<Crew> crews = new();

    [ObservableProperty]
    bool isLoading;

    [ObservableProperty]
    string statusMessage = string.Empty;

    [ObservableProperty]
    Crew? selectedCrew;

    public CrewsViewModel(OnePieceApiService apiService)
    {
        _apiService = apiService;
        LoadCrewsCommand.Execute(null);
    }

    [RelayCommand]
    async Task LoadCrews()
    {
        try
        {
            IsLoading = true;
            StatusMessage = "Cargando tripulaciones…";
            var list = await _apiService.GetCrews();
            Crews = new ObservableCollection<Crew>(list);
            StatusMessage = Crews.Count == 0 ? "No se encontraron tripulaciones." : string.Empty;
        }
        catch (Exception)
        {
            StatusMessage = "Error al cargar tripulaciones.";
            await Shell.Current.DisplayAlert("Error", "No se pudieron cargar las tripulaciones.", "OK");
        }
        finally
        {
            IsLoading = false;
        }
    }

    [RelayCommand]
    async Task GoToDetail(Crew crew)
    {
        if (crew == null) return;
        await Shell.Current.GoToAsync("crewdetail", new Dictionary<string, object> { { "id", crew.Id } });
    }
}
