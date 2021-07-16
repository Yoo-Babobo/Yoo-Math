class Cookie {
    constructor(name, value = "", days = 30, path = "/", autoInit = true) {
        this.name = name;
        this.value = value;
        this.days = days;
        this.path = path;
        if (autoInit) this.init();
    }

    init() {
        var d = new Date();
        d.setTime(d.getTime() + (this.days * 24 * 60 * 60 * 1000));
        document.cookie = this.name + "=" + this.value + ";expires=" + d.toGMTString() + ";path=" + this.path;
    }

    destroy() {
        var d = new Date();
        d.setTime(d.getTime() - (60 * 60 * 1000));
        document.cookie = this.name + "=expires;" + d.toGMTString() + ";path=" + this.path;
    }

    setValue(value) {
        this.value = value;
        this.init();
    }

    get name() { return this.name; }
    get value() { return this.value; }
    get days() { return this.days; }
}