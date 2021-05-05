using FlashcardFight.Models;
using System.Collections.Generic;

namespace FlashcardFight.Repositories
{
    public interface IBossImageRepository
    {
        List<BossImage> GetAll();
        BossImage GetRandom();
    }
}