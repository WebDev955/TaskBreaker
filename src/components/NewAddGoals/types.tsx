export type Goal = {
  goalId: string;
  goalName: string,
  goalTimeFrame: string, 
  tasks: Task[]
}

export type Task = {
  taskId: string;
  taskName: string;
  taskTimeFrame: string;
  chunks: Chunk[];
};

export type Chunk = {
  chunkId: string;
  chunkName: string;
  chunkTimeFrame: string;
};

