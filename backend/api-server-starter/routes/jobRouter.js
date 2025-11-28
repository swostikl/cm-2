const express = require('express')
const router = express.Router()
const auth = require('../middleware/requireAuth')

const {
  getAllJobs,
  getJobById,
  createJob,
  updateJobById,
  deleteJobById,
} = require('../controllers/jobController')

// Public routes?
router.get('/', getAllJobs)
router.get('/:id', getJobById)

// Protected routes?
//because only logged in users can access these
router.post('/', auth, createJob)
router.put('/:id', auth, updateJobById)
router.delete('/:id', auth, deleteJobById)

module.exports = router
