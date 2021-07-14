module.exports = () => {
  if (process.platform === "win32") {
    registerProtocolHandler("yoo-math", "Yoo-Math Launch URL", process.execPath);
  }
}

function registerProtocolHandler (protocol, name, command) {
  var Registry = require("winreg");

  var protocolKey = new Registry({
    hive: Registry.HKCU,
    key: "\\Software\\Classes\\" + protocol
  });
  protocolKey.set("", Registry.REG_SZ, "URL:" + name, callback);
  protocolKey.set("URL Protocol", Registry.REG_SZ, "", callback);

  var commandKey = new Registry({
    hive: Registry.HKCU,
    key: "\\Software\\Classes\\" + protocol + "\\shell\\open\\command"
  });
  commandKey.set("", Registry.REG_SZ, '"' + command + '" "%1"', callback);

  function callback (err) {
    if (err) console.error(err.message || err);
  }
}