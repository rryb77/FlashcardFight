using FlashcardFight.Models;
using System.Collections.Generic;

namespace FlashcardFight.Repositories
{
    public interface IUserProfileRepository
    {
        void Add(UserProfile userProfile);
        void DeactivateUserById(int id);
        UserProfile GetByFirebaseUserId(string firebaseUserId);
        List<UserProfile> GetLeaderBoard();
        UserProfile GetUserProfileById(int id);
        List<UserProfile> GetUserProfiles();
        void ReactivateUserById(int id);
        void UpdateUserCharacterStats(UserProfile userProfile);
    }
}