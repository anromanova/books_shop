// get data from json

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


// show page content
let body = document.querySelector('body');

function showData(data) {
    let output = '';
    for (let item of data) {
        output += `
        <div class="book_card">
        <img src="${item.imageLink}" alt="">
        <p class="author">${item.author}</p>
        <p class="title">${item.title}</p>
        <p class="price">${item.price}$</p>
        </div>`
    }
    document.querySelector('.book_cards').innerHTML = output;
}


function buildPage () {
    const title = document.createElement('h1');
    title.classList.add('page_title')
    title.innerText = 'Books shop';
    body.appendChild(title);
}

window.addEventListener('load', buildPage());