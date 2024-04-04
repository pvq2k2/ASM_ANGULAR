document.title = "Thêm mới sản phẩm";

myApp.controller(
  "ProductCreateController",
  function ($scope, $http, $location) {
    if (!localStorage.getItem("user")) {
      location.href = `http://127.0.0.1:5500/index.html?#!/`;
    }
    $scope.product = {
      id: "",
      name: "",
      price: "",
      description: "",
      // categoryId: "",
      image: "",
    };
    var apiUrl = "http://localhost:3000/products";
    var categoriesUrl = "http://localhost:3000/categories";

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

    $scope.handleCreateProduct = async () => {
      var invalid = false;
      if (
        $scope.product.name != "" &&
        $scope.product.price != "" &&
        $scope.product.description != "" &&
        // $scope.product.categoryId != "" &&
        $scope.product.image != ""
      ) {
        invalid = true;
      } else {
        alert("Vui lòng nhập đủ thông tin !");
      }
      if (invalid) {
        let response = await $http.get(apiUrl);
        const result = response.data;
        $scope.product.id = `${result.length + 1}`;
        await $http
          .post(apiUrl, $scope.product)
          .then((res) => {
            if (res.status == 201) {
              alert("Thêm sản phẩm thành công !");
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
