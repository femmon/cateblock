CREATE TABLE Accounts (
    Username VARCHAR(20) PRIMARY KEY,
    Salt VARCHAR(172),
    Iterations MEDIUMINT,
    Hash VARCHAR(684)
);

CREATE TABLE Entries (
    EntryID INT PRIMARY KEY AUTO_INCREMENT,
    Username VARCHAR(20),
    Content TEXT,
    PostTime DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (Username)
        REFERENCES Accounts(Username)
        ON DELETE CASCADE
);

-- Time works on the assumption that database timezone is in UTC

CREATE TABLE History (
    EntryID INT,
    Content TEXT,
    PostTime DATETIME,
    Generations TINYINT,
    FOREIGN KEY (EntryID)
        REFERENCES Entries(EntryID)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- If select post from table then sort with PostTime, there is a small chance that the time will collide. Generations remove that chance

-- Use these to remove hole in auto increment entry ID (Use along with ON UPDATE CASCADE):
-- SET @count = 0;
-- UPDATE Entries SET EntryID = @count:= @count + 1 WHERE EntryID <> 0;
