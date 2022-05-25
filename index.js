'use strict'

// get data from json
function mainPage() {
    return fetch('./books.json')
    .then(response => {
        return response.json();
    })
    .then(data => {
        let books = data.map((item, index) => ({...item, id: index}));
        return books;
    });
}

let booksForOrder = 0;
let priceForBooks = 0;
let cart;
let main, cartPage, order, message, form
const body = document.querySelector('body');


// show main page cards
function showDataMain(data) {
    let output = '';
    for (let item of data) {
        output += `
        <div class="book_card" draggable="true" book_id=${item.id}>
        <img src="${item.imageLink}" alt="">
        <p class="author">${item.author}</p>
        <p class="title">${item.title}</p>
        <p class="price">${item.price}$</p>
        <div class="card_buttons">
        <button class="item__button learn" type="button" book_id=${item.id}>Learn more</button>
        <button class="item__button add_cart" type="button" book_id=${item.id}>Add to bag  <i class='bx bx-cart'></i></button></div>
        <div class="book_overlay">
        <h2>Added to basket</h2>
      </div>
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


    const cards = document.querySelectorAll('.book_card');
    const cart = document.querySelector('.main_cart');
    const cardsField = document.querySelector('mainPageContainer');
    // mainPageContainer


    cards.forEach((card, index) => {
    function drag(e) {
        e.dataTransfer.setData('id', e.target.id)
    }
    function drop(e) {
        let itemId = e.dataTransfer.getData('id');
        console.log(itemId)
        e.dataTransfer.setData('id', e.target.id)
    }

    card.ondragstart = (e) => {
        drag(e);
        showDrag();
        e.target.style.cursor = 'grab';
    }

    card.ondragend = (e) => {
        stopDrag();
        drop(e);
        if (card) {
            addToCart(data, index);
        }
        e.target.style.cursor = 'pointer';
    }

    cart.ondragover = (e) => {
        e.preventDefault();
    }

    cart.ondrop = (e) => {
        // drop(e)
                // if ( e.target.className == "main_cart" ) {
                    // addToCart(data, index);
                e.target.style.cursor = 'grab';
            }

    // cart.ondragenter = (e) => {
    //         console.log(card)
    //         addToCart(data, index);
    //     }
    })
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

const emptyCart = document.createElement('div');
emptyCart.classList.add('empty_cart');



// create content for all container
function buildPage () {
    mainPage().then(data => {
        showDataMain(data);
    });

    body.append(headerContainer, mainPageContainer, cartPageContainer, modalContainer, formContainer, submitMessage, emptyCart, footerContainer);

    emptyCart.innerHTML = `
    <div class="empty">Your cart is empty</div>`

    headerContainer.innerHTML = `
    <h1 class="page_title">Books<br>Shop<span>.</span></h1>
    <div class="header_buttons">
    <button class="navigation__button return_main" type="button">Return to catalog</button>
    <button class="navigation__button order_form" type="button">Confirm Order</button>
    </div>
    <div class="cart_items">
    <button class="total_price">Total: <span class="total_price_count">${priceForBooks}$</span></button>
    <button class="main_cart"><span class="books_for_order">${booksForOrder}</span><i class='bx bx-cart'></i></button>
    </div>
    `

    footerContainer.innerHTML = `
    <a class="footer-link" href="https://github.com/anromanova" target="_blank" title="anromanova">github</a>
    <div class="footer_content">2022</div>
    `

    formContainer.innerHTML = `
    <form class="confirm_form" action="" method="post">
    <h2>Oder form</h2>
    <fieldset class="form-fieldset">
      <legend class="legend-title">Customer details*</legend>

      <div class="form-field">
        <label class="form-field-label" for="user-name">Name:*</label>
        <input
          class="form-field-input"
          id="user-name"
          type="text"
          name="name"
          placeholder="not less than 4 symbols"
          minlength="4"
          title="mandatory, not less than 4 symbols"
          pattern="^[A-Za-zА-Яа-яЁё\s]+$"
          required
        />
      </div>

      <div class="form-field">
        <label class="form-field-label" for="user-surname">Surname:*</label>
        <input
          class="form-field-input"
          id="user-surname"
          type="text"
          name="surname"
          minlength="5"
          placeholder="not less than 5 symbols"
          title="mandatory, not less than 5 symbols"
          pattern="^[A-Za-zА-Яа-яЁё\s]+$"
          required
        />
      </div>

      <div class="form-field">
        <label class="form-field-label" for="delivery-date"
          >Delivery date:*</label
        >
        <input
          class="form-field-input"
          id="delivery-date"
          type="date"
          name="date"
          placeholder="date"
          title="mandatory"
          required
        />
      </div>

      <div class="form-field">
        <label class="form-field-label" for="user-street">Street:*</label>
        <input
          class="form-field-input"
          id="user-street"
          type="text"
          name="street"
          minlength="5"
          placeholder="not less than 5 symbols"
          title="mandatory, not less than 5 symbols"
          required
        />
      </div>

      <div class="form-field">
        <label class="form-field-label" for="user-house"
          >House number:*</label
        >
        <input
          class="form-field-input"
          id="user-house"
          type="number"
          name="house"
          placeholder="numbers only"
          pattern="^[1-9]+[0-9]*$"
          title="mandatory, numbers only"
          required
        />
      </div>

      <div class="form-field">
        <label class="form-field-label" for="user-flat">Flat number:*</label>
        <input
          class="form-field-input"
          id="user-flat"
          type="number"
          name="flat"
          placeholder="numbers only"
          pattern="^[-1-9–]+[-0-9–]*$"
          title="mandatory, numbers only"
          required
        />
      </div>
    </fieldset>

    <fieldset class="form-fieldset radio-field">
      <legend class="legend-title">Payment Type:*</legend>
      <div class="form-item">
        <input
          class="filter-input-radio visually-hidden"
          type="radio"
          name="payment"
          value="card"
          id="card"
        />
        <label for="card">Card</label>
      </div>

      <div class="form-item">
        <input
          class="filter-input-radio visually-hidden"
          type="radio"
          name="payment"
          value="cash"
          id="cash"
        />
        <label for="cash">Cash</label>
      </div>
    </fieldset>

    <fieldset class="form-fieldset gifts-field">
      <legend class="legend-title">Choose 2 Gifts:</legend>

      <div class="form-item">
        <input
          class="filter-input-checkbox visually-hidden"
          type="checkbox"
          name="gift"
          id="gift-pack"
        />
        <label for="gift-pack">Pack as a gift</label>
      </div>

      <div class="form-item">
        <input
          class="filter-input-checkbox visually-hidden"
          type="checkbox"
          name="gift"
          id="gift-postcard"
        />
        <label for="gift-postcard">Add postcard</label>
      </div>

      <div class="form-item">
        <input
          class="filter-input-checkbox visually-hidden"
          type="checkbox"
          name="gift"
          id="gift-discount"
        />
        <label for="gift-discount"
          >Provide 2% discount to the next time</label
        >
      </div>

      <div class="form-item">
        <input
          class="filter-input-checkbox visually-hidden"
          type="checkbox"
          name="gift"
          id="gift-pen"
        />
        <label for="gift-pen">branded pen or pencil</label>
      </div>
    </fieldset>
    <button class="button submit_button" type="submit" disabled>
      Complete
    </button>
  </form>
    `

// Already exist
    cart = document.querySelector('.main_cart');
    cart.onclick = () => {
        if (cartArr.length > 0){
            showPage(cartPageContainer);
            showDataCart(cartArr);
        }
        else {
            alert('add books to cart')
        }
    } 


    const returnButton = document.querySelector('.return_main');
    returnButton.onclick = () => {
        showPage(mainPageContainer);
    } 

    const confirmButton = document.querySelector('.order_form');
    confirmButton.onclick = () => {
        showPage(formContainer);
    } 

    const submitButton = document.querySelector('.submit_button');
    submitButton.onclick = (e) => {
        e.preventDefault();
        submitMessageShow();
    } 

    const yourName = document.querySelector('[name="name"]');
    const surname = document.querySelector('[name="surname"]');
    const date = document.querySelector('[name="date"]');
    const street = document.querySelector('[name="street"]');
    const house = document.querySelector('[name="house"]');
    const flat = document.querySelector('[name="flat"]');
    const fieldPayment = document.querySelector('[name="payment"]');
    const fieldGirts = document.querySelectorAll('[name="gift"]');

    yourName.addEventListener('input', onInputChanged);
    surname.addEventListener('input', onInputChanged);
    date.addEventListener('input', onInputChanged);
    street.addEventListener('input', onInputChanged);
    house.addEventListener('input', onInputChanged);
    flat.addEventListener('input', onInputChanged);
    fieldPayment.addEventListener('input', onInputChanged);
    fieldGirts.forEach(gift=>{
        gift.addEventListener('change', checkGifts)
    })
}



// button "learn more and popup"

function openModal(data, index) {
    // why?????????
    const modalCard = document.querySelector('.modal_container');
    let output = '';
        output = `
        <div class="modal_shadow"></div>
        <div class="popup_card">
        <p class="author">${data[index].author}</p>
        <p class="title">${data[index].title}</p>
        <p class="description">${data[index].description}</p>
        <button class="item__button close" type="button" book_id=${data[index].id}>Close</button>
        </div>`
        
    modalCard.style.display='block';
    modalCard.innerHTML = output;
    body.style.overflowY = 'hidden';
    const closePopupButton = document.querySelector('.close');
        closePopupButton.onclick = () => {
            modalCard.style.display='none';
            body.style.overflowY = 'auto';
        }
}


// button "add to cart"
let cartArr = [];
function addToCart (data, index) {
    index = data[index].id;
    if (!cartArr.includes(data[index])){
        cartArr.push(data[index]);
        booksForOrder = cartArr.length;
        priceForBooks +=data[index].price;
        document.querySelector('.books_for_order').innerHTML = booksForOrder;
        document.querySelector('.total_price_count').innerHTML = `${priceForBooks}$`;
    }
    // cartArr.sort(function(a, b) { 
    //     return a.id - b.id ;
    //   });
    return cartArr, priceForBooks;
}


function showDataCart(data) {
    let output = '';
    for (let item of data) {
        output += `
        <div class="book_card">
        <img src="${item.imageLink}" alt="">
        <p class="author">${item.author}</p>
        <p class="title">${item.title}</p>
        <p class="price">${item.price}$</p>
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


// drag and drop render
function showDrag () {
    document.querySelector('.main_cart').style.border = '2px dotted #e63946';
    document.querySelector('.main_cart').style.borderRadius = '10px';
    cart.style.padding = '20px';
}

function stopDrag () {
    cart.style.border = 'none';
}

// remove book from order 

function removeBook (index) {
    const bookId =cartArr[index].id;
    console.log(cartArr[index].id);
    // add_cart" type="button" book_id=${item.id}

    const addCartButton = document.querySelector(`.main_page_container button.added_cart[book_id="${bookId}"]`);
    console.log(addCartButton)
    addCartButton.classList.remove('added_cart');
    addCartButton.classList.add('add_cart');
    addCartButton.innerHTML = `Add to bag  <i class='bx bx-cart'></i>`;
    priceForBooks -= cartArr[index].price;
    document.querySelector('.total_price_count').innerHTML = `${priceForBooks}$`;

        cartArr.splice(index, 1);
        booksForOrder = cartArr.length;
        document.querySelector('.books_for_order').innerHTML = booksForOrder;

        if (cartArr.length === 0) {
            showPage(emptyCart);
            priceForBooks = 0;
            document.querySelector('.total_price_count').innerHTML = `0$`;
        }
        
        showDataCart(cartArr);

    return cartArr, priceForBooks;
}


function submitMessageShow() {
    showPage(submitMessage);

    submitMessage.innerHTML = `
    <div class="ordered_cart">
    <h2>The order created.</h2>
    <div>Thank you  ${resultData.name} ${resultData.surname}</div>
    <div>We will delivery your books</div>
    <div>${resultData.date}</div>
    <div>to</div>
    <div>${resultData.street} ${resultData.house} ${resultData.flat}</div>
    </div>
    `
}


const resultData ={};

function onInputChanged (event) {
    resultData[event.target.name]= event.target.value;
    validate();
}

// email.validity.valid
// https://developer.mozilla.org/ru/docs/Learn/Forms/Form_validation
function validate() {
    const submitButton = document.querySelector('.submit_button');
    if (resultData.name 
        && resultData.name.length > 4
        && resultData.surname 
        && resultData.surname.length > 5 
        && resultData.date 
        && resultData.street
        && resultData.street.length > 5
        && resultData.house
        && resultData.flat
        && resultData.payment) {
    submitButton.removeAttribute('disabled')
        }
    else {
    submitButton.disabled = true;
    }
}

function checkGifts () {
    const fieldGifts = document.querySelectorAll('.filter-input-checkbox:checked');
    const fieldNotGifts = document.querySelectorAll('.filter-input-checkbox:not(:checked)');

    if (fieldGifts.length === 2){
        fieldNotGifts.forEach(gift => {
            console.log('here')
        gift.style.border = "2px solid #e63946";
        gift.disabled = true})
        alert('only two gifts available');
    }
    else {
        fieldNotGifts.forEach(gift => {
            // gift.classList.add('checkbox-hide')
            gift.disabled = false})
    }
}


function getTodayDay () {
    const dateForm = document.getElementById('delivery-date');
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    if (month < 10) {
        month = `0${month}`
    }
    let day = date.getDate()+ 1;
    dateForm.setAttribute('min', `${year}-${month}-${day}`)
}


// load page for the first time
window.addEventListener('load', () => {
    buildPage();
    showPage(mainPageContainer);
} );


// toggle pages
function showPage(page) {
    mainPageContainer.classList.remove('container-show-grid');
    cartPageContainer.classList.remove('container-show-grid');
    formContainer.classList.remove('container-show-grid');
    submitMessage.classList.remove('container-show-grid');
    emptyCart.classList.remove('container-show-grid');
    page.classList.add('container-show-grid');
    document.querySelector('.return_main').style.display = 'none';
    document.querySelector('.order_form').style.display = 'none'
    document.querySelector('.main_cart').style.cursor = 'pointer';
    if (page === cartPageContainer || page === emptyCart) {
        document.querySelector('.return_main').style.display = 'block';
        document.querySelector('.order_form').style.display = 'block';
        document.querySelector('.main_cart').style.cursor = 'auto';
    }
    else if (page === mainPageContainer) {
        if (cartArr.length > 0) {
        }
    }
    else if (page === formContainer) {
        document.querySelector('.return_main').style.display = 'block';
        document.querySelector('.order_form').style.display = 'none';
        getTodayDay ();
        checkGifts ();

    }
    else if (page === submitMessage) {
        document.querySelector('.order_form').style.display = 'none';
        document.querySelector('.main_cart').style.cursor = 'auto';
        document.querySelector('.return_main').style.display = 'block';
        booksForOrder = 0;
        priceForBooks = 0;
        document.querySelector('.total_price_count').innerHTML = `0$`;
        document.querySelector('.main_cart').innerHTML = `<span class="books_for_order">${booksForOrder}</span><i class='bx bx-cart'></i>`;
        cartArr = [];
    }
}
