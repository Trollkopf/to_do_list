const colors = require('colors/safe');
require('colors');

const mostrarMenu=()=>{

        return new Promise(resolve =>{
        console.clear();
        
        console.log(colors.inverse("====================="));
        console.log(colors.inverse("Seleccione una opción"));
        console.log(colors.inverse("=====================\n"));

        console.log(`${'1.'.red.bold} Crear tarea `);
        console.log(`${'2.'.red.bold} Listar tareas `);
        console.log(`${'3.'.red.bold} Listar tareas completada(s) `);
        console.log(`${'4.'.red.bold} Listar tareas pendiente(s) `);
        console.log(`${'5.'.red.bold} Completar tarea(s) `);
        console.log(`${'6.'.red.bold} Borrar tarea `);
        console.log(`${'0.'.red.bold} Salir \n`);

        const readline = require('readline').createInterface({
            input:  process.stdin,
            output: process.stdout
        });

        readline.question('¿Qué desea hacer? ', (opt)=>{
            readline.close();
            resolve(opt);

        })
        
    })   
}

const pausa =()=>{

    return new Promise(resolve=>{

        const readline = require('readline').createInterface({
            input:  process.stdin,
            output: process.stdout
        });
    
        readline.question(`Presione ${'Enter'.blue.bold} para continuar`, ()=>{
            readline.close();
            resolve();
    
        })

    })

}

module.exports={
    mostrarMenu,
    pausa

}