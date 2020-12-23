function DeleteUser(id) {
    $.ajax({
        url: "api/users/"+id,
        contentType: "application/json",
        method: "DELETE",
        success: function (user) {
            $("tr[data-rowid='" + user._id + "']").remove();
        }
    })
}