"use strict";(self.webpackChunklmc_ui=self.webpackChunklmc_ui||[]).push([[87],{9087:(y,c,n)=>{n.r(c),n.d(c,{TeacherModule:()=>C});var s=n(266),t=n(5879),u=n(6814),p=n(1274),i=n(6311),g=n(8858),d=n(2341);function m(e,l){if(1&e){const o=t.EpF();t.TgZ(0,"app-button",10),t.NdJ("click",function(){t.CHM(o);const r=t.oxw();return t.KtG(r.toggledMobileMenu.emit())}),t.TgZ(1,"app-icon"),t._uU(2,"menu"),t.qZA()()}}function h(e,l){if(1&e&&t._UZ(0,"app-button",12),2&e){const o=l.$implicit;t.Q6J("href","/app/"+o)("label","views.teacher.routes."+o)}}function f(e,l){if(1&e&&(t.ynx(0),t.YNc(1,h,1,2,"app-button",11),t.BQk()),2&e){const o=t.oxw();t.xp6(1),t.Q6J("ngForOf",o.navigationLinks)}}let T=(()=>{class e{constructor(o,a){this.platform=o,this.authenticator=a,this.toggledMobileMenu=new t.vpe,this.class="sticky top-0 z-50",this.navigationLinks=["dashboard","progression"],this.currentUser=this.authenticator.currentUser(),this.logOut=()=>this.authenticator.logOut()}}return e.\u0275fac=function(o){return new(o||e)(t.Y36(d.mi),t.Y36(d.e8))},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-logged-header"]],hostVars:2,hostBindings:function(o,a){2&o&&t.Tol(a.class)},outputs:{toggledMobileMenu:"toggledMobileMenu"},standalone:!0,features:[t.jDz],decls:16,vars:4,consts:[[1,"gap-3","h-16","justify-start","mat-elevation-z1"],["aria-label","Button to expand sidebar","type","icon",3,"click",4,"ngIf"],["svg","logo",1,"w-12"],[4,"ngIf"],[1,"flex-1"],["type","icon",1,"bg-primary","rounded-full","leading-none",3,"matMenuTriggerFor"],[1,"text-white"],["userMenu","matMenu"],["type","menu-item","href","/app/profile","label","views.teacher.routes.profile"],["type","menu-item","color","warn","label","core.actions.logout.action",3,"click"],["aria-label","Button to expand sidebar","type","icon",3,"click"],["color","primary",3,"href","label",4,"ngFor","ngForOf"],["color","primary",3,"href","label"]],template:function(o,a){if(1&o&&(t.TgZ(0,"mat-toolbar",0),t.YNc(1,m,3,0,"app-button",1),t._UZ(2,"app-icon",2),t.YNc(3,f,2,1,"ng-container",3),t._UZ(4,"span",4),t.TgZ(5,"app-button",5)(6,"span",6),t._uU(7),t.qZA()(),t.TgZ(8,"mat-menu",null,7)(10,"app-button",8)(11,"app-icon"),t._uU(12,"person"),t.qZA()(),t.TgZ(13,"app-button",9),t.NdJ("click",function(){return a.logOut()}),t.TgZ(14,"app-icon"),t._uU(15,"logout"),t.qZA()()()()),2&o){const r=t.MAs(9);t.xp6(1),t.Q6J("ngIf",a.platform.isMobileView()),t.xp6(2),t.Q6J("ngIf",!a.platform.isMobileView()),t.xp6(2),t.Q6J("matMenuTriggerFor",r),t.xp6(2),t.hij(" ",null==a.currentUser||null==a.currentUser.initials?null:a.currentUser.initials.toLocaleUpperCase()," ")}},dependencies:[u.O5,u.ax,p.g0,p.Ye,i.Tx,i.VK,i.p6,g.oJ,g.r0],encapsulation:2}),e})();const M=[{path:"",component:(()=>{class e{constructor(){this.class="page",this.key="teacher-view"}}return e.\u0275fac=function(o){return new(o||e)},e.\u0275cmp=t.Xpm({type:e,selectors:[["ng-component"]],hostVars:3,hostBindings:function(o,a){2&o&&(t.Ikx("id",a.key),t.Tol(a.class))},standalone:!0,features:[t.jDz],decls:3,vars:0,template:function(o,a){1&o&&(t._UZ(0,"app-logged-header"),t.TgZ(1,"main"),t._UZ(2,"router-outlet"),t.qZA())},dependencies:function(){return[s.Bz,s.lC,T]},encapsulation:2}),e})(),children:[{path:"dashboard",loadComponent:()=>Promise.all([n.e(927),n.e(109),n.e(405)]).then(n.bind(n,1405)).then(e=>e.DashboardPage)},{path:"progression",loadComponent:()=>Promise.all([n.e(927),n.e(109),n.e(675)]).then(n.bind(n,6675)).then(e=>e.ProgressionPage)},{path:"profile",loadComponent:()=>Promise.all([n.e(592),n.e(83)]).then(n.bind(n,3083)).then(e=>e.ProfilePage)}]}];let C=(()=>{class e{}return e.\u0275fac=function(o){return new(o||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[s.Bz.forChild(M)]}),e})()}}]);