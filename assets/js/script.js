/**
 * Created by Kiki on 09/11/2018.
 */

let restos;

function openNav() {
    document.getElementById("mySidenav").style.width = "300px";
    $('span').hide();
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    setTimeout("$('span').show();", 400);
    if($("section.about").css('display') == "block"){
        $("span").css({"color": "white"})
    } else {
        $("span").css({"color": "black"})
    }
}

function showSection() {
    let myClass = $(this).attr("class");

    if(myClass !== "closebtn"){
        $("section").hide();
        $("section."+ myClass).show();
        closeNav();
    }
}

function goTo(e) {
    e.preventDefault();
    console.log($(this).val() === "LOGIN");
    console.log($('#u-email').val() === 'kiki@howest.be');
    console.log($('input[name="email"]').val());
    if($(this).val() === "LOGIN" && $('input[name="email"]').val() === 'kiki@howest.be'){
        window.location.href = "/CityHacks/particulier.html"
    } else {
        window.location.href = "/CityHacks/resto.html"
    }
}

let scroll = function() {
    if($("section.home").css('display') == "block" && $(window).scrollTop() + $(window).height() == $(document).height()) {
        $('span').css({'color': 'white'})
    } else {
        if($("section.home").css('display') == "block")
        $('span').css({'color': 'black'})
    }
};

let showResto = function() {
    let i = 0;
    let j = 0;
    while (i < 5) {
        if (restos[j].Branche.substr(11) == "Restaurant") {
            let url = '/CityHacks/assets/images/resto/' + restos[j].Naam.replace(/\s+/g, '-').replace("'", "") + '.jpg';
            $("#id01").append("<div style='background-image: url(" + url + ")'><li><h4>" + restos[j].Naam +"</h4><p>" + restos[j].Postcode + " " + restos[j].Gemeente + ", " + restos[j].Straat + " " + restos[j].HuisNr + "</p></li></div>");
            i++;
        }
        j++;
    }
};

let showDish = function () {
    $("section").hide();
    $(".dish").show();
};

let add = function (e) {
    e.preventDefault();
    var x = document.getElementById("snackbar");
    x.className = "show alert alert-success";
    setTimeout(function(){ x.className = x.className.replace("show alert alert-success", "alert alert-success"); }, 3000);
};

let showCart = function () {
    $("section").hide();
    $(".cart").show();
};

let order = function (e) {
    e.preventDefault();
    $('.cart tr:last-child').hide();
    var x = document.getElementById("snackbar2");
    x.className = "show alert alert-success";
    setTimeout(function(){ x.className = x.className.replace("show alert alert-success", "alert alert-success"); }, 3000);
    $(".cart input[type='submit']").attr("disabled", true);
};

let addDishCart = function (e) {
    e.preventDefault();
    $('.products .black').append('<div class="dishCard">\n' +
        '                    <label>Naam gerecht</label>\n' +
        '                    <input type="text" value="" class="form-control">\n' +
        '                    <label>Ingrediënten</label>\n' +
        '                    <textarea class="form-control"></textarea>\n' +
        '                    <div class="flexbox">\n' +
        '                        <div>\n' +
        '                            <label>Prijs</label>\n' +
        '                            <input type="text" value="€0,00" class="form-control">\n' +
        '                        </div>\n' +
        '                        <div>\n' +
        '                            <label>Aantal</label>\n' +
        '                            <input type="number" min="1" value="1" class="form-control">\n' +
        '                        </div>\n' +
        '                    </div>\n' +
        '                    <input type="submit" class="form-control" value="Toevoegen">\n' +
        '                </div>')
};

let confirm = function () {
    $('.restOrder tr:last-child').hide();
};

let inschr = function () {
    if($(this).val() == 'rest'){
        $('#btw').show();
        $('input[name="btw"]').show();
    }else {
        $('#btw').hide();
        $('input[name="btw"]').hide();
    }

};

$(document).ready(function () {
    $('.sidenav a').on('click', showSection);
    $(".dishCard input[type='submit']").on('click', add);
    $(".login input[type='submit']").on('click', goTo);
    $(window).scroll(scroll);
    $("#id01").on('click', 'li', showDish);
    $(".dish .btn-warning").on('click', showCart);
    $(".products .btn-warning").on('click', addDishCart);
    $(".cart input[type='submit']").on('click', order);
    $(".restOrder input").on('click', confirm);
    $("input[type='radio']").on('change', inschr);


    $.getJSON( "assets/data/horeca.json", function( list ) {
        restos = list;
        showResto();
    });
});