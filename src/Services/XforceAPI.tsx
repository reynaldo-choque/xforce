import axios from 'axios';

const DIAGNOSTIC_API_BASE_URL = 'https://api.infermedica.com/covid19/diagnosis';
const RESULT_API_BASE_URL = 'https://api.infermedica.com/covid19/triage';
const applicationId = '0aacb862';
const applicationKey = '8d286477c4e1a78038433ea90c91bbb1';
const headers = {
    "App-Id" : applicationId,
    "App-Key" : applicationKey,
    "Content-Type" :"application/json",
    "Model" : "infermedica-es"
};

class ApiService {

    fetchUsers() {
        return axios.get(DIAGNOSTIC_API_BASE_URL);
    }

    fetchUserById(userId: string) {
        return axios.get(DIAGNOSTIC_API_BASE_URL + '/' + userId);
    }

    deleteUser(userId: string) {
        return axios.delete(DIAGNOSTIC_API_BASE_URL + '/' + userId);
    }

    addUser(user: any) {
        return axios.post(""+DIAGNOSTIC_API_BASE_URL, user);
    }

    getQuestion(datastep1: any) {
        return axios.post(DIAGNOSTIC_API_BASE_URL, datastep1, {headers: headers});
    }

    getEndResult(data: any) {
        return axios.post(RESULT_API_BASE_URL, data, {headers: headers});
    }

    editUser(user: any) {
        return axios.put(DIAGNOSTIC_API_BASE_URL + '/' + user.id, user);
    }

}

export default new ApiService();