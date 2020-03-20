import axios from 'axios';

const USER_API_BASE_URL = 'http://localhost:8080/users';

class ApiService {

    fetchUsers() {
        return axios.get(USER_API_BASE_URL);
    }

    fetchUserById(userId: string) {
        return axios.get(USER_API_BASE_URL + '/' + userId);
    }

    deleteUser(userId: string) {
        return axios.delete(USER_API_BASE_URL + '/' + userId);
    }

    addUser(user: any) {
        return axios.post(""+USER_API_BASE_URL, user);
    }

    editUser(user: any) {
        return axios.put(USER_API_BASE_URL + '/' + user.id, user);
    }

}

export default new ApiService();