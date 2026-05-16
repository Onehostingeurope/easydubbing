<?php
/**
 * LICENSE VERIFICATION SERVER (OneHostingEurope)
 * Upload this file as: index.php inside your /verify/ folder
 */

// 1. Load keys from the keys.txt file (created by Stripe Webhook)
$keys_file = "keys.txt";

// Create the file if it doesn't exist
if (!file_exists($keys_file)) {
    file_put_contents($keys_file, "");
}

$all_data = file_get_contents($keys_file);

// 2. Get data from the Installer
$email = $_POST['email'] ?? '';
$key = $_POST['key'] ?? '';
$hwid = $_POST['hwid'] ?? '';

// 3. Simple check if key exists in the file
// For better security, you can check if $hwid matches the one stored in the file!
if ($key && strpos($all_data, $key) !== false) {
    http_response_code(200);
    echo "Verified";
} else {
    http_response_code(401);
    echo "Invalid License Key";
}
?>
