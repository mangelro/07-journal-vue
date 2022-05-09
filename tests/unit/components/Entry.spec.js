import {shallowMount} from '@vue/test-utils'
import Entry from '@/modules/daybook/components/Entry'

describe('Pruebas del Entry component',()=>{

	//mockRouter
	//const wrapper (entry,propt...global...)
	const mockRouter={
		push:jest.fn()
	}
	
	const wrapper = shallowMount(Entry,{
		props:{
			entry:{
				id:"-Mwm0kple69InwR9BYO4",
				date : 1645811782393,
				text : "Estoy aprendiendo Vue"
			}
		},
		global:{
			mocks:{
				$router:mockRouter
			}
		}
	})

	test('Debe hacer match con el snapshot', () => {
	
		expect(wrapper.html()).toMatchSnapshot()
	})

	test('Debe redireccional al hacer click en el entry-container', () => {

		wrapper.find('button').trigger('click')
	
        expect(mockRouter.push).toHaveBeenCalled()
        expect(mockRouter.push).toHaveBeenCalledWith({name: 'entry',params: { id: '-Mwm0kple69InwR9BYO4'}}) // expect.any(String)
	})

	test('Pruebas en la propiedades computadas de la fecha', () => {
	

		/* Esta propiedades computadas no son necesarias ya que en 
		 * el snapshot se encuentran en 'duro' el valor devuelto por
		 * estas
		 */
		
		expect(wrapper.vm.day).toBe('25')
		expect(wrapper.vm.month).toBe('Febrero')
		expect(wrapper.vm.yearDate).toBe('2022, Viernes')

		//wrapper.vm. => ver las propiedades computadas
		//day = corresponde con al entrada
		//month = ....
		//yearDate:....
	})



})
