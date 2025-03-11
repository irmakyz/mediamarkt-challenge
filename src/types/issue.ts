export interface Issue {
  id: number;
  title: string;
  state: string;
  url: string;
  labels: { name: string; color: string }[];
  comments: number;
  author: string;
  createdAt: string;
}

export interface Label {
  name: string;
  color: string;
}
