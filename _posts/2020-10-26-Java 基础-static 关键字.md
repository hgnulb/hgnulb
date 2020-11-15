---
layout: post
title: "Java 基础-static 关键字"
permalink: /blog/75349532
categories: [Java 基础]
tags: [Java 基础]
date: 2020-10-26 15:35:01
---

* Kramdown table of contents
{:toc .toc}
## 问题思考

- 静态代码块、动态代码块、构造方法同时存在时的执行顺序。
- 说说静态变量和非静态变量的区别，用类名调用静态变量和用实例对象调用静态变量有区别吗？非静态方法里可以有静态变量吗？
- static 关键字的作用。为什么要使用静态方法？

## static 关键字的使用场景

使用范围：

> 在 Java 类中，可用 static 修饰属性、方法、代码块、内部类、静态导包。

被修饰后的成员具备以下特点：

> 随着类的加载而加载。
>
> 优先于对象存在。
>
> 修饰的成员，被所有对象所共享。
>
> 访问权限允许时，可不创建对象，直接被类调用。

### 静态变量 variables

> static 变量（类变量、类属性）由该类的所有实例共享。
>
> static 不能修饰局部变量，只能修饰成员变量。
>
> static 变量和 static 代码块按照它们在代码中的顺序执行。

```java
public class Test {
    // static variable
    static int a = m1();

    // static block
    static {
        System.out.println("Inside static block");
    }

    // static method
    static int m1() {
        System.out.println("from m1");
        return 20;
    }

    // static method
    public static void main(String[] args) {
        System.out.println("Value of a: " + a);
        System.out.println("from main");
    }
}
```

> from m1
> Inside static block
> Value of a: 20
> from main

### 静态方法 methods

> static 方法就是没有 this 的方法。在 static 方法的内部不能调用非静态方法，反过来倒是可以的。
> static 修饰的方法为静态方法或者类方法，静态方法只能调用静态变量或者静态方法，不能调用实例变量或者实例方法。静态方法中不能出现 this() 或者 super()。
> 没有对象的实例时，可以用类名.方法名 () 的形式访问由 static 修饰的类方法。
> 在 static 方法内部只能访问类的 static 修饰的属性或方法，不能访问类的非 static 的结构。

```java
public class Test {
    // static variable 
    static int a = 10;

    // instance variable 
    int b = 20;

    // static method 
    static void m1() {
        a = 20;
        System.out.println("from m1");

        // Cannot make a static reference to the non-static field b 
        b = 10; // compilation error 

        // Cannot make a static reference to the non-static method m2() from the type Test 
        m2();  // compilation error 

        //  Cannot use super in a static context 
        System.out.println(super.a); // compiler error  
    }

    // instance method 
    void m2() {
        System.out.println("from m2");
    }

    public static void main(String[] args) {
        // main method  
    }
} 
```

### 静态代码块 blocks

```java
class Test {
    static int i;
    int j;

    // start of static block
    static {
        i = 10;
        System.out.println("static block called ");
    }
    // end of static block  
}

public class Main {
    public static void main(String args[]) {
        System.out.println(Test.i);
    }
}
```

> static block called 
> 10

```java
class Test {
    static int i;
    int j;

    static {
        i = 10;
        System.out.println("static block called ");
    }

    Test() {
        System.out.println("Constructor called");
    }
}

public class Main {
    public static void main(String args[]) {
        Test t1 = new Test();
        Test t2 = new Test();
    }
} 
```

> static block called 
> Constructor called
> Constructor called

```java
class Father {
    private int i = test();
    private static int j = method();

    static {
        System.out.print("(1)");
    }

    Father() {
        System.out.print("(2)");
    }

    {
        System.out.print("(3)");
    }

    public int test() {
        System.out.print("(4)");
        return 1;
    }

    public static int method() {
        System.out.print("(5)");
        return 1;
    }
}

public class Son extends Father {
    private int i = test();
    private static int j = method();

    static {
        System.out.print("(6)");
    }

    Son() {
        System.out.print("(7)");
    }

    {
        System.out.print("(8)");
    }

    public int test() {
        System.out.print("(9)");
        return 1;
    }

    public static int method() {
        System.out.print("(10)");
        return 1;
    }

    public static void main(String[] args) {
        Son son1 = new Son();
        System.out.println();
        Son son2 = new Son();
    }
}
```

> (5)(1)(10)(6)(9)(3)(2)(9)(8)(7)
> (9)(3)(2)(9)(8)(7)

> 总结: 父类静态成员和静态代码块->子类静态成员和静态代码块->父类非静态成员和非静态代码块->父类构造方法->子类非静态成员和非静态代码块->子类构造方法。
>
> 1. 父类静态成员和静态初始化块 ，按在代码中出现的顺序依次执行。
> 2. 子类静态成员和静态初始化块 ，按在代码中出现的顺序依次执行。
> 3. 父类实例成员和实例初始化块 ，按在代码中出现的顺序依次执行。
> 4. 父类构造方法。
> 5. 子类实例成员和实例初始化块 ，按在代码中出现的顺序依次执行。
> 6. 子类构造方法。

### 静态内部类 nested classes

> 非静态内部类可以访问外部类的静态和非静态成员。静态内部类只能访问外部类的静态成员。

```java
class OuterClass {
    private static String msg = "GeeksForGeeks";

    public static class NestedStaticClass {
        public void printMessage() {
            System.out.println("Message from nested static class: " + msg);
        }
    }

    public class InnerClass {
        public void display() {
            System.out.println("Message from non-static nested class: " + msg);
        }
    }
}

public class Main {
    public static void main(String args[]) {
        OuterClass.NestedStaticClass printer = new OuterClass.NestedStaticClass();
        printer.printMessage();
        OuterClass outer = new OuterClass();
        OuterClass.InnerClass inner = outer.new InnerClass();
        inner.display();
        OuterClass.InnerClass innerObject = new OuterClass().new InnerClass();
        innerObject.display();
    }
}
```

> Message from nested static class: GeeksForGeeks
> Message from non-static nested class: GeeksForGeeks
> Message from non-static nested class: GeeksForGeeks

### 静态导包

> JDK 1.5 新特性

```java
import static java.lang.System.out;
import static java.lang.Integer.*;

public class TestStatic {
    public static void main(String[] args) {
        out.println(MAX_VALUE);
        out.println(toHexString(42));
    }
}
```

> 2147483647
> 2a

## 类属性、类方法的设计思想

> 如果想让一个类的所有实例共享数据，就用类变量！
>
> 类属性作为该类各个对象之间共享的变量。在设计类时,分析哪些属性不因对象的不同而改变，将这些属性设置为类属性。相应的方法设置为类方法。
>
> 如果方法与调用者无关，则这样的方法通常被声明为类方法，由于不需要创建对象就可以调用类方法，从而简化了方法的调用。

## 静态方法隐藏

> 在 Java 中，如果子类的静态方法与父类的静态方法同名，则父类的静态函数会隐藏子类的静态方法。

```java
class A {
    static void fun() {
        System.out.println("A.fun()");
    }
}

class B extends A {
    static void fun() {
        System.out.println("B.fun()");
    }
}

public class Test {
    public static void main(String args[]) {
        A a = new B();
        a.fun();

        B b = new B();
        b.fun();
    }
}
```

> A.fun()
> B.fun()

**我们可以覆盖 Java 中的静态方法吗？**

> 静态方法，是根据引用类型而不是根据所引用对象的类型来调用方法的，这意味着方法调用是在编译时决定的，静态绑定。
>
> 实例方法，是根据所引用对象的类型而不是引用类型来调用方法的，这意味着方法调用是在运行时确定的，动态绑定。
>
> 实例方法不能覆盖静态方法，静态方法不能隐藏实例方法。
>
> 在子类中，我们可以重载从父类继承的方法。这样的重载方法既不会隐藏也不会覆盖父类方法，它们是子类独有的新方法。

```java
class Base {
    public static void display() {
        System.out.println("Static or class method from Base");
    }

    public void print() {
        System.out.println("Non-static or Instance method from Base");
    }
}

class Derived extends Base {
    public static void display() {
        System.out.println("Static or class method from Derived");
    }

    public void print() {
        System.out.println("Non-static or Instance method from Derived");
    }
}

public class Test {
    public static void main(String args[]) {
        Base obj = new Derived();
        obj.display();
        obj.print();
    }
} 
```

> Static or class method from Base
> Non-static or Instance method from Derived

```java
class Base {
    public static void display() {
        System.out.println("Static or class method from Base");
    }

    public void print() {
        System.out.println("Non-static or Instance method from Base");
    }
}

class Derived extends Base {
    // Compiler Error: 'Derived' 中的实例方法 'display()' 无法重写 'Base' 中的 static 方法 'display()'
    public void display() {
        System.out.println("Non-static method from Derived");
    }

    // Compiler Error: 'Derived' 中的 static 方法 'print()' 无法重写 'Base' 中的实例方法 'print()'
    public static void print() {
        System.out.println("Static method from Derived");
    }
}
```

## 静态方法的重载

**我们可以重载静态方法吗？**

```java
public class Test {
    public static void foo() {
        System.out.println("Test.foo() called ");
    }

    public static void foo(int a) {
        System.out.println("Test.foo(int) called ");
    }

    public static void main(String args[]) {
        Test.foo();
        Test.foo(10);
    }
}
```

> Test.foo() called 
> Test.foo(int) called 

**我们可以重载仅静态关键字不同的方法吗？**

```java
public class Test {
    public static void foo() {
        System.out.println("Test.foo() called ");
    }

    public void foo() { // Compiler Error: 已在 'Test' 中定义 'foo()'
        System.out.println("Test.foo(int) called ");
    }

    public static void main(String args[]) {
        Test.foo();
    }
} 
```

## 静态最终变量 static final

```java
public class Test {
    final int i;
    static final int j = 15;
    static final int k;

    Test() {
        i = 10;
    }

    static {
        k = 20;
    }
}
```

> 在 Java 中，非静态 final 变量可以在构造方法或声明中赋值。但是，static final 变量不能在构造方法中赋值；必须在声明中为它们赋值。

## 静态变量和实例变量的区别

推荐阅读：[https://www.geeksforgeeks.org/difference-between-static-and-non-static-variables-in-java/](https://www.geeksforgeeks.org/difference-between-static-and-non-static-variables-in-java/)

Java 中有 3 种类型的变量：局部变量、实例变量、静态变量。

局部变量和实例变量一起称为非静态变量。因此 Java 中的变量可以分为 2 类：静态变量、非静态变量。

### 静态变量

> 静态变量本质上是全局变量。该类的所有实例共享相同的静态变量。
>
> 静态块和静态变量按它们在程序中的顺序执行。

```java
public class Test {
    // static variable 
    static int a = m1();

    // static block 
    static {
        System.out.println("Inside static block");
    }

    // static method 
    static int m1() {
        System.out.println("from m1");
        return 20;
    }

    // static method
    public static void main(String[] args) {
        System.out.println("Value of a: " + a);
        System.out.println("from main");
    }
}
```

> from m1
> Inside static block
> Value of a: 20
> from main

### 非静态变量

**局部变量**

> 在块，方法或构造函数中定义的变量称为局部变量。
>
> 局部变量的初始化是强制性的。

**实例变量**

> 实例变量是非静态变量，在方法，构造函数或块之外的类中声明。
>
> 实例变量不强制进行初始化。
>
> 只能通过创建对象来访问实例变量。

```java
public class Test {
    int rk = 10;

    public static void main(String[] args) {
        Test test = new Test();
        System.out.println("Non static variable accessed using instance of a class");
        System.out.println("Non Static variable " + test.rk);
    }
}
```

> Non static variable accessed using instance of a class
> Non Static variable 10

## 静态方法和实例方法的区别

> 静态方法不能被覆盖，可以被重载。
> 实例方法可以直接访问实例方法和实例变量。
> 实例方法可以直接访问静态方法和静态变量。
> 静态方法可以直接访问静态方法和静态变量。
> 静态方法无法直接访问实例方法和实例变量。他们必须使用对对象的引用。静态方法不能使用 this 关键字和 super 关键字。

## 静态绑定和动态绑定

推荐阅读：[https://www.geeksforgeeks.org/static-vs-dynamic-binding-in-java/](https://www.geeksforgeeks.org/static-vs-dynamic-binding-in-java/)

> 静态绑定：可以在编译时由编译器解析的绑定称为静态绑定。static、final、private 方法都是静态绑定。
>
> 动态绑定：在动态绑定中，编译器不会决定要调用的方法。覆盖是动态绑定的完美示例。在重写中，父类和子类都具有相同的方法。

静态绑定示例

```java
public class Test {
    public static class superclass {
        static void print() {
            System.out.println("print in superclass.");
        }
    }

    public static class subclass extends superclass {
        static void print() {
            System.out.println("print in subclass.");
        }
    }

    public static void main(String[] args) {
        superclass A = new superclass();
        superclass B = new subclass();
        A.print();
        B.print();
    }
}
```

> print in superclass.
> print in superclass.

动态绑定示例

```java
public class Test {
    public static class superclass {
        void print() {
            System.out.println("print in superclass.");
        }
    }

    public static class subclass extends superclass {
        @Override
        void print() {
            System.out.println("print in subclass.");
        }
    }

    public static void main(String[] args) {
        superclass A = new superclass();
        superclass B = new subclass();
        A.print();
        B.print();
    }
}
```

> print in superclass.
> print in subclass.

## 静态 main 方法

```java
public static void main(String[] args) {
}
```

## 推荐阅读

- [https://www.cnblogs.com/dolphin0520/p/3799052.html](https://www.cnblogs.com/dolphin0520/p/3799052.html)
- [https://www.cnblogs.com/ysocean/p/8194428.html](https://www.cnblogs.com/ysocean/p/8194428.html)
- [https://www.cnblogs.com/xing901022/p/5507086.html](https://www.cnblogs.com/xing901022/p/5507086.html)
- [https://docs.oracle.com/javase/tutorial/java/IandI/override.html](https://docs.oracle.com/javase/tutorial/java/IandI/override.html)
- [https://docs.oracle.com/javase/tutorial/java/javaOO/classvars.html](https://docs.oracle.com/javase/tutorial/java/javaOO/classvars.html)