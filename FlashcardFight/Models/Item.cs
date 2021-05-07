using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace FlashcardFight.Models
{
    public class Item
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        public UserProfile UserProfile { get; set; }

        [Required]
        public int HpBoost { get; set; }
        [Required]
        public string ImageLocation { get; set; }

        public int UserItemId { get; set; }
    }
}
