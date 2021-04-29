using FlashcardFight.Models;
using System.Collections.Generic;

namespace FlashcardFight.Repositories
{
    public interface IDifficultyRepository
    {
        List<Difficulty> GetAll();
        Difficulty GetById(int id);
    }
}