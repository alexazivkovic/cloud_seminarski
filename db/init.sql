SET GLOBAL log_error_verbosity = 1;
ALTER USER 'novi'@'%' IDENTIFIED WITH caching_sha2_password BY 'novi';
GRANT ALL PRIVILEGES ON swfavorites.* TO 'novi'@'%';
FLUSH PRIVILEGES;
EXIT;
