using FlashcardFight.Models;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FlashcardFight.Utils;

namespace FlashcardFight.Repositories
{
    public class CategoryRepository : BaseRepository, ICategoryRepository
    {
        public CategoryRepository(IConfiguration configuration) : base(configuration) { }

        public List<Category> GetAll()
        {
            using(var conn = Connection)
            {
                conn.Open();
                using(var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT Id, Name FROM Category
                    ";

                    var reader = cmd.ExecuteReader();

                    var categories = new List<Category>();

                    while(reader.Read())
                    {
                        categories.Add(new Category()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name")
                        });
                    }

                    reader.Close();
                    return categories;
                }
            }
        }
    }
}
