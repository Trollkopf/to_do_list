const inquirer = require('inquirer');
const colors = require('colors/safe');
require('colors');

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        pageSize: 10,
        message: '¿Que desea hacer?',
        choices: [
            {
                value: '1',
                name: `${colors.red.bold('1.')} Crear tarea `
            },
            {
                value: '2',
                name: `${colors.red.bold('2.')} Listar tareas `
            },
            {
                value: '3',
                name: `${colors.red.bold('3.')} Listar tareas completada(s) `
            },
            {
                value: '4',
                name: `${colors.red.bold('4.')} Listar tareas pendiente(s) `
            },
            {
                value: '5',
                name: `${colors.red.bold('5.')} Completar tarea(s) `
            },
            {
                value: '6',
                name: `${colors.red.bold('6.')} Borrar tarea `
            },
            {
                value: '0',
                name: `${colors.red.bold('0.')} Salir \n`
            },
        ]
    }
];


const inquirerMenu = async()=>{

    console.clear();
        
        console.log(colors.inverse("  =====================  "));
        console.log(colors.inverse("  Seleccione una opción  "));
        console.log(colors.inverse("  =====================  \n"));

        const {opcion} = await inquirer.prompt(preguntas);

        return opcion;
}

const pausa = async()=>{

    const pausaInput = [
        {
            type: 'input',
            name: 'pausa',
            message: `Presione ${colors.blue.bold('Enter')} para continuar`
        }
    ]

    console.log('\n');
    await inquirer.prompt(pausaInput);

}

const leerInput = async(message)=>{

    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value){
                if(value.length === 0){
                    return 'Por favor, ingrese un valor.';
                }
                return true;
            }
        }
    ];

    const {desc} = await inquirer.prompt(question);
    return desc;
}

const listadoTareasBorrar = async( tareas = [])=>{

    const choices = tareas.map( (tarea, i) =>{

        const idx = `${i+1}.`.green;

        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`
        }
    });

    choices.unshift({
        value: '0',
        name: '0.'.green + 'Cancelar'
    })

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ]

    const { id } = await inquirer.prompt(preguntas);
    return id;

}

const confirmar = async(message) =>{

    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const{ok} = await inquirer.prompt(question);
    return ok;  
    
}

const mostrarListadoChecklist = async( tareas = [])=>{

    const choices = tareas.map( (tarea, i) =>{

        const idx = `${i+1}.`.green;

        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
            checked: (tarea.completadoEn)? true : false
        }
    });

    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices
        }
    ]

    const { ids } = await inquirer.prompt(pregunta);
    return ids;

}

module.exports={
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    mostrarListadoChecklist,
    confirmar

}