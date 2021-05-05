using FlashcardFight.Models;
using FlashcardFight.Utils;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlashcardFight.Repositories
{
    public class SubscriptionRepository : BaseRepository, ISubscriptionRepository
    {
        public SubscriptionRepository(IConfiguration configuration) : base(configuration) { }


        public void AddSubscription(Subscription subscription)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    INSERT INTO Subscription ([FlashCardSetId], [UserId])
                    OUTPUT INSERTED.ID
                    VALUES (@FlashCardSetId, @UserId)
                    ";

                    DbUtils.AddParameter(cmd, "@FlashCardSetId", subscription.FlashCardSetId);
                    DbUtils.AddParameter(cmd, "@UserId", subscription.UserId);

                    subscription.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
    }
}
