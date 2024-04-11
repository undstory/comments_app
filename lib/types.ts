export type Reply = {
  id: string;
  content: string;
  score?: number;
  parentId: string;
  authorId: string;
};

export type Comment = {
  id: string;
  content: string;
  score: number;
  authorId: string;
  replies?: Reply[];
};

export type User = {
  id: string;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  avatar: string;
  comments: Comment[];
  replies: Reply[];
};
