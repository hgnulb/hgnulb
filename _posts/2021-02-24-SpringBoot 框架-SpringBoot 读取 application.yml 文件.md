---
layout: post
title: "SpringBoot 框架-SpringBoot 读取 application.yml 文件"
permalink: /blog/®
categories: [常用框架]
tags: [SpringBoot 框架]
date: 2021-02-24 19:31:46
---

* Kramdown table of contents
{:toc .toc}
## SpringBoot 读取 application.yml 文件

### 1、采用@ConfigurationProperties(prefix = "person”)和@EnableConfigurationProperties(Person.class)注解读取

```java
@ConfigurationProperties(prefix = "person")
@Data
public class Person {
    private String userName;
    private Boolean boss;
    private Date birth;
    private Integer age;
    private Pet pet;
    private String[] interests;
    private List<String> animal;
    private Map<String, Object> score;
    private Set<Double> salary;
    private Map<String, List<Pet>> allPets;
}
```

```java
@Data
public class Pet {
    private String name;
    private Double weight;
}
```

```java
@EnableConfigurationProperties(Person.class)
@Configuration
public class AppConfig {
    @Bean
    public Person person(){
        return new Person();
    }

    @PostConstruct
    public void displayPerson() {
        System.out.println(person());
    }
}
```

### 2、采用@ConfigurationProperties(prefix = "person”)和@Component注解读取

```java
@Component
@ConfigurationProperties(prefix = "person")
@Data
public class Person {
    private String userName;
    private Boolean boss;
    private Date birth;
    private Integer age;
    private Pet pet;
    private String[] interests;
    private List<String> animal;
    private Map<String, Object> score;
    private Set<Double> salary;
    private Map<String, List<Pet>> allPets;
}
```

```java
@Data
public class Pet {
    private String name;
    private Double weight;
}
```

```java
@Configuration
public class AppConfig {
    @Bean
    public Person person(){
        return new Person();
    }

    @PostConstruct
    public void displayPerson() {
        System.out.println(person());
    }
}
```

### 3、application.yml 文件

```yaml
person:
  userName: zhangsan
  boss: false
  birth: 2019/12/12 20:12:33
  age: 18
  pet:
    name: tomcat
    weight: 23.4
  interests: [ 篮球,游泳 ]
  animal:
    - jerry
    - mario
  score:
    english:
      first: 30
      second: 40
      third: 50
    math: [ 131,140,148 ]
    chinese: { first: 128,second: 136 }
  salary: [ 3999,4999.98,5999.99 ]
  allPets:
    sick:
      - { name: tom }
      - { name: jerry,weight: 47 }
    health: [ { name: mario,weight: 47 }, { name: coby,weight: 25 } ]
```

### 4、返回结果

```json
{
	"userName": "zhangsan",
	"boss": false,
	"birth": "2019-12-12T12:12:33.000+0000",
	"age": 18,
	"pet": {
		"name": "tomcat",
		"weight": 23.4
	},
	"interests": [
		"篮球",
		"游泳"
	],
	"animal": [
		"jerry",
		"mario"
	],
	"score": {
		"english": {
			"first": 30,
			"second": 40,
			"third": 50
		},
		"math": {
			"0": 131,
			"1": 140,
			"2": 148
		},
		"chinese": {
			"first": 128,
			"second": 136
		}
	},
	"salary": [
		3999,
		4999.98,
		5999.99
	],
	"allPets": {
		"sick": [{
				"name": "tom",
				"weight": null
			},
			{
				"name": "jerry",
				"weight": 47
			}
		],
		"health": [{
				"name": "mario",
				"weight": 47
			},
			{
				"name": "coby",
				"weight": 25
			}
		]
	}
}
```