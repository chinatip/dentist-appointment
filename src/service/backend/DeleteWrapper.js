import React from 'react'
import {getClinic} from '../apiservice/clinic';
import {getUser} from '../apiservice/user';
import {getDentist} from '../apiservice/dentist';
import {getPatient} from '../apiservice/patient';
import {getTreatment} from '../apiservice/treatment';
import {getSpecialty} from '../apiservice/specialty';
import {getTimeslot} from '../apiservice/timeslot';


export default {
    getClinic,
    getUser,
    getDentist,
    getPatient,
    getTreatment,
    getTimeslot
}