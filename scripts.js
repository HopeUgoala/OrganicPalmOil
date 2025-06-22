// Currency conversion rates (example rates - in production, use API)
const exchangeRates = {
    USD: 1,
    EUR: 0.85,
    GBP: 0.73,
    PLN: 3.95,
    NGN: 415.50
};

// Current currency
let currentCurrency = 'USD';

// Change currency based on selection
function changeCurrency() {
    const selector = document.getElementById('currency-selector');
    currentCurrency = selector.value;
    updatePrices();
}

// Update all prices on the page
function updatePrices() {
    const basePrice = 8.99; // Base price in USD
    const convertedPrice = currency(basePrice, { from: 'USD', to: currentCurrency }).multiply(exchangeRates[currentCurrency]).format();
    
    document.querySelector('.price').textContent = convertedPrice;
    document.querySelector('.price').dataset.basePrice = (basePrice * exchangeRates[currentCurrency]).toFixed(2);
    document.getElementById('modal-price').textContent = convertedPrice;
}

// Show payment modal
function showPaymentOptions() {
    const priceElement = document.querySelector('.price');
    document.getElementById('modal-price').textContent = priceElement.textContent;
    document.getElementById('payment-modal').style.display = 'block';
}

// Close modal
function closeModal() {
    document.getElementById('payment-modal').style.display = 'none';
}

// Process payment
function processPayment(method) {
    const productName = "Organic Palm Oil (500ml)";
    const price = document.querySelector('.price').dataset.basePrice;
    
    if (method === 'paypal') {
        // Replace with your actual PayPal payment link
        alert(`Redirecting to PayPal to complete your purchase of ${productName} for ${price} ${currentCurrency}`);
        
        // Example PayPal link (replace with your actual PayPal button code)
        // window.location.href = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=YOUR_PAYPAL_EMAIL&item_name=${encodeURIComponent(productName)}&amount=${price}&currency_code=${currentCurrency}`;
    } else if (method === 'blik') {
        // BLIK payment processing
        if (currentCurrency !== 'PLN') {
            alert('BLIK payments are only available for PLN currency. Please switch to PLN or use PayPal.');
            return;
        }
        
        // In a real implementation, this would connect to your BLIK payment processor
        const blikCode = prompt("Please enter your 6-digit BLIK code:");
        if (blikCode && blikCode.length === 6 && !isNaN(blikCode)) {
            alert(`BLIK payment of ${price} PLN initiated with code ${blikCode}. Thank you for your purchase!`);
            closeModal();
        } else {
            alert("Invalid BLIK code. Please enter a 6-digit number.");
        }
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('payment-modal');
    if (event.target === modal) {
        closeModal();
    }
}

// Initialize currency on page load
document.addEventListener('DOMContentLoaded', function() {
    // Try to detect user's location for default currency
    if (navigator.language) {
        const lang = navigator.language.toUpperCase();
        if (lang.includes('PL')) {
            document.getElementById('currency-selector').value = 'PLN';
            currentCurrency = 'PLN';
        } else if (lang.includes('GB')) {
            document.getElementById('currency-selector').value = 'GBP';
            currentCurrency = 'GBP';
        } else if (lang.includes('EU')) {
            document.getElementById('currency-selector').value = 'EUR';
            currentCurrency = 'EUR';
        } else if (lang.includes('NG')) {
            document.getElementById('currency-selector').value = 'NGN';
            currentCurrency = 'NGN';
        }
    }
    updatePrices();
});