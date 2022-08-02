export function validate(resultData) {
    let submitButton = document.querySelector('.submit_button');
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

export function checkGifts () {
    const fieldGifts = document.querySelectorAll('.filter-input-checkbox:checked');
    const fieldNotGifts = document.querySelectorAll('.filter-input-checkbox:not(:checked)');

    if (fieldGifts.length === 2){
        fieldNotGifts.forEach(gift => {
        gift.disabled = true})
        alert('only two gifts available');
    }
    else {
        fieldNotGifts.forEach(gift => {
            gift.disabled = false})
    }
}

