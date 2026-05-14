var cellak = document.querySelectorAll('.cella');
var felirat = document.getElementById('allapot-szoveg');
var eredmenyPanel = document.getElementById('eredmeny-ablak');
var inditoPanel = document.getElementById('indito-ablak');

var kiJonEppen = "X";
var tablaAllapota = ["", "", "", "", "", "", "", "", ""];
var tartAJatek = true;
var pontok = { X: 0, O: 0 };
var nyeroKombinaciok = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];
function kattintasACellara(esemeny) {
    var cella = esemeny.target;
    var index = cella.getAttribute('data-index');

    if (tablaAllapota[index] !== "" || tartAJatek === false) {
        return;
    }

    tablaAllapota[index] = kiJonEppen;
    cella.innerText = kiJonEppen;
    cella.classList.add(kiJonEppen.toLowerCase());

    ellenorizdAGyozelmet();
}
function ellenorizdAGyozelmet() {
    var gyozelem = false;

    for (var i = 0; i < nyeroKombinaciok.length; i++) {
        var komb = nyeroKombinaciok[i];
        var a = tablaAllapota[komb[0]];
        var b = tablaAllapota[komb[1]];
        var c = tablaAllapota[komb[2]];

        if (a !== "" && a === b && a === c) {
            gyozelem = true;
            break;
        }
    }

    if (gyozelem) {
        tartAJatek = false;
        pontok[kiJonEppen]++;
        pontokMentese();
        jatekVegeUzenet(kiJonEppen + " NYERT!");
    } else if (!tablaAllapota.includes("")) {
        jatekVegeUzenet("DÖNTETLEN!");
        tartAJatek = false;
    } else {
        kiJonEppen = (kiJonEppen === "X") ? "O" : "X";
        felirat.innerText = kiJonEppen + " jön!";
    }
}
function mindentAlaphelyzetbe() {
    kiJonEppen = "X";
    tablaAllapota = ["", "", "", "", "", "", "", "", ""];
    tartAJatek = true;
    felirat.innerText = "X jön!";
    eredmenyPanel.style.display = 'none';
    
    for (var i = 0; i < cellak.length; i++) {
        cellak[i].innerText = "";
        cellak[i].classList.remove('x', 'o');
    }
}
function pontokMentese() {
    localStorage.setItem('amobaPontok', JSON.stringify(pontok));
    document.getElementById('x-pontszam').innerText = pontok.X;
    document.getElementById('o-pontszam').innerText = pontok.O;
}

function jatekVegeUzenet(szoveg) {
    document.getElementById('gyoztes-uzenet-szoveg').innerText = szoveg;
    eredmenyPanel.style.display = 'flex';
}
window.onload = function() {
    var mentettAdat = localStorage.getItem('amobaPontok');
    if (mentettAdat) {
        pontok = JSON.parse(mentettAdat);
        document.getElementById('mentes-info').innerText = "Eddigi állás -> X: " + pontok.X + " | O: " + pontok.O;
        inditoPanel.style.display = 'flex';
    }
    pontokMentese();
};
