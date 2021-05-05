using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FlashcardFight.Models;
using FlashcardFight.Utils;

namespace FlashcardFight.Repositories
{
    public class UserTypeRepository : BaseRepository, IUserTypeRepository
    {
        public UserTypeRepository(IConfiguration configuration) : base(configuration) { }

        public void UpdateUserTypeById(int id, int userTypeId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    UPDATE UserProfile
                        SET UserTypeId = @UserTypeId
                    WHERE id = @id
                    ";

                    DbUtils.AddParameter(cmd, "@id", id);
                    DbUtils.AddParameter(cmd, "@UserTypeId", userTypeId);

                    cmd.ExecuteNonQuery();
                }
            }
        }

    }
}
