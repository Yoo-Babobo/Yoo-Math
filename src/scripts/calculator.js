var calculated = true;
var selected = false;

$(document).on("focus", unselect);
$(document).on("click", unselect);
$(document).on("dblclick", unselect);

$("button").on("focus", () => {
    $("button").trigger("blur");
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

function run() {
    $("#box").html(eval($("#box").html()
        .replace(/×/g, "*")
        .replace(/÷/g, "/")
        .replace(/%/g, "/100")
        .replace(/π/g, Math.PI)
        .replace(/e/g, Math.E)));
    calculated = true;
    $("#__clear").text("C");
}

function clear(del = false) {
    if (selected) {
        $("#box").html("");
        unselect();
        calculated = false;
        $("#__clear").text("CE");
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
    $("#__clear").text("CE");
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
    $("#__clear").text("C");
    $("#box").addClass("selected");
}

function unselect() {
    selected = false;
    $("#__clear").text("CE");
    $("#box").removeClass("selected");
}

ipcRenderer.send("app-version");
ipcRenderer.on("app-version", (event, data) => {
    ipcRenderer.removeAllListeners("app-version");
    $("#version").text(data.version)
});