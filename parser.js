var needle = require("needle");
var cheerio = require("cheerio");
var async = require("async");
const fs = require("fs");
var path = require('path');
var appDir = path.dirname(require.main.filename);
const https = require('https');


var urlList = ["https://trend-spb.ru/object/red_village", "https://trend-spb.ru/object/zeleny-kvartal", "https://trend-spb.ru/object/tri_kita", "https://trend-spb.ru/object/new_time", "https://trend-spb.ru/object/yoga", "https://trend-spb.ru/object/zolotie_kupola", "https://trend-spb.ru/object/dom_na_lvovskoy", "https://trend-spb.ru/object/valo", "https://trend-spb.ru/object/gavankapitanov", "https://trend-spb.ru/object/solnechniy_gorod", "https://trend-spb.ru/object/id_murino", "https://trend-spb.ru/object/murino_2017-2020", "https://trend-spb.ru/object/murinskiy_posad", "https://trend-spb.ru/object/parklend", "https://trend-spb.ru/object/assorti", "https://trend-spb.ru/object/fortecya", "https://trend-spb.ru/object/enfild", "https://trend-spb.ru/object/ozerniy_dom", "https://trend-spb.ru/object/grafskaya_sloboda", "https://trend-spb.ru/object/novoe_murino", "https://trend-spb.ru/object/zoom-apart", "https://trend-spb.ru/object/severniy", "https://trend-spb.ru/object/84_visota", "https://trend-spb.ru/object/shuvalovskiy_duet", "https://trend-spb.ru/object/yutteri", "https://trend-spb.ru/object/trend-141-5", "https://trend-spb.ru/object/kleni", "https://trend-spb.ru/object/novie_gorizonti", "https://trend-spb.ru/object/trend-141-1", "https://trend-spb.ru/object/chistoe_nebo", "https://trend-spb.ru/object/orlovskiy-park", "https://trend-spb.ru/object/kudrovo", "https://trend-spb.ru/object/astrid", "https://trend-spb.ru/object/noviy_okkervily", "https://trend-spb.ru/object/vernisazh", "https://trend-spb.ru/object/in2it", "https://trend-spb.ru/object/prinevskiy", "https://trend-spb.ru/object/petr_i_ekaterina_velikaja", "https://trend-spb.ru/object/novoe_yanino", "https://trend-spb.ru/object/greenlandiya_2", "https://trend-spb.ru/object/id-kudrovo", "https://trend-spb.ru/object/obrazcovyy_kvartal_5", "https://trend-spb.ru/object/kontinenty", "https://trend-spb.ru/object/wings", "https://trend-spb.ru/object/zvezdy-stolic", "https://trend-spb.ru/object/triumf_park", "https://trend-spb.ru/object/svetlanovskiy", "https://trend-spb.ru/object/nevskie_parusa", "https://trend-spb.ru/object/dvestolici", "https://trend-spb.ru/object/4you", "https://trend-spb.ru/object/salut", "https://trend-spb.ru/object/like", "https://trend-spb.ru/object/jaanila_country", "https://trend-spb.ru/object/otrazhenie", "https://trend-spb.ru/object/ekspograd3", "https://trend-spb.ru/object/artline", "https://trend-spb.ru/object/pulse", "https://trend-spb.ru/object/staraya_kreposty", "https://trend-spb.ru/object/cds_moskovskiy", "https://trend-spb.ru/object/dom-na-korallovskoy", "https://trend-spb.ru/object/polis_na_neve", "https://trend-spb.ru/object/gorki_park", "https://trend-spb.ru/object/zhili_bili", "https://trend-spb.ru/object/bogatiry_3", "https://trend-spb.ru/object/komendantskiy", "https://trend-spb.ru/object/polisnamoskovckoi", "https://trend-spb.ru/object/primorsky_kvartal", "https://trend-spb.ru/object/pervomayskiy", "https://trend-spb.ru/object/solncepark", "https://trend-spb.ru/object/murinskie_visoti", "https://trend-spb.ru/object/london", "https://trend-spb.ru/object/marshal", "https://trend-spb.ru/object/graffiti", "https://trend-spb.ru/object/ohtahaus", "https://trend-spb.ru/object/lastochka", "https://trend-spb.ru/object/terra", "https://trend-spb.ru/object/vesna_3", "https://trend-spb.ru/object/ecocity", "https://trend-spb.ru/object/cdspolustrovo", "https://trend-spb.ru/object/lastochkino_gnezdo", "https://trend-spb.ru/object/greenlandiya", "https://trend-spb.ru/object/dom_u_karetnogo_mosta", "https://trend-spb.ru/object/evropeyskiy", "https://trend-spb.ru/object/ariosto", "https://trend-spb.ru/object/morskaya_zvezda", "https://trend-spb.ru/object/trilogiya", "https://trend-spb.ru/object/ohtinskaya_duga", "https://trend-spb.ru/object/newpiter", "https://trend-spb.ru/object/golfstrim", "https://trend-spb.ru/object/strizhi", "https://trend-spb.ru/object/tarmo", "https://trend-spb.ru/object/pargolovo_26", "https://trend-spb.ru/object/ultra_city", "https://trend-spb.ru/object/grona_lund", "https://trend-spb.ru/object/london_park", "https://trend-spb.ru/object/polyustrovo_park", "https://trend-spb.ru/object/youpiter", "https://trend-spb.ru/object/unost", "https://trend-spb.ru/object/pushkinskiy", "https://trend-spb.ru/object/dalnevostochnyy-15", "https://trend-spb.ru/object/philosophia", "https://trend-spb.ru/object/moy_gorod", "https://trend-spb.ru/object/kapital", "https://trend-spb.ru/object/sirius", "https://trend-spb.ru/object/kirill_i_daryya", "https://trend-spb.ru/object/balkani", "https://trend-spb.ru/object/ropshinskii_kvartal", "https://trend-spb.ru/object/nautilus", "https://trend-spb.ru/object/emerald", "https://trend-spb.ru/object/status", "https://trend-spb.ru/object/lahta_park", "https://trend-spb.ru/object/suvorov", "https://trend-spb.ru/object/polkovodec", "https://trend-spb.ru/object/arhitektor", "https://trend-spb.ru/object/docklands", "https://trend-spb.ru/object/devyatiy_val", "https://trend-spb.ru/object/plyazh", "https://trend-spb.ru/object/vesna_2", "https://trend-spb.ru/object/piter", "https://trend-spb.ru/object/vertical_we_and_i", "https://trend-spb.ru/object/zhemchuzhnyy-kaskad", "https://trend-spb.ru/object/elozarovsiy", "https://trend-spb.ru/object/magnifika", "https://trend-spb.ru/object/shuvalovskiy_nordest", "https://trend-spb.ru/object/oblaka_na_lesnoj", "https://trend-spb.ru/object/obrazcovyy_kvartal_4", "https://trend-spb.ru/object/vesna", "https://trend-spb.ru/object/dom_na_blyuhera", "https://trend-spb.ru/object/zhemchuzhnaya-gavan", "https://trend-spb.ru/object/dom_u_razliva", "https://trend-spb.ru/object/etalon_na_neve", "https://trend-spb.ru/object/avstriyskiy_kvartal", "https://trend-spb.ru/object/artkvartal", "https://trend-spb.ru/object/moreokean", "https://trend-spb.ru/object/novoe-kupchino", "https://trend-spb.ru/object/legenda_na_komendantskom", "https://trend-spb.ru/object/neoklassika", "https://trend-spb.ru/object/monodom-na-malom", "https://trend-spb.ru/object/moskva", "https://trend-spb.ru/object/studio-moskovsky", "https://trend-spb.ru/object/flamingo", "https://trend-spb.ru/object/rechnoy", "https://trend-spb.ru/object/m97", "https://trend-spb.ru/object/obrazcovyy_kvartal_3", "https://trend-spb.ru/object/aist", "https://trend-spb.ru/object/nobelius", "https://trend-spb.ru/object/zima_leto", "https://trend-spb.ru/object/g9", "https://trend-spb.ru/object/legenda_geroev", "https://trend-spb.ru/object/life_lesnaya", "https://trend-spb.ru/object/prityazhenie", "https://trend-spb.ru/object/kosmosstar", "https://trend-spb.ru/object/dom_na_obruchevih", "https://trend-spb.ru/object/idealist", "https://trend-spb.ru/object/panorami_zaliva", "https://trend-spb.ru/object/galaktika_smu", "https://trend-spb.ru/object/novyy-lessner", "https://trend-spb.ru/object/landishi", "https://trend-spb.ru/object/kudrov_haus", "https://trend-spb.ru/object/zhemchuzhnyy-bereg", "https://trend-spb.ru/object/green_city", "https://trend-spb.ru/object/yes_marata", "https://trend-spb.ru/object/master_na_serebristom", "https://trend-spb.ru/object/kantemirovskiy", "https://trend-spb.ru/object/dyuna", "https://trend-spb.ru/object/next", "https://trend-spb.ru/object/medalist", "https://trend-spb.ru/object/kollontay_2", "https://trend-spb.ru/object/dom_na_naberezhnoy", "https://trend-spb.ru/object/malaya_ohta", "https://trend-spb.ru/object/renessans", "https://trend-spb.ru/object/palatsio", "https://trend-spb.ru/object/svetlana-park", "https://trend-spb.ru/object/ekaterininskiy", "https://trend-spb.ru/object/kapitan_nemo", "https://trend-spb.ru/object/kristall_polyustrovo", "https://trend-spb.ru/object/listvenniy", "https://trend-spb.ru/object/zvezdniy", "https://trend-spb.ru/object/elagin_apart", "https://trend-spb.ru/object/iva-dom", "https://trend-spb.ru/object/graf_orlov", "https://trend-spb.ru/object/linkor", "https://trend-spb.ru/object/life", "https://trend-spb.ru/object/leningrad", "https://trend-spb.ru/object/zolotaya_dolina", "https://trend-spb.ru/object/zhemchuzhniy_fregat", "https://trend-spb.ru/object/galaktika_premium", "https://trend-spb.ru/object/leninskij_park", "https://trend-spb.ru/object/dom_na_kosmonavtov", "https://trend-spb.ru/object/legenda_na_dalynevostochnom_12", "https://trend-spb.ru/object/stereos", "https://trend-spb.ru/object/neva_neva", "https://trend-spb.ru/object/russkie_sezony", "https://trend-spb.ru/object/noviy_ligovskiy", "https://trend-spb.ru/object/skladskaya_5_i_soyuzniy_10", "https://trend-spb.ru/object/krilya", "https://trend-spb.ru/object/pyaty_zvezd", "https://trend-spb.ru/object/samotsveti", "https://trend-spb.ru/object/molodezhniy", "https://trend-spb.ru/object/duderhof_club", "https://trend-spb.ru/object/kremlevskie_zvezdi", "https://trend-spb.ru/object/premyer_palas", "https://trend-spb.ru/object/riverside", "https://trend-spb.ru/object/solnechniy", "https://trend-spb.ru/object/ekspograd", "https://trend-spb.ru/object/artstudio", "https://trend-spb.ru/object/petrovskiy_park", "https://trend-spb.ru/object/mistola_hills", "https://trend-spb.ru/object/dom_u_elagina_ostrova", "https://trend-spb.ru/object/nebo_moskvi", "https://trend-spb.ru/object/arthaus", "https://trend-spb.ru/object/pulkovskiy", "https://trend-spb.ru/object/grani", "https://trend-spb.ru/object/skandi_club", "https://trend-spb.ru/object/botanica", "https://trend-spb.ru/object/fusion", "https://trend-spb.ru/object/nyyu_ton", "https://trend-spb.ru/object/obrazcovyy_kvartal_2", "https://trend-spb.ru/object/yaroslavskiy_27", "https://trend-spb.ru/object/the-one", "https://trend-spb.ru/object/familia", "https://trend-spb.ru/object/tsarskaya_stolitsa", "https://trend-spb.ru/object/novye_kvartaly_petergofa", "https://trend-spb.ru/object/pushkin_house", "https://trend-spb.ru/object/petrovskaya_rivyera", "https://trend-spb.ru/object/avatar", "https://trend-spb.ru/object/yes_residence", "https://trend-spb.ru/object/aviator", "https://trend-spb.ru/object/bolkonskiy", "https://trend-spb.ru/object/dva_angela",
    "https://trend-spb.ru/object/bogatiry_2", "https://trend-spb.ru/object/optikov_34", "https://trend-spb.ru/object/yaroslavskiy_23", "https://trend-spb.ru/object/petrovskaya_dominanta", "https://trend-spb.ru/object/ostrov", "https://trend-spb.ru/object/monopolist", "https://trend-spb.ru/object/dom_u_nevskogo", "https://trend-spb.ru/object/legenda-moskovskiy-65", "https://trend-spb.ru/object/royal_park", "https://trend-spb.ru/object/zolotoe_vremya", "https://trend-spb.ru/object/biografiya", "https://trend-spb.ru/object/look", "https://trend-spb.ru/object/loft_na_srednem", "https://trend-spb.ru/object/pervaya_linia", "https://trend-spb.ru/object/vasilyevskiy_o_v_24_liniya", "https://trend-spb.ru/object/dom_na_nizhne_kamenskoy", "https://trend-spb.ru/object/futurist", "https://trend-spb.ru/object/malenkaya-franciya", "https://trend-spb.ru/object/stockholm", "https://trend-spb.ru/object/moskovskie_vorota", "https://trend-spb.ru/object/dom_na_kirochnoy", "https://trend-spb.ru/object/institutskiy-16", "https://trend-spb.ru/object/dom_u_ratushi", "https://trend-spb.ru/object/sosnovka", "https://trend-spb.ru/object/time", "https://trend-spb.ru/object/sobranie", "https://trend-spb.ru/object/diplomat", "https://trend-spb.ru/object/mirozdanie", "https://trend-spb.ru/object/sadvremeni", "https://trend-spb.ru/object/nikolaevski_ansambl", "https://trend-spb.ru/object/esper_club", "https://trend-spb.ru/object/the_residence", "https://trend-spb.ru/object/trend-141-7", "https://trend-spb.ru/object/imperial", "https://trend-spb.ru/object/trend-141-6", "https://trend-spb.ru/object/ozernyy-kray", "https://trend-spb.ru/object/chetire_gorizonta", "https://trend-spb.ru/object/nebo", "https://trend-spb.ru/object/privilegia", "https://trend-spb.ru/object/trend-141-8", "https://trend-spb.ru/object/poema_u_treh_ozer", "https://trend-spb.ru/object/trend-141-3", "https://trend-spb.ru/object/dve_epohi", "https://trend-spb.ru/object/land", "https://trend-spb.ru/object/vremena_goda", "https://trend-spb.ru/object/galant", "https://trend-spb.ru/object/zolotoy_vek", "https://trend-spb.ru/object/mozaika", "https://trend-spb.ru/object/parkoviy", "https://trend-spb.ru/object/kima_1", "https://trend-spb.ru/object/klassika", "https://trend-spb.ru/object/dudergofskaya_liniya_3", "https://trend-spb.ru/object/toyve", "https://trend-spb.ru/object/kosmos", "https://trend-spb.ru/object/aleksandrit", "https://trend-spb.ru/object/tsarskiy_dvor", "https://trend-spb.ru/object/piterskiy_11", "https://trend-spb.ru/object/devyatkino", "https://trend-spb.ru/object/orbita", "https://trend-spb.ru/object/lunacharskogo_40", "https://trend-spb.ru/object/krestovskiy_de_lux", "https://trend-spb.ru/object/podkova", "https://trend-spb.ru/object/yantarniy_bereg", "https://trend-spb.ru/object/dom_na_kievskoy", "https://trend-spb.ru/object/severnie_visoti", "https://trend-spb.ru/object/zemlyanichnaya_polyana", "https://trend-spb.ru/object/solnechniy_kvartet_2", "https://trend-spb.ru/object/pobedi_5", "https://trend-spb.ru/object/amazonka", "https://trend-spb.ru/object/vanino"
];

// for (i = 0; i < data.length; i++) {
//     let url = "https://trend-spb.ru/object/" + data[i]["guid"];
//     urlList.push(url);
// }

var json = JSON.stringify(urlList);

fs.writeFile('urlList.json', json, 'utf8', function () {
    console.log("yo!")
});

var counter = urlList.length;


var q = async.queue(function (url) {
    needle.get(url, function (err, res) {
        if (err) throw (err);

        var $ = cheerio.load(res.body);

        table = $(".prices__table").html();
        fs.writeFile('table.html', table, 'utf8', function () {
            // console.log(table)
        });
        img = $(".owl-thumb__img");

        img.each(function (i, val) {
            console.log($(val).attr("src"));
        });

    });
}, 1);



var i = 0;
while (urlList.length > i) {
    q.push(urlList[i]);
    i++;
}

// function getContent (url) {
//     needle.get(url, function (err, res) {
//         if (err) throw (err);

//         var $ = cheerio.load(res.body);

//         table = $(".prices__table").html();
//         fs.writeFile('table.html', table, 'utf8', function () {
//             // console.log(table)
//         });
//         img = $(".owl-thumb__img");

//         img.each(function(i,val){
//             console.log($(val).attr("src"));
//             });

//     });
// };



// var i = 0;
// while (10 > i) {
//     getContent(urlList[i]);
//     i++;
// }


console.log(q)


const file = fs.createWriteStream(appDir + "/img/" + "l_bc0bfee4e1ab648173275d17d4d9c537.jpg");
const request = https.get('https://static.trendagent.ru/images/wn/vz/l_bc0bfee4e1ab648173275d17d4d9c537.jpg', function (response) {
    response.pipe(file);
});