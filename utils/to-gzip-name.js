module.exports = function(name) {
    const lastDot = name.lastIndexOf(".");
    return name.slice(0, lastDot) + ".gz" + name.slice(lastDot)
}
