# Tài Liệu Nghiệp Vụ (Business Rules)

Tài liệu này mô tả chi tiết các luồng nghiệp vụ và quy tắc logic của dự án Zonal Pulsar - Hệ thống thu thập dữ liệu hộ chiếu.

## 1. Tổng Quan
Hệ thống cho phép người dùng nộp đơn đăng ký hộ chiếu trực tuyến và Admin quản lý, duyệt các đơn này.

## 2. Luồng Người Dùng (User Flow)

### 2.1 Đăng Ký Hồ Sơ (Apply)
Người dùng truy cập trang chủ và nhấn "Apply Now" để bắt đầu quy trình 4 bước:

*   **Bước 1: Thông tin cá nhân (Personal Information)**
    *   Các trường bắt buộc: Họ tên, Ngày sinh, Giới tính, Quốc tịch gốc.
    *   Validate: Ngày sinh phải hợp lệ, không chọn ngày tương lai.

*   **Bước 2: Thông tin liên hệ (Contact Information)**
    *   Các trường bắt buộc: Email, Số điện thoại (có mã vùng), Địa chỉ, Thành phố, Quốc gia cư trú.
    *   Validate: Email đúng định dạng, Số điện thoại phải là số.

*   **Bước 3: Thông tin giấy tờ (Document Information)**
    *   Các trường bắt buộc: Loại giấy tờ (CMND/CCCD/Passport cũ), Số giấy tờ, Ngày cấp, Ngày hết hạn.
    *   Validate: Ngày hết hạn phải sau ngày cấp và sau ngày hiện tại (tùy loại giấy tờ).

*   **Bước 4: Tải ảnh (Photo Upload)**
    *   Yêu cầu: Ảnh chân dung rõ mặt, định dạng (JPG, PNG), kích thước tối đa (ví dụ 5MB).
    *   Hệ thống upload ảnh lên Supabase Storage vào bucket `documents`.

*   **Hoàn tất:**
    *   Sau khi submit thành công, hệ thống gửi email xác nhận (qua Resend) đến email người dùng.
    *   Trạng thái đơn mặc định là "Pending".

## 3. Luồng Quản Trị (Admin Flow)

### 3.1 Đăng nhập (Login)
*   Admin truy cập `/admin/login`.
*   Sử dụng Username/Password được cấu hình trong biến môi trường (`ADMIN_USERNAME`, `ADMIN_PASSWORD`).
*   Hệ thống sử dụng Cookie (`admin_auth`) để lưu session đăng nhập.

### 3.2 Quản lý đơn (Dashboard)
*   Admin xem danh sách toàn bộ đơn đăng ký.
*   Có thể lọc theo trạng thái: `Pending`, `Processing`, `Completed`, `Rejected`.
*   Xem chi tiết từng đơn, bao gồm ảnh đã upload.
*   **Cập nhật trạng thái:** Admin thay đổi trạng thái đơn để thông báo tiến độ xử lý.

## 4. Quy Tắc Dữ Liệu (Data Rules)

### 4.1 Cơ sở dữ liệu (Database)
*   Sử dụng Supabase (PostgreSQL).
*   Bảng chính: `applications` (lưu thông tin đơn).
*   Row Level Security (RLS): Hiện tại đang tắt hoặc cấu hình cơ bản, cần nâng cấp để đảm bảo người dùng chỉ sửa được đơn của mình (nếu có tính năng login user) và Admin xem được tất cả.

### 4.2 Bảo mật (Security)
*   **File Upload:** Bucket `documents` phải set là Private. Chỉ Admin (authenticated) mới có quyền `SELECT` (xem/tải), người dùng ẩn danh (anon) chỉ có quyền `INSERT` (upload).
*   **Admin Auth:** Cookie auth hiện tại là giải pháp tạm thời. Cần nâng cấp lên Supabase Auth hoặc NextAuth.

## 5. Các Hạn Chế Hiện Tại
*   Chưa có tính năng chỉnh sửa đơn sau khi nộp.
*   Admin login chưa có tính năng "Quên mật khẩu".
*   Chưa có hệ thống phân quyền (Role-based) chi tiết (ví dụ: Viewer, Editor).
