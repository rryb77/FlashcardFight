using FlashcardFight.Models;

namespace FlashcardFight.Repositories
{
    public interface IFlashCardSetRepository
    {
        int Add(FlashCardSet flashCardSet);
    }
}