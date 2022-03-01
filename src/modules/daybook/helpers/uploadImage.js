import axios from 'axios'

const repo='fdoo'

const uploadImage = async (file) => {

	if (!file) return
	try{
		const formData=new FormData()

		formData.append('upload_preset','curso-vue')
		formData.append('file',file)


		const url=`https://api.cloudinary.com/v1_1/${repo}/image/upload`

		const {data}= await axios.post(url,formData)

		console.log (data)

		return data.secure_url
	}
	catch(error){
		console.log(error)
		return null
	}

}

export default uploadImage