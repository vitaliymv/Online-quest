// 0 гарі потер
// 1 пірати
// 2 стар варс
// 3 шрек

let answer = [
    ["гарі потер", "гарри поттер", "harry potter"],
    ["пірати", "джек горобець", "пірати карибського моря", "пираты карибского моря"],
    ["стар варс", "старварс", "star wars", "зоряні війни"],
    ["самбаді", "шрек", "shrek", "somebody was told me", "готье"]
]

let was = [];
let progress = 0;
let num = Math.floor(Math.random() * answer.length)
let timeStorage = localStorage
let time;

if (timeStorage.getItem("time") != null) {
    time = parseInt(timeStorage.getItem("time"))
} else {
    time = 30
    timeStorage.setItem("time", time)
}

$(document).ready(function () {
    $(".prog").knob({
        'min': 0,
        'max': 4,
        'readOnly': false,
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
        'max': 30,
        'readOnly': false,
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

    $("#start").click(function() {
        $("#start").hide();
        $(".sound").show();
        startMusic(num);
        startTime();
    })

    $("#refresh").click(function() {
        num = Math.floor(Math.random() * answer.length);
        startMusic(num);
    })

    $("#btnTask1").click(function () {
        let ans = $("#inputTask1").val().toLowerCase();
        if (answer[num].indexOf(ans) != -1) {
            alertify.success("Right answer");
            $("#inputTask1").val("");
            progress++;
            $(".prog").val(progress).trigger('change');
            was.push(num);
            if (progress < 4) {
                do {
                    num = Math.floor(Math.random() * answer.length)
                } while (was.includes(num));
                startMusic(num);
            } else {
                $(".sound, #inputTask1, #btnTask1").css({'display': 'none'});
                $("#nextTask").css({'display': 'flex'})
            }
        } else {
            alertify.error("Try again");
        }
    })
})

function startMusic(arg) {
    $("#melody").attr("src", "sound/" + arg + ".mp3");
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