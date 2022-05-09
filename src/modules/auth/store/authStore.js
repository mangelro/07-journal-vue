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
		}


	},

	actions:{
		createUser: async ({commit}, user) =>{

			const{email,password}= user;

			try{

				const {data}= await authApi.post(':signUp',{email,password,returnSecureToken:true})
				console.log(data)

				//TODO mutation


				return {ok:true, message: ''}
			}catch (error){
				return {ok:false, message: error.response.data.error.message}
			}


		}
	},

	getters:{

		getCurrentUser: (state)=> state.user,

		getCurrentStatus: (state)=> state.status,


	}


}