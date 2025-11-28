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
router.get('/:id', getJobById)
router.put('/:id', updateJobById)
router.delete('/:id', deleteJobById)

module.exports = router
