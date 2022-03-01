import {shallowMount} from '@vue/test-utils'
import Home from '@/views/Home'

describe('Prueba de Home View',()=>{

    // let wrapper
    // beforeEach(()=>
    // {
    // })

	test('Debe renderizar el componente correctamente contra el snapshot',()=>{
        const wrapper=shallowMount(Home)
		expect(wrapper.html()).toMatchSnapshot()

	}),

    test('Hacer click en un boton debe redireccionar a no-entry',()=>{
        /*
         * Se mockea el router que es algo que no es el objetivo del test.
         * Se trata de un objeto de terceros que ya debió ser probado por sus cradores.
         * En los mocks lo que nos interesa testear la interacción con él. Por eso,
         * las asercciones (expect) se realizan contra él
         */

        const mockRouter={
            push: jest.fn() //Se trata de una función mockeada
        }

        /*
         * En el componente Home reemplazamos el router con el mock
         */
        const wrapper=shallowMount(Home,{
            global:{
                mocks:{
                    $router:mockRouter
                }
            }          
        })

        /*
         * Se dispara la acción
         */
        wrapper.find('button').trigger('click') //primer botón encontrado
        // Ha sido llamado 1 vez
        expect(mockRouter.push).toHaveBeenCalled()
        expect(mockRouter.push).toHaveBeenCalledWith({name:'no-entry'})
    })

})