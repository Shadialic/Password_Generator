import axios from 'axios'

const url = axios.create({
    baseURL:"http://localhost:3000"
})

export async function genaratePassword(requireMents){
    try {
        const response = await url.post('/genaratepassword',requireMents)
        return response
    } catch (error) {
        console.log(error);
    }
}