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

        expect (wrapper.props('icon')).toBe('save')

    })

})