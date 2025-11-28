## The things that i learned from code marathon 2:

## Route Parameter Naming Consistency

```javascript
// controllers/jobController.js
// Part A: Get job by ID
const getJobById = async(req,res)=> {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such job'});
    }

    const job = await Job.findById(id);

    if(!job){
        return res.status(404).json({error: 'No such job'});
    }

    res.status(200).json(job);
}

```
We first used **(/:jobId)** in jobRouter.js, but in the controller we were accessing **(req.params.id)**. Because the names didn’t match, id was always undefined and the query failed. To fix this, we changed the route to /:id so it matches the controller, and now the job can be fetched correctly by its ID. Also i have shared screenshot where the issues was-

![alt text](image.png)

---
## How to Add Pagination (Limit)
```javascript

const limit = parseInt(req.query._limit);
const jobs = limit 
  ? await Job.find({}).sort({ createdAt: -1 }).limit(limit)
  : await Job.find({}).sort({ createdAt: -1 });

```

While modifying the getAllJobs function to handle queries that limit the number of returned jobs. i used in postMan that **GET** **http://localhost:4000/api/jobs?_limit3** here also i learned that i need to use **GET** **http://localhost:4000/api/jobs?_limit=3**

Here I learned how to read query parameters.


## How to Validate MongoDB IDs

```js
mongoose.Types.ObjectId.isValid(id)
```
This prevents errors when users enter invalid IDs:
