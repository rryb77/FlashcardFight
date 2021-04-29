USE FlashcardFight;
GO

set identity_insert [UserType] on
insert into [UserType] ([ID], [Name]) VALUES (1, 'Admin'), (2, 'User');
set identity_insert [UserType] off

set identity_insert [CharacterImage] on
insert into [CharacterImage] ([ID], [ImageLocation]) VALUES (1, 'https://i.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U')
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
insert into [UserProfile] ([ID], [FirebaseUserId], [UserName], [Email], [JoinDate], [UserTypeId], [Level], [Experience], [HP], [CharacterImageId], [Attempts], [Wins]) VALUES (1, 'whA35ySlIYOVnyiQKAQIvzPemWs2', 'foobar', 'foo@bar.comx', '2020-04-23', 1, 1, 0, 500, 1, 0, 0)
set identity_insert [UserProfile] off

set identity_insert [FlashCardSet] on
insert into [FlashCardSet] ([ID], [Title], [CreateDateTime], [BossImageId], [CreatorId], [CategoryId], [DifficultyId]) VALUES (1, 'Initial Set', '2020-04-23', 1, 1, 1, 1)
set identity_insert [FlashCardSet] off