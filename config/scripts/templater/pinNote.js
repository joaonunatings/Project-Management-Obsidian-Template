function pinNote() {
    app.commands.executeCommandById("workspace:toggle-pin");
    return "";
}
module.exports = pinNote;