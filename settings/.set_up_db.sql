-- Creates database unikrib_db
CREATE DATABASE IF NOT EXISTS unikrib_db;
USE unikrib_db;
CREATE USER IF NOT EXISTS 'unikrib_dev'@'localhost';
SET PASSWORD FOR 'unikrib_dev'@'localhost' = 'unikrib_dev_pwd';
GRANT ALL PRIVILEGES ON unikrib_db.* TO 'unikrib_dev'@'localhost';
GRANT SELECT ON performance_schema.* TO 'unikrib_dev'@'localhost';
FLUSH PRIVILEGES