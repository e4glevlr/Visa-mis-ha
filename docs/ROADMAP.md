# Hướng Phát Triển (Roadmap)

Tài liệu này đề xuất lộ trình phát triển tính năng và cải thiện kỹ thuật cho dự án Zonal Pulsar.

## 1. Tính Năng Mới (New Features)

### 1.1 Quản Lý & Xuất Báo Cáo (Admin enhancements)
*   **Export to Excel/CSV:** Cho phép Admin tải danh sách đơn đăng ký về máy để xử lý offline.
*   **Bộ lọc nâng cao:** Lọc theo ngày nộp đơn, quốc tịch, hoặc tìm kiếm theo tên/email/số điện thoại.
*   **Audit Log:** Ghi lại lịch sử thao tác của Admin (ai đã duyệt đơn nào, vào lúc nào) để tra cứu khi cần.

### 1.2 Trải Nghiệm Người Dùng (User Experience)
*   **Tra cứu hồ sơ:** Cho phép người dùng tra cứu trạng thái đơn bằng mã hồ sơ (Application ID) và Email mà không cần đăng nhập.
*   **Đa ngôn ngữ (i18n):** Hỗ trợ thêm tiếng Việt và các ngôn ngữ khác.
*   **Lưu nháp (Draft):** Cho phép người dùng lưu lại thông tin đang điền dở dang (sử dụng LocalStorage hoặc Database).

### 1.3 Thông Báo (Notifications)
*   **Email thông báo trạng thái:** Tự động gửi email cho người dùng khi Admin cập nhật trạng thái (ví dụ: "Hồ sơ của bạn đã được duyệt").
*   **Thông báo Admin:** Gửi email/notification cho Admin khi có đơn mới nộp.

## 2. Cải Thiện Kỹ Thuật (Technical Improvements)

### 2.1 Bảo Mật (Security)
*   **Nâng cấp Authentication:** Chuyển từ Cookie auth đơn giản sang **Supabase Auth** hoặc **NextAuth.js** để quản lý session an toàn hơn, hỗ trợ MFA.
*   **Rate Limiting:** Áp dụng giới hạn số lần request (API Route) để chống spam/DDoS, đặc biệt là API upload và submit form.
*   **Input Sanitization:** Kiểm tra kỹ lưỡng dữ liệu đầu vào để chống XSS, SQL Injection (dù ORM đã hỗ trợ nhưng cần cẩn thận với raw query).

### 2.2 Hiệu Năng (Performance)
*   **Image Optimization:** Tự động resize/compress ảnh khi upload để tiết kiệm dung lượng storage và băng thông.
*   **Database Indexing:** Thêm index cho các trường hay query (ví dụ: `status`, `created_at`, `email`).

### 2.3 Chất Lượng Code (Code Quality)
*   **Unit Test:** Viết unit test cho các hàm utility và logic validate.
*   **Integration Test:** Bổ sung test tích hợp cho các luồng API quan trọng.
*   **Refactor:** Tách nhỏ các component trong form 4 bước để dễ bảo trì hơn.

## 3. CI/CD & DevOps
*   **Staging Environment:** Thiết lập môi trường Staging để test trước khi deploy lên Production.
*   **Automated Rollback:** Cấu hình để dễ dàng quay lại phiên bản cũ nếu deploy mới bị lỗi.
