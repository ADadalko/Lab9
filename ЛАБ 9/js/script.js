$("#open").click(function (e) {
    document.location.href = "http://localhost:3000/climate";
})

// сброс значений формы
$("#reset").click(function (e) {

    e.preventDefault();
    reset();
})



$("form").submit(function (e) {
    e.preventDefault();
    let id = this.elements["id"].value;
    let name = this.elements["region"].value;
    let age = this.elements["average"].value;
    let precipitation = this.elements["precipitation"].value;
    let day = this.elements["day"].value;
    if (id == 0)
        CreateUser(name, age, precipitation, day);
    else
        EditUser(id, name, age, precipitation, day);
});


$("body").on("click", ".editLink", function () {
    var id = $(this).data("id");
    GetUser(id);
})


$("body").on("click", ".removeLink", function () {
    var id = $(this).data("id");
    DeleteUser(id);
})

