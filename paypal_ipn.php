<?php
/**
 * PAYPAL IPN (OneHostingEurope)
 * Upload this to your website root as: paypal_ipn.php
 * 
 * Remember to enable IPN in your PayPal account settings!
 */

// 1. Read the IPN message from PayPal
$raw_post_data = file_get_contents('php://input');
$raw_post_array = explode('&', $raw_post_data);
$myPost = array();
foreach ($raw_post_array as $keyval) {
  $keyval = explode ('=', $keyval);
  if (count($keyval) == 2)
    $myPost[$keyval[0]] = urldecode($keyval[1]);
}

// 2. Check if the payment was COMPLETED
if (isset($myPost['payment_status']) && $myPost['payment_status'] == 'Completed') {
    $customer_email = $myPost['payer_email'];

    // 3. Generate a Unique 14-Character Key
    // Format: OHE-XXXX-XXXX-XXXX
    $new_key = "OHE-" . strtoupper(bin2hex(random_bytes(2))) . "-" . strtoupper(bin2hex(random_bytes(2))) . "-" . strtoupper(bin2hex(random_bytes(2))); 
    
    // 4. Save the key to keys.txt inside the /verify/ folder
    // Note: Verify the path on your server!
    file_put_contents("verify/keys.txt", "$new_key | $customer_email\n", FILE_APPEND);
    
    // 5. Send the key to the customer via email
    $subject = "Your Easy Dubbing License Key";
    $message = "Thank you for your purchase via PayPal!\n\nYour License Key is: $new_key\n\nYou can use this key to activate the software on your PC.";
    $headers = "From: sales@onehostingeurope.com";
    
    mail($customer_email, $subject, $message, $headers);
}

// Respond with 200 to PayPal
http_response_code(200);
?>
