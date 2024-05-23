<?php

function getProjectCreationInfo($folderName) {

    
    // Get the creation time of the folder
    $creationTime = filectime($folderName);

    // Convert creation time to a readable format
    $creationDate = date("d/m/Y", $creationTime);


    // Calculate time elapsed since creation
    $currentTime = time();
    $timeDifference = $currentTime - $creationTime;

    // Calculate time units
    $timeUnits = [
        "year" => 365 * 24 * 60 * 60,
        "month" => 30 * 24 * 60 * 60,
        "day" => 24 * 60 * 60,
        "hour" => 60 * 60,
        "minute" => 60
    ];

    $timeElapsed = "";
    $unitDisplayed = false; // Flag to check if a unit has been displayed
    foreach ($timeUnits as $unit => $seconds) {
        if ($timeDifference < $seconds && $unitDisplayed) {
            // If a larger unit has already been displayed, skip smaller units
            continue;
        }
        $div = floor($timeDifference / $seconds);
        $timeDifference %= $seconds;
        if ($div > 0) {
            $timeElapsed .= "$div $unit";
            $timeElapsed .= ($div > 1) ? "s " : " ";
            $unitDisplayed = true;
        }
        if ($unit == "hour" && $div > 0) {
            // If hours have been displayed, skip minutes
            break;
        }
        if ($unit == "day" && $div > 0) {
            // If days have been displayed, skip hours and minutes
            break;
        }
    }

    // Determine whether the project was created in the past or now
    if ($timeElapsed == "") {
        $timeElapsed = "now";
    } else {
        $timeElapsed .= " ago";
    }

    // Return the creation date and time elapsed
    return "$creationDate ";
}


?>