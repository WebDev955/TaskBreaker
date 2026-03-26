export type genNotes = {
  noteId: string;
  noteName: string;
  noteText: string;
}

export type Goal = {
  goalId: string;
  goalName: string;
  goalTimeFrame: string;
  goalNote: string;
  goalStatus: string;
  tasks: Task[]
}

export type Task = {
  taskId: string;
  taskName: string;
  taskTimeFrame: string;
  isTaskComplete: boolean;
  chunks: Chunk[];
};

export type Chunk = {
  chunkId: string;
  chunkName: string;
  chunkTimeFrame: string;
};

