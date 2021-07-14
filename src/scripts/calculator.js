const { YooMath } = require("@yoo-babobo/yoo-math.js");

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
    
    if (a == "π" || a == "e" || a == "∞" || a == "φ" || a == "(" || match_functions(a)) {
        if ($("#box").html().toString().slice(-1).match(/\d|π|e|∞|φ|\)/g)) {
            $("#box").append("×" + a);
        } else {
            $("#box").append(a);
        }
    } else {
        if (a != ")" && $("#box").html().toString().slice(-1).match(/π|e|∞|φ|\)/g)) {
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
        .replace(/φ/g, 1.618033988749895)
        .replace(/\<function\>\<i\>sin\<\/i\> \(\<\/function\>/g, "Math.sin(")
        .replace(/\<function\>\<i\>cos\<\/i\> \(\<\/function\>/g, "Math.cos(")
        .replace(/\<function\>\<i\>tan\<\/i\> \(\<\/function\>/g, "Math.tan(")
        .replace(/\<function\>\<i\>sinh\<\/i\> \(\<\/function\>/g, "Math.sinh(")
        .replace(/\<function\>\<i\>cosh\<\/i\> \(\<\/function\>/g, "Math.cosh(")
        .replace(/\<function\>\<i\>tanh\<\/i\> \(\<\/function\>/g, "Math.tanh(")
        .replace(/\<function\>\<i\>asin\<\/i\> \(\<\/function\>/g, "Math.asin(")
        .replace(/\<function\>\<i\>acos\<\/i\> \(\<\/function\>/g, "Math.acos(")
        .replace(/\<function\>\<i\>atan\<\/i\> \(\<\/function\>/g, "Math.atan(")
        .replace(/\<function\>\<i\>asinh\<\/i\> \(\<\/function\>/g, "Math.asinh(")
        .replace(/\<function\>\<i\>acosh\<\/i\> \(\<\/function\>/g, "Math.acosh(")
        .replace(/\<function\>\<i\>atanh\<\/i\> \(\<\/function\>/g, "Math.atanh(")
        .replace(/\<function\>\<i\>csc\<\/i\> \(\<\/function\>/g, "YooMath.trig.csc(")
        .replace(/\<function\>\<i\>sec\<\/i\> \(\<\/function\>/g, "YooMath.trig.sec(")
        .replace(/\<function\>\<i\>cot\<\/i\> \(\<\/function\>/g, "YooMath.trig.cot(")
        .replace(/\<function\>\<i\>csch\<\/i\> \(\<\/function\>/g, "YooMath.trig.csch(")
        .replace(/\<function\>\<i\>sech\<\/i\> \(\<\/function\>/g, "YooMath.trig.sech(")
        .replace(/\<function\>\<i\>coth\<\/i\> \(\<\/function\>/g, "YooMath.trig.coth(")
        .replace(/\<function\>\<i\>acsc\<\/i\> \(\<\/function\>/g, "YooMath.trig.acsc(")
        .replace(/\<function\>\<i\>asec\<\/i\> \(\<\/function\>/g, "YooMath.trig.asec(")
        .replace(/\<function\>\<i\>acot\<\/i\> \(\<\/function\>/g, "YooMath.trig.acot(")
        .replace(/\<function\>\<i\>acsch\<\/i\> \(\<\/function\>/g, "YooMath.trig.acsch(")
        .replace(/\<function\>\<i\>asech\<\/i\> \(\<\/function\>/g, "YooMath.trig.asech(")
        .replace(/\<function\>\<i\>acoth\<\/i\> \(\<\/function\>/g, "YooMath.trig.acoth(")
        .replace(/\<sup\>(.*)\<\/sup\>/g, "** $1")
        .replace(/\<sqrt\>√\(\<\/sqrt\>/g, "Math.sqrt(")
        .replace(/\<roota\>\<i\>(.*)\<\/i\> √\(\<\/roota\>(.*)\)/g, "Math.pow($2, 1 / $1)");
    var output = eval(math).toString().replace(/Infinity/g, "∞");

    $("#box").html(output);
    set_last_calculation(raw_math + "=" + output);
    add_to_history(raw_math + "=" + output);
    calculated = true;
}

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
    if (data.toString().match(/\<function\>\<i\>(.*)\<\/i\> \(\<\/function\>|\<sqrt\>√\(\<\/sqrt\>|\<roota\>\<i\>(.*)\<\/i\> √\(\<\/roota\>/g)) {
        return true;
    } else {
        return false;
    }
}