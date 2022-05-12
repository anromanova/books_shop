'use strict'

// get data from json

function mainPage() {
    fetch('./books.json')
    .then(response => {
        return response.json();
    })
    .then(data => {
        let books = data.map((item, index) => ({...item, id: index}));
        console.log(books);
        showData(books);
        return books;
    });
}


// show page content
const body = document.querySelector('body');

function showData(data) {
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
        <button class="item__button add_basket" type="button" book_id=${item.id}>Add to bag  <i class='bx bx-cart'></i></button></div>
        </div>`
        // document.querySelectorAll('.item__button').forEach(button => {
        //     button.setAttribute(book_id, data[index].id)
        // });
    }
    document.querySelector('.book_cards').innerHTML = output;
    const learnButton = document.querySelectorAll('.learn');
    learnButton.forEach((button, index) => {
        button.onclick = () => {
            openModal(data, index);
        }
    })
    // const cardButtons = document.querySelectorAll('.item__button');
    // cardButtons.forEach(button => {
    //         button.setAttribute('book_id', data[index]);
    //     });
    return learnButton;
}

function buildPage () {
    mainPage();
    const title = document.createElement('h1');
    const cart = document.createElement('div');
    cart.classList.add('main_cart');
    const cart_output =  `<i class='bx bx-cart'></i>`
    cart.innerText = cart_output;
    title.classList.add('page_title');
    title.innerText = 'Books shop';
    body.append(title);
    body.append(cart);

}

window.addEventListener('load', buildPage());


// button "learn more and popup"

// const learnButton = document.querySelectorAll('.learn');
// console.log(learnButton)
function openModal(data, index) { 
    console.log(index)
    let output = '';
        output = `
        <div class="popup_card">
        <p class="author">${data[index].author}</p>
        <p class="title">${data[index].title}</p>
        <p class="description">${data[index].description}</p>
        <button class="item__button close" type="button" book_id=${data[index].id}>Close</button>`
        // - удаление всего контента со страницы?
    body.innerHTML = output;
    // document.querySelector('.popup_card').innerHTML = output;
    const closePopupButton = document.querySelector('.close');
        closePopupButton.onclick = () => {
            body.innerHTML = '';
            mainPage();
        }
}