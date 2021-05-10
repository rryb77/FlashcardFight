using FlashcardFight.Models;
using FlashcardFight.Utils;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlashcardFight.Repositories
{
    public class CharacterImageRepository : BaseRepository, ICharacterImageRepository
    {
        public CharacterImageRepository(IConfiguration configuration) : base(configuration) { }

        public List<CharacterImage> GetCharacterImages()
        {
            using(var conn = Connection)
            {
                conn.Open();
                using(var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT Id, ImageLocation, Attack, Death, Hurt, Run, UseItem, Victory FROM CharacterImage
                    ";

                    var reader = cmd.ExecuteReader();

                    var characterImages = new List<CharacterImage>();

                    while(reader.Read())
                    {
                        characterImages.Add(new CharacterImage()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                            Attack = DbUtils.GetString(reader, "Attack"),
                            Death = DbUtils.GetString(reader, "Death"),
                            Hurt = DbUtils.GetString(reader, "Hurt"),
                            Run = DbUtils.GetString(reader, "Run"),
                            UseItem = DbUtils.GetString(reader, "UseItem"),
                            Victory = DbUtils.GetString(reader, "Victory"),
                        });
                    }

                    reader.Close();
                    return characterImages;
                }
            }
        }
    }
}
