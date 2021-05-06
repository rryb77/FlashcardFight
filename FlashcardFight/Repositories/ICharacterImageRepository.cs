using FlashcardFight.Models;
using System.Collections.Generic;

namespace FlashcardFight.Repositories
{
    public interface ICharacterImageRepository
    {
        List<CharacterImage> GetCharacterImages();
    }
}