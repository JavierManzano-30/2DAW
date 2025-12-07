using CommunityToolkit.Maui;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using OnePieceApi.Services;
using OnePieceApi.ViewModels;
using Syncfusion.Maui.Toolkit.Hosting;

namespace OnePieceApi
{
    public static class MauiProgram
    {
        public static MauiApp CreateMauiApp()
        {
            var builder = MauiApp.CreateBuilder();
            builder
                .UseMauiApp<App>()
                .UseMauiCommunityToolkit()
                .ConfigureSyncfusionToolkit()
                .ConfigureMauiHandlers(handlers =>
                {
#if IOS || MACCATALYST
    				handlers.AddHandler<Microsoft.Maui.Controls.CollectionView, Microsoft.Maui.Controls.Handlers.Items2.CollectionViewHandler2>();
#endif
                })
                .ConfigureFonts(fonts =>
                {
                    fonts.AddFont("OpenSans-Regular.ttf", "OpenSansRegular");
                    fonts.AddFont("OpenSans-Semibold.ttf", "OpenSansSemibold");
                    fonts.AddFont("SegoeUI-Semibold.ttf", "SegoeSemibold");
                    fonts.AddFont("FluentSystemIcons-Regular.ttf", FluentUI.FontFamily);
                });

#if DEBUG
    		builder.Logging.AddDebug();
    		builder.Services.AddLogging(configure => configure.AddDebug());
#endif

            builder.Services.AddSingleton<ProjectRepository>();
            builder.Services.AddSingleton<TaskRepository>();
            builder.Services.AddSingleton<CategoryRepository>();
            builder.Services.AddSingleton<TagRepository>();
            builder.Services.AddSingleton<SeedDataService>();
            builder.Services.AddSingleton<ModalErrorHandler>();
            builder.Services.AddSingleton<MainPageModel>();
            builder.Services.AddSingleton<ProjectListPageModel>();
            builder.Services.AddSingleton<ManageMetaPageModel>();

            builder.Services.AddTransientWithShellRoute<ProjectDetailPage, ProjectDetailPageModel>("project");
            builder.Services.AddTransientWithShellRoute<TaskDetailPage, TaskDetailPageModel>("task");

            builder.Services.AddHttpClient<OnePieceApiService>(client =>
            {
                client.BaseAddress = new Uri("https://api2-onepiece2-bne8abdbcgbqfugj.spaincentral-01.azurewebsites.net/api/");
            });

            builder.Services.AddSingleton<MainViewModel>();
            builder.Services.AddTransient<CharactersViewModel>();
            builder.Services.AddTransient<CharacterDetailViewModel>();
            builder.Services.AddTransient<CrewsViewModel>();
            builder.Services.AddTransient<CrewDetailViewModel>();
            builder.Services.AddTransient<SearchViewModel>();

            builder.Services.AddTransient<Views.MainPage>();
            builder.Services.AddTransient<Views.CharactersPage>();
            builder.Services.AddTransient<Views.CharacterDetailPage>();
            builder.Services.AddTransient<Views.CrewsPage>();
            builder.Services.AddTransient<Views.CrewDetailPage>();
            builder.Services.AddTransient<Views.SearchPage>();

            return builder.Build();
        }
    }
}
