using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlashcardFight.Models
{
    public class BossImage
    {
        public int Id { get; set; }

        public string ImageLocation { get; set; }
        public string Attack { get; set; }
        public string Death { get; set; }
        public string Hurt { get; set; }

    }
}
