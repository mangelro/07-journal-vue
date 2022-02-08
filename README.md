# 07-journal-vue

## Puntos de interés

### Estructura del proyecto en modulos

## Router

### Separación de los hijos en fichero separados
	
	dayBookRouter.js

### En el router principal insertar los hijos con el spread
	
	{
		path:'/daybook',
		...dayBookRouter
	}

### Los parámetros de las ruta definilos como props para hacerlos más evidentes y pasarlos por el router	
 	
	props: (router)=>{
                return {
                    id:router.params.id                        
                }
            }
	Cuando utilicemos esta técnica debemos tener en cuenta el created() y el watch del id para cuando se cambie de ruta si crear el componente de nuevo


## Vuex

### Sepración de stores en modules

### Truco para que los Getters acepten parámetros: retornar una funcion.

	getEntryById: (state) => (id=0) =>
	{
		...
	}
### MUY IMPORTANTE. Cuando retornamos un objeto en un getter, normalmente de un array del state, no devolver tal cual ya que devolvemos la referencia que permitirá modificar el state a través de esta. Devolver un objeto desectructurado
	
	const entry =  state.entries.find(e=> e.id===id)
	...
	return {...entry}