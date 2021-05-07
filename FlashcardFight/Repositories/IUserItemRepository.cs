using FlashcardFight.Models;

namespace FlashcardFight.Repositories
{
    public interface IUserItemRepository
    {
        void AddUserItem(UserItems userItems);
        void DeleteUserItem(int id);
    }
}