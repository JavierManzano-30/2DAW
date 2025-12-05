using OnePieceApi.Utilities;
using OnePieceApi.ViewModels;

namespace OnePieceApi.Views;

public partial class SearchPage : ContentPage
{
    public SearchPage()
    {
        InitializeComponent();
        BindingContext = ServiceHelper.GetService<SearchViewModel>();
    }
}
