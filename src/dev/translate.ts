Translation.addTranslation(`/home set [name] - set the point of the house under the name \"name\"
/home del <name> - delete the home point as \"name\".
/home [name] - teleport to the point of the house \"name\".
/home list - view the list of houses.`, {
    ru: `/home set [name] - установить точку дома под именем \"name\".
/home del <name> - удалить точку дома под именем \"name\".
/home [name] - телепортироваться на точку дома \"name\".
/home list - посмотреть список домов.`,
    en: `/home set [name] - set the point of the house under the name \"name\"
/home del <name> - delete the home point as \"name\".
/home [name] - teleport to the point of the house \"name\".
/home list - view the list of houses.`
});
Translation.addTranslation("Home \"%s\" created.", {
    ru: "Дом \"%s\" создан.",
    en: "Home with the name \"%s\" created."
});
Translation.addTranslation("Home \"%s\" update.", {
    ru: "Дом \"%s\" обновлен.",
    en: "Home with the name \"%s\" updated."
});
Translation.addTranslation("Home \"%s\" removed.", {
    ru: "Дом \"%s\" удален.",
    en: "Home \"%s\" removed."
});
Translation.addTranslation("Home \"%s\" not found.", {
    ru: "Дом \"%s\" не найден.",
    en: "Home \"%s\" not found."
});
Translation.addTranslation("Invalid command syntax.", {
    ru: "Неверный синтаксис команды.",
    en: "Invalid command syntax."
});
Translation.addTranslation("You are at home.", {
    ru: "Вы дома.",
    en: "You are at home."
});
Translation.addTranslation("Home \"%s\" was not found, it may have been deleted.", {
    ru: "Дом \"%s\" не найден, возможно он был удален.",
    en: "Home \"%s\" was not found, it may have been deleted."
});

Translation.addTranslation("Cannot create a house named \"%s\"", {
    ru: "Невозможно создать дом с именем \"%s\".",
    en: "Cannot create a house named \"%s\"."
});
Translation.addTranslation("All houses are removed.", {
    ru: "Все дома удалены.",
    en: "All houses are removed."
});
Translation.addTranslation("Home not found.", {
    ru: "Дом не найден.",
    en: "Home not found."
});
Translation.addTranslation("List of houses: %s",{
    ru:"Список домов: %s",
    en:"List of houses: %s"
});


namespace Translation {
    export function sprintf(name: string, ...args: string[]) {
        var str = Translation.translate(name);

        for (var i = 0; i < args.length; i++)
            str = str.replace("%s", args[i]);

        return str;
    }
}
