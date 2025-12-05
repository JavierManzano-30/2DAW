using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

// Models/Character.cs
namespace OnePieceApp.Models;

public class Character
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Image { get; set; }
    public string Bounty { get; set; }
    public string Crew { get; set; }
    public string Age { get; set; }
    public string Fruit { get; set; }
    public string Description { get; set; }
}
