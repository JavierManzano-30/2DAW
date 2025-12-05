using OnePieceApi.Utilities;
using OnePieceApi.ViewModels;

namespace OnePieceApi.Views;

public partial class CharacterDetailPage : ContentPage
{
    public CharacterDetailPage()
    {
        InitializeComponent();
        BindingContext = ServiceHelper.GetService<CharacterDetailViewModel>();
    }

    private async void OnBackClicked(object? sender, EventArgs e)
    {
        await Shell.Current.GoToAsync("..");
    }
}
