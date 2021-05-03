using FlashcardFight.Models;

namespace FlashcardFight.Repositories
{
    public interface IQuestionRepository
    {
        void AddQuestion(Question question);
        void DeleteQuestion(int id);
        void UpdateQuestion(Question question);
    }
}