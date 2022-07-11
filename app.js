const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmar, mostrarListadoChecklist } = require('./helpers/inquirer');
const Tareas = require('./models/tareas');

const main = async()=>{

    let opt= '';
    const tareas = new Tareas();

    const tareasDB = leerDB();

    if(tareasDB){
        tareas.cargarTareasFromArray(tareasDB);

    }

    do {
        opt = await inquirerMenu();
        
        switch (opt) {
            case '1'://CREAR TAREA
                const desc = await leerInput('Descripción: ');
                tareas.crearTarea(desc);
                break;
            case '2'://LISTAR TAREAS
                tareas.listadoCompleto();                  
                break;
            case '3'://LISTAR COMPLETADAS
                tareas.listarPendientesCompletadas(true)   
                break;
            case '4'://LISTAR PENDIENTES
                tareas.listarPendientesCompletadas(false);                  
                break;
            case '5'://COMPLETAR TAREAS
                const ids = await mostrarListadoChecklist( tareas.listadoArr);
                tareas.toggleCompletadas(ids);
                break;
            case '6'://BORRAR TAREAS
                const id = await listadoTareasBorrar(tareas.listadoArr);               
                if(id != 0){

                    const ok = await confirmar('Está seguro');
                    if(ok){
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada'.bgRed);
                    }           
                }
                break;

        }

        guardarDB( tareas.listadoArr );
        
        await pausa();
        
    } while (opt !== '0');
}

main();