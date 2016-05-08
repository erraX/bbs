export default function processor(data, keyName) {
    data[keyName] = data[keyName].toISOString();
    return data;
}
