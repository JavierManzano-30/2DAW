using OnePieceApi.Utilities;
using OnePieceApi.ViewModels;
using OnePieceApi.Models;

namespace OnePieceApi.Views;

public partial class CrewsPage : ContentPage
{
    public CrewsPage()
    {
        InitializeComponent();
        BindingContext = ServiceHelper.GetService<CrewsViewModel>();
    }

    // Taps are handled via TapGestureRecognizer on each card.
}
