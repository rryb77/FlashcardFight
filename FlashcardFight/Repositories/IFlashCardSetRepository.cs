using FlashcardFight.Models;

namespace FlashcardFight.Repositories
{
    public interface IFlashCardSetRepository
    {
        int Add(FlashCardSet flashCardSet);
        FlashCardSet GetById(int id);
    }
}