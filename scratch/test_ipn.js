const axios = require('axios');

async function runTest() {
  const url = 'https://www.easydubbing.uk/api/paypal_ipn';
  const mockData = {
    txn_type: 'subscr_payment',
    payment_status: 'Completed',
    payer_email: 'test_customer@example.com',
    txn_id: 'TEST-TXN-' + Date.now(),
    item_name: 'Monthly Pro Pass'
  };

  console.log('🚀 Sending Mock IPN to:', url);
  console.log('📦 Data:', mockData);

  try {
    const response = await axios.post(url, mockData);
    console.log('✅ Response Status:', response.status);
    console.log('📄 Response Body:', response.data);
    
    if (response.data === 'VERIFIED') {
      console.log('\n✨ SUCCESS! The backend accepted the payment and should have generated a key.');
      console.log('Check your Supabase "licenses" table for "test_customer@example.com".');
    } else {
      console.log('\n⚠️ Backend responded with:', response.data);
    }
  } catch (error) {
    console.error('❌ Test Failed:', error.message);
  }
}

runTest();
