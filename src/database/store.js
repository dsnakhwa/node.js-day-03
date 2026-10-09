let nextId = 4;

const tasks = [
  {
    id: 1,
    title: "task 1",
    description: "this is description",
    status: "todo",
    priority: "low",
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: "task 2",
    description: "this is description",
    status: "todo",
    priority: "medium",
    createdAt: new Date().toISOString(),
  },
  {
    id: 3,
    title: "task 3",
    description: "this is description",
    status: "todo",
    priority: "low",
    createdAt: new Date().toISOString(),
  },
];

export async function getAllTasks(options) {
  let result = [...tasks];

  const {
    status, 
    priority,
    sortBy,
    order,
    page,
    limit
  } = options;

  console.log(options);

  if (status) {
    result = result.filter(task => task.status === status);
  }

  if (priority) {
    result = result.filter(task => task.priority === priority);
  }

  result.sort((a, b) => {
    const valueA = a[sortBy];
    const valueB = b[sortBy];

    if (valueA < valueB) {
      return order === "asc" ? -1 : 1;
    }

    if(valueA > valueB) {
      return order === 'asc' ? 1: -1;

    }
    return 0;
  });

  const start = (page - 1) * limit;
  const end = start + limit
  const paginatedTask = result.slice(start, end);

  return {
    data: paginatedTask,
    pagination: {
      page, 
      limit,
      total: result.length,
      totalPages: Math.ceil(result.length / limit)
    }
  }
}

export async function getTaskByID(id) {
  const task = tasks.find((tsk) => tsk.id === +id);
  return task || null;
}

export async function addTask(data) {
  const newTask = {
    id: nextId++,
    title: data.title,
    description: data.description,
    status: data.status ?? "todo",
    priority: data.priority ?? "low",
    createdAt: new Date().toISOString(),
  };

  tasks.push(newTask);
  return newTask;
}

export async function updateTask(id, data) {
  const index = tasks.findIndex((tsk) => tsk.id === id);

  if (index === -1) {
    return null;
  }

  tasks[index] = {
    ...tasks[index],
    ...data,        
    id,
  };

  return tasks[index];
}

export async function deleteTask(id) {
  const index = tasks.findIndex((tsk) => tsk.id === id);

  if (index === -1) {
    return null;
  }

  tasks.splice(index, 1);
  return true;
}
