using OnePieceApi.Models;
using OnePieceApi.PageModels;

namespace OnePieceApi.Pages
{
    public partial class MainPage : ContentPage
    {
        public MainPage(MainPageModel model)
        {
            InitializeComponent();
            BindingContext = model;
        }
    }
}