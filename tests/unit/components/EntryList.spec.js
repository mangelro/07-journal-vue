import { shallowMount } from '@vue/test-utils'
import EntryList from '@/modules/daybook/components/EntryList'
import { createStore } from 'vuex'
import { getEntriesByTerm } from '@/modules/daybook/store/daybookStore'
import { journalState } from '../../unit/mocks/test-state'


describe("Prueba de EntyList components",()=>{


	/* Podemos mockear por completo el modulos con los getters*/
	// const journalMockModule={
	// 	namespaced:true,
	// 	getters:{
	// 		getEntriesByTerm: () => ()=> []
	// 	}
	// }

	/*O podemos importar los getter y el state verdadeo*/
	const journalMockModule={
		namespaced:true,
		getters:{
			getEntriesByTerm
		},
		state: ()=>({
			isLoading:true,
			entries: journalState.entries
		})

	}

	
	const store= createStore({
		modules:{
			journal:{...journalMockModule}
		
		}

	})

	const wrapper=shallowMount(EntryList,{
		global:{
			mocks:{
				//$router:
			},
			plugins:[store]
			
		}
	})


	test('Debe de llamar el getEntriesByTerm sin termino y mostar 2 entradas' , () => {
		
		console.log(wrapper.html)

	});










})