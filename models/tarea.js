const {v4: uudiv4} = require('uuid');
const colors = require('colors/safe');
require('colors');

class Tarea{
    id = (''.blue.italic);
    desc = ''.blue.italic;
    completadoEn = null;

    constructor(desc){

        this.id = uudiv4();
        this.desc = desc;
    }

}

module.exports = Tarea;