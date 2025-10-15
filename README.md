# 🎵 **Music App – Ứng dụng nghe nhạc thông minh**

> Nghe – Khám phá – Chia sẻ  
> Ứng dụng nghe nhạc hiện đại với giao diện đẹp mắt và tính năng đa dạng

## [DEMO - DRIVE LINK](https://drive.google.com/file/d/1Ef57lreLN5dhFICctrNeW9N0UWxjT4AS/view?usp=sharing)
## [DOWNLOAD APK](https://drive.google.com/file/d/1Sv-0ULDGxNG_iMn1DGOKLmzxgFk4T3fn/view?usp=sharing)

---

## 📸 Ảnh minh họa giao diện

<!-- Thêm ảnh giới thiệu tổng quan app -->
![Ảnh tổng quan giao diện]()

---

## 🎧 Tính năng chính

### 1. 🏠 **Trang chủ & Khám phá**
- Giao diện hiện đại với thiết kế dark mode
- Hiển thị các bài hát hot, nghệ sĩ nổi tiếng
- Danh sách phát được đề xuất theo sở thích
- Banner quảng bá album và nghệ sĩ mới

<!-- Ảnh minh họa trang chủ -->
![Màn hình trang chủ]()

---

### 2. 🎵 **Trình phát nhạc**
- **Mini Player**: Điều khiển nhanh từ bất kỳ màn hình nào
- **Full Player**: Giao diện phát nhạc đầy đủ với:
  - Thanh tiến trình âm thanh
  - Điều khiển phát/tạm dừng, next/previous
  - Hiển thị thông tin bài hát và nghệ sĩ
  - Phát nhạc nền khi app ở background
- Hỗ trợ nhiều định dạng âm thanh
- Quản lý hàng đợi phát nhạc

<!-- Ảnh minh họa trình phát -->
![Trình phát nhạc]()

---

### 3. 👨‍🎤 **Quản lý Nghệ sĩ & Album**
- Danh sách nghệ sĩ với avatar và thông tin chi tiết
- Trang chi tiết nghệ sĩ với top songs và album
- Thêm/chỉnh sửa thông tin nghệ sĩ mới
- Phân loại theo thể loại nhạc
- Album chi tiết với danh sách track

---

### 4. 📚 **Thư viện cá nhân**
- Quản lý playlist yêu thích
- Lịch sử nghe nhạc
- Bài hát đã tải về
- Tạo và quản lý playlist tùy chỉnh
- Chia sẻ playlist với bạn bè

<!-- Ảnh minh họa thư viện -->
![Thư viện cá nhân]()

---

### 5. 🔍 **Tìm kiếm thông minh**
- Tìm kiếm theo tên bài hát, nghệ sĩ, album
- Gợi ý tự động khi gõ
- Lọc kết quả theo thể loại
- Lịch sử tìm kiếm

---

### 6. 👤 **Quản lý tài khoản**
- Đăng ký/đăng nhập với email
- Xác thực tài khoản qua email
- Chỉnh sửa thông tin cá nhân
- Cài đặt chất lượng âm thanh
- Quản lý dữ liệu và bộ nhớ
- Hỗ trợ và phản hồi

---

### 7. 🤖 **Trợ lý âm nhạc AI**
- Floating Assistant cho gợi ý nhạc
- Chatbot hỗ trợ tìm kiếm bài hát
- Đề xuất nhạc theo tâm trạng

---

### 8. ⚙️ **Cài đặt nâng cao**
- Chế độ dark/light mode
- Chất lượng âm thanh (128kbps - 320kbps)
- Tự động tải nhạc khi có WiFi
- Quản lý bộ nhớ cache
- Điều chỉnh âm lượng và equalizer

## 🏗️ Công nghệ phát triển

| Thành phần | Công nghệ |
|------------|-----------|
| Framework  | Expo (React Native) |
| Router     | Expo Router |
| UI/Styling | NativeWind (TailwindCSS) |
| Audio      | Expo AV, Expo Audio |
| State      | Zustand, React Query |
| Animation  | React Native Reanimated |
| Icons      | Custom SVG Icons |
| Images     | Expo Image |
| Storage    | AsyncStorage |
| Forms      | React Hook Form + Yup |

---

## 🚀 Khởi chạy dự án

### 📱 Mobile App (Expo)

#### Cài đặt dependencies
```bash
npm install
```

#### Chạy trên simulator/device
```bash
# Chạy development server
npx expo start

# Chạy trên Android
npx expo run:android

# Chạy trên iOS
npx expo run:ios

# Chạy trên web
npx expo start --web
```

#### Build production
```bash
# Prebuild native code
npx expo prebuild --clean

# Build APK cho Android
npx expo build:android

# Build IPA cho iOS
npx expo build:ios
```

---

## 📦 Cấu trúc thư mục

```
src/
├── app/                    # App routing (Expo Router)
│   ├── (tabs)/            # Bottom tabs navigation
│   ├── (auth)/            # Authentication screens
│   ├── (children)/        # Child screens
│   └── (user)/            # User profile screens
├── components/            # Reusable components
│   ├── MiniPlayer/        # Mini music player
│   ├── MusicPlayer/       # Full music player
│   └── home/             # Home screen components
├── constants/             # App constants
├── data/                 # Sample data & types
├── hooks/                # Custom hooks
├── utils/                # Utility functions
│   ├── audioQueueManager.ts
│   └── soundManager.ts
├── store/                # State management
└── types/                # TypeScript definitions
```

---

## 🎯 Tính năng nổi bật

- ✅ **Phát nhạc nền**: Tiếp tục phát khi app ở background
- ✅ **Mini Player**: Điều khiển nhanh từ mọi màn hình
- ✅ **Offline Mode**: Nghe nhạc đã tải về khi không có mạng
- ✅ **Smart Queue**: Quản lý hàng đợi phát nhạc thông minh
- ✅ **Beautiful UI**: Giao diện hiện đại với animations mượt mà
- ✅ **Cross Platform**: Chạy trên iOS, Android và Web

---

## 🔧 Scripts hữu ích

```bash
# Format code
npm run format-code

# Lint code
npm run lint

# Run tests
npm test

# Clear cache
npx expo start --clear
```

---

## 📄 License

This project is licensed under the MIT License.

---

## 👥 Đóng góp

Mọi đóng góp đều được chào đón! Hãy tạo issue hoặc pull request.

---

## 📞 Liên hệ

- **Email**: support@musicapp.com
- **Website**: https://musicapp.com
- **GitHub**: https://github.com/your-repo/music-app