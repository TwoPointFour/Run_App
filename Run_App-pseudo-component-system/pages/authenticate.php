<?php

    $con = mysqli_connect('localhost', 'root', 'TwoPointFour.db2.4', 'MainDB') or die('Unable to connect to database');

    if (isset($_POST['login'])){
        $email = $_POST['email'];
        $password = $_POST['password'];
        
        else {
            header("Location: login.php");
            }

    $select = mysqli_query($con, "SELECT * FROM user_info WHERE username = '$email' AND password = '$password' ");
    $row = mysqli_fetch_array($select);

    if(is_array($row)) {
        $_SESSION["username"] = $row["username"];
        $_SESSION["password"] = $row["password"];
    } else {
        echo '<script type="text/javascript">';
        echo 'alert("Invalid username or password")';
        echo 'window.location.href = "login.php"';
        echo '</script>';
    }
    }
    if (isset($_SESSION["username"])){
        header("Location: index.php");
    }

?>