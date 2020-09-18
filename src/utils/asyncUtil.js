import AsyncStorage from "@react-native-community/async-storage";

/**
  * @param key key for async storage
  * @param value value of key
  * async function to store data into async Storage 
  */
 _storeData = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (error) {
        alert(JSON.stringify(error))
    }
};

/**
* async function to get all users from async Storage 
*/
export const _getUsers = () => {
    try {
        return AsyncStorage.getItem('allUsers');
    } catch (error) {
        alert(JSON.stringify(error))
    }
};

export const signupUser = async (userData) => {
    let allUsers = await _getUsers();
    allUsers.push(userData)
    _storeData('allUsers', allUsers);
};

export const authorizeUser = async (user) => {
    let allUsers = await _getUsers() || [];
    return allUsers.some(aUser => (iaUser.username === user.username && aUser.password === user.password))
}