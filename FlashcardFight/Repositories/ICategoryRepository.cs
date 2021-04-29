using FlashcardFight.Models;
using System.Collections.Generic;

namespace FlashcardFight.Repositories
{
    public interface ICategoryRepository
    {
        List<Category> GetAll();
    }
}