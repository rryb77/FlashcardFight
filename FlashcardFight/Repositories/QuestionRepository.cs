using FlashcardFight.Models;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FlashcardFight.Utils;

namespace FlashcardFight.Repositories
{
    public class QuestionRepository : BaseRepository, IQuestionRepository
    {
        public QuestionRepository(IConfiguration configuration) : base(configuration) { }

        public void AddQuestion(Question question)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using(var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    INSERT INTO Question (FlashCardSetId, QuestionText)
                    OUTPUT INSERTED.ID
                    VALUES (@FlashCardSetId, @QuestionText)
                    ";

                    DbUtils.AddParameter(cmd, "@FlashCardSetId", question.FlashCardSetId);
                    DbUtils.AddParameter(cmd, "@QuestionText", question.QuestionText);

                    question.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void UpdateQuestion(Question question)
        {
            using(var conn = Connection)
            {
                conn.Open();
                using(var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    UPDATE Question
                        Set QuestionText = @QuestionText
                    WHERE id = @id
                    ";

                    DbUtils.AddParameter(cmd, "@id", question.Id);
                    DbUtils.AddParameter(cmd, "@QuestionText", question.QuestionText);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void DeleteQuestion(int id)
        {
            using(var conn = Connection)
            {
                conn.Open();
                {
                    using(var cmd = conn.CreateCommand())
                    {
                        cmd.CommandText = @"
                        DELETE FROM Answer
                        WHERE QuestionId = @id
                        ";

                        DbUtils.AddParameter(cmd, "@id", id);

                        cmd.ExecuteNonQuery();
                    }
                    using(var cmd = conn.CreateCommand())
                    {
                        cmd.CommandText = @"
                        DELETE FROM Question
                        WHERE Id = @id
                        ";

                        DbUtils.AddParameter(cmd, "@id", id);

                        cmd.ExecuteNonQuery();
                    }
                }
            }
        }
    }
}
