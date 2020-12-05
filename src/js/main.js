class Cart {
  constructor () {
    this.courses = [];
    this.length = 0;
  }

  addCourse(courseId) {
    this.courses.push(courseId);
    this.length++;
    this.updateHandler();
  }

  removeCourse(cartId) {
    this.courses.splice(cartId, 1);
    this.length--;
    this.updateHandler();
  }

  subTotal() {
    let total = 0;
    this.courses.forEach(function(id) {
      const foundCourse = courses.find(course => course.id == id);
      total += foundCourse.price;
    });

    return total.toFixed(2);
  }

  total() {
    return (this.subTotal() * 1.13).toFixed(2);
  }

  renderCart() {
    let i =0;
    cartInner.innerHTML = '';
    popover.innerHTML = `<i class="fas fa-shopping-cart"></i>Cart: ${this.length}`;
    cartNum.innerText  = `You have ${this.length} items in your cart.`
    this.courses.forEach(function(cartCourse){
      const foundCourse = courses.find(course => course.id == cartCourse);
      cartInner.insertAdjacentHTML('afterbegin',  
      `<li data-id="${i}">
        <img src="images/${foundCourse.image}">  
        <div id="cart-title">${foundCourse.title}</div>
        <div id="cart-price">$${foundCourse.price}</div>
        <div id="delete">
          <i class="far fa-times-circle"></i>
        </div>
      </li>`);
      i++;
    });
    cartSubtotal.innerText = `$${this.subTotal()}`;
   cartTotal.innerText = `$${this.total()}`;
  }

  spotsRemaining() {
    for (let course of courses) {
      if (this.courses.filter(id => course.id === id).length == course.availableSpaces) {
        document.querySelector(`[data-course-id="${course.id}"]`).querySelector('#add-to-cart').disabled = true;
      } else  {
        document.querySelector(`[data-course-id="${course.id}"]`).querySelector('#add-to-cart').disabled = false;
      }
    }
  }

  updateHandler() {
    this.renderCart();
    this.spotsRemaining();
  }
} 

const cart = new Cart();

const cartInner = document.querySelector('.cart-inner').querySelector('ul');
const cartNum = document.getElementById('items-in-cart');
const cartSubtotal = document.getElementById('subtotal-amount');
const cartTotal = document.getElementById('total-amount');
const courseList = document.querySelector('.courses');
const popover = document.querySelector('.popover');

cartInner.addEventListener('click', function(e) {
  if (e.target.parentNode.id === 'delete') {
    const li = e.target.parentNode.parentNode;
    cart.removeCourse(li.dataset.id);
  }
});

courseList.addEventListener('click', function(e) {
  if (e.target.id == 'add-to-cart' && e.target) {
    const li = e.target.closest('li');
    cart.addCourse(li.dataset.courseId);
    alert ('Thank you for shopping with us');
  }
});

cart.renderCart();