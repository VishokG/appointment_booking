import { getAuth } from "firebase/auth";
import fireBaseApp from "../config/firebase.js";

const auth = getAuth(fireBaseApp);


export default auth;