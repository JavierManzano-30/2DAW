using OnePieceApi.Views;

namespace OnePieceApi;

public partial class AppShell : Shell
{
    public AppShell()
    {
        InitializeComponent();
        Routing.RegisterRoute("detail", typeof(CharacterDetailPage));
        Routing.RegisterRoute("crewdetail", typeof(CrewDetailPage));
    }

    public static async Task DisplayToastAsync(string message)
    {
        // Fallback toast helper for the older page models
        var page = Application.Current?.Windows.FirstOrDefault()?.Page 
#pragma warning disable CS0618 // MainPage obsoleto: solo lo usamos como último recurso
                   ?? Application.Current?.MainPage;
#pragma warning restore CS0618
        if (page == null) return;

        await page.DisplayAlert("Info", message, "OK");
    }
}
