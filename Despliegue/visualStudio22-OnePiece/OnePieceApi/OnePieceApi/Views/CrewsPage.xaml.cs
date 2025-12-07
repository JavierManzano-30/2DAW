using OnePieceApi.Utilities;
using OnePieceApi.ViewModels;

namespace OnePieceApi.Views;

public partial class CrewsPage : ContentPage
{
    public CrewsPage()
    {
        InitializeComponent();
        BindingContext = ServiceHelper.GetService<CrewsViewModel>();
    }
}
