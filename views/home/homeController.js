document.title = "Trang chủ";

myApp.controller("HomeController", function ($scope, $http, $location) {
  var apiProductUrl = "http://localhost:3000/products";
  var apiCategoriesUrl = "http://localhost:3000/categories";

  $scope.getListProduct = function () {
    $http.get(`${apiProductUrl}`).then(function (response) {
      if (response.status == 200) {
        $scope.products = response.data;
      }
    });
  };

  $scope.getListCategories = function () {
    $http.get(`${apiCategoriesUrl}`).then(function (response) {
      if (response.status == 200) {
        $scope.categories = response.data;
      }
    });
  };

  $scope.getListProduct();
  $scope.getListCategories();

  $scope.onDetail = function (id) {
    $location.path(`/detail/${id}`);
  };
});
