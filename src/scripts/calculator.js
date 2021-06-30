var calculated = true;
var selected = false;

setInterval(() => {
    if ($("#box").html() === null || $("#box").html() === "") {
        type(0);
    }

    if ($("#box").html() == "0") {
        calculated = true;
    }
}, 20);

$(() => {
    $(document).on("focus", unselect);
    $(document).on("click", unselect);
    $(document).on("dblclick", unselect);

    /*$('<div class="cal-btn-function-num-nav"><button class="cal-btn-function-num-button cal-btn-function-num-up">&#xf106;</button><button class="cal-btn-function-num-button cal-btn-function-num-down">&#xf107</button></div>').insertAfter(".cal-btn-function-num input");
    $(".cal-btn-function-num").each(() => {
        var spinner = $(this),
            input = spinner.find('input[type="number"]'),
            btnUp = spinner.find(".cal-btn-function-num-up"),
            btnDown = spinner.find(".cal-btn-function-num-down"),
            min = input.attr("min"),
            max = input.attr("max");

        btnUp.on("click", () => {
            var oldValue = parseFloat(input.val());

            if (oldValue >= max) {
                var newVal = oldValue;
            } else {
                var newVal = oldValue + 1;
            }

            spinner.find("input").val(newVal);
            spinner.find("input").trigger("change");
        });

        btnDown.on("click", () => {
            var oldValue = parseFloat(input.val());

            if (oldValue <= min) {
                var newVal = oldValue;
            } else {
                var newVal = oldValue - 1;
            }

            spinner.find("input").val(newVal);
            spinner.find("input").trigger("change");
        });
    });*/

    $("button").on("focus", () => {
        $("button").trigger("blur");
    });

    $("#extra-functions-fake").hover(() => {
        $("#extra-functions").css("opacity", 1);
        $("#extra-functions").css("width", "66%");
        $("#extra-functions-fake").css("opacity", 0);
        $("#extra-functions-fake").css("z-index", 0);
    });

    $("#extra-functions").hover(() => {}, () => {
        $("#extra-functions").css("opacity", 0);
        $("#extra-functions").css("width", "12%");
        $("#extra-functions-fake").css("opacity", 1);
        $("#extra-functions-fake").css("z-index", 888888);
    });
});

function type(a) {
    clear_if_calculated();
    
    if (a == "π" || a == "e" || a == "∞" || a == "(" || match_functions(a)) {
        if ($("#box").html().toString().slice(-1).match(/\d|π|e|∞|\)/g)) {
            $("#box").append("×" + a);
        } else {
            $("#box").append(a);
        }
    } else {
        if (a != ")" && $("#box").html().toString().slice(-1).match(/π|e|∞|\)/g)) {
            $("#box").append("×" + a);
        } else {
            $("#box").append(a);
        }
    }

    $("#box").scrollLeft(999999999);
}

function type_symbol(a) {
    $("#box").append(a);
    $("#box").scrollLeft(999999999);
    calculated = false;
}

function run(raw_math = $("#box").html()) {
    var math = raw_math
        .replace(/∞/g, "Infinity")
        .replace(/×/g, "*")
        .replace(/÷/g, "/")
        .replace(/%/g, "/100")
        .replace(/π/g, Math.PI)
        .replace(/e/g, Math.E)
        .replace(/\<function\>\<i\>sin\<\/i\>\(\<\/function\>/g, "Math.sin(")
        .replace(/\<function\>\<i\>cos\<\/i\>\(\<\/function\>/g, "Math.cos(")
        .replace(/\<function\>\<i\>tan\<\/i\>\(\<\/function\>/g, "Math.tan(")
        .replace(/\<sup\>(.*)\<\/sup\>/g, "** $1")
        .replace(/\<sqrt\>√\(\<\/sqrt\>/g, "Math.sqrt(")
        .replace(/\<roota\>\<i\>(.*)\<\/i\>√\(\<\/roota\>(.*)\)/g, "Math.pow($2, 1 / $1)");
    var output = eval(math).toString().replace(/Infinity/g, "∞");

    $("#box").html(output);
    set_last_calculation(raw_math + "=" + output);
    add_to_history(raw_math + "=" + output);
    calculated = true;
}

/*function power(math = $("#box").html(), power = 2) {
    math = math
        .replace(/×/g, "*")
        .replace(/÷/g, "/")
        .replace(/%/g, "/100")
        .replace(/π/g, Math.PI)
        .replace(/e/g, Math.E);
    var output = Math.pow(eval(math), power).toString().replace(/Infinity/g, "∞");

    $("#box").html(output);
    set_last_calculation("(" + math + ")<sup>" + power + "</sup>=" + output);
    add_to_history("(" + math + ")<sup>" + power + "</sup>=" + output);
    calculated = true;
}

function square_root(math = $("#box").html()) {
    math = math
        .replace(/×/g, "*")
        .replace(/÷/g, "/")
        .replace(/%/g, "/100")
        .replace(/π/g, Math.PI)
        .replace(/e/g, Math.E);
    var output = Math.sqrt(eval(math)).toString().replace(/Infinity/g, "∞");

    $("#box").html(output);
    set_last_calculation("√(" + math + ")=" + output);
    add_to_history("√(" + math + ")=" + output);
    calculated = true;
}

function root(math = $("#box").html(), root = 3) {
    math = math
        .replace(/×/g, "*")
        .replace(/÷/g, "/")
        .replace(/%/g, "/100")
        .replace(/π/g, Math.PI)
        .replace(/e/g, Math.E);
    var output = Math.pow(eval(math), 1 / root).toString().replace(/Infinity/g, "∞");

    $("#box").html(output);
    set_last_calculation(root + "√(" + math + ")=" + output);
    add_to_history(root + "√(" + math + ")=" + output);
    calculated = true;
}*/

function clear(del = false) {
    if (selected) {
        $("#box").html("");
        unselect();
        calculated = false;
        return;
    }

    if (calculated) {
        $("#box").html("");
    } else {
        if (del) {
            if ($("#box").html().toString().slice(0, 10) == "<function>") {
                $("#box function:first").remove();
            } else if ($("#box").html().toString().slice(0, 5) == "<sup>") {
                $("#box sup:first").remove();
            } else if ($("#box").html().toString().slice(0, 6) == "<sqrt>") {
                $("#box sqrt:first").remove();
            } else if ($("#box").html().toString().slice(0, 7) == "<roota>") {
                $("#box roota:first").remove();
            } else {
                $("#box").html($("#box").html().slice(1));
            }
        } else {
            if ($("#box").html().toString().slice(-11) == "</function>") {
                $("#box function:last").remove();
            } else if ($("#box").html().toString().slice(-6) == "</sup>") {
                $("#box sup:last").remove();
            } else if ($("#box").html().toString().slice(-7) == "</sqrt>") {
                $("#box sqrt:last").remove();
            } else if ($("#box").html().toString().slice(-8) == "</roota>") {
                $("#box roota:last").remove();
            } else {
                $("#box").html($("#box").html().slice(0, -1));
            }
        }
    }

    calculated = false;
}

function clear_if_calculated() {
    if (selected) {
        $("#box").html("");
        unselect();
        return;
    }

    if (calculated) {
        clear();
    }
}

function select() {
    selected = true;
    $("#box").addClass("selected");
}

function unselect() {
    selected = false;
    $("#box").removeClass("selected");
}

function set_last_calculation(math) {
    $("#last-calculation").html(math);
    $("#last-calculation").scrollLeft(999999999);
}

function match_functions(data) {
    if (data.toString().match(/\<function\>\<i\>(.*)\<\/i\>\(\<\/function\>|\<sqrt\>√\(\<\/sqrt\>|\<roota\>\<i\>(.*)\<\/i\>√\(\<\/roota\>/g)) {
        return true;
    } else {
        return false;
    }
}