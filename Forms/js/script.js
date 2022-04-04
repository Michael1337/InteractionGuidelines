$(document).ready(function () {
    $("#formCreateAccount").show();

    /**
     * LOGIN
     */
    $("#logInEmail").keyup(function () {
        checkLogIn();
    });
    $("#logInPassword").keyup(function () {
        checkLogIn();
    });
    $("#logInPasswordBtn").click(function (e) {
        e.preventDefault();
        var x = $("#logInPassword");
        var y = $(this).find($(":first-child"));
        if (x.attr('type') === "password") {
            x.attr('type', 'text');
        } else {
            x.attr('type', 'password');
        }
        y.toggleClass("fa-eye");
        y.toggleClass("fa-eye-slash");
    });
    $("#logInSubmit").click(function (e) {
        e.preventDefault();
        $(".formular").hide();
        $("#formStay").show();
    });
    $("#logInCreate").click(function (e) {
        e.preventDefault();
        $(".formular").hide();
        $("#formCreateAccount").show();
    });

    /**
     * CREATEACCOUNT
     */
    checkCreateAccount();
    $('#createEmail').keyup(function () {
        if (checkCreateEmail()) {
            checkCreateAccount();
        }
    });
    $('#createPhone').keyup(function () {
        if (checkCreatePhone()) {
            checkCreateAccount();
        }
    });
    $('#createPassword').keyup(function () {
        if (checkCreatePassword()) {
            checkCreateAccount();
        }
    });
    $("#createPasswordBtn").click(function (e) {
        e.preventDefault();
        var x = $("#createPassword");
        var y = $(this).find($(":first-child"));
        if (x.attr('type') === "password") {
            x.attr('type', 'text');
        } else {
            x.attr('type', 'password');
        }
        y.toggleClass("fa-eye");
        y.toggleClass("fa-eye-slash");
    });
    $('#createPassword2').keyup(function () {
        if (checkCreatePassword2()) {
            checkCreateAccount();
        }
    });
    $("#createPassword2Btn").click(function (e) {
        e.preventDefault();
        var x = $("#createPassword2");
        var y = $(this).find($(":first-child"));
        if (x.attr('type') === "password") {
            x.attr('type', 'text');
        } else {
            x.attr('type', 'password');
        }
        y.toggleClass("fa-eye");
        y.toggleClass("fa-eye-slash");
    });
    $('#createFirstname').keyup(function () {
        checkCreateAccount();
    });
    $('#createLastname').keyup(function () {
        checkCreateAccount();
    });
    $('#createPLZ').bind('keyup change', function (e) {
        if (!checkPLZ()) {
            return false;
        }
        if ($(this).val().length >= 4) {
            var ort = $('#createCity');
            $.getJSON('https://www.geonames.org/postalCodeLookupJSON?&country=' + $("#createCountry").val() + '&callback=?', {postalcode: this.value}, function (response) {
                if (response && response.postalcodes.length && response.postalcodes[0].placeName) {
                    ort.val(response.postalcodes[0].placeName);
                }
            });
        }
        checkCreateAccount();
    });
    $("#createLogIn").click(function (e) {
        e.preventDefault();
        $(".formular").hide();
        $("#formLogIn").show();
    });
    $("#createAccountSubmit").click(function (e) {
        e.preventDefault();
        $(".formular").hide();
        $("#booking").show();
    });


    /**
     * BOOKING
     */
    checkBooking();
    $('#bookingDate').change(function () {
        if (checkBookingDate()) {
            checkBooking();
        }
    });
    $('#bookingPayment').change(function () {
        if (checkBookingPayment()) {
            checkBooking();
        }
    });

    var date = new Date();
    var nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + 3);
    $('#bookingDate').dateRangePicker({
        language: "de",
        format: 'DD.MM.YYYY',
        startOfWeek: 'monday',
        startDate: getFormattedDate(date),
        separator: " bis ",
        maxDays: 21,
        selectForward: true
    });
    $('#bookingDate').data('dateRangePicker').setDateRange(getFormattedDate(date), getFormattedDate(nextDate));
    $('#bookingDate').bind('datepicker-closed', function () {
        if (checkBookingDate()) {
            checkBooking();
        }
    });

    $("#bookingReturn").click(function (e) {
        e.preventDefault();
        $(".formular").hide();
        $("#formCreateAccount").show();
    });
});

function getFormattedDate(date) {
    var year = date.getFullYear();

    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;

    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;

    return day + '.' + month + '.' + year;
}

function checkLogIn() {
    var email = $("#logInEmail");
    var password = $("#logInPassword");
    if (!email.val() || !password.val()) {
        $("#logInSubmit").prop("disabled", true);
        $("#logInError").html("Bitte geben Sie Ihre <span class='errorText'>E-Mail-Adresse</span> und Ihr <span class='errorText'>Passwort</span> ein.");
    } else {
        $("#logInSubmit").prop("disabled", false);
        $("#logInError").text("");
    }
}

function checkCreateEmail() {
    var email = $('#createEmail');
    var submit = $("#createAccountSubmit");
    var error = $("#createAccountError");
    submit.prop("disabled", true);
    error.html("Die angegebene <span class='errorText'>E-Mail-Adresse</span> entspricht keiner gültigen Form. Überprüfen Sie Ihre Angabe oder wählen Sie eine andere E-Mail-Adresse.");
    var b = false;
    if (email.val()) {
        b = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email.val());
    }
    if (b === true) {
        submit.prop("disabled", false);
        error.html("");
    }
    return b;
}

function checkCreatePhone() {
    var phone = $('#createPhone');
    var submit = $("#createAccountSubmit");
    var error = $("#createAccountError");
    submit.prop("disabled", true);
    error.html("Die angegebene <span class='errorText'>Handynummer</span> entspricht keiner gültigen Form. Nicht-Deutsche Nummern werden leider nicht unterstützt.");
    var b = false;
    if (phone.val()) {
        var strip = phone.val().replace(/\s/g, '');
        strip = strip.replace(/\//g, '');
        strip = strip.replace(/-/g, '');
        b = /^((\+49)|(0))[1][5-7]\d{7,10}$/.test(strip);
    } else {
        b = true;
    }
    if (b === true) {
        submit.prop("disabled", false);
        error.html("");
    }
    return b;
}

function checkCreatePassword() {
    var pass = $('#createPassword');
    var submit = $("#createAccountSubmit");
    var error = $("#createAccountError");
    submit.prop("disabled", true);
    error.html("Das angegebene <span class='errorText'>Passwort</span> entspricht nicht den Anforderungen.");
    var b = false;
    if (pass.val()) {
        b = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[ !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])[A-Za-z\d !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]{8,}$/.test(pass.val());
    }
    if (b === true) {
        submit.prop("disabled", false);
        error.html("");
    }
    return b;
}

function checkCreatePassword2() {
    var pass = $('#createPassword');
    var pass2 = $('#createPassword2');
    var submit = $("#createAccountSubmit");
    var error = $("#createAccountError");
    submit.prop("disabled", true);
    error.html("Die <span class='errorText'>Passwort-Wiederholung</span> stimmt nicht mit dem Passwort überein.");
    var b = false;
    if (pass.val()) {
        b = (pass.val() === pass2.val());
    }
    if (b === true) {
        submit.prop("disabled", false);
        error.html("");
    }
    return b;
}

function checkPLZ() {
    var submit = $("#createAccountSubmit");
    var error = $("#createAccountError");
    submit.prop("disabled", true);
    error.html("Die angegebene <span class='errorText'>PLZ</span> scheint nicht valide zu sein.");
    var c = $("#createCountry").val();
    var plz = $('#createPLZ').val();
    var b = false;

    if (c === "DE") {
        b = /^([0-9]{5})$/.test(plz);
    }
    if (c === "AT") {
        b = /^([0-9]{4})$/.test(plz);
    }
    if (c === "CH") {
        b = /^(([1-468][0-9]|[57][0-7]|9[0-6])[0-9]{2})$/.test(plz);
    }
    if (!plz) {
        b = true;
    }
    if (b === true) {
        submit.prop("disabled", false);
        error.html("");
    }
    return b;
}

function checkCreateAccount() {
    var submit = $("#createAccountSubmit");
    var error = $("#createAccountError");
    var firstname = $("#createFirstname");
    var lastname = $("#createLastname");
    var email = $("#createEmail");
    var pass = $("#createPassword");
    var pass2 = $("#createPassword2");
    var country = $("#createCountry");

    if (!firstname.val() || !lastname.val() || !email.val() || !pass.val() || !pass2.val() || !country.val()) {
        submit.prop("disabled", true);
        error.html("Bitte füllen Sie alle mit einem (<span class=\"mandatory\">*</span>) markierten Felder aus.");
        return false;
    }

    if (!checkCreateEmail()) {
        return false;
    }
    if (!checkCreatePassword()) {
        return false;
    }
    if (!checkCreatePassword2()) {
        return false;
    }

    if ($("#createPhone").val()) {
        checkCreatePhone();
    }
    if ($("#createPLZ").val()) {
        checkPLZ();
    }

    submit.prop("disabled", false);
    error.html("");
}

function checkBooking() {
    var submit = $("#bookingSubmit");
    var error = $("#bookingError");
    var date = $("#bookingDate");
    var payment = $("#bookingPayment");

    if (!date.val() || !payment.val()) {
        submit.prop("disabled", true);
        error.html("Bitte füllen Sie alle mit einem (<span class=\"mandatory\">*</span>) markierten Felder aus.");
        return false;
    }
    if (!checkBookingDate()) {
        return false;
    }
    if (!checkBookingPayment()) {
        return false;
    }
    submit.prop("disabled", false);
    error.html("");
    return true;
}

function checkBookingDate() {
    var submit = $("#bookingSubmit");
    var error = $("#bookingError");
    var date = $("#bookingDate");

    if (!date.val()) {
        submit.prop("disabled", true);
        error.html("Bitte füllen Sie alle mit einem (<span class=\"mandatory\">*</span>) markierten Felder aus.");
        return false;
    }

    var bool = /^\d{2}([./-])\d{2}([./-])\d{4} bis \d{2}([./-])\d{2}([./-])\d{4}$/.test(date.val());
    if(!bool) {
        submit.prop("disabled", true);
        error.html("Die angegebenen <span class='errorText'>Reisedaten</span> entsprechen nicht dem Format 'DD.MM.YYYY bis DD.MM.YYYY'.");
        return false;
    }
    var date1 = date.val().split(" bis ")[0];
    var date2 = date.val().split(" bis ")[1];
    var fromArray = date1.split(".");
    var from = new Date(fromArray[2], fromArray[1], fromArray[0]);
    var toArray = date2.split(".");
    var to = new Date(toArray[2], toArray[1], toArray[0]);

    if (from.getTime() > to.getTime()) {
        submit.prop("disabled", true);
        error.html("Das <span class='errorText'>An</span>reisedatum kann nicht nach dem <span class='errorText'>Ab</span>reisedatum liegen.");
        return false;
    }

    var diff = new Date(to - from) / 1000 / 3600 / 24;
    if (diff >= 21) {
        submit.prop("disabled", true);
        error.html("Sie können <span class='errorText'>maximal 21 Tage</span> auf einmal buchen.");
        return false;
    }
    submit.prop("disabled", false);
    error.html("");
    return true;
}

function checkBookingPayment() {
    var submit = $("#bookingSubmit");
    var error = $("#bookingError");
    var payment = $("#bookingPayment");

    if (!payment.val() || payment.val() == 0) {
        submit.prop("disabled", true);
        error.html("Bitte füllen Sie alle mit einem (<span class=\"mandatory\">*</span>) markierten Felder aus.");
        return false;
    }

    submit.prop("disabled", false);
    error.html("");
    return true;
}