using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace FlashcardFight.Models
{
    public class Answer
    {
        public int Id { get; set; }

        [Required]
        public int FlashCardSetId { get; set; }

        [Required]
        public int QuestionId { get; set; }

        public Question Question { get; set; }

        [Required]
        public string AnswerText { get; set; }

        [Required]
        public bool Correct { get; set; }
    }
}
