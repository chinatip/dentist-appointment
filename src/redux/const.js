export const TREAMENT_NORMAL = [
  {
    name: 'ตรวจฟัน',
    desc: ''
  },{
    name: 'อุดฟัน',
    desc: ''
  },{
    name: 'ถอนฟัน',
    desc: ''
  }
];
export const TREAMENT_SPECIAL = [
  {
    name: 'จัดฟัน',
    desc: ''
  },{
    name: 'รักษารากฟัน',
    desc: ''
  }
];
export const TREATMENT_TYPE = [
  { 
    name: 'ทั่วไป',
    treatments: TREAMENT_NORMAL 
  },
  { 
    name: 'เฉพาะทาง',
    treatments: TREAMENT_SPECIAL 
  }
];

const DOCTORS = [
  { name: 'มานี' },
  { name: 'มีนา' }
];

export const CLINICS = [
  {
    id: '01',
    name: 'บ้านรักฟัน',
    doctors: DOCTORS,
    treatments: TREATMENT_TYPE
  },
  { 
    id: '02',
    name: 'บ้านรักยิ้ม',
    doctors: DOCTORS,
    treatments: TREATMENT_TYPE     
  },
];