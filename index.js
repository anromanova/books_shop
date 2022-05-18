'use strict'

// get data from json

function mainPage() {
    return fetch('./books.json')
    .then(response => {
        return response.json();
    })
    .then(data => {
        let books = data.map((item, index) => ({...item, id: index}));
        console.log(books);
        return books;
    });
}

let booksForOrder = 0;
let priceForBooks = 0;

// show page content
const body = document.querySelector('body');

function showDataMain(data) {
    let output = '';
    for (let item of data) {
        output += `
        <div class="book_card">
        <img src="${item.imageLink}" alt="">
        <p class="author">${item.author}</p>
        <p class="title">${item.title}</p>
        <p class="price">${item.price}$</p>
        <div class="card_buttons">
        <button class="item__button learn" type="button" book_id=${item.id}>Learn more</button>
        <button class="item__button add_cart" type="button" book_id=${item.id}>Add to bag  <i class='bx bx-cart'></i></button></div>
        </div>`
    }
    
    document.querySelector('.main_page_container').innerHTML = output;
    
    const learnButton = document.querySelectorAll('.learn');
    learnButton.forEach((button, index) => {
        button.onclick = () => {
            openModal(data, index);
        }
    })

    const cartButton = document.querySelectorAll('.add_cart');
    cartButton.forEach((button, index) => {
        button.onclick = () => {
            addToCart(data, index);
        }
    }) 

    // return learnButton;
}

const headerContainer = document.createElement('header');
headerContainer.classList.add('header_container');
const mainPageContainer = document.createElement('div');
mainPageContainer.classList.add('main_page_container');
const cartPageContainer = document.createElement('div');
cartPageContainer.classList.add('cart_page_container');
const modalContainer = document.createElement('div');
modalContainer.classList.add('modal_container');
const footerContainer = document.createElement('div');
footerContainer.classList.add('footer_container');

function buildPage () {
    mainPage().then(data => {
        showDataMain(data);
    });

    body.append(headerContainer, mainPageContainer, cartPageContainer, modalContainer, footerContainer);
    headerContainer.innerHTML = `
    <h1 class="page_title">Books shop</h1>
    <button class="main_cart"><span class="books_for_order">${booksForOrder}</span><i class='bx bx-cart'></i></button>
    `
    footerContainer.innerHTML = `
    <a class="footer-link" href="https://github.com/anromanova" target="_blank" title="anromanova">github</a>
    <div class="footer_content">2022</div>
    `
    // cartPageContainer.innerHTML = `
    // <div class="card_buttons">
    // <button class="item__button return_main" type="button">Return to catalog</button>
    // <button class="item__button order_form" type="button">Order</button>
    // </div>
    // `
}

window.addEventListener('load', buildPage());


// button "learn more and popup"

function openModal(data, index) {
    let output = '';
        output = `
        <div class="popup_card">
        <p class="author">${data[index].author}</p>
        <p class="title">${data[index].title}</p>
        <p class="description">${data[index].description}</p>
        <button class="item__button close" type="button" book_id=${data[index].id}>Close</button>
        </div>`
        
    document.querySelector('.modal_container').style.display='block';
    document.querySelector('.modal_container').innerHTML = output;
    const closePopupButton = document.querySelector('.close');
        closePopupButton.onclick = () => {
            document.querySelector('.modal_container').style.display='none';
        }
}


// button "add to cart"
let cartArr = [];
function addToCart (data, index) {
    if (!cartArr.includes(data[index])){
        cartArr.push(data[index]);
        console.log(cartArr);
        booksForOrder = cartArr.length;
        priceForBooks +=data[index].price;
        console.log(priceForBooks);
        document.querySelector('.books_for_order').innerHTML = booksForOrder;
    }
    return cartArr, priceForBooks;
}

const cart = document.querySelector('.main_cart');
cart.onclick = () => {
    if (cartArr.length > 0){
        openCartPage();
    }
    else {
        alert('add books to cart')
    }
} 

function openCartPage () {
    // document.querySelector('main_page_container').style.display='none';
    // mainPageContainer.remove();
    // body.append(cartPageContainer);
    if (cartArr.length === 0) {
        const emptyCart = document.createElement('div');
        emptyCart.classList.add('empty_cart');
        emptyCart .innerHTML = `
        <div class="main_cart">Your cart is empty</div>
        `
        body.append(emptyCart);
        emptyCart.after(footerContainer);
        priceForBooks = 0;
    }

    mainPageContainer.classList.add('container-hide');
    cartPageContainer.classList.add('container-show');
    headerContainer.innerHTML += `
    <button class="total_price">Total:<span class="total_price_count">${priceForBooks}$</span></button>
    <div class="card_buttons">
    <button class="item__button return_main" type="button">Return to catalog</button>
    <button class="item__button order_form" type="button">Confirm Order</button>
    </div>
    `
    showDataCart(cartArr);

    const returnButton = document.querySelector('.return_main');
    returnButton.onclick = () => {
    console.log('yes')
        returnToMain();
    } 

    const confirmButton = document.querySelector('.order_form');
    confirmButton.onclick = () => {
   mainPageContainer.classList.add('container-hide');
   formContainer.classList.add('container-show');
   cartPageContainer.classList.remove('container-show');
   confirmPageOpen()
    } 
}

function returnToMain () {
    mainPageContainer.classList.remove('container-hide');
    mainPageContainer.classList.add('container-show');
    cartPageContainer.classList.remove('container-show');
}

function showDataCart(data) {
    let output = '';
    for (let item of data) {
        output += `
        <div class="book_card">
        <img src="${item.imageLink}" alt="">
        <p class="author">${item.author}</p>
        <p class="title">${item.title}</p>
        <div class="card_buttons">
        <button class="item__button delete_book" type="button" book_id=${item.id}>Remove</button>
        </div>
        </div>`
    }

    document.querySelector('.cart_page_container').innerHTML = output;
    document.querySelector('.total_price_count').innerHTML = `${priceForBooks}$`;

    const removeButton = document.querySelectorAll('.delete_book');
    removeButton.forEach((button, index) => {
        button.onclick = () => {
            removeBook(index);
        }
    }) 
}


// remove book from order 

function removeBook (index) {
    if (priceForBooks !== 0){
        priceForBooks -= cartArr[index].price;
        document.querySelector('.total_price_count').innerHTML = `${priceForBooks}$`;
    }
        cartArr.splice(cartArr[index], 1);
        console.log(cartArr);
        booksForOrder = cartArr.length;
        document.querySelector('.books_for_order').innerHTML = booksForOrder;
        showDataCart(cartArr);

        if (cartArr.length === 0) {
            const emptyCart = document.createElement('div');
            emptyCart.classList.add('empty_cart');
            emptyCart .innerHTML = `
            <div class="main_cart">Your cart is empty</div>
            `
            body.append(emptyCart);
            emptyCart.after(footerContainer);
            priceForBooks = 0;
        }

    return cartArr, priceForBooks;
}


// form page

const formContainer = document.createElement('div');
formContainer.classList.add('form_container');
body.append(formContainer);
formContainer.after(footerContainer);
const submitMessage = document.createElement('div');
submitMessage.classList.add('submit_message');
body.append(submitMessage);
submitMessage.after(footerContainer);


function confirmPageOpen() {
    cartPageContainer.classList.remove('cart_page_container-show');
    headerContainer.innerHTML = `
    <div>
    <h1 class="page_title">Books shop</h1>
    <div class="card_buttons">
    <button class="item__button return_main" type="button">Return to catalog</button>
    </div>
    </div>
    `

    formContainer.innerHTML = `
    <form
    class="confirm_form"
    action=""
    method="post"
  >
    <div class="form-content">
      <div class="form-field">
        <label class="form-field-label" for="user-name">Your name:</label>
        <input
          class="form-field-input"
          id="user-name"
          type="text"
          name="name"
          placeholder="Name"
          pattern="^[A-Za-zА-Яа-яЁё\s]+$"
        />
      </div>
      <div class="form-field">
        <label class="form-field-label" for="user-surname">Your surname:</label>
        <input
          class="form-field-input"
          id="user-surname"
          type="text"
          name="surname"
          placeholder="Surname"
          pattern="^[A-Za-zА-Яа-яЁё\s]+$"
        />
      </div>
      <div class="form-field">
        <label class="form-field-label" for="user-email">Your e-mail:</label>
        <input
          class="form-field-input"
          id="user-email"
          type="email"
          name="login"
          placeholder="email@example.com"
        />
      </div>
      
      <button class="button submit_button" type="submit" disabled>Complete</button>
    </div>
  </form>
    `

    const submitButton = document.querySelector('.submit_button');
    submitButton.onclick = (e) => {
        // e.preventDefault();
        console.log('submit');
        submitMessageShow();
        collectUserData();
    } 
    const your_name = document.querySelector('[name="name"]');
    const surname = document.querySelector('[name="surname"]');
    const email = document.querySelector('[name="login"]')
    
    your_name.addEventListener('input', onInputChanged)
surname.addEventListener('input', onInputChanged)
email.addEventListener('input', onInputChanged)
}

function submitMessageShow() {
    formContainer.remove();

    submitMessage.innerHTML = `
    <div>${resultData.name}</div>
    <div>${resultData.surname}</div>
    <div>${resultData.login}</div>
    `
}

const resultData ={};

function onInputChanged (event) {
resultData[event.target.name]= event.target.value
console.log(resultData);
validate();
}

function validate() {
if (resultData.name.length > 5 && resultData.surname.length > 5 && resultData.login.length > 5) {
    document.querySelector('.submit_button').removeAttribute('disabled')
}
else {
    document.querySelector('.submit_button').disabled = true;
}
}