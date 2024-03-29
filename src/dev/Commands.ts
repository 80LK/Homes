namespace Command {
    export interface Info {
        name: string;
        description?: string;
        args?: string;
        call: (args: string[]) => void;
    }

    const list: Dict<Info> = {};

    function getInfo(info: Info): Info {
        info.description = info.description || "";
        info.args = info.args || "";
        return info;
    }

    export function register(info: Info): void {
        if (has(info.name))
            throw new Error(`Command "${info.name}" was been register`);

        list[info.name] = getInfo(info);
    }
    export function has(name: string): boolean {
        return list.hasOwnProperty(name);
    }
    export function invoke(name: string, cmd: string[]): void {
        const command = get(name);
        if (!command) throw new Error(`Command "${name}" not been register`);

        command.call(cmd);
    }

    export function get(name: string): Info | null {
        return list[name] || null;
    }

    export function getListCommands(): Dict<Info> {
        return ModAPI.cloneObject(list, true);
    }
}

Callback.addCallback("NativeCommand", function (command) {
    const cmd = command.split(" ");
    const nameCmd = cmd[0];
    if (Command.has(nameCmd)) {
        cmd.shift();
        Command.invoke(nameCmd, cmd);
        Game.prevent();
    }
});
