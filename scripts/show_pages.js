import { checkGifts } from "./form_validation.js";
export function showPage(page, {mainPageContainer, cartPageContainer, formContainer, submitMessage, emptyCart, cartArr}) {
    let returnButton, confirmButton, submitButton, cart;
    returnButton = document.querySelector('.return_main');
    confirmButton = document.querySelector('.order_form');
    submitButton = document.querySelector('.submit_button');
    cart = document.querySelector('.main_cart');


    mainPageContainer.classList.remove('container-show-grid');
    cartPageContainer.classList.remove('container-show-grid');
    formContainer.classList.remove('container-show-grid');
    submitMessage.classList.remove('container-show-grid');
    emptyCart.classList.remove('container-show-grid');
    page.classList.add('container-show-grid');

    returnButton.style.display = 'none';
    confirmButton.style.display = 'none';
    cart.style.cursor = 'pointer';

    if (page === cartPageContainer) {
        returnButton.style.display = 'block';
        confirmButton.style.display = 'block';
        cart.style.cursor = 'auto';
    }

    else if (page === emptyCart) {
        returnButton.style.display = 'block';
        cart.style.cursor = 'auto';
        confirmButton.style.display = 'none';
    }

    else if (page === formContainer) {
        returnButton.style.display = 'block';
        confirmButton.style.display = 'none';
        getTodayDay ();
        checkGifts ();

    }
    else if (page === submitMessage) {
        confirmButton.style.display = 'none';
        cart.style.cursor = 'auto';
        returnButton.style.display = 'block';
        let booksForOrder = 0;
        document.querySelector('.total_price_count').innerHTML = `0$`;
        cart.innerHTML = `<span class="books_for_order">${booksForOrder}</span><i class='bx bx-cart'></i>`;
        cartArr = [];
        const addedBookButton = document.querySelectorAll('.added_cart');
            addedBookButton.forEach((button) => {
                    button.classList.remove('added_cart');
                    button.classList.add('add_cart');
                    addedBookButton.innerHTML = `Add to bag  <i class='bx bx-cart'></i>`;
        })
    }
    else if (page = mainPageContainer && cartArr.length === 0) {
    }
}

      
export function getTodayDay () {
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