import axios from 'axios'

const baseUrl = 'http://localhost:4000/'

export default {
    postMessage(url = baseUrl + 'postmessages/') {
        return {
            fetchAll: () => axios.get(url),
            fetchById: (id) => axios.get(url + id),
            create: (newRecord) => axios.post(url, newRecord),
            update: (id, updatedRecord) => axios.patch(url + id, updatedRecord),
            remove: (id) => axios.delete(url + id),
        }
    },
}
