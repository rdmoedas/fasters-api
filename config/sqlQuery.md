Arquivo das query utilizadas na criação do banco

CREATE TABLE IF NOT EXISTS city_weather (

  city_api_id INT PRIMARY KEY,

  city_name VARCHAR(255) NOT NULL,

  temp DECIMAL(5,2) NOT NULL,

  feels_like DECIMAL(5,2) NOT NULL,

  last_update TIMESTAMP on update CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP

);