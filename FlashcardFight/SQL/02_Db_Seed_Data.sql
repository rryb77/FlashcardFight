USE FlashcardFight;
GO

set identity_insert [UserType] on
insert into [UserType] ([ID], [Name]) VALUES (1, 'Admin'), (2, 'User');
set identity_insert [UserType] off

set identity_insert [CharacterImage] on
insert into [CharacterImage] ([ID], [Name]) VALUES (1, 'https://i.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U')
set identity_insert [CharacterImage] off