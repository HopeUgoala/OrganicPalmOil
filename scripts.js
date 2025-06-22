// Show payment form
function showPaymentForm() {
    document.getElementById('payment-modal').style.display = 'block';
}

// Close modal
function closeModal() {
    document.getElementById('payment-modal').style.display = 'none';
}

// Select payment method
function selectPayment(method) {
    document.getElementById('blik-details').style.display = 'none';
    document.getElementById('card-details').style.display = 'none';
    
    if (method === 'blik') {
        document.getElementById('blik-payment').checked = true;
        document.getElementById('blik-details').style.display = 'block';
    } else {
        document.getElementById('card-payment').checked = true;
        document.getElementById('card-details').style.display = 'block';
    }
}

// Process payment
function processPayment() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
    
    if (!name || !email || !address || !phone) {
        alert('Please fill in all required fields');
        return;
    }
    
    if (paymentMethod === 'blik') {
        // Process BLIK payment
        const orderData = {
            product: "Premium African Palm Oil (500ml)",
            price: 9.99,
            currency: "USD",
            customer: {
                name: name,
                email: email,
                address: address,
                phone: phone
            },
            paymentMethod: "BLIK"
        };
        
        // In a real implementation, you would send this data to your server
        console.log("Order data:", orderData);
        
        // Redirect to BLIK payment
        window.location.href = "https://buy.stripe.com/test_eVq7sLdXW0xW2To3bJ9MY00";
    } else {
        // Process card payment (simulated)
        const cardNumber = document.getElementById('card-number').value;
        const expiry = document.getElementById('expiry').value;
        const cvc = document.getElementById('cvc').value;
        
        if (!cardNumber || !expiry || !cvc) {
            alert('Please fill in all card details');
            return;
        }
        
        alert('Card payment processed successfully!\nThank you for your order!');
        closeModal();
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('payment-modal');
    if (event.target === modal) {
        closeModal();
    }
}

// Form submission for contact form
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your message! We will contact you soon.');
    this.reset();
});
