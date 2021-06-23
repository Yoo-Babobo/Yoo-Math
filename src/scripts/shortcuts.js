$(window).on("keydown", (e) => {
    if (e.ctrlKey && e.altKey) {
        ipcRenderer.send('hide-me');
    } else if (e.ctrlKey && (e.key == "a" || e.key == "A")) {
        e.preventDefault();
        select();
    }

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
            type_symbol("+");
            break;
        case "=":
            type_symbol("+");
            break;
        case "-":
            type_symbol("-");
            break;
        case "*":
            type_symbol("×");
            break;
        case "x":
            type_symbol("×");
            break;
        case "X":
            type_symbol("×");
            break;
        case "/":
            type_symbol("÷");
            break;
        case "%":
            type_symbol("%");
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
            type("π");
            break;
        case "P":
            type("π");
            break;
        case "e":
            type("e");
            break;
        case "E":
            type("e");
            break;
        
        case "Enter":
            run();
            break;
        case "Backspace":
            clear();
            break;
        case "Delete":
            clear(true)
            break;
    }
});