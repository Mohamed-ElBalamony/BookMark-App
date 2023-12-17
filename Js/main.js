var inputs = document.querySelectorAll('.book-mark-inputs input');
var addBtn = document.querySelector('#subBtn');
var updateBtn = document.querySelector('#updateBtn');
var lightBoxModel = document.querySelector('#lightBoxModel');
var searchInput = document.querySelector('#searchInput');
var tableBody = document.querySelector('#tableBody');
var closeBtn = document.querySelector('#closeBtn');
var currentIndex;
var usreBookMarks;

if(localStorage.getItem('Book Marks') != null) {
    usreBookMarks = JSON.parse(localStorage.getItem('Book Marks'));
    display();
}else {
    usreBookMarks = [];
}

addBtn.addEventListener('click' , function() {
    var bookMark = {
        name : inputs[0].value,
        url : inputs[1].value,
    }
    
    if(checkExistanceBookName()) {
        alert('Book Name Exist Before');
        clearInputs();
        return;
    }

    if(validateBookName() && validateUrl()) {
        usreBookMarks.push(bookMark);
        localStorage.setItem('Book Marks' , JSON.stringify(usreBookMarks));
        clearInputs();
        display();
        return;
    }
    
    clearInputs();
    lightBoxModel.classList.replace('d-none' , 'd-flex');
})

function clearInputs() {
    inputs[0].value = ``;
    inputs[1].value = ``;
}

function display() {
    var rows = ``;
    for(var i = 0;i < usreBookMarks.length;i++) {
        rows += `
        <tr class="text-center">
            <td>${i}</td>
            <td>${usreBookMarks[i].name}</td>
            <td><a href = "${usreBookMarks[i].url}" target = "_blank" class="text-capitalize btn btn-primary">visit</a></td>
            <td><button onclick = "updateBookMark(${i})" class="btn btn-warning text-capitalize">update</button></td>
            <td><button onclick = "deleteBookMark(${i})" class="btn btn-danger text-capitalize">delete</button></td>
        </tr>
        `
    }

    tableBody.innerHTML = rows;
}

function deleteBookMark(index) {
    usreBookMarks.splice(index , 1);
    localStorage.setItem('Book Marks' , JSON.stringify(usreBookMarks));
    display();
}

function updateBookMark(index) {
    addBtn.classList.add('d-none');
    updateBtn.classList.replace('d-none' , 'd-inline');

    inputs[0].value = usreBookMarks[index].name;
    inputs[1].value = usreBookMarks[index].url;
    currentIndex = index;
}

updateBtn.addEventListener('click' , function() {
    var bookMark = {
        name : inputs[0].value,
        url : inputs[1].value,
    }

    usreBookMarks[currentIndex] = bookMark;
    localStorage.setItem('Book Marks' , JSON.stringify(updateBookMark));
   
    addBtn.classList.remove('d-none');
    updateBtn.classList.replace('d-inline' , 'd-none');

    clearInputs();
    display();
})

searchInput.addEventListener('input' , function() {
    var searchRows = ``;
    for(var i = 0;i < usreBookMarks.length;i++) {
        if(usreBookMarks[i].name.toLowerCase().includes(this.value.toLowerCase())) {
            searchRows += `
            <tr class="text-center">
                <td>${i}</td>
                <td>${usreBookMarks[i].name}</td>
                <td><a href = "${usreBookMarks[i].url}" target = "_blank" class="text-capitalize btn btn-primary">visit</a></td>
                <td><button onclick = "updateBookMark(${i})" class="btn btn-warning text-capitalize">update</button></td>
                <td><button onclick = "deleteBookMark(${i})" class="btn btn-danger text-capitalize">delete</button></td>
            </tr>
            `
        }
    }

    tableBody.innerHTML = searchRows;
})

closeBtn.addEventListener('click' , function() {
    lightBoxModel.classList.replace('d-flex' , 'd-none');
})

document.addEventListener('keydown' , function(e) {
    if(e.code === 'Escape') {
        lightBoxModel.classList.replace('d-flex' , 'd-none');
    }
})

function validateBookName() {
    var regex = /^[A-Z][a-z\s]{2,}$/;
    var regexTest = regex.test(inputs[0].value);

    if(regexTest) {
        inputs[0].classList.replace('is-invalid' , 'is-valid');
        return true;
    }
    inputs[0].classList.add('is-invalid');
    return false;
}

function validateUrl() {
    var regex = /^(https?:\/\/)[\w-@:%._\\+~#?&//=]{2,256}\.[A-za-z]{2,6}\b[\w-@:%._\\+~#?&//=]*$/;
    var regexTest = regex.test(inputs[1].value);

    if(regexTest) {
        inputs[1].classList.replace('is-invalid' , 'is-valid');
        return true;
    }
    inputs[1].classList.add('is-invalid');
    return false;
}

inputs[0].addEventListener('input' , validateBookName);
inputs[1].addEventListener('input' , validateUrl);

function checkExistanceBookName() {
    for(var i = 0;i < usreBookMarks.length;i++) {
        if(usreBookMarks[i].name.toLowerCase() == inputs[0].value.toLowerCase()) {
            return true;
        }
    }
    return false;
}