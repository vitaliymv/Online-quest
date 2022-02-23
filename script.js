let answer = ["яблоко", "сайт", "браузер", "школа", "город"];
let was = [];
let progress = 0;
let num = Math.floor(Math.random() * answer.length)

$(document).ready(function () {
    $(".prog").knob({
        'min': 0,
        'max': 5,
        'readOnly': false,
        'displayInput': false,
        'angleOffset': -60,
        'angleArc': 120,
        'thickness': 0.2,
        'fgColor': 'darkred',
        'bgColor': 'lightblue',
        'lineCap': 'round',
        'width': '100%'
    })

    $(".slideRules").click(function () {
        $("#rules").slideToggle();
    })

    startRebus(num);
    $(".img").click(function () {
        num = Math.floor(Math.random() * answer.length);
        startRebus(num);
    })
    $("#btnTask1").click(function () {
        let ans = $("#inputTask1").val().toLowerCase();
        if (ans == answer[num]) {
            alertify.success("Right answer");
            $("#inputTask1").val("");
            progress++;
            $(".prog").val(progress).trigger('change');
            was.push(num);
            if (progress < 5) {
                do {
                    num = Math.floor(Math.random() * answer.length)
                } while (was.includes(num));
                startRebus(num);
            } else {
                $(".img, #inputTask1, #btnTask1").css({'display': 'none'});
                $("#nextTask").css({'display': 'flex'})
            }
        } else {
            alertify.error("Try again");
        }
    })
})

function startRebus(arg) {
    $("#image").attr("src", "Images/" + arg + ".jpg");
}