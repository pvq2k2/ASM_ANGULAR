document.title = "Giỏ hàng";
myApp.controller("CartController", function ($scope) {
  $scope.carts = [];

  if (localStorage.getItem("cart")) {
    $scope.carts = JSON.parse(localStorage.getItem("cart"));
  }

  console.log($scope.carts);

  $scope.decreaseQuantity = function (item) {
    if (item.quantity > 1) {
      item.quantity--;
      localStorage.setItem("cart", JSON.stringify($scope.carts));
    }
  };

  $scope.increaseQuantity = function (item) {
    item.quantity++;
    localStorage.setItem("cart", JSON.stringify($scope.carts));
  };

  $scope.onDelete = function (id) {
    if (confirm("Bạn có chắc chắn muốn xóa không?")) {
      var index = -1;
      for (var i = 0; i < $scope.carts.length; i++) {
        if ($scope.carts[i].id === id) {
          index = i;
          break;
        }
      }
      if (index !== -1) {
        $scope.carts.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify($scope.carts));
      }
    }
  };
});
