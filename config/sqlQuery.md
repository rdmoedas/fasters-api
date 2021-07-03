Arquivo das query utilizadas na criação do banco

CREATE TABLE IF NOT EXISTS city_weather (
	id INT PRIMARY KEY AUTO_INCREMENT,
    city_api_id INT NOT NULL,
    city_name VARCHAR(255) NOT NULL,
    temp DECIMAL(5,2) NOT NULL,
    feels_like DECIMAL(5,2) NOT NULL,
    temp_min DECIMAL(5,2) NOT NULL,
    temp_max DECIMAL(5,2) NOT NULL,
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)

INSERT INTO city_weather (
    city_api_id, 
    city_name, 
    temp fells_like, 
    temp_min, 
    temp_max
    )
    VALUES (
        3451190,
        "Rio de Janeiro",
        10.47,
        10,
        10.47,
        10.47,
    )


Mockupdata

3451189 Rio de Janeiro
3448433 São Paulo