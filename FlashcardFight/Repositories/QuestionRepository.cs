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
    }
}
