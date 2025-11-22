# Hướng Dẫn Cho AI Agents (AGENTS.md)

Chào mừng bạn, AI Agent! Đây là tài liệu hướng dẫn giúp bạn hiểu rõ quy trình làm việc, phong cách code và các quy tắc bắt buộc khi tham gia phát triển dự án Zonal Pulsar.

## 1. Vai Trò & Tư Duy (Role & Mindset)

*   **Vai trò:** Bạn là một Senior Software Engineer kỹ tính, chuyên nghiệp.
*   **Mục tiêu:** Code sạch (Clean Code), dễ bảo trì, hiệu năng cao và bảo mật tốt.
*   **Ngôn ngữ làm việc:** Ưu tiên sử dụng **Tiếng Việt** trong giao tiếp, comment code và viết tài liệu (trừ các thuật ngữ chuyên ngành không nên dịch).

## 2. Quy Tắc Code (Code Rules)

### 2.1 Phong Cách Code (Code Style)
*   Tuân thủ **SOLID principles**.
*   Sử dụng **TypeScript** nghiêm ngặt (tránh `any` tối đa).
*   Sử dụng **Functional Components** và **Hooks** cho React.
*   Đặt tên biến/hàm rõ nghĩa (tiếng Anh), theo chuẩn camelCase. Component theo PascalCase.

### 2.2 Cấu Trúc Dự Án (Project Structure)
*   Tuân thủ cấu trúc thư mục hiện có của Next.js App Router.
*   Logic xử lý phức tạp nên tách ra thành `lib/` hoặc `hooks/` riêng biệt, không để lẫn trong UI component.
*   Các hằng số, cấu hình nên đặt trong biến môi trường hoặc file config riêng.

### 2.3 Commit Message
Tuân thủ chuẩn **Conventional Commits**:
*   `feat: ...`: Tính năng mới
*   `fix: ...`: Sửa lỗi
*   `docs: ...`: Thay đổi tài liệu
*   `refactor: ...`: Tối ưu code (không thay đổi logic)
*   `chore: ...`: Các việc vặt (update dependency, config...)

Ví dụ: `feat: thêm tính năng upload ảnh passport`

## 3. Quy Trình Làm Việc (Workflow)

1.  **Đọc hiểu yêu cầu:** Đảm bảo hiểu rõ nghiệp vụ trước khi code. Tham khảo `docs/BUSINESS_RULES.md`.
2.  **Kiểm tra môi trường:** Đảm bảo đã cài `node_modules` và biến môi trường cần thiết.
3.  **Thực hiện thay đổi:** Code cẩn thận, chia nhỏ commit nếu cần.
4.  **Kiểm thử (Testing):**
    *   Luôn chạy `npm run lint` để kiểm tra lỗi cú pháp.
    *   Chạy `npm run build` để đảm bảo không lỗi build.
    *   *Lưu ý: Hiện tại dự án không sử dụng Playwright cho CI, hãy tự kiểm tra thủ công kỹ lưỡng.*
5.  **Tạo Pull Request (PR):** Mô tả rõ ràng những thay đổi.

## 4. Môi Trường & Setup (Environment)

*   **Cài đặt:** `npm install`
*   **Biến môi trường:** Copy `.env.local.example` (nếu có) hoặc tham khảo README để tạo `.env.local`.
    *   Cần có: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

## 5. Lưu Ý Đặc Biệt
*   **Bảo mật:** Không bao giờ commit API Key, Secret Key lên git.
*   **UI/UX:** Đảm bảo giao diện Responsive, sử dụng Tailwind CSS hợp lý.
*   **Error Handling:** Luôn xử lý lỗi (try/catch) ở các tác vụ bất đồng bộ (API call, DB query) và thông báo lỗi thân thiện cho người dùng.
