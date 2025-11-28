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

// router.use(auth)

router.get('/', getAllJobs)
router.post('/', createJob)
router.get('/:jobId', getJobById)
router.put('/:jobId', updateJobById)
router.delete('/:jobId', deleteJobById)

module.exports = router
