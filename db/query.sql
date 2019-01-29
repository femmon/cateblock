-- Create new account
INSERT INTO Accounts VALUES (Username, Salt, Hash);
-- INSERT INTO Accounts VALUES ("djk", "dij", "dsdf");

-- Delete account
DELETE FROM Accounts WHERE Username = Username;
-- DELETE FROM Accounts WHERE Username = "djk";

-- Create new entry


-- Remove PostTime as it will automatically create and update


INSERT INTO Entries VALUES (0, Username, Content, DEFAULT);
-- INSERT INTO Entries VALUES (0,"djk", "djfkl", "2019-01-18 00:00:00");

-- Edit entry
SELECT COUNT(*) FROM Entries WHERE Username = Username and EntryID = EntryID;
UPDATE History SET Generations = Generations + 1 WHERE EntryID = EntryID;
INSERT INTO History (EntryID, Content, PostTime, Generations) SELECT EntryID, Content, PostTime, 1 FROM Entries WHERE EntryID = EntryID;


-- Remove PostTime as it will automatically create and update


UPDATE Entries SET Content = Content WHERE EntryID = EntryID;
-- SELECT COUNT(*) FROM Entries WHERE Username = "djk" and EntryID = 2;
-- UPDATE History SET Generations = Generations + 1 WHERE EntryID = 2;
-- INSERT INTO History (EntryID, Content, PostTime, Generations) SELECT EntryID, Content, PostTime, 1 FROM Entries WHERE EntryID = 2;
-- UPDATE Entries SET Content = "o", PostTime = "2019-01-19 10:00:00" WHERE EntryID = 2;

-- Remove entry
DELETE FROM Entries WHERE Username = Username AND EntryID = EntryID;
-- DELETE FROM Entries WHERE Username = "djk" AND EntryID = 2;

-- View entry
SELECT Content, PostTime FROM Entries WHERE Username = Username ORDER BY EntryID DESC LIMIT 5 OFFSET 5;
-- SELECT Content, PostTime FROM Entries WHERE Username = "djk" ORDER BY EntryID DESC LIMIT 5 OFFSET 0;

-- View edit
SELECT COUNT(*) FROM Entries WHERE Username = Username and EntryID = EntryID;
SELECT Content, PostTime FROM History WHERE EntryID = EntryID ORDER BY Generations;
-- SELECT COUNT(*) FROM Entries WHERE Username = "djk" and EntryID = 2;
-- SELECT Content, PostTime FROM History WHERE EntryID = 2 ORDER BY Generations;
