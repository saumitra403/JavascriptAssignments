$(document).ready(initialize);

//to keep track of the prices associated with a food-card
const foodPrices = {
    "shahipaneer": 250,
    "plaindosa": 250,
    "cholebhature": 200,
    "pavbhaji": 150,
    "pizza": 180,
    "chowmein": 250,
    "burger": 150
};

document.querySelector('#inputfieldtable').addEventListener('input', filterTables);

//used for the Search field to get tables matching user input
function filterTables() {
    const searchInputtv = document.querySelector('#inputfieldtable');
    const filter = searchInputtv.value.toLowerCase();
    const tableList = document.querySelectorAll('#menu-container')[0].children;
    const list = Array.from(tableList);
    list.forEach((item) => {
        let text = $(item).find('.card-title').text();
        if (text.toLowerCase().includes(filter.toLowerCase())) {
            item.style.display = '';
        }
        else {
            item.style.display = 'none';
        }
    });

}

document.querySelector('#inputfield').addEventListener('input', filterList);

//used for Search field to get food-cards matching user input
function filterList() {
    const searchInputtv = document.querySelector('#inputfield');
    const filter = searchInputtv.value.toLowerCase();
    const foodlist = document.querySelectorAll('#card-container')[0].children;
    const list = Array.from(foodlist);
    list.forEach((item) => {
        let text = $(item).children('.card-body').children('h5').text();
        //let text = item.children();
        if (text.toLowerCase().includes(filter.toLowerCase())) {
            item.style.display = '';
        }
        else {
            item.style.display = 'none';
        }
    });
}

var container = $('#menu-container');
var tables;
var Sno = 1;

//this function will add dragEnter,dragLeave,dragOver and drop event listeners to every table added dynamically
function initializeTables() {
    tables = document.querySelectorAll('.tables');
    tables.forEach(function (element) {
        element.addEventListener('dragenter', dragEnter)
        element.addEventListener('dragover', dragOver);
        element.addEventListener('dragleave', dragLeave);
        element.addEventListener('drop', drop);
    });

    function dragEnter(e) {
        //console.log(e);
        e.target.classList.add('drag-over');
    }
    function dragLeave(e) {
        //console.log(e);
        e.preventDefault();
        e.target.classList.remove('drag-over');
    }
    function dragOver(e) {
        e.preventDefault();
    }
    function drop(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
        //console.log(e.offsetParent.id);
        //fetching the card data
        let targetId = e.dataTransfer.getData('text/plain');
        let foodId = document.getElementById(targetId);
        let priceText = $(foodId).children('.card-body').children('.card-text').children('span').text();
        const price = priceText.split(' ')[0];
        const itemName = $(foodId).children('.card-body').children('.card-title').text();
        let id = e.path.at(0).id;
        const tableElement = fetchTbody(id);
        addRow(tableElement, price, itemName, id);
        location.reload();
    }
}

//updates(increases) the price on screen when increase arrow is clicked
function updatePrice(element, price) {
    let currentPrice = parseInt(element.text());
    currentPrice += price;
    element.text(currentPrice);
}

//decreases the price on screen when decrease arrow is clicked
function decreasePrice(element, price) {
    let currentPrice = parseInt(element.text());
    if (currentPrice > price)
        currentPrice -= price;
    element.text(currentPrice);
}

//updates the quantity column inside a row depending on operation
//1 : Means element is increased
//0 : Means element is decreased
function updateQuantityColumn(element, operation) {
    if (operation == 1) {
        let temp2 = $(element).parent('td').parent('tr').children('.quantity');
        let currentQuantitiy = parseInt($(temp2).text());
        currentQuantitiy++;
        temp2.text(currentQuantitiy);
    }
    else {
        let temp2 = $(element).parent('td').parent('tr').children('.quantity');
        let currentQuantitiy = parseInt($(temp2).text());
        if (currentQuantitiy > 1)
            currentQuantitiy--;
        temp2.text(currentQuantitiy);
    }
}

function getCardAndTbody(element) {
    let tbody = $(element).closest('tbody')[0];
    let arr = tbody.getElementsByClassName('price-data');
    let span = document.getElementById($(element).closest('.modal').attr('id').replace('exampleModalLong', ''));
    span = $(span).find('span')[0];
    changeCardPrice(arr, span);
}

//Responsible for fetching the (td) element inside the row which contains the class price data and update the price
function increment(element) {
    //to get the text inside quantity column
    updateQuantityColumn(element, 1);
    let parentid = getParentId(element);
    let priceElement = $(element).parent('td').parent('tr').children('.price-data');
    //console.log(priceElement);
    updatePrice(priceElement, foodPrices[parentid]);

    getCardAndTbody(element);
}


function getParentId(element) {
    let temp3 = element.parentElement;
    let temp4 = temp3.parentElement;
    let arr = temp4.childNodes;
    let string = arr[1].innerText.toLowerCase().split(" ");
    let parentid = string[0] + string[1];
    return parentid;
}

function decrement(element) {
    updateQuantityColumn(element, 0);
    let priceElement = $(element).parent('td').parent('tr').children('.price-data');
    let parentid = getParentId(element);
    decreasePrice(priceElement, foodPrices[parentid]);
    getCardAndTbody(element);
}

//responsible for adding a row inside a table
// element: it is the tbody element of the table the food card is dragged into
function addRow(element, price, itemName, id) {
    $(element).attr("id", itemName + id);
    var html = "<tr>" +
        "<td>" + Sno++ + "</td>" +
        "<td>" + itemName + "</td>" +
        "<td class='price-data'>" + price + "</td>" +
        "<td class='quantity'>1</td>" +
        "<td><i class='fas fa-arrow-up increase'></i><i class='fas fa-arrow-down decrease'></i></td>" +
        "</tr>";
    $(element).append(html);
    //storing details to session storage which are fetched on page reload
    var foodobj = {
        element: itemName + id,
        price: price,
        itemName: itemName,
        id: id
    };
    if (sessionStorage.getItem(itemName + id) == null) {
        sessionStorage.setItem(itemName + id, JSON.stringify(foodobj));
    }
}


//responsible for adding dragstart event listeners to every food-card available
function initializeFoodCards() {
    //attach dragStart event to food-card

    var foodCards = document.querySelectorAll('.food-card');

    foodCards.forEach(function (element) {
        element.addEventListener('dragstart', function (event) {
            event.dataTransfer.setData('text/plain', event.target.id);
            /*
            setTimeout(() => {
                event.target.classList.add('hide');
            }, 0);
            */
        });
    });
}

//TODO
//Change current price when element inside the table has been increased/decreased or a new element has been added to the table
function changeCardPrice(arr, element) {
    let sum = 0
    for (let i = 0; i < arr.length; i++) {
        sum += parseInt(arr[i].innerText);
    }
    element.innerText = sum;
}

//generates an alert which tell you the bill from a specific table
function generateBillAlert(arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += parseInt($(arr[i]).children('.price-data').text());
    }
    window.alert('Price : ' + sum);
}

//generate bill on button click
function generateBill(element) {
    let tbody = $(element).parent('.modal-footer').prev().find('tbody')[0];
    let arr = tbody.getElementsByTagName('tr');
    generateBillAlert(arr);
    //console.log(arr);
}

function getPrices() {
    for (let i = 0, len = localStorage.length; i < len; ++i ) {
        let table = document.getElementById(localStorage.key( i ));
        let span = $(table).find('span')[0];
        let id = "exampleModalLong"+localStorage.key(i);
        setTimeout(() => {
            let modal = document.getElementById(id);
            let tbody = $(modal).find('tbody')[0];
            let arr =  tbody.getElementsByClassName('price-data');
            changeCardPrice(arr,span);
        },10)
    }
}

//display all elements on document.onload from local storage

//responsible for getting all the tables, initializeFoodCards
function initialize() {

    for (let index = 0; index < localStorage.length; index++) {
        createTable(localStorage.key(index));
    }
    initializeFoodCards();
    initializeTables();
    getRows();
    $('.increase').ready(function () {
        $('.increase').click(function () {
            increment(this);
        });
    });
    $('.decrease').ready(function () {
        $('.decrease').click(function () {
            decrement(this);
        });
    });
    $('.btn-success').ready(function () {
        $('.btn-success').click(function () {
            generateBill(this);
        })
    });

    getPrices();
}

//add all elements on document.onload from session storage

//tbody element contains all the rows added to a specific table
function fetchTbody(id) {
    let modalid = "exampleModalLong" + id;
    const element = document.getElementById(modalid);
    let tableElement = $(element).children('.modal-dialog').children('.modal-content').children('.modal-body').children('.menu-table').children('tbody');
    return tableElement;
}
function getRows() {
    for (let index = 1; index < sessionStorage.length; index++) {
        let obj = JSON.parse(sessionStorage.getItem(sessionStorage.key(index)));
        let element = fetchTbody(obj.id);
        $(element).ready(() => {
            addRow(element, obj.price, obj.itemName, obj.id);
        })
    }
}

//add Menu element to the container and create a modal dynamically
function createTable(id) {
    $(container).append(
        "<div class='card mt-5 border-dark tables' id=" + id + " data-bs-toggle='modal' href='#exampleModalLong" + id + "' style='height: 7rem;'>" +
        "<div class='card-header'>" +
        "<h5 class='card-title'>" + id + "</h5>" +
        "</div>" +
        "<div class='card-text'>Current Price : <span>0</span> Rupees</div>" +
        "</div>" +
        //modal
        "<div class='modal fade modal-title' id='exampleModalLong" + id + "' tabindex='-1' role='dialog' aria-labelledby='exampleModalLongTitle' aria-hidden='true'>" +
        "<div class='modal-dialog' role='document'>" +
        "<div class='modal-content'>" +
        "<div class='modal-header'>" +
        "<h5 class='modal-title' id='exampleModalLongTitle'> Table: " + id + " </h5>" +
        "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>" +
        "<span aria-hidden='true'>&times;</span>" +
        "</button>" +
        "</div>" +
        "<div class='modal-body'>" +
        "<table class='menu-table'>" +
        "<thead>" +
        "<tr>" +
        "<th>" +
        "S.No" +
        "</th>" +
        "<th>" +
        "Item" +
        "</th>" +
        "<th>" +
        "Price" +
        "</th>" +
        "<th>" +
        "Quantity" +
        "</th>" +
        "<th>" +
        "</th>" +
        "</tr>" +
        "</thead>" +
        "<tbody>" +

        "</tbody>" +
        "</table>" +
        "</div>" +
        "<div class='modal-footer'>" +
        "<button type='button' class='btn btn-success'>Generate Bill</button>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>"
    )
    if (localStorage.getItem(id) === null) {
        localStorage.setItem(id, true);
        location.reload();
    }
}

//hides the modal after a table has been created
$('#save').click(function () {
    let id = $('#table-name').val();
    //console.log(id);
    $('#exampleModal').modal('hide');
    createTable(id);
});
