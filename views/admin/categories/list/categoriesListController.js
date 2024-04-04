document.title = "Quản lý danh mục";

myApp.controller(
  "CategoriesListController",
  function ($scope, $http, $location) {
    if (!localStorage.getItem("user")) {
      location.href = `http://127.0.0.1:5500/index.html?#!/`;
    }
    var apiUrl = "http://localhost:3000/categories";
    $scope.getList = function () {
      $http.get(apiUrl).then(function ($response) {
        $scope.categories = $response.data;
      });
    };
    $scope.getList();

    $scope.onEdit = function (id) {
      $location.path(`/admin/categories/update/${id}`);
    };

    $scope.onDelete = function (id) {
      if (confirm("Bạn có chắc chắn muốn xóa không?")) {
        $http
          .delete(`${apiUrl}/${id}`)
          .then(function (response) {
            if (response.status == 200) {
              alert("Xóa danh mục thành công !");
              $scope.getList();
            }
          })
          .catch((error) => {
            alert(JSON.stringify(error));
          });
      }
    };
  }
);
