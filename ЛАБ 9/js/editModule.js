function EditUser(userId, userName, userAge, climatePrecipitation, climateDay) {
    $.ajax({
        url: "api/users",
        contentType: "application/json",
        method: "PUT",
        data: JSON.stringify({
            id: userId,
            name: userName,
            age: userAge,
            precipitation: climatePrecipitation,
            day: climateDay
        }),
        success: function (user) {
            reset();
            console.log(user);
            $("tr[data-rowid='" + user._id + "']").replaceWith(row(user));
        }
    })
}
