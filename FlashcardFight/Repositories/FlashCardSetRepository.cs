using FlashcardFight.Models;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FlashcardFight.Utils;

namespace FlashcardFight.Repositories
{
    public class FlashCardSetRepository : BaseRepository, IFlashCardSetRepository
    {
        public FlashCardSetRepository(IConfiguration configuration) : base(configuration) { }

        public int Add(FlashCardSet flashCardSet)
        {
            using(var conn = Connection)
            {
                conn.Open();
                using(var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    INSERT INTO FlashCardSet (Title, BossImageId, CreatorId, CategoryId, DifficultyId, CreateDateTime)
                    OUTPUT INSERTED.ID
                    VALUES (@Title, @BossImageId, @CreatorId, @CategoryId, @DifficultyId, @CreateDateTime)
                    ";

                    DbUtils.AddParameter(cmd, "@Title", flashCardSet.Title);
                    DbUtils.AddParameter(cmd, "@BossImageId", flashCardSet.BossImageId);
                    DbUtils.AddParameter(cmd, "@CreatorId", flashCardSet.CreatorId);
                    DbUtils.AddParameter(cmd, "@CategoryId", flashCardSet.CategoryId);
                    DbUtils.AddParameter(cmd, "@DifficultyId", flashCardSet.DifficultyId);
                    DbUtils.AddParameter(cmd, "@CreateDateTime", flashCardSet.CreateDateTime);

                    return flashCardSet.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        /*public FlashCardSet GetById(int id)
        {
            using(var conn = Connection)
            {
                conn.Open();
                using(var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT 
                    ";
                }
            }
        }*/
    }
}
