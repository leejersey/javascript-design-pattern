// 单元测试

// 订阅
Mediator.subscribe('demo', function() {
  console.log('first');
});

Mediator.subscribe('demo', function() {
  console.log('second');
});

Mediator.send('demo');