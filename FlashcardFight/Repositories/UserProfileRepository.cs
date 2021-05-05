using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using FlashcardFight.Models;
using FlashcardFight.Utils;

namespace FlashcardFight.Repositories
{

    public class UserProfileRepository : BaseRepository, IUserProfileRepository
    {
        public UserProfileRepository(IConfiguration configuration) : base(configuration) { }

        public UserProfile GetByFirebaseUserId(string firebaseUserId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT up.Id, Up.FirebaseUserId, up.UserName, up.Email, up.JoinDate, up.UserTypeId,
                           up.Level, up.Experience, up.ExpToNextLevel, up.HP, up.CharacterImageId,  up.Attempts, up.Wins, up.Deactivated,
                           
                           ut.Name AS UserTypeName,
                           
                           c.ImageLocation                         

                        FROM UserProfile up
                            LEFT JOIN UserType ut on up.UserTypeId = ut.Id
                            LEFT JOIN CharacterImage c on up.CharacterImageId = c.Id
                        WHERE FirebaseUserId = @FirebaseuserId";

                    DbUtils.AddParameter(cmd, "@FirebaseUserId", firebaseUserId);

                    UserProfile userProfile = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        userProfile = new UserProfile()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                            UserName = DbUtils.GetString(reader, "UserName"),
                            Email = DbUtils.GetString(reader, "Email"),
                            JoinDate = DbUtils.GetDateTime(reader, "JoinDate"),
                            UserTypeId = DbUtils.GetInt(reader, "UserTypeId"),
                            UserType = new UserType()
                            {
                                Id = DbUtils.GetInt(reader, "UserTypeId"),
                                Name = DbUtils.GetString(reader, "UserTypeName"),
                            },
                            Level = DbUtils.GetInt(reader, "Level"),
                            Experience = DbUtils.GetInt(reader, "Experience"),
                            ExpToNextLevel = DbUtils.GetInt(reader, "ExpToNextLevel"),
                            HP = DbUtils.GetInt(reader, "HP"),
                            CharacterImageId = DbUtils.GetInt(reader, "CharacterImageId"),
                            CharacterImage = new CharacterImage()
                            {
                                Id = DbUtils.GetInt(reader, "CharacterImageId"),
                                ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                            },
                            Attempts = DbUtils.GetInt(reader, "Attempts"),
                            Wins = DbUtils.GetInt(reader, "Wins"),
                            Deactivated = DbUtils.GetBoolean(reader, "Deactivated")

                        };
                    }
                    reader.Close();

                    return userProfile;
                }
            }
        }

        public void Add(UserProfile userProfile)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                   cmd.CommandText = @"INSERT INTO UserProfile (FirebaseUserId, UserName, Email, JoinDate, UserTypeId, CharacterImageId, 
                                        Level, Experience, ExpToNextLevel, HP, Attempts, Wins, Deactivated)
                                    OUTPUT INSERTED.ID
                                    VALUES (@FirebaseUserId, @UserName, @Email, @JoinDate, @UserTypeId, @CharacterImageId,
                                        @Level, @Experience, @ExpToNextLevel, @HP, @Attempts, @Wins, @Deactivated)";
                    DbUtils.AddParameter(cmd, "@FirebaseUserId", userProfile.FirebaseUserId);
                    DbUtils.AddParameter(cmd, "@UserName", userProfile.UserName);
                    DbUtils.AddParameter(cmd, "@Email", userProfile.Email);
                    DbUtils.AddParameter(cmd, "@JoinDate", userProfile.JoinDate);
                    DbUtils.AddParameter(cmd, "@UserTypeId", userProfile.UserTypeId);
                    DbUtils.AddParameter(cmd, "@CharacterImageId", userProfile.CharacterImageId);
                    DbUtils.AddParameter(cmd, "@Level", userProfile.Level);
                    DbUtils.AddParameter(cmd, "@Experience", userProfile.Experience);
                    DbUtils.AddParameter(cmd, "@ExpToNextLevel", userProfile.ExpToNextLevel);
                    DbUtils.AddParameter(cmd, "@HP", userProfile.HP);
                    DbUtils.AddParameter(cmd, "@Attempts", userProfile.Attempts);
                    DbUtils.AddParameter(cmd, "@Wins", userProfile.Wins);
                    DbUtils.AddParameter(cmd, "@Deactivated", userProfile.Deactivated);

                    userProfile.Id = (int)cmd.ExecuteScalar(); 
                }
            }
        }

        public void UpdateUserCharacterStats(UserProfile userProfile)
        {
            using(var conn = Connection)
            {
                conn.Open();
                using(var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    UPDATE UserProfile
                        SET HP = @HP,
                            Experience = @Experience,
                            ExpToNextLevel = @ExpToNextLevel,
                            Level = @Level
                    WHERE id = @id
                    ";

                    DbUtils.AddParameter(cmd, "@id", userProfile.Id);
                    DbUtils.AddParameter(cmd, "@HP", userProfile.HP);
                    DbUtils.AddParameter(cmd, "@Experience", userProfile.Experience);
                    DbUtils.AddParameter(cmd, "@ExpToNextLevel", userProfile.ExpToNextLevel);
                    DbUtils.AddParameter(cmd, "@Level", userProfile.Level);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public List<UserProfile> GetUserProfiles()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT up.Id, Up.FirebaseUserId, up.UserName, up.Email, up.JoinDate, up.UserTypeId,
                           up.Level, up.Experience, up.ExpToNextLevel, up.HP, up.CharacterImageId,  up.Attempts, up.Wins, up.Deactivated,
                           
                           ut.Name AS UserTypeName,
                           
                           c.ImageLocation                         

                        FROM UserProfile up
                            LEFT JOIN UserType ut on up.UserTypeId = ut.Id
                            LEFT JOIN CharacterImage c on up.CharacterImageId = c.Id
                        ORDER BY up.UserName ASC
                    ";

                    SqlDataReader reader = cmd.ExecuteReader();
                    List<UserProfile> profiles = new List<UserProfile>();

                    while (reader.Read())
                    {
                        UserProfile profile = new UserProfile
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                            UserName = DbUtils.GetString(reader, "UserName"),
                            Email = DbUtils.GetString(reader, "Email"),
                            JoinDate = DbUtils.GetDateTime(reader, "JoinDate"),
                            UserTypeId = DbUtils.GetInt(reader, "UserTypeId"),
                            UserType = new UserType()
                            {
                                Id = DbUtils.GetInt(reader, "UserTypeId"),
                                Name = DbUtils.GetString(reader, "UserTypeName"),
                            },
                            Level = DbUtils.GetInt(reader, "Level"),
                            Experience = DbUtils.GetInt(reader, "Experience"),
                            ExpToNextLevel = DbUtils.GetInt(reader, "ExpToNextLevel"),
                            HP = DbUtils.GetInt(reader, "HP"),
                            CharacterImageId = DbUtils.GetInt(reader, "CharacterImageId"),
                            CharacterImage = new CharacterImage()
                            {
                                Id = DbUtils.GetInt(reader, "CharacterImageId"),
                                ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                            },
                            Attempts = DbUtils.GetInt(reader, "Attempts"),
                            Wins = DbUtils.GetInt(reader, "Wins"),
                            Deactivated = DbUtils.GetBoolean(reader, "Deactivated")
                        };

                        profiles.Add(profile);
                    }

                    reader.Close();
                    return profiles;
                }
            }
        }

        public void DeactivateUserById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    UPDATE UserProfile
                        SET Deactivated = 1
                    WHERE Id = @id
                    ";

                    DbUtils.AddParameter(cmd, "id", id);

                    cmd.ExecuteNonQuery();
                };
            }
        }

        public void ReactivateUserById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    UPDATE UserProfile
                        SET Deactivated = 0
                    WHERE Id = @id
                    ";

                    DbUtils.AddParameter(cmd, "id", id);

                    cmd.ExecuteNonQuery();
                };
            }
        }

        public UserProfile GetUserProfileById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT up.Id, Up.FirebaseUserId, up.UserName, up.Email, up.JoinDate, up.UserTypeId,
                           up.Level, up.Experience, up.ExpToNextLevel, up.HP, up.CharacterImageId,  up.Attempts, up.Wins, up.Deactivated,
                           
                           ut.Name AS UserTypeName,
                           
                           c.ImageLocation                         

                        FROM UserProfile up
                            LEFT JOIN UserType ut on up.UserTypeId = ut.Id
                            LEFT JOIN CharacterImage c on up.CharacterImageId = c.Id
                        WHERE up.id = @id";

                    cmd.Parameters.AddWithValue("@id", id);

                    UserProfile userProfile = null;
                    var reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        userProfile = new UserProfile()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                            UserName = DbUtils.GetString(reader, "UserName"),
                            Email = DbUtils.GetString(reader, "Email"),
                            JoinDate = DbUtils.GetDateTime(reader, "JoinDate"),
                            UserTypeId = DbUtils.GetInt(reader, "UserTypeId"),
                            UserType = new UserType()
                            {
                                Id = DbUtils.GetInt(reader, "UserTypeId"),
                                Name = DbUtils.GetString(reader, "UserTypeName"),
                            },
                            Level = DbUtils.GetInt(reader, "Level"),
                            Experience = DbUtils.GetInt(reader, "Experience"),
                            ExpToNextLevel = DbUtils.GetInt(reader, "ExpToNextLevel"),
                            HP = DbUtils.GetInt(reader, "HP"),
                            CharacterImageId = DbUtils.GetInt(reader, "CharacterImageId"),
                            CharacterImage = new CharacterImage()
                            {
                                Id = DbUtils.GetInt(reader, "CharacterImageId"),
                                ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                            },
                            Attempts = DbUtils.GetInt(reader, "Attempts"),
                            Wins = DbUtils.GetInt(reader, "Wins"),
                            Deactivated = DbUtils.GetBoolean(reader, "Deactivated")
                        };
                    }

                    reader.Close();
                    return userProfile;
                }
            }
        }


    }
}
