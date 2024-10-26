
export interface Feedback {
  _id?: string;
  postId: string;
  userId: string;
  name: string;
  phone: string;
  rating: number;
  comment?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
