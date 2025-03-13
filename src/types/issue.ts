export interface Issue {
  issueNumber: number;
  commentsCount?: number;
  title: string;
  state: string;
  author: string;
  createdAt: string;
  bodyHTML?: string;
  avatarUrl?: string;
}

export interface Label {
  name: string;
  color: string;
}
