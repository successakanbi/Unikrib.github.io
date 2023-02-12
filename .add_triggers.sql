-- This adds a trigger to the review table to update the ratings on the users table

DELIMITER // ;
DROP TRIGGER IF EXISTS ratings
CREATE TRIGGER ratings
BEFORE INSERT ON reviews
FOR EACH ROW
    BEGIN
        UPDATE users
        SET rating=AVG(SELECT * 
                       FROM users
                       WHERE id=reviews.reviewee;)
    END//