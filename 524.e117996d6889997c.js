"use strict";(self.webpackChunklmc_ui=self.webpackChunklmc_ui||[]).push([[524],{6915:(b,d,t)=>{t.d(d,{P:()=>h});var c=t(7025),e=t(5312),r=t(3224),p=t(7673),m=t(6354),g=t(6697),F=t(4438);let h=(()=>{var l;class f extends c.${constructor(){super(...arguments),this.resource="courses",this.getLibrary=()=>this.lessons?(0,p.of)(this.lessons):this.getAll({notifyOnSuccess:!1,notifyOnError:!1}).pipe((0,m.T)(this.updateLocalLessons)),this.setCurrentLesson=o=>this.partialUpdate(null,null,{path:"currentLesson",params:{index:o},notifyOnSuccess:!1}),this.getPdf=o=>this.http.get([e.c.root_url,"courses",o].join("/"),{responseType:"arraybuffer"}),this.downloadPdf=o=>this.http.get([e.c.root_url,"courses",o,"download"].join("/"),{responseType:"arraybuffer"}).pipe((0,g.s)(1)).subscribe(i=>(0,r.OJ)(i,o)),this.downloadCourse=o=>this.http.get([e.c.root_url,"courses",o,"download"].join("/"),{responseType:"blob"}).subscribe(i=>(0,r.OJ)(i,o.toString(),"zip")),this.updateLocalLessons=o=>{const i=o.value;return this.lessons=i,i}}}return(l=f).\u0275fac=(()=>{let E;return function(i){return(E||(E=F.xGo(l)))(i||l)}})(),l.\u0275prov=F.jDH({token:l,factory:l.\u0275fac}),f})()},2524:(b,d,t)=>{t.r(d),t.d(d,{MethodPage:()=>C});var c=t(177),e=t(4438),r=t(4069),p=t(6915);const m=s=>({color:s});function g(s,u){1&s&&(e.j41(0,"th",31),e.EFF(1," Semaine / Le\xe7on "),e.k0s())}function F(s,u){if(1&s&&(e.j41(0,"td",32),e.EFF(1),e.k0s()),2&s){const n=u.$implicit;e.Aen(e.eq3(3,m,n.color)),e.R7$(),e.SpI(" ",n.order+1," ")}}function h(s,u){1&s&&(e.j41(0,"th",31),e.EFF(1," Graph\xe8me(s) "),e.k0s())}function l(s,u){1&s&&(e.j41(0,"span"),e.EFF(1,"-"),e.k0s())}function f(s,u){if(1&s&&(e.j41(0,"span",36),e.EFF(1),e.k0s()),2&s){const n=u.$implicit;e.R7$(),e.SpI(" [",n,"] ")}}function E(s,u){1&s&&e.Z7z(0,f,2,1,"span",36,e.fX1),2&s&&e.Dyx(u)}function o(s,u){if(1&s&&(e.j41(0,"span",35),e.EFF(1),e.k0s()),2&s){const n=e.XpG().$implicit;e.R7$(),e.SpI(" (",n.info,") ")}}function i(s,u){if(1&s&&(e.j41(0,"span",34),e.DNE(1,l,2,0,"span"),e.EFF(2),e.nI1(3,"uppercase"),e.DNE(4,E,2,0)(5,o,2,1,"span",35),e.k0s()),2&s){let n;const a=u.$implicit;e.R7$(),e.vxM(1,a.endOfWord?1:-1),e.R7$(),e.SpI(" ",e.bMT(3,4,a.name)," "),e.R7$(2),e.vxM(4,(n=a.sounds)?4:-1,n),e.R7$(),e.vxM(5,a.info?5:-1)}}function q(s,u){if(1&s&&(e.j41(0,"td",33),e.Z7z(1,i,6,6,"span",34,e.fX1),e.k0s()),2&s){const n=u.$implicit;e.Aen(e.eq3(2,m,n.color)),e.R7$(),e.Dyx(n.phonemes)}}function x(s,u){1&s&&e.nrm(0,"tr",37)}function j(s,u){1&s&&e.nrm(0,"tr",38)}function k(s,u){if(1&s&&(e.j41(0,"table",12),e.qex(1,24),e.DNE(2,g,2,0,"th",25)(3,F,2,5,"td",26),e.bVm(),e.qex(4,27),e.DNE(5,h,2,0,"th",25)(6,q,3,4,"td",28),e.bVm(),e.DNE(7,x,1,0,"tr",29)(8,j,1,0,"tr",30),e.k0s()),2&s){const n=e.XpG();e.Y8G("dataSource",u),e.R7$(7),e.Y8G("matHeaderRowDef",n.displayedColumns),e.R7$(),e.Y8G("matRowDefColumns",n.displayedColumns)}}let C=(()=>{var s;class u{constructor(){this.class="block",this.lessons$=(0,e.WQX)(p.P).getLibrary(),this.displayedColumns=["index","name"]}}return(s=u).\u0275fac=function(a){return new(a||s)},s.\u0275cmp=e.VBU({type:s,selectors:[["ng-component"]],hostVars:2,hostBindings:function(a,_){2&a&&e.HbH(_.class)},standalone:!0,features:[e.Jv_([p.P]),e.aNF],decls:190,vars:3,consts:[[1,"bg-yellow-light"],[1,"mx-auto","px-16","pt-4","pb-3","max-w-5xl"],["src","assets/img/illustrations/method-intro.png","alt","illustration d'introduction de la m\xe9thode",1,"mx-auto","mb-6","w-full","max-w-xl"],[1,"content"],[1,"mt-0","mb-6","font-bold","text-4xl","text-center","text-primary","md:text-5xl","md:leading-relaxed"],[1,"pr-2",2,"color","#ac981a"],[1,"pr-2",2,"color","#fcdac6"],[1,"italic"],[1,"pr-2",2,"color","#ef7e64"],[1,"pr-2",2,"color","#b2ced8"],[1,"pr-2",2,"color","#ef7f96"],["src","assets/img/illustrations/method-obstacles.png","alt","illustration des obstacles",1,"mx-auto","w-64"],["mat-table","","aria-describedby","Tableau des le\xe7ons de la m\xe9thode",1,"mx-auto","mb-9","w-fit","!min-w-fit",3,"dataSource"],[1,"my-3","font-bold"],[1,"relative"],[1,"block","top-2","-left-12","absolute","rounded-full","w-6","h-6",2,"background-color","#b2ced8"],[1,"flex-1"],[1,"!mt-0"],[1,"block","top-2","-left-12","absolute","rounded-full","w-6","h-6",2,"background-color","#ac981a"],[1,"block","top-2","-left-12","absolute","rounded-full","w-6","h-6",2,"background-color","#ef7f96"],[1,"block","top-2","-left-12","absolute","rounded-full","w-6","h-6",2,"background-color","#fcdac6"],["src","assets/img/illustrations/method-digrame.png","alt","illustration d'un digrame",1,"mx-auto","w-64"],[1,"mt-24"],["src","assets/img/illustrations/method-content.png","alt","Illustration du contenu de la M\xe9thode",1,"mx-auto","w-full","max-w-2xl"],["matColumnDef","index"],["mat-header-cell","","class","font-bold",4,"matHeaderCellDef"],["mat-cell","","class","font-bold !text-center",3,"style",4,"matCellDef"],["matColumnDef","name"],["mat-cell","","class","text-lg",3,"style",4,"matCellDef"],["mat-header-row","",4,"matHeaderRowDef"],["mat-row","",4,"matRowDef","matRowDefColumns"],["mat-header-cell","",1,"font-bold"],["mat-cell","",1,"font-bold","!text-center"],["mat-cell","",1,"text-lg"],[1,"px-2"],[1,"pl-1","text-sm"],[1,"px-1","text-xs"],["mat-header-row",""],["mat-row",""]],template:function(a,_){if(1&a&&(e.j41(0,"section",0)(1,"div",1),e.nrm(2,"img",2),e.j41(3,"div",3)(4,"h1",4),e.EFF(5," La m\xe9thode: sept piliers qui font la diff\xe9rence "),e.k0s(),e.j41(6,"p"),e.EFF(7," La M\xe9thode claire r\xe9pond de bout en bout aux programmes annonc\xe9s pour la rentr\xe9e 2024 \u2026 comme l\u2019immense majorit\xe9 des m\xe9thodes actuellement sur le march\xe9. "),e.nrm(8,"br"),e.EFF(9," Et, comme l\u2019immense majorit\xe9 des m\xe9thodes, La M\xe9thode claire part de la lettre pour aller vers le son, fait lire et \xe9crire aux enfants des syllabes, des mots, des phrases et des textes. "),e.k0s(),e.j41(10,"p")(11,"strong"),e.EFF(12," Alors pourquoi La M\xe9thode claire (LMC) plut\xf4t qu\u2019une autre ? "),e.k0s(),e.nrm(13,"br"),e.EFF(14," Parce qu\u2019elle r\xe9pond aux obstacles que les enfants rencontrent \u2013 au-del\xe0 de ceux que repr\xe9sentent la compr\xe9hension du principe alphab\xe9tique et la m\xe9morisation des correspondances entre les lettres et les sons \u2013 lorsqu\u2019ils apprennent \xe0 lire et \xe0 \xe9crire le fran\xe7ais comme aucune autre ne le fait. "),e.k0s(),e.j41(15,"p"),e.EFF(16," Ainsi, l\xe0 o\xf9 les autres m\xe9thodes am\xe9nagent leurs supports afin d\u2019en faciliter l\u2019acc\xe8s aux plus fragiles, (en grisant certaines lettres, en marquant les fronti\xe8res syllabiques par des arcs ou des jeux de couleur, en excluant des listes de mots \xe0 lire ceux dont les combinaisons contreviennent aux r\xe8gles apprises, en donnant \xe0 lire \xe0 certains des versions simplifi\xe9es des textes, etc.), LMC part du principe que TOUS les enfants sont capables de d\xe9passer les obstacles qu\u2019ils rencontrent quand ils apprennent \xe0 lire et \xe0 \xe9crire \xe0 partir du moment o\xf9 on leur apprend \xe0 le faire. "),e.k0s(),e.j41(17,"p"),e.EFF(18,"Elle prend appui pour cela sur sept piliers."),e.k0s(),e.j41(19,"h2")(20,"span",5),e.EFF(21,"1."),e.k0s(),e.EFF(22,"Changer son point de vue d\u2019adulte lettr\xe9 sur la langue \xe9crite et son apprentissage. "),e.k0s(),e.j41(23,"p"),e.EFF(24," Le fran\xe7ais \xe9crit regorge d\u2019obstacles pour qui apprend \xe0 le lire et \xe0 l\u2019\xe9crire. La familiarit\xe9 que l\u2019on entretient avec lui depuis de nombreuses ann\xe9es peut nous emp\xeacher de les voir et donc de saisir combien ils entravent les apprentissages de nos \xe9l\xe8ves. "),e.k0s(),e.j41(25,"h2")(26,"span",6),e.EFF(27,"2."),e.k0s(),e.EFF(28,"Donner \xe0 tous les enfants les moyens d\u2019entrer dans la combinatoire\u2026 "),e.k0s(),e.j41(29,"p"),e.EFF(30," Comment ? En "),e.j41(31,"strong"),e.EFF(32,"apprenant"),e.k0s(),e.EFF(33," \xe0 tous les enfants \xe0 combiner ! "),e.nrm(34,"br"),e.EFF(35," Car il ne suffit pas toujours d\u2019avoir compris que l\u2019\xe9crit code l\u2019oral, qu\u2019\xe0 chaque lettre correspond un son et que pour lire il faut fusionner les sons pour parvenir \xe0 le faire. Nous sommes tr\xe8s nombreux \xe0 passer \xe0 c\xf4t\xe9 de ce fait \u2013 pourtant propre \xe0 retarder l\u2019entr\xe9e des enfants dans le d\xe9codage de plusieurs semaines voire plusieurs mois \u2013 persuad\xe9s que nous sommes que tous nos \xe9l\xe8ves savent d\xe9j\xe0 fusionner\u2026 puisqu\u2019ils parlent. "),e.k0s(),e.j41(36,"p"),e.EFF(37," Ce qui est tr\xe8s juste ! Tous les enfants, s\u2019ils parlent, fusionnent. Mais ce que l\u2019on oublie c\u2019est que fusionner des sons naturellement, sans y penser (r\xe9p\xe9ter la syllabe "),e.j41(38,"strong",7),e.EFF(39,"ma"),e.k0s(),e.EFF(40," par exemple) et fusionner des sons volontairement, sur commande donc (fusionner "),e.j41(41,"strong",7),e.EFF(42,"mmm"),e.k0s(),e.EFF(43," et "),e.j41(44,"strong",7),e.EFF(45,"aaa"),e.k0s(),e.EFF(46," pour faire "),e.j41(47,"strong",7),e.EFF(48,"ma"),e.k0s(),e.EFF(49,"), ce n\u2019est pas la m\xeame chose. "),e.nrm(50,"br"),e.EFF(51,"Si l\u2019on veut r\xe9ellement donner \xe0 tous les enfants les moyens d\u2019entrer dans la combinatoire, c\u2019est donc sur la fusion orale et volontaire de deux sons qu\u2019il faut se pencher et surtout sur sa mise en \u0153uvre par chacun de nos \xe9l\xe8ves. Parce qu\u2019ils peuvent certes au sein de la classe entendre la fusion ex\xe9cut\xe9e par d\u2019autres "),e.j41(52,"strong"),e.EFF(53," mais elle ne deviendra r\xe9ellement intelligible pour eux que lorsqu\u2019ils la produiront eux-m\xeames. "),e.k0s(),e.EFF(54," Apprenons-leur \xe0 la produire, donc. "),e.k0s(),e.j41(55,"h2")(56,"span",8),e.EFF(57,"3."),e.k0s(),e.EFF(58,"Apprendre aux enfants \xe0 distinguer les voyelles des consonnes. "),e.k0s(),e.j41(59,"p"),e.EFF(60," L\u2019automatisation de la distinction entre voyelle et consonne est fondamentale car fondatrice. C\u2019est en effet sur elle que l\u2019on va prendre appui au cours de l\u2019ann\xe9e pour faire entrer les enfants dans la compr\xe9hension et l\u2019application de nombre de r\xe8gles de fonctionnement du fran\xe7ais \xe9crit. "),e.k0s(),e.j41(61,"h2")(62,"span",9),e.EFF(63,"4."),e.k0s(),e.EFF(64,"Rendre la combinatoire tout terrain pour tous ! "),e.k0s(),e.j41(65,"p"),e.EFF(66," Faire travailler intens\xe9ment et d\xe8s les toutes premi\xe8res semaines, le d\xe9codage des combinaisons classiques cv, vc (c pour consonne et v pour voyelle) "),e.j41(67,"strong"),e.EFF(68,"mais \xe9galement"),e.k0s(),e.EFF(69," celui des combinaisons plus complexes cvc, vcc, cvcc, ccv, vcv. "),e.nrm(70,"br"),e.EFF(71," Retarder cet apprentissage pour nos \xe9l\xe8ves, sous pr\xe9texte que l\u2019on pourrait perdre les plus fragiles d\u2019entre eux, c\u2019est mettre en p\xe9ril les chances de ces derniers d\u2019apprendre \xe0 lire aussi bien que les autres. "),e.nrm(72,"br"),e.EFF(73," Cette crainte n\u2019est en outre nullement justifi\xe9e : les enfants peuvent tous et tr\xe8s vite parvenir \xe0 articuler ces combinaisons puisqu\u2019ils le font tout le temps quand ils parlent ! Il faut donc le leur faire savoir et les entra\xeener \xe0 le faire quotidiennement. Cette ma\xeetrise est essentielle car la m\xe9moire de travail est ainsi faite qu\u2019elle ne peut g\xe9rer plusieurs obstacles \xe0 la fois. Si l\u2019on veut que nos \xe9l\xe8ves soient \xe0 la hauteur des obstacles \xe0 venir, il faut lib\xe9rer de la place dans la m\xe9moire de travail. "),e.k0s(),e.j41(74,"h2")(75,"span",6),e.EFF(76,"5."),e.k0s(),e.EFF(77,"Faire encoder et \xe9crire tous les jours et beaucoup. "),e.k0s(),e.j41(78,"p"),e.EFF(79," Le temps allou\xe9 \xe0 l\u2019apprentissage de la lecture et de l\u2019\xe9criture \xe0 l\u2019\xe9cole n\u2019\xe9tant pas infini, il est essentiel de l\u2019utiliser au mieux pour faire progresser nos \xe9l\xe8ves. Or, encoder est l\u2019exercice le plus \xe0 m\xeame de les aider \xe0 discriminer de plus en plus finement les sons qui composent le langage \u2013 tout en comprenant l\u2019int\xe9r\xeat qu\u2019il y a \xe0 le faire car pourquoi s\u2019exercer \xe0 entendre les sons qui composent les mots de sa langue si ce n\u2019est pour les \xe9crire ? \u2013 et \xe0 mettre en m\xe9moire les graph\xe8mes appris. "),e.nrm(80,"br"),e.EFF(81," Quant aux dict\xe9es quotidiennes de phrases, elles vont permettre aux enfants d\u2019apprendre \xe0 s\xe9parer les mots par des espaces, \xe0 ne plus se faire avoir par les liaisons, \xe0 utiliser l\u2019apostrophe et \xe0 se poser des questions d\u2019ordre orthographique. "),e.nrm(82,"br"),e.EFF(83," Plus on passera de temps \xe0 faire encoder et \xe9crire nos \xe9l\xe8ves, plus ils progresseront. Faire dispara\xeetre les fichiers d\u2019exercices de nos classes peut donc \xeatre une excellente id\xe9e ! Aucun exercice sur aucun fichier ne pourra jamais rivaliser avec ce qu\u2019une ardoise, un feutre et la voix du ma\xeetre permet d\u2019apprendre \xe0 nos \xe9l\xe8ves\u2026 "),e.k0s(),e.j41(84,"h2")(85,"span",10),e.EFF(86,"6."),e.k0s(),e.EFF(87,"Apprendre aux \xe9l\xe8ves \xe0 m\xe9moriser. "),e.k0s(),e.j41(88,"p"),e.EFF(89," C\u2019est en allant rechercher r\xe9guli\xe8rement en m\xe9moire ce que l\u2019on a appris que l\u2019on finit par le m\xe9moriser sur le long terme. Dans LMC, la r\xe9cup\xe9ration en m\xe9moire des graph\xe8mes et notions qui ont \xe9t\xe9 abord\xe9s les jours, semaines et mois pr\xe9c\xe9dents est enseign\xe9e et ritualis\xe9e. C\u2019est une condition "),e.j41(90,"em"),e.EFF(91,"sine qua non"),e.k0s(),e.EFF(92," pour embarquer tous nos \xe9l\xe8ves : les enfants ne pourront r\xe9fl\xe9chir au fonctionnement de leur langue si les \xe9l\xe9ments dont ils ont besoin pour le faire ne sont pas imm\xe9diatement disponibles en m\xe9moire. "),e.k0s(),e.j41(93,"h2")(94,"span",5),e.EFF(95,"7."),e.k0s(),e.EFF(96,"Transformer les obstacles internes \xe0 la langue en objets d\u2019apprentissage. "),e.k0s(),e.j41(97,"p"),e.EFF(98," Ce sont les six piliers pr\xe9c\xe9dents qui rendent possible ce septi\xe8me, central. "),e.nrm(99,"br"),e.EFF(100," Tout ce qui met nos \xe9l\xe8ves en difficult\xe9 est relev\xe9, expliqu\xe9 et travaill\xe9. "),e.nrm(101,"br"),e.EFF(102," Le fran\xe7ais est difficile mais d\u2019une fa\xe7on bien plus sympathique que l\u2019anglais : quand il cesse d\u2019\xeatre transparent (on dit qu\u2019une langue est transparente quand \xe0 une lettre correspond toujours le m\xeame son ou quand \xe0 un son correspond(ent) toujours la ou les m\xeame(s) lettre(s)) il r\xe9pond n\xe9anmoins \xe0 des r\xe8gles. Des r\xe8gles qui peuvent tr\xe8s bien s\u2019enseigner et qui, quand elles le sont, donnent aux enfants tous les moyens de leurs apprentissages. Ces r\xe8gles vont permettre aux enfants \xe0 la fois de comprendre ce qui les met en difficult\xe9 et leur permettre de le d\xe9passer. "),e.nrm(103,"br"),e.EFF(104," Ainsi enseigne-t-on aux enfants pourquoi un "),e.j41(105,"strong",7),e.EFF(106,"a"),e.k0s(),e.EFF(107," suivi d\u2019un "),e.j41(108,"strong",7),e.EFF(109,"n"),e.k0s(),e.EFF(110," fait parfois un seul son, parfois non, pourquoi dans tel mot le "),e.j41(111,"strong",7),e.EFF(112,"e"),e.k0s(),e.EFF(113," fait le son [e] alors qu\u2019il fait [\xe8] dans tel autre, pourquoi dans la s\xe9quence "),e.j41(114,"em"),e.EFF(115,"un ami"),e.k0s(),e.EFF(116," il faut \xe9crire "),e.j41(117,"em"),e.EFF(118,"ami"),e.k0s(),e.EFF(119," quand c\u2019est "),e.j41(120,"strong"),e.EFF(121,"nami"),e.k0s(),e.EFF(122," que l\u2019on entend, pourquoi on peut orthographier tel son dans tel mot sans se poser aucune question alors que pour tel autre son, il va falloir r\xe9fl\xe9chir, etc. "),e.nrm(123,"br"),e.EFF(124," Les enfants vont alors comprendre que la langue est peut-\xeatre compliqu\xe9e mais qu\u2019il existe des r\xe8gles qu\u2019il est possible de s\u2019approprier et sur lesquelles on peut compter pour progresser. "),e.nrm(125,"br"),e.EFF(126," Et nous, enseignants, allons constater qu\u2019il est possible d\u2019aider nos \xe9l\xe8ves \xe0 progresser bien au-del\xe0 de ce que l\u2019on avait jusqu\u2019alors cru possible\u2026 "),e.nrm(127,"br"),e.EFF(128,"Et \xe7a, \xe7a n\u2019est jamais d\xe9sagr\xe9able. "),e.k0s(),e.nrm(129,"img",11),e.j41(130,"h2"),e.EFF(131,"La m\xe9thode : sa progression"),e.k0s(),e.j41(132,"p"),e.EFF(133," Le rythme est d\u2019une le\xe7on par semaine. Ainsi, aux vacances d\u2019automne 15 lettres/digrammes auront \xe9t\xe9 vus, comme le recommande le guide orange. Nous avons en revanche fait le choix, mis \xe0 part pour les voyelles qui elles, sont vues toutes ensemble la premi\xe8re semaine, de ne voir qu\u2019une lettre par semaine jusqu\u2019aux vacances d\u2019automne. Ces sept premi\xe8res semaines sont consacr\xe9es \xe0 rendre la combinatoire (vraiment) tout terrain : les combinaisons d\xe9licates \u2013 d\xe8s lors qu\u2019il s\u2019agit de les d\xe9coder mais dont tous sont absolument capables puisqu\u2019ils parlent \u2013 telles VC, VCC, VCV, CVCC, CVV, CCV sont donc intens\xe9ment travaill\xe9es. Cela demande un investissement important de la part des \xe9l\xe8ves. Ce n\u2019est donc pas le moment de surcharger leur m\xe9moire de travail en leur demandant de m\xe9moriser le nom et le son de plusieurs lettres par semaine. "),e.k0s(),e.DNE(134,k,9,3,"table",12),e.nI1(135,"async"),e.j41(136,"h3",13),e.EFF(137,"Pr\xe9cisions importantes"),e.k0s(),e.j41(138,"div",14),e.nrm(139,"span",15),e.j41(140,"div",16)(141,"p",17),e.EFF(142," Pas de semaine de r\xe9vision r\xe9serv\xe9e dans la mesure o\xf9 ce travail de r\xe9vision est quotidien. Il est int\xe9gr\xe9 \xe0 un rituel par lequel d\xe9bute tous les jours la s\xe9ance de lecture (cf scripts). "),e.k0s()()(),e.j41(143,"div",14),e.nrm(144,"span",18),e.j41(145,"div",16)(146,"p",17),e.EFF(147," Pas de le\xe7on d\u2019orthographe d\xe9croch\xe9e. L\u2019orthographe lexicale est travaill\xe9e de deux fa\xe7ons au cours des s\xe9ances quotidiennes d\u2019\xe9criture. 1/ Les enfants sont syst\xe9matiquement invit\xe9s \xe0 (se) poser la question de l\u2019orthographe des sons dont ils ont appris qu\u2019ils pouvaient s\u2019encoder de diff\xe9rentes fa\xe7ons. Il s\u2019agit ici de les faire entrer petit \xe0 petit dans un questionnement orthographique. De porter \xe0 leur conscience que certains mots (beaucoup) qu\u2019on leur demande d\u2019\xe9crire contiennent des sons qu\u2019ils peuvent savoir encoder mais pas orthographier. 2/ Les mots les plus courants qui contiennent soit des doubles consonnes, soit des lettres muettes soit des irr\xe9gularit\xe9s sont r\xe9pertori\xe9s sur le paperboard de la classe et utilis\xe9s tr\xe8s r\xe9guli\xe8rement afin d\u2019aider les enfants \xe0 les m\xe9moriser. (cf scripts) "),e.nrm(148,"br"),e.EFF(149,"L\u2019orthographe grammaticale est travaill\xe9e quotidiennement lors des le\xe7ons de lecture et de la production \xe9crite dict\xe9e. (cf scripts) "),e.k0s()()(),e.j41(150,"div",14),e.nrm(151,"span",19),e.j41(152,"div",16)(153,"p",17),e.EFF(154," Les "),e.j41(155,"strong"),e.EFF(156,"w"),e.k0s(),e.EFF(157," et le "),e.j41(158,"strong"),e.EFF(159,"ch"),e.k0s(),e.EFF(160," (oralis\xe9 [k]) n\u2019apparaissent dans aucune le\xe7on. Rares, au fonctionnement al\xe9atoire pour le "),e.j41(161,"strong"),e.EFF(162,"w"),e.k0s(),e.EFF(163,", nous avons fait le choix d\u2019\xe9crire les mots dans lesquels ils apparaissent sur notre paperboard au fur et \xe0 mesure o\xf9 nous les rencontrons. (cf scripts) "),e.k0s()()(),e.j41(164,"div",14),e.nrm(165,"span",20),e.j41(166,"div",16)(167,"p",17),e.EFF(168," Certaines le\xe7ons qui apparaissent dans tous les manuels de lecture n\u2019apparaissent pas ici. Il s\u2019agit de : "),e.k0s(),e.j41(169,"ul")(170,"li"),e.EFF(171," - l\u2019articulation de deux consonnes qui se suivent comme "),e.j41(172,"strong"),e.EFF(173," tr, br, bl, dr, cr, cl, pr, pl, fr, fl, vr, vl, gr, gl "),e.k0s(),e.EFF(174,"; "),e.k0s(),e.j41(175,"li"),e.EFF(176,"- l\u2019articulation de deux voyelles qui se suivent ;"),e.k0s(),e.j41(177,"li"),e.EFF(178," - les combinaisons faisant appara\xeetre un e devant deux consonnes identiques ou non. "),e.k0s()()()(),e.j41(179,"p"),e.EFF(180," Si elles n\u2019apparaissent pas dans "),e.j41(181,"strong"),e.EFF(182,"La M\xe9thode claire"),e.k0s(),e.EFF(183," c\u2019est que de la m\xeame fa\xe7on que nous ne programmons pas de semaines de r\xe9vision mais r\xe9visons tout tous les jours, nous ne programmons pas de le\xe7ons sur des combinaisons particuli\xe8res mais les travaillons toutes tr\xe8s r\xe9guli\xe8rement. Depuis le tout d\xe9but de l\u2019ann\xe9e pour le e suivi de deux consonnes et les suites de voyelles et \xe0 partir de la le\xe7on 6 pour les suites de consonnes. Pour les deux derniers cas, il n\u2019y a rien \xe0 comprendre mais tout \xe0 articuler : rien de mieux pour cela qu\u2019un entra\xeenement r\xe9gulier. "),e.k0s()(),e.nrm(184,"img",21),e.j41(185,"h2",22),e.EFF(186,"La m\xe9thode : son contenu"),e.k0s(),e.j41(187,"p"),e.EFF(188," Pour chaque semaine, vous trouverez en pdf un script, une le\xe7on, des exercices et une ou plusieurs affiches. "),e.k0s(),e.nrm(189,"img",23),e.k0s()()),2&a){let v;e.R7$(134),e.vxM(134,(v=e.bMT(135,1,_.lessons$))?134:-1,v)}},dependencies:[c.Jj,r.tP,r.Zl,r.tL,r.ji,r.cC,r.YV,r.iL,r.KS,r.$R,r.YZ,r.NB,c.Pc],encapsulation:2}),u})()}}]);