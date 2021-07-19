namespace Homes {
    type DictHomes = Dict<Vector>;
    const reservKeys = ["set", "del", "delete", "all", "help", "?", "list"];
    interface SaverHomesScope {
        homes: DictHomes,
        lastHome: string;
    }
    let data: SaverHomesScope = {
        homes: {},
        lastHome: null
    }

    Command.register({
        name: "/home",
        call: function (args) {
            switch (args[0]) {
                case "help":
                case "?":
                    Game.message(Translation.translate(
                        `/home set [name] - set the point of the house under the name \"name\"
/home del <name> - delete the home point as \"name\".
/home [name] - teleport to the point of the house \"name\".
/home list - view the list of houses.`
                    ));
                    break;

                case "set":
                    var name = "";
                    if (args[1] != null) {
                        if (reservKeys.indexOf(args[1]) != -1) {
                            Game.message(Translation.sprintf("Cannot create a house named \"%s\"", args[1]));
                            break;
                        }

                        name = args[1];
                    } else {
                        var i = 1;
                        do {
                            name = "home" + i;
                            i++;
                        } while (data.homes.hasOwnProperty(name));
                    }

                    if (data.homes.hasOwnProperty(name)) {
                        var str = "Home \"%s\" update.";
                    } else {
                        var str = "Home \"%s\" created.";
                    }

                    data.homes[name] = Player.getPosition();
                    data.lastHome = name;

                    Game.message(Translation.sprintf(
                        str, name
                    ));
                    break;

                case "all":
                case "list":
                    var list = Object.keys(data.homes);
                    if(list.length == 0)
                        Game.message(Translation.translate("Home not found."));
                    else
                        Game.message(Translation.sprintf("List of houses: %s", list.join(", ")));
                    break;

                case "del":
                case "delete":
                    if (args[1] == null) {
                        Game.message(Translation.translate("Invalid command syntax."));
                        break;
                    }

                    var name = args[1];
                    if (data.homes.hasOwnProperty(name)) {
                        delete data.homes[name];
                        Game.message(Translation.sprintf("Home \"%s\" removed.", name));
                    } else if (name == "all") {
                        data.homes = {};
                        Game.message(Translation.translate("All houses are removed."));
                    } else {
                        Game.message(Translation.sprintf("Home \"%s\" not found.", name));
                    }
                    break;

                case undefined:
                    if (data.lastHome == null) {
                        Game.message(Translation.translate("Home not found."));
                        break;
                    }
                    if (data.homes.hasOwnProperty(data.lastHome)) {
                        var home = data.homes[data.lastHome];
                        Player.setPosition(home.x, home.y, home.z);
                        Game.message(Translation.translate("You are at home."));
                    } else {
                        Game.message(Translation.sprintf("Home \"%s\" was not found, it may have been deleted.", data.lastHome));
                    }
                    break;

                default:
                    var name = args[0];
                    if (data.homes.hasOwnProperty(name)) {
                        var home = data.homes[name];
                        Player.setPosition(home.x, home.y, home.z);
                        Game.message(Translation.translate("You are at home."));
                    } else {
                        Game.message(Translation.sprintf("Home \"%s\" not found.", name));
                    }
                    break;
            }
        }
    });
    Command.register({
        name: "/h",
        call: (args) => {
            if (args.length == 0)
                args.push("?");

            Command.get("/home").call(args)
        }
    });
    Command.register({
        name: "/sethome",
        call: (args) => Command.get("/home").call(["set", ...args])
    })

    Saver.addSavesScope<SaverHomesScope>("Homes",
        function read(scope) {
            data.homes = {};
            data.lastHome = null;

            if (scope) {
                for (var i in scope.homes)
                    data.homes[i] = scope.homes[i];

                data.lastHome = scope.lastHome;
            }
        },
        function save() {
            return data;
        }
    );
}
