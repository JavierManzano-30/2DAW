using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

// ViewModels/MainViewModel.cs
using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;

namespace OnePieceApp.ViewModels;

public partial class MainViewModel : ObservableObject
{
    [RelayCommand]
    async Task GoToCharacters() => await Shell.Current.GoToAsync("characters");

    [RelayCommand]
    async Task GoToCrews() => await Shell.Current.DisplayAlert("Tripulaciones", "Funcionalidad próximamente.", "OK");

    [RelayCommand]
    async Task GoToSearch() => await Shell.Current.GoToAsync("search");
}
