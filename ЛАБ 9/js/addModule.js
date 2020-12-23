function GetUsers() {
    $.ajax({
        url: "/api/users",
        type: "GET",
        contentType: "application/json",
        success: function (users) {
            var rows = "";
            $.each(users, function (index, user) {
                rows += row(user);
            })
            alert("Минимальная температура за последнее время во всех регионах составляла " + Math.min(...degrees));
            $("table tbody").append(rows);
         }
    });
}

function GetUser(id) {
    $.ajax({
        url: "/api/users/"+id,
        type: "GET",
        contentType: "application/json",
        success: function (user) {
            var form = document.forms["climateForm"];
            form.elements["id"].value = user._id;
            form.elements["region"].value = user.name;
            form.elements["average"].value = user.age;
            form.elements["precipitation"].value = user.precipitation;
            form.elements["day"].value = user.day;
        }
    });
}


function CreateUser(userName, userAge, climatePrecipitation, climateDay) {
    $.ajax({
        url: "api/users",
        contentType: "application/json",
        method: "POST",
        data: JSON.stringify({
            name: userName,
            age: userAge,
            precipitation: climatePrecipitation,
            day: climateDay 
        }),
        success: function (user) {
            reset();
            $("table tbody").append(row(user));
        }
    })
}

function reset() {
    var form = document.forms["climateForm"];
    form.reset();
    form.elements["id"].value = 0;
}

let degrees = [];
let row = function (user) {
    degrees.push(user.age);
    return "<tr data-rowid='" + user._id + "'>" +
           "<td>" + user.name + "</td> <td>" + user.age + "</td>" + "<td>" + user.precipitation + "</td>" + "<td>" + user.day + "</td>" +
           "<td><a class='editLink' data-id='" + user._id + "'>Изменить</a> | " +
            "<a class='removeLink' data-id='" + user._id + "'>Удалить</a></е></tr>";
}

GetUsers();