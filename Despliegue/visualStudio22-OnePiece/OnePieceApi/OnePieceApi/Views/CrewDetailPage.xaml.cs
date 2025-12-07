using OnePieceApi.Utilities;
using OnePieceApi.ViewModels;

namespace OnePieceApi.Views;

public partial class CrewDetailPage : ContentPage
{
    public CrewDetailPage()
    {
        InitializeComponent();
        BindingContext = ServiceHelper.GetService<CrewDetailViewModel>();
    }

    private async void OnBackClicked(object? sender, EventArgs e)
    {
        await Shell.Current.GoToAsync("..");
    }
}
