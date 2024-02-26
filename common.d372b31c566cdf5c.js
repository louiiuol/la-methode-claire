"use strict";(self.webpackChunklmc_ui=self.webpackChunklmc_ui||[]).push([[592],{7690:(f,d,o)=>{o.d(d,{$:()=>u});var p=o(5141),l=o(553),e=o(2096),i=o(7398),m=o(8180),n=o(5879);let u=(()=>{class t extends p.g{constructor(){super(...arguments),this.resource="courses",this.getLibrary=()=>this.lessons?(0,e.of)(this.lessons):this.getAll({notifyOnSuccess:!1}).pipe((0,i.U)(this.updateLocalLessons)),this.setCurrentLesson=s=>this.partialUpdate(null,null,{path:"currentLesson",params:{index:s},notifyOnSuccess:!1}),this.getPdf=s=>this.http.get([l.N.root_url,"courses",s].join("/"),{responseType:"arraybuffer"}),this.downloadPdf=s=>this.http.get([l.N.root_url,"courses",s,"download"].join("/"),{responseType:"arraybuffer"}).pipe((0,m.q)(1)).subscribe(r=>{this.saveFile(r,s)}),this.downloadCourse=s=>this.http.get([l.N.root_url,"courses",s,"download"].join("/"),{responseType:"blob"}),this.updateLocalLessons=s=>{const r=s.value;return this.lessons=r,r}}saveFile(s,r){const c=new Blob([s],{type:"application/pdf"}),h=document.createElement("a");h.href=window.URL.createObjectURL(c),h.download=`${r}.pdf`,h.click(),window.URL.revokeObjectURL(h.href)}}return t.\u0275fac=function(){let a;return function(r){return(a||(a=n.n5z(t)))(r||t)}}(),t.\u0275prov=n.Yz7({token:t,factory:t.\u0275fac}),t})()},2804:(f,d,o)=>{o.d(d,{g:()=>u,C:()=>n});var p=o(5141),l=o(7398),e=o(9397),i=o(5879),m=o(1896);let n=(()=>{class t extends p.g{constructor(s){super(),this.router=s,this.resource="users",this.forgotPassword=r=>this.post(r,{customResource:"",path:"forgot-password",notifyOnError:!1,customAction:"submit"}).pipe((0,l.U)(c=>(c.error&&(c.error="unknown_email"),c))),this.resetPassword=(r,c)=>{const{user:h,passwordConfirm:v,..._}=c;return this.update(r,_,{path:"reset-password"}).pipe((0,e.b)(g=>{g.error||this.router.navigate(["/login"]).catch(E=>console.error("Failed to redirect to [LoginPage] ",E))}))},this.updatePassword=r=>this.partialUpdate(null,r,{customResource:"",path:"update-password"})}}return t.\u0275fac=function(s){return new(s||t)(i.LFG(m.F0))},t.\u0275prov=i.Yz7({token:t,factory:t.\u0275fac}),t})(),u=(()=>{class t{}return t.\u0275fac=function(s){return new(s||t)},t.\u0275mod=i.oAB({type:t}),t.\u0275inj=i.cJS({providers:[n]}),t})()},4491:(f,d,o)=>{o.d(d,{u:()=>m});var p=o(6814),l=o(3730),e=o(5879);function i(n,u){1&n&&(e.ynx(0),e.TgZ(1,"p"),e._uU(2," Pour vous abonner vous devrez d'abord vous "),e.TgZ(3,"a",8),e._uU(4,"inscrire"),e.qZA(),e._uU(5,". "),e.qZA(),e._UZ(6,"br"),e.BQk())}let m=(()=>{class n{constructor(){this.class="max-w-lg",this.logged=!1}}return n.\u0275fac=function(t){return new(t||n)},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-formula-card"]],hostVars:2,hostBindings:function(t,a){2&t&&e.Tol(a.class)},inputs:{logged:"logged"},standalone:!0,features:[e.jDz],decls:22,vars:1,consts:[["title","L'abonnement","subtitle","Abonnez-vous pour profiter pleinement de la m\xe9thode !"],[1,"font-bold","text-2xl","text-primary","!pt-0"],[1,"text-3xl"],[1,"italic","mb-3"],[1,"description","ml-4","list-disc","mb-4"],[1,"my-4"],[4,"ngIf"],["href","mailto:methode.claire@gmail.com",1,"text-primary","font-bold"],["href","/register",1,"text-primary","underline"]],template:function(t,a){1&t&&(e.TgZ(0,"app-card",0)(1,"p",1)(2,"span",2),e._uU(3,"120\u20ac"),e.qZA(),e._uU(4," TTC / an "),e.qZA(),e._UZ(5,"hr"),e.TgZ(6,"p",3),e._uU(7,"Cet abonnement vous donne acc\xe8s \xe0:"),e.qZA(),e.TgZ(8,"ul",4)(9,"li",5),e._uU(10," une ann\xe9e scolaire de fichiers pdf \xe0 t\xe9l\xe9charger, imprimer et/ou projeter : le\xe7ons, scripts, exercices et affiches. "),e.qZA(),e.TgZ(11,"li",5),e._uU(12,"un acc\xe8s exclusif \xe0 la newsletter de Claire."),e.qZA(),e.TgZ(13,"li",5),e._uU(14,"des vid\xe9os explicatives."),e.qZA(),e.TgZ(15,"li",5),e._uU(16," la possibilit\xe9 d'\xe9changer avec Claire. Elle r\xe9pond \xe0 vos questions et cela enrichit la m\xe9thode. "),e.qZA()(),e.YNc(17,i,7,0,"ng-container",6),e.TgZ(18,"p"),e._uU(19," Une question ? "),e.TgZ(20,"a",7),e._uU(21," methode.claire@gmail.com "),e.qZA()()()),2&t&&(e.xp6(17),e.Q6J("ngIf",!a.logged))},dependencies:[p.O5,l.Ak],encapsulation:2}),n})()}}]);