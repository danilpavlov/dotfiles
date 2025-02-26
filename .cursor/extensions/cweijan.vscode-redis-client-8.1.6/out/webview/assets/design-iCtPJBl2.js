import{q as ot,a as me,r as H,D as Re,G as ae,e as P,N as Te,v as D,K as k,o as d,f as U,g as $,j as s,J as u,h as E,I as w,k as f,$ as T,a7 as W,L as B,t as y,a9 as ne,F as Z,B as oe,w as De,Q as Et,as as je,O as Le,S as Oe,s as we,C as Qe,P as Xe,n as We}from"./app-DnLddAJs.js";import"./constants-DgoLmzql.js";import{D as N,a as it}from"./DatabaseType-BT8pR5XP.js";import{b as Be}from"./viewUtil-DCbZMcCo.js";import{c as Ce}from"./codemirror-HhCTT3-L.js";import{E as be,a as Me}from"./index-D56ddGgp.js";import{E as Je}from"./index-B9k0DMYb.js";import{E as ve,a as Fe}from"./index-jqJVByGZ.js";import{E as Ie,a as $e}from"./index-B9xGJLcQ.js";import{E as he}from"./index-QeGZ9YjE.js";import{v as Se}from"./directive-C43MtdEl.js";import{A as Ge}from"./arrayUtil-CzswX_vs.js";import{E as ut}from"./index-rewuoyOe.js";import{S as Y}from"./stringBuilder-DUZQE8vS.js";import{g as re,c as Q,a as ct,i as mt,b as ce,E as Tt}from"./wrapper-z3aY4dq7.js";import{l as _t}from"./common_view_utils-ob-0ahhH.js";import"./index-NTbdbBV3.js";import"./_baseIteratee-CwUutAAD.js";import"./isEqual-Dl1q-O91.js";import"./merge-BtyMteUc.js";import"./_initCloneObject-g183-QVT.js";import"./isArrayLikeObject-0PRVHmnl.js";import"./index-OovTSBc5.js";import"./index-PG5R4vn9.js";import"./_baseFindIndex-D7XfJLKM.js";import"./castArray-DDedigbR.js";import"./clone-BWYN4ygE.js";import"./_baseClone-gMuFFj4j.js";import"./objectUtil-Z6JRxuBJ.js";const _e=ot("design",{state:()=>({schema:"",table:"",columns:[],tableMeta:{},dbType:N.MYSQL,dialect:null,remainHeight:0,activePanel:"column"}),getters:{canAlterTable(c){return![N.SQLITE].includes(c.dbType)},supportForeignKey(c){return![N.CLICKHOUSE].includes(c.dbType)&&(!c.tableMeta.engine||c.tableMeta.engine!="MyISAM")},supportCheck(c){return![N.D1,N.SQLITE,N.DUCK_DB,N.CLICKHOUSE,N.SNOWFLAKE].includes(c.dbType)},supportTrigger(c){return!it(c.dbType)},supportIndex(c){return![N.SNOWFLAKE].includes(c.dbType)}},actions:{updateDBType(c){this.dbType=c},updateFullInfo(c){for(const e in c)this[e]=c[e]}}}),dt={class:"design-toolbar"},At={class:"text-center"},Nt=me({__name:"IndexPanel",setup(c){const e=H([]),t=H([]),n=H(!0),r=_e(),{dbType:l,dialect:a,remainHeight:i,activePanel:o}=Re(r),m=ae({visible:!1,loading:!1,column:null,columns:null,type:null}),L=P(()=>{var I;return((I=m.columns)==null?void 0:I.length)>0?a.value.newIndex({...m}):""});Te(()=>{D.on("designMetaNext",()=>{m.visible=!1,t.value=a.value.indexTypes(),O()}).on("indexes",I=>{e.value=I,n.value=!1}).on("success",I=>{I=="index"&&(m.loading=!1,m.visible=!1,O())}).on("error",()=>{m.loading=!1})});const O=()=>{D.emit("indexes"),n.value=!0},R=()=>{m.visible=!0,m.loading=!1,m.columns=null,m.type="INDEX"},v=I=>a.value.formatIndexType(I),_=()=>{m.loading=!0,D.emit("execute",{type:"index",sql:L.value})},C=I=>{De(T("design.deleteIndexConfirm")).then(()=>{D.emit("execute",{type:"index",sql:a.value.dropIndex(I.index_name)})})};return(I,h)=>{const K=k("vsc-button"),g=k("vsc-tooltip"),b=be,G=Je,j=Me,q=k("RedMark"),le=ve,x=Fe,X=Ie,V=$e,ee=he,Ae=Se;return d(),U("div",null,[$("div",dt,[s(g,{title:E(T)("common.new")},{default:u(()=>[["ClickHouse"].includes(E(l))?f("",!0):(d(),w(K,{key:0,type:"icon",icon:"codicon-add text-base",onClick:R}))]),_:1},8,["title"]),s(g,{title:E(T)("common.refresh")},{default:u(()=>[s(K,{type:"icon",icon:"codicon-refresh text-base",onClick:O})]),_:1},8,["title"])]),E(o)=="index"?W((d(),w(j,{key:0,data:e.value,height:E(i),border:""},{default:u(()=>[s(b,{resizable:!0,align:"center",prop:"index_name",label:E(T)("design.indexName"),width:"200"},null,8,["label"]),s(b,{resizable:!0,align:"center",prop:"column_name",label:E(T)("design.column"),width:"200"},null,8,["label"]),s(b,{align:"center",prop:"isUnique",label:E(T)("design.unique"),width:"200"},{default:u(({row:F})=>[s(G,{disabled:"","model-value":E(Be)(F.isUnique)},null,8,["model-value"])]),_:1},8,["label"]),s(b,{resizable:!0,align:"center",prop:"index_type",label:E(T)("common.type"),width:"200"},{default:u(({row:F})=>[B(y(v(F)),1)]),_:1},8,["label"]),["PostgreSQL"].includes(E(l))?(d(),w(b,{key:0,resizable:!0,align:"center",prop:"index_method",label:E(T)("design.indexMethod"),width:"200"},null,8,["label"])):f("",!0),["ClickHouse"].includes(E(l))?f("",!0):(d(),w(b,{key:1,label:E(T)("design.operation"),width:"120"},{default:u(({row:F})=>[$("div",At,[s(K,{type:"icon",icon:"el-icon-delete",style:{color:"#f56c6c"},title:"delete",onClick:de=>C(F)},null,8,["onClick"])])]),_:1},8,["label"]))]),_:1},8,["data","height"])),[[Ae,n.value]]):f("",!0),s(ee,{modelValue:m.visible,"onUpdate:modelValue":h[3]||(h[3]=F=>m.visible=F),"show-close":!1,title:E(T)("design.newIndex"),width:"520px",closeOnClickModal:!1,center:""},{footer:u(()=>[s(K,{type:"secondary",onClick:h[2]||(h[2]=F=>m.visible=!1)},{default:u(()=>[B(y(E(T)("common.cancel")),1)]),_:1}),s(K,{type:"primary",loading:m.loading,onClick:_},{default:u(()=>[B(y(E(T)("common.ok")),1)]),_:1},8,["loading"]),h[4]||(h[4]=$("br",null,null,-1)),h[5]||(h[5]=B()),h[6]||(h[6]=$("br",null,null,-1)),W(s(Ce,{ref:"cmEditor",value:L.value,readonly:!0},null,8,["value"]),[[ne,L.value]])]),default:u(()=>[s(V,{inline:!0,"label-width":"75px",size:"small"},{default:u(()=>[s(X,null,{label:u(()=>[s(q),B(y(E(T)("design.column")),1)]),default:u(()=>[s(x,{modelValue:m.columns,"onUpdate:modelValue":h[0]||(h[0]=F=>m.columns=F),size:"small",filterable:"",multiple:"",class:"!w-[150px]"},{default:u(()=>[(d(!0),U(Z,null,oe(E(r).columns,F=>(d(),w(le,{key:F.name,label:F.name,value:F.name},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1}),s(X,null,{label:u(()=>[s(q),B(y(E(T)("common.type")),1)]),default:u(()=>[s(x,{modelValue:m.type,"onUpdate:modelValue":h[1]||(h[1]=F=>m.type=F),size:"small",class:"!w-[110px]"},{default:u(()=>[(d(!0),U(Z,null,oe(t.value,(F,de)=>(d(),w(le,{key:de,label:F.label,value:F.value},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1},8,["modelValue","title"])])}}}),Rt={ref:"infoPanel",class:"design-toolbar"},Ct=me({__name:"DDL",setup(c){const e=_e(),t=H(!1),n=H("");Te(()=>{D.on("designMetaNext",()=>{D.emit("ddl")}).on("ddl",({ddl:l})=>{t.value=!1,n.value=l})});const r=()=>{navigator.clipboard.writeText(n.value),je("Copy DDL success!")};return(l,a)=>{const i=k("vsc-button"),o=k("vsc-tooltip"),m=Se;return W((d(),U("div",null,[$("div",Rt,[s(o,{title:"Copy DDL"},{default:u(()=>[s(i,{type:"icon",icon:"el-icon-document-copy text-base",onClick:r})]),_:1}),s(o,{title:l.$t("common.refresh")},{default:u(()=>[s(i,{type:"icon",icon:"codicon-refresh text-base",onClick:a[0]||(a[0]=L=>E(D).emit("ddl"))})]),_:1},8,["title"])],512),E(e).activePanel=="ddl"?(d(),w(Ce,{key:0,dbType:E(e).dbType,value:n.value,readonly:!0,style:Et({maxHeight:E(e).remainHeight+"px",overflow:"auto"}),class:"large"},null,8,["dbType","value","style"])):f("",!0)])),[[m,t.value]])}}}),St={key:0,class:"design-toolbar"},pt={class:"text-center"},Ot=me({__name:"ForeignKey",setup(c){const e=_e(),{dialect:t,canAlterTable:n,remainHeight:r,activePanel:l}=Re(e),a=H([]),i=H([]),o=H([]),m=H([]),L=H(!0),O=ae({visible:!1,loading:!1}),R=ae({column:null,refTable:null,refColumn:null,foreignKeyName:null,onUpdate:"NO ACTION",onDelete:"NO ACTION"}),v=P(()=>{const{column:g,refTable:b,refColumn:G}=R;return g||b||G?t.value.newForeignKey(R):""});Te(()=>{D.on("designMetaNext",()=>{O.visible=!1,m.value=t.value.strategies(),C(),D.emit("tables")}).on("foreignKeys",g=>{L.value=!1,a.value=g}).on("columnsById",g=>{R.refColumn="",o.value=g}).on("success",g=>{g=="fk"&&(O.loading=!1,O.visible=!1,C())}).on("error",()=>{O.loading=!1}).on("tables",g=>{i.value=g})});const _=g=>{D.emit("columnsById",g)},C=()=>{const g=t.value.showForeignKeys();g&&(L.value=!0,D.emit("foreignKeys",g))},I=()=>{O.visible=!0,O.loading=!1,R.column=null,R.refTable=null,R.refColumn=null,R.onUpdate="NO ACTION",R.onDelete="NO ACTION"},h=()=>{O.loading=!0,D.emit("execute",{type:"fk",sql:v.value})},K=g=>{De(T("design.deleteFkConfirm")).then(()=>{D.emit("execute",{type:"fk",sql:t.value.dropForeignKey(g.constraint_name)})})};return(g,b)=>{const G=k("vsc-button"),j=k("vsc-tooltip"),q=be,le=Me,x=k("RedMark"),X=ve,V=Fe,ee=Ie,Ae=Le,F=$e,de=he,ye=Se;return d(),U("div",null,[E(n)?(d(),U("div",St,[s(j,{title:E(T)("common.new")},{default:u(()=>[s(G,{type:"icon",icon:"codicon-add text-base",onClick:I})]),_:1},8,["title"]),s(j,{title:E(T)("common.refresh")},{default:u(()=>[s(G,{type:"icon",icon:"codicon-refresh text-base",onClick:C})]),_:1},8,["title"])])):f("",!0),E(l)=="foreignKey"?W((d(),w(le,{key:1,data:a.value,style:{width:"100%"},height:E(r),border:""},{default:u(()=>[E(n)?(d(),w(q,{key:0,resizable:!0,align:"center",prop:"constraint_name",label:E(T)("design.constraintName"),width:"150"},null,8,["label"])):f("",!0),s(q,{resizable:!0,align:"center",prop:"column_name",label:E(T)("design.column"),width:"150"},null,8,["label"]),s(q,{resizable:!0,align:"center",prop:"referenced_table",label:E(T)("design.referencedTable"),width:"150"},null,8,["label"]),s(q,{resizable:!0,align:"center",prop:"referenced_column",label:E(T)("design.referencedColumn"),width:"155"},null,8,["label"]),s(q,{align:"center",prop:"updateRule",label:E(T)("design.updateRule"),width:"150"},null,8,["label"]),s(q,{align:"center",prop:"deleteRule",label:E(T)("design.deleteRule"),width:"150"},null,8,["label"]),E(n)?(d(),w(q,{key:1,label:E(T)("design.operation"),width:"120"},{default:u(({row:M})=>[$("div",pt,[s(G,{type:"icon",icon:"el-icon-delete",style:{color:"#f56c6c"},title:"delete",onClick:S=>K(M)},null,8,["onClick"])])]),_:1},8,["label"])):f("",!0)]),_:1},8,["data","height"])),[[ye,L.value]]):f("",!0),s(de,{modelValue:O.visible,"onUpdate:modelValue":b[7]||(b[7]=M=>O.visible=M),"show-close":!1,title:E(T)("design.newForeignKey"),width:"780px",closeOnClickModal:!1,"close-on-press-escape":!1,center:""},{footer:u(()=>[s(G,{type:"secondary",onClick:b[6]||(b[6]=M=>O.visible=!1)},{default:u(()=>[B(y(E(T)("common.cancel")),1)]),_:1}),s(G,{type:"primary",loading:O.loading,onClick:h},{default:u(()=>[B(y(E(T)("common.ok")),1)]),_:1},8,["loading"]),b[9]||(b[9]=$("br",null,null,-1)),b[10]||(b[10]=B()),b[11]||(b[11]=$("br",null,null,-1)),W(s(Ce,{ref:"cmEditor",value:v.value,readonly:!0},null,8,["value"]),[[ne,v.value]])]),default:u(()=>[s(F,{inline:!0,"label-width":"150px","label-position":"left",size:"small"},{default:u(()=>[s(ee,null,{label:u(()=>[s(x),B(y(E(T)("design.column")),1)]),default:u(()=>[s(V,{modelValue:R.column,"onUpdate:modelValue":b[0]||(b[0]=M=>R.column=M),size:"small",filterable:"",class:"!w-[170px] mr-4"},{default:u(()=>[(d(!0),U(Z,null,oe(E(e).columns,M=>(d(),w(X,{key:M.name,label:M.name,value:M.name},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1}),s(ee,null,{label:u(()=>[B(y(E(T)("design.constraintName")),1)]),default:u(()=>[s(Ae,{modelValue:R.foreignKeyName,"onUpdate:modelValue":b[1]||(b[1]=M=>R.foreignKeyName=M),class:"!w-[170px]"},null,8,["modelValue"])]),_:1}),b[8]||(b[8]=$("br",null,null,-1)),s(ee,null,{label:u(()=>[s(x),B(y(E(T)("design.referencedTable")),1)]),default:u(()=>[s(V,{modelValue:R.refTable,"onUpdate:modelValue":b[2]||(b[2]=M=>R.refTable=M),size:"small",filterable:"",class:"!w-[170px] mr-4"},{default:u(()=>[(d(!0),U(Z,null,oe(i.value,M=>(d(),w(X,{key:M.name,label:M.name,value:M.name,onClick:S=>_(M.id)},null,8,["label","value","onClick"]))),128))]),_:1},8,["modelValue"])]),_:1}),s(ee,null,{label:u(()=>[s(x),B(y(E(T)("design.referencedColumn")),1)]),default:u(()=>[s(V,{modelValue:R.refColumn,"onUpdate:modelValue":b[3]||(b[3]=M=>R.refColumn=M),size:"small",filterable:"",class:"!w-[170px]"},{default:u(()=>[(d(!0),U(Z,null,oe(o.value,M=>(d(),w(X,{key:M.name,label:M.name,value:M.name},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1}),s(ee,{label:"On Update"},{default:u(()=>[s(V,{modelValue:R.onUpdate,"onUpdate:modelValue":b[4]||(b[4]=M=>R.onUpdate=M),size:"small",filterable:"",class:"!w-[170px] mr-4"},{default:u(()=>[(d(!0),U(Z,null,oe(m.value,M=>(d(),w(X,{key:M,label:M,value:M},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1}),s(ee,{label:"On Delete"},{default:u(()=>[s(V,{modelValue:R.onDelete,"onUpdate:modelValue":b[5]||(b[5]=M=>R.onDelete=M),size:"small",filterable:"",class:"!w-[170px]"},{default:u(()=>[(d(!0),U(Z,null,oe(m.value,M=>(d(),w(X,{key:M,label:M,value:M},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1},8,["modelValue","title"])])}}}),Lt={key:0,ref:"infoPanel",class:"design-toolbar"},bt=["title"],Mt={class:"text-center"},It={class:"max-h-[300px] overflow-y-auto"},$t=["onClick"],ht=me({__name:"ColumnPanel",setup(c){const e=_e(),{dbType:t,columns:n,dialect:r,canAlterTable:l,remainHeight:a,activePanel:i}=Re(e),o=ae({visible:!1,inputting:!1}),m=P(()=>r.value.columnTypes()),L=H([]),O=H(!1),R=H(!0),v=H([]),_=ae({name:"",type:"",unsigned:null,zerofill:null,comment:null,isNotNull:null,defaultValue:null,useCurrentTimestamp:null}),C=ae({isNew:!0,editDisable:!1,editVisible:!1,editLoading:!1}),I=P(()=>{var S,p;return g.value&&((p=(S=_.type)==null?void 0:S.match)==null?void 0:p.call(S,/(\bint|decimal|float|double)/i))}),h=P(()=>{var S,p;return g.value&&((p=(S=_.type)==null?void 0:S.match)==null?void 0:p.call(S,/timestamp/i))}),K=P(()=>window.innerWidth<=1200),g=P(()=>["MySQL","Doris","MariaDB"].includes(t.value)),b=P(()=>{const S=C.isNew?"design.newColumn":"design.updateColumn";return T(S)}),G=P(()=>o.inputting&&_.type?m.value.filter(S=>(S.label||S).match(new RegExp(_.type,"i"))):m.value),j=P(()=>{if(C.isNew){const{name:S,type:p}=_;return S&&p?r.value.newColumn(_):""}I.value||(_.zerofill=!1,_.unsigned=!1),h.value||(_.useCurrentTimestamp=!1);try{return r.value.updateColumn({newColumnName:_.name,columnType:_.type,nullable:!_.isNotNull,..._})}catch(S){return console.error(S),C.editDisable=!0,S}}),q=P(()=>[N.MYSQL,N.MARIA_DB,N.PG,N.DB2].includes(t.value));Te(()=>{D.on("designMetaNext",S=>{v.value=Ge.clone(S.columns),C.editVisible=!1,R.value=!1}).on("columns",S=>{v.value=Ge.clone(S),R.value=!1}).on("indexes",S=>{O.value=!0,L.value=S.filter(p=>Be(p.isUnique)).map(p=>p.column_name)}).on("success",S=>{S=="column"&&(C.editLoading=!1,C.editVisible=!1,V())}).on("error",()=>{C.editLoading=!1,V()})});const le=(...S)=>!S.includes(t.value),x=S=>{S&&(_.defaultValue="CURRENT_TIMESTAMP")},X=()=>{const S=G.value[0];S&&(_.type=S.value||S,o.visible=!1)},V=()=>{D.emit("columns"),R.value=!0},ee=()=>{_.name="",_.type="",C.isNew=!0,C.editVisible=!0},Ae=S=>{Object.assign(_,{...S,columnName:S.name,oldRow:S}),C.isNew=!1,C.editVisible=!0,C.editDisable=!1,C.editLoading=!1},F=(S,p)=>{C.isNew=!1,Object.assign(_,{...S,columnName:S.name,oldRow:v.value[p]}),de()},de=()=>{if(!j.value)return we("No any change!");if(C.editLoading=!0,C.isNew)return ye();try{D.emit("execute",{type:"column",sql:j.value})}catch(S){we(S.message),C.editLoading=!1}},ye=()=>{D.emit("execute",{type:"column",sql:j.value})},M=S=>{De(T("design.deleteColumnConfirm")).then(()=>{D.emit("execute",{type:"column",sql:r.value.dropColumn(S.name)})})};return(S,p)=>{const Ne=k("vsc-button"),ke=k("vsc-tooltip"),J=be,se=Je,nt=Me,Ye=k("RedMark"),fe=Le,ue=Ie,at=ut,rt=$e,lt=he,st=Se;return d(),U("div",null,[E(l)?(d(),U("div",Lt,[s(ke,{title:E(T)("common.new")},{default:u(()=>[s(Ne,{type:"icon",icon:"codicon-add text-base",onClick:ee})]),_:1},8,["title"]),s(ke,{title:E(T)("common.refresh")},{default:u(()=>[s(Ne,{type:"icon",icon:"codicon-refresh text-base",onClick:V})]),_:1},8,["title"])],512)):f("",!0),E(i)=="column"?W((d(),w(nt,{key:1,data:E(n),height:E(a),border:"",onRowDblclick:Ae},{default:u(()=>[s(J,{resizable:!0,align:"center",prop:"name",label:E(T)("common.name"),width:"180"},null,8,["label"]),s(J,{resizable:!0,align:"center",prop:"type",label:E(T)("common.type"),width:K.value?100:130},null,8,["label","width"]),s(J,{resizable:!0,align:"center",prop:"maximum_length",width:80,label:E(T)("design.length")},null,8,["label"]),["DuckDB"].includes(E(t))?f("",!0):(d(),w(J,{key:0,resizable:!0,align:"center",prop:"comment",label:E(T)("common.comment"),width:"100"},{default:u(({row:A})=>[$("span",{title:A==null?void 0:A.comment},y(A==null?void 0:A.comment),9,bt)]),_:1},8,["label"])),s(J,{resizable:!0,align:"center",prop:"defaultValue",width:K.value?75:110,label:E(T)("common.default")},null,8,["width","label"]),s(J,{align:"center",label:"Not Null",width:80},{default:u(({row:A,$index:te})=>[s(se,{modelValue:A.isNotNull,"onUpdate:modelValue":z=>A.isNotNull=z,onChange:z=>F(A,te)},null,8,["modelValue","onUpdate:modelValue","onChange"])]),_:1}),s(J,{align:"center",label:E(T)("design.isPrimary"),width:110},{default:u(({row:A})=>[s(se,{disabled:"","model-value":A.isPrimary},null,8,["model-value"])]),_:1},8,["label"]),O.value||["MySQL","MariaDB","Doris"].includes(E(t))?(d(),w(J,{key:1,align:"center",label:E(T)("design.isUnique"),width:80},{default:u(({row:A})=>[s(se,{disabled:"","model-value":A.isUnique||L.value.includes(A.name)},null,8,["model-value"])]),_:1},8,["label"])):f("",!0),["DuckDB"].includes(E(t))?f("",!0):(d(),w(J,{key:2,align:"center",label:E(T)("design.isAutoIncrement"),width:"130"},{default:u(({row:A,$index:te})=>[s(se,{modelValue:A.isAutoIncrement,"onUpdate:modelValue":z=>A.isAutoIncrement=z,disabled:!A.isPrimary||!q.value,onChange:z=>F(A,te)},null,8,["modelValue","onUpdate:modelValue","disabled","onChange"])]),_:1},8,["label"])),["SQLite"].includes(E(t))?f("",!0):(d(),w(J,{key:3,label:E(T)("design.operation"),width:"100"},{default:u(({row:A})=>[$("div",Mt,[s(Ne,{type:"icon",icon:"codicon-edit",title:"edit",onClick:te=>Ae(A)},null,8,["onClick"]),s(Ne,{type:"icon",icon:"el-icon-delete",style:{color:"#f56c6c"},title:"delete",onClick:te=>M(A)},null,8,["onClick"])])]),_:1},8,["label"])),g.value?(d(),U(Z,{key:4},[s(J,{align:"center",label:"UNSIGNED",width:"100"},{default:u(({row:A,$index:te})=>[s(se,{modelValue:A.unsigned,"onUpdate:modelValue":z=>A.unsigned=z,"true-value":"1","false-value":"0",onChange:z=>F(A,te)},null,8,["modelValue","onUpdate:modelValue","onChange"])]),_:1}),s(J,{align:"center",label:"Zerofill",width:"80"},{default:u(({row:A,$index:te})=>[s(se,{modelValue:A.zerofill,"onUpdate:modelValue":z=>A.zerofill=z,"true-value":"1","false-value":"0",onChange:z=>F(A,te)},null,8,["modelValue","onUpdate:modelValue","onChange"])]),_:1})],64)):f("",!0)]),_:1},8,["data","height"])),[[st,R.value]]):f("",!0),s(lt,{modelValue:C.editVisible,"onUpdate:modelValue":p[12]||(p[12]=A=>C.editVisible=A),"show-close":!1,title:b.value,width:"680px",closeOnClickModal:!1,"close-on-press-escape":!1,center:""},{footer:u(()=>[s(Ne,{type:"secondary",onClick:p[11]||(p[11]=A=>C.editVisible=!1)},{default:u(()=>[B(y(E(T)("common.cancel")),1)]),_:1}),s(Ne,{type:"primary",loading:C.editLoading,disabled:C.editDisable,onClick:de},{default:u(()=>[B(y(E(T)("common.ok")),1)]),_:1},8,["loading","disabled"]),p[14]||(p[14]=$("br",null,null,-1)),p[15]||(p[15]=B()),p[16]||(p[16]=$("br",null,null,-1)),W(s(Ce,{ref:"cmEditor",value:j.value,readonly:!0},null,8,["value"]),[[ne,j.value]])]),default:u(()=>[s(rt,{inline:!0,"label-width":"90px",size:"small"},{default:u(()=>[s(ue,null,{label:u(()=>[s(Ye),B(y(E(T)("common.name")),1)]),default:u(()=>[s(fe,{modelValue:_.name,"onUpdate:modelValue":p[0]||(p[0]=A=>_.name=A),size:"small",fixed:""},null,8,["modelValue"])]),_:1}),I.value?(d(),w(ue,{key:0,label:"ZEROFILL"},{default:u(()=>[s(se,{modelValue:_.zerofill,"onUpdate:modelValue":p[1]||(p[1]=A=>_.zerofill=A),"true-value":"1","false-value":"0"},null,8,["modelValue"])]),_:1})):f("",!0),h.value?(d(),w(ue,{key:1,label:"CURRENT_TIMESTAMP","label-width":"160px"},{default:u(()=>[s(se,{modelValue:_.useCurrentTimestamp,"onUpdate:modelValue":p[2]||(p[2]=A=>_.useCurrentTimestamp=A),onChange:x},null,8,["modelValue"])]),_:1})):f("",!0),p[13]||(p[13]=$("br",null,null,-1)),s(ue,null,{label:u(()=>[s(Ye),B(y(E(T)("common.type")),1)]),default:u(()=>[s(at,{visible:o.visible,"onUpdate:visible":p[6]||(p[6]=A=>o.visible=A),placement:"bottom-start","popper-class":"!p-0",trigger:"click",tabindex:null},{reference:u(()=>[s(fe,{modelValue:_.type,"onUpdate:modelValue":p[3]||(p[3]=A=>_.type=A),size:"small",fixed:"",onKeyup:Oe(X,["enter"]),onInput:p[4]||(p[4]=A=>{o.inputting=!0,o.visible=!0}),onClick:p[5]||(p[5]=A=>o.inputting=!1)},null,8,["modelValue"])]),default:u(()=>[$("div",It,[(d(!0),U(Z,null,oe(G.value,(A,te)=>(d(),U(Z,null,[A=="hr"?(d(),U("div",{key:te,class:"w-full type-hr bg-bg"})):(d(),U("div",{key:1,class:"el-select-dropdown__item !h-6 min-w-[190px] bg-[var(--vscode-dropdown-background)]",onClick:z=>{_.type=A.value||A,o.visible=!1}},y(A.label||A),9,$t))],64))),256))])]),_:1},8,["visible"])]),_:1}),le("ClickHouse")?(d(),w(ue,{key:2,label:E(T)("design.isNotNull")},{default:u(()=>[s(se,{modelValue:_.isNotNull,"onUpdate:modelValue":p[7]||(p[7]=A=>_.isNotNull=A)},null,8,["modelValue"])]),_:1},8,["label"])):f("",!0),I.value?(d(),w(ue,{key:3,label:"UNSIGNED"},{default:u(()=>[s(se,{modelValue:_.unsigned,"onUpdate:modelValue":p[8]||(p[8]=A=>_.unsigned=A),"true-value":"1","false-value":"0"},null,8,["modelValue"])]),_:1})):f("",!0),!["SqlServer","Snowflake"].includes(E(t))||C.isNew?(d(),w(ue,{key:4,label:E(T)("common.default")},{default:u(()=>[s(fe,{modelValue:_.defaultValue,"onUpdate:modelValue":p[9]||(p[9]=A=>_.defaultValue=A),size:"small",fixed:""},null,8,["modelValue"])]),_:1},8,["label"])):f("",!0),["DuckDB"].includes(E(t))?f("",!0):(d(),w(ue,{key:5,label:E(T)("common.comment")},{default:u(()=>[s(fe,{modelValue:_.comment,"onUpdate:modelValue":p[10]||(p[10]=A=>_.comment=A),size:"small",fixed:""},null,8,["modelValue"])]),_:1},8,["label"]))]),_:1})]),_:1},8,["modelValue","title"])])}}}),ft=Qe(ht,[["__scopeId","data-v-9c5ea678"]]),wt={class:"ml-4"},Dt={class:"flex flex-col gap-y-2"},gt={class:"flex-wrap"},Ut={class:"inline-block mr-5"},yt={class:"font-bold mr-5 inline-block"},Bt={class:"inline-block mr-5"},vt={class:"font-bold mr-5 inline-block"},Ft={class:"flex-wrap"},Ht={key:0,class:"inline-block mr-5"},Pt={class:"font-bold mr-5 inline-block"},xt={key:1,class:"inline-block mr-5"},Vt={class:"font-bold mr-5 inline-block"},kt={class:"inline-block pt-1"},Yt=me({__name:"InfoPanel",setup(c){const e=_e(),{dialect:t}=Re(e),n=H([]),r=ae({name:null,schema:null,newTableName:null,comment:null,newComment:null,collation:null,newCollation:null});Te(()=>{D.on("designMetaNext",a=>{r.name=a.table,r.schema=a.schema,r.newTableName=a.table,r.comment=a.comment,r.newComment=a.comment,r.collation=a.collation,r.newCollation=a.collation}).on("collations",a=>{n.value=a})});const l=()=>{const a={...r,table:r.name};D.emit("updateTable",a);const i=t.value.updateTable(a);i?D.emit("execute",{type:"table",sql:i}):we("No any change!")};return(a,i)=>{const o=Le,m=ve,L=Fe,O=k("vsc-button");return d(),U("div",wt,[$("div",Dt,[$("div",gt,[$("div",Ut,[$("label",yt,y(a.$t("design.table")),1),s(o,{modelValue:r.newTableName,"onUpdate:modelValue":i[0]||(i[0]=R=>r.newTableName=R),class:"!w-48",required:"",onKeyup:Oe(l,["enter"])},null,8,["modelValue"])]),$("div",Bt,[$("label",vt,y(a.$t("common.comment")),1),s(o,{modelValue:r.newComment,"onUpdate:modelValue":i[1]||(i[1]=R=>r.newComment=R),class:"!w-48",onKeyup:Oe(l,["enter"])},null,8,["modelValue"])])]),$("div",Ft,[E(e).tableMeta.engine?(d(),U("div",Ht,[$("label",Pt,y(a.$t("design.engine")),1),s(o,{value:E(e).tableMeta.engine,class:"!w-24",disabled:""},null,8,["value"])])):f("",!0),r.collation&&n.value.length>0?(d(),U("div",xt,[$("label",Vt,y(a.$t("design.collate")),1),s(L,{modelValue:r.newCollation,"onUpdate:modelValue":i[2]||(i[2]=R=>r.newCollation=R),size:"small",filterable:""},{default:u(()=>[(d(!0),U(Z,null,oe(n.value,R=>(d(),w(m,{key:R.name,label:R.name,value:R.name},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])])):f("",!0),$("div",kt,[s(O,{type:"success",onClick:l},{default:u(()=>[B(y(a.$t("common.update")),1)]),_:1})])])])])}}}),Wt={key:0,class:"design-toolbar"},Gt={class:"text-center"},qt=me({__name:"Check",setup(c){const e=_e(),{dialect:t,canAlterTable:n,remainHeight:r,activePanel:l}=Re(e),a=H([]),i=H(!0),o=ae({visible:!1,loading:!1}),m=ae({clause:null}),L=P(()=>m.clause?t.value.newCheck(m.clause):"");Te(()=>{D.on("designMetaNext",C=>{C.isSupportCheck&&(O(),o.visible=!1)}).on("checks",C=>{i.value=!1,a.value=C}).on("success",C=>{C=="check"&&(O(),o.visible=!1,o.loading=!1)}).on("error",()=>{o.loading=!1})});const O=()=>{const C=t.value.showChecks();if(!C){console.log("This database type does not currently support check."),i.value=!1;return}i.value=!0,D.emit("checks",C)},R=()=>{o.visible=!0,o.loading=!1,m.clause=null},v=()=>{o.loading=!0,D.emit("execute",{type:"check",sql:L.value})},_=C=>{De(T("design.deleteCheckConfirm")).then(()=>{D.emit("execute",{type:"check",sql:t.value.dropCheck(C.name)})})};return(C,I)=>{const h=k("vsc-button"),K=k("vsc-tooltip"),g=be,b=Me,G=k("RedMark"),j=Le,q=Ie,le=$e,x=he,X=Se;return d(),U("div",null,[E(n)?(d(),U("div",Wt,[s(K,{title:E(T)("common.new")},{default:u(()=>[s(h,{type:"icon",icon:"codicon-add text-base",onClick:R})]),_:1},8,["title"]),s(K,{title:E(T)("common.refresh")},{default:u(()=>[s(h,{type:"icon",icon:"codicon-refresh text-base",onClick:O})]),_:1},8,["title"])])):f("",!0),E(l)=="check"?W((d(),w(b,{key:1,data:a.value,height:E(r),border:""},{default:u(()=>[E(n)?(d(),w(g,{key:0,resizable:!0,align:"center",prop:"name",label:E(T)("design.constraintName"),width:"200"},null,8,["label"])):f("",!0),s(g,{resizable:!0,align:"center",prop:"clause",label:E(T)("design.clause"),width:"200"},null,8,["label"]),E(n)?(d(),w(g,{key:1,label:E(T)("design.operation"),width:"100"},{default:u(({row:V})=>[$("div",Gt,[s(h,{type:"icon",icon:"el-icon-delete",style:{color:"#f56c6c"},title:"delete",onClick:ee=>_(V)},null,8,["onClick"])])]),_:1},8,["label"])):f("",!0)]),_:1},8,["data","height"])),[[X,i.value]]):f("",!0),s(x,{modelValue:o.visible,"onUpdate:modelValue":I[3]||(I[3]=V=>o.visible=V),"show-close":!1,title:E(T)("design.newCheck"),width:"430px",closeOnClickModal:!1,"close-on-press-escape":!1,center:""},{footer:u(()=>[s(h,{type:"secondary",onClick:I[2]||(I[2]=V=>o.visible=!1)},{default:u(()=>[B(y(E(T)("common.cancel")),1)]),_:1}),s(h,{type:"primary",loading:o.loading,onClick:v},{default:u(()=>[B(y(E(T)("common.ok")),1)]),_:1},8,["loading"]),I[4]||(I[4]=$("br",null,null,-1)),I[5]||(I[5]=B()),I[6]||(I[6]=$("br",null,null,-1)),W(s(Ce,{ref:"cmEditor",value:L.value,readonly:!0},null,8,["value"]),[[ne,L.value]])]),default:u(()=>[s(le,{inline:!0,"label-width":"80px","label-position":"left",onSubmit:I[1]||(I[1]=Xe(()=>{},["prevent"])),onKeyup:Oe(v,["enter"])},{default:u(()=>[s(q,null,{label:u(()=>[s(G),B(y(E(T)("design.clause")),1)]),default:u(()=>[s(j,{modelValue:m.clause,"onUpdate:modelValue":I[0]||(I[0]=V=>m.clause=V),class:"!w-[290px]",size:"small",placeholder:"e.g. id >20 and name!='admin'"},null,8,["modelValue"])]),_:1})]),_:1})]),_:1},8,["modelValue","title"])])}}}),Kt={key:0,class:"design-toolbar"},jt=me({__name:"Trigger",setup(c){const e=_e(),{dialect:t,canAlterTable:n,remainHeight:r,activePanel:l}=Re(e),a=H([]),i=H(!0),o=ae({visible:!1,loading:!1}),m=ae({clause:null}),L=P(()=>"");Te(()=>{D.on("designMetaNext",()=>{O(),o.visible=!1}).on("triggers",v=>{i.value=!1,a.value=v}).on("success",v=>{v=="trigger"&&(O(),o.visible=!1,o.loading=!1)}).on("error",()=>{o.loading=!1})});const O=()=>{i.value=!0,D.emit("triggers")},R=()=>{o.loading=!0,D.emit("execute",{type:"trigger",sql:L.value})};return(v,_)=>{const C=k("vsc-button"),I=k("vsc-tooltip"),h=be,K=Me,g=k("RedMark"),b=Le,G=Ie,j=$e,q=he,le=Se;return d(),U("div",null,[E(n)?(d(),U("div",Kt,[s(I,{title:E(T)("common.refresh")},{default:u(()=>[s(C,{type:"icon",icon:"codicon-refresh text-base",onClick:O})]),_:1},8,["title"])])):f("",!0),E(l)=="trigger"?W((d(),w(K,{key:1,data:a.value,height:E(r),border:""},{default:u(()=>[s(h,{resizable:!0,align:"center",prop:"trigger_name",label:E(T)("design.triggerName"),width:"200"},null,8,["label"]),s(h,{resizable:!0,align:"center",prop:"timing",label:E(T)("design.timing"),width:"200"},null,8,["label"]),s(h,{resizable:!0,align:"center",prop:"manipulation",label:E(T)("design.manipulation"),width:"200"},null,8,["label"]),s(h,{resizable:!0,align:"center",prop:"orientation",label:E(T)("design.orientation"),width:"200"},null,8,["label"]),s(h,{resizable:!0,align:"center",prop:"statement",label:E(T)("design.statement"),width:"200"},{default:u(x=>[B(y(x.row.source||x.row.statement),1)]),_:1},8,["label"])]),_:1},8,["data","height"])),[[le,i.value]]):f("",!0),s(q,{modelValue:o.visible,"onUpdate:modelValue":_[3]||(_[3]=x=>o.visible=x),"show-close":!1,title:E(T)("design.newTrigger"),width:"430px",closeOnClickModal:!1,"close-on-press-escape":!1,center:""},{footer:u(()=>[s(C,{type:"secondary",onClick:_[2]||(_[2]=x=>o.visible=!1)},{default:u(()=>[B(y(E(T)("common.cancel")),1)]),_:1}),s(C,{type:"primary",loading:o.loading,onClick:R},{default:u(()=>[B(y(E(T)("common.ok")),1)]),_:1},8,["loading"]),_[4]||(_[4]=$("br",null,null,-1)),_[5]||(_[5]=B()),_[6]||(_[6]=$("br",null,null,-1)),W(s(Ce,{ref:"cmEditor",value:L.value,readonly:!0},null,8,["value"]),[[ne,L.value]])]),default:u(()=>[s(j,{inline:!0,"label-width":"80px","label-position":"left",onSubmit:_[1]||(_[1]=Xe(()=>{},["prevent"])),onKeyup:Oe(R,["enter"])},{default:u(()=>[s(G,null,{label:u(()=>[s(g),B(y(E(T)("design.clause")),1)]),default:u(()=>[s(b,{modelValue:m.clause,"onUpdate:modelValue":_[0]||(_[0]=x=>m.clause=x),class:"!w-[290px]",size:"small",placeholder:"e.g. AFTER INSERT ON table_name FOR EACH ROW"},null,8,["modelValue"])]),_:1})]),_:1})]),_:1},8,["modelValue","title"])])}}});class Ee{showAllComments(){return null}showAllForeignKeys(){return null}showAllConstraints(){return null}dropIndex(e,t){throw new Error("Method not implemented.")}showVersion(){return null}showIndex(e,t){return null}createIndex(e){return null}showDatabases(){return null}updateUser(e){return null}showCollations(){return null}showPackages(e){return null}showChecks(e,t){return null}showPartitions(e,t){return null}showActualPartitions(e,t){return null}showForeignKeys(e,t){return null}updateColumnSql(e){throw new Error("Method not implemented.")}showMaterialViews(e,t){return""}showTriggers(e,t){return null}showSequences(e){return null}showCustomTypes(e){return null}showExternalTables(e){return`select foreign_table_name "name",foreign_server_name "server",foreign_server_catalog "server_db" from information_schema.foreign_tables where foreign_table_schema='${e}';`}showEvents(e){return`SELECT EVENT_NAME "name" FROM information_schema.EVENTS where EVENT_SCHEMA='${e}' ORDER BY EVENT_NAME;`}dropEventTemplate(e){return`DROP EVENT IF EXISTS ${e};`}showTableSource(e,t){return null}materializedViewTemplate(){return this.viewTemplate(!0)}triggerTemplate(e){return`CREATE TRIGGER trigger_name$1
[BEFORE/AFTER] INSERT ON ${e??"[table_name]$2"}
FOR EACH ROW BEGIN
    $3
END;`}eventTemplate(){return`CREATE EVENT event_name$1
ON SCHEDULE AT CURRENT_TIMESTAMP + INTERVAL 1 HOUR
DO
BEGIN
    SELECT now()$2;
END;`}kill(e){return null}pingDataBase(e,t){return null}dropTriggerTemplate(e,t){return`DROP TRIGGER ${e}`}}class Qt extends Ee{showVersion(){return"select version() server_version"}createIndex(e){const t=e.indexType||"btree";return`CREATE INDEX ${e.column}_${new Date().getTime()}_index ON ${e.table} USING ${t} (${e.column})`}dropIndex(e,t){return`DROP INDEX ${t}`}showIndex(e,t){return`select name index_name,is_in_sorting_key indexdef  FROM system.columns WHERE database = '${e}' and table ='${t}' and indexdef=1`}variableList(){return"select name , value as setting,description from system.settings s "}statusList(){return"select name as db , engine as status from system.databases d "}kill(e){return`KILL QUERY WHERE query_id='${e.ID}'`}processList(){return`
    SELECT query_id AS "ID", user AS "User",
    current_database AS "DB",os_user AS "State",
    addSeconds(now(), elapsed) AS "Time",
    query AS "SQL"
    FROM system.processes p 
    ORDER BY elapsed desc`}addColumn(e,t){return`ALTER TABLE ${e} 
    ADD COLUMN [column] [type]`}createUser(){return"CREATE USER [name] WITH PASSWORD 'password'"}updateColumn(e,t){const{name:n,type:r,comment:l,nullable:a,defaultValue:i}=t;return`-- change column type
ALTER TABLE ${e} 
    ALTER COLUMN ${n} TYPE ${r};
-- change column name
ALTER TABLE ${e}  
    RENAME COLUMN ${n} TO [newColumnName]`}updateColumnSql(e){const{columnName:t,columnType:n,newColumnName:r,comment:l,table:a,defaultValue:i,oldRow:o}=e;return console.log(n,o),new Y("",`
`).if(n!=o.type,`ALTER TABLE ${a} ALTER COLUMN ${t} TYPE ${n};`).if(i&&i!=o.defaultValue,`ALTER TABLE ${a} MODIFY COLUMN ${t} DEFAULT ${re(i,n)};`).if(l&&l!=o.comment,`ALTER TABLE ${a} MODIFY COLUMN ${t} COMMENT '${l}';`).if(t!=r,`ALTER TABLE ${a} RENAME COLUMN ${t} TO ${r};`).toString()}showUsers(){return"SELECT * FROM system.users"}updateTable(e){const{table:t,newTableName:n,comment:r,newComment:l}=e;let a="";return l&&l!=r&&(a=`ALTER TABLE ${t} MODIFY COMMENT '${l}';`),n&&t!=n&&(a+=`ALTER TABLE ${t} RENAME TO ${n};`),a}truncateDatabase(e){return`SELECT Concat('TRUNCATE TABLE "',TABLE_NAME, '";') trun FROM INFORMATION_SCHEMA.TABLES WHERE  table_schema ='${e}' AND table_type='BASE TABLE';`}createDatabase(e){return"CREATE DATABASE $1"}showTableSource(e,t){return`SELECT create_table_query as "Create Table",name as table_name,'definition' as view_definition from system.tables WHERE database='${e}' and name='${t}'`}showViewSource(e,t){return`SELECT create_table_query as "Create View",name as table_name,'definition' as view_definition from system.tables WHERE database='${e}' and name='${t}'`}showProcedureSource(e,t){return"select number from system.numbers where 1=0"}showFunctionSource(e,t){return"select number from system.numbers where 1=0"}showTriggerSource(e,t){return"select number from system.numbers where 1=0"}showColumns(e,t){return`select name,type, null as maximum_length,default_expression as defaultValue,is_in_primary_key as key from system.columns c where database='${e}' and table='${t}' `}showProcedures(e){return"select number from system.numbers where 1=0"}showFunctions(e){return`select name as "ROUTINE_NAME" from system.functions  where origin !='System'`}showViews(e){return`select name ,engine as type from system.tables where database='${e}' and engine = 'View' ORDER BY name`}buildPageSql(e,t,n){return`SELECT * FROM ${t} LIMIT ${n}`}showTables(e){return`select name, engine as type from system.tables where database='${e}' and engine <> 'View' ORDER BY name`}showDatabases(){return"SELECT name as Database FROM system.databases where name not in ('information_schema','INFORMATION_SCHEMA') order by name ASC"}showSchemas(){return this.showDatabases()}tableTemplate(){return`CREATE TABLE table_name$1(  
    id UUID,
    create_time DATETIME,
    name$2 String
)
ENGINE = MergeTree()
ORDER BY (id)
PRIMARY KEY(id);`}viewTemplate(){return`CREATE VIEW $1
AS
SELECT * FROM $2`}procedureTemplate(){return"select number from system.numbers where 1=0"}functionTemplate(){return"CREATE FUNCTION [func_name] AS (a, b, c) -> a * b * c;"}}class ge{constructor(e){this.param=e,this.afterTablePrefix=`ALTER TABLE "${e.table}"`,this.afterColumnPrefix=`${this.afterTablePrefix} ALTER COLUMN "${e.columnName}"`}genAlterSQL(){const{columnName:e,newColumnName:t}=this.param;return new Y("",`
`).append(this.changeTypePart()).append(this.notNullPart()).append(this.defaultPart()).append(this.otherPart()).append(this.commentPart()).if(e!=t,`${this.afterTablePrefix} RENAME COLUMN "${e}" TO "${t}";`).toString()}changeTypePart(){const{oldRow:e,columnType:t}=this.param;return e.type==t?"":`${this.afterColumnPrefix} TYPE ${t};`}notNullPart(){const{oldRow:e,isNotNull:t}=this.param;return e.isNotNull==t?"":`${this.afterColumnPrefix} ${t?"SET NOT NULL":"DROP NOT NULL"};`}otherPart(){return null}defaultPart(){const{oldRow:e,defaultValue:t,columnType:n}=this.param;return e.defaultValue==t?"":`${this.afterColumnPrefix} ${Q(t)?"DROP DEFAULT":`SET DEFAULT ${re(t,n)}`};`}commentPart(){return""}}class pe extends Ee{showVersion(){return""}createIndex(e){return`ALTER TABLE ${e.table} ADD ${e.type||"key"} ("${e.column||"[column]"}")`}dropIndex(e,t){return`DROP INDEX "${t}"`}showIndex(e,t){return null}variableList(){return null}statusList(){return null}processList(){return null}addColumn(e,t){const n=t?` AFTER "${t}"`:"";return`ALTER TABLE ${e}
    ADD COLUMN [column] [type] COMMENT ''${n};`}createUser(){return`CREATE USER 'username'@'%' IDENTIFIED BY 'password';
-- Grant select privilege to all databases;
GRANT SELECT ON *.* TO 'username'@'%' WITH GRANT OPTION;
-- Grant all privileges to all databases;
GRANT ALL PRIVILEGES ON *.* TO 'username'@'%' WITH GRANT OPTION;`}updateUser(e){return`update mysql.user set
    password = PASSWORD("newPassword")
    where User = '${e}';
FLUSH PRIVILEGES;
-- since mysql version 5.7, password column need change to authentication_string=PASSWORD("newPassword")`}updateColumn(e,t){var O;const{name:n,type:r,comment:l,nullable:a,defaultValue:i,extra:o,character_set_name:m,collation_name:L}=t;return new Y(`ALTER TABLE ${e}`).append(`
	CHANGE ${n} ${n} ${r}`).if(m,`CHARACTER SET ${m}`).if(L,`COLLATE ${L}`).if(a!="YES","NOT NULL").if((O=o==null?void 0:o.toLowerCase())==null?void 0:O.includes("auto_increment"),"AUTO_INCREMENT").if(l,`COMMENT '${l}'`).if(i,`DEFAULT ${i=="CURRENT_TIMESTAMP"?i:`'${i}'`}`).toString()}updateColumnSql(e){return new ge(e).genAlterSQL()}showUsers(){return"SELECT concat(user,'@',host) user FROM mysql.user;"}updateTable(e){const{table:t,newTableName:n,comment:r,newComment:l}=e;let a="";return l&&l!=r&&(a=`COMMENT ON TABLE "${t}" IS '${l}';`),n&&t!=n&&(a+=`RENAME TABLE "${t}" TO "${n}";`),a}truncateDatabase(e){return`SELECT Concat('TRUNCATE TABLE "',table_schema,'"."',TABLE_NAME, '";') trun FROM INFORMATION_SCHEMA.TABLES where  table_schema ='${e}' and TABLE_TYPE<>'VIEW';`}createDatabase(e){return"CREATE DATABASE $1;"}showTableSource(e,t){return`SHOW CREATE TABLE ${e}.${t};`}showViewSource(e,t,n){return`SHOW CREATE VIEW database.${t};`}showProcedureSource(e,t){return`SHOW CREATE PROCEDURE database.${t};`}showFunctionSource(e,t,n){return`SHOW CREATE FUNCTION database.${t};`}showTriggerSource(e,t){return`SHOW CREATE TRIGGER database.${t};`}showColumns(e,t){return`SELECT COLUMN_NAME name,DATA_TYPE type, IS_NULLABLE nullable
            FROM information_schema.columns WHERE table_schema = '${e}' AND table_name = '${t}' ORDER BY ORDINAL_POSITION;`}showTriggers(e,t){return""}showProcedures(e){return""}showFunctions(e){return""}buildPageSql(e,t,n){return`SELECT * FROM ${t} LIMIT ${n};`}showTables(e,t=e){return`SELECT TABLE_NAME "name" FROM information_schema.TABLES  WHERE TABLE_SCHEMA = '${t}' and TABLE_TYPE<>'VIEW' ORDER BY TABLE_NAME;`}showViews(e,t=e){return`SELECT TABLE_NAME name FROM information_schema.VIEWS  WHERE TABLE_SCHEMA = '${t}' ORDER BY TABLE_NAME`}showDatabases(){return'SELECT SCHEMA_NAME "Database" FROM information_schema.schemata ORDER BY "Database";'}showSchemas(e){return'SELECT SCHEMA_NAME "schema" FROM information_schema.schemata ORDER BY "schema";'}tableTemplate(e){return`CREATE TABLE table_name$1(
    id int,
    create_time DATE,
    update_time DATE,
    content VARCHAR(255)
);`}viewTemplate(){return`CREATE VIEW view_name$1
AS
SELECT * FROM `}procedureTemplate(){return`CREATE PROCEDURE procedure_name$1()
BEGIN
    $2
END;`}functionTemplate(){return`CREATE FUNCTION function_name$1() RETURNS int
BEGIN
    $2
    return 0;
END;`}}class He extends Ee{updateColumn(e,t){return null}showSchemas(e){return null}showTables(e,t){return null}addColumn(e,t){return null}showColumns(e,t,n){return null}showViews(e,t){return null}showUsers(){return null}createUser(){return null}showTriggers(e,t){return null}showProcedures(e){return null}showFunctions(e){return null}buildPageSql(e,t,n){return null}createDatabase(e){return null}truncateDatabase(e){return null}updateTable(e){return null}showViewSource(e,t,n){return null}showProcedureSource(e,t){return null}showFunctionSource(e,t,n){return null}showTriggerSource(e,t){return null}tableTemplate(e){return null}viewTemplate(e){return null}procedureTemplate(){return null}functionTemplate(){return null}processList(){return null}variableList(){return null}statusList(){return null}}class ze extends Ee{showVersion(){return`select RTRIM(SUBSTR(REPLACE(banner,'Oracle Database ',''),1,3)) "server_version" from v$version where rownum=1`}showAllForeignKeys(){return`SELECT 
    a.constraint_name AS "constraint_name",
    a.owner AS "table_schema",
    a.table_name AS "table_name",
    a.column_name AS "column_name",
    c.owner AS "referenced_schema",
    c.table_name AS "referenced_table",
    c.column_name AS "referenced_column"
FROM 
    ALL_CONS_COLUMNS a 
JOIN 
    ALL_CONSTRAINTS b ON a.owner = b.owner AND a.constraint_name = b.constraint_name
JOIN 
    ALL_CONS_COLUMNS c ON b.r_owner = c.owner AND b.r_constraint_name = c.constraint_name
WHERE 
    b.constraint_type = 'R'
    and a.owner not in ('SYS','APEX_040200')`}showAllConstraints(){return`SELECT 
        b.CONSTRAINT_NAME "constraint_name",
        c.CONSTRAINT_TYPE "constraint_type",
        b.owner "table_schema",
        b.table_name "table_name",
        b.COLUMN_NAME "column_name"
         FROM ALL_CONS_COLUMNS b 
          join ALL_CONSTRAINTS c on b.CONSTRAINT_NAME=c.CONSTRAINT_NAME 
          WHERE CONSTRAINT_TYPE='P'
          and b.owner not in ('SYS','APEX_040200')`}showAllComments(){return`SELECT 
        owner "table_schema",
        table_name "table_name",
        COLUMN_NAME "column_name",
        COMMENTS "comment"
         FROM all_col_comments WHERE COMMENTS is not null
         and owner not in ('SYS','APEX_040200')`}createIndex(e){const{table:t,column:n}=e;return`CREATE INDEX ${`${t}_${n}`} ON ${t}(${n})`}dropIndex(e,t){return`DROP INDEX ${t}`}showIndex(e,t){return`SELECT 
col.COLUMN_NAME "column_name",col.INDEX_NAME "index_name",idx.UNIQUENESS='UNIQUE' "isUnique"
from ALL_IND_COLUMNS col
join ALL_INDEXES idx on col.index_name = idx.index_name
WHERE col.TABLE_OWNER='${e}'
     and col.TABLE_NAME='${t}';`}variableList(){return"show global VARIABLES"}statusList(){return"show global status"}kill(e){const{SID:t,SERIAL:n}=e;return`ALTER SYSTEM KILL SESSION '${t},${n}' IMMEDIATE;`}processList(){return`SELECT 
        SID, SERIAL# as SERIAL,
        s.username "User", s.schemaname "Schema", 
        s.status "Status", 
        sql.sql_text SQL
        FROM v$session s,
             v$sql     sql
       WHERE sql.sql_id(+) = s.sql_id
         AND s.type     = 'USER'`}addColumn(e,t){return`ALTER TABLE ${e} 
    ADD [column] [type];
COMMENT ON COLUMN ${e}.[column] IS 'comment'`}createUser(){return`CREATE USER $1 IDENTIFIED BY [password$2];
GRANT CONNECT TO $1;
ALTER USER $1 quota unlimited on USERS;
        `}updateUser(e){return`ALTER USER ${e} IDENTIFIED BY [new_password]`}updateColumn(e,t){const{name:n,type:r,comment:l,nullable:a,defaultValue:i}=t;return`-- change column type
ALTER TABLE ${e} MODIFY ${n} ${r};
-- change column name
ALTER TABLE ${e} RENAME COLUMN ${n} TO [newColumnName];
COMMENT ON COLUMN ${e}.${n} IS '${l||""}'`}updateColumnSql(e){const{columnName:t,columnType:n,newColumnName:r,comment:l,defaultValue:a,table:i,isNotNull:o,oldRow:m}=e;return new Y("","").if(n!=m.type,`ALTER TABLE "${i}" MODIFY "${t}" ${n};`).if(o!=m.isNotNull,`
ALTER TABLE "${i}" MODIFY "${t}"${o?"NOT NULL":"NULL"};`).if(a!=null&&a!=m.defaultValue,`
ALTER TABLE "${i}" MODIFY "${t}" DEFAULT ${a!=null&&a.match(/(:|nextval)/i)?a:`'${a==null?void 0:a.replace(/(^'|'$)/g,"")}'`};`).if(l&&l!=m.comment,`
COMMENT ON COLUMN "${i}"."${t}" is '${l}';`).if(t!=r,`
ALTER TABLE "${i}" RENAME COLUMN "${t}" TO "${r}";`).toString()}showUsers(){return'SELECT username "user" FROM all_users'}pingDataBase(e){return e?`ALTER SESSION SET current_schema = "${e}"`:null}updateTable(e){const{table:t,newTableName:n,comment:r,newComment:l}=e;let a="";return l&&l!=r&&(a=`COMMENT ON TABLE "${t}" IS '${l}';`),n&&t!=n&&(a+=`ALTER TABLE "${t}" RENAME TO "${n}"`),a}truncateDatabase(e){return`SELECT 'TRUNCATE TABLE "' || owner || '"."' || object_name || '";' trun FROM all_objects where  owner ='${e}' and object_type ='TABLE'`}createDatabase(e){return"CREATE USER $1 IDENTIFIED BY password$2;"}showViewSource(e,t,n){return n?`select QUERY "Create View" from ALL_MVIEWS where OWNER='${e}' and mview_name='${t}'`:`SELECT DBMS_METADATA.GET_DDL('VIEW', '${t}', '${e}') AS VIEW_DDL FROM DUAL;`}showProcedureSource(e,t){return`SELECT text "Create Procedure"
        FROM all_source
       WHERE owner = '${e}'
         AND name  = '${t}'
       ORDER BY line`}showFunctionSource(e,t){return`SELECT 'CREATE ' || LISTAGG(text) within group( order by line ) "source"
        FROM all_source
       WHERE owner = '${e}'
         AND name  = '${t}'
       ORDER BY line`}showTriggerSource(e,t){return`SELECT text
        FROM all_source
       WHERE owner = '${e}'
         AND name  = '${t}'
       ORDER BY line`}showColumns(e,t){return e?`select
        a.COLUMN_NAME "name",
        a.DATA_DEFAULT "defaultValue",
        a.DATA_PRECISION "precision",
        a.DATA_SCALE "scale",
        a.DATA_TYPE "type",
        COALESCE(a.DATA_PRECISION, a.data_length) "maximum_length",
        a.NULLABLE "nullable"
      from
        all_tab_columns a
      where
        a.owner = '${e}'
        and a.table_name = '${t}'`:`select
a.COLUMN_NAME "name",
a.DATA_DEFAULT "defaultValue",
a.DATA_PRECISION "precision",
a.DATA_SCALE "scale",
a.DATA_TYPE "type",
COALESCE(a.DATA_PRECISION, a.data_length) "maximum_length",
a.NULLABLE "nullable"
from
    user_tab_columns a
where
a.table_name = '${t}'`}showChecks(e,t){return`SELECT
        c.constraint_name "name",
        c.search_condition "clause"
    FROM
        all_constraints c
    WHERE
        c.owner = '${e}' and
        c.table_name = '${t}'
        AND c.constraint_type = 'C';`}showForeignKeys(e,t){let n=`select
        b.CONSTRAINT_NAME "constraint_name",
        b.COLUMN_NAME "column_name",
        c_pk.table_name "referenced_table",
        b_pk.COLUMN_NAME "referenced_column"
    from ALL_CONS_COLUMNS b
        join ALL_CONSTRAINTS c on b.owner=c.owner and b.CONSTRAINT_NAME = c.CONSTRAINT_NAME
        JOIN all_constraints c_pk ON c.r_owner = c_pk.owner AND c.r_constraint_name = c_pk.constraint_name
        join ALL_CONS_COLUMNS b_pk on b_pk.CONSTRAINT_NAME = c_pk.CONSTRAINT_NAME
    where
        b.owner = '${e}' and
        b.table_name = '${t}'
        and c.CONSTRAINT_TYPE = 'R';`;return e||(n=n.replace(/all_/ig,"USER_").replace("b.owner = 'undefined' and","")),n}showTriggers(e,t){const n=t?` AND TABLE_NAME='${t}'`:"";return`SELECT TRIGGER_NAME "trigger_name",TABLE_NAME "table_name",TRIGGERING_EVENT "event" FROM all_triggers WHERE TABLE_OWNER='${e}' ${n} ORDER BY TRIGGER_NAME`}showPackages(e){return`SELECT 
                    object_name "name" ,
                    status "status"
                FROM 
                    ALL_OBJECTS 
                WHERE 
                    OBJECT_TYPE IN ('PACKAGE') 
                    AND owner='${e}' 
                ORDER BY 
                    "name"`}showProcedures(e){return`SELECT 
                    object_name "ROUTINE_NAME" ,
                    status "status"
                FROM 
                    all_objects 
                WHERE 
                    object_type = 'PROCEDURE' 
                    AND owner = '${e}' 
                ORDER BY 
                    "ROUTINE_NAME"`}showFunctions(e){return`SELECT 
                    object_name "ROUTINE_NAME" ,
                    status "status"
                FROM 
                    all_objects 
                WHERE 
                    object_type = 'FUNCTION' 
                    AND owner='${e}' 
                ORDER BY 
                    "ROUTINE_NAME"`}showViews(e,t){return`select object_type "type",object_name "name" from all_objects where object_type = 'VIEW' and owner='${t}' ORDER BY "type","name"`}showMaterialViews(e,t){return`select object_type "type",object_name "name" from all_objects where object_type = 'MATERIALIZED VIEW' and owner='${t}' ORDER BY "type","name"`}buildPageSql(e,t,n){return`SELECT * FROM ${t} WHERE ROWNUM <= ${n}`}showTables(e,t){return`select o.object_name "name", nvl(t.num_rows, -1) "table_rows", c.comments "comment" from all_objects o
        LEFT JOIN all_tables t on o.owner = t.owner and o.object_name = t.table_name
        LEFT JOIN all_tab_comments c on o.owner = c.owner and o.object_name = c.table_name
        where o.owner = '${t}' and o.object_type = 'TABLE' ORDER BY "name"`}showDatabases(){return'select username as "Database" from sys.all_users order by username'}showSchemas(){return'select username as "Database" from sys.all_users order by username'}tableTemplate(){return`CREATE TABLE table_name$1(  
    id NUMBER GENERATED AS IDENTITY PRIMARY KEY,
    create_time DATE,
    name$2 VARCHAR2(255)
);
COMMENT ON TABLE table_name$1 IS '$3';
COMMENT ON COLUMN table_name$1.$2 IS '$4'`}viewTemplate(e){return`CREATE ${e?"MATERIALIZED ":""}VIEW view_name$1
AS
SELECT * FROM $2`}procedureTemplate(){return`CREATE PROCEDURE proc_name$1(x IN OUT NUMBER, y OUT NUMBER)
IS
BEGIN
   $2
   y:=4 * x;
END;`}functionTemplate(){return`CREATE FUNCTION fun_name$1(x IN NUMBER) 
RETURN NUMBER 
BEGIN 
    $2
    RETURN x*2;
END;`}}class Xt extends ze{showVersion(){return`SELECT REPLACE(banner,'DM Database Server 64 ','') "server_version"  FROM v$version where rownum=1;`}createIndex(e){const{table:t,column:n="$2"}=e;return`CREATE INDEX ${`${t}_${n}`} ON ${t}(${n});`}dropIndex(e,t){return`DROP INDEX ${t};`}showIndex(e,t){return`SELECT COLUMN_NAME "column_name",INDEX_NAME "index_name" from all_IND_COLUMNS WHERE TABLE_OWNER='${e}' and TABLE_NAME='${t}';`}variableList(){return"show global VARIABLES"}statusList(){return"show global status"}processList(){return"SELECT SESS_ID,STATE,SQL_TEXT FROM v$sessions"}addColumn(e,t){return`ALTER TABLE ${e} 
    ADD COLUMN $1 $2;
COMMENT ON COLUMN ${e}.$3 IS 'comment$4';`}createUser(){return"CREATE USER $1 IDENTIFIED BY [password]$2;"}updateUser(e){return`ALTER USER ${e} IDENTIFIED BY [new_password];`}updateColumn(e,t){const{name:n,type:r,comment:l,nullable:a,defaultValue:i}=t;return`-- change column type
ALTER TABLE ${e} MODIFY ${n} ${r};
-- change column name
ALTER TABLE ${e} RENAME COLUMN ${n} TO [newColumnName];
COMMENT ON COLUMN ${e}.${n} IS '${l||""}';`}updateColumnSql(e){const{columnName:t,columnType:n,newColumnName:r,comment:l,defaultValue:a,table:i,isNotNull:o,oldRow:m}=e;return new Y("","").if(n!=m.type,`ALTER TABLE "${i}" MODIFY "${t}" ${n};`).if(o!=m.isNotNull,`
ALTER TABLE "${i}" MODIFY "${t}"${o?"NOT NULL":"NULL"};`).if(a!=null&&a!=m.defaultValue,`
ALTER TABLE "${i}" MODIFY "${t}" DEFAULT ${a!=null&&a.match(/(:|nextval)/i)?a:`'${a==null?void 0:a.replace(/(^'|'$)/g,"")}'`};`).if(l&&l!=m.comment,`
COMMENT ON COLUMN "${i}"."${t}" is '${l}';`).if(t!=r,`
ALTER TABLE "${i}" RENAME COLUMN "${t}" TO "${r}";`).toString()}showUsers(){return'SELECT username "user" FROM all_users'}pingDataBase(e){return e?`set SCHEMA ${e}`:null}updateTable(e){const{table:t,newTableName:n,comment:r,newComment:l}=e;let a="";return l&&l!=r&&(a=`COMMENT ON TABLE "${t}" IS '${l}';`),n&&t!=n&&(a+=`ALTER TABLE "${t}" RENAME TO "${n}"`),a}truncateDatabase(e){return`SELECT Concat('TRUNCATE TABLE \`',table_schema,'\`.\`',TABLE_NAME, '\`;') trun FROM INFORMATION_SCHEMA.TABLES where  table_schema ='${e}' and TABLE_TYPE<>'VIEW';`}createDatabase(e){return"CREATE USER [name] IDENTIFIED BY [password];"}showViewSource(e,t){return`CALL SP_VIEWDEF('${e}', '${t}');`}showProcedureSource(e,t){return`SELECT LISTAGG(text) within group(order by line) "Create Procedure"
        FROM all_source
       WHERE owner = '${e}'
         AND name  = '${t}'
       ORDER BY line`}showFunctionSource(e,t){return`select DBMS_METADATA.GET_DDL('FUNCTION', '${t}','${e}') "Create Function";`}showColumns(e,t){return`select
        a.COLUMN_NAME "name",
        a.DATA_DEFAULT "defaultValue",
        a.DATA_TYPE "type",
        a.DATA_PRECISION "precision",
        a.DATA_SCALE "scale",
        a.data_length "maximum_length",
        a.NULLABLE "nullable",
        c.CONSTRAINT_TYPE "key",
        cc.COMMENTS "comment",
        sc."INFO2" "extra"
      from
        all_tab_columns a
        left join all_col_comments cc on a.COLUMN_NAME=cc.COLUMN_NAME and a.OWNER=cc.SCHEMA_NAME and a.table_name=cc.table_name
        left join ALL_CONS_COLUMNS b on a.COLUMN_NAME=b.COLUMN_NAME and a.OWNER=b.OWNER and a.table_name=b.table_name
        left join all_CONSTRAINTS c on b.CONSTRAINT_NAME=c.CONSTRAINT_NAME
        left join sys.syscolumns sc on sc.id = (
            SELECT OBJECT_ID
                FROM all_objects t
                WHERE t.owner =a.OWNER
                AND t.object_name = a.table_name
                AND t.OBJECT_TYPE='TABLE'
        ) and sc."NAME"=a.COLUMN_NAME
      where
        a.owner = '${e}'
        and a.table_name = '${t}';`}showProcedures(e){return`select object_name "ROUTINE_NAME" from all_objects where object_type = 'PROCEDURE' and owner='${e}' ORDER BY "ROUTINE_NAME";`}showFunctions(e){return`select object_name "ROUTINE_NAME" from all_objects where object_type = 'FUNCTION' and owner='${e}' ORDER BY "ROUTINE_NAME";`}showViews(e){return`select object_name "name" from all_objects where object_type = 'VIEW' and owner='${e}';`}buildPageSql(e,t,n){return`SELECT * FROM ${t} LIMIT ${n};`}showTables(e,t){return`SELECT a.object_name "name",b.COMMENTS "comment" from all_objects a
join ALL_TAB_COMMENTS b on a.OWNER=b.OWNER and a.object_name=b.TABLE_NAME
where a.object_type = 'TABLE' and a.owner='${t}' and a.TEMPORARY<>'Y';`}showDatabases(){return`select object_name "Database" from all_objects where object_type = 'SCH';`}showSchemas(){return`select object_name "Database" from all_objects where object_type = 'SCH';`}tableTemplate(){return`CREATE TABLE table_name$1(  
    id int NOT NULL PRIMARY KEY IDENTITY(1,1),
    create_time DATETIME,
    name$2 VARCHAR(255)
);
COMMENT ON TABLE $1 IS '$3';
COMMENT ON COLUMN $1.$2 IS '$4';`}viewTemplate(){return`CREATE VIEW view_name$1
AS
SELECT * FROM $2`}procedureTemplate(){return`CREATE PROCEDURE proc_name$1(x IN OUT NUMBER, y OUT NUMBER)
IS
BEGIN
   $2
   y:=4 * x;
END;`}functionTemplate(){return`CREATE FUNCTION fun_name$1(x IN int) RETURN int$2
AS
BEGIN
    $3
    return x*2;
END;`}}class Ue extends Ee{showVersion(){return"select @@version server_version;"}showAllForeignKeys(){return`SELECT 
        CONSTRAINT_NAME constraint_name,
        TABLE_SCHEMA table_schema,
        TABLE_NAME table_name,
        COLUMN_NAME column_name,
        REFERENCED_TABLE_SCHEMA referenced_schema,
        REFERENCED_TABLE_NAME referenced_table,
        REFERENCED_COLUMN_NAME referenced_column
         FROM information_schema.KEY_COLUMN_USAGE 
         WHERE REFERENCED_TABLE_NAME is not null`}createIndex(e){let t=`${e.type||"key"}`;return t.match(/BTREE/i)&&(t="key"),`ALTER TABLE ${e.table} ADD ${t} (\`${e.column||"$1"}\`)`}dropIndex(e,t){return`ALTER TABLE ${e} DROP INDEX \`${t}\``}showIndex(e,t){return`SELECT column_name "column_name",index_name "index_name",index_type "index_type",non_unique=0 "isUnique" FROM INFORMATION_SCHEMA.STATISTICS WHERE table_schema='${e}' and table_name='${t}'
        ORDER BY index_name, SEQ_IN_INDEX;`}variableList(){return"show global VARIABLES"}statusList(){return"show global status"}kill(e){return`KILL ${e==null?void 0:e.ID};`}processList(){return"SELECT ID, USER User, DB, COMMAND Command, STATE State, TIME Time, INFO `SQL`\nFROM information_schema.PROCESSLIST;"}addColumn(e,t){const n=t?` AFTER \`${t}\``:"";return`ALTER TABLE ${e} 
    ADD COLUMN $1 [type]$2 COMMENT '$3'${n};`}createUser(){return`CREATE USER '$1'@'%' IDENTIFIED BY 'password$2';
-- Grant select privilege to all databases;
GRANT SELECT ON *.* TO '$1'@'%' WITH GRANT OPTION;
-- Grant all privileges to all databases;
GRANT ALL PRIVILEGES ON *.* TO '$1'@'%' WITH GRANT OPTION;`}updateUser(e){return`update mysql.user set 
    password = PASSWORD("newPassword")
    where User = '${e}';
FLUSH PRIVILEGES;
-- since mysql version 5.7, password column need change to authentication_string=PASSWORD("newPassword")`}updateColumn(e,t){var l,a;const{nullable:n,extra:r}=t;return this.updateColumnSql({table:e,...t,isNotNull:n!="YES",isAutoIncrement:(a=(l=r==null?void 0:r.toLowerCase())==null?void 0:l.includes)==null?void 0:a.call(l,"auto_increment")})}updateColumnSql(e){const{table:t,tableMeta:n,name:r,columnName:l=r,type:a,unsigned:i,zerofill:o,useCurrentTimestamp:m,isNotNull:L,isAutoIncrement:O,comment:R,defaultValue:v,character_set_name:_,collation_name:C}=e,I=a.match(/char|text|set|enum|blob|binary/i)&&(n==null?void 0:n.collation)!=C;return new Y(`ALTER TABLE \`${t}\``).append(`
	CHANGE \`${l}\` \`${r}\` ${a}`).if(i=="1","UNSIGNED").if(o=="1","ZEROFILL").if(m,"ON UPDATE CURRENT_TIMESTAMP").if(I&&_,`CHARACTER SET ${_}`).if(I&&C,`COLLATE ${C}`).if(L,"NOT NULL").if(O,"AUTO_INCREMENT").if(R,`COMMENT '${R}'`).if(Q(v)&&!L,"DEFAULT NULL").if(!Q(v),`DEFAULT ${v=="CURRENT_TIMESTAMP"?v:`${re(v,a)}`}`).append(";").toString()}showCollations(){return'select DEFAULT_COLLATE_NAME "name",CHARACTER_SET_NAME "charset",DESCRIPTION "description" from information_schema.CHARACTER_SETS ORDER BY name;'}showChecks(e,t){return`SELECT
        tc.CONSTRAINT_NAME "name",
        cc.CHECK_CLAUSE "clause"
    FROM
        information_schema.CHECK_CONSTRAINTS AS cc,
        information_schema.TABLE_CONSTRAINTS AS tc
    WHERE
        tc.CONSTRAINT_SCHEMA = '${e}'
        AND tc.TABLE_NAME = '${t}'
        AND tc.CONSTRAINT_TYPE = 'CHECK'
        AND tc.CONSTRAINT_SCHEMA = cc.CONSTRAINT_SCHEMA
        AND tc.CONSTRAINT_NAME = cc.CONSTRAINT_NAME;`}showUsers(){return"SELECT user user,host host FROM mysql.user;"}pingDataBase(e){return e?`use \`${e}\``:null}updateTable(e){const{table:t,newTableName:n,comment:r,newComment:l,collation:a,newCollation:i}=e;let o="";return l&&l!=r&&(o=`ALTER TABLE \`${t}\` COMMENT = '${l}';`),i&&i!=a&&(o+=`ALTER TABLE \`${t}\` collate = '${i}';`),n&&t!=n&&(o+=`ALTER TABLE \`${t}\` RENAME TO \`${n}\`;`),o}truncateDatabase(e){return`SELECT Concat('TRUNCATE TABLE \`',table_schema,'\`.\`',TABLE_NAME, '\`;') trun FROM INFORMATION_SCHEMA.TABLES where  table_schema ='${e}' and TABLE_TYPE<>'VIEW';`}createDatabase(e){return`CREATE DATABASE $1
    DEFAULT CHARACTER SET = 'utf8mb4';`}showTableSource(e,t){return`SHOW CREATE TABLE \`${e}\`.\`${t}\`;`}showPartitions(e,t){return`SELECT 
PARTITION_NAME "name",PARTITION_METHOD "strategy",PARTITION_EXPRESSION "columnName",
PARTITION_DESCRIPTION "value",TABLE_ROWS "rows",DATA_LENGTH "length"
        FROM information_schema.partitions WHERE TABLE_SCHEMA='${e}' AND TABLE_NAME = '${t}' AND PARTITION_NAME IS NOT NULL`}showViewSource(e,t){return`SHOW CREATE VIEW  \`${e}\`.\`${t}\`;`}showProcedureSource(e,t){return`SHOW CREATE PROCEDURE \`${e}\`.\`${t}\`;`}showFunctionSource(e,t){return`SHOW CREATE FUNCTION \`${e}\`.\`${t}\`;`}showTriggerSource(e,t){return`SHOW CREATE TRIGGER \`${e}\`.\`${t}\`;`}showColumns(e,t){return`SELECT 
        c.COLUMN_NAME name,
        COLUMN_TYPE type,
        COLUMN_COMMENT comment,COLUMN_KEY \`key\`,IS_NULLABLE nullable,
        CHARACTER_MAXIMUM_LENGTH maximum_length,
        COLUMN_DEFAULT defaultValue,
        INSTR(COLUMN_TYPE,'zerofill')>0 "zerofill",
        INSTR(COLUMN_TYPE,'unsigned')>0 "unsigned",
        EXTRA extra,
        COLLATION_NAME collation_name,
        CHARACTER_SET_NAME character_set_name 
        FROM information_schema.columns c
        WHERE c.table_schema = '${e}' AND c.table_name = '${t}' 
        ORDER BY c.ORDINAL_POSITION;`}showForeignKeys(e,t){return`SELECT
        c.COLUMN_NAME column_name, ik.CONSTRAINT_NAME constraint_name,
        ik.REFERENCED_TABLE_NAME referenced_table, ik.REFERENCED_COLUMN_NAME referenced_column,
        UPDATE_RULE "updateRule",
        DELETE_RULE "deleteRule"
        FROM
        information_schema.columns c join information_schema.KEY_COLUMN_USAGE ik on c.table_schema = ik.TABLE_SCHEMA
        and c.table_name = ik.TABLE_NAME and c.COLUMN_NAME = ik.COLUMN_NAME
        JOIN information_schema.REFERENTIAL_CONSTRAINTS ir on ik.CONSTRAINT_NAME=ir.CONSTRAINT_NAME
        WHERE c.table_schema = '${e}' and c.table_name = '${t}' ORDER BY ik.CONSTRAINT_NAME;`}showTriggers(e,t){const n=t?` AND EVENT_OBJECT_TABLE='${t}'`:"";return`SELECT 
                    EVENT_OBJECT_TABLE table_name,
                    TRIGGER_NAME "trigger_name",
                    ACTION_TIMING timing,
                    EVENT_MANIPULATION event,
                    EVENT_MANIPULATION manipulation,
                    ACTION_ORIENTATION orientation,
                    ACTION_STATEMENT statement
                FROM 
                    information_schema.TRIGGERS 
                WHERE 
                    TRIGGER_SCHEMA = '${e}' 
                    ${n} 
                ORDER BY 
                    TRIGGER_NAME;`}showProcedures(e){return`SELECT 
    r.ROUTINE_NAME "name",
    p.PARAMETER_NAME "param_name",
    p.DATA_TYPE "param_type",
    p.PARAMETER_MODE "param_mode"
FROM 
    information_schema.routines r
LEFT JOIN 
    information_schema.parameters p 
ON 
    r.SPECIFIC_NAME = p.SPECIFIC_NAME
WHERE
    r.ROUTINE_SCHEMA = '${e}'
    AND r.ROUTINE_TYPE = 'PROCEDURE'
ORDER BY 
    r.ROUTINE_NAME, p.ORDINAL_POSITION;`}showFunctions(e){return`SELECT 
        ROUTINE_NAME "name",
        p.PARAMETER_NAME "param_name",
        p.DATA_TYPE "param_type",
        p.PARAMETER_MODE "param_mode"
    FROM 
        information_schema.routines  r
    LEFT JOIN 
        information_schema.parameters p 
    ON 
        r.SPECIFIC_NAME = p.SPECIFIC_NAME
    WHERE 
        r.ROUTINE_SCHEMA = '${e}' 
        AND r.ROUTINE_TYPE = 'FUNCTION' 
    ORDER BY 
        r.ROUTINE_NAME;`}showViews(e){return`SELECT TABLE_NAME name,SECURITY_TYPE "view_group" FROM information_schema.VIEWS  WHERE TABLE_SCHEMA = '${e}' ORDER BY TABLE_NAME`}buildPageSql(e,t,n){return`SELECT * FROM ${t} LIMIT ${n};`}showTables(e){return`SELECT TABLE_COMMENT "comment",TABLE_NAME "name",TABLE_ROWS "table_rows",\`AUTO_INCREMENT\` "auto_increment",
        row_format "row_format",DATA_LENGTH "data_length",INDEX_LENGTH "index_length",TABLE_COLLATION "collation",
        TABLE_TYPE "view_group",\`ENGINE\` engine
        FROM information_schema.TABLES  WHERE TABLE_SCHEMA = '${e}' and TABLE_TYPE<>'VIEW' ORDER BY TABLE_NAME;`}showDatabases(){return"show DATABASES"}showSchemas(){return this.showDatabases()}tableTemplate(){return`CREATE TABLE table_name$1(  
    id int NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'Primary Key',
    create_time DATETIME COMMENT 'Create Time',
    name$2 VARCHAR(255)
) COMMENT '$4';`}viewTemplate(){return`CREATE VIEW view_name$1
AS
SELECT * FROM $2`}procedureTemplate(){return`CREATE PROCEDURE proc_name$1()
BEGIN
$2
END;`}functionTemplate(){return`CREATE FUNCTION fun_name$1() RETURNS int$2
READS SQL DATA
BEGIN
    $3
    return 0;
END;`}}class Jt extends Ue{showVersion(){return"select replace(@@version,'-MariaDB','') server_version;"}}class zt extends He{showVersion(){return"show version"}showDatabases(){return"show dbs"}buildPageSql(e,t,n){return`db('${e}').collection('${t}').find({}).limit(${n}).toArray()`}showIndex(e,t){return`db('${e}').collection('${t}').indexes();`}createIndex(e){const{database:t,table:n,column:r}=e;return`db('${t}').collection('${n}').createIndex({ ${r||"column_name"}: 1 });`}createDatabase(e){return'db("db_name").createCollection("collection")'}}class Zt extends Ee{showVersion(){return"SELECT CAST(SERVERPROPERTY('ProductVersion') AS SYSNAME)+' '+CAST(SERVERPROPERTY('Edition') AS SYSNAME) AS server_version"}showAllForeignKeys(){return`SELECT 
    OBJECT_SCHEMA_NAME(fk.parent_object_id) AS table_schema,
    OBJECT_NAME(fk.parent_object_id) AS table_name,
    COL_NAME(fc.parent_object_id, fc.parent_column_id) AS column_name,
    OBJECT_SCHEMA_NAME(fk.referenced_object_id) AS referenced_schema,
    OBJECT_NAME(fk.referenced_object_id) AS referenced_table,
    COL_NAME(fc.referenced_object_id, fc.referenced_column_id) AS referenced_column
FROM 
    sys.foreign_keys fk
JOIN 
    sys.foreign_key_columns fc ON fk.object_id = fc.constraint_object_id`}showAllComments(){return`SELECT 
        s.name table_schema,
        t.name AS table_name,
        c2.name AS column_name,
        prop.value AS comment
        FROM 
           sys.columns c2 
                join sys.tables t on c2.object_id=t.object_id
                join sys.schemas s on t.schema_id=s.schema_id 
                join sys.extended_properties prop ON prop.major_id = c2.object_id AND prop.minor_id = c2.column_id`}createIndex(e){return`ALTER TABLE ${e.table} ADD ${e.type} (${e.column})`}dropIndex(e,t){return`DROP INDEX ${e}.${t}`}showIndex(e,t){return`SELECT
        index_name = ind.name,
        column_name = col.name,
        ind.is_primary_key "isPrimary",
        ind.is_unique "isUnique",
        ind.is_unique_constraint,
        CASE 
            WHEN ind.is_primary_key=1 THEN 'PRIMARY'
            WHEN ind.is_unique=1 THEN 'UNIQUE'
            WHEN ind.is_unique_constraint=1 THEN 'UNIQUE'
        ELSE 'INDEX' END index_type
      FROM
        sys.indexes ind
        INNER JOIN sys.index_columns ic ON ind.object_id = ic.object_id
        and ind.index_id = ic.index_id
        INNER JOIN sys.columns col ON ic.object_id = col.object_id
        and ic.column_id = col.column_id
        INNER JOIN sys.tables t ON ind.object_id = t.object_id
      WHERE
        t.name = '${t}';`}variableList(){throw new Error("Method not implemented.")}statusList(){throw new Error("Method not implemented.")}kill(e){return`kill ${e.ID};`}processList(){return`SELECT
    s.session_id "ID",
    s.login_name "User",
    s.program_name "Client",
    r.status "Status",
    r.wait_time "Wait Time",
    d.text "SQL"
FROM sys.dm_exec_sessions s
LEFT JOIN sys.dm_exec_requests r ON s.session_id = r.session_id
Outer APPLY sys.dm_exec_sql_text(sql_handle) d
WHERE s.is_user_process = 1;`}addColumn(e,t){return`ALTER TABLE ${e} 
    ADD $1 [type]$2;`}createUser(){return`CREATE LOGIN loginName$1 WITH PASSWORD = 'password$2';
-- user master[YourDatabaseName]
CREATE USER userName$3 FOR LOGIN loginName$1;
ALTER ROLE db_datareader ADD MEMBER userName$3;
ALTER ROLE db_datawriter ADD MEMBER userName$3;
-- ALTER ROLE db_ddladmin ADD MEMBER userName$3;`}updateColumn(e,t){const{name:n,type:r,comment:l,nullable:a,defaultValue:i}=t,o=a=="YES"?"NULL":"NOT NULL";return`-- change column type
ALTER TABLE ${e} 
    ALTER COLUMN ${n} ${r} ${o};
-- change column name
EXEC sp_rename '${e}.${n}', '${n}', 'COLUMN';`}updateColumnSql(e){const{columnName:t,columnType:n,newColumnName:r,comment:l,oldRow:a,isNotNull:i,schema:o,table:m}=e,L=i?"NOT NULL":"NULL";return new Y(`ALTER TABLE "${o}"."${m}" ALTER COLUMN ${t} ${n} ${L};`,`
`).if(t!=r,()=>`EXEC sp_rename '${o}.${m}.${t}' , '${r}', 'COLUMN';`).if(l!=a.comment,()=>`EXEC ${a.comment?"sp_updateextendedproperty":"sp_addextendedproperty"} 
@level0type = N'Schema', @level0name = '${o}',
@level1type = N'Table', @level1name = '${m}', 
@level2type = N'Column', @level2name = '${r}',
@name = N'MS_Description', @value = N'${l}';`).toString()}showUsers(){return"SELECT name [user] from sys.database_principals where type='S'"}updateTable(e){const{schema:t,table:n,newTableName:r,comment:l,newComment:a}=e;let i="";return a&&a!=l&&(i=`EXEC ${l?"sp_updateextendedproperty":"sp_addextendedproperty"} 
@level0type = N'Schema', @level0name = '${t}',
@level1type = N'Table', @level1name = '${n}', 
@name = N'MS_Description', @value = N'${a}';`),r&&n!=r&&(i+=`sp_rename '${n}', '${r}';`),i}truncateDatabase(e){return`SELECT Concat('TRUNCATE TABLE [',table_schema,'].[',TABLE_NAME, '];') trun FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE'  AND TABLE_SCHEMA='${e}'`}createDatabase(e){return`create database ${e||"[name]"}`}showViewSource(e,t){return`SELECT definition 'Create View' FROM sys.sql_modules WHERE object_id = OBJECT_ID('${e}.${t}');`}showProcedureSource(e,t){return`SELECT definition 'Create Procedure','${e}.${t}' "Procedure" FROM sys.sql_modules WHERE object_id = OBJECT_ID('${e}.${t}');`}showFunctionSource(e,t){return`SELECT definition 'Create Function','${e}.${t}' "Function" FROM sys.sql_modules WHERE object_id = OBJECT_ID('${e}.${t}');`}showTriggerSource(e,t){return`SELECT definition 'SQL Original Statement','${e}.${t}' "Trigger" FROM sys.sql_modules WHERE object_id = OBJECT_ID('${e}.${t}');`}showColumns(e,t){return["information_schema","sys"].includes(e==null?void 0:e.toLowerCase())?`SELECT
            name,
            type_name(system_type_id) "type",
            is_nullable nullable,
            max_length "maximum_length"
        FROM
            sys.all_columns
        WHERE
            object_id = OBJECT_ID('${e}.${t}') ;`:`SELECT 
               c.COLUMN_NAME "name",
               DATA_TYPE "type",
               numeric_precision "precision",
               numeric_scale "scale",
               IS_NULLABLE nullable, CHARACTER_MAXIMUM_LENGTH "maximum_length", COLUMN_DEFAULT "defaultValue", '' "comment", tc.constraint_type "key",
               COLUMNPROPERTY(object_id('${e}.${t}'), c.COLUMN_NAME, 'IsIdentity') extra
               FROM
               INFORMATION_SCHEMA.COLUMNS c
               left join  INFORMATION_SCHEMA.CONSTRAINT_COLUMN_USAGE ccu
               on c.COLUMN_NAME=ccu.column_name and c.table_name=ccu.table_name and ccu.TABLE_SCHEMA=c.TABLE_SCHEMA
               left join  INFORMATION_SCHEMA.TABLE_CONSTRAINTS tc
               on tc.constraint_name=ccu.constraint_name
               and tc.TABLE_SCHEMA=c.TABLE_SCHEMA and tc.table_name=c.table_name WHERE c.TABLE_SCHEMA = '${e}' AND c.table_name = '${t}' ORDER BY ORDINAL_POSITION`}showChecks(e,t){return`SELECT
        tc.CONSTRAINT_NAME "name",
        cc.CHECK_CLAUSE "clause"
    FROM
        "INFORMATION_SCHEMA"."CHECK_CONSTRAINTS" AS cc,
        "INFORMATION_SCHEMA"."TABLE_CONSTRAINTS" AS tc
    WHERE
        tc.CONSTRAINT_SCHEMA = '${e}'
        AND tc.TABLE_NAME = '${t}'
        AND tc.CONSTRAINT_TYPE = 'CHECK'
        AND tc.CONSTRAINT_SCHEMA = cc.CONSTRAINT_SCHEMA
        AND tc.CONSTRAINT_NAME = cc.CONSTRAINT_NAME;`}showForeignKeys(e,t){return`SELECT
        f.name AS "constraint_name",
        COL_NAME( fkc.parent_object_id, fkc.parent_column_id ) AS "column_name",
        OBJECT_NAME (fkc.referenced_object_id) AS "referenced_table",
        COL_NAME( fkc.referenced_object_id, fkc.referenced_column_id )  AS "referenced_column",
        update_referential_action_desc "updateRule",
        delete_referential_action_desc "deleteRule"
    FROM
        sys.foreign_key_columns fkc
        JOIN sys.foreign_keys f ON f.object_id = fkc.constraint_object_id
        JOIN sys.tables tab1 ON tab1.object_id = fkc.parent_object_id and tab1.name='${t}' and SCHEMA_NAME(tab1.schema_id)='${e}'
    ;`}showTriggers(e,t){const n=t?` AND tb.name='${t}'`:"";return`SELECT 
                tr.name AS trigger_name, 
                tb.name AS table_name,
                'Statement' AS orientation,
                OBJECT_DEFINITION(tr.object_id) AS source
            FROM 
                sys.triggers tr
                INNER JOIN sys.tables tb ON tr.parent_id = tb.object_id
                INNER JOIN sys.schemas sc ON tb.schema_id = sc.schema_id
            WHERE 
                tr.is_ms_shipped = 0
                AND sc.name = '${e}' ${n}`}showProcedures(e){return`SELECT ROUTINE_NAME FROM INFORMATION_SCHEMA.ROUTINES WHERE SPECIFIC_SCHEMA = '${e}' and ROUTINE_TYPE='PROCEDURE' ORDER BY ROUTINE_NAME`}showFunctions(e){return`SELECT ROUTINE_NAME FROM INFORMATION_SCHEMA.ROUTINES WHERE SPECIFIC_SCHEMA = '${e}' and ROUTINE_TYPE='FUNCTION' ORDER BY ROUTINE_NAME`}showViews(e,t){return`SELECT name FROM sys.all_views t where SCHEMA_NAME(t.schema_id)='${t}' order by name`}buildPageSql(e,t,n){return`SELECT TOP ${n} * FROM ${t};`}showTables(e,t,n){const{showRowCount:r}=n??{};return`SELECT t.name AS 'name', ep.value AS 'comment', t.is_ms_shipped 'isSystem'
        ${r?", ds.row_count 'table_rows'":""}
FROM sys.tables t
    LEFT JOIN sys.extended_properties ep ON ep.major_id = t.object_id
    AND ep.minor_id = 0 AND ep.name = 'MS_Description'
    ${r?`LEFT JOIN sys.dm_db_partition_stats ds on ds.object_id = object_id('${t}.'+ t.name)
    and ds.index_id IN (0, 1)`:""}
WHERE
    t.schema_id = SCHEMA_ID('${t}') ORDER BY t.name;`}showDatabases(){return"SELECT name 'Database' FROM sys.databases"}showSchemas(){return"SELECT SCHEMA_NAME [schema] FROM INFORMATION_SCHEMA.SCHEMATA"}tableTemplate(e){return`CREATE TABLE ${(e=="dbo"?"":`${e}.`)+"table_name"}$1(  
    id int IDENTITY(1,1) primary key,
    create_time DATETIME,
    update_time DATETIME,
    content$2 NVARCHAR(255)
);
EXECUTE sp_addextendedproperty N'MS_Description', '[table_comment]', N'user', N'dbo', N'table', N'[table_name]', NULL, NULL;
EXECUTE sp_addextendedproperty N'MS_Description', '[column_comment]', N'user', N'dbo', N'table', N'[table_name]', N'column', N'[column_name]';
`}viewTemplate(){return`CREATE VIEW dbo.view_name$1
AS
SELECT * FROM 
GO`}procedureTemplate(){return`CREATE PROCEDURE dbo.procedure_name$1
AS
BEGIN
    $2
END;`}functionTemplate(){return`CREATE FUNCTION dbo.function_name$1() RETURNS [TYPE]
BEGIN
    $2
    return [value];
END;`}triggerTemplate(e){return`CREATE TRIGGER trigger_name$1
ON ${e??"[table_name]$2"}
[FOR/AFTER] INSERT
AS
BEGIN
    $3
END;`}}class en extends He{showVersion(){return"call dbms.components() yield name, versions, edition unwind versions as server_version return server_version;"}showDatabases(){return"SHOW DATABASES yield name AS Database"}showSchemas(){return this.showDatabases()}showTables(e){return"call db.labels() yield label as name RETURN name ORDER BY toLower(name)"}addColumn(e,t){return`MATCH (n:${e}) WHERE id(n) = 1 SET n.name = 'name' RETURN n`}showColumns(e,t){return`MATCH(n:\`${t}\`) UNWIND keys(n) AS name RETURN DISTINCT name`}showIndex(e,t){return`show indexes yield name as index_name, properties as column_name, type as index_type, labelsOrTypes where '${t}' in labelsOrTypes`}showViews(e){return"call db.relationshipTypes() yield relationshipType AS name RETURN name ORDER BY toLower(name)"}showUsers(){return"SHOW USERS"}createUser(){return`CREATE USER [name] IF NOT EXISTS 
    SET PASSWORD 'password';`}buildPageSql(e,t,n){return`MATCH (n${t=="*"?"":`:${t}`}) RETURN n LIMIT ${n}`}createDatabase(e){return"CREATE DATABASE $1"}tableTemplate(){return"CREATE (n:node {id:1}) return n;"}createIndex(e){return`CREATE INDEX FOR (n:${e.table}) ON (n.id)`}dropIndex(e,t){return`DROP INDEX \`${t}\``}viewTemplate(){return"MATCH (n1:node {id:1}), (n2:node {id:2}) CREATE (n1)-[r:TO]->(n2) RETURN type(r)"}}class Ze extends ge{defaultPart(){var L,O;const{oldRow:e,isAutoIncrement:t,defaultValue:n,columnType:r}=this.param,l=(L=n==null?void 0:n.match)==null?void 0:L.call(n,/\bnextval\b/);if(t&&!e.isAutoIncrement&&!l)return`${this.afterColumnPrefix} ADD GENERATED ALWAYS AS IDENTITY;`;if(!t&&e.isAutoIncrement&&!l)return`${this.afterColumnPrefix} DROP IDENTITY;`;if(!t&&e.isAutoIncrement&&l)return`${this.afterColumnPrefix} DROP DEFAULT;`;if(e.defaultValue==n)return"";const m=(O=n==null?void 0:n.match)!=null&&O.call(n,/\bnextval\b/)?n:re(n,r);return`${this.afterColumnPrefix} ${Q(n)?"DROP DEFAULT":`SET DEFAULT ${m}`};`}commentPart(){const{oldRow:e,table:t,columnName:n,comment:r}=this.param;if(r!=e.comment)return`COMMENT ON COLUMN "${t}"."${n}" is '${r}';`}}class Pe extends Ee{showVersion(){return"SHOW server_version;"}createIndex(e){const t=e.name??`${e.column||"[column]"}`,n=e.indexType||"btree";return`CREATE INDEX ${t}_${new Date().getTime()}_index ON 
    ${e.table} USING ${n} ("${e.column||"[column]"}");`}dropIndex(e,t){return`DROP INDEX "${t}"`}showIndex(e,t){return`select
    t.relname as table_name,
    i.relname as index_name,
    a.attname as column_name,
    ix.indisprimary "isPrimary",
    ix.indisunique "isUnique",
    CASE ix.indisprimary
        WHEN true THEN 'PRIMARY'
    ELSE CASE ix.indisunique
        WHEN true THEN 'UNIQUE'
    ELSE 'KEY'
    END
    END AS index_type,
    am.amname index_method
  from
    pg_class t
    join pg_catalog.pg_namespace pgn ON pgn.oid=t.relnamespace and pgn.nspname='${e}'
    join pg_index ix on t.oid = ix.indrelid
    join pg_attribute a on t.oid = a.attrelid and a.attnum = ANY(string_to_array(textin(int2vectorout(ix.indkey)),' ')::int[])
    join pg_class i on ix.indexrelid = i.oid
    JOIN pg_am am ON am.oid=i.relam
  where
     t.relkind = 'r'
    and t.relname = '${t}'
  order by
    ix.indexrelid;`}variableList(){return"SHOW ALL"}statusList(){return`SELECT
        'db_numbackends' AS db,
        pg_stat_get_db_numbackends(datid) AS status
      FROM
        pg_stat_database
      WHERE
        datname = current_database()
      UNION ALL
      SELECT
        'db_xact_commit',
        pg_stat_get_db_xact_commit(datid)
      FROM
        pg_stat_database
      WHERE
        datname = current_database()
      UNION ALL
      SELECT
        'db_xact_rollback',
        pg_stat_get_db_xact_rollback(datid)
      FROM
        pg_stat_database
      WHERE
        datname = current_database()
      UNION ALL
      SELECT
        'db_blocks_fetched',
        pg_stat_get_db_blocks_fetched(datid)
      FROM
        pg_stat_database
      WHERE
        datname = current_database()
      UNION ALL
      SELECT
        'db_blocks_hit',
        pg_stat_get_db_blocks_hit(datid)
      FROM
        pg_stat_database
      WHERE
        datname = current_database()`}kill(e){return`SELECT pg_terminate_backend(${e.ID})`}processList(){return`SELECT
        a.pid AS "ID",
        query_start AS "Time",
        datname AS "db",
        CASE
        WHEN c.relname IS NOT NULL THEN c.relname
        ELSE l.virtualtransaction
        END AS "Target",
        l.mode AS "State",
        query AS "SQL"
      FROM
        pg_stat_activity a
        LEFT JOIN pg_locks l ON a.pid = l.pid
        LEFT JOIN pg_class c ON l.relation = c.oid
      ORDER BY
        a.pid ASC,
        c.relname ASC`}addColumn(e,t){return`ALTER TABLE ${e} 
  ADD COLUMN [column] [type];
COMMENT ON COLUMN ${e}.[column] IS 'comment';`}createUser(){return`CREATE USER $1 WITH PASSWORD 'password$2';
-- Grant select privilege;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO $1;
-- Grant all privileges;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO $1;`}updateUser(e){return`ALTER USER ${e} WITH PASSWORD 'new_password';`}updateColumn(e,t){const{name:n,type:r,comment:l,nullable:a,defaultValue:i}=t;return`-- change column type
ALTER TABLE ${e} 
    ALTER COLUMN ${n} TYPE ${r};
-- change column name
ALTER TABLE ${e} 
    RENAME COLUMN ${n} TO ${n};
-- Change column comment
COMMENT ON COLUMN ${e}.${n} IS '${l||"comment"}';`}updateColumnSql(e){return new Ze(e).genAlterSQL()}showUsers(){return'SELECT usename "user" from pg_user '}showAllForeignKeys(){return`SELECT
      refc.constraint_name "constraint_name",
      refc.constraint_schema "table_schema",
      kcu.table_name "table_name",
      kcu.column_name AS "column_name",
      ccu.table_name AS "referenced_table",
      ccu.column_name AS "referenced_column"
  FROM
      information_schema.referential_constraints AS refc,
      information_schema.key_column_usage AS kcu,
      information_schema.constraint_column_usage AS ccu
  WHERE
      refc.constraint_name = kcu.constraint_name
      AND refc.constraint_schema = kcu.table_schema
      AND ccu.constraint_name = refc.constraint_name;`}showForeignKeys(e,t){return`SELECT
      refc.constraint_name constraint_name,
      kcu.column_name AS column_name,
      ccu.table_name AS referenced_table,
      ccu.column_name AS referenced_column,
      kcu.ordinal_position AS ord_position,
      refc.update_rule "updateRule",
      refc.delete_rule "deleteRule"
  FROM
      information_schema.referential_constraints AS refc,
      information_schema.key_column_usage AS kcu,
      information_schema.constraint_column_usage AS ccu
  WHERE
      refc.constraint_schema = '${e}'
      AND refc.constraint_name = kcu.constraint_name
      AND refc.constraint_schema = kcu.table_schema
      AND ccu.constraint_name = refc.constraint_name
      AND kcu.table_name = '${t}'
  ORDER BY ord_position;`}pingDataBase(e){return e?`set search_path to '${e}';`:null}updateTable(e){const{table:t,newTableName:n,comment:r,newComment:l}=e;let a="";return l&&l!=r&&(a=`COMMENT ON TABLE "${t}" IS '${l}';`),n&&t!=n&&(a+=`ALTER TABLE "${t}" RENAME TO "${n}";`),a}truncateDatabase(e){return`SELECT Concat('TRUNCATE TABLE "',TABLE_NAME, '";') trun FROM INFORMATION_SCHEMA.TABLES WHERE  table_schema ='${e}' AND table_type='BASE TABLE';`}createDatabase(e){return"CREATE DATABASE $1"}showViewSource(e,t,n){return n?`SELECT CONCAT('CREATE MATERIALIZED VIEW ',matviewname,'
AS
(',regexp_replace(definition,';$',''),')') "Create View"
    ,matviewname "table_name",'definition' "view_definition" from pg_matviews
    WHERE schemaname='${e}' and matviewname='${t}';`:`SELECT CONCAT('CREATE VIEW ',table_name,'
AS
(',regexp_replace(view_definition,';$',''),')') "Create View"
    ,table_name,view_definition from information_schema.views 
    where table_schema='${e}' and table_name='${t}'`}showMaterialViewSource(e,t){return`SELECT CONCAT('CREATE MATERIALIZED VIEW ',matviewname,'
AS
(',regexp_replace(definition,';$',''),')') "Create View"
    ,matviewname "table_name",'definition' "view_definition" from pg_matviews
    WHERE schemaname='${e}' and matviewname='${t}';`}showProcedureSource(e,t){return`select pg_get_functiondef('${e}.${t}' :: regproc) "Create Procedure",'${t}' "Procedure";`}showTriggerSource(e,t){return`select pg_get_triggerdef(oid) "SQL Original Statement",'${e}.${t}' "Trigger" from pg_trigger where tgname = '${t}';`}showColumns(e,t,n){return`SELECT 
          ${n?"c.*,":""}
          c.COLUMN_NAME "name", 
          atttypid::regtype AS pg_reg_type,
          DATA_TYPE "type",
          IS_NULLABLE nullable, 
          numeric_precision "precision",
          numeric_scale "scale",
          CHARACTER_MAXIMUM_LENGTH "maximum_length", 
          COLUMN_DEFAULT "defaultValue", 
          pg_catalog.col_description(pgc.oid, c.ordinal_position::int) AS "comment",
          tc.constraint_type "key",
          tc.constraint_name "constraint_name",
          cc.table_name "referenced_table",
          cc.column_name "referenced_column",
          pa.*
        FROM information_schema.columns c
        JOIN pg_catalog.pg_class pgc ON c.table_name = pgc.relname 
        JOIN pg_catalog.pg_namespace pgn ON pgn.oid=pgc.relnamespace and pgn.nspname=c.table_schema
        JOIN pg_attribute pa on pa.attname =c.column_name and pa.attrelid =pgc.oid 
        LEFT JOIN information_schema.key_column_usage ccu on ccu.table_schema=c.table_schema
          and ccu.table_name=c.table_name and ccu.column_name=c.COLUMN_NAME
        LEFT JOIN information_schema.table_constraints tc on tc.table_schema=c.table_schema 
          and tc.table_name=c.table_name and tc.constraint_name=ccu.constraint_name
        LEFT JOIN information_schema.constraint_column_usage cc on cc.table_schema=c.table_schema 
          and cc.constraint_name=tc.constraint_name and  tc.constraint_type='FOREIGN KEY'
        WHERE c.TABLE_SCHEMA = '${e}' AND c.table_name = '${t}' 
        ORDER BY c.ORDINAL_POSITION;`}showChecks(e,t){return`SELECT
    tc.CONSTRAINT_NAME "name",
    cc.CHECK_CLAUSE "clause"
FROM
    "information_schema"."check_constraints" AS cc,
    "information_schema"."table_constraints" AS tc
WHERE
    tc.CONSTRAINT_SCHEMA = '${e}'
    AND tc.TABLE_NAME = '${t}'
    AND tc.CONSTRAINT_TYPE = 'CHECK'
    AND tc.CONSTRAINT_SCHEMA = cc.CONSTRAINT_SCHEMA
    AND tc.CONSTRAINT_NAME = cc.CONSTRAINT_NAME
    AND cc.CONSTRAINT_NAME NOT LIKE '%_not_null'`}showPartitions(e,t){return`select col.column_name "columnName", pt.partition_strategy "strategy" from (
      select
          partrelid, partnatts, case partstrat when 'h' then 'HASH' when 'l' then 'LIST' when 'r' then 'RANGE' end as partition_strategy, unnest(partattrs) column_index
      from
          pg_partitioned_table ) pt
      join pg_class pc on pc.oid = pt.partrelid
      join information_schema.columns col on col.table_schema = pc.relnamespace :: regnamespace :: text
        and col.table_name = pc.relname and col.ordinal_position = pt.column_index
      WHERE col.table_schema='${e}' and col.table_name='${t}';`}showTriggers(e,t){const n=t?` AND event_object_table='${t}'`:"";return`SELECT 
              event_object_table table_name,
              trigger_name "trigger_name",
              action_timing timing,
              event_manipulation manipulation ,
              action_orientation orientation,
              action_statement "statement"
            FROM 
              information_schema.TRIGGERS 
            WHERE trigger_schema = '${e}' ${n} 
            ORDER BY TRIGGER_NAME ASC`}showProcedures(e){return`SELECT p.proname "ROUTINE_NAME",
    pg_get_functiondef(p.oid) source,
    p.oid,
    pg_get_function_identity_arguments(p.oid) "argDefs"
from
    pg_proc p
    JOIN pg_namespace n ON p.pronamespace = n.oid
    and n.nspname = '${e}'
    and p.prokind = 'p'
order by p.proname`}showFunctions(e){return`SELECT DISTINCT
    r.ROUTINE_NAME AS "name",
    p.oid,
    pg_get_function_identity_arguments(p.oid) "argDefs"
FROM 
    information_schema.routines r
    JOIN pg_proc p ON r.ROUTINE_NAME = p.proname 
    JOIN pg_namespace n ON p.pronamespace = n.oid 
    AND n.nspname = '${e}'
WHERE 
    r.ROUTINE_SCHEMA = '${e}' 
    AND r.ROUTINE_TYPE = 'FUNCTION' 
ORDER BY 
    r.ROUTINE_NAME ASC`}showFunctionSource(e,t,n){return n?`select pg_get_functiondef('${n}') "Create Function",'${t}' "Function";`:`select pg_get_functiondef('${e}.${t}' :: regproc) "Create Function",'${t}' "Function";`}showViews(e,t){return`select table_name "name" from information_schema.tables where table_schema='${t}' and table_type='VIEW' order by "name";`}showMaterialViews(e,t){return`SELECT matviewname "name" from pg_matviews WHERE schemaname='${t}' order by "name" ASC`}buildPageSql(e,t,n){return`SELECT * FROM ${t} LIMIT ${n};`}showTables(e,t){return`SELECT t.table_name "name", pg_catalog.obj_description(pgc.oid, 'pg_class') "comment",pgc.reltuples "table_rows"
FROM information_schema.tables t
JOIN pg_catalog.pg_class pgc ON t.table_name = pgc.relname 
JOIN pg_catalog.pg_namespace pgn ON pgn.oid=pgc.relnamespace and pgn.nspname=t.table_schema
WHERE t.table_type='BASE TABLE'
AND t.table_schema='${t}' order by t.table_name;`}showDatabases(){return"SELECT datname FROM pg_database WHERE datistemplate = false order by datname ASC;"}showSchemas(){return'SELECT nspname "schema" from pg_catalog.pg_namespace order by nspname ASC;'}showSequences(e){return`select sequencename as name,last_value as sequence from pg_sequences WHERE schemaname='${e}' ORDER BY name;`}showCustomTypes(e){return`SELECT  t.typname as name,typtype as type,string_agg(pg_enum.enumlabel, ',') enum_values
    FROM        pg_type t 
    LEFT JOIN   pg_enum ON pg_enum.enumtypid = t.oid
    LEFT JOIN   pg_catalog.pg_namespace n ON n.oid = t.typnamespace 
    WHERE (t.typrelid = 0 OR (SELECT c.relkind = 'c' FROM pg_catalog.pg_class c WHERE c.oid = t.typrelid)) 
    AND     NOT EXISTS(SELECT 1 FROM pg_catalog.pg_type el WHERE el.oid = t.typelem AND el.typarray = t.oid)
    and n.nspname='${e}' GROUP BY name,type;`}tableTemplate(){return`CREATE TABLE table_name$1(  
    id int NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    create_time DATE,
    name$2 VARCHAR(255)
);
COMMENT ON TABLE table_name$1 IS '$3';
COMMENT ON COLUMN table_name$1.name$2 IS '$4';`}viewTemplate(e){return`CREATE ${e?"MATERIALIZED ":""}VIEW view_name$1
AS
SELECT * FROM $2`}procedureTemplate(){return`CREATE PROCEDURE proc_name$1()
LANGUAGE SQL
as $$
[$2]
$$;`}triggerTemplate(e){return`CREATE FUNCTION trigger_fun$1() RETURNS TRIGGER AS 
\\$body\\$
BEGIN
    $2
    RETURN [value];
END;
\\$body\\$ 
LANGUAGE plpgsql;

CREATE TRIGGER [name]$3
[BEFORE/AFTER] INSERT
ON ${e??"[table_name]$4"}
FOR EACH ROW
EXECUTE PROCEDURE [trigger_fun]();`}dropTriggerTemplate(e,t){return`DROP TRIGGER ${e} on ${t}`}functionTemplate(){return`CREATE FUNCTION fun_name$1() 
RETURNS int$2 AS $$
BEGIN
    $3
    return 0;
END;
$$ LANGUAGE plpgsql;`}}class qe extends Pe{showVersion(){return"SELECT VERSION() as server_version"}createIndex(e){throw new Error("Redshift not support index!")}variableList(){return"SHOW ALL"}statusList(){return`SELECT
        'db_numbackends' AS db,
        pg_stat_get_db_numbackends(datid) AS status
      FROM
        pg_stat_database
      WHERE
        datname = current_database()
      UNION ALL
      SELECT
        'db_xact_commit',
        pg_stat_get_db_xact_commit(datid)
      FROM
        pg_stat_database
      WHERE
        datname = current_database()
      UNION ALL
      SELECT
        'db_xact_rollback',
        pg_stat_get_db_xact_rollback(datid)
      FROM
        pg_stat_database
      WHERE
        datname = current_database()
      UNION ALL
      SELECT
        'db_blocks_fetched',
        pg_stat_get_db_blocks_fetched(datid)
      FROM
        pg_stat_database
      WHERE
        datname = current_database()
      UNION ALL
      SELECT
        'db_blocks_hit',
        pg_stat_get_db_blocks_hit(datid)
      FROM
        pg_stat_database
      WHERE
        datname = current_database()`}processList(){return`SELECT
        a.pid AS "Id",
        a.usename AS "User",
        a.client_addr AS "Host",
        a.client_port AS "Port",
        datname AS "db",
        query AS "Command",
        l.mode AS "State",
        query_start AS "Time",
        CASE
          WHEN c.relname IS NOT NULL THEN 'Locked Object: ' || c.relname
          ELSE 'Locked Transaction: ' || l.virtualtransaction
        END AS "Info"
      FROM
        pg_stat_activity a
        LEFT JOIN pg_locks l ON a.pid = l.pid
        LEFT JOIN pg_class c ON l.relation = c.oid
      ORDER BY
        a.pid ASC,
        c.relname ASC`}addColumn(e,t){return`ALTER TABLE ${e}
  ADD COLUMN [column] [type];
COMMENT ON COLUMN ${e}.[column] IS 'comment';`}createUser(){return"CREATE USER [name] WITH PASSWORD 'password';"}updateUser(e){return`ALTER USER ${e} WITH PASSWORD 'new_password';`}updateColumn(e,t){const{name:n,type:r}=t;return`-- change column type
ALTER TABLE ${e}
    ALTER COLUMN ${n} TYPE ${r};
-- change column name
ALTER TABLE ${e}
    RENAME COLUMN ${n} TO ${n};`}updateColumnSql(e){return new Ze(e).genAlterSQL()}showUsers(){return'SELECT usename "user" from pg_user '}updateTable(e){const{table:t,newTableName:n,comment:r,newComment:l}=e;let a="";return l&&l!=r&&(a=`COMMENT ON TABLE "${t}" IS '${l}';`),n&&t!=n&&(a+=`ALTER TABLE "${t}" RENAME TO "${n}";`),a}truncateDatabase(e){return`SELECT Concat('TRUNCATE TABLE "',TABLE_NAME, '";') trun FROM INFORMATION_SCHEMA.TABLES WHERE  table_schema ='${e}' AND table_type='BASE TABLE';`}createDatabase(e){return"CREATE DATABASE $1"}showTableSource(e,t){return`SHOW TABLE "${e}"."${t}"`}showViewSource(e,t){return`SHOW VIEW "${e}"."${t}"`}showProcedureSource(e,t){return`select pg_get_functiondef('${e}.${t}' :: regproc) "Create Procedure",'${t}' "Procedure";`}showFunctionSource(e,t){return`select pg_get_functiondef('${e}.${t}' :: regproc) "Create Function",'${t}' "Function";`}showTriggerSource(e,t){return`select pg_get_triggerdef(oid) "SQL Original Statement",'${e}.${t}' "Trigger" from pg_trigger where tgname = '${t}';`}showPartitions(e,t){return""}showSequences(e){return`SELECT sequence_name name FROM information_schema.sequences WHERE sequence_schema = '${e}' ORDER BY sequence_name`}showTriggers(e,t){const n=t?` AND event_object_table='${t}'`:"";return`SELECT TRIGGER_NAME "trigger_name" FROM information_schema.TRIGGERS WHERE trigger_schema = '${e}' ${n} ORDER BY TRIGGER_NAME ASC`}showProcedures(e){return`SELECT ROUTINE_NAME "ROUTINE_NAME" FROM information_schema.routines WHERE ROUTINE_SCHEMA = '${e}' and ROUTINE_TYPE='PROCEDURE' ORDER BY ROUTINE_NAME ASC`}showFunctions(e){return`SELECT ROUTINE_NAME "ROUTINE_NAME" FROM information_schema.routines WHERE ROUTINE_SCHEMA = '${e}' and ROUTINE_TYPE='FUNCTION' ORDER BY ROUTINE_NAME ASC `}showTables(e,t){return`  SELECT t.table_name "name", pg_catalog.obj_description(pgc.oid, 'pg_class') "comment"
FROM information_schema.tables t
JOIN pg_catalog.pg_class pgc ON t.table_name = pgc.relname
JOIN pg_catalog.pg_namespace pgn ON pgn.oid=pgc.relnamespace and pgn.nspname=t.table_schema
WHERE t.table_type='BASE TABLE'
AND t.table_schema='${t}' order by t.table_name;`}showSchemas(){return'SELECT nspname "schema" from pg_catalog.pg_namespace order by nspname ASC;'}tableTemplate(){return`CREATE TABLE table_name$1(
    id INT identity(1, 1) NOT NULL PRIMARY KEY,
    create_time DATE,
    update_time DATE,
    content$2 VARCHAR(255)
);
COMMENT ON TABLE table_name IS 'table_comment';
COMMENT ON COLUMN table_name.content IS 'content';`}procedureTemplate(){return`CREATE PROCEDURE procedure_name()
as $$
begin
    SELECT 1;
END;
$$ LANGUAGE plpgsql;`}functionTemplate(){return`CREATE FUNCTION function_name()
RETURNS int STABLE
AS $$
    SELECT 1
$$ LANGUAGE sql;`}}class tn extends Ee{showVersion(){return'select CURRENT_VERSION() as "server_version";'}createIndex(e){let t=`${e.type||"key"}`;return t.match(/BTREE/i)&&(t="key"),`ALTER TABLE ${e.table} ADD ${t} (\`${e.column||"$1"}\`)`}dropIndex(e,t){return`ALTER TABLE ${e} DROP INDEX \`${t}\``}showIndex(e,t){return""}variableList(){return"show global VARIABLES"}statusList(){return"show global status"}processList(){return"show processlist"}addColumn(e,t){const n=t?` AFTER \`${t}\``:"";return`ALTER TABLE ${e} 
    ADD COLUMN $1 [type]$2 COMMENT '$3'${n};`}createUser(){return`CREATE USER '$1'@'%' IDENTIFIED BY 'password$2';
-- Grant select privilege to all databases;
GRANT SELECT ON *.* TO '$1'@'%' WITH GRANT OPTION;
-- Grant all privileges to all databases;
GRANT ALL PRIVILEGES ON *.* TO '$1'@'%' WITH GRANT OPTION;`}updateUser(e){return`update mysql.user set 
    password = PASSWORD("newPassword")
    where User = '${e}';
FLUSH PRIVILEGES;
-- since mysql version 5.7, password column need change to authentication_string=PASSWORD("newPassword")`}updateColumn(e,t){var R;const{name:n,type:r,comment:l,nullable:a,defaultValue:i,extra:o,character_set_name:m,collation_name:L}=t,O=a!="YES";return new Y(`ALTER TABLE ${e}`).append(`
	CHANGE ${n} ${n} ${r}`).if(m,`CHARACTER SET ${m}`).if(L,`COLLATE ${L}`).if(O,"NOT NULL").if((R=o==null?void 0:o.toLowerCase())==null?void 0:R.includes("auto_increment"),"AUTO_INCREMENT").if(l,`COMMENT '${l}'`).if(Q(i)&&!O,"DEFAULT NULL").if(!Q(i),`DEFAULT ${i=="CURRENT_TIMESTAMP"?i:`'${ct(i)}'`}`).toString()}updateColumnSql(e){const{table:t,columnName:n,newColumnName:r,columnType:l,isNotNull:a,isAutoIncrement:i,comment:o,defaultValue:m,oldRow:L}=e,O=`ALTER TABLE "${t}"`,R=a?"SET NOT NULL":"DROP NOT NULL";return new Y(`${O} ALTER COLUMN "${n}" TYPE ${l};`,`
`).if(o&&o!=L.comment,`${O} ALTER COLUMN "${n}" COMMENT '${o}';`).if(a!=L.isNotNull,`${O} ALTER COLUMN "${n}" ${R};`).if(n!=r,`${O} RENAME COLUMN "${n}" TO "${r}";`).toString()}showCollations(){return""}showChecks(e,t){return""}showUsers(){return"SELECT user user,host host FROM mysql.user;"}pingDataBase(e,t){return e?`use "${t}"."${e}"`:"select 1"}updateTable(e){const{table:t,newTableName:n,comment:r,newComment:l,collation:a,newCollation:i}=e;let o="";return l&&l!=r&&(o=`ALTER TABLE \`${t}\` COMMENT = '${l}';`),i&&i!=a&&(o+=`ALTER TABLE \`${t}\` collate = '${i}';`),n&&t!=n&&(o+=`ALTER TABLE \`${t}\` RENAME TO \`${n}\`;`),o}truncateDatabase(e){return`SELECT Concat('TRUNCATE TABLE \`',table_schema,'\`.\`',TABLE_NAME, '\`;') trun FROM INFORMATION_SCHEMA.TABLES where  table_schema ='${e}' and TABLE_TYPE<>'VIEW';`}createDatabase(e){return`CREATE DATABASE $1
    DEFAULT CHARACTER SET = 'utf8mb4';`}showTableSource(e,t){return`select get_ddl('table', '${e}.${t}') "Create Table";`}showViewSource(e,t){return`select get_ddl('view', '${e}.${t}') "Create View";`}showProcedureSource(e,t){return`select get_ddl('PROCEDURE', '${e}.${t}()') "Create Procedure";`}showFunctionSource(e,t){return`select get_ddl('FUNCTION', '${e}.${t}()') "Create Function";`}showTriggerSource(e,t){return`SHOW CREATE TRIGGER \`${e}\`.\`${t}\`;`}showColumns(e,t){return`SELECT 
        c.COLUMN_NAME "name",
        DATA_TYPE "type",
        CHARACTER_MAXIMUM_LENGTH "maximum_length",
        IS_IDENTITY "key",
        COMMENT "comment",
        IS_NULLABLE "nullable",
        COLUMN_DEFAULT "defaultValue",
        COLLATION_NAME "$"
        FROM information_schema.columns c
        WHERE c.table_schema = '${e}' AND c.table_name = '${t}' 
        ORDER BY c.ORDINAL_POSITION;`}showTriggers(e,t){const n=t?` AND EVENT_OBJECT_TABLE='${t}'`:"";return`SELECT TRIGGER_NAME FROM information_schema.TRIGGERS WHERE TRIGGER_SCHEMA = '${e}' ${n} ORDER BY TRIGGER_NAME;`}showProcedures(e){return`SELECT PROCEDURE_NAME ROUTINE_NAME FROM information_schema.PROCEDURES WHERE PROCEDURE_SCHEMA = '${e}' ORDER BY PROCEDURE_NAME`}showFunctions(e){return`SELECT FUNCTION_NAME ROUTINE_NAME FROM INFORMATION_SCHEMA.FUNCTIONS WHERE FUNCTION_SCHEMA='${e}' ORDER BY FUNCTION_NAME`}showViews(e,t){return`SELECT COMMENT "comment",TABLE_NAME "name",ROW_COUNT "table_rows"
        FROM information_schema.TABLES  WHERE TABLE_SCHEMA = '${t}' and TABLE_TYPE='VIEW' ORDER BY TABLE_NAME;`}buildPageSql(e,t,n){return`SELECT * FROM ${t} LIMIT ${n};`}showTables(e,t){return`SELECT COMMENT "comment",TABLE_NAME "name",ROW_COUNT "table_rows"
        FROM information_schema.TABLES  WHERE TABLE_SCHEMA = '${t}' and TABLE_TYPE<>'VIEW' ORDER BY TABLE_NAME;`}showDatabases(){return"show databases;"}showSchemas(){return'SELECT SCHEMA_NAME "schema" FROM INFORMATION_SCHEMA.SCHEMATA;'}tableTemplate(){return`CREATE TABLE table_name$1(  
    id int NOT NULL PRIMARY KEY AUTOINCREMENT,
    create_time DATE,
    name$2 VARCHAR(255)
);
COMMENT ON TABLE table_name$1 IS '$3';
COMMENT ON COLUMN table_name$1.name$2 IS '$4';`}viewTemplate(){return`CREATE VIEW view_name$1
AS
SELECT * FROM $2`}procedureTemplate(){return`create procedure proc_name$1() returns string
language javascript
as $$
    $2return 1+1;
$$;`}functionTemplate(){return`CREATE FUNCTION fun_name$1() RETURNS int
AS
$$
    $2return 1;
$$`}}class xe extends He{showVersion(){return"select sqlite_version() as server_version"}updateColumn(e,t){throw new Error("SQLite not support update column.")}updateColumnSql(e){throw new Error("SQLite not support update column.")}createIndex(e){const{table:t,column:n="$2"}=e;return`CREATE INDEX ${`${t}_${n}`} ON ${t}(${n});`}showIndex(e,t){return`SELECT name index_name FROM sqlite_master WHERE type='index' and tbl_name='${t}' `}dropIndex(e,t){return`DROP INDEX ${t};`}showTables(e,t){return"SELECT name, type FROM sqlite_master WHERE type='table' ORDER BY type ASC, name ASC;"}addColumn(e,t){return`ALTER TABLE ${e} 
    ADD COLUMN $1 [type$2];`}showSequences(e){return"SELECT name,seq sequence FROM sqlite_sequence"}showColumns(e,t){return`SELECT t1.*,t1.pk "key",t1.dflt_value "defaultValue",t2."table" "referenced_table",t2."to" "referenced_column" FROM PRAGMA_TABLE_INFO('${t}') t1
        left join (
            SELECT * FROM  pragma_foreign_key_list('${t}')
        ) t2  on t1.name=t2.'from';`}showViews(e,t){return"SELECT name, type FROM sqlite_master WHERE type='view' AND name <> 'sqlite_sequence' AND name <> 'sqlite_stat1' ORDER BY type ASC, name ASC;"}showTriggers(e,t){return`SELECT name, tbl_name, sql FROM sqlite_master WHERE type='trigger' ${t?` AND tbl_name='${t}'`:""} ORDER BY name ASC;`}buildPageSql(e,t,n){return`SELECT * FROM ${t} LIMIT ${n};`}showTableSource(e,t){return`SELECT sql "Create Table" FROM sqlite_master where name='${t}' and type='table';`}showViewSource(e,t){return`SELECT sql "Create View" FROM sqlite_master where name='${t}' and type='view';`}showTriggerSource(e,t){return`SELECT sql FROM sqlite_master where name='${t}' and type='trigger';`}tableTemplate(){return`CREATE TABLE table_name$1(  
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    content TEXT
);`}viewTemplate(){return`CREATE VIEW view_name$1
AS
SELECT * FROM $2`}}class nn extends xe{showVersion(){return"SELECT library_version as server_version from pragma_version()"}pingDataBase(e,t){return e?`set schema '${e}';`:null}showDatabases(){return'SELECT DISTINCT catalog_name "Database" from information_schema.schemata ORDER BY catalog_name'}showSchemas(e){return`SELECT schema_name "schema" from information_schema.schemata WHERE catalog_name='${e}' ORDER BY schema_name`}showTables(e,t){return`SELECT table_name "name" FROM information_schema.tables
        WHERE table_type in ('BASE TABLE','LOCAL TEMPORARY') and table_catalog='${e}' and table_schema = '${t}' order by table_name`}showViews(e,t){return`
SELECT table_name "name",1 "view_group",null "source" FROM information_schema.tables
        WHERE table_type='VIEW' and table_catalog='${e}' and table_schema = '${t}'
        UNION all
SELECT viewname "name",2 "view_group",definition "source" FROM pg_catalog.pg_views
        WHERE schemaname = '${t}'
ORDER BY "view_group",name`}showSequences(e){return`SELECT sequence_name AS name, last_value AS sequence 
                FROM duckdb_sequences() 
                WHERE schema_name = '${e}'`}tableTemplate(){return`CREATE TABLE table_name$1(  
    id INTEGER NOT NULL PRIMARY KEY,
    content TEXT
);`}showColumns(e,t){return["system","temp"].includes(e)?`SELECT column_name "name", data_type "type",
        column_default "defaultValue", is_nullable "nullable"
        FROM information_schema.columns c
        WHERE c.table_schema = '${e}' AND c.table_name = '${t}' 
        ORDER BY c.ORDINAL_POSITION;`:`SELECT t1.*,t1.pk "key",t1.dflt_value "defaultValue" FROM PRAGMA_TABLE_INFO('${t}') t1;`}updateColumn(e,t){const{name:n,type:r}=t;return`-- change column type
ALTER TABLE ${e} 
    ALTER COLUMN ${n} TYPE ${r};
-- change column name
ALTER TABLE ${e} 
    RENAME COLUMN ${n} TO ${n};`}updateColumnSql(e){return new ge(e).genAlterSQL()}}class et extends pe{showVersion(){return"select version() as server_version;"}showDatabases(){return"show databases"}showTables(e,t){return`show tables in ${e}`}showColumns(e,t){return`describe ${e}.${t};`}showViews(e,t){return`show views in ${e}`}}class an extends pe{showVersion(){return"SELECT node_version as server_version FROM system.runtime.nodes;"}pingDataBase(e){return e?`use ${e}`:null}showDatabases(){return"show catalogs"}}class rn extends pe{showVersion(){return"select release_version from system.local;"}showUsers(){return'SELECT role as "user" FROM system_auth.roles;'}pingDataBase(e){return e?`use ${e}`:null}createDatabase(e){return`CREATE KEYSPACE $1
WITH REPLICATION = { 
    'class' : 'SimpleStrategy', 
    'replication_factor' : 1 
};`}showDatabases(){return'select keyspace_name as "database" from system_schema.keyspaces;'}showTables(e,t){return`select table_name as "name" from system_schema.tables where keyspace_name='${e}'`}showColumns(e,t){return`select column_name as "name", type, kind as "key" 
                from system_schema.columns 
                where keyspace_name='${e}' 
                and table_name='${t}'`}tableTemplate(){return`CREATE TABLE table_name$1(  
    id int PRIMARY key,
    create_time DATE,
    update_time DATE,
    content TEXT
);`}}class ln extends ge{otherPart(){const{oldRow:e,isAutoIncrement:t}=this.param;return!e.isAutoIncrement&&t?`${this.afterColumnPrefix} SET GENERATED ALWAYS as identity;`:e.isAutoIncrement&&!t?`${this.afterColumnPrefix} DROP GENERATED;`:null}commentPart(){const{oldRow:e,table:t,columnName:n,comment:r}=this.param;if(r!=e.comment)return`COMMENT ON COLUMN "${t}"."${n}" is '${r}';`}changeTypePart(){const{oldRow:e,columnType:t}=this.param;return e.type==t?"":`${this.afterColumnPrefix} SET DATA TYPE ${t};`}}class tt extends pe{showVersion(){return'SELECT SERVICE_LEVEL as "server_version" FROM SYSIBMADM.ENV_INST_INFO;'}showUsers(){return`SELECT GRANTEE "user" FROM syscat.dbauth WHERE GRANTEETYPE='U';`}pingDataBase(e){return e?`set SCHEMA ${e}`:null}showDatabases(){return'select schemaname "database" from syscat.schemata'}showTableSource(e,t){return null}showTables(e,t){return`select tabname "name", remarks "comment" from syscat.tables where tabschema='${t}' and TYPE='T' order by tabname`}showColumns(e,t){return`select COLUMN_NAME "name",
        DATA_TYPE "type",
        IS_NULLABLE "nullable",
        NUMERIC_PRECISION "precision",
        NUMERIC_SCALE "scale",
        CHARACTER_MAXIMUM_LENGTH "maximum_length",
        sc.length "number_length",
        COLUMN_DEFAULT "defaultValue",
        tc.TYPE "key",
        sc.remarks "comment",
        sc.IDENTITY "extra",
        r.REFTABNAME "referenced_table",
        trim(r.PK_COLNAMES) "referenced_column"
        from SYSIBM.columns c
        left join syscat.keycoluse kc
            on c.TABLE_SCHEMA=kc.TABSCHEMA and c.TABLE_NAME=kc.TABNAME  and c.COLUMN_NAME=kc.COLNAME
        left join SYSCAT.tabconst tc
            on c.TABLE_SCHEMA=tc.TABSCHEMA and c.TABLE_NAME=tc.TABNAME  and tc.CONSTNAME=kc.CONSTNAME
        left join sysibm.syscolumns sc
            on c.TABLE_SCHEMA=sc.TBCREATOR and c.TABLE_NAME=sc.TBNAME  and c.COLUMN_NAME=sc.NAME
        left join syscat.references r
            on c.TABLE_SCHEMA=r.TABSCHEMA and c.TABLE_NAME=r.TABNAME  and c.COLUMN_NAME=trim(r.FK_COLNAMES)
        where
            TABLE_SCHEMA = '${e}'
            and TABLE_NAME = '${t}'
        order by ORDINAL_POSITION;`}updateColumnSql(e){return new ln(e).genAlterSQL()}showAllForeignKeys(){return`SELECT 
        CONSTNAME "constraint_name",
        TABSCHEMA "table_schema",
        TABNAME "table_name",
        FK_COLNAMES "column_name",
    REFTABNAME "referenced_table",
    PK_COLNAMES "referenced_column"
     FROM syscat.references`}showForeignKeys(e,t){return`SELECT 
        FK_COLNAMES "column_name",
        CONSTNAME "constraint_name",
        REFTABNAME "referenced_table",
        PK_COLNAMES "referenced_column",
        UPDATERULE "updateRule",
        DELETERULE "deleteRule"
         FROM syscat.references WHERE 
        TABSCHEMA='${e}' and TABNAME='${t}'`}showIndex(e,t){return`SELECT 
        COLNAMES "column_name",
        INDNAME "index_name",
        UNIQUERULE='U' "isUnique"
         FROM SYSCAT.INDEXES WHERE TABNAME = '${t}' AND TABSCHEMA = '${e}'`}showViews(e,t){return`select VIEWNAME "name",TEXT "source" from SYSCAT.VIEWS where VIEWSCHEMA = '${t}';`}showProcedures(e){return`select PROCNAME "routine_name",TEXT "source" from SYSCAT.procedures where PROCSCHEMA = '${e}' order by PROCNAME;`}showChecks(e,t){return`SELECT CONSTNAME "name",TEXT "clause" FROM SYSCAT.CHECKS WHERE TABNAME = '${t}' AND TABSCHEMA = '${e}';`}showTriggers(e,t){let n=`SELECT TRIGNAME "trigger_name",TEXT "source",TABNAME "table_name",TRIGEVENT "event" FROM syscat.triggers WHERE TABSCHEMA = '${e}'`;return t&&(n+=`AND TABNAME = '${t}'`),n}showFunctions(e){return`select FUNCNAME "routine_name",BODY "source" from SYSCAT.FUNCTIONS where FUNCSCHEMA = '${e}' order by FUNCNAME;`}dropIndex(e,t){return`DROP INDEX "${t}"`}createDatabase(e){return`CREATE SCHEMA ${e}$1;`}tableTemplate(){return`CREATE TABLE table_name$1(  
    id INTEGER NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    create_time DATE,
    update_time DATE,
    content VARCHAR(255)
);`}processList(){return`SELECT session_auth_id,
        application_handle,
        elapsed_time_sec,
        activity_state,
        rows_read,
        stmt_text info
 FROM sysibmadm.mon_current_sql
 ORDER BY elapsed_time_sec DESC`}}class sn extends Ue{tableTemplate(){return`CREATE TABLE table_name(  
    id int NOT NULL  COMMENT 'Primary Key',
    create_time DATETIME COMMENT 'Create Time',
    name VARCHAR(255)
) 
AGGREGATE KEY(id,create_time,name)
DISTRIBUTED BY HASH(id) BUCKETS 1
PROPERTIES (
    "replication_allocation" = "tag.location.default: 1"
);`}showColumns(e,t){return`SELECT 
        c.COLUMN_NAME name,
        COLUMN_TYPE type,
        COLUMN_COMMENT comment,COLUMN_KEY \`key\`,IS_NULLABLE nullable,
        CHARACTER_MAXIMUM_LENGTH maximum_length,
        COLUMN_DEFAULT defaultValue,
        INSTR(COLUMN_TYPE,'zerofill')>0 "zerofill",
        INSTR(COLUMN_TYPE,'unsigned')>0 "unsigned",
        EXTRA extra,
        COLLATION_NAME collation_name,
        CHARACTER_SET_NAME character_set_name 
        FROM information_schema.columns c
        WHERE c.table_schema = '${e}' AND c.table_name = '${t}' 
        ORDER BY c.ORDINAL_POSITION;`}}class on extends Ee{showVersion(){return"SELECT SERVER_VERSION();"}createIndex(e){let t=`${e.type||"key"}`;return t.match(/BTREE/i)&&(t="key"),`ALTER TABLE ${e.table} ADD ${t} (\`${e.column||"$1"}\`)`}dropIndex(e,t){return`ALTER TABLE ${e} DROP INDEX \`${t}\``}showIndex(e,t){return`SELECT column_name "column_name",index_name "index_name",index_type "index_type",non_unique=0 "isUnique" FROM INFORMATION_SCHEMA.STATISTICS WHERE table_schema='${e}' and table_name='${t}';`}variableList(){return"show global VARIABLES"}statusList(){return"show global status"}processList(){return"show processlist"}addColumn(e,t){const n=t?` AFTER \`${t}\``:"";return`ALTER TABLE ${e} 
    ADD COLUMN $1 [type]$2 COMMENT '$3'${n};`}createUser(){return`CREATE USER '$1'@'%' IDENTIFIED BY 'password$2';
-- Grant select privilege to all databases;
GRANT SELECT ON *.* TO '$1'@'%' WITH GRANT OPTION;
-- Grant all privileges to all databases;
GRANT ALL PRIVILEGES ON *.* TO '$1'@'%' WITH GRANT OPTION;`}updateUser(e){return`update mysql.user set 
    password = PASSWORD("newPassword")
    where User = '${e}';
FLUSH PRIVILEGES;
-- since mysql version 5.7, password column need change to authentication_string=PASSWORD("newPassword")`}updateColumn(e,t){var l,a;const{nullable:n,extra:r}=t;return this.updateColumnSql({table:e,...t,isNotNull:n!="YES",isAutoIncrement:(a=(l=r==null?void 0:r.toLowerCase())==null?void 0:l.includes)==null?void 0:a.call(l,"auto_increment")})}updateColumnSql(e){const{table:t,name:n,columnName:r=n,type:l,unsigned:a,zerofill:i,useCurrentTimestamp:o,isNotNull:m,isAutoIncrement:L,comment:O,defaultValue:R,character_set_name:v,collation_name:_}=e,C=!mt(l)&&!l.match(/json/i);return new Y(`ALTER TABLE \`${t}\``).append(`
	CHANGE \`${r}\` \`${n}\` ${l}`).if(a=="1","UNSIGNED").if(i=="1","ZEROFILL").if(o,"ON UPDATE CURRENT_TIMESTAMP").if(C&&v,`CHARACTER SET ${v}`).if(C&&_,`COLLATE ${_}`).if(m,"NOT NULL").if(L,"AUTO_INCREMENT").if(O,`COMMENT '${O}'`).if(Q(R)&&!m,"DEFAULT NULL").if(!Q(R),`DEFAULT ${R=="CURRENT_TIMESTAMP"?R:`${re(R,l)}`}`).append(";").toString()}showCollations(){return null}showChecks(e,t){return`SELECT
        tc.CONSTRAINT_NAME "name",
        cc.CHECK_CLAUSE "clause"
    FROM
        information_schema.CHECK_CONSTRAINTS AS cc,
        information_schema.TABLE_CONSTRAINTS AS tc
    WHERE
        tc.CONSTRAINT_SCHEMA = '${e}'
        AND tc.TABLE_NAME = '${t}'
        AND tc.CONSTRAINT_TYPE = 'CHECK'
        AND tc.CONSTRAINT_SCHEMA = cc.CONSTRAINT_SCHEMA
        AND tc.CONSTRAINT_NAME = cc.CONSTRAINT_NAME;`}showUsers(){return"SELECT user user,host host FROM mysql.user;"}pingDataBase(e){return e?`use \`${e}\``:null}updateTable(e){const{table:t,newTableName:n,comment:r,newComment:l,collation:a,newCollation:i}=e;let o="";return l&&l!=r&&(o=`ALTER TABLE \`${t}\` COMMENT = '${l}';`),i&&i!=a&&(o+=`ALTER TABLE \`${t}\` collate = '${i}';`),n&&t!=n&&(o+=`ALTER TABLE \`${t}\` RENAME TO \`${n}\`;`),o}truncateDatabase(e){return`SELECT Concat('TRUNCATE TABLE \`',table_schema,'\`.\`',TABLE_NAME, '\`;') trun FROM INFORMATION_SCHEMA.TABLES where  table_schema ='${e}' and TABLE_TYPE<>'VIEW';`}createDatabase(e){return"CREATE DATABASE $1;"}showTableSource(e,t){return`SHOW CREATE TABLE \`${e}\`.\`${t}\`;`}showPartitions(e,t){return`SELECT 
PARTITION_NAME "name",PARTITION_METHOD "strategy",PARTITION_EXPRESSION "columnName",
PARTITION_DESCRIPTION "value",TABLE_ROWS "rows",DATA_LENGTH "length"
        FROM information_schema.partitions WHERE TABLE_SCHEMA='${e}' AND TABLE_NAME = '${t}' AND PARTITION_NAME IS NOT NULL`}showViewSource(e,t){return`SHOW CREATE VIEW  \`${e}\`.\`${t}\`;`}showProcedureSource(e,t){return`SHOW CREATE PROCEDURE \`${e}\`.\`${t}\`;`}showFunctionSource(e,t){return`SHOW CREATE FUNCTION \`${e}\`.\`${t}\`;`}showTriggerSource(e,t){return`SHOW CREATE TRIGGER \`${e}\`.\`${t}\`;`}showColumns(e,t){return`desc ${t}`}showForeignKeys(e,t){return`SELECT
        c.COLUMN_NAME column_name, ik.CONSTRAINT_NAME constraint_name,
        ik.REFERENCED_TABLE_NAME referenced_table, ik.REFERENCED_COLUMN_NAME referenced_column,
        UPDATE_RULE "updateRule",
        DELETE_RULE "deleteRule"
        FROM
        information_schema.columns c join information_schema.KEY_COLUMN_USAGE ik on c.table_schema = ik.TABLE_SCHEMA
        and c.table_name = ik.TABLE_NAME and c.COLUMN_NAME = ik.COLUMN_NAME
        JOIN information_schema.REFERENTIAL_CONSTRAINTS ir on ik.CONSTRAINT_NAME=ir.CONSTRAINT_NAME
        WHERE c.table_schema = '${e}' and c.table_name = '${t}' ORDER BY ik.CONSTRAINT_NAME;`}showProcedures(e){return`SELECT ROUTINE_NAME FROM information_schema.routines WHERE ROUTINE_SCHEMA = '${e}' and ROUTINE_TYPE='PROCEDURE' ORDER BY ROUTINE_NAME`}showFunctions(e){return`SELECT ROUTINE_NAME FROM information_schema.routines WHERE ROUTINE_SCHEMA = '${e}' and ROUTINE_TYPE='FUNCTION' ORDER BY ROUTINE_NAME`}showViews(e){return`SELECT TABLE_NAME name,SECURITY_TYPE "view_group" FROM information_schema.VIEWS  WHERE TABLE_SCHEMA = '${e}' ORDER BY TABLE_NAME`}buildPageSql(e,t,n){return`SELECT * FROM ${t} LIMIT ${n};`}showTables(e){return`show ${e}.tables;`}showDatabases(){return"show databases"}showSchemas(){return this.showDatabases()}tableTemplate(e){return`CREATE TABLE table_name$1(  
    create_time timestamp,
    name$2 NCHAR(255)
);`}viewTemplate(){return`CREATE VIEW view_name$1
AS
SELECT * FROM $2`}procedureTemplate(){return`CREATE PROCEDURE proc_name$1()
BEGIN
$2
END;`}functionTemplate(){return`CREATE FUNCTION fun_name$1() RETURNS int$2
READS SQL DATA
BEGIN
    $3
    return 0;
END;`}}class En extends et{showVersion(){return""}}class un extends pe{showDatabases(){return"SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA ORDER BY SCHEMA_NAME;"}showTables(e,t=e){return`SELECT table_name,ddl source FROM ${t}.INFORMATION_SCHEMA.TABLES  WHERE TABLE_SCHEMA = '${t}' and TABLE_TYPE<>'VIEW' ORDER BY TABLE_NAME;`}showTableSource(e,t){return`SELECT ddl source FROM ${e}.INFORMATION_SCHEMA.TABLES  WHERE TABLE_SCHEMA = '${e}' and table_name='${t}' ORDER BY TABLE_NAME;`}showColumns(e,t){return`SELECT COLUMN_NAME name,DATA_TYPE type, IS_NULLABLE nullable 
            FROM ${e}.INFORMATION_SCHEMA.COLUMNS WHERE table_schema = '${e}' AND table_name = '${t}' ORDER BY ORDINAL_POSITION;`}showViews(e,t=e){return`SELECT TABLE_NAME,view_definition source FROM ${t}.INFORMATION_SCHEMA.VIEWS  WHERE TABLE_SCHEMA = '${t}' ORDER BY TABLE_NAME`}tableTemplate(e){return`CREATE TABLE ${e}.table_name$1(  
    id INT64,
    create_time DATE,
    update_time DATE,
    content STRING
);`}viewTemplate(){return`CREATE VIEW view_name$1
AS
SELECT * FROM `}}class cn extends tt{showVersion(){return"SELECT SYSTEM_VALUE_NAME, CURRENT_CHARACTER_VALUE FROM QSYS2.SYSTEM_VALUE_INFO WHERE SYSTEM_VALUE_NAME IN ('QSRLNBR', 'QMODEL');"}showUsers(){return`SELECT AUTHORIZATION_NAME AS "user" FROM QSYS2.USER_INFO WHERE STATUS = 'ENABLED';`}pingDataBase(e){return e?`SET SCHEMA ${e}`:null}showDatabases(){return'SELECT SCHEMA_NAME AS "database" FROM QSYS2.SYSSCHEMAS;'}showTables(e,t){return`SELECT TABLE_NAME AS "name", TABLE_TEXT AS "comment" FROM QSYS2.SYSTABLES WHERE TABLE_SCHEMA='${t}' AND TABLE_TYPE='T' ORDER BY TABLE_NAME;`}showColumns(e,t){return`SELECT COLUMN_NAME AS "name",
                       DATA_TYPE AS "type",
                       IS_NULLABLE AS "nullable",
                       NUMERIC_PRECISION AS "precision",
                       NUMERIC_SCALE AS "scale",
                       CHARACTER_MAXIMUM_LENGTH AS "maximum_length",
                       COLUMN_DEFAULT AS "defaultValue",
                       COLUMN_TEXT AS "comment",
                       IDENTITY AS "extra"
                FROM QSYS2.SYSCOLUMNS
                WHERE TABLE_SCHEMA = '${e}'
                  AND TABLE_NAME = '${t}'
                ORDER BY ORDINAL_POSITION;`}showAllForeignKeys(){return`SELECT 
                    CONSTRAINT_NAME AS "constraint_name",
                    TABLE_SCHEMA AS "table_schema",
                    TABLE_NAME AS "table_name",
                    CONSTRAINT_KEYS AS "column_name",
                    SYSTEM_TABLE_NAME AS "referenced_table",
                    SYSTEM_CONSTRAINT_SCHEMA AS "referenced_column"
                FROM QSYS2.SYSCST
                WHERE CONSTRAINT_TYPE = 'FOREIGN KEY';`}showForeignKeys(e,t){return`SELECT 
                    CONSTRAINT_KEYS AS "column_name",
                    CONSTRAINT_NAME AS "constraint_name",
                    SYSTEM_TABLE_NAME AS "referenced_table",
                    SYSTEM_CONSTRAINT_SCHEMA AS "referenced_column"
                FROM QSYS2.SYSCST
                WHERE TABLE_SCHEMA='${e}' AND TABLE_NAME='${t}' AND CONSTRAINT_TYPE='FOREIGN KEY';`}showIndex(e,t){return`SELECT 
                    INDEX_NAME AS "index_name",
                    COLUMN_NAME AS "column_name",
                    CASE WHEN NON_UNIQUE = 0 THEN 'YES' ELSE 'NO' END AS "isUnique"
                FROM QSYS2.SYSINDEXES
                WHERE TABLE_NAME = '${t}' AND TABLE_SCHEMA = '${e}';`}showViews(e,t){return`SELECT VIEW_NAME AS "name", VIEW_DEFINITION AS "source" FROM QSYS2.SYSVIEWS WHERE TABLE_SCHEMA = '${t}';`}showProcedures(e){return`SELECT SPECIFIC_NAME AS "routine_name", ROUTINE_DEFINITION AS "source" FROM QSYS2.SYSROUTINES WHERE ROUTINE_SCHEMA = '${e}' ORDER BY SPECIFIC_NAME;`}showChecks(e,t){return`SELECT CONSTRAINT_NAME AS "name", CHECK_CLAUSE AS "clause" FROM QSYS2.SYSCST WHERE TABLE_NAME = '${t}' AND TABLE_SCHEMA = '${e}' AND CONSTRAINT_TYPE = 'CHECK';`}showTriggers(e,t){return`SELECT TRIGGER_NAME AS "trigger_name", ACTION_STATEMENT AS "source", EVENT_OBJECT_TABLE AS "table_name", EVENT_MANIPULATION AS "event" FROM QSYS2.SYSTRIGGERS WHERE EVENT_OBJECT_SCHEMA = '${e}'${t?` AND EVENT_OBJECT_TABLE = '${t}'`:""};`}showFunctions(e){return`SELECT SPECIFIC_NAME AS "routine_name", ROUTINE_DEFINITION AS "source" FROM QSYS2.SYSFUNCS WHERE FUNCTION_SCHEMA = '${e}' ORDER BY SPECIFIC_NAME;`}dropIndex(e,t){return`DROP INDEX ${e}.${t};`}processList(){return`SELECT JOB_NAME, 
                       AUTHORIZATION_NAME, 
                       TOTAL_CPU_TIME, 
                       TOTAL_DISK_IO_COUNT, 
                       TOTAL_MEMORY_USAGE 
                FROM QSYS2.ACTIVE_JOB_INFO 
                ORDER BY TOTAL_CPU_TIME DESC;`}}class Ke extends Ue{showDatabases(){return"show databases"}showTables(e){return`show tables from ${e}`}showColumns(e,t){return`show columns from ${t}`}showViews(e){return`show views from ${e}`}showIndexes(e,t){return`show indexes from ${t}`}showFunctions(e){return`show functions from ${e}`}showProcedures(e){return`show procedures from ${e}`}showTriggers(e,t){return`show triggers from ${t}`}}class mn extends Pe{showVersion(){return"select replace(version(), 'KingbaseES ', '');"}showViewSource(e,t,n){return n?`SELECT 
    'CREATE MATERIALIZED VIEW ' || schemaname || '.' || matviewname || ' AS ' ||
    definition as mview_ddl
FROM sys_matviews
WHERE schemaname = '${e}' 
    AND matviewname = '${t}';`:`SELECT 
    'CREATE OR REPLACE VIEW ' || schemaname || '.' || viewname || ' AS ' || 
    definition as view_ddl
FROM sys_views 
WHERE schemaname = '${e}' 
    AND viewname = '${t}';`}triggerTemplate(e){return`CREATE TRIGGER trigger_name$1
[BEFORE/AFTER] INSERT ON ${e??"[table_name]$2"}
FOR EACH ROW BEGIN
    $3
END;`}}class Tn extends xe{showDatabases(){return"list"}showTables(e){return`SELECT name, type FROM sqlite_master 
                WHERE type='table' 
                AND name NOT LIKE '_cf%' 
                ORDER BY type ASC, name ASC;`}}function _n(c,e){switch(c||(c=N.MYSQL),c){case N.MYSQL:return e?new Ke:new Ue;case N.MARIA_DB:return new Jt;case N.DORIS:return new sn;case N.MYSQL_COMPATIBLE:return new Ke;case N.KINGBASE:return new mn;case N.PG:case N.COCKROACH:return e?new qe:new Pe;case N.REDSHIFT:return new qe;case N.SQLServer:return new Zt;case N.D1:return new Tn;case N.libSQL:case N.SQLITE:return new xe;case N.DUCK_DB:return new nn;case N.SNOWFLAKE:return new tn;case N.CLICKHOUSE:return new Qt;case N.DM:return new Xt;case N.ORACLE:return new ze;case N.CASSANDRA:return new rn;case N.BIG_QUERY:return new un;case N.PRESTO:case N.TRINO:return new an;case N.HIVE:return new et;case N.ATHENA:return new En;case N.DB2:return new tt;case N.AS400:return new cn;case N.MONGO_DB:return new zt;case N.NEO4J:return new en;case N.TDengine:return new on}return new pe}class ie{constructor(e){this.meta=e,this.dialect=_n(e.dbType),this.wrappedTable=ce(this.meta.table,this.meta.dbType,Tt.Always)}updateTable(e){return this.dialect.updateTable(e)}columnTypes(){return["INTEGER",{label:"VARCHAR",value:"VARCHAR(255)"},{label:"CHAR",value:"CHAR(50)"},"hr","DATE","TIMESTAMP","hr","BOOLEAN","FLOAT","DOUBLE","hr","TEXT","JSON","BLOB"]}strategies(){return["RESTRICT","CASCADE","SET NULL","SET DEFAULT","NO ACTION"]}newColumn(e){const{name:t,type:n,isNotNull:r}=e,l=r?" NOT NULL":"";return`ALTER TABLE ${this.wrappedTable} ADD COLUMN ${ce(t,this.meta.dbType)} ${n}${l}`}updateColumn(e){return this.dialect.updateColumnSql({...e,table:this.meta.table,tableMeta:this.meta,schema:this.meta.schema})}dropColumn(e){return`ALTER TABLE ${this.wrappedTable} DROP COLUMN ${ce(e,this.meta.dbType)}`}formatIndexType(e){return e.index_type}indexTypes(){return[{label:"INDEX",value:"INDEX"},{label:"UNIQUE",value:"UNIQUE"}]}newIndex(e){return`ALTER TABLE ${this.wrappedTable} ADD INDEX (${e.columns.join(",")})`}dropIndex(e){return this.dialect.dropIndex(this.wrappedTable,e)}dropTrigger(e){return this.dialect.dropTriggerTemplate(e,this.wrappedTable)}showChecks(){return this.dialect.showChecks(this.meta.schema,this.meta.table)}showForeignKeys(){return this.dialect.showForeignKeys(this.meta.schema,this.meta.table)}newForeignKey(e){const{column:t,foreignKeyName:n,refTable:r,refColumn:l,onUpdate:a,onDelete:i}=e,o=a=="NO ACTION"?"":` ON UPDATE ${a}`,m=i=="NO ACTION"?"":` ON DELETE ${i}`;return new Y(`ALTER TABLE "${this.meta.table}"`).if(n,()=>`ADD CONSTRAINT ${n}`).if(!n,"ADD").append(`FOREIGN KEY ("${t}") REFERENCES "${r}"("${l}")${o}${m};`).toString()}dropForeignKey(e){return`ALTER TABLE "${this.meta.table}" DROP CONSTRAINT ${e};`}newCheck(e){return`ALTER TABLE ${this.wrappedTable} ADD CHECK (${e});`}dropCheck(e){return`ALTER TABLE ${this.wrappedTable} DROP CONSTRAINT ${e};`}splitColumn(e,t='"'){return e.map(n=>t+n+t).join(",")}}class dn extends ie{columnTypes(){return["Int32","String","Float32","hr","Date","DateTime","hr","BOOLEAN","UUID",{label:"Array",value:"Array(String)"},"hr","JSON",{label:"Tuple",value:"Tuple(String)"},{label:"Map",value:"Map(String,String)"},"hr","Int8","Int16","Int64","Int128","Int256","UInt8","UInt16","UInt32","UInt64","UInt128","UInt256","hr","DateTime64","DateTime32","hr","Decimal32","Decimal64","Decimal128","Decimal256","hr","IPv4","IPv6","hr",{label:"Enum8",value:"Enum8('a'=1)"},{label:"Enum16",value:"Enum16('a'=1)"},"hr",{label:"FixedString",value:"FixedString(100)"}]}newColumn(e){const{name:t,type:n,defaultValue:r,comment:l}=e;return new Y(`ALTER TABLE ${this.wrappedTable} ADD COLUMN "${t}" ${n}`).if(!Q(r),`DEFAULT ${re(r,n)}`).if(l,`COMMENT '${l}'`).toString()}newIndex(e){const{columns:t}=e;return`ALTER TABLE "${this.meta.table}" ADD INDEX ${t.join("")}_${new Date().getTime()}_index expression TYPE type GRANULARITY value AFTER ${this.splitColumn(t)}`}showForeignKeys(){return null}showChecks(){return null}}class Ve extends ie{newColumn(e){const{name:t,type:n,defaultValue:r,isNotNull:l}=e;return new Y(`ALTER TABLE "${this.meta.schema}".${ce(this.meta.table,this.meta.dbType)} ADD ${ce(t,this.meta.dbType)} ${n}`).if(l,"NOT NULL").if(!Q(r),`DEFAULT ${re(r,n)}`).toString()}dropColumn(e){return`ALTER TABLE "${this.meta.schema}".${this.wrappedTable} DROP COLUMN ${ce(e,this.meta.dbType)}`}newIndex(e){const{table:t=this.meta.table,columns:n,type:r}=e,l=`${t}_${n.join("_")}_${new Date().getTime()}`;return`CREATE ${r=="UNIQUE"?"UNIQUE":""} INDEX ${l} ON "${this.meta.schema}"."${t}"(${this.splitColumn(n)});`}newCheck(e){return`ALTER TABLE "${this.meta.schema}".${this.wrappedTable} ADD CHECK (${e});`}dropCheck(e){return`ALTER TABLE "${this.meta.schema}".${this.wrappedTable} DROP CONSTRAINT ${e};`}dropForeignKey(e){return`ALTER TABLE "${this.meta.schema}"."${this.meta.table}" DROP CONSTRAINT ${e};`}newForeignKey(e){return super.newForeignKey(e).replace(`"${this.meta.table}"`,`"${this.meta.schema}"."${this.meta.table}"`)}}class An extends ie{indexTypes(){return[{label:"INDEX",value:"INDEX"},{label:"UNIQUE",value:"UNIQUE"},{label:"FULLTEXT",value:"FULLTEXT"}]}columnTypes(){return["INT",{label:"VARCHAR",value:"VARCHAR(255)"},{label:"CHAR",value:"CHAR(50)"},"hr","DATETIME","TIMESTAMP","DATE","hr","BIT","FLOAT","DOUBLE",{label:"DECIMAL",value:"DECIMAL(10,2)"},"BIGINT","hr","TEXT","JSON","BLOB","BINARY","hr",{label:"ENUM",value:"ENUM('item')"},{label:"SET",value:"SET('item')"},"hr","TINYINT","SMALLINT","MEDIUMINT","hr","TIME","YEAR","hr","VARBINARY","TINYBLOB","MEDIUMBLOB","LONGBLOB","TINYTEXT","MEDIUMTEXT","LONGTEXT","hr","GEOMETRY","POINT","LINESTRING","POLYGON","MULTIPOINT","MULTILINESTRING","MULTIPOLYGON","GEOMETRYCOLLECTION"]}newColumn(e){const{name:t,type:n,comment:r,defaultValue:l,isNotNull:a,unsigned:i,zerofill:o}=e;return console.log(e),new Y(`ALTER TABLE ${this.wrappedTable} ADD COLUMN \`${t}\` ${n}`).if(i&&i!=0,"UNSIGNED").if(o,"ZEROFILL").if(a,"NOT NULL").if(r,`COMMENT '${r}'`).if(!Q(l),`DEFAULT ${re(l,n)}`).toString()}formatIndexType(e){const t=e.index_type.toUpperCase();return t=="BTREE"?e.index_name=="PRIMARY"?"PRIMARY":Be(e.isUnique)?"UNIQUE":"KEY":t}newIndex(e){const{type:t="key",columns:n}=e;return`ALTER TABLE \`${this.meta.table}\` ADD ${t} (${this.splitColumn(n,"`")})`}newForeignKey(e){const{column:t,foreignKeyName:n,refTable:r,refColumn:l,onUpdate:a,onDelete:i}=e,o=a=="NO ACTION"?"":` ON UPDATE ${a}`,m=i=="NO ACTION"?"":` ON DELETE ${i}`;return new Y(`ALTER TABLE \`${this.meta.table}\``).if(n,()=>`ADD CONSTRAINT ${n}`).if(!n,"ADD").append(`FOREIGN KEY (\`${t}\`) REFERENCES \`${r}\`(\`${l}\`)${o}${m};`).toString()}dropForeignKey(e){return`ALTER TABLE \`${this.meta.table}\` DROP FOREIGN KEY ${e};`}}class Nn extends ie{newIndex(e){const{table:t=this.meta.table,columns:n,type:r}=e,l=`${t}_${n.join("_")}_${new Date().getTime()}`;return`CREATE ${r=="UNIQUE"?"UNIQUE":""} INDEX ${l} ON "${t}"(${this.splitColumn(n)})`}newColumn(e){const{name:t,type:n,isNotNull:r,defaultValue:l,comment:a}=e;return new Y(`ALTER TABLE ${ce(this.meta.table,this.meta.dbType)} ADD ${t} ${n}`).if(!Q(l),`DEFAULT ${re(l,n)}`).if(r,"NOT NULL").if(a,`;
COMMENT ON COLUMN ${this.wrappedTable}."${t.toUpperCase()}" is '${a}';`).toString()}newForeignKey(e){const{column:t,foreignKeyName:n,refTable:r,refColumn:l,onUpdate:a,onDelete:i}=e,o=a=="NO ACTION"?"":` ON UPDATE ${a}`,m=i=="NO ACTION"?"":` ON DELETE ${i}`,L=n||`${t}_${r}_${l}_fk_${Math.floor(Math.random()*30)}`;return`ALTER TABLE "${this.meta.table}" ADD CONSTRAINT ${L} FOREIGN KEY ("${t}") REFERENCES ${r}(${l})${o}${m};`}showForeignKeys(){var t;let{schema:e}=this.meta;return(e==null?void 0:e.toLowerCase())==((t=this.meta.user)==null?void 0:t.toLowerCase())&&(e=void 0),this.dialect.showForeignKeys(e,this.meta.table)}columnTypes(){return["INTEGER",{label:"VARCHAR2",value:"VARCHAR2(255)"},{label:"CHAR",value:"CHAR(50)"},"hr","DATE","TIMESTAMP","hr","NUMBER","FLOAT","hr","CLOB","BLOB","hr","BINARY_FLOAT","BINARY_DOUBLE","hr","TIMESTAMP WITH TIME ZONE","TIMESTAMP WITH LOCAL TIME ZONE","hr","INTERVAL YEAR TO MONTH","INTERVAL DAY TO SECOND","hr","RAW","LONG RAW","LONG","hr","NCHAR","NVARCHAR2","NCLOB","hr","BFILE","ROWID","UROWID"]}}class Rn extends ie{newColumn(e){const{name:t,type:n,comment:r,defaultValue:l,isNotNull:a}=e,i=this.wrappedTable;return new Y(`ALTER TABLE ${i} ADD COLUMN "${t}" ${n}`).if(a,"NOT NULL").if(!Q(l),`DEFAULT ${re(l,n)}`).append(";").if(r,`
COMMENT ON COLUMN ${i}."${t}" is '${r}';`).toString()}columnTypes(){return["INTEGER",{label:"VARCHAR",value:"VARCHAR(255)"},{label:"CHAR",value:"CHAR(50)"},"TIMESTAMP","DATE","BOOLEAN","FLOAT","TEXT","JSON","BLOB","hr","SMALLINT","BIGINT","REAL","DOUBLE PRECISION","hr","BYTEA","XML","UUID","ARRAY","hr","NUMERIC","MONEY","INTERVAL","CIDR","INET","MACADDR"]}indexTypes(){return[{label:"INDEX",value:"INDEX"},{label:"UNIQUE",value:"UNIQUE"},{label:"HASH",value:"HASH"}]}newIndex(e){const{table:t=this.meta.table,columns:n,type:r}=e,l=r=="HASH"?"hash":"btree";return`CREATE ${r=="UNIQUE"?"UNIQUE":""} INDEX ${n.join("_")}_${new Date().getTime()}_index ON "${t}" USING ${l} (${this.splitColumn(n)});`}}class Cn extends ie{newIndex(e){throw new Error("Method not implemented.")}dropForeignKey(e){return`ALTER TABLE "${this.meta.table}" DROP CONSTRAINT "${e}";`}showForeignKeys(){return`select
       rco.constraint_name "constraint_name",
       rco.UPDATE_RULE "updateRule",
       rco.DELETE_RULE "deleteRule",
       pk_tco.table_name "referenced_table"
from information_schema.referential_constraints rco
    join information_schema.table_constraints fk_tco on fk_tco.constraint_name = rco.constraint_name and fk_tco.constraint_schema = rco.constraint_schema
    join information_schema.table_constraints pk_tco on pk_tco.constraint_name = rco.unique_constraint_name and pk_tco.constraint_schema = rco.unique_constraint_schema
    WHERE fk_tco.TABLE_SCHEMA='${this.meta.schema}' and fk_tco.table_name='${this.meta.table}' 
    ORDER BY rco.CREATED`}}class Sn extends ie{newIndex(e){const{table:t=this.meta.table,columns:n}=e;return`CREATE INDEX ${`${t}_${n.join("_")}_${new Date().getTime()}`} ON "${t}"(${this.splitColumn(n)});`}showForeignKeys(){return`SELECT "from" column_name, "table" referenced_table, "to" referenced_column,
        on_update, on_delete 
        FROM pragma_foreign_key_list('${this.meta.table}');`}showChecks(){return null}}class pn extends ie{newColumn(e){const{type:t,defaultValue:n}=e;return new Y(super.newColumn(e)).if(!Q(n),`DEFAULT ${re(n,t)}`).toString()}newIndex(e){const{table:t=this.meta.table,columns:n}=e;return`CREATE INDEX ${`${t}_${n.join("_")}_${new Date().getTime()}`} ON "${t}"(${this.splitColumn(n)});`}showForeignKeys(){return`SELECT constraint_column_names "column_name" FROM duckdb_constraints()
        WHERE constraint_type='FOREIGN KEY' and database_name not in ('system','temp') and schema_name='${this.meta.schema}' and table_name='${this.meta.table}'`}showChecks(){return null}}class On extends Ve{columnTypes(){return["INTEGER",{label:"VARCHAR",value:"VARCHAR(255)"},{label:"CHAR",value:"CHAR(50)"},"hr","DATE","TIMESTAMP","TIME","hr","BOOLEAN","FLOAT","DOUBLE","hr","TEXT","BLOB","hr","SMALLINT","BIGINT","DECFLOAT","hr","TIMESTAMP WITH TIME ZONE","TIME WITH TIME ZONE","hr","XML","GRAPHIC","VARGRAPHIC","hr","DBCLOB","CLOB"]}}class Ln extends Ve{columnTypes(){return["INTEGER","TEXT","hr","DATE","TIMESTAMP","hr","BOOLEAN","FLOAT","DOUBLE","hr","BLOB","hr","BIGINT","SMALLINT","TINYINT","VARINT","hr","TIME","TIMEUUID","hr","DECIMAL","COUNTER","hr","UUID","INET","ASCII","DURATION"]}dropColumn(e){return`ALTER TABLE ${this.wrappedTable} DROP ${ce(e,this.meta.dbType)}`}}function bn(c){switch(c.dbType){case N.PG:case N.REDSHIFT:case N.KINGBASE:return new Rn(c);case N.DM:case N.ORACLE:return new Nn(c);case N.DB2:return new On(c);case N.CASSANDRA:return new Ln(c);case N.SQLServer:return new Ve(c);case N.SNOWFLAKE:return new Cn(c);case N.CLICKHOUSE:return new dn(c);case N.DUCK_DB:return new pn(c);case N.D1:case N.libSQL:case N.SQLITE:return new Sn(c);case N.MYSQL:case N.MARIA_DB:return new An(c);default:return new ie(c)}}const Mn={class:"mt-2 design-container"},In={id:"infoPanel"},$n={class:"tab"},hn=["onClick"],fn={class:"design-data-container"},wn=me({__name:"design",setup(c){const e=H(!1),t=_e(),n=P(()=>t.activePanel),r=P(()=>[{id:"ddl",i18n:"design.ddl",icon:"codicon-edit green"},{id:"column",i18n:"design.column",icon:"codicon-symbol-field blue"},{id:"foreignKey",i18n:"design.foreignKey",icon:"codicon-symbol-class yellow",hidden:P(()=>!t.supportForeignKey)},{id:"index",i18n:"design.index",icon:"codicon-github-action purple",hidden:P(()=>!t.supportIndex)},{id:"trigger",i18n:"design.trigger",icon:"codicon-github-action orange",hidden:P(()=>!t.supportTrigger)},{id:"check",i18n:"design.check",icon:"codicon-tools red",hidden:P(()=>!t.supportCheck||!e.value)}].filter(a=>{var i;return((i=a==null?void 0:a.hidden)==null?void 0:i.value)!=!0}));Te(()=>{D.on("dbType",a=>{t.updateDBType(a)}).on("designMeta",a=>{e.value=a.isSupportCheck,t.dialect=bn(a),t.updateFullInfo(a),D.emitImmediately("designMetaNext",a)}).on("success",()=>{je(T("design.updateSuccess"))}).on("error",a=>{we(a)}).on("refresh_design",()=>{l()}),l(),_t(55,["tableTab","infoPanel"],a=>{t.remainHeight=a})});const l=()=>{D.emit("init",{type:"design"})};return(a,i)=>(d(),U("div",Mn,[$("div",In,[s(Yt),$("ul",$n,[(d(!0),U(Z,null,oe(r.value,(o,m)=>(d(),U("li",{key:m,class:We(["tab__item",{"tab__item--active":n.value==o.id}]),onClick:L=>E(t).activePanel=o.id},[o.icon?(d(),U("i",{key:0,type:"icon",class:We(o.icon),style:{position:"relative",top:"3px"}},null,2)):f("",!0),B(" "+y(E(T)(o.i18n)),1)],10,hn))),128))])]),$("div",fn,[W(s(Ct,null,null,512),[[ne,n.value=="ddl"]]),W(s(ft,null,null,512),[[ne,n.value=="column"]]),W(s(Ot,null,null,512),[[ne,n.value=="foreignKey"]]),W(s(Nt,null,null,512),[[ne,n.value=="index"]]),W(s(jt,null,null,512),[[ne,n.value=="trigger"]]),W(s(qt,null,null,512),[[ne,n.value=="check"]])])]))}}),sa=Qe(wn,[["__scopeId","data-v-68f3d12d"]]);export{sa as default};
