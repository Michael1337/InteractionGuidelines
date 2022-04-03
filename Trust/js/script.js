$(document).ready(function () {
    setTimeout(function () {
        if(confirm("Sie sind der 1 Millionste Besucher! Herzlichen Glückwunsch zu Ihrem Traumpreis!")) {
            window.location.href = "default.html";
        }
    }, 10000);
    setTimeout(function () {
        if(confirm("Sie haben ein iPhone 12 gewonnen!")) {
            window.location.href = "default.html";
        }
    }, 25000);

    $("#submit").click(function(e) {
        e.preventDefault();
       comment();
    });

    $("#buy").click(function(e) {
       e.preventDefault();
       if($('input[name=server]:checked').val()) {
           $("#buyDiv").show();
           $("#choose").hide();
       }
    });

    $('#buyForm input[type=radio]').change(function(){
        $(".payment").hide();
        if($(this).val() == 1) {
            $("#bitcoin").show();
        } else {
            $("#creditcard").show();
        }
        $("#done").show();

    });
});


function comment() {
    var name = $("#name").val();
    var text = $("#text").val();
    var date = "heute";
    var comment = name + " ("+date+"): "+text;
    $("#comments").prepend(comment+"<br>");
}