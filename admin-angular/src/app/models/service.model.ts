export interface Service {
  _id?: string;
  name: string;
  price_per_day: number;
  price_per_week: number;
  price_per_month: number;
  pushPrice: number;
  advantages: boolean;
  title_color: string;
  auto_approval?: boolean;
  prominent_badge?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  }