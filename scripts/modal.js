export const openModal = (data, index) => {
    const body = document.querySelector('body');
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

