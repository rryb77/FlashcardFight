using FlashcardFight.Models;
using FlashcardFight.Utils;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlashcardFight.Repositories
{
    public class AnswerRepository : BaseRepository, IAnswerRepository
    {
        public AnswerRepository(IConfiguration configuration) : base(configuration) { }

        public void AddAnswers(List<Answer> answers)
        {
            using(var conn = Connection)
            {
                conn.Open();
                using(var cmd = conn.CreateCommand())
                {

                    int i = 0;

                    foreach(Answer answer in answers)
                    {
                        cmd.CommandText = @$"
                        INSERT INTO Answer (QuestionId, AnswerText, Correct)
                        VALUES (@QuestionId{i}, @AnswerText{i}, @Correct{i})
                        ";

                        DbUtils.AddParameter(cmd, $"@QuestionId{i}", answer.QuestionId);
                        DbUtils.AddParameter(cmd, $"@AnswerText{i}", answer.AnswerText);
                        DbUtils.AddParameter(cmd, $"@Correct{i}", answer.Correct);

                        cmd.ExecuteScalar();
                        i++;
                    }                 
                }
            }
        }
    }
}
