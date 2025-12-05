using Microsoft.Extensions.DependencyInjection;

namespace OnePieceApi.Utilities;

public static class ServiceHelper
{
    public static T GetService<T>() where T : notnull =>
        Current.GetRequiredService<T>();

    private static IServiceProvider Current =>
        Application.Current?.Handler?.MauiContext?.Services
        ?? throw new InvalidOperationException("No se pudo resolver el contenedor de dependencias de MAUI.");
}
