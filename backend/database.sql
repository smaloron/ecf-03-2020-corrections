DROP DATABASE IF EXISTS livemusic;

CREATE DATABASE livemusic DEFAULT CHARACTER SET utf8;

USE livemusic;

CREATE TABLE bands (
    id MEDIUMINT UNSIGNED AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE locations (
    id MEDIUMINT UNSIGNED AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE concerts (
    id MEDIUMINT UNSIGNED AUTO_INCREMENT,
    band_id MEDIUMINT UNSIGNED NOT NULL,
    location_id MEDIUMINT UNSIGNED NOT NULL,
    rating TINYINT UNSIGNED NOT NULL,
    performance_date DATE NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT concerts_to_bands
        FOREIGN KEY (band_id)
        REFERENCES bands(id),
    CONSTRAINT concerts_to_locations
            FOREIGN KEY (location_id)
            REFERENCES locations(id)
);


INSERT INTO bands (name) VALUES
('Flogging Molly'), ('Fiddler\'s green'), ('Dropkick Murphys'), ('Firkin')
,('The Rumjacks'), ('O\'Reilly and the Paddyhats'), ('Paddy and the Rats');

INSERT INTO locations (name) VALUES
('La Cigalle'), ('Le Bataclan'), ('La flèche d\'or');

INSERT INTO concerts (performance_date, location_id, band_id, rating)
VALUES
('2020-01-10', 1, 1, 7), ('2020-01-10', 2, 2, 8), ('2020-01-10', 3, 3, 6),
('2020-01-12', 2, 7, 7), ('2020-01-12', 3, 6, 9), ('2020-01-12', 3, 1, 9);


CREATE OR REPLACE VIEW v_concerts AS
SELECT
c.*, b.name as band_name, l.name as location_name
FROM concerts as c
INNER JOIN bands as b ON b.id=c.band_id
INNER JOIN locations as l on l.id = c.location_id;


