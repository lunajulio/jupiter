# Abstraction in Java



****Abstraction in Java**** is the process in which we only show essential details/functionality to the user. The non-essential implementation details are not displayed to the user. 

In this article, we will learn about abstraction and what abstract means.

## What is Abstraction in Java?

In Java, abstraction is achieved by [****interfaces****](https://www.geeksforgeeks.org/interfaces-in-java/) and [****abstract classes****](https://www.geeksforgeeks.org/abstract-classes-in-java/). We can achieve 100% abstraction using interfaces.

Data Abstraction may also be defined as the process of identifying only the required characteristics of an object ignoring the irrelevant details. The properties and behaviours of an object differentiate it from other objects of similar type and also help in classifying/grouping the objects.



## ****Java Abstract classes and Java Abstract methods****

1. An abstract class is a class that is declared with an [abstract keyword.](https://www.geeksforgeeks.org/abstract-keyword-in-java/)
2. An abstract method is a method that is declared without implementation.
3. An abstract class may or may not have all abstract methods. Some of them can be concrete methods
4. A method-defined abstract must always be redefined in the subclass, thus making [overriding](https://www.geeksforgeeks.org/overriding-in-java/) compulsory or making the subclass itself abstract.
5. Any class that contains one or more abstract methods must also be declared with an abstract keyword.
6. There can be no object of an abstract class. That is, an abstract class can not be directly instantiated with the [**new operator**](https://www.geeksforgeeks.org/new-operator-java/).
7. An abstract class can have parameterized constructors and the default constructor is always present in an abstract class.

### Algorithm to implement abstraction in Java

1.  Determine the classes or interfaces that will be part of the abstraction.
2. Create an abstract class or interface that defines the common behaviours and properties of these classes.
3. Define abstract methods within the abstract class or interface that do not have any implementation details.
4. Implement concrete classes that extend the abstract class or implement the interface.
5. Override the abstract methods in the concrete classes to provide their specific implementations.
6. Use the concrete classes to implement the program logic.

### ****When to use abstract classes and abstract methods?****

There are situations in which we will want to define a superclass that declares the structure of a given abstraction without providing a complete implementation of every method. Sometimes we will want to create a superclass that only defines a generalization form that will be shared by all of its subclasses, leaving it to each subclass to fill in the details.

Consider a classic “shape” example, perhaps used in a computer-aided design system or game simulation. The base type is “shape” and each shape has a color, size, and so on. From this, specific types of shapes are derived(inherited)-circle, square, triangle, and so on — each of which may have additional characteristics and behaviours. For example, certain shapes can be flipped. Some behaviours may be different, such as when you want to calculate the area of a shape. The type hierarchy embodies both the similarities and differences between the shapes.



![Abstract Class in Java](https://media.geeksforgeeks.org/wp-content/uploads/20230520123321/Abstraction-in-Java-768.webp)



## Java Abstraction Example

### ****Example 1:****

## Java

```java
// Java program to illustrate the 
// concept of Abstraction 
abstract class Shape { 
    String color; 
  
    // these are abstract methods 
    abstract double area(); 
    public abstract String toString(); 
  
    // abstract class can have the constructor 
    public Shape(String color) 
    { 
        System.out.println("Shape constructor called"); 
        this.color = color; 
    } 
  
    // this is a concrete method 
    public String getColor() { return color; } 
} 
class Circle extends Shape { 
    double radius; 
  
    public Circle(String color, double radius) 
    { 
  
        // calling Shape constructor 
        super(color); 
        System.out.println("Circle constructor called"); 
        this.radius = radius; 
    } 
  
    @Override double area() 
    { 
        return Math.PI * Math.pow(radius, 2); 
    } 
  
    @Override public String toString() 
    { 
        return "Circle color is " + super.getColor() 
            + "and area is : " + area(); 
    } 
} 
class Rectangle extends Shape { 
  
    double length; 
    double width; 
  
    public Rectangle(String color, double length, 
                     double width) 
    { 
        // calling Shape constructor 
        super(color); 
        System.out.println("Rectangle constructor called"); 
        this.length = length; 
        this.width = width; 
    } 
  
    @Override double area() { return length * width; } 
  
    @Override public String toString() 
    { 
        return "Rectangle color is " + super.getColor() 
            + "and area is : " + area(); 
    } 
} 
public class Test { 
    public static void main(String[] args) 
    { 
        Shape s1 = new Circle("Red", 2.2); 
        Shape s2 = new Rectangle("Yellow", 2, 4); 
  
        System.out.println(s1.toString()); 
        System.out.println(s2.toString()); 
    } 
}
```

**Output**

```java
Shape constructor called
Circle constructor called
Shape constructor called
Rectangle constructor called
Circle color is Redand area is : 15.205308443374602
Rectangle color is Yellowand area is : 8.0
```

## Interface

Interfaces are another method of implementing abstraction in Java. The key difference is that, by using interfaces, we can achieve 100% abstraction in Java classes. In Java or any other language, interfaces include both methods and variables but lack a method body. Apart from abstraction, interfaces can also be used to implement interfaces in Java.



## Java

```java
// Define an interface named Shape 
interface Shape { 
    double calculateArea(); // Abstract method for 
                            // calculating the area 
} 
  
// Implement the interface in a class named Circle 
class Circle implements Shape { 
    private double radius; 
  
    // Constructor for Circle 
    public Circle(double radius) { this.radius = radius; } 
  
    // Implementing the abstract method from the Shape 
    // interface 
    public double calculateArea() 
    { 
        return Math.PI * radius * radius; 
    } 
} 
  
// Implement the interface in a class named Rectangle 
class Rectangle implements Shape { 
    private double length; 
    private double width; 
  
    // Constructor for Rectangle 
    public Rectangle(double length, double width) 
    { 
        this.length = length; 
        this.width = width; 
    } 
  
    // Implementing the abstract method from the Shape 
    // interface 
    public double calculateArea() { return length * width; } 
} 
  
// Main class to test the program 
public class Main { 
    public static void main(String[] args) 
    { 
        // Creating instances of Circle and Rectangle 
        Circle myCircle = new Circle(5.0); 
        Rectangle myRectangle = new Rectangle(4.0, 6.0); 
  
        // Calculating and printing the areas 
        System.out.println("Area of Circle: "
                           + myCircle.calculateArea()); 
        System.out.println("Area of Rectangle: "
                           + myRectangle.calculateArea()); 
    } 
}
```

**Output**

```java
Area of Circle: 78.53981633974483
Area of Rectangle: 24.0

```

## ****Advantages of Abstraction****

Here are some advantages of abstraction:

1. It reduces the complexity of viewing things.
2. Avoids code duplication and increases reusability.
3. Helps to increase the security of an application or program as only essential details are provided to the user.
4. It improves the maintainability of the application. 
5. It improves the modularity of the application. 
6. The enhancement will become very easy because without affecting end-users we can able to perform any type of changes in our internal system. 
7. Improves code reusability and maintainability.
8. Hides implementation details and exposes only relevant information.
9. Provides a clear and simple interface to the user.
10. Increases security by preventing access to internal class details.
11. Supports modularity, as complex systems can be divided into smaller and more manageable parts.
12. Abstraction provides a way to hide the complexity of implementation details from the user, making it easier to understand and use.
13. Abstraction allows for flexibility in the implementation of a program, as changes to the underlying implementation details can be made without affecting the user-facing interface.
14. Abstraction enables modularity and separation of concerns, making code more maintainable and easier to debug.

## Disadvantages of Abstraction in Java

Here are the main disadvantages of abstraction in Java:

1. Abstraction can make it more difficult to understand how the system works.
2. It can lead to increased complexity, especially if not used properly.
3. This may limit the flexibility of the implementation.
4. Abstraction can add unnecessary complexity to code if not used appropriately, leading to increased development time and effort.
5. Abstraction can make it harder to debug and understand code, particularly for those unfamiliar with the abstraction layers and implementation details.
6. Overuse of abstraction can result in decreased performance due to the additional layers of code and indirection.
