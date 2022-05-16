
import authApi from "../../../api/authApi"

export default {
	namespaced: true,

	state(){
		return{
			status:'authenticating',  //authenticating, not-authenticated, authenticated
			user:null,
			idToken:null,
			refreshToken:null,
		}
	},

	mutations:{
		setUser: (state,user)=>{
			state.user=user
			state.status='authenticated'
		},

		setToken: (state,token,refreshToken)=>
		{
			state.token=token
			state.refreshToken=refreshToken
		},

		loginUser: (state,{user,idToken,refreshToken}) => {
			if (idToken){
				localStorage.setItem('idToken',idToken)
				state.idToken=idToken
			}
			
			if (refreshToken){
				localStorage.setItem('refreshToken',refreshToken)
				state.refreshToken=refreshToken
			}

			state.user=user
			state.status='authenticated'
		},

		logout: (state) => {

			localStorage.removeItem('idToken')
			localStorage.removeItem('refreshToken')
			state.user=null
			state.idToken=null
			state.refreshToken=null
			state.status='not-authenticated'
		}
	},

	actions:{
		createUser: async ({commit}, user) =>{

			const{name,email,password}= user;

			try{

				const {data}= await authApi.post(':signUp',{email,password,returnSecureToken:true})
				
				const {idToken,refreshToken}= data

				await authApi.post(':update',{displayName:name,idToken})

				//TODO mutation
				delete user.password
				commit('loginUser',{user,idToken,refreshToken})

				return {ok:true, message: ''}
			}catch (error){
				return {ok:false, message: error.response.data.error.message}
			}


		},

		signInUser: async ({commit}, login) =>{

			const{email,password}= login;

			try{

				const {data}= await authApi.post(':signInWithPassword',{email,password,returnSecureToken:true})

				const {idToken,refreshToken,displayName}= data

				login.name=displayName
								
				delete login.password

				commit('loginUser',{user:login,idToken,refreshToken})


				return {ok:true, message: ''}
			}catch (error){
				return {ok:false, message: error.response.data.error.message}
			}


		},
	
		checkAuthentication: async ({commit}) =>
		{
			const idToken=localStorage.getItem('idToken')
			const refreshToken=localStorage.getItem('refreshToken')

			if (!idToken){
				commit('logout')
				return {ok:false,message:'No hay token'}
			}
				
			try{

				const {data}= await authApi.post(':lookup',{idToken})
				
				console.log(data)
				
				const {email,displayName}= data.users[0]

				const user={
					name: displayName,
					email
				}

				commit('loginUser',{user,idToken,refreshToken})

				return {ok:true, message: ''}

			}catch(error){
				commit('logout')
				return {ok:false, message: error.response.data.error.message}
			}
		}

		
	},

	getters:{

		currentUserName: (state)=> state.user?.name??'no user',

		currentStatus: (state)=> state.status,


	}


}