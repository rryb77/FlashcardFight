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
        FlashCardSet GetById(int id);
        FlashCardSet GetByIdWithQuestionsAndAnswers(int id);
        void UpdateFlashcard(FlashCardSet flashCardSet);
    }
}