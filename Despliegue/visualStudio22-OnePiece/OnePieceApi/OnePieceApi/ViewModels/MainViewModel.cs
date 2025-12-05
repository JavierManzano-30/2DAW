using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;

namespace OnePieceApi.ViewModels;

public partial class MainViewModel : ObservableObject
{
    [RelayCommand]
    async Task GoToCharacters() => await Shell.Current.GoToAsync("//characters");

    [RelayCommand]
    async Task GoToCrews() => await Shell.Current.DisplayAlert("Tripulaciones", "Funcionalidad próximamente.", "OK");

    [RelayCommand]
    async Task GoToSearch() => await Shell.Current.GoToAsync("//search");
}
