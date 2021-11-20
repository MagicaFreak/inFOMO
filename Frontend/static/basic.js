document.addEventListener("DOMContentLoaded", function(){
    loadNew()
});

function loadNew() {
    document.getElementById('thread-cards').innerHTML = ""
    fetch('http://127.0.0.1:8000/')
        .then()
}

function loadSales() {
    document.getElementById('thread-cards').innerHTML = ""
    fetch('http://127.0.0.1:8000/sales')
        .then()
}

function loadProducts() {
    document.getElementById('thread-cards').innerHTML = ""
    fetch('http://127.0.0.1:8000/products')
        .then()
}

function loadShops() {
    document.getElementById('thread-cards').innerHTML = ""
    fetch('http://127.0.0.1:8000/shops')
        .then()
}

function loadCitys() {
    document.getElementById('thread-cards').innerHTML = ""
    fetch('http://127.0.0.1:8000/citys')
        .then()
}

class Information {
    constructor(title, message, tag, percent, date, animation) {
        this.title = title;
        this.message =message;
        this.tag = tag;
        this.percent = percent;
        this.date = date;
        this.animation = animation;
    }

    render () {
        let wrapper = document.createElement("div")
        wrapper.style.padding = "10px"
        wrapper.classList.add("col-11", "col-md-8", "col-lg-5")

        let card = document.createElement("div")
        card.classList.add("card")

        let cardHeader = document.createElement("div")
        cardHeader.classList.add("card-header")
        card.appendChild(cardHeader)

        // TODO Animation integration

        let cardBody = document.createElement("div")
        cardBody.classList.add("card-body")

        let cardTitle = document.createElement("h5")
        cardTitle.classList.add("card-title")
        cardTitle.innerText = `(${this.date}) ${this.title}`
        cardBody.appendChild(cardTitle)

        let cardText = document.createElement("p")
        cardText.classList.add("card-text")
        cardText.innerText = this.message
        cardBody.appendChild(cardText)
        card.appendChild(cardBody)

        let cardFooter = document.createElement("div")
        cardFooter.classList.add("card-footer")

        let cardTag = document.createElement("span")
        cardTag.classList.add("badge", "bg-success")
        cardTag.innerText = this.tag
        cardFooter.appendChild(cardTag)

        let cardQuickUpdate = document.createElement("quick")
        cardQuickUpdate.classList.add("quick")
        if (this.percent > 0) {
            cardQuickUpdate.setAttribute("up", "")
        } else {
            cardQuickUpdate.setAttribute("down", "")
        }

        let cardArrow = document.createElement("svg")
        cardArrow.setAttribute("viewbox", "0, 0, 16, 16")
        cardArrow.setAttribute("width", "10px")
        cardArrow.setAttribute("height", "10px")

        let cardArrowUp = document.createElement("path")
        cardArrowUp.classList.add("up")
        cardArrowUp.setAttribute("fill", "currentColor")
        cardArrowUp.setAttribute("d", "M 8,2 l 6,6 l -3,0 l 0,5 l -6,0 l 0,-5 l -3,0 z")
        cardArrow.appendChild(cardArrowUp)

        let cardArrowDown = document.createElement("path")
        cardArrowDown.classList.add("down")
        cardArrowDown.setAttribute("fill", "currentColor")
        cardArrowDown.setAttribute("d", "M 5,2 l 6,0 l 0,6 l 3,0 l -6,6 l -6,-6 l 3,0 z")
        cardArrow.appendChild(cardArrowDown)

        cardQuickUpdate.appendChild(cardArrow)
        cardQuickUpdate.innerHTML += `${this.percent}%`

        cardFooter.appendChild(cardQuickUpdate)
        card.appendChild(cardFooter)
        wrapper.appendChild(card)
        return wrapper;
    }
}
