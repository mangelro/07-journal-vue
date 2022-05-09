import journalApi from '@/api/journalApi'

export default {
	namespaced: true,

	state() {
		return {
			isLoading: true,
			entries: [],
		}
	},

	mutations: {
		setEntries: (state, entries) => {
			state.entries = [...state.entries, ...entries] //las existentes más las nuevas
			state.isLoading = false
		},

		updateEntry: (state, entry) => {
			const idx = state.entries.map(e => e.id).indexOf(entry.id)
			state.entries[idx] = entry
			state.isLoading = false
		},

		createEntry: (state, entry) => {
			state.entries = [entry, ...state.entries]

			state.isLoading = false
		},

		deleteEntry: (state, id) => {
			//state.entries.splice(state.entries.findIndex(e=>e.id===id),1)

			state.entries = state.entries.filter(e => e.id !== id)
			state.isLoading = false
		},
	},

	actions: {
		loadEntries: async ({ commit }) => {
			const { data } = await journalApi.get('/entries.json')
			const entries = []
			if (!data) {
				commit('setEntries', entries)
				return
			}
			for (let id of Object.keys(data)) {
				entries.push({
					id,
					...data[id],
				})
			}
			commit('setEntries', entries)
		},

		updateEntry: async ({ commit }, entry) => {
			const { date, picture, text } = entry

			const dataToSave = { date, picture, text }

			await journalApi.put(`/entries/${entry.id}.json`, dataToSave)

			dataToSave.id = entry.id

			commit('updateEntry', { ...dataToSave })
		},

		createNewEntry: async ({ commit }, entry) => {
			const { date, text } = entry

			const { data } = await journalApi.post(`/entries.json`, {
				date,
				text,
			})

			//const entryConId= {id:data.name,date,text}
			const entryConId = {
				id: data.name,
				...entry,
			} //no está muy bien ya que entry puede llevar datos que no intersan!!

			commit('createEntry', { ...entryConId })

			return data.name
		},

		deleteEntry: async ({ commit }, id) => {
			await journalApi.delete(`/entries/${id}.json`)

			commit('deleteEntry', id)
		},
	},

	getters: {
		/*
		 * Los getters no son funciones (son propiedades 'get')
		 * para aceptar parámetros de entrada hace falta un pequeño
		 * truco. El getter no devuelve 'valores' si no que devuelve una
		 * función que acepta parámetros
		 */

		getEntriesByTerm:
			state =>
			(term = '') => {
				if (term.length === 0) return state.entries

				return state.entries.filter(e =>
					e.text.toLowerCase().includes(term.toLowerCase())
				)
			},

		getEntryById:
			state =>
			(id = 0) => {
				/*
				 * Si lo retornamos directamente estamos devolviento una referencia al State y este puede ser modificado
				 * fuera. Solo a traves de mutations se puede modificar el state
				 */
				//return state.entries.find(e=> e.id===id)

				const entry = state.entries.find(e => e.id === id)

				if (!entry) return
				return { ...entry } //es MUY aconsejable devolver una copia por si se modifica. No modificar el State!!!!!
			},
	},
}
