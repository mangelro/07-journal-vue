import axios from 'axios'

const authApi = axios.create({
	baseURL:'https://identitytoolkit.googleapis.com/v1/accounts',
	params:{
		key:'AIzaSyBOhLBjnvUbcwyQxcBchAyPrfOrXB9SVXA'
	}
})
export default authApi