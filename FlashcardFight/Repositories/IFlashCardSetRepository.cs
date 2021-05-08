using FlashcardFight.Models;
using System.Collections.Generic;

namespace FlashcardFight.Repositories
{
    public interface IFlashCardSetRepository
    {
        int Add(FlashCardSet flashCardSet);
        void DeleteFlashcardSet(int id);
        List<FlashCardSet> GetAll();
        List<FlashCardSet> GetAllBySubscription(int id);
        List<FlashCardSet> GetAllByUserId(int id);
        List<FlashCardSet> GetAllWithoutSubscriptions(int id);
        List<FlashCardSet> GetAllWithoutSubscriptionsSorted(int id, int categoryId);
        List<FlashCardSet> GetAllWithoutSubsFilteredByCategoryAndDifficulty(int id, int difficultyId, int categoryId);
        List<FlashCardSet> GetAllWithoutSubsFilteredByDifficulty(int id, int difficultyId);
        FlashCardSet GetById(int id);
        FlashCardSet GetByIdWithQuestionsAndAnswers(int id);
        void UpdateFlashcard(FlashCardSet flashCardSet);
    }
}