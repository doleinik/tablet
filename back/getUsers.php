<?php
include('./init/conection.php');

$sql = "SELECT id, name, surname, position FROM Users";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) { ?>
        <div class='users-item' id='user-<?= $row["id"] ?>'>
            <div class='users-item__info'>
                <div class='users-item__wrap'>
                    Name:
                    <span class='users-item__name'><?= $row["name"] ?></span>
                </div>

                <div class='users-item__wrap'>
                    Surname:
                    <span class='users-item__surname'><?= $row["surname"] ?></span>
                </div>

                <div class='users-item__wrap'>
                    Position:
                    <span class='users-item__position'><?= $row["position"] ?></span>
                </div>
            </div>

            <div class='save hidden'>Save</div>
            <div class='users-item__update' data-id='<?= $row["id"] ?>'>Update</div>
            <div class='users-item__delete' data-id='<?= $row["id"] ?>'>Delete</div>
        </div>
    <?php }
} else {
    echo "<span class='empty'>Empty!</span>";
}
$conn->close();  