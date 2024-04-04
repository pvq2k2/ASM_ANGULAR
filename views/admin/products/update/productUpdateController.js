document.title = "Cập nhật sản phẩm";

myApp.controller(
  "ProductUpdateController",
  function ($scope, $http, $routeParams, $location) {
    if (!localStorage.getItem("user")) {
      location.href = `http://127.0.0.1:5500/index.html?#!/`;
    }
    var id = $routeParams.id;
    var apiUrl = "http://localhost:3000/products";
    var categoriesUrl = "http://localhost:3000/categories";

    $scope.getDetail = function () {
      $http.get(`${apiUrl}/${id}`).then(function (response) {
        if (response.status == 200) {
          $scope.product = response.data;
        }
      });
    };

    $scope.getDetail();

    $scope.getListCategories = function () {
      $http
        .get(categoriesUrl)
        .then(function ($response) {
          $scope.categories = $response.data;
        })
        .catch(function (error) {
          alert("Lỗi khi lấy danh sách danh mục:", JSON.stringify(error));
        });
    };
    $scope.getListCategories();

    $scope.handleUpdateProduct = async () => {
      var invalid = false;
      if (
        $scope.product.name != "" &&
        $scope.product.price != "" &&
        $scope.product.description != "" &&
        $scope.product.image != ""
      ) {
        invalid = true;
      } else {
        alert("Vui lòng nhập đủ thông tin !");
      }
      if (invalid) {
        $http
          .put(`${apiUrl}/${id}`, $scope.product)
          .then(function (response) {
            if (response.status == 200) {
              alert("Cập nhật sản phẩm thành công !");
              $location.path("/admin/products");
            }
          })
          .catch((error) => {
            alert(JSON.stringify(error));
          });
      }
    };
  }
);
