const Job = require('../models/jobModel');
const mongoose = require('mongoose');

//get all jobs
const getAllJobs = async (req,res)=> {
    try {
        const limit = parseInt(req.query._limit);
        const jobs = limit 
            ? await Job.find({}).sort({ createdAt: -1 }).limit(limit)
            : await Job.find({}).sort({ createdAt: -1 });

        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch jobs" });
    }
}

//get a single jobs
const getJobById = async(req,res)=> {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such job'});
    }

    const job = await Job.findById(id);

    if(!job){
        return res.status(404).json({error: 'No such job'});
    }

    res.status(200).json(job);
}

//create a new job 
const createJob = async (req,res) => {
    const {title, type, location , description, salary, company} = req.body

    //add to a database
    try {
        const job = await Job.create({title, type, location, description, salary, company});
        res.status(201).json(job)
    }catch (error){
        res.status(400).json({message: "Can not create a job"});
    }
}

// Update a job by id
const updateJobById = async(req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error:"Invalid id"});
    }

    const job = await Job.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if(!job){
        res.status(400).json({message : " No such job"});
    }
    res.status(200).json(job)
} 


// Delete a job by id

const deleteJobById = async(req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({message: " No such job!"});
    }

    const job = await Job.findOneAndDelete({_id: id})

    if(!job){
        return res.status(400).json({message: " No such job!"});
    }

    res.status(200).json(job);
}

module.exports = {
    getAllJobs,
    getJobById,
    createJob,
    updateJobById,
    deleteJobById
}