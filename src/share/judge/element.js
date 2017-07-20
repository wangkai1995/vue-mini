
import { makeMap }from './../utiliy/tool';



//保留的标签
export var  isReservedTag =  makeMap('reservedTag',
	'template,script,style,element,content,slot,link,meta,svg,view,'+
	'a,div,img,image,text,span,richtext,input,switch,textarea,spinner,select,'+
	'slider,slider-neighbor,indicator,trisition,trisition-group,canvas,'+
	'list,cell,header,loading,loading-inidcator,refresh,scrollable,scroller,'+
	'video,web,embed,tabbar,tabheader,datepicker,timepicker,marquee,countdown'
);


//不能被分局的标签
export var isNonPhrasingTag = makeMap('NonPhrasing',
	'address,article,aside,base,blockquote,body,caption,col,colgroup,dd,'+
	'details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,'+
	'h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,'+
	'title,tr,track'
)


//不可嵌套标签
export var canBeleftOpenTag = makeMap('beleftOpenTag',
	'web,spinner,switch,video,textarea,canvas,'+
	'indicator,marquee,countdown'
);


//自闭和标签
export var isUnaryTag = makeMap('unaryTag',
	'embed,img,image,input,link,meta'
);








