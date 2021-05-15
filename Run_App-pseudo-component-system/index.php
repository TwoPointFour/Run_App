<?php
session_start();
?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <!-- <meta name="viewport" content="width=device-width, initial-scale=1.0" /> -->
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
    />
    <meta name="theme-color" content="#009578" />
    <title>TwoPointFour Intervals</title>
    <link rel="stylesheet" href="css/bootstrap.min.css" />
    <link rel="stylesheet" href="src/master.css" />
    <link rel="manifest" href="manifest.json" />
    <link rel="apple-touch-icon" href="images/icon_x128apple.png" />
    <link rel="icon" href="images/icon_x48.png" />
    <link rel="serviceWorker" href="sw.js" />
    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link
      href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Noto+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap"
      rel="stylesheet"
    />
    <script type="module" src="src/db.js"></script>
    <script type="module" src="src/index.js"></script>
    <script type="module" src="src/home.js"></script>
  </head>
  <body>
    <div class="root"></div>
  </body>
</html>
