---
layout: post
title: "集合框架-Java 中 Comparable 和 Comparator 的区别"
permalink: /blog/09012713
categories: [集合框架]
tags: [集合框架]
date: 2020-11-13 12:10:22
---

* Kramdown table of contents
{:toc .toc}
## Java 中 Comparable 和 Comparator 的区别

Comparable 是排序接口；若一个类实现了 Comparable 接口，就意味着"该类支持排序"。

Comparator 是比较器；我们若需要控制某个类的次序，可以建立一个"该类的比较器"来进行排序。

Comparable 相当于内部比较器。Comparator 相当于外部比较器。

## Comparable 接口

Comparable 是自然排序接口，内部比较器。若一个类实现了 Comparable 接口，那意味着该类支持排序。假设现在存在"实现 Comparable 接口的类的对象的 List 列表 (或数组)"，则该 List 列表 (或数组) 可以通过 Collections.sort (或 Arrays.sort) 进行排序。

```java
package java.lang;
import java.util.*;

public interface Comparable<T> {
    public int compareTo(T o);
}
```

```java
class User implements Comparable<User> {
    private String name;
    private Integer age;

    public User() {
    }

    public User(String name, Integer age) {
        this.name = name;
        this.age = age;
    }

    @Override
    public int compareTo(User o) {
        return this.age - o.age;
    }

    @Override
    public String toString() {
        return "User{" +
                "name='" + name + '\'' +
                ", age=" + age +
                '}';
    }
}

class Test {
    public static void main(String[] args) {
        List<User> list = new ArrayList<>();
        User user1 = new User("a", 18);
        User user2 = new User("b", 19);
        User user3 = new User("c", 17);
        User user4 = new User("d", 20);
        User user5 = new User("e", 21);

        list.add(user1);
        list.add(user2);
        list.add(user3);
        list.add(user4);
        list.add(user5);

        System.out.println("排序前：");
        print(list);
        Collections.sort(list);
        System.out.println("排序后：");
        print(list);

        User[] users = {user1, user2, user3, user4, user5};

        System.out.println("排序前：");
        print(users);
        Arrays.sort(users);
        System.out.println("排序后：");
        print(users);
    }

    public static void print(List<User> list) {
        for (User user : list) {
            System.out.println(user);
        }
    }

    public static void print(User[] users) {
        for (User user : users) {
            System.out.println(user);
        }
    }
}
```

> 排序前：
> User{name='a', age=18}
> User{name='b', age=19}
> User{name='c', age=17}
> User{name='d', age=20}
> User{name='e', age=21}
> 排序后：
> User{name='c', age=17}
> User{name='a', age=18}
> User{name='b', age=19}
> User{name='d', age=20}
> User{name='e', age=21}
> 排序前：
> User{name='a', age=18}
> User{name='b', age=19}
> User{name='c', age=17}
> User{name='d', age=20}
> User{name='e', age=21}
> 排序后：
> User{name='c', age=17}
> User{name='a', age=18}
> User{name='b', age=19}
> User{name='d', age=20}
> User{name='e', age=21}

## Comparator 接口

Comparator 是比较器接口，外部比较器。当一个对象不支持自比较或者自比较函数不能满足要求时，可写一个比较器来完成两个对象之间大小的比较。

```java
package java.util;

@FunctionalInterface
public interface Comparator<T> {
    int compare(T o1, T o2);
    boolean equals(Object obj);
}
```

如果 User 类没有实现 Comparable 接口，直接使用 Collections.sort(list) 排序则产生编译错误，提示排序的对象要实现 Comparable 接口；直接使用 Arrays.sort(users) 排序则产生 ClassCastException 运行时异常，提示 User cannot be cast to java.lang.Comparable。在这种情况下，我们可以自定义外部比较器来进行排序。

```java
class User {
    private String name;
    private Integer age;

    public User() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public User(String name, Integer age) {
        this.name = name;
        this.age = age;
    }

    @Override
    public String toString() {
        return "User{" +
                "name='" + name + '\'' +
                ", age=" + age +
                '}';
    }
}

class Test {
    public static void main(String[] args) {
        List<User> list = new ArrayList<>();
        User user1 = new User("a", 18);
        User user2 = new User("b", 19);
        User user3 = new User("c", 17);
        User user4 = new User("d", 20);
        User user5 = new User("e", 21);

        list.add(user1);
        list.add(user2);
        list.add(user3);
        list.add(user4);
        list.add(user5);

        System.out.println("排序前：");
        print(list);
        Collections.sort(list, (o1, o2) -> o1.getAge() - o2.getAge());
        System.out.println("排序后：");
        print(list);

        User[] users = {user1, user2, user3, user4, user5};

        System.out.println("排序前：");
        print(users);
        Arrays.sort(users, (o1, o2) -> o1.getAge() - o2.getAge());
        System.out.println("排序后：");
        print(users);
    }


    public static void print(List<User> list) {
        for (User user : list) {
            System.out.println(user);
        }
    }

    public static void print(User[] users) {
        for (User user : users) {
            System.out.println(user);
        }
    }
}
```

> 排序前：
> User{name='a', age=18}
> User{name='b', age=19}
> User{name='c', age=17}
> User{name='d', age=20}
> User{name='e', age=21}
> 排序后：
> User{name='c', age=17}
> User{name='a', age=18}
> User{name='b', age=19}
> User{name='d', age=20}
> User{name='e', age=21}
> 排序前：
> User{name='a', age=18}
> User{name='b', age=19}
> User{name='c', age=17}
> User{name='d', age=20}
> User{name='e', age=21}
> 排序后：
> User{name='c', age=17}
> User{name='a', age=18}
> User{name='b', age=19}
> User{name='d', age=20}
> User{name='e', age=21}

## Java 中常见的有序集合

```
Collections：public static <T> void sort(List<T> list, Comparator<? super T> c)

ArrayList：支持使用 Collections.sort() 排序

LinkedList：支持使用 Collections.sort() 排序

TreeSet：TreeSet 是一个有序集合，TreeSet 中的元素支持 2 种排序方式：自然排序或者根据提供的 Comparator 进行排序。

TreeMap：TreeMap 中的 key 支持 2 种排序方式：自然排序或者根据提供的 Comparator 进行排序。

PriorityQueue：默认升序最小堆。PriorityQueue 中的元素支持 2 种排序方式：自然排序或者根据提供的 Comparator 进行排序。
```

HashSet 中的元素是无序的，无序的不代表随机乱序。

```java
class User implements Comparable<User> {
    private String name;
    private Integer age;

    public User() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public User(String name, Integer age) {
        this.name = name;
        this.age = age;
    }

    @Override
    public String toString() {
        return "User{" +
                "name='" + name + '\'' +
                ", age=" + age +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return Objects.equals(name, user.name) &&
                Objects.equals(age, user.age);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, age);
    }

    @Override
    public int compareTo(User o) {
        return this.age - o.age;
    }
}

class Test {
    public static void main(String[] args) {
        Set<User> set = new HashSet<>();
        User user1 = new User("a", 18);
        User user2 = new User("b", 19);
        User user3 = new User("c", 17);
        User user4 = new User("d", 20);
        User user5 = new User("e", 21);
        set.add(user1);
        set.add(user2);
        set.add(user3);
        set.add(user4);
        set.add(user5);
        for (User user : set) {
            System.out.println(user);
        }
    }
}
```

> User{name='d', age=20}
> User{name='e', age=21}
> User{name='a', age=18}
> User{name='b', age=19}
> User{name='c', age=17}

LinkedHashSet 按照元素插入的顺序进行排序

```java
class User implements Comparable<User> {
    private String name;
    private Integer age;

    public User() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public User(String name, Integer age) {
        this.name = name;
        this.age = age;
    }

    @Override
    public String toString() {
        return "User{" +
                "name='" + name + '\'' +
                ", age=" + age +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return Objects.equals(name, user.name) &&
                Objects.equals(age, user.age);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, age);
    }

    @Override
    public int compareTo(User o) {
        return this.age - o.age;
    }
}

class Test {
    public static void main(String[] args) {
        Set<User> set = new LinkedHashSet<>();
        User user1 = new User("a", 18);
        User user2 = new User("b", 19);
        User user3 = new User("c", 17);
        User user4 = new User("d", 20);
        User user5 = new User("e", 21);
        set.add(user1);
        set.add(user2);
        set.add(user3);
        set.add(user4);
        set.add(user5);
        for (User user : set) {
            System.out.println(user);
        }
    }
}
```

> User{name='a', age=18}
> User{name='b', age=19}
> User{name='c', age=17}
> User{name='d', age=20}
> User{name='e', age=21}

TreeSet 根据内部比较器 Comparable 进行排序

```java
class User implements Comparable<User> {
    private String name;
    private Integer age;

    public User() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public User(String name, Integer age) {
        this.name = name;
        this.age = age;
    }

    @Override
    public String toString() {
        return "User{" +
                "name='" + name + '\'' +
                ", age=" + age +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return Objects.equals(name, user.name) &&
                Objects.equals(age, user.age);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, age);
    }

    @Override
    public int compareTo(User o) {
        return this.age - o.age;
    }
}

class Test {
    public static void main(String[] args) {
        Set<User> set = new TreeSet<>();
        User user1 = new User("a", 18);
        User user2 = new User("b", 19);
        User user3 = new User("c", 17);
        User user4 = new User("d", 20);
        User user5 = new User("e", 21);
        set.add(user1);
        set.add(user2);
        set.add(user3);
        set.add(user4);
        set.add(user5);
        for (User user : set) {
            System.out.println(user);
        }
    }
}
```

> User{name='c', age=17}
> User{name='a', age=18}
> User{name='b', age=19}
> User{name='d', age=20}
> User{name='e', age=21}

TreeSet 根据外部比较器 Comparator 进行排序

```java
class User {
    private String name;
    private Integer age;

    public User() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public User(String name, Integer age) {
        this.name = name;
        this.age = age;
    }

    @Override
    public String toString() {
        return "User{" +
                "name='" + name + '\'' +
                ", age=" + age +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return Objects.equals(name, user.name) &&
                Objects.equals(age, user.age);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, age);
    }
}

class Test {
    public static void main(String[] args) {
        Set<User> set = new TreeSet<>((o1, o2) -> o1.getAge() - o2.getAge());
        User user1 = new User("a", 18);
        User user2 = new User("b", 19);
        User user3 = new User("c", 17);
        User user4 = new User("d", 20);
        User user5 = new User("e", 21);
        set.add(user1);
        set.add(user2);
        set.add(user3);
        set.add(user4);
        set.add(user5);
        for (User user : set) {
            System.out.println(user);
        }
    }
}
```

> User{name='c', age=17}
> User{name='a', age=18}
> User{name='b', age=19}
> User{name='d', age=20}
> User{name='e', age=21}

> 注意：如何 TreeSet 中的元素没有实现 Comparable 接口和自定义外部比较器 Comparator，会产生运行时异常。java.lang.ClassCastException: User cannot be cast to java.lang.Comparable

---

HashMap、LinkedHashMap、TreeMap 的区别

> HashMap 是无序的，LinkedHashMap 顺序存取，TreeMap 支持内部排序和外部排序。

```java
class User implements Comparable<User> {
    private String name;
    private Integer age;

    public User() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public User(String name, Integer age) {
        this.name = name;
        this.age = age;
    }

    @Override
    public String toString() {
        return "User{" +
                "name='" + name + '\'' +
                ", age=" + age +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return Objects.equals(name, user.name) &&
                Objects.equals(age, user.age);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, age);
    }

    @Override
    public int compareTo(User o) {
        return this.age - o.age;
    }
}
```

HashMap 是无序的

```java
class Test {
    public static void main(String[] args) {
        Map<User, String> map = new HashMap<>();
        User user1 = new User("a", 18);
        User user2 = new User("b", 19);
        User user3 = new User("c", 17);
        User user4 = new User("d", 20);
        User user5 = new User("e", 21);
        map.put(user1, "泰山");
        map.put(user2, "衡山");
        map.put(user3, "华山");
        map.put(user4, "恒山");
        map.put(user5, "嵩山");
        for (Map.Entry<User, String> entry : map.entrySet()) {
            System.out.println("key: " + entry.getKey() + ", value: " + entry.getValue());
        }
    }
}
```

> key: User{name='d', age=20}, value: 恒山
> key: User{name='e', age=21}, value: 嵩山
> key: User{name='a', age=18}, value: 泰山
> key: User{name='b', age=19}, value: 衡山
> key: User{name='c', age=17}, value: 华山

LinkedHashMap 是按照插入顺序的

```java
class Test {
    public static void main(String[] args) {
        Map<User, String> map = new LinkedHashMap<>();
        User user1 = new User("a", 18);
        User user2 = new User("b", 19);
        User user3 = new User("c", 17);
        User user4 = new User("d", 20);
        User user5 = new User("e", 21);
        map.put(user1, "泰山");
        map.put(user2, "衡山");
        map.put(user3, "华山");
        map.put(user4, "恒山");
        map.put(user5, "嵩山");
        for (Map.Entry<User, String> entry : map.entrySet()) {
            System.out.println("key: " + entry.getKey() + ", value: " + entry.getValue());
        }
    }
}
```

> key: User{name='a', age=18}, value: 泰山
> key: User{name='b', age=19}, value: 衡山
> key: User{name='c', age=17}, value: 华山
> key: User{name='d', age=20}, value: 恒山
> key: User{name='e', age=21}, value: 嵩山

TreeMap 支持内部排序和外部排序

```java
class Test {
    public static void main(String[] args) {
        Map<User, String> map = new TreeMap<>();
        User user1 = new User("a", 18);
        User user2 = new User("b", 19);
        User user3 = new User("c", 17);
        User user4 = new User("d", 20);
        User user5 = new User("e", 21);
        map.put(user1, "泰山");
        map.put(user2, "衡山");
        map.put(user3, "华山");
        map.put(user4, "恒山");
        map.put(user5, "嵩山");
        for (Map.Entry<User, String> entry : map.entrySet()) {
            System.out.println("key: " + entry.getKey() + ", value: " + entry.getValue());
        }
    }
}
```

> key: User{name='c', age=17}, value: 华山
> key: User{name='a', age=18}, value: 泰山
> key: User{name='b', age=19}, value: 衡山
> key: User{name='d', age=20}, value: 恒山
> key: User{name='e', age=21}, value: 嵩山

修改 User 类，使它不再支持内部排序。

```java
class User {
    private String name;
    private Integer age;

    public User() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public User(String name, Integer age) {
        this.name = name;
        this.age = age;
    }

    @Override
    public String toString() {
        return "User{" +
                "name='" + name + '\'' +
                ", age=" + age +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return Objects.equals(name, user.name) &&
                Objects.equals(age, user.age);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, age);
    }
}
```

此时如果 TreeMap 没有自定义外部比较器，则会产生运行时异常。提示 java.lang.ClassCastException: User cannot be cast to java.lang.Comparable

```java
class Test {
    public static void main(String[] args) {
        Map<User, String> map = new TreeMap<>();
        User user1 = new User("a", 18);
        User user2 = new User("b", 19);
        User user3 = new User("c", 17);
        User user4 = new User("d", 20);
        User user5 = new User("e", 21);
        map.put(user1, "泰山");
        map.put(user2, "衡山");
        map.put(user3, "华山");
        map.put(user4, "恒山");
        map.put(user5, "嵩山");
        for (Map.Entry<User, String> entry : map.entrySet()) {
            System.out.println("key: " + entry.getKey() + ", value: " + entry.getValue());
        }
    }
}
```

```java
Exception in thread "main" java.lang.ClassCastException: User cannot be cast to java.lang.Comparable
    at java.util.TreeMap.compare(TreeMap.java:1294)
    at java.util.TreeMap.put(TreeMap.java:538)
    at Test.main(User.java:70)
```

给 TreeMap 添加外部比较器后可以进行正常的排序。

```java
class Test {
    public static void main(String[] args) {
        Map<User, String> map = new TreeMap<>((o1, o2) -> o1.getAge() - o2.getAge());
        User user1 = new User("a", 18);
        User user2 = new User("b", 19);
        User user3 = new User("c", 17);
        User user4 = new User("d", 20);
        User user5 = new User("e", 21);
        map.put(user1, "泰山");
        map.put(user2, "衡山");
        map.put(user3, "华山");
        map.put(user4, "恒山");
        map.put(user5, "嵩山");
        for (Map.Entry<User, String> entry : map.entrySet()) {
            System.out.println("key: " + entry.getKey() + ", value: " + entry.getValue());
        }
    }
}
```

> key: User{name='c', age=17}, value: 华山
> key: User{name='a', age=18}, value: 泰山
> key: User{name='b', age=19}, value: 衡山
> key: User{name='d', age=20}, value: 恒山
> key: User{name='e', age=21}, value: 嵩山

---

PriorityQueue 优先级队列

> 注意：如果 PriorityQueue 中的元素没有实现 Comparable 接口和自定义外部比较器 Comparator，会产生运行时异常。

```java
class User {
    private String name;
    private Integer age;

    public User() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public User(String name, Integer age) {
        this.name = name;
        this.age = age;
    }

    @Override
    public String toString() {
        return "User{" +
                "name='" + name + '\'' +
                ", age=" + age +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return Objects.equals(name, user.name) &&
                Objects.equals(age, user.age);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, age);
    }
}
```

```java
class Test {
    public static void main(String[] args) {
        PriorityQueue<User> queue = new PriorityQueue<>();
        User user1 = new User("a", 18);
        User user2 = new User("b", 19);
        User user3 = new User("c", 17);
        User user4 = new User("d", 20);
        User user5 = new User("e", 21);
        queue.add(user1);
        queue.add(user2);
        queue.add(user3);
        queue.add(user4);
        queue.add(user5);
        while (!queue.isEmpty()) {
            System.out.println(queue.poll());
        }
    }
}
```

```java
Exception in thread "main" java.lang.ClassCastException: User cannot be cast to java.lang.Comparable
    at java.util.PriorityQueue.siftUpComparable(PriorityQueue.java:653)
    at java.util.PriorityQueue.siftUp(PriorityQueue.java:648)
    at java.util.PriorityQueue.offer(PriorityQueue.java:345)
    at java.util.PriorityQueue.add(PriorityQueue.java:322)
    at Test.main(User.java:70)
```

PriorityQueue 优先级队列-最小堆(升序)

```java
class Test {
    public static void main(String[] args) {
        PriorityQueue<User> queue = new PriorityQueue<>((o1, o2) -> o1.getAge() - o2.getAge());
        User user1 = new User("a", 18);
        User user2 = new User("b", 19);
        User user3 = new User("c", 17);
        User user4 = new User("d", 20);
        User user5 = new User("e", 21);
        queue.add(user1);
        queue.add(user2);
        queue.add(user3);
        queue.add(user4);
        queue.add(user5);
        while (!queue.isEmpty()) {
            System.out.println(queue.poll());
        }
    }
}
```

> User{name='c', age=17}
> User{name='a', age=18}
> User{name='b', age=19}
> User{name='d', age=20}
> User{name='e', age=21}

User 实现内部排序接口 Comparable，升序排序。

```java
class User implements Comparable<User> {
    private String name;
    private Integer age;

    public User() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public User(String name, Integer age) {
        this.name = name;
        this.age = age;
    }

    @Override
    public String toString() {
        return "User{" +
                "name='" + name + '\'' +
                ", age=" + age +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return Objects.equals(name, user.name) &&
                Objects.equals(age, user.age);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, age);
    }

    @Override
    public int compareTo(User o) {
        return this.age - o.age;
    }
}

class Test {
    public static void main(String[] args) {
        PriorityQueue<User> queue = new PriorityQueue<>();
        User user1 = new User("a", 18);
        User user2 = new User("b", 19);
        User user3 = new User("c", 17);
        User user4 = new User("d", 20);
        User user5 = new User("e", 21);
        queue.add(user1);
        queue.add(user2);
        queue.add(user3);
        queue.add(user4);
        queue.add(user5);
        while (!queue.isEmpty()) {
            System.out.println(queue.poll());
        }
    }
}
```

> User{name='c', age=17}
> User{name='a', age=18}
> User{name='b', age=19}
> User{name='d', age=20}
> User{name='e', age=21}

PriorityQueue 优先级队列-最大堆(降序)

```java
class Test {
    public static void main(String[] args) {
        PriorityQueue<User> queue = new PriorityQueue<>((o1, o2) -> o2.getAge() - o1.getAge());
        User user1 = new User("a", 18);
        User user2 = new User("b", 19);
        User user3 = new User("c", 17);
        User user4 = new User("d", 20);
        User user5 = new User("e", 21);
        queue.add(user1);
        queue.add(user2);
        queue.add(user3);
        queue.add(user4);
        queue.add(user5);
        while (!queue.isEmpty()) {
            System.out.println(queue.poll());
        }
    }
}
```

> User{name='e', age=21}
> User{name='d', age=20}
> User{name='b', age=19}
> User{name='a', age=18}
> User{name='c', age=17}

User 实现内部排序接口 Comparable，降序排序。

```java
class User implements Comparable<User> {
    private String name;
    private Integer age;

    public User() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public User(String name, Integer age) {
        this.name = name;
        this.age = age;
    }

    @Override
    public String toString() {
        return "User{" +
                "name='" + name + '\'' +
                ", age=" + age +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return Objects.equals(name, user.name) &&
                Objects.equals(age, user.age);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, age);
    }

    @Override
    public int compareTo(User o) {
        return o.age - this.age;
    }
}

class Test {
    public static void main(String[] args) {
        PriorityQueue<User> queue = new PriorityQueue<>();
        User user1 = new User("a", 18);
        User user2 = new User("b", 19);
        User user3 = new User("c", 17);
        User user4 = new User("d", 20);
        User user5 = new User("e", 21);
        queue.add(user1);
        queue.add(user2);
        queue.add(user3);
        queue.add(user4);
        queue.add(user5);
        while (!queue.isEmpty()) {
            System.out.println(queue.poll());
        }
    }
}
```

> User{name='e', age=21}
> User{name='d', age=20}
> User{name='b', age=19}
> User{name='a', age=18}
> User{name='c', age=17}

## 推荐阅读

- [Comparable与Comparator浅析](https://blog.csdn.net/u013256816/article/details/50899416)
- [https://www.cnblogs.com/wmyskxz/p/9301021.htm](https://www.cnblogs.com/wmyskxz/p/9301021.htm)