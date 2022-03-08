/**
 * Unit test de Vuex
 */

import { createStore } from "vuex"
import journal from '@/modules/daybook/store/daybookStore'
import {journalState as journalMockState} from '../../../mocks/test-state'

const createdViexStore = (inicialState)=> createStore({
    modules:{
		journal:{
			...journal,
			state:{...inicialState}
		}
    }
})

describe("Vuex - Pruebas en el Journal Module",()=>{

	// Básicas
	test('Debe tener el estado inicial ', () => {
		const store=createdViexStore(journalMockState)
		
		const {isLoading,entries} = store.state.journal

		expect(isLoading).toBeFalsy()
		expect(entries).toEqual(journalMockState.entries)


	}),

	//******************************* MUTATIONS	
	test('Mutations: setEntries', () => {
		const store=createdViexStore({isLoading : true, entries : []})

		store.commit('journal/setEntries',journalMockState.entries)

		expect(store.state.journal.entries.length).toBe(2)
		expect(store.state.journal.isLoading).toBeFalsy()

	}),

	test('Mutations: updateEntry', () => {
		const store=createdViexStore(journalMockState)

		const updateEntry={
			id:"-Mwm0kple69InwR9BYO5",
			date : 1645811782395,
			text : "He modificado aprendiendo Vue2"
		}

		store.commit('journal/updateEntry',updateEntry)

		expect(store.state.journal.entries.length).toBe(2)
		expect(store.state.journal.isLoading).toBeFalsy()
		expect(store.state.journal.entries.find(e=>e.id===updateEntry.id)).toEqual(updateEntry)
		

	}),

	test('Mutations: createEntry', () => {
		const store=createdViexStore(journalMockState)

		const createEntry={
			id:"-Mwm0kple69InwR9BYO6",
			date : 1645811782395,
			text : "He modificado aprendiendo Vue3"
		}

		store.commit('journal/createEntry',createEntry)

		expect(store.state.journal.entries.length).toBe(3)
		expect(store.state.journal.isLoading).toBeFalsy()
		expect(store.state.journal.entries.find(e=>e.id===createEntry.id)).toBeTruthy
		

	}),

	test('Mutations: deleteEntry', () => {
		const store=createdViexStore(journalMockState)

		const deleteId='-Mwm0kple69InwR9BYO5'

		store.commit('journal/deleteEntry',deleteId)

		expect(store.state.journal.entries.length).toBe(1)
		expect(store.state.journal.isLoading).toBeFalsy()
		expect(store.state.journal.entries.find(e=>e.id===deleteId)).toBeFalsy
	}),
	//***************************	GETTERS
	test('Getters: getEntriesByTerm con término de búsqueda', () => {
		const store=createdViexStore(journalMockState)

		// eslint-disable-next-line no-unused-vars
		const [_,entry2]=journalMockState.entries
		
		const termToFind='Vue2'

		const result = store.getters['journal/getEntriesByTerm'](termToFind)

		expect(result).not.toBeNull()
		expect(result).toEqual([entry2])
	})

	test('Getters: getEntriesByTerm sin término de búsqueda', () => {
		const store=createdViexStore(journalMockState)

		const termToFind=''

		const result = store.getters['journal/getEntriesByTerm'](termToFind)

		expect(result.length).toBe(2)
		expect(result).toEqual(journalMockState.entries)
	})

	test('Getters: getEntryById con término de búsqueda', () => {
		const store=createdViexStore(journalMockState)

		// eslint-disable-next-line no-unused-vars
		const [entry1,_]=journalMockState.entries
		
		const idToFind='-Mwm0kple69InwR9BYO4'

		const result = store.getters['journal/getEntryById'](idToFind)



		expect(result).not.toBeNull()
		expect(result).toEqual(entry1)
	})

	//****************************** ACTIONS


})