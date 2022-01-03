$('#myModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
});

document.querySelector('#inputfieldtable').addEventListener('input', filterTables);

function filterTables() {
    const searchInputtv = document.querySelector('#inputfieldtable');
    const filter = searchInputtv.value.toLowerCase();
    const tableList = document.querySelectorAll('#menu-container')[0].children;
    const list = Array.from(tableList);
    console.log(list);
    list.forEach((item) => {
        let text = $(item).children('.card-body').text();
        if (text.toLowerCase().includes(filter.toLowerCase())) {
            item.style.display = '';
        }
        else {
            item.style.display = 'none';
        }
    });
}

document.querySelector('#inputfield').addEventListener('input', filterList);

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

function updatePrice(element, price) {
    let currentPrice = parseInt(element.text());
    currentPrice += price;
    element.text(currentPrice);
}

function decreasePrice(element, price) {
    let currentPrice = parseInt(element.text());
    if (currentPrice > price)
        currentPrice -= price;
    element.text(currentPrice);
}

function changeCardPrice(arr, element, operation) {
    if (operation == '1') {
        let sum = parseInt(element.innerText);
        for (let i = 0; i < arr.length; i++) {
            sum += parseInt(arr[i].innerText);
        }
        element.innerText = sum;
    }
    else {
        let sum = 0;
        for (let i = 0; i < arr.length; i++) {
            sum += parseInt(arr[i].innerText);
        }
        element.innerText = sum;
    }
}

//increase price on the table card
function changeTableCard(prices, obj) {
    let table = document.getElementById(obj.id);
    var field = table.getElementsByTagName('span');
    changeCardPrice(prices, field[0]);
}
function increment(element) {
    let parentid = $(element).parent('td').parent('tr').parent('tbody').attr('id');
    console.log(parentid);
    //get the object from session storage
    let obj = JSON.parse(sessionStorage.getItem(parentid));
    let priceElement = $(element).parent('td').parent('tr').children('.price-data');
    updatePrice(priceElement, parseInt(obj.price),'1');

    let prices = document.getElementById(obj.element).getElementsByClassName('price-data');

    changeTableCard(prices, obj);

    //to get the text inside quantity column
    let temp2 = $(element).parent('td').parent('tr').children('.quantity');
    let currentQuantitiy = parseInt($(temp2).text());
    currentQuantitiy++;
    temp2.text(currentQuantitiy);
}

function decrement(element) {
    let parentid = $(element).parent('td').parent('tr').parent('tbody').attr('id');
    console.log(parentid);
    //get the object from session storage
    let obj = JSON.parse(sessionStorage.getItem(parentid));
    let priceElement = $(element).parent('td').parent('tr').children('.price-data');
    console.log(priceElement);
    decreasePrice(priceElement, parseInt(obj.price));

    let prices = document.getElementById(obj.element).getElementsByClassName('price-data');

    changeTableCard(prices, obj,'0');

    let temp2 = $(element).parent('td').parent('tr').children('.quantity');
    let currentQuantitiy = parseInt($(temp2).text());
    if (currentQuantitiy > 1)
        currentQuantitiy--;
    temp2.text(currentQuantitiy);
}

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
//display all elements on document.onload from local storage
async function getTables() {

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
}

//add all elements on document.onload from session storage
//TODO

function fetchTbody(id) {
    let modalid = "exampleModalLong" + id;
    const element = document.getElementById(modalid);
    const tableElement = $(element).children('.modal-dialog').children('.modal-content').children('.modal-body').children('.menu-table').children('tbody');
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
        "<button type='button' class='btn btn-secondary' data-dismiss='modal'>Close</button>" +
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

$('#save').click(function () {
    let id = $('#table-name').val();
    //console.log(id);
    $('#exampleModal').modal('hide');
    createTable(id);
});