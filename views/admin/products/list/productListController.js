document.title = "Quản lý sản phẩm";

myApp.controller("ProductListController", function ($scope, $http, $location) {
  if (!localStorage.getItem("user")) {
    location.href = `http://127.0.0.1:5500/index.html?#!/`;
  }
  var apiUrl = "http://localhost:3000/products";

  $scope.getList = function () {
    $http.get(apiUrl).then(function ($response) {
      $scope.products = $response.data;
    });
  };

  $scope.getList();

  $scope.onEdit = function (id) {
    $location.path(`/admin/products/update/${id}`);
  };

  $scope.onDelete = function (id) {
    if (confirm("Bạn có chắc chắn muốn xóa không?")) {
      $http
        .delete(`${apiUrl}/${id}`)
        .then(function (response) {
          if (response.status == 200) {
            alert("Xóa sản phẩm thành công !");
            $scope.getList();
          }
        })
        .catch((error) => {
          alert(JSON.stringify(error));
        });
    }
  };
});
