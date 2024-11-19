/**
 * @name umi Cấu hình định tuyến
 * @description Chỉ hỗ trợ path,component,routes,redirect,wrappers,name,icon Cấu hình
 * @param path  path Chỉ hỗ trợ hai loại đàn vị trí, đầu tiên là các tham số động :id Trong biểu mẫu, loại thứ hai là khớp * -pass và đoạn văn chỉ có thể xuất hiện phần cuối của chuỗi định tuyến.
 * @param component Cấu hình location Và path Sau khi kết xuất để kết xuất React Đường dẫn thành phần.Nó có thể là đường dẫn tuyệt đối hoặc đường dẫn tương đối. Nếu đó là một đường dẫn tương đối, nó sẽ đến từ src/pages Bắt đầu tìm kiếm.
 * @param routes Cấu hình phụ, thường được tăng lên bởi nhiều đường dẫn layout Sử dụng khi thành phần.
 * @param redirect Cấu hình nhảy tuyến đường
 * @param wrappers Thành phần đóng gói của thành phần định tuyến cấu hình có thể được kết hợp với nhiều chức năng hơn cho thành phần định tuyến hiện tại. Ví dụ: nó có thể được sử dụng cho các quyền của cấp độ định tuyến
 * @param name Định cấu hình tiêu đề của định tuyến, đọc các tài liệu quốc tế theo mặc định menu.ts ở giữa menu.xxxx Giá trị, giống như cấu hình name vì login，Đọc menu.ts ở giữa menu.login Giá trị của giá trị là tiêu đề
 * @param icon Định cấu hình biểu tượng định tuyến, hãy tham khảo giá trị https://ant.design/components/icon-cn， Hãy chú ý loại bỏ hậu tố kiểu và chữ thường. Nếu bạn muốn định cấu hình biểu tượng là <StepBackwardOutlined /> Giá trị nên được stepBackward hoặc StepBackward，Nếu bạn muốn định cấu hình biểu tượng là <UserOutlined /> Giá trị nên được user hoặc User
 * @doc https://umijs.org/docs/guides/routes
 */
export default [
  {
    path: '/auth',
    layout: false,
    routes: [
      {
        path: '/auth',
        redirect: '/auth/login',
      },
      {
        name: 'login',
        path: '/auth/login',
        component: './Auth/Login',
      },
    ],
  },
  {
    path: '/',
    redirect: '/hotel/room',
  },
  {
    path: '*',
    layout: false,
    component: './404',
  },
];
