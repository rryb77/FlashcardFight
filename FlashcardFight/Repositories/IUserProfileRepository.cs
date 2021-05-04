using FlashcardFight.Models;

namespace FlashcardFight.Repositories
{
    public interface IUserProfileRepository
    {
        void Add(UserProfile userProfile);
        UserProfile GetByFirebaseUserId(string firebaseUserId);
        void UpdateUserCharacterStats(UserProfile userProfile);
    }
}