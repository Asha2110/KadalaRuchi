  let products = [
    {item:"Fish_Meals", price:150},
    {item:"Fish_TawaFry", price:220},
    {item:"Chicken_Biryani", price:180},
    {item:"NeerDosa_ChickenSukka", price:140},
    {item:"Chicken_Sukka", price:170},
    {item:"Chicken_Kabab", price:150},
  ];
  let cart = [];

  window.addToCart = function (item, price) {
    // Check if item already exsist
    let existing = cart.find(c => c.item === item);
    if (existing){
      existing.quantity += 1; //increase quantity
    }
    else {
      cart.push({ item, price, quantity: 1});
    }
    renderCart();
  }

  function renderCart() {
    const cartDiv = document.getElementById('cartItems');
    const totalSpan = document.getElementById('cartTotal');
    cartDiv.innerHTML = '';
    let total = 0;

    cart.forEach((c, i) => {
      total += c.price * c.quantity;
      cartDiv.innerHTML +=`<p>${i+1}. ${c.item} x ${c.quantity} = ₹${c.price * c.quantity}
      <button onclick="changeQuantity(${i},-1)">-</button>
      <button onclick="changeQuantity(${i},+1)">+</button></p>`;
    });

    totalSpan.textContent = total;
  }
  window.changeQuantity = function (index, delta){
    cart[index].quantity += delta;
    //Remove item if quantity becomes 0
    if(cart[index].quantity <= 0){
      cart.splice(index, 1);
    }
    renderCart();
  }

  window.placeOrder = function () {
    if(cart.length === 0) {
      alert('Cart is empty');
      return;
    }
    let message = 'Hello Kadala Ruchi,%0AOrder Details:%0A';
    cart.forEach((c, i) => {
      message +=`${i+1}. ${c.item} x ${c.quantity} = ₹${c.price * c.quantity}%0A`;
    });
    message +=`%0ATotal: ₹${document.getElementById('cartTotal').textContent}`;

    window.open(`https://wa.me/918970699527?text=${message}`, '_blank');
  }

