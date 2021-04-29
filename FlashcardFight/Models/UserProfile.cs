using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace FlashcardFight.Models
{
    public class UserProfile
    {
        public int Id { get; set; }

        [StringLength(28, MinimumLength = 28)]
        public string FirebaseUserId { get; set; }

        [Required]
        [MaxLength(50)]
        public string UserName { get; set; }

        [Required]
        [DataType(DataType.EmailAddress)]
        [MaxLength(255)]
        public string Email { get; set; }

        public DateTime JoinDate { get; set; }

        [Required]
        public int UserTypeId { get; set; }

        public UserType UserType { get; set; }
        
        [Required]
        public int Level { get; set; }

        [Required]
        public int Experience { get; set; }
        
        [Required]
        public int HP { get; set; }

        [Required]
        public int CharacterImageId { get; set; }
        public CharacterImage CharacterImage { get; set; }

        public int Attempts { get; set; }

        public int Wins { get; set; }

    }
}
