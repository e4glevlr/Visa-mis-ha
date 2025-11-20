# Hướng dẫn Phát triển (Developer Guide)

Tài liệu này giải thích luồng hoạt động của hệ thống, tập trung vào tính năng **Đăng ký Hộ chiếu (Passport Application)** và các **API**. Mục đích giúp lập trình viên nhanh chóng nắm bắt cấu trúc và sửa lỗi.

## 1. Tổng quan Kiến trúc

Dự án được xây dựng trên:
- **Framework**: Next.js (App Router)
- **Database & Storage**: Supabase
- **Validation**: Zod
- **Email**: Resend
- **Styling**: Tailwind CSS & Shadcn UI

## 2. Luồng Điền Form (Frontend)

Logic chính nằm tại `components/MultiStepForm/MultiStepForm.tsx`. Đây là một form đa bước (multi-step form) quản lý trạng thái cục bộ trước khi gửi lên server.

### Cấu trúc Component
*   `MultiStepForm.tsx`: Container chính, quản lý state `step` (bước hiện tại) và `formData` (dữ liệu đã điền).
*   `Step1Personal.tsx` -> `Step4Photo.tsx`: Các component con hiển thị giao diện từng bước.

### Cách hoạt động
1.  **State Management**:
    *   Sử dụng `useState` để lưu `formData`. Dữ liệu được tích lũy qua từng bước (`handleNextStep1`, `handleNextStep2`, ...).
    *   Dữ liệu chỉ được gửi đi ở bước cuối cùng.

2.  **Upload Ảnh (Supabase Storage)**:
    *   Xảy ra tại hàm `handleSubmit` trong `MultiStepForm.tsx`.
    *   Ảnh được upload trực tiếp từ Client lên Supabase Storage (bucket `documents`).
    *   Đường dẫn file (path) được trả về và lưu vào object dữ liệu cuối cùng để gửi lên API.
    *   *Lưu ý debug*: Nếu upload lỗi, kiểm tra Policies của Supabase Storage (phải cho phép public insert hoặc có authen phù hợp).

3.  **Gửi dữ liệu (Submit)**:
    *   Sau khi upload ảnh thành công, frontend gọi `POST /api/apply` với `JSON.stringify(finalData)`.

## 3. Xử lý API (Backend)

### API Nộp đơn: `/api/apply`
File: `app/api/apply/route.ts`

Logic xử lý:
1.  **Nhận request**: Lấy JSON body từ request.
2.  **Validation (Quan trọng)**:
    *   Sử dụng `applicationSchema` từ `lib/schema.ts` để kiểm tra dữ liệu.
    *   Nếu dữ liệu không hợp lệ -> Trả về `400 Bad Request`.
    *   *Debug*: Nếu API trả về lỗi validation, kiểm tra kỹ file `lib/schema.ts` xem rules có khớp với dữ liệu frontend gửi lên không.
3.  **Lưu Database**:
    *   Insert dữ liệu vào bảng `applications` trong Supabase.
    *   Trường `passport_photo_path` và `id_photo_path` lưu đường dẫn file (không lưu file binary).
4.  **Gửi Email**:
    *   Nếu có biến môi trường `RESEND_API_KEY`, hệ thống sẽ gửi email xác nhận cho người dùng qua Resend.
    *   Lỗi gửi email được `catch` lại để không làm fail toàn bộ request (User vẫn nộp đơn thành công dù không nhận được mail).

### Các API Admin
Nằm trong `app/api/admin/`:
*   `login`: Xử lý đăng nhập admin.
*   `logout`: Xử lý đăng xuất.
*   `update-status`: Cập nhật trạng thái hồ sơ (ví dụ: từ 'pending' sang 'approved').

## 4. Validation Schema (`lib/schema.ts`)

File này định nghĩa các rules cho dữ liệu (sử dụng thư viện **Zod**).
*   `personalInfoSchema`: Validate Tên, Ngày sinh, Nơi sinh, Giới tính.
*   `contactInfoSchema`: Validate Email, WhatsApp, Quốc gia.
*   `documentInfoSchema`: Validate số ID/Hộ chiếu.

> **Lưu ý khi sửa lỗi**: Nếu bạn thêm một trường mới vào Form, bạn **BẮT BUỘC** phải cập nhật Schema trong `lib/schema.ts`, nếu không API sẽ báo lỗi hoặc dữ liệu không được validate đúng.

## 5. Các lỗi thường gặp (Troubleshooting)

1.  **Lỗi Upload Ảnh**:
    *   Kiểm tra xem bucket `documents` đã được tạo trên Supabase chưa.
    *   Kiểm tra RLS Policies của Storage.

2.  **Lỗi 500 Internal Server Error khi Submit**:
    *   Thường do lỗi kết nối Database hoặc lỗi Server code.
    *   Check logs server (console nơi chạy `npm run dev`).

3.  **Lỗi Validation (400)**:
    *   Dữ liệu ngày tháng (`dob`) thường dễ gây lỗi định dạng. Kiểm tra xem frontend gửi lên dạng String ISO hay Date object. Hiện tại backend đang ép kiểu `new Date(formData.dob)`.

---
*Tài liệu này được viết cho Developer để hiểu nhanh hệ thống.*
