"use strict";(self.webpackChunkws_workbench=self.webpackChunkws_workbench||[]).push([[7623],{17623:(e,l,n)=>{n.r(l),n.d(l,{FileUploader:()=>Ae,KeyValueEditor:()=>pn});var i=n(7560),t=n(40540),o=n(59530),s=n.n(o),a=n(78476),r=n(50297),d=n(98283),u=n(61096),c=n(69356),h=n.n(c),p=n(22833),b=n.n(p),v=n(65848),g=n(52322);let f,m,x=e=>e;const y=s().div(f||(f=x`
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
`),(e=>e.disabled?"var(--background-color-secondary);":"inherit")),w=s()(v.Z)(m||(m=x`
  > span > div {
    height: 16px;
    width: 16px;
    background-color: ${0};
  }

  &.disabled {
    opacity: 0.4;
  }
`),(e=>e.isChecked?"dark"===e.theme.name?"#ffffff":"#262626":"inherit"));function C(e){return(0,g.jsx)(y,{disabled:e.disabled,children:e.shouldShowCheckbox&&(0,g.jsx)(w,{className:b()({disabled:e.isCheckboxDisabled}),isChecked:e.isRowEnabled,onChange:e.onToggleEnabledState,isDisabled:e.isCheckboxDisabled})})}const k=["content"];let j;const V=s().div(j||(j=(e=>e)`
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
`),(e=>e.isLastColumn?`0 1 ${e.columnWidth}%`:`0 0 ${e.columnWidth}%`),(({isLastColumn:e})=>e?"unset":"var(--border-width-default) var(--border-style-solid)\n    var(--border-color-default)"),(e=>e.isNonEditable?"var(--background-color-secondary)":"inherit"),(e=>e.isNonEditable?"var(--content-color-secondary)":"inherit"));function S(e){let{content:l}=e,n=(0,d.Z)(e,k);return(0,g.jsx)(V,(0,i.Z)({},n,{children:l}))}const T=e=>e?e.charAt(0).toUpperCase()+e.slice(1):"";function E(e,l){if(typeof e!=typeof l)return!1;const n=typeof e;return["string","number","boolean","undefined"].includes(typeof e)?e===l:Array.isArray(e)&&Array.isArray(l)?e.length===l.length&&e.every(((e,n)=>E(e,l[n]))):"object"===n&&(null===e&&null===l||null!==e&&null!==l&&!Array.isArray(e)&&!Array.isArray(l)&&Object.keys(e).length===Object.keys(l).length&&Object.keys(e).every((n=>E(e[n],l[n]))))}var D=n(59713);let R;const A=s().div(R||(R=(e=>e)`
  align-items: center;
  height: 24px;
  display: inline-flex;
  padding: 0 var(--spacing-s);
  border-radius: var(--border-radius-default);

  &:hover {
    background-color: var(--highlight-background-color-primary);
    cursor: pointer;
  }
`));function W({onClick:e}){return(0,g.jsx)(A,{className:"delete-button",onClick:e,role:"button","aria-label":"delete-row",children:(0,g.jsx)(D.Z,{})})}function Z(e,l,n){let i,t,o,s,a,r,d=0,u=!1,c=!1,h=!0;if("function"!=typeof e)throw new TypeError("Expected a function");if(l=+l||0,n&&function(e){const l=typeof e;return null!=e&&("object"===l||"function"===l)}(n)){if(u=!(null==n||!n.leading),c="maxWait"in n,c){const e=(null==n?void 0:n.maxWait)||0;o=Math.max(+e,l)}h="trailing"in n?!(null==n||!n.trailing):h}function p(l){const n=i,o=t;return i=t=void 0,d=l,s=e.apply(o,n),s}function b(e,l){return setTimeout(e,l)}function v(e){const n=e-r;return void 0===r||n>=l||n<0||c&&e-d>=o}function g(){const e=Date.now();if(v(e))return f(e);a=b(g,function(e){const n=e-d,i=l-(e-r);return c?Math.min(i,o-n):i}(e))}function f(e){return a=void 0,h&&i?p(e):(i=t=void 0,s)}function m(...e){const n=Date.now(),o=v(n);if(i=e,t=this,r=n,o){if(void 0===a)return function(e){return d=e,a=b(g,l),u?p(e):s}(r);if(c)return a=b(g,l),p(r)}return void 0===a&&(a=b(g,l)),s}return m.cancel=function(){void 0!==a&&clearTimeout(a),d=0,i=r=t=a=void 0},m.flush=function(){return void 0===a?s:f(Date.now())},m.pending=function(){return void 0!==a},m}const M=["indicators","isDuplicated"];let O,P,F=e=>e;const z=s().textarea(O||(O=F`
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
`),(({isDuplicated:e})=>e&&"padding-right: var(--spacing-l)")),$=s().div(P||(P=F`
  display: flex;
  align-items: flex-start;
  max-height: var(--size-m);
  height: 100%;
  width: 100%;
`)),N=Z(((e,l,n)=>{var i,t;const o=null!=(i=(null==e?void 0:e.scrollHeight)/(null==e||null==(t=e.parentNode)?void 0:t.clientHeight))?i:0;o!==l&&n(Math.ceil(o))}),100);function B(e){let{indicators:l,isDuplicated:n}=e,i=(0,d.Z)(e,M);const o=(0,t.useRef)(null),[s,a]=(0,t.useState)(1);return(0,t.useEffect)((()=>(setTimeout((()=>{if(o.current){const e=o.current.value.length;o.current.selectionStart=e,o.current.selectionEnd=e,o.current.scrollTop=o.current.scrollHeight}})),N(o.current,s,a),()=>{N.cancel()})),[s]),(0,g.jsxs)($,{children:[(0,g.jsx)(z,{isDuplicated:n,role:"cell","aria-label":`${i.type} input`,ref:o,value:i.value,rows:s,onChange:e=>{i.onChange(e.target.value),N(o.current,s,a)},autoFocus:i.shouldFocusOnMount,placeholder:i.placeholder||"",readOnly:i.readOnly,onBlur:i.onBlur,onKeyDown:e=>{i.preventEnter&&13===e.keyCode&&e.preventDefault()}}),l]})}let H,L,K=e=>e;function I(e){return"string"==typeof e?e:e?e&&e.toString?String(e):Object.prototype.toString.call(e):""}function _(e,l={}){return e?("string"!=typeof e&&(e=I(e)),e.split("\n").map(((e,n)=>(0,g.jsx)("span",{children:X(e,l)},n)))):e}function U(e,l={}){return e?("string"!=typeof e&&(e=I(e)),X(e.split("\n")[0],l)):e}function X(e,l={}){const n=l.maxLength||100;return e?("string"!=typeof e&&(e=I(e)),e.length<=n?e:e.slice(0,n+1)):""}const Y=s().div(H||(H=K`
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
`),(({isDuplicated:e})=>e&&"padding-right: var(--spacing-xl)")),q=s().div(L||(L=K`
  white-space: pre;
  overflow: hidden;
  text-overflow: ellipsis;

  &:empty:not(:focus)::before {
    content: attr(data-placeholder);
    color: var(--content-color-tertiary);
  }
`));function G(e){const l=(0,t.useRef)(null),{value:n,placeholder:i,onBlur:o,preventEnter:s,onFocus:a,type:r,currentWidth:d,actions:u,indicators:c,isDuplicated:h}=e,p=!s,b=(0,t.useCallback)((()=>{null==a||a()}),[a]),v=!n&&i,f=v?`${r} empty cell`:`${r} cell`;return(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(Y,{onBlur:o,onClick:b,ref:l,tabIndex:"0",onFocus:b,isDuplicated:h,children:(0,g.jsx)(q,{role:"cell","aria-label":f,"data-placeholder":v?i:null,children:p?U(n,{maxLength:Math.ceil(2*d)}):_(n,{maxLength:Math.ceil(2*d)})})}),c,u]})}Y.displayName="KeyValueCellContainer";const J=[{value:"text",label:"Text"},{value:"file",label:"File"}],Q="secret",ee="default";let le;const ne=s().div(le||(le=(e=>e)`
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
`),(({isFocused:e})=>e&&"\n        border: var(--border-width-default) var(--border-style-solid) var(--border-color-default);\n        background: var(--background-color-primary);\n        height: var(--size-s);\n        padding-left: var(--spacing-xs);\n        margin-top: var(--spacing-xs);\n        margin-right: var(--spacing-s);\n    "));function ie(e){const{value:l,isEditable:n,onBlur:i,onChange:t,onFocus:o,type:s}=e,a=`${s} masked cell`;return(0,g.jsx)(ne,{isFocused:Boolean(n),onBlur:i,onClick:o,onFocus:o,children:(0,g.jsx)("input",{role:"cell","aria-label":a,value:l||"",spellCheck:!1,type:"password",onChange:e=>{t(e.currentTarget.value)}},"text")})}var te=n(16913),oe=n(81397),se=n(88131);const ae=["hidden","value","isEditable","currentWidth","readOnly","shouldFocusOnMount","onBlur","onChange","onFocus","actions","editorType","maskState","enableVariableSuggestions","placeholder","isDuplicated"];let re;const de=s()(te.Z)(re||(re=(e=>e)`
  position: absolute;
  align-self: center;
  right: var(--spacing-s);
  z-index: 10;
`));function ue(e){const{hidden:l,value:n,isEditable:t,currentWidth:o,readOnly:s,shouldFocusOnMount:a,onBlur:r,onChange:u,onFocus:c,actions:h,editorType:p,maskState:b,enableVariableSuggestions:v,placeholder:f,isDuplicated:m}=e,x=(0,d.Z)(e,ae),y={readOnly:s,shouldFocusOnMount:a,onBlur:r,onChange:u},w=e=>{null==u||u(x.type,e)},C=(0,se.usePostmanInputFeatureFlag)();if(l)return null;if(v&&C){let l=!n&&f?`${x.type} empty cell`:`${x.type} cell`;return t&&(l=`${x.type} input`),(0,g.jsx)(se.KVEditorInput,{value:n||"",onChange:w,suggestions:[],placeholder:"key"===x.type?"Key":"Value",ariaLabel:l,onFocus:c,onBlur:r,shouldFocusOnMount:a,actions:h,indicators:e.indicators,isEditable:!y.readOnly})}return p===Q&&b.isMasked?(0,g.jsx)(ie,(0,i.Z)({onChange:w,onFocus:c,onBlur:r,isEditable:t,value:n,placeholder:f},x)):(0,g.jsxs)(g.Fragment,{children:[t?(0,g.jsx)(B,(0,i.Z)({},y,{onChange:w,onFocus:c,value:n,placeholder:f,isDuplicated:m},x)):(0,g.jsx)(G,(0,i.Z)({},x,{value:n,onFocus:c,actions:h,onChange:w,placeholder:f,currentWidth:o,isDuplicated:m})),m&&(0,g.jsx)(oe.Z,{content:"This variable has been overwritten by a duplicate key.",placement:"bottom",children:(0,g.jsx)(de,{color:"content-color-warning",className:"duplicate-warning-icon"})})]})}var ce=n(74962),he=n(9460),pe=n(84591);let be;const ve=s().div(be||(be=(e=>e)`
  position: absolute;
  right: var(--spacing-m);
  display: flex;
  height: 100%;
  align-items: center;
  cursor: default;
  z-index: 1;
  background: transparent !important;
`)),ge=({infoTitle:e,info:l})=>(0,g.jsxs)(g.Fragment,{children:[e&&(0,g.jsx)(ce.Z,{type:"h3",styleAs:"h4",text:e}),l&&(0,g.jsx)(he.ZP,{type:"small",color:"content-color-primary",children:l})]}),fe=e=>{const{info:l,infoTitle:n,placement:t}=e;return l||n?(0,g.jsx)(ve,{children:(0,g.jsx)(oe.Z,{content:(0,g.jsx)(ge,(0,i.Z)({},e)),placement:t,children:(0,g.jsx)(pe.Z,{})})}):null};let me;const xe=s()(u.Z)(me||(me=(e=>e)`
  margin: var(--spacing-xs);
  min-width: 80px;
`));function ye(e){const{hidden:l,options:n,defaultOption:i,onChange:o}=e,[s,a]=(0,t.useState)(i),[r,d]=(0,t.useState)(!1);return!r&&l?null:(0,g.jsx)(xe,{viaPortal:!0,className:"single-type-select","aria-label":"KV Type Select",triggerWidth:"auto",triggerSize:"small",triggerType:"tertiary",menuMinWidth:100,menuMaxWidth:165,isSearchable:!1,isClearable:!1,options:n,value:s,onOpen:()=>d(!0),onClose:()=>d(!1),onChange:e=>{a(e),null==o||o(e)}})}var we=n(58560),Ce=n(25637),ke=n(5701),je=n(19578);let Ve,Se,Te=e=>e;const Ee="Couldn't upload file",De=s()(we.Z)(Ve||(Ve=Te`
  max-width: 100%;
`)),Re=s().div(Se||(Se=Te`
  width: 100%;

  span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`));function Ae(e){return(0,g.jsx)(Ce.VW,{children:(0,g.jsx)(We,(0,i.Z)({},e))})}function We(e){const{value:l,onReset:n,id:i,label:o,name:s,multiple:a,isDisabled:r,loading:d,error:u,accept:c,autoFocus:h,onChange:p}=e,{addToast:b}=(0,Ce.ZP)();let v;if((0,t.useEffect)((()=>{u&&b({status:"error",title:Ee,description:u})}),[u,b]),null!=l&&l.length){const e=l.length,i=l[0],t=l.join(", "),o=e>1?`${e} files selected`:`${i}`;v=(0,g.jsx)(oe.Z,{content:t,children:(0,g.jsx)(Re,{children:(0,g.jsx)(ke.Af,{label:o,onClick:n})})})}else v=(0,g.jsx)(je.FileUploader,{id:i,onChange:e=>{!r&&e&&(null==p||p(e))},multiple:a,isDisabled:r,accept:c,name:s,actionLabel:o,autoFocus:h,size:"small",loading:d});return(0,g.jsx)(De,{direction:"column",alignItems:"center",children:v})}const Ze=()=>{const e=(0,t.useRef)(!0);return(0,t.useEffect)((()=>()=>{e.current=!1}),[]),e};let Me;const Oe="Select Files",Pe=s()(we.Z)(Me||(Me=(e=>e)`
  padding: var(--spacing-xs);
`));function Fe(e){const{id:l,type:n,value:i,hidden:o,error:s,onFilesSelect:a,onChange:r}=e,[d,u]=(0,t.useState)(!1),c=Ze(),h=(0,t.useMemo)((()=>Array.isArray(i)?i:i?[i]:[]),[i]);return o?null:(0,g.jsx)(Pe,{height:"100%",width:"100%",children:(0,g.jsx)(Ae,{label:Oe,id:String(l),multiple:!0,error:s,value:h,loading:d,onChange:e=>{a&&(u(!0),a(l,e).finally((()=>{c.current&&u(!1)})))},onReset:()=>null==r?void 0:r(n,"")})})}const ze=e=>e.disableEdit,$e=(e,l)=>l||e.system&&!e.allowedToToggle,Ne=(e,l)=>!e.disableEdit&&!(null!=l&&l.disableToggle)||e.system;var Be=n(95362),He=n(70262);let Le;const Ke=s().div(Le||(Le=(e=>e)`
  padding: var(--spacing-xs) var(--spacing-s);
  border-radius: var(--border-radius-default);
  opacity: ${0};

  &:hover {
    cursor: pointer;
  }
`),(({alwaysPresent:e})=>e?"1":"0"));function Ie({onClick:e,maskState:l,isVisible:n}){const i=!1===l.isMasked;return(0,g.jsx)(Ke,{role:"button",className:"toggle-mask","aria-label":"toggle-mask-row",onClick:e,alwaysPresent:i||n,children:l.isMasked?(0,g.jsx)(Be.Z,{}):(0,g.jsx)(He.Z,{})})}var _e=n(64691),Ue=n(48263),Xe=n(80605),Ye=n(59824),qe=n(17282),Ge=n(29225);const Je=e=>{const{onPersist:l,onReset:n,disableVariablePersistAction:i,disablePersistActionTooltip:t,disableResetActionTooltip:o,disableVariableResetAction:s}=e,a=(e=!1,l)=>{if(e){let e;switch(l){case"persist":e=t;break;case"reset":e=o}return e||"You do not have permissions to perform this action."}return null};return(0,g.jsxs)(_e.Z,{children:[(0,g.jsx)(Ue.Z,{children:(0,g.jsx)(Xe.Z,{icon:(0,g.jsx)(Ge.Z,{size:"small"}),type:"tertiary",tooltip:"View more actions",size:"small","data-testid":"more-options-button"})}),(0,g.jsxs)(Ye.Z,{placement:"bottom-end",children:[(0,g.jsx)(qe.Z,{onClick:l,isDisabled:i,tooltip:a(i,"persist"),children:"Persist"}),(0,g.jsx)(qe.Z,{onClick:n,isDisabled:s,tooltip:a(s,"reset"),children:"Reset"})]})]})};let Qe;const el=s().div(Qe||(Qe=(e=>e)`
  display: flex;
  flex-direction: row;
  opacity: ${0};
  margin-right: var(--spacing-xs);
`),(({isVisible:e})=>e?"1":"0")),ll=({isHidden:e=!1,children:l,isVisible:n})=>e||!l?null:(0,g.jsx)(el,{isVisible:n,children:l});var nl=n(26246);const il=["warning"],tl=["prevValue","prevCurrentWidth"],ol=["nextValue","nextCurrentWidth"];let sl,al,rl,dl,ul=e=>e;const cl=s().div(sl||(sl=ul`
  display: flex;
  flex-direction: row;
  position: relative;
  flex: 0;
  height: 32px;
  border-bottom: var(--border-width-default) var(--border-style-solid)
    var(--border-color-default);
  background-color: ${0};
  color: ${0};
`),(e=>e.isRowFocused?"var(--background-color-secondary) !important":e.isRowSelected||e.disabled?"var(--background-color-secondary)":"inherit"),(e=>e.disabled?"var(--content-color-tertiary)":"inherit")),hl=s().div(al||(al=ul`
  position: relative;
  display: flex;
  flex: 1;
  min-width: 0;
  flex-direction: row;
  color: ${0};
`),(e=>e.isBlocked?"var(--content-color-tertiary)":"inherit")),pl=s().div(rl||(rl=ul`
  display: flex;
  align-items: center;
  cursor: pointer;
  border-right: var(--border-width-default) var(--border-style-solid)
    var(--border-color-default);
`)),bl=s()(u.Z)(dl||(dl=ul`
  /* Overriding the styles of Aether dropdown control element. */
  .aether-dropdown__control,
  .aether-dropdown__control--is-focused:hover {
    border: none;
    width: 100%;
    box-shadow: none;
    background-color: unset !important;
  }
`)),vl=new Map;vl.set("default",{value:ee,label:"default"}),vl.set("secret",{value:Q,label:"secret"});const gl=[vl.get("default"),vl.get("secret")];function fl(e){const{index:l,value:n,onChange:o,onRemove:s,currentWidth:a,showColumns:r,allowedColumns:u,enableFiles:c,onFilesSelect:h,maskState:p,toggleMaskValue:b,hideVariableTypeDropdown:v,onPersist:f,onReset:m,onBlur:x,enableVariableSuggestions:y,optionsDropdownValues:w,isDuplicated:k}=e,j=(0,t.useRef)(o);j.current=o;let{key:V,value:E,sessionValue:D="",options:R,type:A,enabled:Z=!0,description:M="",fileUploadError:O}=n;const P=A===Q?Q:ee,F=r.includes("variableType")?P:A||"text",[z,$]=(0,t.useState)(null),[N,B]=(0,t.useState)(null),H=null!==z,L=(0,t.useMemo)((()=>{var e;return null!=(e=J.find((e=>e.value===n.type)))?e:J[0]}),[n.type]),K=(0,t.useCallback)(((e,l)=>{"sessionValue"===e&&void 0!==l&&n.isSessionValueDeleted&&(null==j.current||j.current((0,i.Z)({},n,{[e]:l,isSessionValueDeleted:!1})));const t="type"===e&&["text","file"].includes(l);null==j.current||j.current((0,i.Z)({},n,t&&{value:""},{[e]:l}))}),[n]),I=(0,t.useCallback)((e=>{(0,d.Z)(n,il),K("enabled",e)}),[n,K]),_=(0,t.useCallback)((()=>{s&&s()}),[s]),U=(0,t.useCallback)((l=>e[`nonEditable${T(l)}s`]),[e]);function X(e){return Number(a[null==r?void 0:r.indexOf(e)])}return(0,g.jsxs)(cl,{role:"row","aria-rowindex":l,disabled:ze(n),isRowSelected:e.isRowSelected,isRowFocused:null!==z,onMouseEnter:()=>B(!0),onMouseLeave:()=>B(!1),children:[(0,g.jsx)(C,{disabled:e.disableSorting&&e.nonEditableToggles,shouldShowCheckbox:Ne(n,e),isRowEnabled:Z,onToggleEnabledState:I,isCheckboxDisabled:$e(n,e.nonEditableToggles)}),(0,g.jsxs)(hl,{isBlocked:n.disableEdit,children:[(0,g.jsx)(S,{columnWidth:X("key"),isNonEditable:U("key"),isLastColumn:r&&"key"===r[r.length-1],content:(0,g.jsx)(ue,{type:"key",value:V,currentWidth:X("key"),onFocus:()=>$("key"),onChange:K,isEditable:"key"===z,placeholder:e.keyPlaceholder,preventEnter:e.disableMultilineKey||!1,readOnly:n.disableEdit||e.nonEditableKeys,shouldFocusOnMount:!0,onBlur:()=>$(null),isDuplicated:k,actions:(0,g.jsx)(ye,{hidden:!N||!c,options:J,defaultOption:L,onChange:e=>K("type",e.value)}),indicators:(0,g.jsx)(fe,{infoTitle:n.infoTitle,info:n.info,placement:"right"}),enableVariableSuggestions:y})}),r.includes("variableType")&&(0,g.jsx)(S,{columnWidth:X("variableType"),isNonEditable:U("variableType"),isLastColumn:r&&"variableType"===r[r.length-1],content:(!v||e.nonEditableVariableTypes)&&(0,g.jsx)(bl,{isRowFocused:H,tabIndex:-1,isDisabled:e.nonEditableVariableTypes,onChange:async n=>{const{disableAllVariablesSync:i=!1,disableSecretVariablesSync:t}=e;if(A===n.value)return;if(i||!t&&n.value===Q||t&&n.value===Q&&!E)return K("type",n.value),void(b&&b(l));const o=nl.Modals.getModals(),s=await o.showWarningDialog({uid:"kv-editor-variable-type-change-confirmation",subject:`Change ${V}'s type to ${n.value}?`,message:"This will reveal the hidden values in plain text everywhere in the app for all team members",options:[{title:"Cancel",isDefaultOnDismiss:!0},{title:"Change type",isPrimary:!0}]});return s&&"Change type"===s.title?(K("type",n.value),void(b&&b(l))):void 0},options:gl,value:vl.get(F),isClearable:!1,isSearchable:!1,menuWidth:100})}),r.includes("value")&&(0,g.jsx)(S,{columnWidth:X("value"),isNonEditable:U("value"),isLastColumn:r&&"value"===r[r.length-1],content:(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(ue,{hidden:"file"===A,type:"value",value:E,currentWidth:X("value"),onFocus:()=>$("value"),onChange:K,isEditable:"value"===z,placeholder:e.valuePlaceholder,preventEnter:e.disableMultilineValue||!1,readOnly:n.disableEdit||e.nonEditableValues,shouldFocusOnMount:!0,onBlur:()=>("value",$(null),void(x&&x("value",n))),editorType:A,maskState:p,enableVariableSuggestions:y}),(0,g.jsx)(Fe,{hidden:"file"!==A,id:l,type:"value",value:E,error:O,onChange:K,onFilesSelect:h})]})}),r.includes("description")&&(0,g.jsx)(S,{columnWidth:X("description"),isNonEditable:U("description"),isLastColumn:r&&"description"===r[r.length-1],content:(0,g.jsx)(ue,{type:"description",value:M,onChange:K,placeholder:e.descriptionPlaceholder,isEditable:"description"===z,currentWidth:X("description"),onFocus:()=>$("description"),readOnly:n.disableEdit||e.nonEditableDescriptions,shouldFocusOnMount:!0,onBlur:()=>$(null)})}),r.includes("sessionValue")&&(0,g.jsx)(S,{columnWidth:X("sessionValue"),isNonEditable:U("sessionValue"),isLastColumn:r&&"sessionValue"===r[r.length-1],content:(0,g.jsx)(ue,{type:"sessionValue",value:D,onChange:K,isEditable:"sessionValue"===z,placeholder:n.isSessionValueDeleted?"[Deleted]":e.sessionValuePlaceholder,preventEnter:e.disableMultilineValue||!1,currentWidth:X("sessionValue"),onFocus:()=>$("sessionValue"),readOnly:n.disableEdit||e.nonEditableSessionValue,shouldFocusOnMount:!0,onBlur:()=>$(null),editorType:A,maskState:p,enableVariableSuggestions:y})}),r.includes("options")&&(0,g.jsx)(S,{columnWidth:X("options"),isNonEditable:U("options"),isLastColumn:r&&"options"===r[r.length-1],content:(0,g.jsx)(bl,{isRowFocused:H,tabIndex:-1,onChange:e=>K("options",e),options:w,value:R,isClearable:!1,isSearchable:!1,menuWidth:100})}),(0,g.jsx)(pl,{children:((null==r?void 0:r.includes("value"))||(null==r?void 0:r.includes("description"))||(null==r?void 0:r.includes("sessionValue")))&&!e.isRowSelected&&!e.value.disableEdit&&(0,g.jsxs)(g.Fragment,{children:[F===Q&&(0,g.jsx)(Ie,{isVisible:N,maskState:p,onClick:()=>b(l)}),(0,g.jsxs)(ll,{isHidden:H,isVisible:N,children:[!e.disableDelete&&(0,g.jsx)(W,{onClick:_}),!e.disableVariableRowDropdown&&u.includes("sessionValue")&&(0,g.jsx)(Je,{onPersist:f,onReset:m,disableVariablePersistAction:e.disableVariablePersistAction||e.disableSecretVariablesSync&&F===Q,disablePersistActionTooltip:e.disablePersistActionTooltip,disableVariableResetAction:e.disableVariableResetAction||e.disableSecretVariablesSync&&F===Q,disableResetActionTooltip:e.disableResetActionTooltip})]})]})})]})]})}const ml=(0,t.memo)(fl,((e,l)=>{const{prevValue:n,prevCurrentWidth:i}=e,t=(0,d.Z)(e,tl),{nextValue:o,nextCurrentWidth:s}=l,a=(0,d.Z)(l,ol);return!!h()(n,o)&&(!!h()(t,a)&&!!E(i,s))}));var xl=n(49437),yl=n(80047);const wl=["values","disableSorting","onChange","onRemove","disableDelete","disableCreate","disableToggle","keyPlaceholder","valuePlaceholder","descriptionPlaceholder","disableVariableRowDropdown","currentWidth","maskStatesMap","toggleMaskValue","onPersist","onReset","onBlur","filteredIndices","searchValue","enableScroll","duplicateWarningsMap"];let Cl;const kl=s().div(Cl||(Cl=(e=>e)`
  display: flex;
  flex: 1;
  flex-direction: column;

  ${0};

  .key-value-form-editor-sortable__selectable {
    display: flex;
    flex-direction: column;
  }
`),(({enableScroll:e})=>e&&"overflow: overlay;"));function jl(e){let{values:l,disableSorting:n,onChange:o,onRemove:s,disableDelete:a,disableCreate:r,disableToggle:u,keyPlaceholder:c,valuePlaceholder:h,descriptionPlaceholder:p,disableVariableRowDropdown:b,currentWidth:v,maskStatesMap:f,toggleMaskValue:m,onPersist:x,onReset:y,onBlur:w,filteredIndices:C,searchValue:k,enableScroll:j,duplicateWarningsMap:V}=e,S=(0,d.Z)(e,wl);const T=(0,t.useCallback)(((e,l)=>{o&&o(e,l)}),[o]),E=(0,t.useCallback)((e=>{s&&s(e)}),[s]),D=k&&C?C.map((e=>l[e])):l;return(0,g.jsx)(kl,{enableScroll:j,children:k&&0===D.length?(0,g.jsx)("div",{className:"key-value-form-editor-sortable",children:(0,g.jsx)(xl.Z,{title:"No results found",children:(0,g.jsx)(yl.Z,{name:"illustration-search"})})}):D&&D.map(((e,t)=>{var o,s;const d=e.id===(null==l?void 0:l.length)-1;return(0,g.jsx)(ml,(0,i.Z)({index:t,selectableKey:e.id,value:e,onChange:l=>T(e.id,l),onRemove:()=>E(e.id),onPersist:()=>{return l=e.id,void(x&&x(l));var l},onReset:()=>{return l=e.id,void(y&&y(l));var l},onBlur:(l,n)=>((e,l,n)=>{w&&w(e,l,n)})(e.id,l,n),disableSorting:n||d,disableToggle:u||d&&!r,disableDelete:a||d&&!r,disableVariableRowDropdown:b||d&&!r,keyPlaceholder:d&&c,valuePlaceholder:d&&h,descriptionPlaceholder:d&&p,hideVariableTypeDropdown:!r&&d,currentWidth:v,maskState:!(!r&&d)&&(f&&f[e.id]||{isMasked:e.type===Q}),isDuplicated:V&&V[e.id].isOverridden,toggleMaskValue:m},S),null!=(o=null==(s=e.id)?void 0:s.toString())?o:t)}))})}var Vl=n(70355);function Sl(e,l=100){return e/l*100}function Tl(e,l=2){return Math.round(e*Math.pow(10,l))/Math.pow(10,l)}let El;const Dl=500,Rl=s().div(El||(El=(e=>e)`
  height: 32px;
  width: 16px;
  margin-left: -8px;
  background-color: transparent;
  position: absolute;
  left: ${0}%;
  cursor: col-resize;
  z-index: 1;
`),(e=>e.left)),Al=e=>{const{showColumns:l,currentWidth:n,prevColumn:i,nextColumn:o,parentWidth:s=Dl,handleResize:a}=e,r=(0,t.useCallback)((e=>{const i=null==l?void 0:l.indexOf(e);if(-1===i)return 0;let t=0;for(let e=0;e<=i;e++)t+=n[e];return Tl(t)}),[l,n]),d=(0,t.useMemo)((()=>{const e=r(l[(null==l?void 0:l.indexOf(i))-1])+Sl(100,s),n=r(o)-Sl(100,s);return{min:Tl(e),max:Tl(n)}}),[i,o,l,s,r]),u=(0,t.useCallback)((e=>Number.isNaN(d.min)||Number.isNaN(d.max)?e:Tl(Math.min(Math.max(e,d.min),d.max))),[d]),c=(0,t.useCallback)(((e,t)=>{const r=u(Sl(t.x,s));if(r==d.min||r==d.max)return;const c=[...n],h=n[l.indexOf(i)]+t.deltaX/s*100,p=n[l.indexOf(o)]-t.deltaX/s*100;c[null==l?void 0:l.indexOf(i)]=Tl(h,2),c[null==l?void 0:l.indexOf(o)]=Tl(p,2),null==a||a(c)}),[s,n,l,d]);return(0,g.jsx)(Vl.DraggableCore,{onDrag:c,children:(0,g.jsx)(Rl,{left:u(r(i))})})};let Wl,Zl,Ml,Ol,Pl,Fl,zl,$l,Nl=e=>e;const Bl=s().div(Wl||(Wl=Nl`
  font-size: var(--text-size-m);
  font-family: var(--font-family-default);
`)),Hl=s().div(Zl||(Zl=Nl`
  border-right: var(--border-width-default) var(--border-style-solid)
    var(--border-color-default);
  display: flex;
  align-items: center;
  height: 32px;
  padding: 0 var(--spacing-xs);
`)),Ll=s().div(Ml||(Ml=Nl`
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
`)),Kl=s().div(Ol||(Ol=Nl`
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
`),(e=>e.nonEditableToggles?"var(--background-color-secondary);":"inherit")),Il=s().div(Pl||(Pl=Nl`
  height: 30px;
  width: 0;
  position: absolute;
  background-color: var(--border-color-default);
`)),_l=s().div(Fl||(Fl=Nl`
  flex: 1;
  flex-direction: row;
  position: relative;
  min-width: 0;
  display: flex;
`)),Ul=s().div(zl||(zl=Nl`
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
`)),Xl=s().div($l||($l=Nl`
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
`),(e=>e.isLastColumn?`0 1 ${e.columnWidth}%`:`0 0 ${e.columnWidth}%`),(e=>e.isNonEditable?"var(--background-color-secondary)":"inherit")),Yl=new Map;Yl.set("persistAll",{disabled:"You do not have permissions to perform this action.",default:"Persisting all values will replace all initial values with the current values of the variables."}),Yl.set("resetAll",{default:"Resetting all values will replace all current values with the initial values of the variables."});const ql=(e,l,n)=>{let i;var t,o;return l&&(i=n||(null==(t=Yl.get(e))?void 0:t.disabled)),i||(i=null==(o=Yl.get(e))?void 0:o.default),i},Gl=({allowedColumns:e,persistAll:l,disableVariablePersistAction:n,disablePersistActionTooltip:i,resetAll:t,disableVariableResetAction:o,disableResetActionTooltip:s})=>e.includes("sessionValue")?(0,g.jsx)(Hl,{children:(0,g.jsxs)(_e.Z,{closeOnSelect:!1,children:[(0,g.jsx)(Ue.Z,{"data-testid":"key-value-editor-more-actions-button",children:(0,g.jsx)(Xe.Z,{size:"small",icon:(0,g.jsx)(Ge.Z,{size:"small"}),type:"tertiary",tooltip:"View more actions","data-testid":"more-options-button-column-header"})}),(0,g.jsxs)(Ye.Z,{children:[(0,g.jsx)(qe.Z,{onClick:l,isDisabled:n,tooltip:ql("persistAll",n,i),children:"Persist all"}),(0,g.jsx)(qe.Z,{onClick:t,isDisabled:o,tooltip:ql("resetAll",o,s),children:"Reset all"})]})]})}):null;function Jl(e){const{showColumns:l,currentWidth:n,handleWidthChange:i,keyHeading:o,valueHeading:s,descriptionHeading:a,sessionHeading:r,typeHeading:d,optionsHeading:u,allowedColumns:c,persistAll:h,resetAll:p,disableVariablePersistAction:b,disablePersistActionTooltip:v,disableVariableResetAction:f,disableResetActionTooltip:m}=e,x=(0,t.useRef)(null),[y,w]=(0,t.useState)(null);(0,t.useEffect)((()=>{const e=new ResizeObserver((e=>{w(e[0].contentRect.width)})),l=x.current;return e.observe(l),()=>{e.unobserve(l)}}),[]);const C=(0,t.useCallback)((l=>e[`nonEditable${T(l)}s`]),[e]),k=(0,t.useCallback)((e=>Number(n[null==l?void 0:l.indexOf(e)])),[l,n]);return(0,g.jsx)(Bl,{role:"rowgroup",children:(0,g.jsxs)(Ll,{role:"row",children:[(0,g.jsx)(Kl,{children:(0,g.jsx)(Il,{})}),(0,g.jsxs)(_l,{ref:x,children:[(0,g.jsx)(Xl,{type:"key",role:"columnheader",columnWidth:k("key"),isNonEditable:C("key"),isLastColumn:l&&"key"===l[l.length-1],children:(0,g.jsx)(Ul,{children:o||"Key"})}),(null==l?void 0:l.includes("variableType"))&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(Al,{handleResize:i,showColumns:l,currentWidth:n,prevColumn:"key",nextColumn:"variableType",parentWidth:y}),(0,g.jsx)(Xl,{type:"variableType",role:"columnheader",columnWidth:k("variableType"),isNonEditable:C("variableType"),isLastColumn:l&&"variableType"===l[l.length-1],children:(0,g.jsx)(Ul,{children:d||"Type"})})]}),(null==l?void 0:l.includes("value"))&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(Al,{handleResize:i,showColumns:l,currentWidth:n,prevColumn:l.includes("variableType")?"variableType":"key",nextColumn:"value",parentWidth:y}),(0,g.jsx)(Xl,{type:"value",role:"columnheader",columnWidth:k("value"),isNonEditable:C("value"),isLastColumn:l&&"value"===l[l.length-1],children:(0,g.jsx)(Ul,{children:s||"Value"})})]}),(null==l?void 0:l.includes("description"))&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(Al,{handleResize:i,showColumns:l,currentWidth:n,prevColumn:"value",nextColumn:"description",parentWidth:y}),(0,g.jsx)(Xl,{type:"description",role:"columnheader",columnWidth:k("description"),isNonEditable:C("description"),isLastColumn:l&&"description"===l[l.length-1],children:(0,g.jsx)(Ul,{children:a||"Description"})})]}),(null==l?void 0:l.includes("sessionValue"))&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(Al,{handleResize:i,showColumns:l,currentWidth:n,prevColumn:"value",nextColumn:"sessionValue",parentWidth:y}),(0,g.jsx)(Xl,{type:"sessionValue",role:"columnheader",columnWidth:k("sessionValue"),isNonEditable:C("sessionValue"),isLastColumn:l&&"sessionValue"===l[l.length-1],children:(0,g.jsx)(Ul,{children:r||"Current value"})})]}),c.includes("sessionValue")&&(0,g.jsx)(Gl,{allowedColumns:c,persistAll:h,resetAll:p,disablePersistActionTooltip:v,disableResetActionTooltip:m,disableVariablePersistAction:b,disableVariableResetAction:f}),(null==l?void 0:l.includes("options"))&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(Al,{handleResize:i,showColumns:l,currentWidth:n,prevColumn:"value",nextColumn:"options",parentWidth:y}),(0,g.jsx)(Xl,{type:"options",role:"columnheader",columnWidth:k("options"),isNonEditable:C("options"),isLastColumn:l&&"options"===l[l.length-1],children:(0,g.jsx)(Ul,{children:u||"Options"})})]})]})]})})}const Ql=["defaultValue","entityType","values","onChange","showColumns","nonEditableKeys","nonEditableValues","nonEditableDescriptions","nonEditableToggles","nonEditableOptions","keyHeading","valueHeading","sessionHeading","optionsHeading","optionsTooltip","nonEditableVariableTypes","hideBulkOptions","maskStatesMap","toggleMaskValue","initialColumnWidths","disableVariablePersistAction","disableVariableResetAction","disableSecretVariablesSync","disablePersistActionTooltip","disableResetActionTooltip","onDeleteRow","disallowDuplicates"];let en;const ln=s().div(en||(en=(e=>e)`
  display: flex;
  flex: 1;
  flex-direction: column;
  border-top: thin solid var(--border-color-default);
  min-height: 0;
`));function nn(e){let{defaultValue:l="",entityType:n,values:o,onChange:s,showColumns:a,nonEditableKeys:r,nonEditableValues:u,nonEditableDescriptions:c,nonEditableToggles:h,nonEditableOptions:p,keyHeading:b,valueHeading:v,sessionHeading:f,optionsHeading:m,optionsTooltip:x,nonEditableVariableTypes:y,hideBulkOptions:w,maskStatesMap:C,toggleMaskValue:k,initialColumnWidths:j,disableVariablePersistAction:V,disableVariableResetAction:S,disableSecretVariablesSync:T,disablePersistActionTooltip:E,disableResetActionTooltip:D,onDeleteRow:R,disallowDuplicates:A}=e,W=(0,d.Z)(e,Ql);const Z={showColumns:a,allowedColumns:W.allowedColumns,nonEditableKeys:r,nonEditableValues:u,nonEditableDescriptions:c,nonEditableToggles:h,nonEditableOptions:p,hideBulkOptions:w},M=(0,t.useRef)(s);M.current=s;const[O,P]=(0,t.useState)(function(e,l){let n;return l?n=l:(n=new Array(e.length).fill(Math.floor(100/e.length)),n[n.length-1]=n.at(-1)+(100-n.reduce(((e,l)=>e+l)))),n}(a,j)),F=(0,t.useCallback)(((e,i={})=>{let t="text";"environment"!==n&&"globals"!==n||(t="default"),"collection"===n&&(t="string");const o={key:i.key||l,value:i.value||l,description:i.description||l,type:i.type||t,id:e};return W.allowedColumns.includes("sessionValue")&&(o.sessionValue=i.sessionValue||null),W.disableToggle||(o.enabled=!0),o}),[l,W.disableToggle,n,W.allowedColumns]),z=(0,t.useCallback)((()=>{if(o.length>0){var e=null==o?void 0:o.reduce((function(e,l){return e.id>=l.id?e:l}),{});return l=e,[Object,Array].includes((l||{}).constructor)&&0===Object.entries(l||{}).length?0:e.id+1}var l;return 0}),[o]),$=(0,t.useCallback)(((e,l)=>{const n=[...o],t=n.length===e?[...n,F(z(),l)]:n.map((n=>n.id===e?(0,i.Z)({},n,l):(0,i.Z)({},n)));null==M.current||M.current(t)}),[o,F,z]),N=(0,t.useCallback)((e=>{const l=[...o],n=null==l?void 0:l.filter(((l={})=>l.id!==e));R&&R(e),null==M.current||M.current(n)}),[o,R]),B=(0,g.jsx)(Jl,(0,i.Z)({},Z,{keyHeading:b||"Key",valueHeading:v||"Value",sessionHeading:f||"Current value",optionsHeading:m||"Options",optionsTooltip:x,nonEditableVariableTypes:y,handleWidthChange:P,currentWidth:O,persistAll:()=>{if(V)return;let e=!1;const l=o.reduce(((l,n)=>{const t=n.enabled?n.sessionValue:n.value;return n.isSessionValueDeleted?(e=!0,l):(!e&&(e=!(T&&n.type===Q)),T&&n.type===Q?l.push(n):l.push((0,i.Z)({},n,{value:t})),l)}),[]);e&&(null==M.current||M.current(l))},resetAll:()=>{if(S)return;let e=!1;const l=o.map((l=>{const n=l.enabled?l.value:l.sessionValue;return T&&l.type===Q?l:(e=!0,(0,i.Z)({},l,{sessionValue:n,isSessionValueDeleted:!1}))}));e&&(null==M.current||M.current(l))},disableVariablePersistAction:V,disableVariableResetAction:S,disablePersistActionTooltip:E,disableResetActionTooltip:D})),H=(0,t.useMemo)((()=>W.disableCreate?o:[...o,F(z())]),[o,W.disableCreate,F,z]),L=(0,t.useMemo)((()=>A?H.map(((e,l)=>{if(e.enabled&&""!==e.key)for(let n=l+1;n<H.length;n++){const l=H[n];if(e.key===l.key&&l.enabled&&""!==l.key)return(0,i.Z)({},e,{isOverridden:!0})}return(0,i.Z)({},e,{isOverridden:!1})})):null),[H,A]);return(0,g.jsxs)(ln,{children:[o.length>0||!W.disableCreate?B:null,(0,g.jsx)(jl,(0,i.Z)({},Z,W,{nonEditableVariableTypes:y,values:H,onChange:$,onRemove:N,currentWidth:O,maskStatesMap:C,toggleMaskValue:k,onPersist:e=>{if(V)return;let l=!1;const n=o.reduce(((n,t)=>{if(t.id===e){if(t.isSessionValueDeleted)return l=!0,n;T&&t.type===Q?n.push(t):(l=!0,n.push((0,i.Z)({},t,{value:t.sessionValue})))}else n.push(t);return n}),[]);l&&(null==M.current||M.current(n))},onReset:e=>{if(S)return;let l=!1;const n=o.map((n=>n.id!==e||T&&n.type===Q?n:(l=!0,(0,i.Z)({},n,{sessionValue:n.value,isSessionValueDeleted:!1}))));l&&(null==M.current||M.current(n))},onBlur:(e,l,n)=>{const t=o.findIndex((l=>l.id===e)),s=-1!==t&&o[t].sessionValue;let a;"value"===l&&-1!==t&&null===s&&n.value&&(a=[...o],a[t]=(0,i.Z)({},n,{sessionValue:n.value}),null==M.current||M.current(a))},disableVariablePersistAction:V,disableVariableResetAction:S,disableSecretVariablesSync:T,disablePersistActionTooltip:E,disableResetActionTooltip:D,duplicateWarningsMap:L}))]})}var tn=n(68206);const on=Z(((e,...l)=>e(...l)),100),sn=({onSearchValueChange:e})=>{const[l,n]=(0,t.useState)("");return(0,g.jsx)("div",{className:"search-variable",children:(0,g.jsx)(tn.Z,{placeholder:"Filter variables",value:l,type:"search",onChange:l=>{n(l.target.value),on(e,l.target.value)},onClear:()=>{n(""),e("")},prefix:!0,name:"filter-values"})})};function an(e,l){try{const n=(0,se.castNonStringTypesToString)(e),i=(0,se.castNonStringTypesToString)(l),t=n.toLowerCase(),o=i.toLowerCase();return t.indexOf(o)}catch(n){return console.error("PatterSearch~caseInsensitiveIndexof: Failed with error",n,e,l),-1}}let rn;const dn=s().div(rn||(rn=(e=>e)`
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
`),(({enableScroll:e})=>e&&"height: 100%;")),un=(e,l)=>!l||!(!e.key||-1===an(e.key,l))||"secret"!==e.type&&(!(!e.value||-1===an(e.value,l))||!(!e.sessionValue||-1===an(e.sessionValue,l))||void 0),cn=(e,l)=>{if(!l)return null;const n=[];for(const[i,t]of e.entries())un(t,l)&&n.push(i);return n},hn=(0,r.observer)((function(e){const{values:l,onChange:n,tableName:o,disallowDuplicates:s,allowedColumns:r,showColumns:d,onColumnToggle:u,keyPlaceholder:c,valuePlaceholder:h,maskStatesMap:p,toggleMaskValue:b,initialColumnWidths:v,enableFiltering:f=!1,enableScroll:m,isDirty:x=!1}=e,[y,w]=(0,t.useState)([]),[C,k]=(0,t.useState)(""),[j,V]=(0,t.useState)(null),S=(0,t.useRef)(x),T=(0,t.useCallback)((e=>{if(0===y.length)return!0;e.preventDefault();const i=null==l?void 0:l.filter(((e,l)=>!(null!=y&&y.includes(l))));y.sort(),0!==y[0]&&(y.length,l.length),w([]),n(i)}),[l,n,y]),E=(0,t.useCallback)((()=>{y.length>0&&w([])}),[y]),D=(0,t.useMemo)((()=>{let e=0;return(0,a.computed)((()=>null==l?void 0:l.map((l=>(0,i.Z)({},l,{id:e++})))))}),[l]).get();return(0,t.useEffect)((()=>{const e=cn(D,C);V(e)}),[C]),(0,t.useEffect)((()=>{if(S.current&&!x){const e=cn(D,C);V(e)}S.current=x}),[x]),(0,g.jsxs)(dn,{role:"table","aria-label":o,enableScroll:m,children:[f&&(0,g.jsx)(sn,{onSearchValueChange:k}),(0,g.jsx)(nn,(0,i.Z)({},e,{disallowDuplicates:s,onChange:n,values:D,selectedRows:y,deleteSelectedRows:T,onBeforeInput:E,allowedColumns:r,showColumns:d,onColumnToggle:u,keyPlaceholder:void 0===c?"Key":c,valuePlaceholder:void 0===h?"Value":h,descriptionPlaceholder:"Description",maskStatesMap:p,toggleMaskValue:b,initialColumnWidths:v,filteredIndices:j,searchValue:C,onDeleteRow:e=>{if(!C)return;const l=((e,l)=>{const n=[],i=new Set(l);let t=0;for(const l of e)i.has(l)?t++:n.push(l-t);return n})(j,[e]);V(l)}})),(0,g.jsx)(nl.Modals.Ui.ModalDialog,{uid:"kv-editor-variable-type-change-confirmation"})]})})),pn=e=>(0,g.jsx)(hn,(0,i.Z)({},e))}}]);
//# sourceMappingURL=7623.496d7c08af7579b7.js.map