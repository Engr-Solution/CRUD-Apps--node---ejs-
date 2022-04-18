// const { default: axios } = require("axios");

// Create submit
$("#add_user").submit(() => {
  alert("User successfully created");
});

// Update User
$("#update_user").submit((e) => {
  e.preventDefault();

  let data = {};
  let formData = $("#update_user").serializeArray();
  $.map(formData, (item, i) => {
    data[item["name"]] = item["value"];
  });

  $.ajax({
    url: `http://localhost:3000/api/user/${data.id}`,
    method: "PUT",
    data: data,
  }).done(() => {
    alert("User Updated successfully");
    location.reload();
  });
});

// Delete User
$(".delete").click(function () {
  let id = $(this).attr("data-id");
  let request = {
    'url': `http://localhost:3000/api/user/${id}`,
    'method': "DELETE",
  };
  if (confirm("Are you sure you want to delete this user? ")) {
    $.ajax(request).done(function (resp) {
      console.log(resp)
    });
    alert("User Deleted successfully");
    location.reload();
  }
});
