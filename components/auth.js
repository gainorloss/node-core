const jwt = require('jsonwebtoken');

export class auth {
    secret = 'application';

    /**
     * encrypt.
     * @param {*} obj 
     */
    encrypt(obj) {
        if (!obj) return null;

        return jwt.sign(obj, this.secret);
    }

    /**
       * decrypt.
       * @param {*} obj 
       */
    decrypt(token) {
        if (!token) return null;

        return jwt.verify(token, this.secret);
    }

}