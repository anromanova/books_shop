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

    mainPageContainer.classList.add('main_page_container-hide');
    cartPageContainer.classList.add('cart_page_container-show');
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
    // showDataMain(books);
    // buildPage ();
    } 

    const confirmButton = document.querySelector('.order_form');
    confirmButton.onclick = () => {
        console.log('order');
        confirmPageOpen();
    } 
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

    const formContainer = document.createElement('div');
    formContainer.classList.add('form_container');
    body.append(formContainer);
    formContainer.after(footerContainer);

}
