document.title = "Chi tiết sản phẩm";

myApp.controller(
  "DetailProductController",
  function ($scope, $http, $routeParams) {
    if (!localStorage.getItem("user")) {
      location.href = `http://127.0.0.1:5500/index.html?#!/`;
    }
    $scope.product = {
      quantity: 1,
    };
    var id = $routeParams.id;
    var apiUrl = "http://localhost:3000/products";

    $scope.getDetail = function () {
      $http.get(`${apiUrl}/${id}`).then(function (response) {
        if (response.status == 200) {
          $scope.product = { ...$scope.product, ...response.data };
        }
      });
    };

    $scope.getDetail();

    $scope.handleAddToCart = async () => {
      var invalid = false;
      if ($scope.product.quantity > 0) {
        invalid = true;
      } else {
        alert("Vui lòng nhập số lượng !");
      }
      if (invalid) {
        if (localStorage.getItem("cart")) {
          let cart = JSON.parse(localStorage.getItem("cart"));
          let index = cart.findIndex((item) => item.id == $scope.product.id);

          if (index !== -1) {
            cart[index].quantity =
              parseInt(cart[index].quantity) +
              parseInt($scope.product.quantity);
          } else {
            cart.push($scope.product);
          }
          alert("Thêm vào giỏ hàng thành công !");
          localStorage.setItem("cart", JSON.stringify(cart));
        } else {
          alert("Thêm vào giỏ hàng thành công !");
          localStorage.setItem("cart", JSON.stringify([$scope.product]));
        }
      }
    };
  }
);
