using FlashcardFight.Models;
using System.Collections.Generic;

namespace FlashcardFight.Repositories
{
    public interface IItemRepository
    {
        List<Item> GetAll();
    }
}