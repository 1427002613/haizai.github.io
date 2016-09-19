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
    for(var i=0;i<arguments.length;i++){   
      var newDiv = document.createElement("DIV");
      newDiv.innerHTML="<p><i class='img-open'></i><label>" + arguments[i] + "</label><i class='img-add'></i><i class='img-delete'></i></p>"
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
      //如果是最后一个元素，父级iOpen none
      if(this.parent.childs.length===1){
        this.parent.iOpenRender(false)
      }
      for(var i=0;i<this.parent.childs.length;i++){
        if(this.parent.childs[i]===this){
          this.parent.childs.splice(i,1)//父级移除这个childs
          this.parent.selfNode.removeChild(this.selfNode)//父级dom移除这个dom
          break   
        }
      }
    }
  },
  //展开隐藏子节点
  toggleChilds:function(){
    var self = this
    var img =this.iOpen
    img.classList.toggle("img-close")
    this.childs.forEach(function(item){
      if(img.classList.contains("img-close")){
        item.selfNode.classList.add('none')
      }else{
        item.selfNode.classList.remove('none')
        self.anime(item.selfNode,'animeAdd')
      }
    })
  },
  //i标签切换
  iOpenRender:function(isopen){
    if(isopen){
      this.iOpen.classList.remove('none')
    }else{
      this.iOpen.classList.add('none')
    }
  },
  //渲染被搜索的值
  labelRender:function(isRender,patt){
    //span加包裹层、去包裹层
    if(isRender){
      this.label.innerHTML=this.label.innerHTML.replace(patt,'<span style="text-decoration: underline;color:red">'+patt.source+'</span>')
    }else{
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
  //还原，返回false,数组变为[]
  searchTreeArr.filter(function(item){
    item.labelRender(false)
    return false
  })
  if(inputValue.trim()===""){return}
  for(var i=0;i<labels.length;i++){
    if(patt.test(labels[i].firstChild.data)){
      searchTree = labels[i].parentNode.parentNode.Tree
      searchTreeArr.push(searchTree)//以便还原
      searchTree.labelRender(true,patt)
      openToRoot(searchTree)
      //打开父级直到root
      function openToRoot(searchTree){
        if(searchTree.parent){
          if(searchTree.parent.iOpen.classList.contains("img-close")){searchTree.parent.toggleChilds()}
          openToRoot(searchTree.parent)
        }
      }
    }
  }
  if(!searchTree){alert("未找到所求值")}
}

// 绑定点击事件
var rootNode=new Tree(document.getElementById("root"))
rootNode.selfNode.onclick=function(event){
  if(event.target.parentNode.tagName==="P"){
    var clickedTree = event.target.parentNode.parentNode.Tree //dom节点返回Tree
    if(event.target.classList.contains("img-add")){
      var pro =prompt("请输入新子节点名")
      if(pro&&pro.trim()){clickedTree.addChild(pro)}
    }
    if(event.target.classList.contains("img-delete")){
      clickedTree.delSelf(confirm("确认删去这个节点？"))
    }
    if(event.target.classList.contains('img-open')||event.target.tagName==="LABEL"){
      clickedTree.toggleChilds()
    }
  }
}

//初始化
rootNode.addChild("web","after","phone");
rootNode.childs[0].addChild("html","css","js").toggleChilds()
rootNode.childs[0].childs[1].addChild("sass").toggleChilds()
rootNode.childs[0].childs[2].addChild("node","ajax","jquery").toggleChilds()
rootNode.childs[1].addChild("C","php","java").toggleChilds()
rootNode.childs[1].childs[0].addChild("C++","C#").toggleChilds()
rootNode.childs[2].addChild("iOS","Android").toggleChilds()