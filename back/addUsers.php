<?php
$jsonData = file_get_contents('php://input');
$data = json_decode($jsonData, true);


include('./init/conection.php');

$create = "CREATE TABLE IF NOT EXISTS Users (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, name VARCHAR(30), surname VARCHAR(30), position VARCHAR(30))";
if ($conn->query($create) === FALSE) {
    echo "Error creating table: " . $conn->error;
}

print_r($data);

$name = $data['name'];
$surname = $data['surname'];
$position = $data['position'];
if ($name !== '' && $surname != '' && $position !== '') {
    $writeParams = "'" . $name . "', '" . $surname . "', '" . $position . "'";
    $write = "INSERT INTO Users (name, surname, position) VALUES (" . $writeParams . ")";

    if ($conn->query($write) === FALSE) {
        echo "Error creating table: " . $conn->error;
    }
}

$conn->close();