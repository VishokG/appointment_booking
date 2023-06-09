import { getDatabase, ref, set, child, get, push, update, remove } from "firebase/database";
import fireBaseApp from "../config/firebase.js";

const db = getDatabase(fireBaseApp);

const removeFromTimeTable = async (day, timeStart) => {
    await remove(ref(db, `timetable/${day}/${timeStart}`));
}

const addToTimeTable = async (aptId, day, timeStart) => {
    await push(ref(db, `/timetable/${day}/${timeStart}`), {
        aptId
    });
}

const removeFromAppointments = async (aptId) => {
    await remove(ref(db, `/appointments/${aptId}`));
}

const addToAppointments = async (userId, day, timeStart) => {
    return (await push(ref(db, `/appointments`), {
        userId,
        day,
        timeStart
    })).key;
}

const createAppointment = async (userId, day, timeStart) => {
    const key = await addToAppointments(userId, day, timeStart);
    await addToTimeTable(key, day, timeStart);
}

const checkAppointmentPresent = async (day, timeStart) => {
    return await get(ref(db, `/timetable/${day}/${timeStart}`)).then((snapshot) => snapshot.exists());
}

const getAppointment = async (aptId) => {
    let path = `/appointments`;
    if(aptId) {
        path += "/" + aptId;
    }
    
    return await get(ref(db, path)).then(snapshot => snapshot.val());
}

const updateAppointment = async (aptId, day, timeStart) => {
    const previousApt = await get(ref(db, `/appointments/${aptId}`)).then((snapshot) => snapshot.val());

    //1. REMOVE FROM TIMETABLE
    await removeFromTimeTable(previousApt.day, previousApt.timeStart);
    //2. ADD IN TIMETABLE
    await addToTimeTable(aptId, day, timeStart);
    //3. UPDATE IN APPOINTMENTS
    await set(ref(db, `/appointments/${aptId}`), {
        day, timeStart
    });
}

const deleteAppointment = async (aptId) => {
    const apt = await get(ref(db, `/appointments/${aptId}`)).then((snapshot) => snapshot.val());
    console.log(apt);
    await removeFromTimeTable(apt.day, apt.timeStart);
    await removeFromAppointments(aptId);
}

export default { createAppointment, checkAppointmentPresent, getAppointment, updateAppointment, deleteAppointment };