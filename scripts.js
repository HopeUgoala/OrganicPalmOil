// Process payment function (updated)
function processPayment() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
    
    // Validate form
    if (!name || !email || !address || !phone) {
        alert('Please fill in all required fields');
        return;
    }
    
    // Prepare order data
    const orderData = {
        product: "Premium African Palm Oil (500ml)",
        price: 9.99,
        currency: "USD",
        customer: { name, email, address, phone },
        paymentMethod
    };
    
    // Process based on payment method
    if (paymentMethod === 'blik') {
        // For BLIK payments
        alert('You will be redirected to BLIK payment');
        
        // In production, you would:
        // 1. Send orderData to your backend
        // 2. Then redirect to payment gateway
        window.location.href = "https://buy.stripe.com/test_eVq7sLdXW0xW2To3bJ9MY00";
        
    } else {
        // For card payments (simulated)
        const cardNumber = document.getElementById('card-number').value;
        const expiry = document.getElementById('expiry').value;
        const cvc = document.getElementById('cvc').value;
        
        if (!cardNumber || !expiry || !cvc) {
            alert('Please fill in all card details');
            return;
        }
        
        // In production, you would:
        // 1. Process card payment via Stripe.js
        // 2. Then send order data to your backend
        
        alert('Payment processed successfully! Thank you for your order!');
        closeModal();
    }
    
    // In production, you would typically:
    // 1. Send orderData to your server
    // 2. Handle the payment processing
    // 3. Show success/error message
    console.log("Order data being processed:", orderData);
}
