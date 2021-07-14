$(window).on("keydown", (e) => {
    if (e.ctrlKey && (e.key == "a" || e.key == "A")) {
        e.preventDefault();
    }
});

$(() => {
    fs.readFile("history.yoo", (err, data) => {
        if (err) return;

        var lines = data.toString().split("\n");
        lines.pop();
        lines.reverse().forEach((value) => {
            if (value != null || value != "") {
                $("#history").append("<p>" + value + "</p>");
            }
        });
    });
});