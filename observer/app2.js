'use strict';
//类之间解耦

//学生类
var Student = function (result) {
	var _this = this;

	//学生回答结果
	this.result = result;
	//学生回答问题动作
	this.say = function() {
	    console.log(_this.result);
	};
}

//回答问题方法
Student.prototype.answer = function (question) {
	//注册参数问题
	Observer.subscribe(question,this.say);
};

Student.prototype.sleep = function (question) {
	Observer.unsubscribe(question,this.say);
};

//教师类
var Teacher = function () {

};

Teacher.prototype.ask = function (question) {
	console.log('问题是'+question);
	//发布提问消息
	Observer.publish(question);
}

// 模拟听课的学生
var student1 = new Student('学生1回答问题');
var student2 = new Student('学生2回答问题');
var student3 = new Student('学生3回答问题');

// 注册一下哪位学生回答什么问题
student1.answer('什么是设计模式');
student1.answer('简述观察者模式');
student2.answer('什么是设计模式');
student3.answer('什么是设计模式');
student3.answer('简述观察者模式');

// 后来第三位同学睡着了。。
student3.sleep('简述观察者模式');

var teacher = new Teacher();

// 提问
teacher.ask('什么是设计模式');
teacher.ask('简述观察者模式');

// 最后，两个问题，第一个问题三名同学回答，第二个问题只有第一名同学回答。。。