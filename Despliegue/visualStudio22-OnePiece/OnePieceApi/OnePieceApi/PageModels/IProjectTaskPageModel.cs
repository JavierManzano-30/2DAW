using CommunityToolkit.Mvvm.Input;
using OnePieceApi.Models;

namespace OnePieceApi.PageModels
{
    public interface IProjectTaskPageModel
    {
        IAsyncRelayCommand<ProjectTask> NavigateToTaskCommand { get; }
        bool IsBusy { get; }
    }
}