$('#myModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
});

var container = $('#menu-container');


//display all elements on document.onload from local storage
function getTables(){
    for(let index = 0; index < localStorage.length; index++) {
        createElement(localStorage.key(index));
    }
};

//attach ondragenter event listener to the food table

var tables = document.getElementsByClassName('tables');

for (var i = 0; i < tables.length; i++) {
    tables[i].addEventListener("dragenter", function(event) {
        console.log("Hi");
    } , false);
}


//add Menu element to the container and create a modal dynamically
function createElement(id) {
    $(container).append(
        "<div class='card mt-3 border-dark tables' id=" + id + " data-bs-toggle='modal' href='#exampleModalLong"+id+"' style='height: 15rem;'>" +
        "<div class='card-body'>" +
        id +
        "</div>" +
        "</div>" +
        //modal
        "<div class='modal fade' id='exampleModalLong"+id+"' tabindex='-1' role='dialog' aria-labelledby='exampleModalLongTitle' aria-hidden='true'>" +
        "<div class='modal-dialog' role='document'>" +
        "<div class='modal-content'>" +
        "<div class='modal-header'>" +
        "<h5 class='modal-title' id='exampleModalLongTitle'> Table "+id+" </h5>" +
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
    if(localStorage.getItem(id)===null)
        localStorage.setItem(id, true);
}

$('#save').click(function () {
    let id = $('#table-name').val();
    //console.log(id);
    $('#exampleModal').modal('hide');
    createElement(id);
});