using FlashcardFight.Models;

namespace FlashcardFight.Repositories
{
    public interface IQuestionRepository
    {
        int AddQuestion(Question question);
    }
}