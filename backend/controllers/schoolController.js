const School = require('../models/School');
const { initialSchools } = require('../seed/seedData');
const { getDBStatus } = require('../config/db');

// Ensure portal schools exist in memSchools
const defaultPortalSchools = [
  {
    schoolId: 'SCHOOL002',
    id: 'SCHOOL002',
    name: 'Sri Sankara Vidhyasala Girls High School',
    code: 'SSV-KOD',
    city: 'Kodumudi',
    status: 'Active',
    principalName: 'Dr. Savithri Raman',
    email: 'info@ssvgirlsschool.edu',
    phone: '+91 98456 12301'
  },
  {
    schoolId: 'SCHOOL001',
    id: 'SCHOOL001',
    name: 'ABC Matriculation School',
    code: 'ABC-CHE',
    city: 'Chennai',
    status: 'Active',
    principalName: 'Dr. K. Ramanathan',
    email: 'contact@abcschool.com',
    phone: '+91 94433 11223'
  },
  {
    schoolId: 'SCHOOL003',
    id: 'SCHOOL003',
    name: 'St. Marys Academy',
    code: 'STM-ERD',
    city: 'Erode',
    status: 'Active',
    principalName: 'Sr. Mary Joseph',
    email: 'office@stmarys.edu',
    phone: '+91 98422 33445'
  },
  {
    schoolId: 'SCHOOL004',
    id: 'SCHOOL004',
    name: 'Delhi Public World School',
    code: 'DPW-CBE',
    city: 'Coimbatore',
    status: 'Active',
    principalName: 'Mr. Arvind Swaminathan',
    email: 'admissions@dpwscbe.com',
    phone: '+91 97890 55667'
  },
  {
    schoolId: 'SCHOOL005',
    id: 'SCHOOL005',
    name: 'Kendriya Vidyalaya Central Campus',
    code: 'KVC-MDU',
    city: 'Madurai',
    status: 'Active',
    principalName: 'Mrs. Jayasree Nair',
    email: 'principal@kvcentral.ac.in',
    phone: '+91 94421 88990'
  }
];

let memSchools = [...initialSchools, ...defaultPortalSchools];

const isSchoolActive = async (schoolId) => {
  if (!schoolId || schoolId === 'ALL') return true;
  const cleanId = String(schoolId).trim();
  if (getDBStatus()) {
    try {
      const s = await School.findOne({
        $or: [{ schoolId: cleanId }, { code: cleanId }]
      });
      if (s) {
        return s.status === 'Active';
      }
    } catch (e) {}
  }
  const mem = memSchools.find(
    (s) => s.schoolId === cleanId || s.id === cleanId || s.code === cleanId
  );
  if (mem) {
    return mem.status === 'Active';
  }
  return true;
};

const getSchoolStatus = async (schoolId) => {
  if (!schoolId || schoolId === 'ALL') return 'Active';
  const cleanId = String(schoolId).trim();
  if (getDBStatus()) {
    try {
      const s = await School.findOne({
        $or: [{ schoolId: cleanId }, { code: cleanId }]
      });
      if (s) {
        return s.status || 'Active';
      }
    } catch (e) {}
  }
  const mem = memSchools.find(
    (s) => s.schoolId === cleanId || s.id === cleanId || s.code === cleanId
  );
  return mem ? (mem.status || 'Active') : 'Active';
};

const getSchools = async (req, res) => {
  try {
    if (getDBStatus()) {
      const schools = await School.find();
      if (schools.length > 0) return res.json({ success: true, count: schools.length, data: schools });
    }
    return res.json({ success: true, count: memSchools.length, data: memSchools });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getSchoolById = async (req, res) => {
  try {
    const { id } = req.params;
    let school = null;
    if (getDBStatus()) {
      school = await School.findOne({ $or: [{ schoolId: id }, { code: id }] });
    }
    if (!school) {
      school = memSchools.find((s) => s.schoolId === id || s.id === id || s.code === id);
    }
    if (!school) {
      return res.status(404).json({ success: false, message: 'School not found' });
    }
    return res.json({ success: true, data: school });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const createSchool = async (req, res) => {
  try {
    const { name, code, board, city, state, address, principalName, email, phone, plan } = req.body;
    if (!name || !email) {
      return res.status(400).json({ success: false, message: 'School name and email are required' });
    }

    const schoolId = 'SCH' + String(Date.now()).slice(-4);
    const newSchool = {
      schoolId,
      id: schoolId,
      name,
      code: code || `SCH-${Math.floor(10 + Math.random() * 90)}`,
      board: board || 'CBSE',
      city: city || 'Chennai',
      state: state || 'Tamil Nadu',
      address: address || '',
      principalName: principalName || '',
      email,
      phone: phone || '',
      studentCount: 0,
      teacherCount: 0,
      plan: plan || 'Standard',
      status: 'Active',
      joinedDate: new Date().toISOString().split('T')[0],
    };

    if (getDBStatus()) {
      await School.create(newSchool);
    }
    memSchools.unshift(newSchool);

    return res.status(201).json({ success: true, message: 'School onboarded successfully', data: newSchool });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const updateSchool = async (req, res) => {
  try {
    const { id } = req.params;
    if (getDBStatus()) {
      try {
        const updated = await School.findOneAndUpdate(
          { $or: [{ schoolId: id }, { code: id }] },
          req.body,
          { new: true }
        );
        if (updated) return res.json({ success: true, data: updated });
      } catch (dbErr) {}
    }
    const idx = memSchools.findIndex((s) => s.schoolId === id || s.id === id || s.code === id);
    if (idx !== -1) {
      memSchools[idx] = { ...memSchools[idx], ...req.body };
      return res.json({ success: true, data: memSchools[idx] });
    }
    const newEntry = { schoolId: id, id, ...req.body };
    memSchools.push(newEntry);
    return res.json({ success: true, data: newEntry });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const deleteSchool = async (req, res) => {
  try {
    const { id } = req.params;
    if (getDBStatus()) {
      await School.findOneAndDelete({ $or: [{ schoolId: id }, { code: id }] });
    }
    memSchools = memSchools.filter((s) => s.schoolId !== id && s.id !== id && s.code !== id);
    return res.json({ success: true, message: 'School deleted successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getSchools,
  getSchoolById,
  createSchool,
  updateSchool,
  deleteSchool,
  isSchoolActive,
  getSchoolStatus
};
