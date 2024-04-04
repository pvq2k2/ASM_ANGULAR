document.title = "Thêm mới danh mục";

myApp.controller(
  "CategoriesCreateController",
  function ($scope, $http, $location) {
    if (!localStorage.getItem("user")) {
      location.href = `http://127.0.0.1:5500/index.html?#!/`;
    }
    const apiUrl = "http://localhost:3000/categories";
    $scope.category = {
      id: "",
      name: "",
    };

    $scope.handleCreateCategories = async () => {
      var invalid = false;
      if ($scope.category.name != "") {
        invalid = true;
      }
      if (invalid) {
        let response = await $http.get(apiUrl);
        const result = response.data;
        $scope.category.id = `${result.length + 1}`;
        await $http
          .post(apiUrl, $scope.category)
          .then((res) => {
            if (res.status == 201) {
              alert("Thêm danh mục thành công !");
              $location.path("/admin/categories");
            }
          })
          .catch((error) => {
            alert(error);
          });
      }
    };
  }
);
