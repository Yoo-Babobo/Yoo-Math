$("#__number-0").on("click", () => type(0));
$("#__number-1").on("click", () => type(1));
$("#__number-2").on("click", () => type(2));
$("#__number-3").on("click", () => type(3));
$("#__number-4").on("click", () => type(4));
$("#__number-5").on("click", () => type(5));
$("#__number-6").on("click", () => type(6));
$("#__number-7").on("click", () => type(7));
$("#__number-8").on("click", () => type(8));
$("#__number-9").on("click", () => type(9));

$("#__symbol-left-parenthesis").on("click", () => type("("));
$("#__symbol-right-parenthesis").on("click", () => type(")"));
$("#__symbol-period").on("click", () => type("."));

$("#__operation-add").on("click", () => type_symbol("+"));
$("#__operation-subtract").on("click", () => type_symbol("-"));
$("#__operation-multiply").on("click", () => type_symbol("×"));
$("#__operation-divide").on("click", () => type_symbol("÷"));
$("#__operation-percent").on("click", () => type_symbol("%"));
$("#__operation-fact").on("click", () => type_symbol("!"));

$("#__constant-pi").on("click", () => type("π"));
$("#__constant-e").on("click", () => type("ｅ"));
$("#__constant-infinity").on("click", () => type("∞"));
$("#__constant-gr").on("click", () => type("φ"));

$("#__function-square").on("click", () => type_symbol("<sup>2</sup>"));
$("#__function-square-root").on("click", () => type("<sqrt>√(</sqrt>"));
$("#__function-one-divided-by").on("click", () => type("1÷("));
$("#__function-power").on("click", () => type_symbol("<sup>" +  $("#power-num").val() + "</sup>"));
$("#__function-root").on("click", () => type("<root><i>" + $("#root-num").val() + "</i> √(</root>"));

$("#__function-log-ln").on("click", () => type("<function><i>ln</i> (</function>"));
$("#__function-log-exp").on("click", () => type("<function><i>exp</i> (</function>"));

$("#__function-trigonometry-sine").on("click", () => {
    switch (trig_type) {
        case 0:
            type("<function><i>sin</i> (</function>");
            break;
        case 1:
            type("<function><i>sinh</i> (</function>");
            break;
        case 2:
            type("<function><i>asin</i> (</function>");
            break;
        case 3:
            type("<function><i>asinh</i> (</function>");
            break;
    }
});
$("#__function-trigonometry-cosine").on("click", () => {
    switch (trig_type) {
        case 0:
            type("<function><i>cos</i> (</function>");
            break;
        case 1:
            type("<function><i>cosh</i> (</function>");
            break;
        case 2:
            type("<function><i>acos</i> (</function>");
            break;
        case 3:
            type("<function><i>acosh</i> (</function>");
            break;
    }
});
$("#__function-trigonometry-tangent").on("click", () => {
    switch (trig_type) {
        case 0:
            type("<function><i>tan</i> (</function>");
            break;
        case 1:
            type("<function><i>tanh</i> (</function>");
            break;
        case 2:
            type("<function><i>atan</i> (</function>");
            break;
        case 3:
            type("<function><i>atanh</i> (</function>");
            break;
    }
});
$("#__function-trigonometry-cosecant").on("click", () => {
    switch (trig_type) {
        case 0:
            type("<function><i>csc</i> (</function>");
            break;
        case 1:
            type("<function><i>csch</i> (</function>");
            break;
        case 2:
            type("<function><i>acsc</i> (</function>");
            break;
        case 3:
            type("<function><i>acsch</i> (</function>");
            break;
    }
});
$("#__function-trigonometry-secant").on("click", () => {
    switch (trig_type) {
        case 0:
            type("<function><i>sec</i> (</function>");
            break;
        case 1:
            type("<function><i>sech</i> (</function>");
            break;
        case 2:
            type("<function><i>asec</i> (</function>");
            break;
        case 3:
            type("<function><i>asech</i> (</function>");
            break;
    }
});
$("#__function-trigonometry-cotangent").on("click", () => {
    switch (trig_type) {
        case 0:
            type("<function><i>cot</i> (</function>");
            break;
        case 1:
            type("<function><i>coth</i> (</function>");
            break;
        case 2:
            type("<function><i>acot</i> (</function>");
            break;
        case 3:
            type("<function><i>acoth</i> (</function>");
            break;
    }
});

$("#__function-trigonometry-toggle-hyperbolic").on("click", () => {
    switch (trig_type) {
        case 0:
            trig_type = 1;
            break;
        case 1:
            trig_type = 0;
            break;
        case 2:
            trig_type = 3;
            break;
        case 3:
            trig_type = 2;
            break;
    }
    ipcRenderer.send("set-trig-type", { type: trig_type });
});
$("#__function-trigonometry-toggle-inverse").on("click", () => {
    switch (trig_type) {
        case 0:
            trig_type = 2;
            break;
        case 1:
            trig_type = 3;
            break;
        case 2:
            trig_type = 0;
            break;
        case 3:
            trig_type = 1;
            break;
    }
    ipcRenderer.send("set-trig-type", { type: trig_type });
});

$("#__equals").on("click", () => run());
$("#__clear").on("click", () => clear());