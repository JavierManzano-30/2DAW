namespace OnePieceApi.Models;

public class Crew
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Captain { get; set; } = string.Empty;
    public string Ship { get; set; } = string.Empty;
    public string Bounty { get; set; } = string.Empty;
    public string Image { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
}
