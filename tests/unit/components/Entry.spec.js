import {shallowMount} from '@vue/test-utils'

import Entry from '@/modules/daybook/components/Entry'


describe('Pruebas del Entry component',()=>{


	//mockRouter
	//const wrapper (entry,propt...global...)

	test('Debe hacer match con el snapshot', () => {
	
		const wrapper = shallowMount(Entry,{
			props:{
				entry:{
					id:"-Mwm0kple69InwR9BYO4",
					date : 1645811782393,
					text : "Estoy aprendiendo Vue"
				}
			}
		})

		expect(wrapper.html()).toMatchSnapshot()
	})

	test('Debe redireccional al hacer click en el entry-container', async () => {

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

		wrapper.find('button').trigger('click')

		
        expect(mockRouter.push).toHaveBeenCalled()
        expect(mockRouter.push).toHaveBeenCalledWith({name: 'entry',params: { id: '-Mwm0kple69InwR9BYO4'}})
	})

	test('Pruebas en la propiedades computadas de la fecha', () => {
		const wrapper = shallowMount(Entry,{
			props:{
				entry:{
					id:"-Mwm0kple69InwR9BYO4",
					date : 1645811782393,
					text : "Estoy aprendiendo Vue"
				}
			}
		})


		expect(wrapper.vm.day).toBe('25')
		expect(wrapper.vm.month).toBe('Febrero')
		expect(wrapper.vm.yearDate).toBe('2022, Viernes')

		//wrapper.vm. => ver las propiedades computadas
		//day = corresponde con al entrada
		//month = ....
		//yearDate:....
	})



})
