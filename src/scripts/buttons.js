$("#__number-0").on("click", () => {
    type(0);
})
$("#__number-1").on("click", () => {
    type(1);
})
$("#__number-2").on("click", () => {
    type(2);
})
$("#__number-3").on("click", () => {
    type(3);
})
$("#__number-4").on("click", () => {
    type(4);
})
$("#__number-5").on("click", () => {
    type(5);
})
$("#__number-6").on("click", () => {
    type(6);
})
$("#__number-7").on("click", () => {
    type(7);
})
$("#__number-8").on("click", () => {
    type(8);
})
$("#__number-9").on("click", () => {
    type(9);
})

$("#__operation-add").on("click", () => {
    type_symbol("+");
})
$("#__operation-subtract").on("click", () => {
    type_symbol("-");
})
$("#__operation-multiply").on("click", () => {
    type_symbol("×");
})
$("#__operation-divide").on("click", () => {
    type_symbol("÷");
})
$("#__operation-percent").on("click", () => {
    type_symbol("%");
})

$("#__symbol-left-parenthesis").on("click", () => {
    type("(");
})
$("#__symbol-right-parenthesis").on("click", () => {
    type(")");
})
$("#__symbol-period").on("click", () => {
    type(".");
})

$("#__equals").on("click", () => {
    run();
})
$("#__clear").on("click", () => {
    clear();
})