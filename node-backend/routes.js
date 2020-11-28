const express = require("express");
const Job = require("./models/Job");
const router = express.Router();

// Get all jobs 
router.get("/jobs", async (req, res) => {
  const jobs = await Job.find(); // Fetch all data
  res.send(jobs);
});

// Create a new job
router.post("/jobs", async (req, res) => {
  const job = new Job({
    title: req.body.title,
    content: req.body.content,
    expiration: req.body.expiration
  });
  await job.save(); // Save data
  res.send(job);
});

// Get individual records
router.get("/jobs/:id", async (req, res) => {
  try {
    const job = await Job.findOne({ _id: req.params.id }); // Find record by id
    res.send(job);
  } catch {
    res.status(404);
    res.send({ error: "Job doesn't exist!" });
  }
});

// Update a job
router.patch("/jobs/:id", async (req, res) => {
  try {
    const job = await Job.findOne({ _id: req.params.id });

    if (req.body.title) {
        job.title = req.body.title;
    }

    if (req.body.content) {
        job.content = req.body.content;
    }

    if (req.body.expiration) {
        job.expiration = req.body.expiration;
    }

    await job.save();
    res.send(job);
  } catch {
    res.status(404);
    res.send({ error: "Job doesn't exist!" });
  }
});

// Delete a job
router.delete("/jobs/:id", async (req, res) => {
  try {
    await Job.deleteOne({ _id: req.params.id });
    res.status(204).send();
  } catch {
    res.status(404);
    res.send({ error: "Job doesn't exist!" });
  }
});

module.exports = router;