import axios from	'axios'
import cloudinary from 'cloudinary'

import uploadImage from '@/modules/daybook/helpers/uploadImage'


cloudinary.config({
	cloud_name:'fdoo',
	api_key:'345754998922628',
	api_secret:'P2tpKIVodvLDV8r_42QcjbCnY2U'
})

describe('Pruebas en el uploadImage',()=>{



	/*
	 * El parámetro - done - es una función que se llama para indicar la finalización la ejecución
	 * del test
	*/
	test('Debe cargar un archivo y retornar url', async (done) => {

		const {data} = await axios.get('https://res.cloudinary.com/fdoo/image/upload/v1645553708/cld-sample.jpg',
			{responseType:'arraybuffer'})


		const file=new File([data],'foto.jpg')

		const url= await uploadImage(file)

		//console.log('retorno',url)

		expect(typeof(url)).toBe('string')



		//Tomar el id :  https://res.cloudinary.com/fdoo/image/upload/v1646421859/curso-vue/tmiswdmkvzhqdzgegyob.jpg

		const [fileName]=[...url.split('/').slice(-1)]
		const imageId=fileName.split('.')[0]
		
		console.log(imageId)

		cloudinary.v2.api.delete_resources([imageId],{},()=>{
			done() //indica que la prueba ya terminó
		})

	})
})
