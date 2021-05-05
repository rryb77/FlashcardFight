USE [master]

IF db_id('FlashcardFight') IS NULl
  CREATE DATABASE [FlashcardFight]
GO

USE [FlashcardFight]
GO


DROP TABLE IF EXISTS [FlashCardSet];
DROP TABLE IF EXISTS [Reaction];
DROP TABLE IF EXISTS [Difficulty];
DROP TABLE IF EXISTS [Question];
DROP TABLE IF EXISTS [Answer];
DROP TABLE IF EXISTS [Post];
DROP TABLE IF EXISTS [Category];
DROP TABLE IF EXISTS [Subscription];
DROP TABLE IF EXISTS [UserProfile];
DROP TABLE IF EXISTS [UserType];
DROP TABLE IF EXISTS [Item];
DROP TABLE IF EXISTS [ItemImage];
DROP TABLE IF EXISTS [CharacterImage];
DROP TABLE IF EXISTS [BossImage];
DROP TABLE IF EXISTS [UserAchievement];
DROP TABLE IF EXISTS [Achievement];
GO

CREATE TABLE [UserType] (
  [Id] int PRIMARY KEY IDENTITY NOT NULL,
  [Name] nvarchar(50) NOT NULL
)
GO

CREATE TABLE [UserProfile] (
  [Id] int PRIMARY KEY IDENTITY NOT NULL,
  [FirebaseUserId] nvarchar(28) NOT NULL,
  [UserName] nvarchar(50) NOT NULL,
  [Email] nvarchar(555) NOT NULL,
  [JoinDate] datetime NOT NULL,
  [UserTypeId] int NOT NULL,
  [Level] int NOT NULL,
  [Experience] int NOT NULL,
  [ExpToNextLevel] INT NOT NULL,
  [HP] int NOT NULL,
  [CharacterImageId] int NOT NULL,
  [Attempts] int NOT NULL,
  [Wins] int NOT NULL,
  [Deactivated] bit NOT NULL
)
GO

CREATE TABLE [FlashCardSet] (
  [Id] int PRIMARY KEY IDENTITY NOT NULL,
  [Title] nvarchar(200) NOT NULL,
  [Description] nvarchar(500) NOT NULL,
  [BossImageId] int NOT NULL,
  [CreatorId] int NOT NULL,
  [CategoryId] int NOT NULL,
  [DifficultyId] int NOT NULL,
  [CreateDateTime] date NOT NULL
)
GO

CREATE TABLE [Difficulty] (
  [Id] int PRIMARY KEY IDENTITY NOT NULL,
  [Name] nvarchar(50) NOT NULL
)
GO

CREATE TABLE [Question] (
  [Id] int PRIMARY KEY IDENTITY NOT NULL,
  [FlashCardSetId] int NOT NULL,
  [QuestionText] nvarchar(MAX) NOT NULL
)
GO

CREATE TABLE [Answer] (
  [Id] int PRIMARY KEY IDENTITY NOT NULL,
  [FlashCardSetId] int NOT NULL,
  [QuestionId] int NOT NULL,
  [AnswerText] nvarchar(MAX) NOT NULL,
  [Correct] bit NOT NULL
)
GO

CREATE TABLE [Subscription] (
  [Id] int PRIMARY KEY IDENTITY NOT NULL,
  [FlashCardSetId] int NOT NULL,
  [UserId] int NOT NULL
)
GO

CREATE TABLE [Category] (
  [Id] int PRIMARY KEY IDENTITY NOT NULL,
  [Name] nvarchar(100) NOT NULL
)
GO

CREATE TABLE [Item] (
  [Id] int PRIMARY KEY IDENTITY NOT NULL,
  [Name] nvarchar(100) NOT NULL,
  [UserId] int NOT NULL,
  [HpBoost] int NOT NULL,
  [ImageLocationId] int NOT NULL
)
GO

CREATE TABLE [ItemImage] (
  [Id] int PRIMARY KEY IDENTITY NOT NULL,
  [ImageLocation] nvarchar(MAX) NOT NULL
)
GO

CREATE TABLE [CharacterImage] (
  [Id] int PRIMARY KEY IDENTITY NOT NULL,
  [ImageLocation] nvarchar(MAX) NOT NULL
)
GO

CREATE TABLE [BossImage] (
  [Id] int PRIMARY KEY IDENTITY NOT NULL,
  [ImageLocation] nvarchar(MAX) NOT NULL
)
GO

CREATE TABLE [UserAchievement] (
  [Id] int PRIMARY KEY IDENTITY NOT NULL,
  [UserId] int NOT NULL,
  [AchievementId] int NOT NULL
)
GO

CREATE TABLE [Achievement] (
  [Id] int PRIMARY KEY IDENTITY NOT NULL,
  [Name] nvarchar(MAX) NOT NULL
)
GO

ALTER TABLE [UserProfile] ADD FOREIGN KEY ([UserTypeId]) REFERENCES [UserType] ([Id])
GO

ALTER TABLE [FlashCardSet] ADD FOREIGN KEY ([CreatorId]) REFERENCES [UserProfile] ([Id])
GO

ALTER TABLE [Question] ADD FOREIGN KEY ([FlashCardSetId]) REFERENCES [FlashCardSet] ([Id])
GO

ALTER TABLE [Subscription] ADD FOREIGN KEY ([FlashCardSetId]) REFERENCES [FlashCardSet] ([Id])
GO

ALTER TABLE [Subscription] ADD FOREIGN KEY ([UserId]) REFERENCES [UserProfile] ([Id])
GO

ALTER TABLE [Answer] ADD FOREIGN KEY ([QuestionId]) REFERENCES [Question] ([Id])
GO

ALTER TABLE [FlashCardSet] ADD FOREIGN KEY ([CategoryId]) REFERENCES [Category] ([Id])
GO

ALTER TABLE [Item] ADD FOREIGN KEY ([UserId]) REFERENCES [UserProfile] ([Id])
GO

ALTER TABLE [UserProfile] ADD FOREIGN KEY ([CharacterImageId]) REFERENCES [CharacterImage] ([Id])
GO

ALTER TABLE [FlashCardSet] ADD FOREIGN KEY ([BossImageId]) REFERENCES [BossImage] ([Id])
GO

ALTER TABLE [Item] ADD FOREIGN KEY ([ImageLocationId]) REFERENCES [ItemImage] ([Id])
GO

ALTER TABLE [UserAchievement] ADD FOREIGN KEY ([UserId]) REFERENCES [UserProfile] ([Id])
GO

ALTER TABLE [UserAchievement] ADD FOREIGN KEY ([AchievementId]) REFERENCES [Achievement] ([Id])
GO

ALTER TABLE [FlashCardSet] ADD FOREIGN KEY ([DifficultyId]) REFERENCES [Difficulty] ([Id])
GO