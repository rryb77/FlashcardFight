using FlashcardFight.Models;
using System.Collections.Generic;

namespace FlashcardFight.Repositories
{
    public interface IFlashCardSetRepository
    {
        int Add(FlashCardSet flashCardSet);
        List<FlashCardSet> GetAll();
        FlashCardSet GetById(int id);
        FlashCardSet GetByIdWithQuestionsAndAnswers(int id);
    }
}