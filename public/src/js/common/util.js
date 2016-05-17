export default {
    range: x => Array.apply(null, Array(x)).map((_, i) => i + 1),

    parseQuery(query) {
        const reg = /.*\?(.*=.*)/;

        let result;
        let queryArray;
        let matched = query.match(reg);

        if (matched && matched[1]) {
            queryArray = matched[1].split('&');
        }

        return _.chain(queryArray)
                    .map(s => [decodeURI(s.split('=')[0]), decodeURI(s.split('=')[1])])
                    .object()
                    .value();
    }
}
