using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace FlashcardFight.Models
{
    public class Subscription
    {
        public int Id { get; set; }

        [Required]
        public int FlashCardSetId { get; set; }
        public FlashCardSet FlashCardSet { get; set; }

        [Required]
        public int UserId { get; set; }
        public UserProfile UserProfile { get; set; }
    }
}
