using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace FlashcardFight.Models
{
    public class UserItems
    {
        public int Id { get; set; }
        [Required]
        public int UserId { get; set; }

        [Required]
        public int ItemId { get; set; }
    }
}
