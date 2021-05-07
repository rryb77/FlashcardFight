using FlashcardFight.Models;
using FlashcardFight.Utils;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlashcardFight.Repositories
{
    public class ItemRepository : BaseRepository, IItemRepository
    {
        public ItemRepository(IConfiguration configuration) : base(configuration) { }

        public List<Item> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT Id, Name, HpBoost, ImageLocation FROM Item
                    ";

                    var reader = cmd.ExecuteReader();

                    var items = new List<Item>();

                    while (reader.Read())
                    {
                        items.Add(new Item()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name"),
                            HpBoost = DbUtils.GetInt(reader, "HpBoost"),
                            ImageLocation = DbUtils.GetString(reader, "ImageLocation")
                        });
                    }

                    reader.Close();
                    return items;
                }
            }
        }

        public List<Item> GetAllUserItems(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT i.Id, i.Name, i.HpBoost, i.ImageLocation, ui.Id AS UserItemId FROM Item i
                    LEFT JOIN UserItems ui on ui.ItemId = i.Id
                    WHERE ui.UserId = @id
                    ";

                    DbUtils.AddParameter(cmd, "@id", id);

                    var reader = cmd.ExecuteReader();

                    var userItems = new List<Item>();

                    while (reader.Read())
                    {
                        userItems.Add(new Item()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name"),
                            HpBoost = DbUtils.GetInt(reader, "HpBoost"),
                            ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                            UserItemId = DbUtils.GetInt(reader, "UserItemId")
                        });
                    }

                    reader.Close();
                    return userItems;
                }
            }
        }
    }
}
