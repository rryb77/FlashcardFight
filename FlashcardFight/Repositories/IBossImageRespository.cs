using FlashcardFight.Models;
using System.Collections.Generic;

namespace FlashcardFight.Repositories
{
    public interface IBossImageRespository
    {
        List<BossImage> GetAll();
    }
}