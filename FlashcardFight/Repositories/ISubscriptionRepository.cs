using FlashcardFight.Models;

namespace FlashcardFight.Repositories
{
    public interface ISubscriptionRepository
    {
        void AddSubscription(Subscription subscription);
    }
}