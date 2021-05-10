using FlashcardFight.Models;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FlashcardFight.Utils;
using Microsoft.Data.SqlClient;

namespace FlashcardFight.Repositories
{
    public class FlashCardSetRepository : BaseRepository, IFlashCardSetRepository
    {
        public FlashCardSetRepository(IConfiguration configuration) : base(configuration) { }

        public int Add(FlashCardSet flashCardSet)
        {
            using(var conn = Connection)
            {
                conn.Open();
                using(var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    INSERT INTO FlashCardSet (Title, Description, BossImageId, CreatorId, CategoryId, DifficultyId, CreateDateTime)
                    OUTPUT INSERTED.ID
                    VALUES (@Title, @Description, @BossImageId, @CreatorId, @CategoryId, @DifficultyId, @CreateDateTime)
                    ";

                    DbUtils.AddParameter(cmd, "@Title", flashCardSet.Title);
                    DbUtils.AddParameter(cmd, "@Description", flashCardSet.Description);
                    DbUtils.AddParameter(cmd, "@BossImageId", flashCardSet.BossImageId);
                    DbUtils.AddParameter(cmd, "@CreatorId", flashCardSet.CreatorId);
                    DbUtils.AddParameter(cmd, "@CategoryId", flashCardSet.CategoryId);
                    DbUtils.AddParameter(cmd, "@DifficultyId", flashCardSet.DifficultyId);
                    DbUtils.AddParameter(cmd, "@CreateDateTime", flashCardSet.CreateDateTime);

                    return flashCardSet.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public FlashCardSet GetById(int id)
        {
            using(var conn = Connection)
            {
                conn.Open();
                using(var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT f.Id AS SetId, f.Title, f.Description, f.CreateDateTime,
                        c.id As CategoryId, c.Name AS CategoryName,
                        d.id AS DifficultyId, d.Name AS DifficultyName,
                        b.id AS BossImageId, b.ImageLocation AS BossImageLocation, b.Attack, b.Death, b.Hurt,
                        u.id AS UserId, u.UserName, u.Email
                    FROM FlashCardSet f
                    LEFT JOIN Category c ON c.id = f.CategoryId
                    LEFT JOIN Difficulty d ON d.id = f.DifficultyId
                    LEFT JOIN BossImage b ON b.id = f.BossImageId
                    LEFT JOIN UserProfile u ON u.Id = f.CreatorId
                    WHERE f.Id = @id
                    ";

                    DbUtils.AddParameter(cmd, "Id", id);

                    var reader = cmd.ExecuteReader();

                    FlashCardSet flashCardSet = null;

                    if(reader.Read())
                    {
                        flashCardSet = NewFlashCardSetFromReader(reader);
                    }
                    reader.Close();
                    return flashCardSet;
                }
            }
        }

        public List<FlashCardSet> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using(var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT f.Id AS SetId, f.Title, f.Description, f.CreateDateTime,
                        c.id As CategoryId, c.Name AS CategoryName,
                        d.id AS DifficultyId, d.Name AS DifficultyName,
                        b.id AS BossImageId, b.ImageLocation AS BossImageLocation, b.Attack, b.Death, b.Hurt,
                        u.id AS UserId, u.UserName, u.Email
                    FROM FlashCardSet f
                    LEFT JOIN Category c ON c.id = f.CategoryId
                    LEFT JOIN Difficulty d ON d.id = f.DifficultyId
                    LEFT JOIN BossImage b ON b.id = f.BossImageId
                    LEFT JOIN UserProfile u ON u.Id = f.CreatorId
                    ORDER BY f.CreateDateTime
                    ";

                    var reader = cmd.ExecuteReader();

                    var flashCardSets = new List<FlashCardSet>();

                    while(reader.Read())
                    {
                        flashCardSets.Add(NewFlashCardSetFromReader(reader));
                    }

                    reader.Close();
                    return flashCardSets;
                }
            }
        }

        public List<FlashCardSet> GetAllWithoutSubscriptions(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT f.Id AS SetId, f.Title, f.Description, f.CreateDateTime,
                        c.id As CategoryId, c.Name AS CategoryName,
                        d.id AS DifficultyId, d.Name AS DifficultyName,
                        b.id AS BossImageId, b.ImageLocation AS BossImageLocation, b.Attack, b.Death, b.Hurt,
                        u.id AS UserId, u.UserName, u.Email
                    FROM FlashCardSet f
                    LEFT JOIN Category c ON c.id = f.CategoryId
                    LEFT JOIN Difficulty d ON d.id = f.DifficultyId
                    LEFT JOIN BossImage b ON b.id = f.BossImageId
                    LEFT JOIN UserProfile u ON u.Id = f.CreatorId 
                    LEFT JOIN 
                    (
                        SELECT subF.Id AS flashcardId FROM FlashCardSet subF
                        JOIN Subscription subS on subS.FlashCardSetId = subF.Id
                        AND subS.userId = @id
                    ) s ON f.Id = s.flashcardId 
                    WHERE s.flashcardId IS NULL
                    ";

                    DbUtils.AddParameter(cmd, "@id", id);

                    var reader = cmd.ExecuteReader();

                    var flashCardSets = new List<FlashCardSet>();

                    while (reader.Read())
                    {
                        flashCardSets.Add(NewFlashCardSetFromReader(reader));
                    }

                    reader.Close();
                    return flashCardSets;
                }
            }
        }

        // Get the list of all sets that the user is NOT subscribed and filtered by category
        public List<FlashCardSet> GetAllWithoutSubscriptionsSorted(int id, int categoryId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT f.Id AS SetId, f.Title, f.Description, f.CreateDateTime,
                        c.id As CategoryId, c.Name AS CategoryName,
                        d.id AS DifficultyId, d.Name AS DifficultyName,
                        b.id AS BossImageId, b.ImageLocation AS BossImageLocation, b.Attack, b.Death, b.Hurt,
                        u.id AS UserId, u.UserName, u.Email
                    FROM FlashCardSet f
                    LEFT JOIN Category c ON c.id = f.CategoryId
                    LEFT JOIN Difficulty d ON d.id = f.DifficultyId
                    LEFT JOIN BossImage b ON b.id = f.BossImageId
                    LEFT JOIN UserProfile u ON u.Id = f.CreatorId 
                    LEFT JOIN 
                    (
                        SELECT subF.Id AS flashcardId FROM FlashCardSet subF
                        JOIN Subscription subS on subS.FlashCardSetId = subF.Id
                        AND subS.userId = @id
                    ) s ON f.Id = s.flashcardId 
                    WHERE s.flashcardId IS NULL AND c.id = @categoryId
                    ";

                    DbUtils.AddParameter(cmd, "@id", id);
                    DbUtils.AddParameter(cmd, "@categoryId", categoryId);


                    var reader = cmd.ExecuteReader();

                    var flashCardSets = new List<FlashCardSet>();

                    while (reader.Read())
                    {
                        flashCardSets.Add(NewFlashCardSetFromReader(reader));
                    }

                    reader.Close();
                    return flashCardSets;
                }
            }
        }

        // Get a list of all set that the user is NOT subscribed to and filtered by difficulty
        public List<FlashCardSet> GetAllWithoutSubsFilteredByDifficulty(int id, int difficultyId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT f.Id AS SetId, f.Title, f.Description, f.CreateDateTime,
                        c.id As CategoryId, c.Name AS CategoryName,
                        d.id AS DifficultyId, d.Name AS DifficultyName,
                        b.id AS BossImageId, b.ImageLocation AS BossImageLocation, b.Attack, b.Death, b.Hurt,
                        u.id AS UserId, u.UserName, u.Email
                    FROM FlashCardSet f
                    LEFT JOIN Category c ON c.id = f.CategoryId
                    LEFT JOIN Difficulty d ON d.id = f.DifficultyId
                    LEFT JOIN BossImage b ON b.id = f.BossImageId
                    LEFT JOIN UserProfile u ON u.Id = f.CreatorId 
                    LEFT JOIN 
                    (
                        SELECT subF.Id AS flashcardId FROM FlashCardSet subF
                        JOIN Subscription subS on subS.FlashCardSetId = subF.Id
                        AND subS.userId = @id
                    ) s ON f.Id = s.flashcardId 
                    WHERE s.flashcardId IS NULL AND d.id = @difficultyId
                    ";

                    DbUtils.AddParameter(cmd, "@id", id);
                    DbUtils.AddParameter(cmd, "@difficultyId", difficultyId);


                    var reader = cmd.ExecuteReader();

                    var flashCardSets = new List<FlashCardSet>();

                    while (reader.Read())
                    {
                        flashCardSets.Add(NewFlashCardSetFromReader(reader));
                    }

                    reader.Close();
                    return flashCardSets;
                }
            }
        }

        public List<FlashCardSet> GetAllWithoutSubsFilteredByCategoryAndDifficulty(int id, int difficultyId, int categoryId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT f.Id AS SetId, f.Title, f.Description, f.CreateDateTime,
                        c.id As CategoryId, c.Name AS CategoryName,
                        d.id AS DifficultyId, d.Name AS DifficultyName,
                        b.id AS BossImageId, b.ImageLocation AS BossImageLocation, b.Attack, b.Death, b.Hurt,
                        u.id AS UserId, u.UserName, u.Email
                    FROM FlashCardSet f
                    LEFT JOIN Category c ON c.id = f.CategoryId
                    LEFT JOIN Difficulty d ON d.id = f.DifficultyId
                    LEFT JOIN BossImage b ON b.id = f.BossImageId
                    LEFT JOIN UserProfile u ON u.Id = f.CreatorId 
                    LEFT JOIN 
                    (
                        SELECT subF.Id AS flashcardId FROM FlashCardSet subF
                        JOIN Subscription subS on subS.FlashCardSetId = subF.Id
                        AND subS.userId = @id
                    ) s ON f.Id = s.flashcardId 
                    WHERE s.flashcardId IS NULL AND d.id = @difficultyId AND c.id = @categoryId
                    ";

                    DbUtils.AddParameter(cmd, "@id", id);
                    DbUtils.AddParameter(cmd, "@difficultyId", difficultyId);
                    DbUtils.AddParameter(cmd, "@categoryId", categoryId);

                    var reader = cmd.ExecuteReader();

                    var flashCardSets = new List<FlashCardSet>();

                    while (reader.Read())
                    {
                        flashCardSets.Add(NewFlashCardSetFromReader(reader));
                    }

                    reader.Close();
                    return flashCardSets;
                }
            }
        }

        public List<FlashCardSet> GetAllByUserId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT f.Id AS SetId, f.Title, f.Description, f.CreateDateTime,
                        c.id As CategoryId, c.Name AS CategoryName,
                        d.id AS DifficultyId, d.Name AS DifficultyName,
                        b.id AS BossImageId, b.ImageLocation AS BossImageLocation, b.Attack, b.Death, b.Hurt,
                        u.id AS UserId, u.UserName, u.Email
                    FROM FlashCardSet f
                    LEFT JOIN Category c ON c.id = f.CategoryId
                    LEFT JOIN Difficulty d ON d.id = f.DifficultyId
                    LEFT JOIN BossImage b ON b.id = f.BossImageId
                    LEFT JOIN UserProfile u ON u.Id = f.CreatorId
                    WHERE f.CreatorId = @Id
                    ORDER BY f.CreateDateTime
                    ";

                    DbUtils.AddParameter(cmd, "Id", id);

                    var reader = cmd.ExecuteReader();

                    var flashCardSets = new List<FlashCardSet>();

                    while (reader.Read())
                    {
                        flashCardSets.Add(NewFlashCardSetFromReader(reader));
                    }

                    reader.Close();
                    return flashCardSets;
                }
            }
        }

        public List<FlashCardSet> GetAllBySubscription(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT f.Id AS SetId, f.Title, f.Description, f.CreateDateTime,
                        c.id As CategoryId, c.Name AS CategoryName,
                        d.id AS DifficultyId, d.Name AS DifficultyName,
                        b.id AS BossImageId, b.ImageLocation AS BossImageLocation,
                        u.id AS UserId, u.UserName, u.Email,
                        s.id AS SubId
                    FROM FlashCardSet f
                    LEFT JOIN Category c ON c.id = f.CategoryId
                    LEFT JOIN Difficulty d ON d.id = f.DifficultyId
                    LEFT JOIN BossImage b ON b.id = f.BossImageId
                    LEFT JOIN UserProfile u ON u.Id = f.CreatorId
                    LEFT JOIN Subscription s ON s.FlashCardSetId = f.Id
                    WHERE s.UserId = @id
                    ORDER BY f.CreateDateTime
                    ";

                    DbUtils.AddParameter(cmd, "Id", id);

                    var reader = cmd.ExecuteReader();

                    var flashCardSets = new List<FlashCardSet>();

                    while (reader.Read())
                    {
                        FlashCardSet flashCardSet = new FlashCardSet()
                        {
                            Id = DbUtils.GetInt(reader, "SetId"),
                            Title = DbUtils.GetString(reader, "Title"),
                            Description = DbUtils.GetString(reader, "Description"),
                            BossImageId = DbUtils.GetInt(reader, "BossImageId"),
                            BossImage = new BossImage()
                            {
                                Id = DbUtils.GetInt(reader, "BossImageId"),
                                ImageLocation = DbUtils.GetString(reader, "BossImageLocation"),
                            },
                            CreatorId = DbUtils.GetInt(reader, "UserId"),
                            UserProfile = new UserProfile()
                            {
                                Id = DbUtils.GetInt(reader, "UserId"),
                                UserName = DbUtils.GetString(reader, "UserName"),
                                Email = DbUtils.GetString(reader, "Email")
                            },
                            CategoryId = DbUtils.GetInt(reader, "CategoryId"),
                            Category = new Category()
                            {
                                Id = DbUtils.GetInt(reader, "CategoryId"),
                                Name = DbUtils.GetString(reader, "CategoryName")
                            },
                            DifficultyId = DbUtils.GetInt(reader, "DifficultyId"),
                            Difficulty = new Difficulty()
                            {
                                Id = DbUtils.GetInt(reader, "DifficultyId"),
                                Name = DbUtils.GetString(reader, "DifficultyName")
                            },
                            CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                            SubId = DbUtils.GetInt(reader, "SubId")
                        };

                        flashCardSets.Add(flashCardSet);

                    }

                    reader.Close();
                    return flashCardSets;
                }
            }
        }

        public FlashCardSet GetByIdWithQuestionsAndAnswers(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT f.Id AS SetId, f.Title, f.Description, f.CreateDateTime,
                        c.id As CategoryId, c.Name AS CategoryName,
                        d.id AS DifficultyId, d.Name AS DifficultyName,
                        b.id AS BossImageId, b.ImageLocation AS BossImageLocation, b.Attack, b.Death, b.Hurt,
                        u.id AS UserId, u.UserName, u.Email,
                        q.Id AS QuestionId, q.QuestionText,
                        a.Id AS AnswerId, a.AnswerText, a.Correct
                    FROM FlashCardSet f
                    LEFT JOIN Category c ON c.id = f.CategoryId
                    LEFT JOIN Difficulty d ON d.id = f.DifficultyId
                    LEFT JOIN BossImage b ON b.id = f.BossImageId
                    LEFT JOIN UserProfile u ON u.Id = f.CreatorId
                    LEFT JOIN Question q ON q.FlashCardSetId = f.Id
                    LEFT JOIN Answer a ON a.QuestionId = q.Id
                    WHERE f.Id = @Id AND q.FlashCardSetId = f.Id AND a.QuestionId = q.Id
                    ";

                    DbUtils.AddParameter(cmd, "Id", id);

                    var reader = cmd.ExecuteReader();

                    FlashCardSet flashCardSet = null;

                    while (reader.Read())
                    {

                        // Create the flashCardSet once, and add the list of questions
                        if (flashCardSet == null)
                        {
                            flashCardSet = NewFlashCardSetFromReader(reader);
                            flashCardSet.Questions = new List<Question>();
                        }

                        // Grab the question id
                        var questionId = DbUtils.GetInt(reader, "QuestionId");

                        // Check to see if this question is already in the flash
                        var existingQuestion = flashCardSet.Questions.FirstOrDefault(q => q.Id == questionId);
                        
                        // If the question doesn't exist then create it, and then add it to the flashcard set
                        if(existingQuestion == null)
                        {
                            existingQuestion = new Question()
                            {
                                Id = DbUtils.GetInt(reader, "QuestionId"),
                                FlashCardSetId = DbUtils.GetInt(reader, "SetId"),
                                QuestionText = DbUtils.GetString(reader, "QuestionText"),
                                Answers = new List<Answer>()
                            };

                            flashCardSet.Questions.Add(existingQuestion);                            
                        }

                        // Create the answer object for the question
                        var answer = new Answer()
                        {
                            Id = DbUtils.GetInt(reader, "AnswerId"),
                            FlashCardSetId = DbUtils.GetInt(reader, "SetId"),
                            QuestionId = DbUtils.GetInt(reader, "QuestionId"),
                            AnswerText = DbUtils.GetString(reader, "AnswerText"),
                            Correct = DbUtils.GetBoolean(reader, "Correct")
                        };

                        // Add answers to the existing question until a new one is created, then repeat.
                        existingQuestion.Answers.Add(answer);
                       
                    }

                    reader.Close();
                    return flashCardSet;
                }
            }
        }

        public void UpdateFlashcard(FlashCardSet flashCardSet)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using(var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    UPDATE FlashCardSet
                        SET Title = @Title,
                            Description = @Description,
                            CategoryId = @CategoryId, 
                            DifficultyId = @DifficultyId
                    WHERE id = @id
                    ";

                    cmd.Parameters.AddWithValue("@id", flashCardSet.Id);
                    cmd.Parameters.AddWithValue("@Title", flashCardSet.Title);
                    cmd.Parameters.AddWithValue("@Description", flashCardSet.Description);
                    cmd.Parameters.AddWithValue("@CategoryId", flashCardSet.CategoryId);
                    cmd.Parameters.AddWithValue("@DifficultyId", flashCardSet.DifficultyId);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void DeleteFlashcardSet(int id)
        {
            using(var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    DELETE FROM Subscription
                    WHERE FlashCardSetId = @id
                    ";

                    DbUtils.AddParameter(cmd, "@id", id);

                    cmd.ExecuteNonQuery();
                }
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    DELETE FROM Answer
                    WHERE FlashCardSetId = @id
                    ";

                    DbUtils.AddParameter(cmd, "@id", id);

                    cmd.ExecuteNonQuery();
                }
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    DELETE FROM Question
                    WHERE FlashCardSetId = @id
                    ";

                    DbUtils.AddParameter(cmd, "@id", id);

                    cmd.ExecuteNonQuery();
                }
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    DELETE FROM FlashCardSet
                    WHERE Id = @id
                    ";

                    DbUtils.AddParameter(cmd, "@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        private FlashCardSet NewFlashCardSetFromReader(SqlDataReader reader)
        {
            return new FlashCardSet()
            {
                Id = DbUtils.GetInt(reader, "SetId"),
                Title = DbUtils.GetString(reader, "Title"),
                Description = DbUtils.GetString(reader, "Description"),
                BossImageId = DbUtils.GetInt(reader, "BossImageId"),
                BossImage = new BossImage()
                {
                    Id = DbUtils.GetInt(reader, "BossImageId"),
                    ImageLocation = DbUtils.GetString(reader, "BossImageLocation"),
                    Attack = DbUtils.GetString(reader, "Attack"),
                    Death = DbUtils.GetString(reader, "Death"),
                    Hurt = DbUtils.GetString(reader, "Hurt"),
                },
                CreatorId = DbUtils.GetInt(reader, "UserId"),
                UserProfile = new UserProfile()
                {
                    Id = DbUtils.GetInt(reader, "UserId"),
                    UserName = DbUtils.GetString(reader, "UserName"),
                    Email = DbUtils.GetString(reader, "Email")
                },
                CategoryId = DbUtils.GetInt(reader, "CategoryId"),
                Category = new Category()
                {
                    Id = DbUtils.GetInt(reader, "CategoryId"),
                    Name = DbUtils.GetString(reader, "CategoryName")
                },
                DifficultyId = DbUtils.GetInt(reader, "DifficultyId"),
                Difficulty = new Difficulty()
                {
                    Id = DbUtils.GetInt(reader, "DifficultyId"),
                    Name = DbUtils.GetString(reader, "DifficultyName")
                },
                CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime")
            };
        }
    }
}