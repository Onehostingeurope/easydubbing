<?php
/**
 * STRIPE WEBHOOK (OneHostingEurope)
 * Upload this to your website root as: stripe_webhook.php
 * 
 * Remember to set this URL in your Stripe Dashboard!
 */

// 1. Get the Stripe notification
$payload = file_get_contents('php://input');
$event = json_decode($payload, true);

// 2. Only process if the payment was successful
if ($event['type'] == 'checkout.session.completed') {
    $session = $event['data']['object'];
    $customer_email = $session['customer_details']['email'];

    // 3. Generate a Unique 14-Character Key
    // Format: OHE-XXXX-XXXX-XXXX
    $new_key = "OHE-" . strtoupper(bin2hex(random_bytes(2))) . "-" . strtoupper(bin2hex(random_bytes(2))) . "-" . strtoupper(bin2hex(random_bytes(2))); 
    
    // 4. Save the key to keys.txt inside the /verify/ folder
    // Adjust the path if your verify folder is in a different location
    file_put_contents("verify/keys.txt", "$new_key | $customer_email\n", FILE_APPEND);
    
    // 5. Send the key to the customer via email
    $subject = "Your Easy Dubbing License Key";
    $message = "Thank you for your purchase!\n\nYour License Key is: $new_key\n\nYou can use this key to activate the software on your PC.";
    $headers = "From: sales@onehostingeurope.com";
    
    mail($customer_email, $subject, $message, $headers);
}

http_response_code(200);
?>
