import {shallowMount} from '@vue/test-utils'
import FabButton from '@/components/FabButton'

describe('Prueba del componente FabButon ',()=>{

    // let wrapper
    // beforeEach(()=>
    // {
    // })

	test('Debe renderizar el componente correctamente contra el snapshot',()=>{
        const wrapper=shallowMount(FabButton)
		expect(wrapper.html()).toMatchSnapshot()

	}),

    test('Debe mostar el icono por defecto',()=>{
        const wrapper=shallowMount(FabButton)

        const iTag=wrapper.find('i')

        expect(iTag).not.toBeNull()
        expect(iTag.text()).toEqual('save')
    }),

    test('Debe mostrar el icono por argumento: ', () => {
        const wrapper=shallowMount(FabButton,{
            props:{
                icon:'fa-circle'
            }
        })

        const iTag=wrapper.find('i')

        expect(iTag).not.toBeNull()
        expect(iTag.text()).toEqual('fa-circle')
    }),

    test('Debe emitir el evento on:click cuando se ha click', () => {

        // const eventClickSpy=jest.spyOn(FabButton,'on:click') //Debe declararse antes de montar el objeto PokemonPage

        const wrapper=shallowMount(FabButton)

         wrapper.find('button').trigger('click') //primer botón encontrado
         
         expect(wrapper.emitted('on:click')).toHaveLength(1) //Solo existe un evento on:click -> array de 1
               

    })

})