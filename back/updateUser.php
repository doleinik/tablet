<?php
include('./init/conection.php');
$data = json_decode(file_get_contents("php://input"));

$update = "UPDATE Users SET name = '" . $data->name . "', surname = '" . $data->surname . "', position = '" . $data->position . "' WHERE id = '" . $data->id . "'";
if ($conn->query($update) === FALSE) {
    echo "Error creating table: " . $conn->error;
}

$conn->close();