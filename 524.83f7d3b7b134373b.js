"use strict";(self.webpackChunklmc_ui=self.webpackChunklmc_ui||[]).push([[524],{6915:(b,c,t)=>{t.d(c,{P:()=>v});var m=t(7025),e=t(5312),o=t(3224),E=t(7673),p=t(6354),h=t(6697),f=t(4438);let v=(()=>{var l;class _ extends m.${constructor(){super(...arguments),this.resource="courses",this.getLibrary=()=>this.lessons?(0,E.of)(this.lessons):this.getAll({notifyOnSuccess:!1,notifyOnError:!1}).pipe((0,p.T)(this.updateLocalLessons)),this.setCurrentLesson=a=>this.partialUpdate(null,null,{path:"currentLesson",params:{index:a},notifyOnSuccess:!1}),this.getPdf=a=>this.http.get([e.c.root_url,"courses",a].join("/"),{responseType:"arraybuffer"}),this.downloadPdf=a=>this.http.get([e.c.root_url,"courses",a,"download"].join("/"),{responseType:"arraybuffer"}).pipe((0,h.s)(1)).subscribe(i=>(0,o.OJ)(i,a)),this.downloadCourse=a=>this.http.get([e.c.root_url,"courses",a,"download"].join("/"),{responseType:"blob"}).subscribe(i=>(0,o.OJ)(i,(a+1).toString(),"zip")),this.updateLocalLessons=a=>{const i=a.value;return this.lessons=i,i}}}return(l=_).\u0275fac=(()=>{let d;return function(i){return(d||(d=f.xGo(l)))(i||l)}})(),l.\u0275prov=f.jDH({token:l,factory:l.\u0275fac}),_})()},2524:(b,c,t)=>{t.r(c),t.d(c,{MethodPage:()=>k});var m=t(177),e=t(4438),o=t(4069),E=t(6915);const p=s=>({color:s});function h(s,u){1&s&&(e.j41(0,"th",29),e.EFF(1," Semaine / Le\xe7on "),e.k0s())}function f(s,u){if(1&s&&(e.j41(0,"td",30),e.EFF(1),e.k0s()),2&s){const n=u.$implicit;e.Aen(e.eq3(3,p,n.color)),e.R7$(),e.SpI(" ",n.order+1," ")}}function v(s,u){1&s&&(e.j41(0,"th",29),e.EFF(1," Graph\xe8me(s) "),e.k0s())}function l(s,u){1&s&&(e.j41(0,"span"),e.EFF(1,"-"),e.k0s())}function _(s,u){if(1&s&&(e.j41(0,"span",34),e.EFF(1),e.k0s()),2&s){const n=u.$implicit;e.R7$(),e.SpI(" [",n,"] ")}}function d(s,u){1&s&&e.Z7z(0,_,2,1,"span",34,e.fX1),2&s&&e.Dyx(u)}function a(s,u){if(1&s&&(e.j41(0,"span",33),e.EFF(1),e.k0s()),2&s){const n=e.XpG().$implicit;e.R7$(),e.SpI(" (",n.info,") ")}}function i(s,u){if(1&s&&(e.j41(0,"span",32),e.DNE(1,l,2,0,"span"),e.EFF(2),e.nI1(3,"uppercase"),e.DNE(4,d,2,0)(5,a,2,1,"span",33),e.k0s()),2&s){let n;const r=u.$implicit;e.R7$(),e.vxM(1,r.endOfWord?1:-1),e.R7$(),e.SpI(" ",e.bMT(3,4,r.name)," "),e.R7$(2),e.vxM(4,(n=r.sounds)?4:-1,n),e.R7$(),e.vxM(5,r.info?5:-1)}}function j(s,u){if(1&s&&(e.j41(0,"td",31),e.Z7z(1,i,6,6,"span",32,e.fX1),e.k0s()),2&s){const n=u.$implicit;e.Aen(e.eq3(2,p,n.color)),e.R7$(),e.Dyx(n.phonemes)}}function q(s,u){1&s&&e.nrm(0,"tr",35)}function x(s,u){1&s&&e.nrm(0,"tr",36)}function C(s,u){if(1&s&&(e.j41(0,"table",20),e.qex(1,22),e.DNE(2,h,2,0,"th",23)(3,f,2,5,"td",24),e.bVm(),e.qex(4,25),e.DNE(5,v,2,0,"th",23)(6,j,3,4,"td",26),e.bVm(),e.DNE(7,q,1,0,"tr",27)(8,x,1,0,"tr",28),e.k0s()),2&s){const n=e.XpG();e.Y8G("dataSource",u),e.R7$(7),e.Y8G("matHeaderRowDef",n.displayedColumns),e.R7$(),e.Y8G("matRowDefColumns",n.displayedColumns)}}let k=(()=>{var s;class u{constructor(){this.class="block",this.lessons$=(0,e.WQX)(E.P).getLibrary(),this.displayedColumns=["index","name"]}}return(s=u).\u0275fac=function(r){return new(r||s)},s.\u0275cmp=e.VBU({type:s,selectors:[["ng-component"]],hostVars:2,hostBindings:function(r,F){2&r&&e.HbH(F.class)},standalone:!0,features:[e.Jv_([E.P]),e.aNF],decls:124,vars:3,consts:[[1,"bg-yellow-light"],[1,"mx-auto","px-16","pt-4","pb-3","max-w-5xl"],["src","https://raw.githubusercontent.com/louiiuol/la-methode-claire/main/src/assets/img/illustrations/method-intro.png","alt","illustration d'introduction de la m\xe9thode",1,"mx-auto","mb-24","w-full","max-w-xl"],[1,"content"],[1,"relative"],[1,"block","top-2","-left-12","absolute","rounded-full","w-6","h-6",2,"background-color","#ac981a"],[1,"flex-1","!mt-0"],[1,"block","top-2","-left-12","absolute","rounded-full","w-6","h-6",2,"background-color","#fcdac6"],[1,"block","top-2","-left-12","absolute","rounded-full","w-6","h-6",2,"background-color","#ef7e64"],[1,"mt-4"],[1,"block","top-2","-left-12","absolute","rounded-full","w-6","h-6",2,"background-color","#b2ced8"],[1,"my-6"],[1,"flex","flex-wrap","justify-between","gap-12","my-24","px-9"],["src","https://raw.githubusercontent.com/louiiuol/la-methode-claire/main/src/assets/img/illustrations/method-obstacles.png","alt","illustration des obstacles",1,"mx-auto","w-64"],["src","https://raw.githubusercontent.com/louiiuol/la-methode-claire/main/src/assets/img/illustrations/method-digrame.png","alt","illustration d'un digrame",1,"mx-auto","w-64"],[1,"flex-1"],[1,"!mt-0"],[1,"block","top-2","-left-12","absolute","rounded-full","w-6","h-6",2,"background-color","#ef7f96"],[1,"mt-24"],["src","https://raw.githubusercontent.com/louiiuol/la-methode-claire/main/src/assets/img/illustrations/method-content.png","alt","Illustration du contenu de la M\xe9thode",1,"mx-auto","w-full","max-w-2xl"],["mat-table","","aria-describedby","Tableau des le\xe7ons de la m\xe9thode",1,"mx-auto","mb-9","w-fit","!min-w-fit",3,"dataSource"],[1,"my-3","font-bold"],["matColumnDef","index"],["mat-header-cell","","class","font-bold",4,"matHeaderCellDef"],["mat-cell","","class","font-bold !text-center",3,"style",4,"matCellDef"],["matColumnDef","name"],["mat-cell","","class","text-lg",3,"style",4,"matCellDef"],["mat-header-row","",4,"matHeaderRowDef"],["mat-row","",4,"matRowDef","matRowDefColumns"],["mat-header-cell","",1,"font-bold"],["mat-cell","",1,"font-bold","!text-center"],["mat-cell","",1,"text-lg"],[1,"px-2"],[1,"pl-1","text-sm"],[1,"px-1","text-xs"],["mat-header-row",""],["mat-row",""]],template:function(r,F){if(1&r&&(e.j41(0,"section",0)(1,"div",1),e.nrm(2,"img",2),e.j41(3,"div",3)(4,"h2"),e.EFF(5,"La m\xe9thode: ses fondations"),e.k0s(),e.j41(6,"div",4),e.nrm(7,"span",5),e.j41(8,"p",6),e.EFF(9," S\u2019appliquer \xe0 rendre les enfants conscients de tout ce qu\u2019ils savent d\xe9j\xe0 faire. L\u2019immense majorit\xe9 des enfants qui arrivent au CP portent d\xe9j\xe0 en eux l\u2019essentiel des comp\xe9tences n\xe9cessaires \xe0 leur entr\xe9e dans l\u2019\xe9crit puisqu\u2019ils parlent et raisonnent. Apprendre \xe0 lire \xe0 des enfants a donc tout int\xe9r\xeat \xe0 commencer par leur faire prendre conscience de ce qu\u2019ils savent d\xe9j\xe0 et \xe0 leur apprendre \xe0 l\u2019utiliser. "),e.k0s()(),e.j41(10,"div",4),e.nrm(11,"span",7),e.j41(12,"p",6),e.EFF(13," Donner aux obstacles que tout enfant rencontre quand il apprend \xe0 lire et \xe0 \xe9crire une place de choix. Omettre de parler d\u2019obstacles \xe0 un enfant qui apprend \xe0 lire, c\u2019est prendre le risque qu\u2019\xe0 la premi\xe8re difficult\xe9 rencontr\xe9e il se convainque qu\u2019il est b\xeate. "),e.k0s()(),e.j41(14,"div",4),e.nrm(15,"span",8),e.j41(16,"p",6),e.EFF(17," Apprendre aux enfants \xe0 m\xe9moriser ce qu\u2019ils ont appris. Car m\xe9moriser s\u2019apprend. Apprenons-leur. M\xe9moriser commence par aller r\xe9cup\xe9rer en m\xe9moire ce que l\u2019on a appris \u2192 on en fait un rituel : quinze minutes tous les jours, de la deuxi\xe8me semaine de l\u2019ann\xe9e scolaire \xe0 la derni\xe8re \u2013 et ce n\u2019est pas une formule. "),e.j41(18,"strong",9),e.EFF(19," C\u2019est une condition sine qua non pour les embarquer tous. "),e.k0s()()(),e.j41(20,"div",4),e.nrm(21,"span",10),e.j41(22,"p",6),e.EFF(23," Rendre concret pour les enfants qu\u2019apprendre \xe0 lire et \xe0 \xe9crire ne se fait pas en un jour et que c\u2019est tous les jours que l\u2019on progresse un peu. Cette lettre qu\u2019ils avaient du mal \xe0 retenir avant-hier et hier, ils la connaissent aujourd\u2019hui. Et la conna\xeetront encore demain. Et si apr\xe8s-demain ils l\u2019avaient oubli\xe9e, ce qui est tout \xe0 fait possible car c\u2019est ainsi que la m\xe9moire fonctionne, on leur rappellera qu\u2019avant-hier ils la connaissaient et qu\u2019il n\u2019y a pas de raison que ce qu\u2019ils sont parvenus \xe0 m\xe9moriser une fois ils ne le m\xe9morisent de nouveau. Et de fa\xe7on plus s\xfbre \xe0 chaque fois. Il faut que nos \xe9l\xe8ves aient pleinement conscience de ce qu\u2019ils sont en train d\u2019apprendre. Et pour cela, rien de mieux que de leur dire ! Mais pour leur dire il faut le "),e.j41(24,"strong"),e.EFF(25,"VOIR"),e.k0s(),e.EFF(26,". Et c\u2019est cela que cette m\xe9thode vise \xe0 faire na\xeetre chez nous enseignant ou parent : une aptitude \xe0 voir ce que, par exc\xe8s de familiarit\xe9 avec la langue \xe9crite, nous ne voyons plus. Car c\u2019est cela qui va aider les plus fragiles \xe0 sortir du sentiment qu\u2019ils n\u2019ont pas de pouvoir sur leurs apprentissages : leur faire "),e.j41(27,"strong"),e.EFF(28,"exp\xe9rimenter et donc prendre conscience"),e.k0s(),e.EFF(29," de l\u2019inverse. "),e.k0s()(),e.j41(30,"p",11),e.EFF(31," La complexit\xe9 n\u2019est pas l\xe0 o\xf9 l\u2019on pourrait penser qu\u2019elle est. Ce qui est complexe, c\u2019est de r\xe9ussir \xe0 voir en quoi des notions que nous avons, nous, adultes lettr\xe9s, totalement automatis\xe9es, posent des difficult\xe9s \xe0 tant d\u2019enfants. Ce qui est le plus compliqu\xe9 c\u2019est d\u2019avoir un regard neuf sur des principes que nous avons tellement automatis\xe9s que nous ne voyons m\xeame pas ce qu\u2019il peut y avoir \xe0 expliquer. "),e.k0s(),e.j41(32,"div",12),e.nrm(33,"img",13)(34,"img",14),e.k0s(),e.j41(35,"h2"),e.EFF(36," La m\xe9thode : son fonctionnement "),e.nrm(37,"br"),e.EFF(38," Rendre les choses simples\u2026 sans les simplifier "),e.k0s(),e.j41(39,"div",4),e.nrm(40,"span",7),e.j41(41,"div",15)(42,"p",16),e.EFF(43," Une premi\xe8re semaine lors de laquelle on apprend trois choses fondamentales \xe0 nos \xe9l\xe8ves: "),e.k0s(),e.j41(44,"ul")(45,"li"),e.EFF(46," - qu\u2019ils poss\xe8dent d\xe9j\xe0 la comp\xe9tence essentielle \xe0 leur entr\xe9e dans l\u2019\xe9crit: la capacit\xe9 \xe0 fusionner deux sons ; "),e.k0s(),e.j41(47,"li"),e.EFF(48," - qu\u2019ils sont capables, par leur propre raisonnement, d\u2019apprendre \xe0 distinguer les consonnes des voyelles et \xe0 m\xe9moriser ces derni\xe8res (a, e, i, o, u, y, \xe9, \xe8, \xea) ; "),e.k0s(),e.j41(49,"li"),e.EFF(50," - que les mots sont fabriqu\xe9s avec des syllabes que l\u2019on peut rendre ind\xe9pendantes les unes des autres \xe0 l\u2019oral et donc manipuler. "),e.k0s()()()(),e.j41(51,"div",4),e.nrm(52,"span",17),e.j41(53,"div",15)(54,"p",16),e.EFF(55," Les autres semaines-le\xe7ons qui fonctionnent toutes sur le m\xeame sch\xe9ma : "),e.k0s(),e.j41(56,"ul")(57,"li"),e.EFF(58," - la r\xe9vision / r\xe9cup\xe9ration en m\xe9moire quotidienne de tout ce qui a d\xe9j\xe0 \xe9t\xe9 appris et expliqu\xe9 les semaines pr\xe9c\xe9dentes ; "),e.k0s(),e.j41(59,"li"),e.EFF(60," - la pr\xe9sentation, le premier jour de la semaine de un, deux ou trois gra-ph\xe8me(s)/digramme(s)/trigramme/ graph\xe8mes complexes ; "),e.k0s(),e.j41(61,"li"),e.EFF(62," - la lecture de syllabes / logatomes / groupes nominaux / groupes verbaux / phrases / histoires (\xe0 partir de la semaine 11 seulement pour les histoires) n\u2019utilisant que les graph\xe8mes / digrammes / trigrammes / graph\xe8mes complexes appris ; "),e.k0s(),e.j41(63,"li"),e.EFF(64," - un travail oral de compr\xe9hension des phrases / histoires lues ; "),e.k0s(),e.j41(65,"li"),e.EFF(66," - l\u2019encodage quotidien de syllabes, mots, groupes nominaux et phrases. "),e.k0s()()()(),e.j41(67,"h2",18),e.EFF(68,"La m\xe9thode : son contenu"),e.k0s(),e.j41(69,"p"),e.EFF(70," Pour chaque semaine, vous trouverez en pdf un script, une le\xe7on, des exercices et une ou plusieurs affiches. "),e.k0s(),e.nrm(71,"img",19),e.j41(72,"h2"),e.EFF(73,"La m\xe9thode : la progression"),e.k0s(),e.j41(74,"p"),e.EFF(75," Le rythme est d\u2019une le\xe7on par semaine. Ainsi, aux vacances d\u2019automne 15 lettres/digrammes auront \xe9t\xe9 vus, comme le recommande le guide orange. Nous avons en revanche fait le choix, mis \xe0 part pour les voyelles qui elles, sont vues toutes ensemble la premi\xe8re semaine, de ne voir qu\u2019une lettre par semaine jusqu\u2019aux vacances d\u2019automne. Ces sept premi\xe8res semaines sont consacr\xe9es \xe0 rendre la combinatoire (vraiment) tout terrain : les combinaisons d\xe9licates \u2013 d\xe8s lors qu\u2019il s\u2019agit de les d\xe9coder mais dont tous sont absolument capables puisqu\u2019ils parlent \u2013 telles VC, VCC, VCV, CVCC, CVV, CCV sont donc intens\xe9ment travaill\xe9es. Cela demande un investissement important de la part des \xe9l\xe8ves. Ce n\u2019est donc pas le moment de surcharger leur m\xe9moire de travail en leur demandant de m\xe9moriser le nom et le son de plusieurs lettres par semaine. "),e.k0s(),e.DNE(76,C,9,3,"table",20),e.nI1(77,"async"),e.j41(78,"h3",21),e.EFF(79,"Pr\xe9cisions importantes"),e.k0s(),e.j41(80,"div",4),e.nrm(81,"span",10),e.j41(82,"div",15)(83,"p",16),e.EFF(84," Pas de semaine de r\xe9vision r\xe9serv\xe9e dans la mesure o\xf9 ce travail de r\xe9vision est quotidien. Il est int\xe9gr\xe9 \xe0 un rituel par lequel d\xe9bute tous les jours la s\xe9ance de lecture (cf scripts). "),e.k0s()()(),e.j41(85,"div",4),e.nrm(86,"span",5),e.j41(87,"div",15)(88,"p",16),e.EFF(89,' Le k, le q, le \u0153 et le w n\u2019apparaissent dans aucune le\xe7on et c\u2019est volontaire ! Nous voyons le qu (qui, que, qu\u2019) tous les jours quand nous relisons/\xe9crivons les mots-outils et le k est si rare en fran\xe7ais que la balance avantage (ils connaissent le k) / inconv\xe9nient (d\xe8s qu\u2019ils le connaissent ils oublient le c et encodent tous les [k] avec un\u2026k !) penche nettement du c\xf4t\xe9 "pas de le\xe7on sur le k" et "m\xe9morisation de l\u2019orthographe des mots courants qui le contiennent". C\u2019est un peu radical, je sais, mais qu\u2019est-ce que \xe7a fonctionne bien ! Ainsi \xe9crira-t-on sur notre paperboard \u2013 qui fait office de carnet de vocabulaire commun \xe0 toute la classe, consultable \xe0 tout moment et dont les mots qui y figurent sont l\u2019objet de tr\xe8s fr\xe9quentes r\xe9cup\xe9rations en m\xe9moire \u2013 et au fur et \xe0 mesure que nous les rencontrerons les mots qui contiennent un k. '),e.k0s()()(),e.j41(90,"div",4),e.nrm(91,"span",17),e.j41(92,"div",15)(93,"p",16),e.EFF(94," Pour "),e.nrm(95,"strong"),e.j41(96,"strong"),e.EFF(97,"\u0153"),e.k0s(),e.EFF(98," et "),e.j41(99,"strong"),e.EFF(100,"w"),e.k0s(),e.EFF(101,", c\u2019est leur fonctionnement al\xe9atoire qui m\u2019a convaincue de ne pas en faire l\u2019objet d\u2019une le\xe7on mais de les \u2018paperboarder\u2019 \xe9galement. Des mots assez courants tels "),e.j41(102,"strong"),e.EFF(103," s\u0153ur, c\u0153ur, \u0153uf, \u0153il, b\u0153uf, n\u0153ud / wagon, clown, kiwi, cow-boy, bowling, halloween, sandwich. "),e.k0s()()()(),e.j41(104,"div",4),e.nrm(105,"span",7),e.j41(106,"div",15)(107,"p",16),e.EFF(108," Certaines le\xe7ons qui apparaissent dans tous les manuels de lecture n\u2019apparaissent pas ici. Il s\u2019agit de : "),e.k0s(),e.j41(109,"ul")(110,"li"),e.EFF(111," - l\u2019articulation de deux consonnes qui se suivent comme "),e.j41(112,"strong"),e.EFF(113," tr, br, bl, dr, cr, cl, pr, pl, fr, fl, vr, vl, gr, gl "),e.k0s(),e.EFF(114,"; "),e.k0s(),e.j41(115,"li"),e.EFF(116,"- l\u2019articulation de deux voyelles qui se suivent ;"),e.k0s(),e.j41(117,"li"),e.EFF(118," - les combinaisons faisant appara\xeetre un e devant deux consonnes identiques ou non. "),e.k0s()()()(),e.j41(119,"p"),e.EFF(120," Si elles n\u2019apparaissent pas dans "),e.j41(121,"strong"),e.EFF(122,"La M\xe9thode claire"),e.k0s(),e.EFF(123," c\u2019est que de la m\xeame fa\xe7on que nous ne programmons pas de semaines de r\xe9vision mais r\xe9visons tout tous les jours, nous ne programmons pas de le\xe7ons sur des combinaisons particuli\xe8res mais les travaillons toutes tr\xe8s r\xe9guli\xe8rement. Depuis le tout d\xe9but de l\u2019ann\xe9e pour le e suivi de deux consonnes et les suites de voyelles et \xe0 partir de la le\xe7on 6 pour les suites de consonnes. Pour les deux derniers cas, il n\u2019y a rien \xe0 comprendre mais tout \xe0 articuler : rien de mieux pour cela qu\u2019un entra\xeenement r\xe9gulier. "),e.k0s()()()()),2&r){let g;e.R7$(76),e.vxM(76,(g=e.bMT(77,1,F.lessons$))?76:-1,g)}},dependencies:[m.Jj,o.tP,o.Zl,o.tL,o.ji,o.cC,o.YV,o.iL,o.KS,o.$R,o.YZ,o.NB,m.Pc],encapsulation:2}),u})()}}]);