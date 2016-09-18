function Tree(node){
  this.selfNode=node//Tree返回dom节点
  this.selfNode.Tree=this //dom节点返回Tree
  this.childs=[]
  this.parent=null
  this.iOpen=node.children[0].children[0]
  this.label=node.children[0].children[1]
}

Tree.prototype={
  //添加动画
  anime:function(node,anime){
    node.classList.add(anime)
    node.addEventListener('animationend',function(){
      this.classList.remove(anime)
    })
  },
  //添加节点
  addChild:function(){
    var self = this
    if(this.iOpen.classList.contains("img-close")){this.toggleChilds()}//如果父元素close，则打开它
    for(var i=0;i<arguments.length;i++) {="" var="" newdiv="document.createElement("DIV");" newdiv.innerhtml="<p><i class="img-open"></i><label>" +arguments[i]+'<="" label=""><i class="img-add"></i><i class="img-delete"></i><p></p>'
      newDiv.classList.add("son")
      this.selfNode.appendChild(newDiv)
      self.anime(newDiv,'animeAdd')
      var newTree=new Tree(newDiv)//新div成为一个新Tree实例,获得parent，父级增加child
      newTree.parent=this
      this.childs.push(newTree)
      newTree.iOpenRender(false)//新TreeiOpen none，父级iOpen block
      this.iOpenRender(true)
    }
    return this//返回自身，以便链式操作
  },
  //删除自身
  delSelf:function(istrue){
    if(istrue){
      if(this.parent.childs.length===1){//如果是最后一个元素，父级iOpen none
        this.parent.iOpenRender(false)
      }
      for(var i=0;i<this.parent.childs.length;i++){ if(this.parent.childs[i]="==this){" this.parent.childs.splice(i,1)="" 父级移除这个childs="" this.parent.selfnode.removechild(this.selfnode)="" 父级dom移除这个dom="" break="" }="" },="" 展开隐藏子节点="" togglechilds:function(){="" var="" self="this" img="this.iOpen" img.classlist.toggle("img-close")="" this.childs.foreach(function(item){="" if(img.classlist.contains("img-close")){="" item.selfnode.classlist.add('none')="" }else{="" item.selfnode.classlist.remove('none')="" self.anime(item.selfnode,'animeadd')="" })="" i标签切换="" iopenrender:function(isopen){="" if(isopen){="" this.iopen.classlist.remove('none')="" this.iopen.classlist.add('none')="" 渲染被搜索的值="" labelrender:function(isrender,patt){="" if(isrender){="" span加包裹层="" this.label.innerhtml="this.label.innerHTML.replace(patt,'<span" style="text-decoration: underline;color:red">'+patt.source+'')
    }else{//所有span去包裹层
      for(var i=this.label.children.length-1;i>=0;i--){
        this.label.children[i].outerHTML=this.label.children[i].innerHTML
      }
    }
  }
}

// 绑定搜索事件
var searchTreeArr=[]
document.getElementById('searchBtn').onclick=function(){
  var labels=document.getElementsByTagName("LABEL")
  var inputValue = document.getElementById('searchText').value
  var patt=new RegExp(inputValue,'g')
  var searchTree
  searchTreeArr.filter(function(item){//还原，返回false,数组变为[]
    item.labelRender(false)
    return false
  })
  if(inputValue.trim()===""){return}//输入空直接返回
  for(var i=0;i</this.parent.childs.length;i++){></arguments.length;i++)>