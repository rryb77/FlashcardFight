USE FlashcardFight;
GO

set identity_insert [UserType] on
insert into [UserType] ([ID], [Name]) VALUES (1, 'Admin'), (2, 'User');
set identity_insert [UserType] off

set identity_insert [CharacterImage] on
insert into [CharacterImage] ([ID], [ImageLocation]) VALUES (1, '/characters/fantasyGuy.gif')
set identity_insert [CharacterImage] off

set identity_insert [BossImage] on
insert into [BossImage] ([ID], [ImageLocation]) VALUES (1, 'https://i.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U')
set identity_insert [BossImage] off

set identity_insert [Category] on
insert into [Category] ([ID], [Name]) VALUES (1, 'Education'), (2, 'Exam'), (3, 'Language'), (4, 'Medical'), (5, 'Careers'), (6, 'Programming'), (7, 'Software'), (8, 'Other');
set identity_insert [Category] off

set identity_insert [Difficulty] on
insert into [Difficulty] ([ID], [Name]) VALUES (1, 'Beginner'), (2, 'Intermediate'), (3, 'Expert');
set identity_insert [Difficulty] off

set identity_insert [UserProfile] on
insert into [UserProfile] ([ID], [FirebaseUserId], [UserName], [Email], [JoinDate], [UserTypeId], [Level], [Experience], [ExpToNextLevel], [HP], [CharacterImageId], [Attempts], [Wins], [Deactivated]) VALUES (1, 'whA35ySlIYOVnyiQKAQIvzPemWs2', 'foobar', 'foo@bar.comx', '2020-04-23', 1, 1, 0, 500, 1000, 1, 0, 0, 0)
set identity_insert [UserProfile] off

set identity_insert [FlashCardSet] on
insert into [FlashCardSet] ([ID], [Title], [Description], [CreateDateTime], [BossImageId], [CreatorId], [CategoryId], [DifficultyId]) VALUES (1, 'C# Basics', 'This set that contains basic vocabulary terms for C#.', '2020-04-23', 1, 1, 6, 1)
set identity_insert [FlashCardSet] off

set identity_insert [Question] on
insert into [Question] ([ID], [FlashCardSetId], [QuestionText]) VALUES (1, 1, 'What is a variable?')
insert into [Question] ([ID], [FlashCardSetId], [QuestionText]) VALUES (2, 1, 'What is a type?')
insert into [Question] ([ID], [FlashCardSetId], [QuestionText]) VALUES (3, 1, 'What is a method?')
insert into [Question] ([ID], [FlashCardSetId], [QuestionText]) VALUES (4, 1, 'What is a class?')
insert into [Question] ([ID], [FlashCardSetId], [QuestionText]) VALUES (5, 1, 'What is a property?')
set identity_insert [Question] off

set identity_insert [Answer] on
insert into [Answer] ([ID], [FlashCardSetId], [QuestionId], [AnswerText], [Correct]) VALUES (1, 1, 1, 'A name that is associated with / used to reference a value.', 1)
insert into [Answer] ([ID], [FlashCardSetId], [QuestionId], [AnswerText], [Correct]) VALUES (2, 1, 1, 'A special method that can be called to startup the program.', 0)
insert into [Answer] ([ID], [FlashCardSetId], [QuestionId], [AnswerText], [Correct]) VALUES (3, 1, 1, 'A reference to the command line.', 0)
insert into [Answer] ([ID], [FlashCardSetId], [QuestionId], [AnswerText], [Correct]) VALUES (4, 1, 1, 'A server.', 0)
insert into [Answer] ([ID], [FlashCardSetId], [QuestionId], [AnswerText], [Correct]) VALUES (5, 1, 2, 'It is a constraint on a value or a variable', 1)
insert into [Answer] ([ID], [FlashCardSetId], [QuestionId], [AnswerText], [Correct]) VALUES (6, 1, 2, 'The actions taken on a keyboard.', 0)
insert into [Answer] ([ID], [FlashCardSetId], [QuestionId], [AnswerText], [Correct]) VALUES (7, 1, 2, 'It refers to your blood type.', 0)
insert into [Answer] ([ID], [FlashCardSetId], [QuestionId], [AnswerText], [Correct]) VALUES (8, 1, 2, 'It is unrelated to C#.', 0)
insert into [Answer] ([ID], [FlashCardSetId], [QuestionId], [AnswerText], [Correct]) VALUES (9, 1, 3, 'It defines the behavior of an object, and can be public or private.', 1)
insert into [Answer] ([ID], [FlashCardSetId], [QuestionId], [AnswerText], [Correct]) VALUES (10, 1, 3, 'It is short for method acting.', 0)
insert into [Answer] ([ID], [FlashCardSetId], [QuestionId], [AnswerText], [Correct]) VALUES (11, 1, 3, 'It defines the behavior of an object, but is always public.', 0)
insert into [Answer] ([ID], [FlashCardSetId], [QuestionId], [AnswerText], [Correct]) VALUES (12, 1, 3, 'It defines the behavior of an object, but is always private.', 0)
insert into [Answer] ([ID], [FlashCardSetId], [QuestionId], [AnswerText], [Correct]) VALUES (13, 1, 4, 'The blueprint of an object.', 1)
insert into [Answer] ([ID], [FlashCardSetId], [QuestionId], [AnswerText], [Correct]) VALUES (14, 1, 4, 'Where students gather to learn.', 0)
insert into [Answer] ([ID], [FlashCardSetId], [QuestionId], [AnswerText], [Correct]) VALUES (15, 1, 4, 'The source code of your project.', 0)
insert into [Answer] ([ID], [FlashCardSetId], [QuestionId], [AnswerText], [Correct]) VALUES (16, 1, 4, 'It is a boolean value that can be reused.', 0)
insert into [Answer] ([ID], [FlashCardSetId], [QuestionId], [AnswerText], [Correct]) VALUES (17, 1, 5, 'The named part of an object that can store a value.', 1)
insert into [Answer] ([ID], [FlashCardSetId], [QuestionId], [AnswerText], [Correct]) VALUES (18, 1, 5, 'The named part of a class that can store a value.', 0)
insert into [Answer] ([ID], [FlashCardSetId], [QuestionId], [AnswerText], [Correct]) VALUES (19, 1, 5, 'The named part of a method that can store a value.', 0)
insert into [Answer] ([ID], [FlashCardSetId], [QuestionId], [AnswerText], [Correct]) VALUES (20, 1, 5, 'The named part of a function that can store a value.', 0)
set identity_insert [Answer] off