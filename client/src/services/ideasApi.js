import axios from 'axios';

class IdeasApi {
    constructor() {
        this._apiUrl = 'http://localhost:5000/api/ideas';
    }

    getIdeas() {
        return axios.get(this._apiUrl);
    }
}

// we initialize and export it to immediately use it
export default new IdeasApi();
