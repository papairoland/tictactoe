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
