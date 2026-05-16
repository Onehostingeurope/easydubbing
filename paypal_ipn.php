<?php
/**
 * PAYPAL IPN (OneHostingEurope)
 * Upload this to your website root as: paypal_ipn.php
 * 
 * This script handles:
 * 1. Standard Checkout (Lifetime License)
 * 2. Subscription Payments (Monthly & Annual Passes)
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

// Log for debugging (optional - can be disabled)
// file_put_contents("ipn_log.txt", date('[Y-m-d H:i:e] ') . $raw_post_data . PHP_EOL, FILE_APPEND);

// 2. Identify the payment type and status
$is_completed = (isset($myPost['payment_status']) && $myPost['payment_status'] == 'Completed');
$is_subscription_payment = (isset($myPost['txn_type']) && $myPost['txn_type'] == 'subscr_payment');

// 3. Process if it's a valid successful transaction
if ($is_completed || $is_subscription_payment) {
    
    // Get customer email
    $customer_email = isset($myPost['payer_email']) ? $myPost['payer_email'] : '';
    if (empty($customer_email) && isset($myPost['receiver_email'])) {
        $customer_email = $myPost['receiver_email'];
    }

    if (!empty($customer_email)) {
        // 4. Generate a Unique 14-Character Key
        // Format: OHE-XXXX-XXXX-XXXX
        $new_key = "OHE-" . strtoupper(bin2hex(random_bytes(2))) . "-" . strtoupper(bin2hex(random_bytes(2))) . "-" . strtoupper(bin2hex(random_bytes(2))); 
        
        // 5. Save the key to keys.txt inside the /verify/ folder
        // Note: We use the server path relative to the script
        $verify_dir = __DIR__ . "/verify";
        if (!is_dir($verify_dir)) {
            mkdir($verify_dir, 0755, true);
        }
        
        file_put_contents($verify_dir . "/keys.txt", "$new_key | $customer_email | " . date('Y-m-d H:i:s') . "\n", FILE_APPEND);
        
        // 6. Send the key to the customer via email
        $subject = "Your Easy Dubbing License Key";
        $message = "Thank you for your purchase via PayPal!\n\nYour License Key is: $new_key\n\nYou can use this key to activate the software on your PC.\n\nEnjoy translating!";
        $headers = "From: sales@onehostingeurope.com\r\n";
        $headers .= "Reply-To: support@onehostingeurope.com\r\n";
        $headers .= "X-Mailer: PHP/" . phpversion();
        
        mail($customer_email, $subject, $message, $headers);
    }
}

// Respond with 200 to PayPal
http_response_code(200);
?>
