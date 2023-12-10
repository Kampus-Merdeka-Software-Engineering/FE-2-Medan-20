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
const API_URL = 'https://be-2-medan-20-production.up.railway.app'
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
document.addEventListener('DOMContentLoaded', function () {
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

    window.location.href = "order.html" ;
  });
});

// POST ORDER TO SERVER
document.getElementById('order-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the form from submitting in the traditional way

  // Get form values
  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  const address = document.getElementById('address').value;

  // Create an object with the form data
  const formData = {
    orderId: 1,
    name: name,
    phone: phone,
    address: address
  };

  // Send the form data to the server using fetch
  fetch('https://be-2-medan-20-production.up.railway.app/place-order', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      // Reset the form if needed
      const form = document.getElementById('order-form');
      if (form) {
        form.reset();
      }
      alert(data.message);
    })
    .catch(error => {
      console.error('Error:', error);
    });
});


// GET DATA ORDERDETAILS FROM SERVER
const detailElement = document.getElementById("order-details")
const getOrderDetails = async() =>{
  try {
    const orderDetailResponse = await fetch(`${API_URL}/view-order-detail/1`, {method: 'GET'})
    const orderDetailData = await orderDetailResponse.json()

    console.log(orderDetailData)
    return orderDetailData
  } catch (error) {
    console.error({
      error
    })
  }
} 

const appendOrderToOrderDetails = (orderDetails) =>{
  const orderDetailHTMLElement = document.createElement('table')
  orderDetailHTMLElement.className = 'order-table'

  orderDetailHTMLElement.innerHTML = `
      <tr>
          <th colspan="2">Customer Details</th>
      </tr>
      <tr>
          <td><strong>Name:</strong></td>
          <td><span>${orderDetails.name}</span></td>
      </tr>
      <tr>
          <td><strong>Phone:</strong></td>
          <td><span>${orderDetails.phone}</span></td>
      </tr>
      <tr>
          <td><strong>Address:</strong></td>
          <td><span>${orderDetails.address}</span></td>
      </tr>
      <tr>
          <td><strong>Product:</strong></td>
          <td><span>${orderDetails.product}</span></td>
      </tr>
      <tr>
          <th colspan="2">Total Price</th>
      </tr>
      <tr>
          <td colspan="2"><strong>$ <span>${orderDetails.total_price}</span></strong></td>
      </tr>
  `
  detailElement.appendChild(orderDetailHTMLElement)
}

document.addEventListener('DOMContentLoaded', async() => {
  try {
    const orderDetail = await getOrderDetails()
    orderDetail.forEach(appendOrderToOrderDetails)
  } catch (error) {
    console.error({
      error
    })
  }
})


// GET DATA ORDER FROM SERVER
const orderElement = document.getElementById("food-item")
const getOrder = async() =>{
  try {
    const orderResponse = await fetch(`${API_URL}/view-order/1`, {method: 'GET'})
    const orderData = await orderResponse.json()

    console.log(orderData)
    return orderData
  } catch (error) {
    console.error({
      error
    })
  }
} 

const appendOrder = (orders) =>{
  const orderHTMLElement = document.createElement('p')
  orderHTMLElement.innerHTML = `
      <p><strong>Product:</strong><span>${orders.orderItems.product}</span></p>
  `
  orderElement.appendChild(orderHTMLElement)
}

document.addEventListener('DOMContentLoaded', async() => {
  try {
    const order = await getOrder()
    order.forEach(appendOrder)
  } catch (error) {
    console.error({
      error
    })
  }
})