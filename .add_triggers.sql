-- This adds a trigger to the review table to update the ratings on the users table

DELIMITER // ;
DROP TRIGGER IF EXISTS ratings
CREATE TRIGGER calc_avg
    AFTER INSERT
    ON reviews FOR EACH ROW
    BEGIN
        UPDATE users
        SET rating=(SELECT AVG(star)
            FROM reviews
            WHERE id=NEW.id)
        WHERE id=NEW.id;
    END//
DELIMITER ;