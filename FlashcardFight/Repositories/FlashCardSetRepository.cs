using FlashcardFight.Models;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FlashcardFight.Utils;
using Microsoft.Data.SqlClient;

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
                    INSERT INTO FlashCardSet (Title, Description, BossImageId, CreatorId, CategoryId, DifficultyId, CreateDateTime)
                    OUTPUT INSERTED.ID
                    VALUES (@Title, @Description, @BossImageId, @CreatorId, @CategoryId, @DifficultyId, @CreateDateTime)
                    ";

                    DbUtils.AddParameter(cmd, "@Title", flashCardSet.Title);
                    DbUtils.AddParameter(cmd, "@Description", flashCardSet.Description);
                    DbUtils.AddParameter(cmd, "@BossImageId", flashCardSet.BossImageId);
                    DbUtils.AddParameter(cmd, "@CreatorId", flashCardSet.CreatorId);
                    DbUtils.AddParameter(cmd, "@CategoryId", flashCardSet.CategoryId);
                    DbUtils.AddParameter(cmd, "@DifficultyId", flashCardSet.DifficultyId);
                    DbUtils.AddParameter(cmd, "@CreateDateTime", flashCardSet.CreateDateTime);

                    return flashCardSet.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public FlashCardSet GetById(int id)
        {
            using(var conn = Connection)
            {
                conn.Open();
                using(var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT f.Id AS SetId, f.Title, f.Description, f.CreateDateTime,
                        c.id As CategoryId, c.Name AS CategoryName,
                        d.id AS DifficultyId, d.Name AS DifficultyName,
                        b.id AS BossImageId, b.ImageLocation AS BossImageLocation,
                        u.id AS UserId, u.UserName
                    FROM FlashCardSet f
                    LEFT JOIN Category c ON c.id = f.CategoryId
                    LEFT JOIN Difficulty d ON d.id = f.DifficultyId
                    LEFT JOIN BossImage b ON b.id = f.BossImageId
                    LEFT JOIN UserProfile u ON u.Id = f.CreatorId
                    WHERE f.Id = @id
                    ";

                    DbUtils.AddParameter(cmd, "Id", id);

                    var reader = cmd.ExecuteReader();

                    FlashCardSet flashCardSet = null;

                    if(reader.Read())
                    {
                        flashCardSet = NewFlashCardSetFromReader(reader);
                    }
                    reader.Close();
                    return flashCardSet;
                }
            }
        }

        private FlashCardSet NewFlashCardSetFromReader(SqlDataReader reader)
        {
            return new FlashCardSet()
            {
                Id = DbUtils.GetInt(reader, "SetId"),
                Title = DbUtils.GetString(reader, "Title"),
                Description = DbUtils.GetString(reader, "Description"),
                BossImageId = DbUtils.GetInt(reader, "BossImageId"),
                BossImage = new BossImage()
                {
                    Id = DbUtils.GetInt(reader, "BossImageId"),
                    ImageLocation = DbUtils.GetString(reader, "BossImageLocation")
                },
                CreatorId = DbUtils.GetInt(reader, "UserId"),
                UserProfile = new UserProfile()
                {
                    Id = DbUtils.GetInt(reader, "UserId"),
                    UserName = DbUtils.GetString(reader, "UserName")
                },
                CategoryId = DbUtils.GetInt(reader, "CategoryId"),
                Category = new Category()
                {
                    Id = DbUtils.GetInt(reader, "CategoryId"),
                    Name = DbUtils.GetString(reader, "CategoryName")
                },
                DifficultyId = DbUtils.GetInt(reader, "DifficultyId"),
                Difficulty = new Difficulty()
                {
                    Id = DbUtils.GetInt(reader, "DifficultyId"),
                    Name = DbUtils.GetString(reader, "DifficultyName")
                },
                CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime")
            };
        }
    }
}
