// 外观模式
function $(id) {
  return document.getElementById(id);
}

//工程师A
(function() {

  // 新增一条消息
  function addMsgItem(e) {
    var text = e.args.text;
    var ul = $('msg');
    var li = document.createElement('li');
    var span = document.createElement('span');
    var a = document.createElement('a');

    li.appendChild(span);
    li.appendChild(a);
    span.innerHTML = text;
    a.innerHTML = '删除';

    // 关闭按钮
    a.onclick = function() {
      ul.removeChild(li);

      Observer.publish('removeCommentMessage', {
        num: -1
      });
    };

    ul.appendChild(li);
  }

  Observer.subscribe('addCommentMessage', addMsgItem);
})();

// 工程师B
(function() {
  
  // 修改用户消息数目
  function changeMsgNum(e) {
    var num = e.args.num;

    $('msg_num').innerHTML = parseInt($('msg_num').innerHTML || 0) + num;
  }

  // 注册添加评论信息
  Observer.subscribe('addCommentMessage', changeMsgNum);
  Observer.subscribe('removeCommentMessage', changeMsgNum);

})();


// 工程师C
(function() {
  
  // 用户点击提交按钮
  $('user_submit').onclick = function() {
    var text = $('user_input');
    
    if (!text.value) return;

    Observer.publish('addCommentMessage', {
      text: text.value,
      num: 1
    });

    text.value = '';
  };

})();