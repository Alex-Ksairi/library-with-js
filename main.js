
'use strict';

const books = [
    {
        id: 1,
        type: 'classics',
        name: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        length: 336,
        price: 18.04,
        discount: 5,
        color: 'green',
        image: './images/mockingbird.jpg',
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    },
    {
        id: 2,
        type: 'classics',
        name: 'Little Women',
        author: 'Louisa May Alcott',
        length: 528,
        price: 6.17,
        discount: 0, 
        color: 'green',
        image: './images/little.jpg',
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    },
    {
        id: 3,
        type: 'classics',
        name: 'Beloved',
        author: 'Toni Morrison',
        length: 321,
        price: 20.99,
        discount: 5,
        color: 'green',
        image: './images/beloved.jpg',
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    },
    {
        id: 4,
        type: 'comics',
        name: 'Watchmen',
        author: 'Alan Moore',
        length: 416,
        price: 10.84,
        discount: 0,
        color: 'dodgerblue',
        image: './images/watchmen.jpg',
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    },
    {
        id: 5,
        type: 'comics',
        name: 'The Walking Dead',
        author: 'Robert Kirkman',
        length: 1088,
        price: 30.05,
        discount: 10,
        color: 'dodgerblue',
        image: './images/walkingdead.jpg',
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    },
    {
        id: 6,
        type: 'mystery',
        name: 'The Night Fire',
        author: 'Michael Connelly',
        length: 416,
        price: 18.90,
        discount: 5,
        color: 'orange',
        image: './images/nightfire.jpg',
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    },
    {
        id: 7,
        type: 'mystery',
        name: 'Sherlock Holmes',
        author: 'Sir Arthur Conan Doyle',
        length: 164,
        price: 6.41,
        discount: 0,
        color: 'orange',
        image: './images/holmes.jpg',
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    },
    {
        id: 8,
        type: 'horror',
        name: 'Carrie',
        author: 'Stephen King',
        length: 304,
        price: 7.99,
        discount: 5,
        color: 'red',
        image: './images/carrie.jpg',
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    },
    {
        id: 9,
        type: 'adventure',
        name: 'Life of Pi',
        author: 'Yann Martel',
        length: 326,
        price: 7.50,
        discount: 0,
        color: 'purple',
        image: './images/pi.jpg',
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    },
];


// code here 
/*

Steps:
1. calculate the last price according to discount amount, create new key 'lastPrice in object'
2. dynamically get book types and place them in 'div.select' container with input 'checkbox' & 'label'
3. get user choices via input element 
4. create a function for book template 
5. filter books according to user selection
6. display selected books in browser
7. add books to cart

*/

/* let'S starts coding */

//****************  1. calculate the last price according to discount amount, create new key 'lastPrice in object'

function calcLastPrice() {
    this.lastPrice = +(this.price * (1 - this.discount / 100)).toFixed(2);
}

books.forEach(function (item){
    calcLastPrice.call(item);
});
// console.log(books[0])


//****************  2. dynamically get book types and place them in 'div.select' container with input 'checkbox' & 'label'         using map() function

// let types = Array.from(new Set(books.map(item => item.type)));
let types = [...new Set(books.map(item => item.type))];       // in this case, parentheses and curly brackets no needed and with help 'new Set()' the repeated objects will be merged to one in an array-like-object but they aren't array which can not be used by 'map()', 'filter()'... usw. methods
// To convert to ARRAY: 1- Array.from(array-likeObject), 2- [...new Set()]

// console.log(types);

types.forEach(item => {
    let newCheckBoxElement = `<label>
    <input type = "checkbox" value = ${item} onchange = "getInputValue(this)">
    ${item[0].toUpperCase() + item.slice(1).toLocaleLowerCase()}</label>`;

    document.querySelector('.select').insertAdjacentHTML('beforeend', newCheckBoxElement);
});


//****************  3. get user choices via input element 

let desiredBookTypesArray = [];

function getInputValue(element) {
    // console.log(element);
    // console.log(element.value);

    if (element.checked) {          // this CHECKED means true
        // console.log('element is checked');

        !desiredBookTypesArray.includes(element.value) ? desiredBookTypesArray.push(element.value) : null;
        // console.log(desiredBookTypesArray);

        filterBooks(desiredBookTypesArray);         // to make the books type functional
    }
    else {
        // console.log('element is unchecked');
        
        desiredBookTypesArray = desiredBookTypesArray.filter(item => item !== element.value);       // in this case, unchecked items will be removed from the array after chosen them 
        // console.log(desiredBookTypesArray);

        desiredBookTypesArray.length === 0 ? filterBooks(types) : filterBooks(desiredBookTypesArray);

    }
    console.log('desiredBookTypesArray', desiredBookTypesArray);
}



//****************  4. create a function for book template 

function displayBook(book) {
    let bookTemplate = ` 
        <div class="book_outbox">
            <div class="book">
                <img src= ${book.image} alt= ${book.name}>
                <div class="right">
                    <div class="head">
                        <h3>${book.name}</h3>
                        <span class="type" style="background: ${book.color}">${book.type}</span>
                    </div>
                    <p><b>Author :</b> <span class= 'author'>${book.author}</span></p>
                    <p><b>Length :</b> <span class="length">${book.length}</span></p>
                    <p><b>Price :</b>${book.discount ? `<span class="oldprice">${book.price}</span><span>${book.lastPrice}</span>` : `<span>${book.price}</span>`}</p>
                    <p><b>Description :</b> <span class="description">${book.description}</span></p>
                    <button data-id= ${book.id} class="button">Add to Cart</button>
                </div>
            </div>
        </div>
    `;

    document.querySelector('.products').insertAdjacentHTML('beforeend', bookTemplate);
}
// books.forEach(item => displayBook(item));


//****************  5. filter books according to user selection

let booksToDisplayArray = [];
function filterBooks(array) {
    // console.log(array);
    booksToDisplayArray = books.filter(item => array.includes(item.type));
    // console.log(booksToDisplayArray);

    document.querySelector('.products').innerHTML = '';

    for (let item of booksToDisplayArray){
        displayBook(item);
    }
}
if (desiredBookTypesArray.length === 0) {
    filterBooks(types);
}



//****************  6. display selected books in browser
// done

//****************  7. add books to cart

let cartArray = [];
document.querySelector('.products').addEventListener('click', (event) => {
    // console.log(event);
    // console.log(event.target);
    // console.log(event.target.closest('.button'));

    let btn = event.target.closest('.button');

    if (btn){
        btn.style.backgroundColor = 'black';
        btn.textContent = 'Added';
        btn.style.color = 'white';

        let buttonId = +btn.dataset.id;
        // console.log(buttonId);

        let book = books.find(item => item.id === buttonId);
        // console.log(book);

        cartArray.push(book);
        // console.log(cartArray);

    // **************** cartItem

        let cartCheck = +document.querySelector('.cartItem').textContent;
        cartCheck++;
        document.querySelector('.cartItem').textContent = cartCheck;
    }
});



// let cart = document.querySelector('.button');
// // console.log('button :', cart);

// cart.addEventListener('click', function (){
//     // console.log('Hello');
// });


