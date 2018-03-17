import {fetchClinics} from '../apiservice/clinic';
import {fetchUsers} from '../apiservice/user';
import {fetchDentists} from '../apiservice/dentist';
import {fetchPatients} from '../apiservice/patient';
import {fetchTreatments} from '../apiservice/treatment';
import {fetchTimeslotsByDate, fetchTimeslots} from '../apiservice/timeslot';

export default {
    fetchClinics,
    fetchDentists,
    fetchPatients,
    fetchTimeslots,
    fetchTimeslotsByDate,
    fetchTreatments,
    fetchUsers
}