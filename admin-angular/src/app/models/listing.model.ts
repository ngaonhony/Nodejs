export interface Listing {
  id?:string;
    userId: string;        // ID của người dùng (ObjectId)
    title: string;         // Tiêu đề của listing
    description: string;   // Mô tả của listing
    price: number;         // Giá của listing
    location: string;      // Địa điểm
    area: number;          // Diện tích
    categoryId: string;    // ID của danh mục (ObjectId)
    createdAt?: Date;      // Ngày tạo (tùy chọn)
    updatedAt?: Date;      // Ngày cập nhật (tùy chọn)
  }