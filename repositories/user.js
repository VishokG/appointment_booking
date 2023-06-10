import { getDatabase, ref, set } from "firebase/database";
import fireBaseApp from "../config/firebase.js";

const db = getDatabase(fireBaseApp);

export const writeUserData = async (userId, name, email) => {
    await set(ref(db, `users/${userId}`), {
      name: name,
      email: email
    });
}

export default { writeUserData };