export type User = {
  id: string;
  username: string;
  key: string;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
  created_at: string;
};
