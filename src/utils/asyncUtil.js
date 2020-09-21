import AsyncStorage from "@react-native-community/async-storage";

/**
  * @param key key for async storage
  * @param value value of key
  * async function to store data into async Storage 
  */
_storeData = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        alert(JSON.stringify(error))
    }
};

/**
* async function to get all users from async Storage 
*/
export const _getUsers = async () => {
    try {
        let data = await AsyncStorage.getItem('allUsers')
        if (data) {
            return JSON.parse(data);
        }
        else
            return null;
    } catch (error) {
        alert(JSON.stringify(error))
    }
};

export const signupUser = async (userData) => {
    let allUsers = await _getUsers();
    if (allUsers){
        allUsers.push(userData)
    }
    else{
        allUsers = [userData]
    }
    _storeData('allUsers', allUsers);
};

export const authorizeUser = async (user) => {
    let allUsers = await _getUsers() || [];
    return allUsers.some(aUser => (aUser.username === user.username && aUser.password === user.password))
}