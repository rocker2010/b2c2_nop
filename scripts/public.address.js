$(function () {
    $(".textAddress").click(function () {
        $("#peisong").show();
        $("#peisong").parent().find(".sel").removeClass("sel");
        $(this).toggleClass("sel");
    });
    $(".closed").click(function () {
        $("#peisong").hide();
    });
})
