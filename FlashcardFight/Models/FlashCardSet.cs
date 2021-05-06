using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace FlashcardFight.Models
{
    public class FlashCardSet
    {
        public int Id { get; set; }

        [Required]
        public int BossImageId { get; set; }

        public BossImage BossImage { get; set; }

        [Required]
        public int CreatorId { get; set; }
        public UserProfile UserProfile { get; set; }

        [Required]
        public DateTime CreateDateTime { get; set; }

        [Required]
        public int CategoryId { get; set; }

        public Category Category { get; set; }

        [Required]
        public int DifficultyId { get; set; }

        public Difficulty Difficulty { get; set; }

        public string Title { get; set; }
        public string Description { get; set; }

        public int SubId { get; set; }

        public List<Question> Questions { get; set; }
    }
}
