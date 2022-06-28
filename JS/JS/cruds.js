//Decleration 
var title = document.querySelector('section .contain form.create .title input')
var price = document.querySelector('section .contain form.create .prices .price')
var taxes = document.querySelector('section .contain form.create .prices .taxes')
var ads = document.querySelector('section .contain form.create .prices .ads')
var dis = document.querySelector('section .contain form.create .prices .dis')
var total = document.querySelector('section .contain form.create .prices .total span')
var count = document.querySelector('section .contain form.create .count input')
var cat = document.querySelector('section .contain form.create .cat input')
var create = document.querySelector('section .contain form.create .create input')

var search = document.getElementById('search')
var searchTitle = document.querySelector('section .contain form.search .search-btns button:first-child')
var searchCat = document.querySelector('section .contain form.search .search-btns button:last-child')

var tmp;

//Get Total Of Price Of Product
function getTotal() {
    if (price.value != '') {
        let result = (+price.value + (((+taxes.value / 100) * (+price.value))) + (((+ads.value / 100) * (+price.value)))) - (((+dis.value / 100) * (+price.value)))
        total.innerHTML = result
        total.parentElement.style.backgroundColor = '#0abf53'
    } else {
        total.innerHTML = ''
        total.parentElement.style.backgroundColor = '#8de4b0'
    }
}


let dataPro;
if (localStorage.getItem('product')) {
    dataPro = JSON.parse(localStorage.product)
} else {
    dataPro = []
}

create.addEventListener('click', function(e) {
    e.preventDefault()
    let newPro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        dis: dis.value,
        total: total.innerHTML,
        count: count.value,
        cat: cat.value.toLowerCase()
    }
    if (title.value && cat.value && price.value && count.value <= 100) {
        if (this.value == 'Create') {
            if (newPro.count > 1) {
                for (var i = 0; i < Number(newPro.count); i++) {
                    dataPro.push(newPro)
                }
            } else {
                dataPro.push(newPro);
            }
        } else if (this.value == 'Update') {
            dataPro[tmp] = newPro
            this.value = 'Create'
            count.style.display = 'grid'
            getTotal()
        }
        clearData()
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Check title , category , price should be filled and count should less than 100 items'
        })
    }

    localStorage.setItem('product', JSON.stringify(dataPro))
    showData()
})

//Clear Data Inputs
function clearData() {
    title.value = ''
    price.value = ''
    taxes.value = ''
    ads.value = ''
    dis.value = ''
    total.innerHTML = ''
    cat.value = ''
    count.value = ''
}

function showData() {
    getTotal()
    let table = ''
    for (var i = 0; i < dataPro.length; i++) {
        table += `
        <div class="list">
            <span>${i+1}</span>
            <span>${dataPro[i].title}</span>
            <span>${dataPro[i].price}</span>
            <span>${dataPro[i].taxes}%</span>
            <span>${dataPro[i].ads}%</span>
            <span>${dataPro[i].ads}%</span>
            <span>${dataPro[i].total}</span>
            <span>${dataPro[i].cat}</span>
            <button onclick="updateData(${i})" id='update'>update</button>
            <button onclick="deleteData(${i})" id='delete'>Delete</button>
        </div>
    `
    }
    document.getElementById('lists').innerHTML = table

    let btnDelete = document.getElementById('deleteAll')
    if (dataPro.length > 0) {
        btnDelete.innerHTML = `
        <button onclick="deleteAll()">Delete All (<span>${dataPro.length}</span>)</button>
    `
    } else {
        btnDelete.innerHTML = ''
    }

}
showData()

// Delete Product
function deleteData(i) {
    dataPro.splice(i, 1)
    localStorage.product = JSON.stringify(dataPro)
    showData()
}

//Delete All
function deleteAll() {
    localStorage.clear()
    dataPro = []
}

//Update Product
function updateData(i) {
    title.value = dataPro[i].title
    price.value = dataPro[i].price
    taxes.value = dataPro[i].taxes
    ads.value = dataPro[i].ads
    dis.value = dataPro[i].dis
    total.innerHTML = dataPro[i].total
    cat.value = dataPro[i].cat
    create.value = 'Update'
    tmp = i
    count.style.display = 'none'
    window.scroll({
        top: '0'
    })
    getTotal()
}

let searchMood = 'title'

function getSearchMood(id) {
    // console.log(this)
    let search = document.getElementById('search')
    if (id == 'searchByTitle') {
        searchMood = 'title'
    } else {
        searchMood = 'category'
    }
    search.placeholder = 'Search By ' + searchMood
    search.focus()
    search.value = ''
    showData()
}

function searchData(value) {
    let table = ''
    for (var i = 0; i < dataPro.length; i++) {
        if (searchMood == 'title') {
            if (dataPro[i].title.includes(value.toLowerCase())) {
                table += `
        <div class="list">
            <span>${i}</span>
            <span>${dataPro[i].title}</span>
            <span>${dataPro[i].price}</span>
            <span>${dataPro[i].taxes}</span>
            <span>${dataPro[i].ads}</span>
            <span>${dataPro[i].ads}</span>
            <span>${dataPro[i].total}</span>
            <span>${dataPro[i].cat}</span>
            <button onclick="updateData(${i})" id='update'>update</button>
            <button onclick="deleteData(${i})" id='delete'>Delete</button>
        </div>
    `
            }
        } else {
            if (dataPro[i].cat.includes(value.toLowerCase())) {
                table += `
        <div class="list">
            <span>${i}</span>
            <span>${dataPro[i].title}</span>
            <span>${dataPro[i].price}</span>
            <span>${dataPro[i].taxes}</span>
            <span>${dataPro[i].ads}</span>
            <span>${dataPro[i].ads}</span>
            <span>${dataPro[i].total}</span>
            <span>${dataPro[i].cat}</span>
            <button onclick="updateData(${i})" id='update'>update</button>
            <button onclick="deleteData(${i})" id='delete'>Delete</button>
        </div>
    `
            }
        }
    }
    document.getElementById('lists').innerHTML = table
}