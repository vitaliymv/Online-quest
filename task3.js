

let progress = 0
let firstCard = null
let secondCard = null

let timeStorage = localStorage
let time;

if (timeStorage.getItem("time") != null) {
    time = parseInt(timeStorage.getItem("time"))
} else {
    time = 300
    timeStorage.setItem("time", time)
}

let cards = [
    {
        name: 'java',
        img: 'img/java.png',
        id: 1
    },
    {
        name: 'c#',
        img: 'img/c sharp.png',
        id: 2
    },
    {
        name: 'html',
        img: 'img/html.png',
        id: 3
    },
    {
        name: 'css',
        img: 'img/css.png',
        id: 4
    },
    {
        name: 'ruby',
        img: 'img/ruby.png',
        id: 5
    },
    {
        name: 'c++',
        img: 'img/c plus plus.png',
        id: 6
    },
    {
        name: 'dart',
        img: 'img/dart.png',
        id: 7
    },
    {
        name: 'kotlin',
        img: 'img/kotlin.png',
        id: 8
    },
    {
        name: 'python',
        img: 'img/python.png',
        id: 9
    },
    {
        name: 'go',
        img: 'img/go.png',
        id: 10
    },
    {
        name: 'php',
        img: 'img/php.png',
        id: 11
    },
    {
        name: 'sql',
        img: 'img/sql.png',
        id: 12
    },
]

$(document).ready(function () {
    $(".prog").knob({
        'min': 0,
        'max': 12,
        'readOnly': true,
        'displayInput': false,
        'angleOffset': -60,
        'angleArc': 120,
        'thickness': 0.2,
        'fgColor': 'SpringGreen	',
        'bgColor': 'SkyBlue',
        'lineCap': 'round',
        'width': '100%'
    })

    $(".time").knob({
        'min': 0,
        'max': 300,
        'readOnly': true,
        'displayInput': false,
        'angleOffset': 0,
        'angleArc': 360,
        'thickness': 0.2,
        'fgColor': 'SpringGreen	',
        'bgColor': 'SkyBlue',
        'lineCap': 'round',
        'width': '100%'
    })

    $(".slideRules").click(function () {
        $("#rules").slideToggle();
    })

    $("#start").click(function () {
        $("#start").hide();
        $(".gameBoard").css('display', 'grid');
        fillBoard()
        $(".card").on("click", cardClicked)
        startTime()
    })
})

function fillBoard() {
    let board = shuffle([...cards, ...cards])
    for (let i = 0; i < board.length; i++) {
        let cardHtml = `<div class="card" data-id="${board[i].id}" id=${i}>
                            <div class="front">
                                ROBOCODE
                            </div>
                            <div class="back">
                                <img src="${board[i].img}" alt="${board[i].name}">
                            </div>
                        </div>
                       `
        $('.gameBoard').append(cardHtml)
    }
}

function cardClicked() {
    if (secondCard || $(this).hasClass("matched")) {
        return
    }
    if (!firstCard) {
        firstCard = $(this)
        firstCard.addClass("flip")
        return
    }
    if (firstCard) {
        secondCard = $(this)
        secondCard.addClass("flip")
        if (firstCard.attr("data-id") == secondCard.attr("data-id") &&
            firstCard.attr("id") != secondCard.attr("id")) {
            firstCard.addClass("matched")
            secondCard.addClass("matched")
            firstCard = null
            secondCard = null
            progress++
            $(".prog").val(progress).trigger("change")
            if (progress == 12) {
                win()
            }
            return
        } else {
            setTimeout(function() {
                firstCard.removeClass("flip")
                secondCard.removeClass("flip")
                firstCard = null
                secondCard = null
            }, 1000)
        }
    }
}

function win() {
    $(".gameBoard").hide()
    $("#win").css('display', 'flex')
}

function shuffle(array) {
    let counter = array.length
    let temp;
    let index;
    while (counter > 0) {
        index = Math.floor(Math.random() * counter)
        counter--
        temp = array[counter]
        array[counter] = array[index]
        array[index] = temp
    }
    return array
}

function startTime() {
    setInterval(function () {
        time = parseInt(localStorage.getItem("time")) - 1
        $(".time").val(time).trigger('change')
        console.log(time);
        if (time == 0) {
            alertify.error("Time is out");
            setTimeout(() => window.open("index.html", "_self"), 2000)
            localStorage.removeItem("time")
        } else if (time > 0) {
            localStorage.setItem("time", time)
        }
    }, 1000)
}