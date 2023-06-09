import { getDatabase, ref, set, child, get } from "firebase/database";
import fireBaseApp from "../config/firebase.js";

const db = getDatabase(fireBaseApp);

const writeUserData = async (userId, name, email) => {
    // const dbRef = ref(db);
    console.log(db);

    await set(ref(db, `users/${userId}`), {
      name: name,
      email: email
    });
}

const getUserFromId = async (userId) => {
    const dbRef = ref(db);
    return await get(ref(db, `users/${userId}`)).then((snapshot) => {
    if (snapshot.exists()) {
        return snapshot.val();
    } else {
        return undefined;
    }
    }).catch((error) => {
        console.error(error);
    });
}

export default { writeUserData, getUserFromId };