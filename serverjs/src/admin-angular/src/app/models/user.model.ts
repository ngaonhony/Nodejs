// admin/src/app/models/user.model.ts
export interface User {
    id?: string;   // ID có thể không có trong trường hợp thêm mới
    name: string;
    email: string;
  }