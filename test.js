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
let main, cartPage, order, message, form
const body = document.querySelector('body');


// show main page cards
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
            button.classList.add('added_cart');
            button.classList.remove('add_cart');
            button.innerHTML = 'Added to bag';

            // button.innerHTML = 'Remove';
            // button.classList.add('delete_book');
            // button.classList.remove('add_cart');
        }
    }) 
}


// create page's elements
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

const formContainer = document.createElement('div');
formContainer.classList.add('form_container');

const submitMessage = document.createElement('div');
submitMessage.classList.add('submit_message');


// toggle pages
function showPage(page) {
    mainPageContainer.classList.remove('container-show-grid');
    cartPageContainer.classList.remove('container-show-grid');
    formContainer.classList.remove('container-show-grid');
    submitMessage.classList.remove('container-show-grid');
    page.classList.add('container-show-grid');
    // if (cartPage) {
    //     mainPageContainer.classList.add('container-show-grid');
    // }
    // else if (page === cartPage) {
    //     console.log('and here')
    //     cartPageContainer.classList.add('container-show-grid');
    // }
    // else if (page === form) {
    //     formContainer.classList.add('container-show-grid');
    // }
    // else if (page === message) {
    //     submitMessage.classList.add('container-show-grid');
    // }
}


// create content for all container
function buildPage () {
    mainPage().then(data => {
        showDataMain(data);
    });

    body.append(headerContainer, mainPageContainer, cartPageContainer, modalContainer, formContainer, submitMessage, footerContainer);
    // formContainer.after(footerContainer);
    // submitMessage.after(footerContainer);
    headerContainer.innerHTML = `
    <h1 class="page_title">Books shop</h1>
    <button class="main_cart"><span class="books_for_order">${booksForOrder}</span><i class='bx bx-cart'></i></button>
    <button class="total_price">Total:<span class="total_price_count">${priceForBooks}$</span></button>
    <div class="card_buttons">
    <button class="item__button return_main" type="button">Return to catalog</button>
    <button class="item__button order_form" type="button">Confirm Order</button>
    </div>
    `

    footerContainer.innerHTML = `
    <a class="footer-link" href="https://github.com/anromanova" target="_blank" title="anromanova">github</a>
    <div class="footer_content">2022</div>
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

    const cart = document.querySelector('.main_cart');
    cart.onclick = () => {
        if (cartArr.length > 0){
            showPage(cartPageContainer);
            console.log('here')
            showDataCart(cartArr);
            // openCartPage ();
        }
        else {
            alert('add books to cart')
        }
    } 
}



// button "learn more and popup"

function openModal(data, index) {
    // why?????????
    const modalCard = document.querySelector('.modal_container');
    let output = '';
        output = `
        <div class="popup_card">
        <p class="author">${data[index].author}</p>
        <p class="title">${data[index].title}</p>
        <p class="description">${data[index].description}</p>
        <button class="item__button close" type="button" book_id=${data[index].id}>Close</button>
        </div>`
        
    modalCard.style.display='block';
    modalCard.innerHTML = output;
    const closePopupButton = document.querySelector('.close');
        closePopupButton.onclick = () => {
            modalCard.style.display='none';
        }
}


// button "add to cart"
let cartArr = [];
function addToCart (data, index) {
    if (!cartArr.includes(data[index])){
        cartArr.push(data[index]);
        booksForOrder = cartArr.length;
        priceForBooks +=data[index].price;
        document.querySelector('.books_for_order').innerHTML = booksForOrder;
    }
    return cartArr, priceForBooks;
}


function openCartPage () {
    // document.querySelector('main_page_container').style.display='none';

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
    cartPageContainer.classList.add('container-show-grid');
    // headerContainer.innerHTML += `
    // <button class="total_price">Total:<span class="total_price_count">${priceForBooks}$</span></button>
    // <div class="card_buttons">
    // <button class="item__button return_main" type="button">Return to catalog</button>
    // <button class="item__button order_form" type="button">Confirm Order</button>
    // </div>
    // `
    showDataCart(cartArr);

    const returnButton = document.querySelector('.return_main');
    returnButton.onclick = () => {
    console.log('yes')
        returnToMain();
    } 

    const confirmButton = document.querySelector('.order_form');
    confirmButton.onclick = () => {
   mainPageContainer.classList.add('container-hide');
   formContainer.classList.add('container-show-grid');
   cartPageContainer.classList.remove('container-show-grid');
   confirmPageOpen()
    } 
}



function returnToMain () {
    mainPageContainer.classList.remove('container-hide');
    mainPageContainer.classList.add('container-show-grid');
    cartPageContainer.classList.remove('container-show-grid');
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
    cartPageContainer.classList.remove('container-show-grid');
    headerContainer.innerHTML = `
    <div>
    <h1 class="page_title">Books shop</h1>
    <div class="card_buttons">
    <button class="item__button return_main" type="button">Return to catalog</button>
    </div>
    </div>
    `

    const submitButton = document.querySelector('.submit_button');
    submitButton.onclick = (e) => {
        e.preventDefault();
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
if (resultData.name && resultData.name.length > 5 && resultData.surname && resultData.surname.length > 5 && resultData.login && resultData.login.length > 5) {
    document.querySelector('.submit_button').removeAttribute('disabled')
}
else {
    document.querySelector('.submit_button').disabled = true;
}
}


// load page for the first time
window.addEventListener('load', () => {
    buildPage();
    showPage(mainPageContainer);
} );



// cards.forEach((card, index) => {
//     card.ondragstart = (e) => {
//         showDrag(data, index);
//         e.target.style.cursor = 'grab';
//     }
//     card.ondragend = (e) => {
//         stopDrag();
//         e.target.style.cursor = 'pointer';
//         if ( e.target.className == "main_cart" ) {
//             addToCart(data, index);
//         }

//     }
//     card.ondragenter = (e) => {
//         if (cart) {
//             console.log('here2')
//             addToCart(data, index);
//         }
//     }
//     cart.ondrop = (e) => {
//         e.target.style.border = '5px dotted #e63946';
//         if ( e.target.className == "main_cart" ) {
//             console.log('here')
//             addToCart(data, index);
//         }
//         e.target.style.cursor = 'grab';
//     }
// }) 


