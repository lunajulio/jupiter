# Classes in Java



In Java, classes and objects are basic concepts of Object Oriented Programming (OOPs) that are used to represent real-world concepts and entities. The class represents a group of objects having similar properties and behavior. For example, the animal type ****Dog**** is a class while a particular dog named ****Tommy**** is an object of the ****Dog**** class.

In this article, we will discuss Java objects and classes and how to implement them in our program.

## Java Classes

A class in Java is a set of objects which shares common characteristics/ behavior and common properties/ attributes. It is a user-defined blueprint or prototype from which objects are created. For example, Student is a class while a particular student named Ravi is an object.



### Properties of Java Classes

1. Class is not a real-world entity. It is just a template or blueprint or prototype from which objects are created.
2. Class does not occupy memory.
3. Class is a group of variables of different data types and a group of methods.
4. A Class in Java can contain:
   - Data member
   
   - Method
   
   - Constructor
   
   - Nested Class
   
   - Interface

### Class Declaration in Java

```java
access_modifier class <class_name>
{  
    data member;  
    method;  
    constructor;
    nested class;
    interface;
}
```

### Example of Java Class Java

```java
// Java Program for class example
 
class Student {
    // data member (also instance variable)
    int id;
    // data member (also instance variable)
    String name;
 
    public static void main(String args[])
    {
        // creating an object of
        // Student
        Student s1 = new Student();
        System.out.println(s1.id);
        System.out.println(s1.name);
    }
}
```

****Output****

```java
0
null
```

### Components of Java Classes

 In general, class declarations can include these components, in order:

1. ****Modifiers****: A class can be public or has default access (Refer [this](https://www.geeksforgeeks.org/access-specifiers-for-classes-or-interfaces-in-java/) for details).
2. ****Class keyword:**** class keyword is used to create a class.
3. ****Class name:**** The name should begin with an initial letter (capitalized by convention).
4. ****Superclass(if any):**** The name of the class’s parent (superclass), if any, preceded by the keyword extends. A class can only extend (subclass) one parent.
5. ****Interfaces(if any):**** A comma-separated list of interfaces implemented by the class, if any, preceded by the keyword implements. A class can implement more than one interface.
6. ****Body:**** The class body is surrounded by braces, { }.
   
   

Constructors are used for initializing new objects. Fields are variables that provide the state of the class and its objects, and methods are used to implement the behavior of the class and its objects.  
There are various types of classes that are used in real-time applications such as [nested classes](https://www.geeksforgeeks.org/inner-class-java/), [anonymous classes](https://www.geeksforgeeks.org/anonymous-inner-class-java/), and [lambda expressions](https://www.geeksforgeeks.org/lambda-expressions-java-8/).

