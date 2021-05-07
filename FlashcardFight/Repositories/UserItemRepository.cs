using Microsoft.Extensions.Configuration;
using FlashcardFight.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FlashcardFight.Utils;

namespace FlashcardFight.Repositories
{
    public class UserItemRepository : BaseRepository, IUserItemRepository
    {
        public UserItemRepository(IConfiguration configuration) : base(configuration) { }

        public void AddUserItem(UserItems userItems)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    INSERT INTO UserItems ([UserId], [ItemId])
                    OUTPUT INSERTED.ID
                    VALUES (@UserId, @ItemId)
                    ";

                    DbUtils.AddParameter(cmd, "@UserId", userItems.UserId);
                    DbUtils.AddParameter(cmd, "@ItemId", userItems.ItemId);


                    userItems.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
    }
}
