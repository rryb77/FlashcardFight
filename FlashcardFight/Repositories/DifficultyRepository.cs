using FlashcardFight.Models;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FlashcardFight.Utils;

namespace FlashcardFight.Repositories
{
    public class DifficultyRepository : BaseRepository, IDifficultyRepository
    {
        public DifficultyRepository(IConfiguration configuration) : base(configuration) { }

        public List<Difficulty> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT Id, Name FROM Difficulty
                    ";

                    var reader = cmd.ExecuteReader();

                    var difficulties = new List<Difficulty>();

                    while (reader.Read())
                    {
                        difficulties.Add(new Difficulty()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name")
                        });
                    }

                    reader.Close();
                    return difficulties;
                }
            }
        }

        public Difficulty GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                          SELECT Id, Name FROM Difficulty
                           WHERE Id = @id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    Difficulty difficulty = null;
                    if (reader.Read())
                    {
                        difficulty = new Difficulty()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name"),
                        };
                    }

                    reader.Close();
                    return difficulty;
                }
            }
        }
    }
}
