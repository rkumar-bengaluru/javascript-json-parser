var logger = require('../logger/logger');

export default class IOString {

    constructor(chars, offset, count) {
        if (offset < 0)
            throw new Error('Offset cannot be negative');
        if (count < 0)
            throw new Error('count cannot be negative');

        let i;
        let j= offset;
        this.value = [];
        var ccode = chars[j].charCodeAt();
        // fix for removing white space in the begining of the string.
        while(ccode === 32) {
            j++;
            ccode = chars[j].charCodeAt();
        }
        
        for (i = j; i < (offset + count); i++) {
            var code = chars[i].charCodeAt();
            logger.debug('code at i=' + i +",code=" + code);
            //this.value.push(chars[i]);
            if (code != 34) // '\"'
                this.value[i] = chars[i];

        }
    }


    toString() {
        return this.value.join("");
    }

    stringify() {
        return this.value.join("");
    }
}
