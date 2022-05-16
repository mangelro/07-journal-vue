
import { computed } from 'vue'
import{ useStore } from 'vuex'

const useAuth= ()=>{

	const store= useStore()

	const createUser= async (user)=>{
		return await store.dispatch('auth/createUser',user)
	}

	const loginUser = async (login) =>{
		return await store.dispatch('auth/signInUser',login)
	}

	const checkAuthStatus = async () =>{
		return await store.dispatch('auth/checkAuthentication')
	}

	const logout = () =>{
		store.commit('auth/logout')
		store.commit('journal/clearEntries')
	}


	
	return{
		checkAuthStatus,
		createUser,
		loginUser,
		logout,
	
		//methods
		authStatus : computed(()=> store.getters['auth/currentStatus']),
		userName : computed(()=> store.getters['auth/currentUserName']),
	}
}

export default useAuth