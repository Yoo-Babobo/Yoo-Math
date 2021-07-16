const { YooMath } = require("@yoo-babobo/yoo-math.js");

var calculated = true;
var selected = false;
var trig_type = 0;

setInterval(() => {
    if ($("#box").html() === null || $("#box").html() === "") type(0);
    if ($("#box").html() == "0") calculated = true;
    if (calculated) ipcRenderer.send("set-calculated");
    else ipcRenderer.send("not-calculated");
    if (selected) select();
    else unselect();
    switch (trig_type) {
        case 0:
            $("#__function-trigonometry-sine i").text("sin");
            $("#__function-trigonometry-sine").attr("aria-label", "Sine");
            $("#__function-trigonometry-sine").attr("data-microtip-position", "top");
            $("#__function-trigonometry-cosine i").text("cos");
            $("#__function-trigonometry-cosine").attr("aria-label", "Cosine");
            $("#__function-trigonometry-tangent i").text("tan");
            $("#__function-trigonometry-tangent").attr("aria-label", "Tangent");
            $("#__function-trigonometry-cosecant i").text("csc");
            $("#__function-trigonometry-cosecant").attr("aria-label", "Cosecant");
            $("#__function-trigonometry-cosecant").attr("data-microtip-position", "top");
            $("#__function-trigonometry-secant i").text("sec");
            $("#__function-trigonometry-secant").attr("aria-label", "Secant");
            $("#__function-trigonometry-cotangent i").text("cot");
            $("#__function-trigonometry-cotangent").attr("aria-label", "Cotangent");
            $("#__function-trigonometry-toggle-hyperbolic").removeClass("active");
            $("#__function-trigonometry-toggle-inverse").removeClass("active");
            $(".trig-indicator").addClass("hidden");
            $("#trig-indicator-alt").addClass("hidden");
            break;
        case 1:
            $("#__function-trigonometry-sine i").text("sinh");
            $("#__function-trigonometry-sine").attr("aria-label", "Hyperbolic Sine");
            $("#__function-trigonometry-sine").attr("data-microtip-position", "top");
            $("#__function-trigonometry-cosine i").text("cosh");
            $("#__function-trigonometry-cosine").attr("aria-label", "Hyperbolic Cosine");
            $("#__function-trigonometry-tangent i").text("tanh");
            $("#__function-trigonometry-tangent").attr("aria-label", "Hyperbolic Tangent");
            $("#__function-trigonometry-cosecant i").text("csch");
            $("#__function-trigonometry-cosecant").attr("aria-label", "Hyperbolic Cosecant");
            $("#__function-trigonometry-cosecant").attr("data-microtip-position", "top-right");
            $("#__function-trigonometry-secant i").text("sech");
            $("#__function-trigonometry-secant").attr("aria-label", "Hyperbolic Secant");
            $("#__function-trigonometry-cotangent i").text("coth");
            $("#__function-trigonometry-cotangent").attr("aria-label", "Hyperbolic Cotangent");
            $("#__function-trigonometry-toggle-hyperbolic").addClass("active");
            $("#__function-trigonometry-toggle-inverse").removeClass("active");
            $(".trig-indicator:first").addClass("hidden");
            $(".trig-indicator:last").removeClass("hidden");
            $("#trig-indicator-alt").addClass("hidden");
            break;
        case 2:
            $("#__function-trigonometry-sine i").text("asin");
            $("#__function-trigonometry-sine").attr("aria-label", "Inverse Sine");
            $("#__function-trigonometry-sine").attr("data-microtip-position", "top");
            $("#__function-trigonometry-cosine i").text("acos");
            $("#__function-trigonometry-cosine").attr("aria-label", "Inverse Cosine");
            $("#__function-trigonometry-tangent i").text("atan");
            $("#__function-trigonometry-tangent").attr("aria-label", "Inverse Tangent");
            $("#__function-trigonometry-cosecant i").text("acsc");
            $("#__function-trigonometry-cosecant").attr("aria-label", "Inverse Cosecant");
            $("#__function-trigonometry-cosecant").attr("data-microtip-position", "top-right");
            $("#__function-trigonometry-secant i").text("asec");
            $("#__function-trigonometry-secant").attr("aria-label", "Inverse Secant");
            $("#__function-trigonometry-cotangent i").text("acot");
            $("#__function-trigonometry-cotangent").attr("aria-label", "Inverse Cotangent");
            $("#__function-trigonometry-toggle-hyperbolic").removeClass("active");
            $("#__function-trigonometry-toggle-inverse").addClass("active");
            $(".trig-indicator:first").removeClass("hidden");
            $(".trig-indicator:last").addClass("hidden");
            $("#trig-indicator-alt").addClass("hidden");
            break;
        case 3:
            $("#__function-trigonometry-sine i").text("asinh");
            $("#__function-trigonometry-sine").attr("aria-label", "Inverse Hyperbolic Sine");
            $("#__function-trigonometry-sine").attr("data-microtip-position", "top-right");
            $("#__function-trigonometry-cosine i").text("acosh");
            $("#__function-trigonometry-cosine").attr("aria-label", "Inverse Hyperbolic Cosine");
            $("#__function-trigonometry-tangent i").text("atanh");
            $("#__function-trigonometry-tangent").attr("aria-label", "Inverse Hyperbolic Tangent");
            $("#__function-trigonometry-cosecant i").text("acsch");
            $("#__function-trigonometry-cosecant").attr("aria-label", "Inverse Hyperbolic Cosecant");
            $("#__function-trigonometry-cosecant").attr("data-microtip-position", "top-right");
            $("#__function-trigonometry-secant i").text("asech");
            $("#__function-trigonometry-secant").attr("aria-label", "Inverse Hyperbolic Secant");
            $("#__function-trigonometry-cotangent i").text("acoth");
            $("#__function-trigonometry-cotangent").attr("aria-label", "Inverse Hyperbolic Cotangent");
            $("#__function-trigonometry-toggle-hyperbolic").addClass("active");
            $("#__function-trigonometry-toggle-inverse").addClass("active");
            $(".trig-indicator:first").removeClass("hidden");
            $(".trig-indicator:last").addClass("hidden");
            $("#trig-indicator-alt").removeClass("hidden");
            break;
    }
}, 20);

$(() => {
    $(document).on("focus", unselect);
    $(document).on("click", unselect);
    $(document).on("dblclick", unselect);

    $("#extra-functions-fake").on("mouseover", () => {
        $("#extra-functions").css("opacity", 1);
        $("#extra-functions").css("width", "66%");
        $("#extra-functions-fake").css("opacity", 0);
        $("#extra-functions-fake").css("z-index", 0);
    });

    $("#extra-functions").on("mouseleave", () => {
        $("#extra-functions").css("opacity", 0);
        $("#extra-functions").css("width", "12%");
        $("#extra-functions-fake").css("opacity", 1);
        $("#extra-functions-fake").css("z-index", 888888);
    });

    ipcRenderer.send("calculated");
    ipcRenderer.on("calculated", (event, data) => {
        ipcRenderer.removeAllListeners("calculated");
        calculated = data.bool;
    });
    ipcRenderer.send("calculation");
    ipcRenderer.on("calculation", (event, data) => {
        ipcRenderer.removeAllListeners("calculation");
        set_calculation(data.math);
    });
    ipcRenderer.send("last-calculation");
    ipcRenderer.on("last-calculation", (event, data) => {
        ipcRenderer.removeAllListeners("last-calculation");
        set_last_calculation(data.math);
    });
    ipcRenderer.send("trig-type");
    ipcRenderer.on("trig-type", (event, data) => {
        ipcRenderer.removeAllListeners("trig-type");
        trig_type = data.type;
    });
});

function type(a) {
    clear_if_calculated();
    if (a == "π" || a == "ｅ" || a == "∞" || a == "φ" || a == "(" || match_functions(a)) {
        if ($("#box").html().toString().slice(-1).match(/\d|π|ｅ|∞|φ|!|\)/g)) $("#box").append("×" + a);
        else $("#box").append(a);
    } else {
        if (a != ")" && $("#box").html().toString().slice(-1).match(/π|ｅ|∞|φ|!|\)/g)) $("#box").append("×" + a);
        else $("#box").append(a);
    }
    set_calculation($("#box").html());
    $("#box").scrollLeft(999999999);
}
function type_symbol(a) {
    if (a == "-") clear_if_calculated();
    $("#box").append(a);
    set_calculation($("#box").html());
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
        .replace(/ｅ/g, Math.E)
        .replace(/φ/g, 1.618033988749895)
        .replace(/(\d+)!/g, "YooMath.fact($1)")
        .replace(/\<function\>\<i\>ln\<\/i\> \(\<\/function\>/g, "Math.log(")
        .replace(/\<function\>\<i\>exp\<\/i\> \(\<\/function\>/g, "Math.exp(")
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
        .replace(/\<sup\>(.*)\<\/sup\>/g, "**$1")
        .replace(/\<sqrt\>√\(\<\/sqrt\>/g, "Math.sqrt(")
        .replace(/\<root\>\<i\>(.*)\<\/i\> √\(\<\/root\>(.*)\)/g, "YooMath.root($2, $1)");
    var fixed_raw_math = raw_math.replace(/ｅ/g, "e");
    var output = eval(math).toString().replace(/Infinity/g, "∞");

    set_calculation(output);
    set_last_calculation(fixed_raw_math + "=" + output);
    add_to_history(fixed_raw_math + "=" + output);
    calculated = true;
}

function clear(del = false) {
    if (selected) {
        $("#box").html("");
        unselect();
        calculated = false;
        return;
    }

    if (calculated) $("#box").html(""); else {
        if (del) {
            if ($("#box").html().toString().slice(0, 10) == "<function>") $("#box function:first").remove();
            else if ($("#box").html().toString().slice(0, 5) == "<sup>") $("#box sup:first").remove();
            else if ($("#box").html().toString().slice(0, 6) == "<sqrt>") $("#box sqrt:first").remove();
            else if ($("#box").html().toString().slice(0, 6) == "<root>") $("#box root:first").remove();
            else $("#box").html($("#box").html().slice(1));
        } else {
            if ($("#box").html().toString().slice(-11) == "</function>") $("#box function:last").remove();
            else if ($("#box").html().toString().slice(-6) == "</sup>") $("#box sup:last").remove();
            else if ($("#box").html().toString().slice(-7) == "</sqrt>") $("#box sqrt:last").remove();
            else if ($("#box").html().toString().slice(-7) == "</root>") $("#box root:last").remove()
            else $("#box").html($("#box").html().slice(0, -1));
        }
    }
    set_calculation($("#box").html());
    calculated = false;
}
function clear_if_calculated() {
    if (selected) {
        $("#box").html("");
        unselect();
        return;
    }
    if (calculated) clear();
}

function select() {
    selected = true;
    $("#box").addClass("selected");
}
function unselect() {
    selected = false;
    $("#box").removeClass("selected");
}

function set_calculation(math) {
    $("#box").html(math);
    $("#box").scrollLeft(999999999);
    ipcRenderer.send("set-calculation", { math: math });
}
function set_last_calculation(math) {
    $("#last-calculation").html(math);
    $("#last-calculation").scrollLeft(999999999);
    ipcRenderer.send("set-last-calculation", { math: math });
}

function match_functions(data) {
    if (data.toString().match(/\<function\>\<i\>(.*)\<\/i\> \(\<\/function\>|\<sqrt\>√\(\<\/sqrt\>|\<root\>\<i\>(.*)\<\/i\> √\(\<\/root\>/g)) return true;
    else return false;
}