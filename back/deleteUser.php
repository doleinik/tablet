<?php
include('./init/conection.php');
$data = json_decode(file_get_contents("php://input"));

$delete = "DELETE FROM Users WHERE id = " . $data->id . "";
if ($conn->query($delete) === FALSE) {
  echo "Error creating table: " . $conn->error;
}  

$conn->close();