export type Message = {
  role: "user" | "assistant";
  content: string;
};

export type ThreadMessagesResponse = {
  thread_id: string;
  messages: Message[];
};

export type ChatResponse = {
  thread_id: string;
  reply: string;
};

export type ThreadsResponse = {
  threads: string[];
};

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  created_at?: string;
  last_login_at?: string;
};

export type AuthResponse = {
  message: string;
  user: AuthUser;
};
