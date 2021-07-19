type Dict<T = any> = { [key: string]: T };

Object.keys = function (o: object) {
    const list = [];

    for (let i in o)
        list.push(i);

    return list;
}
