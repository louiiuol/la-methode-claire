"use strict";(self.webpackChunklmc_ui=self.webpackChunklmc_ui||[]).push([[883],{5883:(h,l,a)=>{a.r(l),a.d(l,{ProfilePage:()=>E});var e=a(4438),m=a(177),r=a(9454),p=a(2691),u=a(9079),c=a(8834),_=a(3224);function f(s,n){if(1&s){const o=e.RV6();e.j41(0,"h1",0),e.EFF(1,"Profil utilisateur"),e.k0s(),e.j41(2,"mat-accordion",1)(3,"mat-expansion-panel",2)(4,"mat-expansion-panel-header")(5,"mat-panel-title"),e.EFF(6," Informations personnelles "),e.k0s()(),e.nrm(7,"app-form",3),e.k0s(),e.j41(8,"mat-expansion-panel")(9,"mat-expansion-panel-header")(10,"mat-panel-title"),e.EFF(11," Mot de passe "),e.k0s()(),e.nrm(12,"app-form",4),e.k0s(),e.j41(13,"mat-expansion-panel")(14,"mat-expansion-panel-header")(15,"mat-panel-title"),e.EFF(16," Newsletter "),e.k0s()(),e.nrm(17,"app-form",3),e.k0s(),e.j41(18,"mat-expansion-panel")(19,"mat-expansion-panel-header")(20,"mat-panel-title"),e.EFF(21," Fermeture du compte "),e.k0s()(),e.j41(22,"p",5),e.EFF(23," Si vous le souhaitez, vous pouvez fermer votre compte. Il sera alors supprim\xe9 dans les 2 mois. "),e.nrm(24,"br"),e.EFF(25," Si vous souhaitez le rouvrir, il vous suffira de vous reconnecter. "),e.k0s(),e.j41(26,"button",6),e.bIt("click",function(){e.eBV(o);const i=e.XpG();return e.Njj(i.closeAccount())}),e.EFF(27," Fermer mon compte "),e.k0s()()()}if(2&s){const o=n,t=e.XpG();e.R7$(7),e.Y8G("model",o.value)("submitted",t.updateProfile)("fields",t.profileFields),e.R7$(5),e.Y8G("submitted",t.updatePassword)("fields",t.passwordFields)("validators",t.passwordValidators),e.R7$(5),e.Y8G("model",o.value)("submitted",t.updateProfile)("fields",t.newsletterField)}}function P(s,n){1&s&&(e.j41(0,"app-loader"),e.EFF(1,"Chargement de vos informations"),e.k0s())}let E=(()=>{var s;class n{constructor(t){this.authenticator=t,this.class="page p-6",this.model$=this.authenticator.getProfile(),this.profileFields=[{preset:"user.email"},{preset:"user.firstName"},{preset:"user.lastName"}],this.passwordFields=[{preset:"user.password",props:{required:!0}},{preset:"user.passwordConfirm",props:{required:!0}}],this.passwordValidators=["passwordMatch"],this.updatePassword=(0,e.WQX)(u.r).updatePassword,this.newsletterField=[{preset:"user.newsletter",props:{required:!0}}],this.updateProfile=this.authenticator.updateProfile,this.closeAccount=()=>this.authenticator.closeAccount()}}return(s=n).\u0275fac=function(t){return new(t||s)(e.rXU(_.uR))},s.\u0275cmp=e.VBU({type:s,selectors:[["ng-component"]],hostVars:2,hostBindings:function(t,i){2&t&&e.HbH(i.class)},standalone:!0,features:[e.aNF],decls:3,vars:3,consts:[[1,"mt-4","mb-6","text-2xl","text-center","text-primary"],[1,"block","mx-auto","max-w-3xl"],["expanded",""],["action","Mettre \xe0 jour",3,"model","submitted","fields"],["action","Mettre \xe0 jour",3,"submitted","fields","validators"],[1,"mb-4"],["mat-raised-button","","color","warn",1,"block","mx-auto","my-3","!w-fit",3,"click"]],template:function(t,i){if(1&t&&(e.DNE(0,f,28,9),e.nI1(1,"async"),e.DNE(2,P,2,0)),2&t){let d;e.vxM(0,(d=e.bMT(1,1,i.model$))?0:2,d)}},dependencies:[m.Jj,p.s2,p.VU,r.MY,r.BS,r.GK,r.Z2,r.WN,c.$z,u.O],encapsulation:2}),n})()}}]);