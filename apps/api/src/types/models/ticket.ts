export type Ticket = {
  id: string;
  user_id: string;
  description: string;
  photo_url: string;
  status: "new" | "in_progress" | "resolved";
  resolution: string;
  createdAt: Date;
  updatedAt: Date;
};
