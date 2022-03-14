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

	//****************************** MUTATIONS	
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
	//*****************************	GETTERS
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

	test('Actions: LoadEntries. Debería cargar las Entries ', async () => {
		
		const store=createdViexStore({isLoading : true, entries : []})
		
		await store.dispatch('journal/loadEntries')

		expect(store.state.journal.entries.length).toBe(1) //ya que son las que existen en Firebase

		// store.commit= jest.fn() //Se podría mockear el commit para ver si es llamado.
		// expect(store.commit).toHaveBeenCalled()
	})

	test('Actions: UpdateEntry. Actualización entradas', async () => {
		const store=createdViexStore(journalMockState)

		const updatedEntry={
			id:"-Mwm0kple69InwR9BYO4",
			date : 1645811782393,
			text : "Modificada en tests"
		}

		await store.dispatch('journal/updateEntry',updatedEntry)


		expect(store.state.journal.entries.length).toBe(2)
		expect(store.state.journal.entries.find(e=> e.id===updatedEntry.id)).toEqual(updatedEntry)

	})

	test('Actions: createEntry & deleteEntry', async () => {
		const store=createdViexStore(journalMockState)

		const newEntry={
			date : 1645811782593,
			text : "Añadida en tests"
		}

		const id=await store.dispatch('journal/createNewEntry',newEntry)

		newEntry.id=id 

		expect(typeof id).toBe('string')
		expect(store.state.journal.entries.length).toBe(3)
		expect(store.state.journal.entries.find(e=>e.id===id)).toBeTruthy()//.toEqual(newEntry)


		await store.dispatch('journal/deleteEntry',id)

		expect(store.state.journal.entries.length).toBe(2)
		expect(store.state.journal.entries.find(e=>e.id===id)).toBeFalsy()
	});


})