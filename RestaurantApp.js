$('#myModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
});


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
        let id = e.path.at(1).id;
        let modalid = "exampleModalLong" + id;
        const element = document.getElementById(modalid);
        e.target.classList.remove('drag-over');
        const tableElement = $(element).children('.modal-dialog').children('.modal-content').children('.modal-body').children('.menu-table').children('tbody');
        addRow(tableElement, price, itemName, id);
    }
}


function addRow(element, price, itemName, id) {
    $(element).attr("id", itemName + id);
    element.append(
        "<tr>" +
        "<td>" + Sno++ + "</td>" +
        "<td>" + itemName + "</td>" +
        "<td id='price-data'>" + price + "</td>" +
        "<td id='quantity'>1<i class='fas fa-arrow-up'></i></td>" +
        "<td></td>" +
        "</tr>"
    )
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
function getTables() {
    for (let index = 0; index < localStorage.length; index++) {
        createTable(localStorage.key(index));
    }
    initializeFoodCards();
    initializeTables();
};


//add Menu element to the container and create a modal dynamically
function createTable(id) {
    $(container).append(
        "<div class='card mt-5 border-dark tables' id=" + id + " data-bs-toggle='modal' href='#exampleModalLong" + id + "' style='height: 7rem;'>" +
        "<div class='card-body'>" +
        id +
        "</div>" +
        "</div>" +
        //modal
        "<div class='modal fade' id='exampleModalLong" + id + "' tabindex='-1' role='dialog' aria-labelledby='exampleModalLongTitle' aria-hidden='true'>" +
        "<div class='modal-dialog' role='document'>" +
        "<div class='modal-content'>" +
        "<div class='modal-header'>" +
        "<h5 class='modal-title' id='exampleModalLongTitle'> Table " + id + " </h5>" +
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
    if (localStorage.getItem(id) === null)
        localStorage.setItem(id, true);
}

$('#save').click(function () {
    let id = $('#table-name').val();
    //console.log(id);
    $('#exampleModal').modal('hide');
    createTable(id);
});
