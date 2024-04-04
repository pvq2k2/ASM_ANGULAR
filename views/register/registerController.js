document.title = "Đăng ký";

myApp.controller("RegisterController", function ($scope, $http, $location) {
  if (localStorage.getItem("user")) {
    location.href = `http://127.0.0.1:5500/index.html?#!/`;
  }
  const apiUrl = "http://localhost:3000/users";
  $scope.user = {
    id: 0,
    fullName: "",
    numberPhone: "",
    email: "",
    password: "",
  };

  $scope.handleRegister = async () => {
    try {
      var invalid = false;
      if (
        $scope.user.fullName != "" &&
        $scope.user.numberPhone != "" &&
        $scope.user.email != "" &&
        $scope.user.password != ""
      ) {
        invalid = true;
      } else {
        alert("Vui lòng nhập đầy đủ thông tin !");
      }
      if (invalid) {
        let response = await $http.get(apiUrl);
        const isEmail = response.data.find(
          (user) => $scope.user.email === user.email
        );
        const isNumberPhone = response.data.find(
          (user) => $scope.user.numberPhone === user.numberPhone
        );
        if (isEmail) {
          alert("Email đã tồn tại !");
          return;
        }
        if (isNumberPhone) {
          alert("Số điện thoại đã tồn tại !");
          return;
        }
        const result = response.data;
        $scope.user.id = result.length + 1;
        await $http.post(apiUrl, $scope.user).then((res) => {
          if (res.status == 201) {
            alert("Đăng ký thành công !");
            $location.path("/login");
          }
        });
      }
    } catch (error) {
      alert(JSON.stringify(error));
    }
  };
});
