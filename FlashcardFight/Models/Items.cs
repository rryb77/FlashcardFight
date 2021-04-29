using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace FlashcardFight.Models
{
    public class Items
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public int UserId { get; set; }

        public UserProfile UserProfile { get; set; }

        [Required]
        public int HpBoost { get; set; }
        [Required]
        public string ImageLocationId { get; set; }

        public ItemImage ItemImage { get; set; }
    }
}
