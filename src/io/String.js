export default class String {

    constructor(chars, offset, count) {
        if (offset < 0)
            throw new Error('Offset cannot be negative');
        if (count < 0)
            throw new Error('count cannot be negative');

        let i;
        this.value = [];
        for (i = offset; i <= (offset + count); i++) {
            this.value.push(chars[i]);
        }
    }

    toString() {
        return this.value.join("");
    }
}