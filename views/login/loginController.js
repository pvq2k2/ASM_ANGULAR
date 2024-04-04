document.title = "Đăng nhập";

myApp.controller("LoginController", function ($scope, $http, $location) {
  if (localStorage.getItem("user")) {
    location.href = `http://127.0.0.1:5500/index.html?#!/`;
  }
  const apiUrl = "http://localhost:3000/users";
  $scope.user = {
    email: "",
    password: "",
  };

  $scope.handleLogin = async () => {
    try {
      var invalid = false;
      if ($scope.user.email != "" && $scope.user.password) {
        invalid = true;
      } else {
        alert("Vui lòng nhập đầy đủ thông tin !");
      }
      if (invalid) {
        await $http.get(apiUrl).then((res) => {
          if (res.status == 200) {
            const user = res.data.find(
              (user) =>
                $scope.user.username === user.username &&
                $scope.user.password === user.password
            );
            if (user) {
              let data = res.data[0];
              delete data.password;
              localStorage.setItem("user", JSON.stringify(data));
              alert("Đăng nhập thành công !");
              $location.path("/");
            } else {
              alert("Email hoặc mật khẩu không chính xác !");
              return;
            }
          }
        });
      }
    } catch (error) {
      alert(JSON.stringify(error));
    }
  };
});
