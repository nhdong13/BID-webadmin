(this["webpackJsonp@coreui/coreui-free-react-admin-template"]=this["webpackJsonp@coreui/coreui-free-react-admin-template"]||[]).push([[44],{1149:function(e,t,a){"use strict";a.r(t);var n=a(229),i=a(230),o=a(232),s=a(231),r=a(234),l=a(233),c=a(3),p=a.n(c),h=a(896),u=a(34),d=a(889),m=a.n(d),f=a(950),g=function(e){var t=m()("tooltip","show"),a=m()("tooltip-inner",e.innerClassName);return p.a.createElement(f.a,Object(u.a)({},e,{popperClassName:t,innerClassName:a}))};g.propTypes=f.b,g.defaultProps={placement:"top",autohide:!0,placementPrefix:"bs-tooltip",trigger:"click hover focus"};var b=g,O=a(898),v=a(900),T=a(899),E=a(893),y=a(891),j=a(68),C=a(112),w=a.n(C),N=a(890),k=["defaultOpen"],_=function(e){function t(t){var a;return(a=e.call(this,t)||this).state={isOpen:t.defaultOpen||!1},a.toggle=a.toggle.bind(Object(y.a)(a)),a}Object(j.a)(t,e);var a=t.prototype;return a.toggle=function(){this.setState({isOpen:!this.state.isOpen})},a.render=function(){return p.a.createElement(b,Object(u.a)({isOpen:this.state.isOpen,toggle:this.toggle},Object(N.n)(this.props,k)))},t}(c.Component);_.propTypes=Object(E.a)({defaultOpen:w.a.bool},b.propTypes);var D=function(e){function t(e){var a;return Object(n.a)(this,t),(a=Object(o.a)(this,Object(s.a)(t).call(this,e))).toggle=a.toggle.bind(Object(r.a)(a)),a.state={tooltipOpen:!1},a}return Object(l.a)(t,e),Object(i.a)(t,[{key:"toggle",value:function(){this.setState({tooltipOpen:!this.state.tooltipOpen})}},{key:"render",value:function(){return p.a.createElement("span",null,p.a.createElement(h.a,{className:"mr-1",color:"secondary",id:"Tooltip-"+this.props.id},this.props.item.text),p.a.createElement(b,{placement:this.props.item.placement,isOpen:this.state.tooltipOpen,target:"Tooltip-"+this.props.id,toggle:this.toggle},"Tooltip Content!"))}}]),t}(p.a.Component),x=function(e){function t(e){var a;return Object(n.a)(this,t),(a=Object(o.a)(this,Object(s.a)(t).call(this,e))).toggle=a.toggle.bind(Object(r.a)(a)),a.state={tooltipOpen:[!1,!1],tooltips:[{placement:"top",text:"Top"},{placement:"bottom",text:"Bottom"},{placement:"left",text:"Left"},{placement:"right",text:"Right"}]},a}return Object(l.a)(t,e),Object(i.a)(t,[{key:"toggle",value:function(e){var t=this.state.tooltipOpen.map((function(t,a){return a===e&&!t}));this.setState({tooltipOpen:t})}},{key:"render",value:function(){var e=this;return p.a.createElement("div",{className:"animated fadeIn"},p.a.createElement(O.a,null,p.a.createElement(v.a,null,p.a.createElement("i",{className:"fa fa-align-justify"}),p.a.createElement("strong",null,"Tooltips"),p.a.createElement("div",{className:"card-header-actions"},p.a.createElement("a",{href:"https://reactstrap.github.io/components/tooltips/",rel:"noreferrer noopener",target:"_blank",className:"card-header-action"},p.a.createElement("small",{className:"text-muted"},"docs")))),p.a.createElement(T.a,null,p.a.createElement("p",null,"Somewhere in here is a ",p.a.createElement("a",{href:"#",id:"TooltipExample"},"tooltip"),"."),p.a.createElement(b,{placement:"right",isOpen:this.state.tooltipOpen[0],target:"TooltipExample",toggle:function(){e.toggle(0)}},"Hello world!"))),p.a.createElement(O.a,null,p.a.createElement(v.a,null,p.a.createElement("i",{className:"fa fa-align-justify"}),p.a.createElement("strong",null,"Tooltip"),p.a.createElement("small",null," disable autohide")),p.a.createElement(T.a,null,p.a.createElement("p",null,"Sometimes you need to allow users to select text within a ",p.a.createElement("a",{href:"#",id:"DisabledAutoHideExample"},"tooltip"),"."),p.a.createElement(b,{placement:"top",isOpen:this.state.tooltipOpen[1],autohide:!1,target:"DisabledAutoHideExample",toggle:function(){e.toggle(1)}},"Try to select this text!"))),p.a.createElement(O.a,null,p.a.createElement(v.a,null,p.a.createElement("i",{className:"fa fa-align-justify"}),p.a.createElement("strong",null,"Tooltip"),p.a.createElement("small",null," list")),p.a.createElement(T.a,null,this.state.tooltips.map((function(e,t){return p.a.createElement(D,{key:t,item:e,id:t})})))),p.a.createElement(O.a,null,p.a.createElement(v.a,null,p.a.createElement("i",{className:"fa fa-align-justify"}),p.a.createElement("strong",null,"Tooltip"),p.a.createElement("small",null," uncontrolled")),p.a.createElement(T.a,null,p.a.createElement("p",null,"Somewhere in here is a ",p.a.createElement("a",{href:"#",id:"UncontrolledTooltipExample"},"tooltip"),"."),p.a.createElement(_,{placement:"right",target:"UncontrolledTooltipExample"},"Hello world!"))))}}]),t}(c.Component);t.default=x},896:function(e,t,a){"use strict";var n=a(34),i=a(87),o=a(891),s=a(68),r=a(3),l=a.n(r),c=a(112),p=a.n(c),h=a(889),u=a.n(h),d=a(890),m={active:p.a.bool,"aria-label":p.a.string,block:p.a.bool,color:p.a.string,disabled:p.a.bool,outline:p.a.bool,tag:d.q,innerRef:p.a.oneOfType([p.a.object,p.a.func,p.a.string]),onClick:p.a.func,size:p.a.string,children:p.a.node,className:p.a.string,cssModule:p.a.object,close:p.a.bool},f=function(e){function t(t){var a;return(a=e.call(this,t)||this).onClick=a.onClick.bind(Object(o.a)(a)),a}Object(s.a)(t,e);var a=t.prototype;return a.onClick=function(e){this.props.disabled?e.preventDefault():this.props.onClick&&this.props.onClick(e)},a.render=function(){var e=this.props,t=e.active,a=e["aria-label"],o=e.block,s=e.className,r=e.close,c=e.cssModule,p=e.color,h=e.outline,m=e.size,f=e.tag,g=e.innerRef,b=Object(i.a)(e,["active","aria-label","block","className","close","cssModule","color","outline","size","tag","innerRef"]);r&&"undefined"===typeof b.children&&(b.children=l.a.createElement("span",{"aria-hidden":!0},"\xd7"));var O="btn"+(h?"-outline":"")+"-"+p,v=Object(d.m)(u()(s,{close:r},r||"btn",r||O,!!m&&"btn-"+m,!!o&&"btn-block",{active:t,disabled:this.props.disabled}),c);b.href&&"button"===f&&(f="a");var T=r?"Close":null;return l.a.createElement(f,Object(n.a)({type:"button"===f&&b.onClick?"button":void 0},b,{className:v,ref:g,onClick:this.onClick,"aria-label":a||T}))},t}(l.a.Component);f.propTypes=m,f.defaultProps={color:"secondary",tag:"button"},t.a=f},903:function(e,t,a){"use strict";var n=a(34),i=a(87),o=a(893),s=a(3),r=a.n(s),l=a(112),c=a.n(l),p=a(889),h=a.n(p),u=a(902),d=a(890),m=Object(o.a)({},u.Transition.propTypes,{children:c.a.oneOfType([c.a.arrayOf(c.a.node),c.a.node]),tag:d.q,baseClass:c.a.string,baseClassActive:c.a.string,className:c.a.string,cssModule:c.a.object,innerRef:c.a.oneOfType([c.a.object,c.a.string,c.a.func])}),f=Object(o.a)({},u.Transition.defaultProps,{tag:"div",baseClass:"fade",baseClassActive:"show",timeout:d.e.Fade,appear:!0,enter:!0,exit:!0,in:!0});function g(e){var t=e.tag,a=e.baseClass,o=e.baseClassActive,s=e.className,l=e.cssModule,c=e.children,p=e.innerRef,m=Object(i.a)(e,["tag","baseClass","baseClassActive","className","cssModule","children","innerRef"]),f=Object(d.o)(m,d.c),g=Object(d.n)(m,d.c);return r.a.createElement(u.Transition,f,(function(e){var i="entered"===e,u=Object(d.m)(h()(s,a,i&&o),l);return r.a.createElement(t,Object(n.a)({className:u},g,{ref:p}),c)}))}g.propTypes=m,g.defaultProps=f,t.a=g},950:function(e,t,a){"use strict";var n=a(34),i=a(891),o=a(68),s=a(3),r=a.n(s),l=a(112),c=a.n(l),p=a(87),h=a(893),u=a(235),d=a.n(u),m=a(889),f=a.n(m),g=a(901),b=a(890),O=a(903);var v={children:c.a.node.isRequired,popperClassName:c.a.string,placement:c.a.string,placementPrefix:c.a.string,arrowClassName:c.a.string,hideArrow:c.a.bool,tag:b.q,isOpen:c.a.bool.isRequired,cssModule:c.a.object,offset:c.a.oneOfType([c.a.string,c.a.number]),fallbackPlacement:c.a.oneOfType([c.a.string,c.a.array]),flip:c.a.bool,container:b.r,target:b.r.isRequired,modifiers:c.a.object,boundariesElement:c.a.oneOfType([c.a.string,b.a]),onClosed:c.a.func,fade:c.a.bool,transition:c.a.shape(O.a.propTypes)},T={boundariesElement:"scrollParent",placement:"auto",hideArrow:!1,isOpen:!1,offset:0,fallbackPlacement:"flip",flip:!0,container:"body",modifiers:{},onClosed:function(){},fade:!0,transition:Object(h.a)({},O.a.defaultProps)},E=function(e){function t(t){var a;return(a=e.call(this,t)||this).setTargetNode=a.setTargetNode.bind(Object(i.a)(a)),a.getTargetNode=a.getTargetNode.bind(Object(i.a)(a)),a.getRef=a.getRef.bind(Object(i.a)(a)),a.onClosed=a.onClosed.bind(Object(i.a)(a)),a.state={isOpen:t.isOpen},a}Object(o.a)(t,e),t.getDerivedStateFromProps=function(e,t){return e.isOpen&&!t.isOpen?{isOpen:e.isOpen}:null};var a=t.prototype;return a.componentDidUpdate=function(){this._element&&this._element.childNodes&&this._element.childNodes[0]&&this._element.childNodes[0].focus&&this._element.childNodes[0].focus()},a.setTargetNode=function(e){this.targetNode="string"===typeof e?Object(b.j)(e):e},a.getTargetNode=function(){return this.targetNode},a.getContainerNode=function(){return Object(b.j)(this.props.container)},a.getRef=function(e){this._element=e},a.onClosed=function(){this.props.onClosed(),this.setState({isOpen:!1})},a.renderChildren=function(){var e=this.props,t=e.cssModule,a=e.children,i=e.isOpen,o=e.flip,s=(e.target,e.offset),l=e.fallbackPlacement,c=e.placementPrefix,u=e.arrowClassName,d=e.hideArrow,m=e.popperClassName,v=e.tag,T=(e.container,e.modifiers),E=e.boundariesElement,y=(e.onClosed,e.fade),j=e.transition,C=e.placement,w=Object(p.a)(e,["cssModule","children","isOpen","flip","target","offset","fallbackPlacement","placementPrefix","arrowClassName","hideArrow","popperClassName","tag","container","modifiers","boundariesElement","onClosed","fade","transition","placement"]),N=Object(b.m)(f()("arrow",u),t),k=Object(b.m)(f()(m,c?c+"-auto":""),this.props.cssModule),_=Object(h.a)({offset:{offset:s},flip:{enabled:o,behavior:l},preventOverflow:{boundariesElement:E}},T),D=Object(h.a)({},O.a.defaultProps,{},j,{baseClass:y?j.baseClass:"",timeout:y?j.timeout:0});return r.a.createElement(O.a,Object(n.a)({},D,w,{in:i,onExited:this.onClosed,tag:v}),r.a.createElement(g.b,{referenceElement:this.targetNode,modifiers:_,placement:C},(function(e){var t=e.ref,n=e.style,i=e.placement,o=e.arrowProps;return r.a.createElement("div",{ref:t,style:n,className:k,"x-placement":i},a,!d&&r.a.createElement("span",{ref:o.ref,className:N,style:o.style}))})))},a.render=function(){return this.setTargetNode(this.props.target),this.state.isOpen?"inline"===this.props.container?this.renderChildren():d.a.createPortal(r.a.createElement("div",{ref:this.getRef},this.renderChildren()),this.getContainerNode()):null},t}(r.a.Component);E.propTypes=v,E.defaultProps=T;var y=E;a.d(t,"b",(function(){return j}));var j={placement:c.a.oneOf(b.b),target:b.r.isRequired,container:b.r,isOpen:c.a.bool,disabled:c.a.bool,hideArrow:c.a.bool,boundariesElement:c.a.oneOfType([c.a.string,b.a]),className:c.a.string,innerClassName:c.a.string,arrowClassName:c.a.string,popperClassName:c.a.string,cssModule:c.a.object,toggle:c.a.func,autohide:c.a.bool,placementPrefix:c.a.string,delay:c.a.oneOfType([c.a.shape({show:c.a.number,hide:c.a.number}),c.a.number]),modifiers:c.a.object,offset:c.a.oneOfType([c.a.string,c.a.number]),innerRef:c.a.oneOfType([c.a.func,c.a.string,c.a.object]),trigger:c.a.string,fade:c.a.bool,flip:c.a.bool},C={show:0,hide:0},w={isOpen:!1,hideArrow:!1,autohide:!1,delay:C,toggle:function(){},trigger:"click",fade:!0};function N(e,t){return t&&(e===t||t.contains(e))}function k(e,t){return void 0===t&&(t=[]),t&&t.length&&t.find((function(t){return N(e,t)}))}var _=function(e){function t(t){var a;return(a=e.call(this,t)||this)._targets=[],a.currentTargetElement=null,a.addTargetEvents=a.addTargetEvents.bind(Object(i.a)(a)),a.handleDocumentClick=a.handleDocumentClick.bind(Object(i.a)(a)),a.removeTargetEvents=a.removeTargetEvents.bind(Object(i.a)(a)),a.toggle=a.toggle.bind(Object(i.a)(a)),a.showWithDelay=a.showWithDelay.bind(Object(i.a)(a)),a.hideWithDelay=a.hideWithDelay.bind(Object(i.a)(a)),a.onMouseOverTooltipContent=a.onMouseOverTooltipContent.bind(Object(i.a)(a)),a.onMouseLeaveTooltipContent=a.onMouseLeaveTooltipContent.bind(Object(i.a)(a)),a.show=a.show.bind(Object(i.a)(a)),a.hide=a.hide.bind(Object(i.a)(a)),a.onEscKeyDown=a.onEscKeyDown.bind(Object(i.a)(a)),a.getRef=a.getRef.bind(Object(i.a)(a)),a.state={isOpen:t.isOpen},a._isMounted=!1,a}Object(o.a)(t,e);var a=t.prototype;return a.componentDidMount=function(){this._isMounted=!0,this.updateTarget()},a.componentWillUnmount=function(){this._isMounted=!1,this.removeTargetEvents(),this._targets=null,this.clearShowTimeout(),this.clearHideTimeout()},t.getDerivedStateFromProps=function(e,t){return e.isOpen&&!t.isOpen?{isOpen:e.isOpen}:null},a.onMouseOverTooltipContent=function(){this.props.trigger.indexOf("hover")>-1&&!this.props.autohide&&(this._hideTimeout&&this.clearHideTimeout(),this.state.isOpen&&!this.props.isOpen&&this.toggle())},a.onMouseLeaveTooltipContent=function(e){this.props.trigger.indexOf("hover")>-1&&!this.props.autohide&&(this._showTimeout&&this.clearShowTimeout(),e.persist(),this._hideTimeout=setTimeout(this.hide.bind(this,e),this.getDelay("hide")))},a.onEscKeyDown=function(e){"Escape"===e.key&&this.hide(e)},a.getRef=function(e){var t=this.props.innerRef;t&&("function"===typeof t?t(e):"object"===typeof t&&(t.current=e)),this._popover=e},a.getDelay=function(e){var t=this.props.delay;return"object"===typeof t?isNaN(t[e])?C[e]:t[e]:t},a.show=function(e){this.props.isOpen||(this.clearShowTimeout(),this.currentTargetElement=e&&e.target,this.toggle(e))},a.showWithDelay=function(e){this._hideTimeout&&this.clearHideTimeout(),this._showTimeout=setTimeout(this.show.bind(this,e),this.getDelay("show"))},a.hide=function(e){this.props.isOpen&&(this.clearHideTimeout(),this.currentTargetElement=null,this.toggle(e))},a.hideWithDelay=function(e){this._showTimeout&&this.clearShowTimeout(),this._hideTimeout=setTimeout(this.hide.bind(this,e),this.getDelay("hide"))},a.clearShowTimeout=function(){clearTimeout(this._showTimeout),this._showTimeout=void 0},a.clearHideTimeout=function(){clearTimeout(this._hideTimeout),this._hideTimeout=void 0},a.handleDocumentClick=function(e){var t=this.props.trigger.split(" ");t.indexOf("legacy")>-1&&(this.props.isOpen||k(e.target,this._targets))?(this._hideTimeout&&this.clearHideTimeout(),this.props.isOpen&&!N(e.target,this._popover)?this.hideWithDelay(e):this.props.isOpen||this.showWithDelay(e)):t.indexOf("click")>-1&&k(e.target,this._targets)&&(this._hideTimeout&&this.clearHideTimeout(),this.props.isOpen?this.hideWithDelay(e):this.showWithDelay(e))},a.addEventOnTargets=function(e,t,a){this._targets.forEach((function(n){n.addEventListener(e,t,a)}))},a.removeEventOnTargets=function(e,t,a){this._targets.forEach((function(n){n.removeEventListener(e,t,a)}))},a.addTargetEvents=function(){if(this.props.trigger){var e=this.props.trigger.split(" ");-1===e.indexOf("manual")&&((e.indexOf("click")>-1||e.indexOf("legacy")>-1)&&document.addEventListener("click",this.handleDocumentClick,!0),this._targets&&this._targets.length&&(e.indexOf("hover")>-1&&(this.addEventOnTargets("mouseover",this.showWithDelay,!0),this.addEventOnTargets("mouseout",this.hideWithDelay,!0)),e.indexOf("focus")>-1&&(this.addEventOnTargets("focusin",this.show,!0),this.addEventOnTargets("focusout",this.hide,!0)),this.addEventOnTargets("keydown",this.onEscKeyDown,!0)))}},a.removeTargetEvents=function(){this._targets&&(this.removeEventOnTargets("mouseover",this.showWithDelay,!0),this.removeEventOnTargets("mouseout",this.hideWithDelay,!0),this.removeEventOnTargets("keydown",this.onEscKeyDown,!0),this.removeEventOnTargets("focusin",this.show,!0),this.removeEventOnTargets("focusout",this.hide,!0)),document.removeEventListener("click",this.handleDocumentClick,!0)},a.updateTarget=function(){var e=Object(b.j)(this.props.target,!0);e!==this._targets&&(this.removeTargetEvents(),this._targets=e?Array.from(e):[],this.currentTargetElement=this.currentTargetElement||this._targets[0],this.addTargetEvents())},a.toggle=function(e){return this.props.disabled||!this._isMounted?e&&e.preventDefault():this.props.toggle(e)},a.render=function(){if(!this.props.isOpen)return null;this.updateTarget();var e=this.props,t=e.className,a=e.cssModule,i=e.innerClassName,o=(e.target,e.isOpen),s=e.hideArrow,l=e.boundariesElement,c=e.placement,p=e.placementPrefix,h=e.arrowClassName,u=e.popperClassName,d=e.container,m=e.modifiers,f=e.offset,g=e.fade,O=e.flip,v=Object(b.n)(this.props,Object.keys(j)),T=Object(b.m)(u,a),E=Object(b.m)(i,a);return r.a.createElement(y,{className:t,target:this.currentTargetElement||this._targets[0],isOpen:o,hideArrow:s,boundariesElement:l,placement:c,placementPrefix:p,arrowClassName:h,popperClassName:T,container:d,modifiers:m,offset:f,cssModule:a,fade:g,flip:O},r.a.createElement("div",Object(n.a)({},v,{ref:this.getRef,className:E,role:"tooltip","aria-hidden":o,onMouseOver:this.onMouseOverTooltipContent,onMouseLeave:this.onMouseLeaveTooltipContent,onKeyDown:this.onEscKeyDown})))},t}(r.a.Component);_.propTypes=j,_.defaultProps=w;t.a=_}}]);
//# sourceMappingURL=44.05e58dca.chunk.js.map