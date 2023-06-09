import repository from "../repositories/appointment.js"

const createApt = async (req, res) => {
    // const data = repository.createAppointment(req.body.userId, req.body.day, req.body.timeStart);
    // const data = await repository.checkAppointmentPresent(req.body.day, req.body.timeStart)
    // res.status(200).send(data);
    // return;

    if(await repository.checkAppointmentPresent(req.body.day, req.body.timeStart)) {
        res.status(200).send({message: "This slot has already been booked", success: false});
    } else {
        repository.createAppointment(req.body.userId, req.body.day, req.body.timeStart);
        res.status(200).send({message: "Your appointment has been successfully booked", success: true});
    }
}

const getApt = async (req, res) => {
    const data = await repository.getAppointment(req.params.aptId);
    res.status(200).send(data);
}

const updateApt = async (req, res) => {
    const data = await repository.updateAppointment(req.params.aptId, req.body.day, req.body.timeStart);
    res.send(200);
}

const deleteApt = async (req, res) => {
    await repository.deleteAppointment(req.params.aptId);
    res.send(200)
}

export default { createApt, getApt, updateApt, deleteApt };