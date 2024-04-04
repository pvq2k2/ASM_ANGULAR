document.title = "Cập nhật danh mục";

myApp.controller(
  "CategoriesUpdateController",
  function ($scope, $http, $routeParams, $location) {
    if (!localStorage.getItem("user")) {
      location.href = `http://127.0.0.1:5500/index.html?#!/`;
    }
    var apiUrl = "http://localhost:3000/categories";
    var id = $routeParams.id;

    $scope.getDetail = function () {
      $http.get(`${apiUrl}/${id}`).then(function (response) {
        if (response.status == 200) {
          $scope.category = response.data;
        }
      });
    };

    $scope.getDetail();

    $scope.handleUpdateCategories = function () {
      var invalid = false;
      if ($scope.category.name != "") {
        invalid = true;
      }
      if (invalid) {
        $http
          .put(`${apiUrl}/${id}`, $scope.category)
          .then(function (response) {
            if (response.status == 200) {
              alert("Cập nhật danh mục thành công !");
              $location.path("/admin/categories");
            }
          })
          .catch((error) => {
            alert(JSON.stringify(error));
          });
      }
    };
  }
);
