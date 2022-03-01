import {shallowMount} from '@vue/test-utils'
import About from '@/views/About'

describe('Prueba de About View',()=>{

    // let wrapper
    // beforeEach(()=>
    // {
    // })

	test('Debe renderizar el componente correctamente contra el snapshot',()=>{
        const wrapper=shallowMount(About)
		expect(wrapper.html()).toMatchSnapshot()

	})


})