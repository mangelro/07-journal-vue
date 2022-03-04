import daybookRouter from '@/modules/daybook/router'


describe('Prueba en el router module de DayBook ',()=>{

	test('El router debe tener esta configuración',()=>{

		/*
		 * Las funciones son difíciles de evaluar, asi que las sustituimos 
		 * por asercciones expect.any(Function) que nos lo facilita
		 */

		expect(daybookRouter).toMatchObject({
			name:'daybook',
			component: expect.any(Function),
			children:[
				{
					path:'',
					name:'no-entry',
					component: expect.any(Function),
				},
				{
					path:':id',
					name:'entry',
					component: expect.any(Function),
					props: expect.any(Function),
				}
			]    
		})
	}),

	/*
	 * Test asíncronos ya que la carga de los componentes es asíncrona en la definición
	 * de module del router 
	*/
	test('Las rutas deben cargar los componentes adecuados ', async () => {

		/*
		 * Para los test cobra sentido, al menos para mi, el establecer el name a los componentes
		 * En la definicion de la módulo de ruta, el comoponent se carga asíncronamente, por lo que
		 * hay que await. Lo que retorna en un objeto llamado default (export default {...})
		 */

		/*
		 * Hacerlo así es muy rigido ya que obliga a un orden especifico que puede ser cambiado
		 * lo que hace los test muy frágiles
		 */

		// expect(await (daybookRouter.children[0].component()).default.name).toBe('NoEntrySelected')
		// expect(await (daybookRouter.children[1].component()).default.name).toBe('EntryView')

		const promisesRouter=[]

		daybookRouter.children.forEach(child=> promisesRouter.push(child.component()))

		const routes=(await Promise.all(promisesRouter))
			.map(ruta=>ruta.default.name) //tenemos los componentes

		expect(routes).toContain('NoEntrySelected')
		expect(routes).toContain('EntryView')
		


	}),

	test('Debe retornar el id de la ruta para el mapeo', () => {
		
		const route= {
			params:{
				id:'ABC-123'
			}
		}

		//Excesivamente rigido el acceder por la posicion en el Array
		//expect(daybookRouter.children[1].props(route)).toEqual({ id: 'ABC-123' })

		//Mucho mejor localizarlo por el nombre
		const entryRoute=daybookRouter.children.find(child=>child.name==='entry')

		expect(entryRoute.props(route)).toEqual({ id: 'ABC-123' })

	})
})