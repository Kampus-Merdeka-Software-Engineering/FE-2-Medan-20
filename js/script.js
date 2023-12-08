'use strict';

/**
 * navbar toggle
 */

const overlay = document.querySelector("[data-overlay]");
const navOpenBtn = document.querySelector("[data-nav-open-btn]");
const navbar = document.querySelector("[data-navbar]");
const navCloseBtn = document.querySelector("[data-nav-close-btn]");
const navLinks = document.querySelectorAll("[data-nav-link]");

const navElemArr = [navOpenBtn, navCloseBtn, overlay];



/**
 * header sticky & go to top
 */

const header = document.querySelector("[data-header]");
const goTopBtn = document.querySelector("[data-go-top]");

window.addEventListener("scroll", function () {

  if (window.scrollY >= 200) {
    header.classList.add("active");
    goTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    goTopBtn.classList.remove("active");
  }

});

/* BNTR */
document.addEventListener('DOMContentLoaded', function() {
  const container = document.getElementById('productContainer');
  const btnLeft = document.getElementById('scrollLeft');
  const btnRight = document.getElementById('scrollRight');

  btnRight.addEventListener('click', function() {
    // Scroll right
    container.scrollBy({ left: 300, behavior: 'smooth' });
  });

  btnLeft.addEventListener('click', function() {
    // Scroll left
    container.scrollBy({ left: -300, behavior: 'smooth' });
  });
});

// GET DATA PRODUCT FROM SERVER
const API_URL = 'http://localhost:5000'
const sectionElement = document.getElementById('product-section')

const getProducts = async() =>{
  try {
    const productResponse = await fetch(`${API_URL}/product`, {method: 'GET'})
    const productData = await productResponse.json()

    console.log(productData)
    return productData
  } catch (error) {
    console.error({
      error
    })
  }
} 

const appendProductToProductSection = (product) =>{
  const productHTMLElement = document.createElement('div')
  productHTMLElement.className = 'product-card'

  productHTMLElement.innerHTML = `
  <div class="product-image" style="background-image: url('${API_URL}${product.product_picture}');"></div>
  <div class="product-title">${product.name}</div>
  <div class="product-price">${product.price}</div>
  <div class="quantity-controls">
    <button class="decrement blue-button">-</button>
        <span class="quantity">0</span>
    <button class="increment blue-button">+</button>
  </div
  `
  sectionElement.appendChild(productHTMLElement)
}

document.addEventListener('DOMContentLoaded', async() => {
  try {
    const product = await getProducts()
    product.forEach(appendProductToProductSection)
  } catch (error) {
    console.error({
      error
    })
  }
})

// OUR PRODUCT
document.addEventListener(function () {
  const productCards = document.querySelectorAll('.product-card');
  const orderNowButton = document.getElementById('order-now');  

  productCards.forEach(function (card) {
    const incrementButton = card.querySelector('.increment');
    const decrementButton = card.querySelector('.decrement');
    const quantityElement = card.querySelector('.quantity');

    let totalItems = 0;

    incrementButton.addEventListener('click', function () {
      totalItems++;
      updateQuantity();
    });

    decrementButton.addEventListener('click', function () {
      if (totalItems > 0) {
        totalItems--;
        updateQuantity();
      }
    });

    function updateQuantity() {
      quantityElement.textContent = totalItems;
    }
  });

  orderNowButton.addEventListener('click', function () {
    let totalPrice = 0;

    productCards.forEach(function (card) {
      const price = parseFloat(card.getAttribute('data-price'));
      const quantity = parseInt(card.querySelector('.quantity').textContent);
      totalPrice += price * quantity;
    });

    window.location.href = `order.html?total=${totalPrice.toFixed(2)}`;
  });
});



// PAGE ORDER
document.getElementById('order-form').addEventListener('submit', function(event) {
  event.preventDefault();

  var name = document.getElementById('name').value;
  var phone = document.getElementById('phone').value;
  var address = document.getElementById('address').value;

  var selectedProduct = '';

  document.getElementById('food-item').innerText = selectedProduct;

  alert('Order created successfully!\n\nDetails:\nName: ' + name + '\nPhone: ' + phone + '\nAddress: ' + address + '\nProduct: ' + selectedProduct);
});

document.addEventListener('DOMContentLoaded', function() {
  const params = new URLSearchParams(window.location.search);
  const name = params.get('name');
  const phone = params.get('phone');
  const address = params.get('address');
  const product = params.get('product');

  // Menampilkan informasi pesanan
  document.getElementById('order-info-name').innerText = name;
  document.getElementById('order-info-phone').innerText = phone;
  document.getElementById('order-info-address').innerText = address;
  document.getElementById('order-info-product').innerText = product;
});


// Untuk button click

function redirectToOrderPage() {
  window.location.href = "cart.html";
}