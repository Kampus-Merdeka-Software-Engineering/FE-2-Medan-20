// SECTION HOME
let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}

// SECTION ORDER

// Mendapatkan semua elemen tombol decrement dan increment
const decrementButtons = document.querySelectorAll('.decrement');
const incrementButtons = document.querySelectorAll('.increment');

// Mendapatkan semua elemen span yang menampilkan nilai kuantitas
const quantityValues = document.querySelectorAll('.quantity-value');

// Mengatur tindakan saat tombol decrement diklik
decrementButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        const currentValue = parseInt(quantityValues[index].textContent, 10);
        if (currentValue > 0) {
            quantityValues[index].textContent = currentValue - 1;
            updateTotalPrice();
        }
    });
});

// Mengatur tindakan saat tombol increment diklik
incrementButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        const currentValue = parseInt(quantityValues[index].textContent, 10);
        quantityValues[index].textContent = currentValue + 1;
        updateTotalPrice();
    });
});

// Menghitung total harga pesanan
function updateTotalPrice() {
    const prices = [22000, 16000, 20000, 24000, 30000, 27000, 10000, 16000, 16000];
    let totalPrice = 0;

    for (let i = 0; i < quantityValues.length; i++) {
        const quantity = parseInt(quantityValues[i].textContent, 10);
        totalPrice += quantity * prices[i];
    }

    document.getElementById('total-price').textContent = `Rp ${totalPrice}`;
}

// Mengatur tindakan saat tombol "Order Now" diklik
document.getElementById('order-button-page').addEventListener('click', () => {
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const foodItem = document.getElementById('food-item').textContent;

    // Tampilkan informasi pesanan
    alert(`Order Summary:\nName: ${name}\nPhone Number: ${phone}\nAddress: ${address}\nFood Item: ${foodItem}`);

    // Reset nilai input setelah pesanan dibuat
    document.getElementById('name').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('address').value = '';

    // Clear food item info
    document.getElementById('food-item').textContent = '';

    // Reset total price
    document.getElementById('total-price').textContent = 'Rp 0';
});

// Fungsi untuk mengarahkan ke halaman "cart"
function redirectToCart() {
    // Ganti 'cart.html' dengan URL halaman "cart" yang sesuai
    window.location.href = 'cart.html';
}

/* catatan: membuat 2 file js untuk event listener order now dan contact us

// Mengatur tindakan saat tombol "Order Now" diklik
document.getElementById('order-button').addEventListener('click', () => {
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const totalPrice = document.getElementById('total-price').textContent;
    const foodItem = document.getElementById('food-item').textContent;

    // Tampilkan informasi pesanan (hanya Food Item dan Total Price)
    console.log(`Order Summary:\nFood Item: ${foodItem}\nTotal Order: ${totalPrice}`);

    // Reset nilai kuantitas setelah pesanan dibuat
    quantityValues.forEach((value) => {
        value.textContent = '0';
    });
    updateTotalPrice();
});

*/

// SECTION CONTACT US
const contactForm = document.getElementById('contact-form');

// Tambahkan event listener untuk meng-handle saat formulir dikirim (event "submit")
contactForm.addEventListener('submit', function(event) {
    contactForm.reset();
    alert('Your message has been sent!');
    event.preventDefault();
});


// SECTION CART
// Menyimpan hasil
const urlParams = new URLSearchParams(window.location.search);
const name = urlParams.get('name');
const phone = urlParams.get('phone');
const address = urlParams.get('address');
const totalPrice = urlParams.get('totalPrice');

// Mengisi elemen HTML dengan data yang diterima
document.getElementById('name').textContent = name;
document.getElementById('phone').textContent = phone;
document.getElementById('address').textContent = address;
document.getElementById('total-price').textContent = totalPrice;

// Mengambil daftar item makanan dari URL
const foodItems = urlParams.getAll('foodItem');
const foodItemsList = document.getElementById('food-items');
foodItems.forEach((item) => {
    const listItem = document.createElement('li');
    listItem.textContent = item;
    foodItemsList.appendChild(listItem);
});