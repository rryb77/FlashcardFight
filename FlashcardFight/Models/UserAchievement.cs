using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace FlashcardFight.Models
{
    public class UserAchievement
    {
        public int Id { get; set; }

        [Required]
        public int UserId { get; set; }
        public UserProfile UserProfile { get; set; }

        [Required]
        public int AchievementId { get; set; }

        public Achievement Achievement { get; set; }
    }
}
