function clickRate(element){
    var x = document.getElementsByClassName("fa-star")
    for(let i = 0; i < 5; i++){
        x[i].classList.remove("checkedStar")
    }
    var elms = document.getElementsByClassName("rateBox")
    Array.from(elms).forEach((x) => {
        if (x.style.display === "none") {
            x.style.display = "block"
            x.style.marginTop = String(500*element - 70 * element + "px")
        } else {
            x.style.display = "none"
        }
    })
}

function rateStars(value){
    var x = document.getElementsByClassName("fa-star")
    for(let i = 0; i < 5; i++){
        x[i].classList.remove("checkedStar")
    }
    for(let i = 0; i < value; i++){
        x[i].classList.add("checkedStar")
    }
}

function contact(){
    var elms = document.getElementsByClassName("contactUs")
    Array.from(elms).forEach((x) => {
        if (x.style.display === "none") {
            x.style.display = "block"
        } else {
            x.style.display = "none"
        }
    })
}

function xemchitiet(element){
    var elms = document.getElementsByClassName("content")
    Array.from(elms).forEach((x) => {
        x.style.display = "none"
    })
    var elms = document.getElementsByClassName("details")
    Array.from(elms).forEach((x) => {
        x.style.display = "block"
    })
}

function backtoorders(){
    var elms = document.getElementsByClassName("details")
    Array.from(elms).forEach((x) => {
        x.style.display = "none"
    })
    var elms = document.getElementsByClassName("content")
    Array.from(elms).forEach((x) => {
        x.style.display = "block"
    })
}

function showListStatus(){
    var elms = document.getElementsByClassName("listStatus")
    Array.from(elms).forEach((x) => {
        if (x.style.display === "none") {
            x.style.display = "block"
        } else {
            x.style.display = "none"
        }
    })
}