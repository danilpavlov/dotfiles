"use strict";(self.webpackChunkhttp_workbench=self.webpackChunkhttp_workbench||[]).push([[7067],{67067:(e,n,l)=>{l.r(n),l.d(n,{FileUploader:()=>Oe,KeyValueEditor:()=>fl});var t=l(7560),i=l(40540),o=l.n(i),s=l(59530),r=l.n(s),a=l(78476),d=l(50297),c=l(98283),u=l(74269),h=l(69356),p=l.n(h),b=l(22833),g=l.n(b),v=l(80519),f=l(52322);let m,x,y=e=>e;const C=r().div(m||(m=y`
  position: relative;
  display: flex;

  /* TODO: non-uniform spacing because of inconsistencies with design tokens */
  width: 40px;
  justify-content: flex-end;
  align-items: center;
  padding-right: 4px;
  border-left: var(--border-width-default) var(--border-style-solid)
    var(--border-color-default);
  border-right: var(--border-width-default) var(--border-style-solid)
    var(--border-color-default);
  background-color: ${0};
`),(e=>e.disabled?"var(--background-color-secondary);":"inherit")),w=r()(v.Z)(x||(x=y`
  > span > div {
    height: 16px;
    width: 16px;
    background-color: ${0};
  }

  &.disabled {
    opacity: 0.4;
  }
`),(e=>e.isChecked?"dark"===e.theme.name?"#ffffff":"#262626":"inherit"));function k(e){return(0,f.jsx)(C,{disabled:e.disabled,children:e.shouldShowCheckbox&&(0,f.jsx)(w,{className:g()({disabled:e.isCheckboxDisabled}),isChecked:e.isRowEnabled,onChange:e.onToggleEnabledState,isDisabled:e.isCheckboxDisabled})})}const V=["content"];let j;const E=r().div(j||(j=(e=>e)`
  display: flex;
  flex: ${0};
  overflow-y: visible;
  min-width: 0;

  /* Commenting this out as it is clipping the rendering of aether dropdown in the variable-type column. */

  /* overflow-x: clip; */
  margin: var(--spacing-zero);
  position: relative;
  height: 32px;
  box-sizing: border-box;
  border-right: ${0};
  background-color: ${0};

  .key-value-cell {
    color: ${0};
  }
`),(e=>e.isLastColumn?`0 1 ${e.columnWidth}%`:`0 0 ${e.columnWidth}%`),(({isLastColumn:e})=>e?"unset":"var(--border-width-default) var(--border-style-solid)\n    var(--border-color-default)"),(e=>e.isNonEditable?"var(--background-color-secondary)":"inherit"),(e=>e.isNonEditable?"var(--content-color-secondary)":"inherit"));function S(e){let{content:n}=e,l=(0,c.Z)(e,V);return(0,f.jsx)(E,(0,t.Z)({},l,{children:n}))}const T=e=>e?e.charAt(0).toUpperCase()+e.slice(1):"";function D(e,n){if(typeof e!=typeof n)return!1;const l=typeof e;return["string","number","boolean","undefined"].includes(typeof e)?e===n:Array.isArray(e)&&Array.isArray(n)?e.length===n.length&&e.every(((e,l)=>D(e,n[l]))):"object"===l&&(null===e&&null===n||null!==e&&null!==n&&!Array.isArray(e)&&!Array.isArray(n)&&Object.keys(e).length===Object.keys(n).length&&Object.keys(e).every((l=>D(e[l],n[l]))))}var R=l(207),Z=o().createElement("svg",{width:"12",height:"12",viewBox:"0 0 12 12",fill:"none",xmlns:"http://www.w3.org/2000/svg"},o().createElement("path",{d:"M4 1V0H8V1H11V2H1V1H4Z",fill:"#6B6B6B"}),o().createElement("path",{d:"M3 10.5V3H2V10.5C2 11.3284 2.67157 12 3.5 12H8.5C9.32843 12 10 11.3284 10 10.5V3H9V10.5C9 10.7761 8.77614 11 8.5 11H3.5C3.22386 11 3 10.7761 3 10.5Z",fill:"#6B6B6B"}),o().createElement("path",{d:"M4.25 10V3H5.25V10H4.25Z",fill:"#6B6B6B"}),o().createElement("path",{d:"M6.75 3V10H7.75V3H6.75Z",fill:"#6B6B6B"})),M=o().forwardRef((function(e,n){return o().createElement(R.Z,(0,t.Z)({},e,{svg:Z,ref:n}))}));M.getName=function(){return"icon-action-delete-stroke-small"};const A=M;let W;const O=r().div(W||(W=(e=>e)`
  align-items: center;
  height: 24px;
  display: inline-flex;
  padding: 0 var(--spacing-s);
  border-radius: var(--border-radius-default);

  &:hover {
    background-color: var(--highlight-background-color-primary);
    cursor: pointer;
  }
`));function P({onClick:e}){return(0,f.jsx)(O,{className:"delete-button",onClick:e,role:"button","aria-label":"delete-row",children:(0,f.jsx)(A,{})})}function F(e,n,l){let t,i,o,s,r,a,d=0,c=!1,u=!1,h=!0;if("function"!=typeof e)throw new TypeError("Expected a function");if(n=+n||0,l&&function(e){const n=typeof e;return null!=e&&("object"===n||"function"===n)}(l)){if(c=!(null==l||!l.leading),u="maxWait"in l,u){const e=(null==l?void 0:l.maxWait)||0;o=Math.max(+e,n)}h="trailing"in l?!(null==l||!l.trailing):h}function p(n){const l=t,o=i;return t=i=void 0,d=n,s=e.apply(o,l),s}function b(e,n){return setTimeout(e,n)}function g(e){const l=e-a;return void 0===a||l>=n||l<0||u&&e-d>=o}function v(){const e=Date.now();if(g(e))return f(e);r=b(v,function(e){const l=e-d,t=n-(e-a);return u?Math.min(t,o-l):t}(e))}function f(e){return r=void 0,h&&t?p(e):(t=i=void 0,s)}function m(...e){const l=Date.now(),o=g(l);if(t=e,i=this,a=l,o){if(void 0===r)return function(e){return d=e,r=b(v,n),c?p(e):s}(a);if(u)return r=b(v,n),p(a)}return void 0===r&&(r=b(v,n)),s}return m.cancel=function(){void 0!==r&&clearTimeout(r),d=0,t=a=i=r=void 0},m.flush=function(){return void 0===r?s:f(Date.now())},m.pending=function(){return void 0!==r},m}const B=["indicators","isDuplicated"];let z,N,$=e=>e;const H=r().textarea(z||(z=$`
  width: 100%;
  color: var(--content-color-primary);
  font-size: inherit;
  font-family: inherit;
  outline: transparent;
  resize: none;
  font-weight: inherit;
  background: var(--background-color-primary);
  margin: var(--spacing-xs);
  padding: var(--spacing-xs) var(--spacing-zero) var(--spacing-xs)
    var(--spacing-xs);
  border: var(--border-width-default) var(--border-style-solid)
    var(--border-color-default);
  z-index: 1;

  ${0}
`),(({isDuplicated:e})=>e&&"padding-right: var(--spacing-l)")),L=r().div(N||(N=$`
  display: flex;
  align-items: flex-start;
  max-height: var(--size-m);
  height: 100%;
  width: 100%;
`)),I=F(((e,n,l)=>{var t,i;const o=null!=(t=(null==e?void 0:e.scrollHeight)/(null==e||null==(i=e.parentNode)?void 0:i.clientHeight))?t:0;o!==n&&l(Math.ceil(o))}),100);function K(e){let{indicators:n,isDuplicated:l}=e,t=(0,c.Z)(e,B);const o=(0,i.useRef)(null),[s,r]=(0,i.useState)(1);return(0,i.useEffect)((()=>(setTimeout((()=>{if(o.current){const e=o.current.value.length;o.current.selectionStart=e,o.current.selectionEnd=e,o.current.scrollTop=o.current.scrollHeight}})),I(o.current,s,r),()=>{I.cancel()})),[s]),(0,f.jsxs)(L,{children:[(0,f.jsx)(H,{isDuplicated:l,role:"cell","aria-label":`${t.type} input`,ref:o,value:t.value,rows:s,onChange:e=>{t.onChange(e.target.value),I(o.current,s,r)},autoFocus:t.shouldFocusOnMount,placeholder:t.placeholder||"",readOnly:t.readOnly,onBlur:t.onBlur,onKeyDown:e=>{t.preventEnter&&13===e.keyCode&&e.preventDefault()}}),n]})}let _,U,X=e=>e;function Y(e){return"string"==typeof e?e:e?e&&e.toString?String(e):Object.prototype.toString.call(e):""}function q(e,n={}){return e?("string"!=typeof e&&(e=Y(e)),e.split("\n").map(((e,l)=>(0,f.jsx)("span",{children:J(e,n)},l)))):e}function G(e,n={}){return e?("string"!=typeof e&&(e=Y(e)),J(e.split("\n")[0],n)):e}function J(e,n={}){const l=n.maxLength||100;return e?("string"!=typeof e&&(e=Y(e)),e.length<=l?e:e.slice(0,l+1)):""}const Q=r().div(_||(_=X`
  width: 100%;

  /* TODO: non-uniform spacing because of inconsistencies with design tokens */
  padding: var(--spacing-zero) var(--spacing-xs) var(--spacing-zero) 9px;
  align-items: center;
  cursor: text;
  font-size: var(--text-size-m);
  user-select: none;
  display: flex;
  height: 100%;
  box-sizing: border-box;
  justify-content: space-between;
  color: var(--content-color-primary);
  ${0}
`),(({isDuplicated:e})=>e&&"padding-right: var(--spacing-xl)")),ee=r().div(U||(U=X`
  white-space: pre;
  overflow: hidden;
  text-overflow: ellipsis;

  &:empty:not(:focus)::before {
    content: attr(data-placeholder);
    color: var(--content-color-tertiary);
  }
`));function ne(e){const n=(0,i.useRef)(null),{value:l,placeholder:t,onBlur:o,preventEnter:s,onFocus:r,type:a,currentWidth:d,actions:c,indicators:u,isDuplicated:h}=e,p=!s,b=(0,i.useCallback)((()=>{null==r||r()}),[r]),g=!l&&t,v=g?`${a} empty cell`:`${a} cell`;return(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(Q,{onBlur:o,onClick:b,ref:n,tabIndex:"0",onFocus:b,isDuplicated:h,children:(0,f.jsx)(ee,{role:"cell","aria-label":v,"data-placeholder":g?t:null,children:p?G(l,{maxLength:Math.ceil(2*d)}):q(l,{maxLength:Math.ceil(2*d)})})}),u,c]})}Q.displayName="KeyValueCellContainer";const le=[{value:"text",label:"Text"},{value:"file",label:"File"}],te="secret",ie="default";let oe;const se=r().div(oe||(oe=(e=>e)`
  padding-inline-start: var(--spacing-xs);
  display: flex;
  flex: 1;

  input {
    border: var(--border-width-default) var(--border-style-solid) transparent;
    color: var(--content-color-primary);
    width: 100%;
    font-size: var(--text-size-m);
    line-height: var(--line-height-m);
    font-family: var(--text-family-default);
    height: var(--controls-size-default);
    box-sizing: border-box;
    background-color: transparent;
    padding: var(--spacing-zero);
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
    padding-left: var(--spacing-xs);

    &:hover,
    &:focus,
    &:active {
      outline: none;
    }

    ${0};
  }
`),(({isFocused:e})=>e&&"\n        border: var(--border-width-default) var(--border-style-solid) var(--border-color-default);\n        background: var(--background-color-primary);\n        height: var(--size-s);\n        padding-left: var(--spacing-xs);\n        margin-top: var(--spacing-xs);\n        margin-right: var(--spacing-s);\n    "));function re(e){const{value:n,isEditable:l,onBlur:t,onChange:i,onFocus:o,type:s}=e,r=`${s} masked cell`;return(0,f.jsx)(se,{isFocused:Boolean(l),onBlur:t,onClick:o,onFocus:o,children:(0,f.jsx)("input",{role:"cell","aria-label":r,value:n||"",spellCheck:!1,type:"password",onChange:e=>{i(e.currentTarget.value)}},"text")})}var ae=l(16913),de=l(81397),ce=l(88131);const ue=["hidden","value","isEditable","currentWidth","readOnly","shouldFocusOnMount","onBlur","onChange","onFocus","actions","editorType","maskState","enableVariableSuggestions","placeholder","isDuplicated"];let he;const pe=r()(ae.Z)(he||(he=(e=>e)`
  position: absolute;
  align-self: center;
  right: var(--spacing-s);
  z-index: 10;
`));function be(e){const{hidden:n,value:l,isEditable:i,currentWidth:o,readOnly:s,shouldFocusOnMount:r,onBlur:a,onChange:d,onFocus:u,actions:h,editorType:p,maskState:b,enableVariableSuggestions:g,placeholder:v,isDuplicated:m}=e,x=(0,c.Z)(e,ue),y={readOnly:s,shouldFocusOnMount:r,onBlur:a,onChange:d},C=e=>{null==d||d(x.type,e)},w=(0,ce.usePostmanInputFeatureFlag)();if(n)return null;if(g&&w){let n=!l&&v?`${x.type} empty cell`:`${x.type} cell`;return i&&(n=`${x.type} input`),(0,f.jsx)(ce.KVEditorInput,{value:l||"",onChange:C,suggestions:[],placeholder:"key"===x.type?"Key":"Value",ariaLabel:n,onFocus:u,onBlur:a,shouldFocusOnMount:r,actions:h,indicators:e.indicators,isEditable:!y.readOnly})}return p===te&&b.isMasked?(0,f.jsx)(re,(0,t.Z)({onChange:C,onFocus:u,onBlur:a,isEditable:i,value:l,placeholder:v},x)):(0,f.jsxs)(f.Fragment,{children:[i?(0,f.jsx)(K,(0,t.Z)({},y,{onChange:C,onFocus:u,value:l,placeholder:v,isDuplicated:m},x)):(0,f.jsx)(ne,(0,t.Z)({},x,{value:l,onFocus:u,actions:h,onChange:C,placeholder:v,currentWidth:o,isDuplicated:m})),m&&(0,f.jsx)(de.Z,{content:"This variable has been overwritten by a duplicate key.",placement:"bottom",children:(0,f.jsx)(pe,{color:"content-color-warning",className:"duplicate-warning-icon"})})]})}var ge=l(74962),ve=l(63622),fe=l(84591);let me;const xe=r().div(me||(me=(e=>e)`
  position: absolute;
  right: var(--spacing-m);
  display: flex;
  height: 100%;
  align-items: center;
  cursor: default;
  z-index: 1;
  background: transparent !important;
`)),ye=({infoTitle:e,info:n})=>(0,f.jsxs)(f.Fragment,{children:[e&&(0,f.jsx)(ge.Z,{type:"h3",styleAs:"h4",text:e}),n&&(0,f.jsx)(ve.ZP,{type:"small",color:"content-color-primary",children:n})]}),Ce=e=>{const{info:n,infoTitle:l,placement:i}=e;return n||l?(0,f.jsx)(xe,{children:(0,f.jsx)(de.Z,{content:(0,f.jsx)(ye,(0,t.Z)({},e)),placement:i,children:(0,f.jsx)(fe.Z,{})})}):null};let we;const ke=r()(u.Z)(we||(we=(e=>e)`
  margin: var(--spacing-xs);
  min-width: 80px;
`));function Ve(e){const{hidden:n,options:l,defaultOption:t,onChange:o}=e,[s,r]=(0,i.useState)(t),[a,d]=(0,i.useState)(!1);return!a&&n?null:(0,f.jsx)(ke,{viaPortal:!0,className:"single-type-select","aria-label":"KV Type Select",triggerWidth:"auto",triggerSize:"small",triggerType:"tertiary",menuMinWidth:100,menuMaxWidth:165,isSearchable:!1,isClearable:!1,options:l,value:s,onOpen:()=>d(!0),onClose:()=>d(!1),onChange:e=>{r(e),null==o||o(e)}})}var je=l(58560),Ee=l(25637),Se=l(5701),Te=l(19578);let De,Re,Ze=e=>e;const Me="Couldn't upload file",Ae=r()(je.Z)(De||(De=Ze`
  max-width: 100%;
`)),We=r().div(Re||(Re=Ze`
  width: 100%;

  span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`));function Oe(e){return(0,f.jsx)(Ee.VW,{children:(0,f.jsx)(Pe,(0,t.Z)({},e))})}function Pe(e){const{value:n,onReset:l,id:t,label:o,name:s,multiple:r,isDisabled:a,loading:d,error:c,accept:u,autoFocus:h,onChange:p}=e,{addToast:b}=(0,Ee.ZP)();let g;if((0,i.useEffect)((()=>{c&&b({status:"error",title:Me,description:c})}),[c,b]),null!=n&&n.length){const e=n.length,t=n[0],i=n.join(", "),o=e>1?`${e} files selected`:`${t}`;g=(0,f.jsx)(de.Z,{content:i,children:(0,f.jsx)(We,{children:(0,f.jsx)(Se.Af,{label:o,onClick:l})})})}else g=(0,f.jsx)(Te.FileUploader,{id:t,onChange:e=>{!a&&e&&(null==p||p(e))},multiple:r,isDisabled:a,accept:u,name:s,actionLabel:o,autoFocus:h,size:"small",loading:d});return(0,f.jsx)(Ae,{direction:"column",alignItems:"center",children:g})}const Fe=()=>{const e=(0,i.useRef)(!0);return(0,i.useEffect)((()=>()=>{e.current=!1}),[]),e};let Be;const ze="Select Files",Ne=r()(je.Z)(Be||(Be=(e=>e)`
  padding: var(--spacing-xs);
`));function $e(e){const{id:n,type:l,value:t,hidden:o,error:s,onFilesSelect:r,onChange:a}=e,[d,c]=(0,i.useState)(!1),u=Fe(),h=(0,i.useMemo)((()=>Array.isArray(t)?t:t?[t]:[]),[t]);return o?null:(0,f.jsx)(Ne,{height:"100%",width:"100%",children:(0,f.jsx)(Oe,{label:ze,id:String(n),multiple:!0,error:s,value:h,loading:d,onChange:e=>{r&&(c(!0),r(n,e).finally((()=>{u.current&&c(!1)})))},onReset:()=>null==a?void 0:a(l,"")})})}const He=e=>e.disableEdit,Le=(e,n)=>n||e.system&&!e.allowedToToggle,Ie=(e,n)=>!e.disableEdit&&!(null!=n&&n.disableToggle)||e.system;var Ke=l(95362),_e=l(70262);let Ue;const Xe=r().div(Ue||(Ue=(e=>e)`
  padding: var(--spacing-xs) var(--spacing-s);
  border-radius: var(--border-radius-default);
  opacity: ${0};

  &:hover {
    cursor: pointer;
  }
`),(({alwaysPresent:e})=>e?"1":"0"));function Ye({onClick:e,maskState:n,isVisible:l}){const t=!1===n.isMasked;return(0,f.jsx)(Xe,{role:"button",className:"toggle-mask","aria-label":"toggle-mask-row",onClick:e,alwaysPresent:t||l,children:n.isMasked?(0,f.jsx)(Ke.Z,{}):(0,f.jsx)(_e.Z,{})})}var qe=l(64691),Ge=l(48263),Je=l(80605),Qe=l(59824),en=l(17282),nn=l(29225);const ln=e=>{const{onPersist:n,onReset:l,disableVariablePersistAction:t,disablePersistActionTooltip:i,disableResetActionTooltip:o,disableVariableResetAction:s}=e,r=(e=!1,n)=>{if(e){let e;switch(n){case"persist":e=i;break;case"reset":e=o}return e||"You do not have permissions to perform this action."}return null};return(0,f.jsxs)(qe.Z,{children:[(0,f.jsx)(Ge.Z,{children:(0,f.jsx)(Je.Z,{icon:(0,f.jsx)(nn.Z,{size:"small"}),type:"tertiary",tooltip:"View more actions",size:"small","data-testid":"more-options-button"})}),(0,f.jsxs)(Qe.Z,{placement:"bottom-end",children:[(0,f.jsx)(en.Z,{onClick:n,isDisabled:t,tooltip:r(t,"persist"),children:"Persist"}),(0,f.jsx)(en.Z,{onClick:l,isDisabled:s,tooltip:r(s,"reset"),children:"Reset"})]})]})};let tn;const on=r().div(tn||(tn=(e=>e)`
  display: flex;
  flex-direction: row;
  opacity: ${0};
  margin-right: var(--spacing-xs);
`),(({isVisible:e})=>e?"1":"0")),sn=({isHidden:e=!1,children:n,isVisible:l})=>e||!n?null:(0,f.jsx)(on,{isVisible:l,children:n});var rn=l(26246);const an=["warning"],dn=["prevValue","prevCurrentWidth"],cn=["nextValue","nextCurrentWidth"];let un,hn,pn,bn,gn=e=>e;const vn=r().div(un||(un=gn`
  display: flex;
  flex-direction: row;
  position: relative;
  flex: 0;
  height: 32px;
  border-bottom: var(--border-width-default) var(--border-style-solid)
    var(--border-color-default);
  background-color: ${0};
  color: ${0};
`),(e=>e.isRowFocused?"var(--background-color-secondary) !important":e.isRowSelected||e.disabled?"var(--background-color-secondary)":"inherit"),(e=>e.disabled?"var(--content-color-tertiary)":"inherit")),fn=r().div(hn||(hn=gn`
  position: relative;
  display: flex;
  flex: 1;
  min-width: 0;
  flex-direction: row;
  color: ${0};
`),(e=>e.isBlocked?"var(--content-color-tertiary)":"inherit")),mn=r().div(pn||(pn=gn`
  display: flex;
  align-items: center;
  cursor: pointer;
  border-right: var(--border-width-default) var(--border-style-solid)
    var(--border-color-default);
`)),xn=r()(u.Z)(bn||(bn=gn`
  /* Overriding the styles of Aether dropdown control element. */
  .aether-dropdown__control,
  .aether-dropdown__control--is-focused:hover {
    border: none;
    width: 100%;
    box-shadow: none;
    background-color: unset !important;
  }
`)),yn=new Map;yn.set("default",{value:ie,label:"default"}),yn.set("secret",{value:te,label:"secret"});const Cn=[yn.get("default"),yn.get("secret")];function wn(e){const{index:n,value:l,onChange:o,onRemove:s,currentWidth:r,showColumns:a,allowedColumns:d,enableFiles:u,onFilesSelect:h,maskState:p,toggleMaskValue:b,hideVariableTypeDropdown:g,onPersist:v,onReset:m,onBlur:x,enableVariableSuggestions:y,optionsDropdownValues:C,isDuplicated:w}=e,V=(0,i.useRef)(o);V.current=o;let{key:j,value:E,sessionValue:D="",options:R,type:Z,enabled:M=!0,description:A="",fileUploadError:W}=l;const O=Z===te?te:ie,F=a.includes("variableType")?O:Z||"text",[B,z]=(0,i.useState)(null),[N,$]=(0,i.useState)(null),H=null!==B,L=(0,i.useMemo)((()=>{var e;return null!=(e=le.find((e=>e.value===l.type)))?e:le[0]}),[l.type]),I=(0,i.useCallback)(((e,n)=>{"sessionValue"===e&&void 0!==n&&l.isSessionValueDeleted&&(null==V.current||V.current((0,t.Z)({},l,{[e]:n,isSessionValueDeleted:!1})));const i="type"===e&&["text","file"].includes(n);null==V.current||V.current((0,t.Z)({},l,i&&{value:""},{[e]:n}))}),[l]),K=(0,i.useCallback)((e=>{(0,c.Z)(l,an),I("enabled",e)}),[l,I]),_=(0,i.useCallback)((()=>{s&&s()}),[s]),U=(0,i.useCallback)((n=>e[`nonEditable${T(n)}s`]),[e]);function X(e){return Number(r[null==a?void 0:a.indexOf(e)])}return(0,f.jsxs)(vn,{role:"row","aria-rowindex":n,disabled:He(l),isRowSelected:e.isRowSelected,isRowFocused:null!==B,onMouseEnter:()=>$(!0),onMouseLeave:()=>$(!1),children:[(0,f.jsx)(k,{disabled:e.disableSorting&&e.nonEditableToggles,shouldShowCheckbox:Ie(l,e),isRowEnabled:M,onToggleEnabledState:K,isCheckboxDisabled:Le(l,e.nonEditableToggles)}),(0,f.jsxs)(fn,{isBlocked:l.disableEdit,children:[(0,f.jsx)(S,{columnWidth:X("key"),isNonEditable:U("key"),isLastColumn:a&&"key"===a[a.length-1],content:(0,f.jsx)(be,{type:"key",value:j,currentWidth:X("key"),onFocus:()=>z("key"),onChange:I,isEditable:"key"===B,placeholder:e.keyPlaceholder,preventEnter:e.disableMultilineKey||!1,readOnly:l.disableEdit||e.nonEditableKeys,shouldFocusOnMount:!0,onBlur:()=>z(null),isDuplicated:w,actions:(0,f.jsx)(Ve,{hidden:!N||!u,options:le,defaultOption:L,onChange:e=>I("type",e.value)}),indicators:(0,f.jsx)(Ce,{infoTitle:l.infoTitle,info:l.info,placement:"right"}),enableVariableSuggestions:y})}),a.includes("variableType")&&(0,f.jsx)(S,{columnWidth:X("variableType"),isNonEditable:U("variableType"),isLastColumn:a&&"variableType"===a[a.length-1],content:(!g||e.nonEditableVariableTypes)&&(0,f.jsx)(xn,{isRowFocused:H,tabIndex:-1,isDisabled:e.nonEditableVariableTypes,onChange:async l=>{const{disableAllVariablesSync:t=!1,disableSecretVariablesSync:i}=e;if(Z===l.value)return;if(t||!i&&l.value===te||i&&l.value===te&&!E)return I("type",l.value),void(b&&b(n));const o=rn.Modals.getModals(),s=await o.showWarningDialog({uid:"kv-editor-variable-type-change-confirmation",subject:`Change ${j}'s type to ${l.value}?`,message:"This will reveal the hidden values in plain text everywhere in the app for all team members",options:[{title:"Cancel",isDefaultOnDismiss:!0},{title:"Change type",isPrimary:!0}]});return s&&"Change type"===s.title?(I("type",l.value),void(b&&b(n))):void 0},options:Cn,value:yn.get(F),isClearable:!1,isSearchable:!1,menuWidth:100})}),a.includes("value")&&(0,f.jsx)(S,{columnWidth:X("value"),isNonEditable:U("value"),isLastColumn:a&&"value"===a[a.length-1],content:(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(be,{hidden:"file"===Z,type:"value",value:E,currentWidth:X("value"),onFocus:()=>z("value"),onChange:I,isEditable:"value"===B,placeholder:e.valuePlaceholder,preventEnter:e.disableMultilineValue||!1,readOnly:l.disableEdit||e.nonEditableValues,shouldFocusOnMount:!0,onBlur:()=>("value",z(null),void(x&&x("value",l))),editorType:Z,maskState:p,enableVariableSuggestions:y}),(0,f.jsx)($e,{hidden:"file"!==Z,id:n,type:"value",value:E,error:W,onChange:I,onFilesSelect:h})]})}),a.includes("description")&&(0,f.jsx)(S,{columnWidth:X("description"),isNonEditable:U("description"),isLastColumn:a&&"description"===a[a.length-1],content:(0,f.jsx)(be,{type:"description",value:A,onChange:I,placeholder:e.descriptionPlaceholder,isEditable:"description"===B,currentWidth:X("description"),onFocus:()=>z("description"),readOnly:l.disableEdit||e.nonEditableDescriptions,shouldFocusOnMount:!0,onBlur:()=>z(null)})}),a.includes("sessionValue")&&(0,f.jsx)(S,{columnWidth:X("sessionValue"),isNonEditable:U("sessionValue"),isLastColumn:a&&"sessionValue"===a[a.length-1],content:(0,f.jsx)(be,{type:"sessionValue",value:D,onChange:I,isEditable:"sessionValue"===B,placeholder:l.isSessionValueDeleted?"[Deleted]":e.sessionValuePlaceholder,preventEnter:e.disableMultilineValue||!1,currentWidth:X("sessionValue"),onFocus:()=>z("sessionValue"),readOnly:l.disableEdit||e.nonEditableSessionValue,shouldFocusOnMount:!0,onBlur:()=>z(null),editorType:Z,maskState:p,enableVariableSuggestions:y})}),a.includes("options")&&(0,f.jsx)(S,{columnWidth:X("options"),isNonEditable:U("options"),isLastColumn:a&&"options"===a[a.length-1],content:(0,f.jsx)(xn,{isRowFocused:H,tabIndex:-1,onChange:e=>I("options",e),options:C,value:R,isClearable:!1,isSearchable:!1,menuWidth:100})}),(0,f.jsx)(mn,{children:((null==a?void 0:a.includes("value"))||(null==a?void 0:a.includes("description"))||(null==a?void 0:a.includes("sessionValue")))&&!e.isRowSelected&&!e.value.disableEdit&&(0,f.jsxs)(f.Fragment,{children:[F===te&&(0,f.jsx)(Ye,{isVisible:N,maskState:p,onClick:()=>b(n)}),(0,f.jsxs)(sn,{isHidden:H,isVisible:N,children:[!e.disableDelete&&(0,f.jsx)(P,{onClick:_}),!e.disableVariableRowDropdown&&d.includes("sessionValue")&&(0,f.jsx)(ln,{onPersist:v,onReset:m,disableVariablePersistAction:e.disableVariablePersistAction||e.disableSecretVariablesSync&&F===te,disablePersistActionTooltip:e.disablePersistActionTooltip,disableVariableResetAction:e.disableVariableResetAction||e.disableSecretVariablesSync&&F===te,disableResetActionTooltip:e.disableResetActionTooltip})]})]})})]})]})}const kn=(0,i.memo)(wn,((e,n)=>{const{prevValue:l,prevCurrentWidth:t}=e,i=(0,c.Z)(e,dn),{nextValue:o,nextCurrentWidth:s}=n,r=(0,c.Z)(n,cn);return!!p()(l,o)&&(!!p()(i,r)&&!!D(t,s))}));var Vn=l(49437),jn=l(80047);const En=["values","disableSorting","onChange","onRemove","disableDelete","disableCreate","disableToggle","keyPlaceholder","valuePlaceholder","descriptionPlaceholder","disableVariableRowDropdown","currentWidth","maskStatesMap","toggleMaskValue","onPersist","onReset","onBlur","filteredIndices","searchValue","enableScroll","duplicateWarningsMap"];let Sn;const Tn=r().div(Sn||(Sn=(e=>e)`
  display: flex;
  flex: 1;
  flex-direction: column;

  ${0};

  .key-value-form-editor-sortable__selectable {
    display: flex;
    flex-direction: column;
  }
`),(({enableScroll:e})=>e&&"overflow: overlay;"));function Dn(e){let{values:n,disableSorting:l,onChange:o,onRemove:s,disableDelete:r,disableCreate:a,disableToggle:d,keyPlaceholder:u,valuePlaceholder:h,descriptionPlaceholder:p,disableVariableRowDropdown:b,currentWidth:g,maskStatesMap:v,toggleMaskValue:m,onPersist:x,onReset:y,onBlur:C,filteredIndices:w,searchValue:k,enableScroll:V,duplicateWarningsMap:j}=e,E=(0,c.Z)(e,En);const S=(0,i.useCallback)(((e,n)=>{o&&o(e,n)}),[o]),T=(0,i.useCallback)((e=>{s&&s(e)}),[s]),D=k&&w?w.map((e=>n[e])):n;return(0,f.jsx)(Tn,{enableScroll:V,children:k&&0===D.length?(0,f.jsx)("div",{className:"key-value-form-editor-sortable",children:(0,f.jsx)(Vn.Z,{title:"No results found",children:(0,f.jsx)(jn.Z,{name:"illustration-search"})})}):D&&D.map(((e,i)=>{var o,s;const c=e.id===(null==n?void 0:n.length)-1;return(0,f.jsx)(kn,(0,t.Z)({index:i,selectableKey:e.id,value:e,onChange:n=>S(e.id,n),onRemove:()=>T(e.id),onPersist:()=>{return n=e.id,void(x&&x(n));var n},onReset:()=>{return n=e.id,void(y&&y(n));var n},onBlur:(n,l)=>((e,n,l)=>{C&&C(e,n,l)})(e.id,n,l),disableSorting:l||c,disableToggle:d||c&&!a,disableDelete:r||c&&!a,disableVariableRowDropdown:b||c&&!a,keyPlaceholder:c&&u,valuePlaceholder:c&&h,descriptionPlaceholder:c&&p,hideVariableTypeDropdown:!a&&c,currentWidth:g,maskState:!(!a&&c)&&(v&&v[e.id]||{isMasked:e.type===te}),isDuplicated:j&&j[e.id].isOverridden,toggleMaskValue:m},E),null!=(o=null==(s=e.id)?void 0:s.toString())?o:i)}))})}var Rn=l(70355);function Zn(e,n=100){return e/n*100}function Mn(e,n=2){return Math.round(e*Math.pow(10,n))/Math.pow(10,n)}let An;const Wn=500,On=r().div(An||(An=(e=>e)`
  height: 32px;
  width: 16px;
  margin-left: -8px;
  background-color: transparent;
  position: absolute;
  left: ${0}%;
  cursor: col-resize;
  z-index: 1;
`),(e=>e.left)),Pn=e=>{const{showColumns:n,currentWidth:l,prevColumn:t,nextColumn:o,parentWidth:s=Wn,handleResize:r}=e,a=(0,i.useCallback)((e=>{const t=null==n?void 0:n.indexOf(e);if(-1===t)return 0;let i=0;for(let e=0;e<=t;e++)i+=l[e];return Mn(i)}),[n,l]),d=(0,i.useMemo)((()=>{const e=a(n[(null==n?void 0:n.indexOf(t))-1])+Zn(100,s),l=a(o)-Zn(100,s);return{min:Mn(e),max:Mn(l)}}),[t,o,n,s,a]),c=(0,i.useCallback)((e=>Number.isNaN(d.min)||Number.isNaN(d.max)?e:Mn(Math.min(Math.max(e,d.min),d.max))),[d]),u=(0,i.useCallback)(((e,i)=>{const a=c(Zn(i.x,s));if(a==d.min||a==d.max)return;const u=[...l],h=l[n.indexOf(t)]+i.deltaX/s*100,p=l[n.indexOf(o)]-i.deltaX/s*100;u[null==n?void 0:n.indexOf(t)]=Mn(h,2),u[null==n?void 0:n.indexOf(o)]=Mn(p,2),null==r||r(u)}),[s,l,n,d]);return(0,f.jsx)(Rn.DraggableCore,{onDrag:u,children:(0,f.jsx)(On,{left:c(a(t))})})};let Fn,Bn,zn,Nn,$n,Hn,Ln,In,Kn=e=>e;const _n=r().div(Fn||(Fn=Kn`
  font-size: var(--text-size-m);
  font-family: var(--font-family-default);
`)),Un=r().div(Bn||(Bn=Kn`
  border-right: var(--border-width-default) var(--border-style-solid)
    var(--border-color-default);
  display: flex;
  align-items: center;
  height: 32px;
  padding: 0 var(--spacing-xs);
`)),Xn=r().div(zn||(zn=Kn`
  display: flex;
  flex-direction: row;
  height: 32px;
  position: relative;
  flex: 1 1 auto;
  margin-bottom: var(--spacing-zero);
  border-bottom: var(--border-width-default) var(--border-style-solid)
    var(--border-color-default);

  &:hover,
  &.is-hovered {
    background-color: transparent;
  }

  &__is-highlighted {
    background-color: var(--background-color-info);
    animation: fadeOut 1.2s linear 1;

    .key-value-form-row__modification-options {
      background-color: var(--background-color-info);
      animation: fadeOut 1.2s linear 1;
    }
  }
`)),Yn=r().div(Nn||(Nn=Kn`
  position: relative;
  display: flex;
  border-top-width: 0;

  /* TODO: non-uniform spacing because of inconsistencies with design tokens */
  width: 44px;
  justify-content: flex-end;
  border-left: var(--border-width-default) var(--border-style-solid)
    var(--border-color-default);
  border-right: var(--border-width-default) var(--border-style-solid)
    var(--border-color-default);
  background-color: ${0};
`),(e=>e.nonEditableToggles?"var(--background-color-secondary);":"inherit")),qn=r().div($n||($n=Kn`
  height: 30px;
  width: 0;
  position: absolute;
  background-color: var(--border-color-default);
`)),Gn=r().div(Hn||(Hn=Kn`
  flex: 1;
  flex-direction: row;
  position: relative;
  min-width: 0;
  display: flex;
`)),Jn=r().div(Ln||(Ln=Kn`
  padding: var(--spacing-s);
  color: var(--content-color-secondary);
  font-size: var(--text-size-m);
  line-height: var(--line-height-m);
  font-weight: var(--text-weight-medium);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: default;
  user-select: none;
`)),Qn=r().div(In||(In=Kn`
  align-items: center;
  flex: ${0};
  overflow: hidden;
  display: flex;
  position: relative;
  box-sizing: border-box;
  border-right: var(--border-width-default) var(--border-style-solid)
    var(--border-color-default);
  margin: var(--spacing-zero);
  background-color: ${0};
`),(e=>e.isLastColumn?`0 1 ${e.columnWidth}%`:`0 0 ${e.columnWidth}%`),(e=>e.isNonEditable?"var(--background-color-secondary)":"inherit")),el=new Map;el.set("persistAll",{disabled:"You do not have permissions to perform this action.",default:"Persisting all values will replace all initial values with the current values of the variables."}),el.set("resetAll",{default:"Resetting all values will replace all current values with the initial values of the variables."});const nl=(e,n,l)=>{let t;var i,o;return n&&(t=l||(null==(i=el.get(e))?void 0:i.disabled)),t||(t=null==(o=el.get(e))?void 0:o.default),t},ll=({allowedColumns:e,persistAll:n,disableVariablePersistAction:l,disablePersistActionTooltip:t,resetAll:i,disableVariableResetAction:o,disableResetActionTooltip:s})=>e.includes("sessionValue")?(0,f.jsx)(Un,{children:(0,f.jsxs)(qe.Z,{closeOnSelect:!1,children:[(0,f.jsx)(Ge.Z,{"data-testid":"key-value-editor-more-actions-button",children:(0,f.jsx)(Je.Z,{size:"small",icon:(0,f.jsx)(nn.Z,{size:"small"}),type:"tertiary",tooltip:"View more actions","data-testid":"more-options-button-column-header"})}),(0,f.jsxs)(Qe.Z,{children:[(0,f.jsx)(en.Z,{onClick:n,isDisabled:l,tooltip:nl("persistAll",l,t),children:"Persist all"}),(0,f.jsx)(en.Z,{onClick:i,isDisabled:o,tooltip:nl("resetAll",o,s),children:"Reset all"})]})]})}):null;function tl(e){const{showColumns:n,currentWidth:l,handleWidthChange:t,keyHeading:o,valueHeading:s,descriptionHeading:r,sessionHeading:a,typeHeading:d,optionsHeading:c,allowedColumns:u,persistAll:h,resetAll:p,disableVariablePersistAction:b,disablePersistActionTooltip:g,disableVariableResetAction:v,disableResetActionTooltip:m}=e,x=(0,i.useRef)(null),[y,C]=(0,i.useState)(null);(0,i.useEffect)((()=>{const e=new ResizeObserver((e=>{C(e[0].contentRect.width)})),n=x.current;return e.observe(n),()=>{e.unobserve(n)}}),[]);const w=(0,i.useCallback)((n=>e[`nonEditable${T(n)}s`]),[e]),k=(0,i.useCallback)((e=>Number(l[null==n?void 0:n.indexOf(e)])),[n,l]);return(0,f.jsx)(_n,{role:"rowgroup",children:(0,f.jsxs)(Xn,{role:"row",children:[(0,f.jsx)(Yn,{children:(0,f.jsx)(qn,{})}),(0,f.jsxs)(Gn,{ref:x,children:[(0,f.jsx)(Qn,{type:"key",role:"columnheader",columnWidth:k("key"),isNonEditable:w("key"),isLastColumn:n&&"key"===n[n.length-1],children:(0,f.jsx)(Jn,{children:o||"Key"})}),(null==n?void 0:n.includes("variableType"))&&(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(Pn,{handleResize:t,showColumns:n,currentWidth:l,prevColumn:"key",nextColumn:"variableType",parentWidth:y}),(0,f.jsx)(Qn,{type:"variableType",role:"columnheader",columnWidth:k("variableType"),isNonEditable:w("variableType"),isLastColumn:n&&"variableType"===n[n.length-1],children:(0,f.jsx)(Jn,{children:d||"Type"})})]}),(null==n?void 0:n.includes("value"))&&(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(Pn,{handleResize:t,showColumns:n,currentWidth:l,prevColumn:n.includes("variableType")?"variableType":"key",nextColumn:"value",parentWidth:y}),(0,f.jsx)(Qn,{type:"value",role:"columnheader",columnWidth:k("value"),isNonEditable:w("value"),isLastColumn:n&&"value"===n[n.length-1],children:(0,f.jsx)(Jn,{children:s||"Value"})})]}),(null==n?void 0:n.includes("description"))&&(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(Pn,{handleResize:t,showColumns:n,currentWidth:l,prevColumn:"value",nextColumn:"description",parentWidth:y}),(0,f.jsx)(Qn,{type:"description",role:"columnheader",columnWidth:k("description"),isNonEditable:w("description"),isLastColumn:n&&"description"===n[n.length-1],children:(0,f.jsx)(Jn,{children:r||"Description"})})]}),(null==n?void 0:n.includes("sessionValue"))&&(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(Pn,{handleResize:t,showColumns:n,currentWidth:l,prevColumn:"value",nextColumn:"sessionValue",parentWidth:y}),(0,f.jsx)(Qn,{type:"sessionValue",role:"columnheader",columnWidth:k("sessionValue"),isNonEditable:w("sessionValue"),isLastColumn:n&&"sessionValue"===n[n.length-1],children:(0,f.jsx)(Jn,{children:a||"Current value"})})]}),u.includes("sessionValue")&&(0,f.jsx)(ll,{allowedColumns:u,persistAll:h,resetAll:p,disablePersistActionTooltip:g,disableResetActionTooltip:m,disableVariablePersistAction:b,disableVariableResetAction:v}),(null==n?void 0:n.includes("options"))&&(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(Pn,{handleResize:t,showColumns:n,currentWidth:l,prevColumn:"value",nextColumn:"options",parentWidth:y}),(0,f.jsx)(Qn,{type:"options",role:"columnheader",columnWidth:k("options"),isNonEditable:w("options"),isLastColumn:n&&"options"===n[n.length-1],children:(0,f.jsx)(Jn,{children:c||"Options"})})]})]})]})})}const il=["defaultValue","entityType","values","onChange","showColumns","nonEditableKeys","nonEditableValues","nonEditableDescriptions","nonEditableToggles","nonEditableOptions","keyHeading","valueHeading","sessionHeading","optionsHeading","optionsTooltip","nonEditableVariableTypes","hideBulkOptions","maskStatesMap","toggleMaskValue","initialColumnWidths","disableVariablePersistAction","disableVariableResetAction","disableSecretVariablesSync","disablePersistActionTooltip","disableResetActionTooltip","onDeleteRow","disallowDuplicates"];let ol;const sl=r().div(ol||(ol=(e=>e)`
  display: flex;
  flex: 1;
  flex-direction: column;
  border-top: thin solid var(--border-color-default);
  min-height: 0;
`));function rl(e){let{defaultValue:n="",entityType:l,values:o,onChange:s,showColumns:r,nonEditableKeys:a,nonEditableValues:d,nonEditableDescriptions:u,nonEditableToggles:h,nonEditableOptions:p,keyHeading:b,valueHeading:g,sessionHeading:v,optionsHeading:m,optionsTooltip:x,nonEditableVariableTypes:y,hideBulkOptions:C,maskStatesMap:w,toggleMaskValue:k,initialColumnWidths:V,disableVariablePersistAction:j,disableVariableResetAction:E,disableSecretVariablesSync:S,disablePersistActionTooltip:T,disableResetActionTooltip:D,onDeleteRow:R,disallowDuplicates:Z}=e,M=(0,c.Z)(e,il);const A={showColumns:r,allowedColumns:M.allowedColumns,nonEditableKeys:a,nonEditableValues:d,nonEditableDescriptions:u,nonEditableToggles:h,nonEditableOptions:p,hideBulkOptions:C},W=(0,i.useRef)(s);W.current=s;const[O,P]=(0,i.useState)(function(e,n){let l;return n?l=n:(l=new Array(e.length).fill(Math.floor(100/e.length)),l[l.length-1]=l.at(-1)+(100-l.reduce(((e,n)=>e+n)))),l}(r,V)),F=(0,i.useCallback)(((e,t={})=>{let i="text";"environment"!==l&&"globals"!==l||(i="default"),"collection"===l&&(i="string");const o={key:t.key||n,value:t.value||n,description:t.description||n,type:t.type||i,id:e};return M.allowedColumns.includes("sessionValue")&&(o.sessionValue=t.sessionValue||null),M.disableToggle||(o.enabled=!0),o}),[n,M.disableToggle,l,M.allowedColumns]),B=(0,i.useCallback)((()=>{if(o.length>0){var e=null==o?void 0:o.reduce((function(e,n){return e.id>=n.id?e:n}),{});return n=e,[Object,Array].includes((n||{}).constructor)&&0===Object.entries(n||{}).length?0:e.id+1}var n;return 0}),[o]),z=(0,i.useCallback)(((e,n)=>{const l=[...o],i=l.length===e?[...l,F(B(),n)]:l.map((l=>l.id===e?(0,t.Z)({},l,n):(0,t.Z)({},l)));null==W.current||W.current(i)}),[o,F,B]),N=(0,i.useCallback)((e=>{const n=[...o],l=null==n?void 0:n.filter(((n={})=>n.id!==e));R&&R(e),null==W.current||W.current(l)}),[o,R]),$=(0,f.jsx)(tl,(0,t.Z)({},A,{keyHeading:b||"Key",valueHeading:g||"Value",sessionHeading:v||"Current value",optionsHeading:m||"Options",optionsTooltip:x,nonEditableVariableTypes:y,handleWidthChange:P,currentWidth:O,persistAll:()=>{if(j)return;let e=!1;const n=o.reduce(((n,l)=>{const i=l.enabled?l.sessionValue:l.value;return l.isSessionValueDeleted?(e=!0,n):(!e&&(e=!(S&&l.type===te)),S&&l.type===te?n.push(l):n.push((0,t.Z)({},l,{value:i})),n)}),[]);e&&(null==W.current||W.current(n))},resetAll:()=>{if(E)return;let e=!1;const n=o.map((n=>{const l=n.enabled?n.value:n.sessionValue;return S&&n.type===te?n:(e=!0,(0,t.Z)({},n,{sessionValue:l,isSessionValueDeleted:!1}))}));e&&(null==W.current||W.current(n))},disableVariablePersistAction:j,disableVariableResetAction:E,disablePersistActionTooltip:T,disableResetActionTooltip:D})),H=(0,i.useMemo)((()=>M.disableCreate?o:[...o,F(B())]),[o,M.disableCreate,F,B]),L=(0,i.useMemo)((()=>Z?H.map(((e,n)=>{if(e.enabled&&""!==e.key)for(let l=n+1;l<H.length;l++){const n=H[l];if(e.key===n.key&&n.enabled&&""!==n.key)return(0,t.Z)({},e,{isOverridden:!0})}return(0,t.Z)({},e,{isOverridden:!1})})):null),[H,Z]);return(0,f.jsxs)(sl,{children:[o.length>0||!M.disableCreate?$:null,(0,f.jsx)(Dn,(0,t.Z)({},A,M,{nonEditableVariableTypes:y,values:H,onChange:z,onRemove:N,currentWidth:O,maskStatesMap:w,toggleMaskValue:k,onPersist:e=>{if(j)return;let n=!1;const l=o.reduce(((l,i)=>{if(i.id===e){if(i.isSessionValueDeleted)return n=!0,l;S&&i.type===te?l.push(i):(n=!0,l.push((0,t.Z)({},i,{value:i.sessionValue})))}else l.push(i);return l}),[]);n&&(null==W.current||W.current(l))},onReset:e=>{if(E)return;let n=!1;const l=o.map((l=>l.id!==e||S&&l.type===te?l:(n=!0,(0,t.Z)({},l,{sessionValue:l.value,isSessionValueDeleted:!1}))));n&&(null==W.current||W.current(l))},onBlur:(e,n,l)=>{const i=o.findIndex((n=>n.id===e)),s=-1!==i&&o[i].sessionValue;let r;"value"===n&&-1!==i&&null===s&&l.value&&(r=[...o],r[i]=(0,t.Z)({},l,{sessionValue:l.value}),null==W.current||W.current(r))},disableVariablePersistAction:j,disableVariableResetAction:E,disableSecretVariablesSync:S,disablePersistActionTooltip:T,disableResetActionTooltip:D,duplicateWarningsMap:L}))]})}var al=l(68206);const dl=F(((e,...n)=>e(...n)),100),cl=({onSearchValueChange:e})=>{const[n,l]=(0,i.useState)("");return(0,f.jsx)("div",{className:"search-variable",children:(0,f.jsx)(al.Z,{placeholder:"Filter variables",value:n,type:"search",onChange:n=>{l(n.target.value),dl(e,n.target.value)},onClear:()=>{l(""),e("")},prefix:!0,name:"filter-values"})})};function ul(e,n){try{const l=(0,ce.castNonStringTypesToString)(e),t=(0,ce.castNonStringTypesToString)(n),i=l.toLowerCase(),o=t.toLowerCase();return i.indexOf(o)}catch(l){return console.error("PatterSearch~caseInsensitiveIndexof: Failed with error",l,e,n),-1}}let hl;const pl=r().div(hl||(hl=(e=>e)`
  padding-bottom: var(--spacing-s);
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  ${0};

  &.is-filterable {
    display: flex;
    flex-direction: column;
  }

  .search-variable {
    width: 240px;
    padding-top: var(--spacing-xs);
    padding-bottom: var(--spacing-s);
  }
`),(({enableScroll:e})=>e&&"height: 100%;")),bl=(e,n)=>!n||!(!e.key||-1===ul(e.key,n))||"secret"!==e.type&&(!(!e.value||-1===ul(e.value,n))||!(!e.sessionValue||-1===ul(e.sessionValue,n))||void 0),gl=(e,n)=>{if(!n)return null;const l=[];for(const[t,i]of e.entries())bl(i,n)&&l.push(t);return l},vl=(0,d.observer)((function(e){const{values:n,onChange:l,tableName:o,disallowDuplicates:s,allowedColumns:r,showColumns:d,onColumnToggle:c,keyPlaceholder:u,valuePlaceholder:h,maskStatesMap:p,toggleMaskValue:b,initialColumnWidths:g,enableFiltering:v=!1,enableScroll:m,isDirty:x=!1}=e,[y,C]=(0,i.useState)([]),[w,k]=(0,i.useState)(""),[V,j]=(0,i.useState)(null),E=(0,i.useRef)(x),S=(0,i.useCallback)((e=>{if(0===y.length)return!0;e.preventDefault();const t=null==n?void 0:n.filter(((e,n)=>!(null!=y&&y.includes(n))));y.sort(),0!==y[0]&&(y.length,n.length),C([]),l(t)}),[n,l,y]),T=(0,i.useCallback)((()=>{y.length>0&&C([])}),[y]),D=(0,i.useMemo)((()=>{let e=0;return(0,a.computed)((()=>null==n?void 0:n.map((n=>(0,t.Z)({},n,{id:e++})))))}),[n]).get();return(0,i.useEffect)((()=>{const e=gl(D,w);j(e)}),[w]),(0,i.useEffect)((()=>{if(E.current&&!x){const e=gl(D,w);j(e)}E.current=x}),[x]),(0,f.jsxs)(pl,{role:"table","aria-label":o,enableScroll:m,children:[v&&(0,f.jsx)(cl,{onSearchValueChange:k}),(0,f.jsx)(rl,(0,t.Z)({},e,{disallowDuplicates:s,onChange:l,values:D,selectedRows:y,deleteSelectedRows:S,onBeforeInput:T,allowedColumns:r,showColumns:d,onColumnToggle:c,keyPlaceholder:void 0===u?"Key":u,valuePlaceholder:void 0===h?"Value":h,descriptionPlaceholder:"Description",maskStatesMap:p,toggleMaskValue:b,initialColumnWidths:g,filteredIndices:V,searchValue:w,onDeleteRow:e=>{if(!w)return;const n=((e,n)=>{const l=[],t=new Set(n);let i=0;for(const n of e)t.has(n)?i++:l.push(n-i);return l})(V,[e]);j(n)}})),(0,f.jsx)(rn.Modals.Ui.ModalDialog,{uid:"kv-editor-variable-type-change-confirmation"})]})})),fl=e=>(0,f.jsx)(vl,(0,t.Z)({},e))},29225:(e,n,l)=>{l.d(n,{Z:()=>d});var t=l(7560),i=l(40540),o=l.n(i),s=l(207),r=o().createElement("svg",{width:"16",height:"16",viewBox:"0 0 16 16",fill:"none",xmlns:"http://www.w3.org/2000/svg"},o().createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M1 8C1 6.89543 1.89543 6 3 6C4.10457 6 5 6.89543 5 8C5 9.10457 4.10457 10 3 10C1.89543 10 1 9.10457 1 8ZM3 7C2.44772 7 2 7.44772 2 8C2 8.55228 2.44772 9 3 9C3.55228 9 4 8.55228 4 8C4 7.44772 3.55228 7 3 7Z",fill:"#6B6B6B"}),o().createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M6 8C6 6.89543 6.89543 6 8 6C9.10457 6 10 6.89543 10 8C10 9.10457 9.10457 10 8 10C6.89543 10 6 9.10457 6 8ZM8 7C7.44772 7 7 7.44772 7 8C7 8.55228 7.44772 9 8 9C8.55228 9 9 8.55228 9 8C9 7.44772 8.55228 7 8 7Z",fill:"#6B6B6B"}),o().createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M13 6C11.8954 6 11 6.89543 11 8C11 9.10457 11.8954 10 13 10C14.1046 10 15 9.10457 15 8C15 6.89543 14.1046 6 13 6ZM12 8C12 7.44772 12.4477 7 13 7C13.5523 7 14 7.44772 14 8C14 8.55228 13.5523 9 13 9C12.4477 9 12 8.55228 12 8Z",fill:"#6B6B6B"})),a=o().forwardRef((function(e,n){return o().createElement(s.Z,(0,t.Z)({},e,{svg:r,ref:n}))}));a.getName=function(){return"icon-action-options-stroke"};const d=a},5701:(e,n,l)=>{l.d(n,{Af:()=>h,Sf:()=>d,qc:()=>u});var t=l(40540),i=l.n(t),o=l(59530),s=l.n(o),r=l(23180),a=l(63622);const d=s().button.withConfig({displayName:"CustomChipInputComponents__StyledCloseIconContainer",componentId:"sc-1y84ug7-0"})(["border:",";display:flex;justify-content:center;align-items:center;cursor:pointer;height:",";width:",";border-top-right-radius:",";border-bottom-right-radius:",";background-color:transparent;svg path{fill:",";}&:hover{svg path{fill:",";}}&:is(:focus,:active){svg path{fill:",";}outline:none;}&:disabled{cursor:not-allowed;svg path{fill:",";}}"],(e=>e.theme["spacing-zero"]),(e=>e.theme["size-s"]),(e=>e.theme["size-s"]),(e=>e.theme["border-radius-default"]),(e=>e.theme["border-radius-default"]),(e=>e.theme["content-color-secondary"]),(e=>e.theme["content-color-primary"]),(e=>e.theme["content-color-primary"]),(e=>e.theme["content-color-tertiary"])),c=i().forwardRef(((e,n)=>{let{onClick:l,isDisabled:t,onKeyDown:o}=e;return i().createElement(d,{onKeyDown:o,ref:n,disabled:t,onClick:l},i().createElement(r.Z,null))}));c.name="CloseIcon";const u=s().div.withConfig({displayName:"CustomChipInputComponents__StyledChip",componentId:"sc-1y84ug7-1"})(["box-sizing:border-box;display:flex;justify-content:center;align-items:center;height:",";padding:",";color:",";background-color:",";border-radius:",";&:hover{background-color:",";}&:is(:active,:focus-within){background-color:",";}"],(e=>e.theme["size-s"]),(e=>`2px ${e.theme["spacing-zero"]} 2px ${e.theme["spacing-s"]}`),(e=>e.theme["content-color-primary"]),(e=>e.isDisabled?e.theme["highlight-background-color-tertiary"]:e.theme["background-color-tertiary"]),(e=>e.theme["border-radius-default"]),(e=>!e.isDisabled&&e.theme["highlight-background-color-primary"]),(e=>e.theme["highlight-background-color-tertiary"]));function h(e){const n=(0,t.useRef)(),{label:l,onClick:o,isDisabled:s}=e;return i().createElement(u,{onClick:()=>{n.current.focus()},isDisabled:s},i().createElement(p,{isDisabled:s},l),i().createElement(c,{onKeyDown:e=>{"Backspace"===e.key&&o()},ref:n,isDisabled:s,onClick:e=>{o(),e.stopPropagation()}}))}function p(e){const{children:n,isDisabled:l}=e;return i().createElement(a.ZP,{type:"body-medium",color:l&&"content-color-secondary"},n)}}}]);
//# sourceMappingURL=7067.28a78d945f9fed27.js.map