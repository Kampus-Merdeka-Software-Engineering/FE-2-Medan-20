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
        }
    });
});

// Mengatur tindakan saat tombol increment diklik
incrementButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        const currentValue = parseInt(quantityValues[index].textContent, 10);
        quantityValues[index].textContent = currentValue + 1;
    });
});

// SECTION CONTACT US

// Ambil formulir dengan id "contact-form"
const contactForm = document.getElementById('contact-form');

// Ambil tombol "Send Message" dengan id
const sendButton = document.getElementById('send-button');

// Tambahkan event listener untuk meng-handle klik pada tombol
sendButton.addEventListener('click', function() {
    // Reset formulir ke keadaan awal (kosongkan isian)
    contactForm.reset();

    // Tampilkan pesan pop-up
    alert('Your message has been sent!');

    // Berhenti menjalankan aksi bawaan dari tombol submit (tidak akan mengirimkan data)
    event.preventDefault();
});
