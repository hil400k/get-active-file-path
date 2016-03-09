define(function (require, exports, module) {
    "use strict";

    var CommandManager      = brackets.getModule("command/CommandManager"),
        Menus               = brackets.getModule("command/Menus"),
        KeyBindingManager   = brackets.getModule("command/KeyBindingManager"),
        DocumentManager     = brackets.getModule("document/DocumentManager"),
        ProjectManager      = brackets.getModule("project/ProjectManager"),
        Dialogs             = brackets.getModule("widgets/Dialogs"),
        activeFilePath,
        projectRoot,
        projectDirectoryName,
        result;    

    // Function to run when the menu item is clicked
    function getActiveFilePath() {
        activeFilePath = DocumentManager.getCurrentDocument().file.fullPath;
        projectRoot = ProjectManager.getProjectRoot().fullPath;
        projectDirectoryName = projectRoot.match(/([^\/]*)\/*$/)[1];
        result = projectDirectoryName + '/' + activeFilePath.replace(projectRoot, "");
        
        Dialogs.showModalDialog("Current File Path", "Current File Path", "<label style='-o-user-select: all; -moz-user-select: all; -webkit-user-select: all; user-select: all; '>" + result + "</label>");
    }


    // First, register a command - a UI-less object associating an id to a handler
    var MY_COMMAND_ID = "activeFile.getFilePath";   // package-style naming to avoid collisions
    CommandManager.register("getActiveFilePath", MY_COMMAND_ID, getActiveFilePath);
    
    KeyBindingManager.addBinding(MY_COMMAND_ID, {key: "Ctrl-`", displayKey: "Ctrl-`"});
});