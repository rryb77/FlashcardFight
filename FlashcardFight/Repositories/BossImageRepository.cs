using FlashcardFight.Models;
using FlashcardFight.Utils;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlashcardFight.Repositories
{
    public class BossImageRepository : BaseRepository, IBossImageRepository
    {
        public BossImageRepository(IConfiguration configuration) : base(configuration) { }

        public List<BossImage> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT Id, ImageLocation FROM BossImage
                    ";

                    var reader = cmd.ExecuteReader();

                    var bossImages = new List<BossImage>();

                    while (reader.Read())
                    {
                        bossImages.Add(new BossImage()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            ImageLocation = DbUtils.GetString(reader, "ImageLocation")
                        });
                    }

                    reader.Close();
                    return bossImages;
                }
            }
        }

        public BossImage GetRandom()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT TOP 1 Id, ImageLocation 
                    FROM BossImage
                    ORDER BY NEWID()
                    ";

                    var reader = cmd.ExecuteReader();

                    var bossImage = new BossImage();

                    while (reader.Read())
                    {
                        bossImage = new BossImage()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            ImageLocation = DbUtils.GetString(reader, "ImageLocation")
                        };
                    }

                    reader.Close();
                    return bossImage;
                }
            }
        }
    }
}
