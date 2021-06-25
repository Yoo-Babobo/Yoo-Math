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
        $("#extra-functions-fake").css("height", 0);
    });

    $("#extra-functions").hover(() => {}, () => {
        $("#extra-functions").css("opacity", 0);
        $("#extra-functions").css("width", "12%");
        $("#extra-functions-fake").css("opacity", 1);
        $("#extra-functions-fake").css("height", "calc(100vh - 37.5px)");
    });
});

function type(a) {
    clear_if_calculated();
    $("#box").append(a);
    $("#box").scrollLeft(999999999);
}

function type_symbol(a) {
    $("#box").append(a);
    $("#box").scrollLeft(999999999);
    calculated = false;
}

function run(raw_math = $("#box").html()) {
    var math = raw_math
        .replace(/×/g, "*")
        .replace(/÷/g, "/")
        .replace(/%/g, "/100")
        .replace(/π/g, Math.PI)
        .replace(/e/g, Math.E);
    var output = eval(math).toString().replace(/Infinity/g, "∞");

    $("#box").html(output);
    set_last_calculation(raw_math + "=" + output);
    calculated = true;
}

function power(math = $("#box").html(), power = 2) {
    math = math
        .replace(/×/g, "*")
        .replace(/÷/g, "/")
        .replace(/%/g, "/100")
        .replace(/π/g, Math.PI)
        .replace(/e/g, Math.E);
    var output = Math.pow(eval(math), power).toString().replace(/Infinity/g, "∞");

    $("#box").html(output);
    set_last_calculation("(" + math + ")<sup>" + power + "</sup>=" + output);
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
            $("#box").html($("#box").html().slice(1));
        } else {
            $("#box").html($("#box").html().slice(0, -1));
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