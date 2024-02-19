import Task from "../models/task.model.js";


export async function getTasks(req, res){
    const tasks = await Task.find({user: req.user.id}).populate("user")
    res.json(tasks)
}
export async function getTask(req, res){
    const task = await Task.findById(req.params.id).populate("user")
    if(!task) return res.status(404).json({message: "No tasks found"})
    res.json(task)
}
export async function createTask(req, res){
    const {title, description, date} = req.body
    const newTask = new Task({ 
        title, 
        description, 
        date,     
        user: req.user.id 
    });
    
    const savedTask = await newTask.save()
    res.json(savedTask)
}
export async function updateTask(req, res){
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true})  // devuleve la version updateada
    if(!task) return res.status(404).json({message: "No tasks found"})
    res.json(task)
}
export async function deleteTask(req, res){
    const task = await Task.findByIdAndDelete(req.params.id)
    if(!task) return res.status(404).json({message: "No tasks found"})

    res.status(200).json({message: "Task eliminated succesfully"})
}