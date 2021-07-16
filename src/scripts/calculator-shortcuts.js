$(window).on("keydown", (e) => {
    if (e.ctrlKey && (e.key == "a" || e.key == "A")) {
        if (!$("input").is(":focus")) {
            e.preventDefault();
            if (selected) selected = false;
            else selected = true;
        }
    } else if (e.ctrlKey && (e.key == "c" || e.key == "C")) {
        if (selected) {
            e.preventDefault();
            navigator.clipboard.writeText($("#box").html());
            unselect();
        }
    }

    if (!$("input").is(":focus")) {
        switch (e.key) {
            case "0":
                type(0);
                break;
            case "1":
                type(1);
                break;
            case "2":
                type(2);
                break;
            case "3":
                type(3);
                break;
            case "4":
                type(4);
                break;
            case "5":
                type(5);
                break;
            case "6":
                type(6);
                break;
            case "7":
                type(7);
                break;
            case "8":
                type(8);
                break;
            case "9":
                type(9);
                break;
    
            case "+":
            case "=":
                type_symbol("+");
                break;
            case "-":
                type_symbol("-");
                break;
            case "*":
            case "x":
            case "X":
                type_symbol("×");
                break;
            case "/":
                type_symbol("÷");
                break;
            case "%":
                type_symbol("%");
                break;
            case "!":
                type_symbol("!");
                break;
            
            case "(":
                type("(");
                break;
            case ")":
                type(")");
                break;
            case ".":
                type(".");
                break;
            case "p":
            case "P":
                if (!e.ctrlKey) type("π");
                break;
            case "e":
            case "E":
                type("ｅ");
                break;
            case "i":
            case "I":
                type("∞");
                break;
            case "g":
            case "G":
                type("φ");
                break;
            
            case "Enter":
                run();
                break;
            case "Backspace":
                clear();
                break;
            case "Delete":
                clear(true);
                break;
        }
    }
});