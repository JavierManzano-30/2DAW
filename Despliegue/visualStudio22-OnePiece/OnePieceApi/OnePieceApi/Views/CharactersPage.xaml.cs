using OnePieceApi.Utilities;
using OnePieceApi.ViewModels;

namespace OnePieceApi.Views;

public partial class CharactersPage : ContentPage
{
    public CharactersPage()
    {
        InitializeComponent();
        BindingContext = ServiceHelper.GetService<CharactersViewModel>();
    }
}
