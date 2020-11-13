---
layout: post
title: "Java 并发-volatile 关键字"
permalink: /blog/84545899
categories: [Java 并发]
tags: [Java 并发]
date: 2020-10-29 21:38:40
---

* Kramdown table of contents
{:toc .toc}
## volatile 关键字概述

当一个变量被定义成 volatile 之后，它将具备两项特性：

第一项是保证此变量对所有线程的可见性，这里的"可见性"是指当一条线程修改了这个变量的值，新值对于其他线程来说是可以立即得知的。而普通变量并不能做到这一点，普通变量的值在线程间传递时均需要通过主内存来完成。比如，线程 A 修改一个普通变量的值，然后向主内存进行回写，另外一条线程 B 在线程 A 回写完成了之后再对主内存进行读取操作，新变量值才会对线程 B 可见。

使用 volatile 变量的第二个语义是禁止指令重排序优化，普通的变量仅会保证在该方法的执行过程中所有依赖赋值结果的地方都能获取到正确的结果，而不能保证变量赋值操作的顺序与程序代码中的执行顺序一致。

## volatile 关键字常见面试题

- [ ] volatile 关键字的作用特性。
- [ ] 说一说 volatile 关键字的作用？它为什么能保证可见性？
- [ ] volatile 作用以及底层原理。
- [ ] volatile 关键字的作用原理。
- [ ] volatile 原理，volatile 的特性。
- [ ] volatile 原理？如何保证可见性？
- [ ] volatile 的作用是什么？
- [ ] volatile 关键字的原理？它能保证原子性吗？AtomicInteger 底层怎么实现的？
- [ ] volatile 原理？如何保证可见性？
- [ ] volatile 的底层如何实现，怎么就能保住可见性了？
- [ ] 有了解过 volatile 么？谈谈你对 volatile 的理解?
- [ ] volatile 如何保证可见性的？以及如何实现可见性的机制。
- [ ] 说一下 volatile 关键字吧？刚才你提到可见性？他是如何保证可见性的？
- [ ] 如何保障一个线程修改一个变量对其他线程是可见的？
- [ ] 如果大量的使用 volatile 存在什么问题？
- [ ] 指令重排序是怎么回事。
- [ ] 缓存一致性协议是如何保障可见性？
- [ ] volatile 了解吗？它的原理是什么？volatile 是线程安全的吗？
- [ ] volatile 语义，虚拟机如何实现 volatile。
- [ ] volatile 的使用场景，synchronized 与 ReenTrantLock。
- [ ] 你说的主存指的是什么？和主存对应的是什么？主存和堆是什么关系？
- [ ] 内存屏障分几种？
- [ ] 除了在 volatile 当中使用了内存屏障，JAVA 还有哪里使用了内存屏障。
- [ ] 你刚才有说到 volatile，具体讲一下。
- [ ] a++ 能用 volatile 禁止指令重排序吗？
- [ ] 如何保障一个线程修改一个变量对其他线程是可见的？
- [ ] 单例的几种写法。volatile 关键字有什么作用。
- [ ] 对 java.util.concurrent.atomic 包下面类的理解？

## 推荐阅读

- [全面理解Java内存模型(JMM)及volatile关键字](https://blog.csdn.net/javazejian/article/details/72772461)