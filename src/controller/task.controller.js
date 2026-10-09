import {
  addTask,
  deleteTask,
  getAllTasks,
  getTaskByID,
  updateTask,
} from "../database/store.js";

export async function getTasks(req, res) {
  try {
    const result = await getAllTasks(req.validated.query);

    if (result.data.length === 0) {
      return res.status(404).json({
        status: 404,
        message: "No Tasks Found",
        result: {
          data: [],
          pagination: null,
        },
      });
    }

    return res
      .status(200)
      .json({ status: 200, message: "Tasks Fetch succesfully", result });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ status: 500, message: "internal server error", error: err});
  }
}

export async function taskById(req, res) {
  try {
    const id = Number(req.params.id) || 0;
    const result = await getTaskByID(id);

    if (!result) {
      return res
        .status(404)
        .json({ status: 404, message: "Task not Found", data: null });
    }

    return res
      .status(200)
      .json({ status: 200, message: "Task Fetch succesfully", data: result });
  } catch (error) {
    return res
      .status(500)
      .json({ status: 500, message: "internal server error" });
  }
}

export async function newTask(req, res) {
  try {
    const task = req.validated.body;
    const result = await addTask(task);

    res
      .status(201)
      .json({ status: 201, message: "task added successfully", data: result });
  } catch (error) {
    return res
      .status(500)
      .json({ status: 500, message: "internal server error" });
  }
}

export async function updatetaskById(req, res) {
  try {
    const id = Number(req.params.id) || 0;
    const task = req.validated.body;

    const result = await updateTask(id, task);

    if (!result) {
      return res
        .status(404)
        .json({ status: 404, message: "Task not Found", data: null });
    }

    return res
      .status(200)
      .json({ status: 200, message: "Task updated succesfully", data: result });
  } catch (error) {
    return res
      .status(500)
      .json({ status: 500, message: "internal server error" });
  }
}

export async function deleteTaskById(req, res) {
  try {
    const id = Number(req.params.id) || 0;

    const result = await deleteTask(id);
    console.log();

    if (!result) {
      return res
        .status(404)
        .json({ status: 404, message: "Task not Found", data: null });
    }

    return res
      .status(200)
      .json({ status: 200, message: "Task deleted succesfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ status: 500, message: "internal server error" });
  }
}
