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

        public Category GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                          SELECT Id, Name FROM Category
                           WHERE Id = @id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    Category category = null;
                    if (reader.Read())
                    {
                        category = new Category()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name"),
                        };                          
                    }

                    reader.Close();
                    return category;
                }
            }
        }

        public void AddCategory(Category category)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    INSERT INTO Category ([Name])
                    OUTPUT INSERTED.ID
                    VALUES (@Name)
                    ";

                    DbUtils.AddParameter(cmd, "@Name", category.Name);

                    category.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void UpdateCategory(Category category)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    UPDATE Category
                        Set Name = @Name
                    WHERE id = @id
                    ";

                    DbUtils.AddParameter(cmd, "@id", category.Id);
                    DbUtils.AddParameter(cmd, "@Name", category.Name);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void DeleteCategory(int id)
        {
            var categories = GetAll();

            using(var conn = Connection)
            {
                conn.Open();
                using(var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    UPDATE FlashCardSet
                        SET CategoryId = @CategoryId
                    WHERE CategoryId = @id
                    ";

                    DbUtils.AddParameter(cmd, "@id", id);

                    if(id != categories[0].Id)
                    {
                        DbUtils.AddParameter(cmd, "@CategoryId", categories[0].Id);
                    }
                    else
                    {
                        DbUtils.AddParameter(cmd, "@CategoryId", categories[1].Id);
                    }

                    cmd.ExecuteNonQuery();
                }
                using(var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    DELETE From Category
                    WHERE Id = @id
                    ";

                    DbUtils.AddParameter(cmd, "@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }


    }
}
