using FlashcardFight.Models;
using System.Collections.Generic;

namespace FlashcardFight.Repositories
{
    public interface IAnswerRepository
    {
        void AddAnswers(List<Answer> answers);
        void UpdateAnswers(List<Answer> answers);
    }
}