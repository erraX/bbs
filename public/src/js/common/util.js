export default {
    range: x => Array.apply(null, Array(x)).map((_, i) => i + 1),

    getQueryValue(search, name) {
        let value;
        let reg = new RegExp(`/${name}=(.*)/`);

        let matched = search.match(reg);
        if (matched && matched[1]) {
            value = parseInt(matched[1], 10);
        }

        return value;
    },
}
