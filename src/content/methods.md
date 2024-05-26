# Java Methods



The ****method in Java**** or Methods of Java is a collection of statements that perform some specific tasks and return the result to the caller. A Java method can perform some specific tasks without returning anything. Java Methods allows us to ****reuse**** the code without retyping the code. In Java, every method must be part of some class that is different from languages like C, C++, and Python. 

- A method is like a function i.e. used to expose the behavior of an object.
- It is a set of codes that perform a particular task.



### Syntax of Method

```java
<access_modifier> <return_type> <method_name>( list_of_parameters)
{
    //body
}
```

### Method Declaration

In general, method declarations have 6 components:

****1. Modifier:**** It defines the ****access type**** of the method i.e. from where it can be accessed in your application. In Java, there 4 types of access specifiers. 

- ****public:**** It is accessible in all classes in your application.
- ****protected:**** It is accessible within the class in which it is defined and in its subclasses.
- ****private:**** It is accessible only within the class in which it is defined.
- ****default:**** It is declared/defined without using any modifier. It is accessible within the same class and package within which its class is defined.

****2. The return type:**** The data type of the value returned by the method or void if does not return a value. It is ****Mandatory**** in syntax.

****3. Method Name:**** the rules for field names apply to method names as well, but the convention is a little different. It is ****Mandatory**** in syntax.

****4. Parameter list:**** Comma-separated list of the input parameters is defined, preceded by their data type, within the enclosed parenthesis. If there are no parameters, you must use empty parentheses ().  It is ****Optional**** in syntax.

****5. Exception list:**** The exceptions you expect by the method can throw; you can specify these exception(s). It is ****Optional**** in syntax.

****6. Method body:**** it is enclosed between braces. The code you need to be executed to perform your intended operations.  It is ****Optional**** in syntax.

![Methods in Java](https://media.geeksforgeeks.org/wp-content/uploads/methods-in-java.png)

## Types of Methods in Java

There are two types of methods in Java:

### ****1. Predefined Method****

In Java, predefined methods are the method that is already defined in the Java class libraries is known as predefined methods. It is also known as the standard library method or built-in method. We can directly use these methods just by calling them in the program at any point. 

### ****2. User-defined Method****

The method written by the user or programmer is known as a user-defined method. These methods are modified according to the requirement.

### ****Ways to Create Method in Java****

There are two ways to create a method in Java:

****1. Instance Method:**** Access the instance data using the object name. Declared inside a class.

****Syntax:****

```java
// Instance Method
void method_name(){
  body // instance area
}
```

****2. Static Method:**** Access the static data using class name. Declared inside class with ****static**** keyword.

****Syntax:****

```java
//Static Method
static void method_name(){
  body // static area
}
```

## Naming a Method

A method name is typically a single word that should be a ****verb**** in lowercase or a multi-word, that begins with a ****verb**** in lowercase followed by an ****adjective, noun.**** After the first word, the first letter of each word should be capitalized. 

****Rules to Name a Method:****

- While defining a method, remember that the method name must be a ****verb**** and start with a ****lowercase**** letter.
- If the method name has more than two words, the first name must be a verb followed by an adjective or noun.
- In the multi-word method name, the first letter of each word must be in ****uppercase**** except the first word. For example, findSum, computeMax, setX, and getX.

Generally, a method has a unique name within the class in which it is defined but sometimes a method might have the same name as other method names within the same class as [method overloading is allowed in Java](https://www.geeksforgeeks.org/overloading-in-java/).

## Method Calling

The method needs to be called for use its functionality. There can be three situations when a method is called:   
A method returns to the code that invoked it when:  

- It completes all the statements in the method.
- It reaches a return statement.
- Throws an exception.

```java
// Java Program to Illustrate Methods

// Importing required classes
import java.io.*;

// Class 1
// Helper class
class Addition {

    // Initially taking sum as 0
    // as we have not started computation
    int sum = 0;

    // Method
    // To add two numbers
    public int addTwoInt(int a, int b)
    {

        // Adding two integer value
        sum = a + b;

        // Returning summation of two values
        return sum;
    }
}

// Class 2
// Helper class
class GFG {

    // Main driver method
    public static void main(String[] args)
    {

        // Creating object of class 1 inside main() method
        Addition add = new Addition();

        // Calling method of above class
        // to add two integer
        // using instance created
        int s = add.addTwoInt(1, 2);

        // Printing the sum of two numbers
        System.out.println("Sum of two integer values :"
                           + s);
    }
}
```

**Output**

```java
Sum of two integer values :3
```

## Passing Parameters to a method

There are some cases when we don’t know the number of parameters to be passed or an unexpected case to use more parameters than declared number of parameters. In such cases we can use

- Passing Array as an Argument
- Passing Variable-arguments as an Argument
- Method Overloading.

## ****Memory Allocation for Methods Calls****

Methods calls are implemented through a stack. Whenever a method is called a stack frame is created within the stack area and after that, the arguments passed to and the local variables and value to be returned by this called method are stored in this stack frame and when execution of the called method is finished, the allocated stack frame would be deleted. There is a stack pointer register that tracks the top of the stack which is adjusted accordingly.

****Example:**** pseudo-code for implementing methods

```java
// Define a class
public class Example {

    // Define instance variables
    private int number;
    private String name;

    // Define accessor (getter) methods
    public int getNumber() {
      return number; 
    }

    public String getName() {
      return name; 
    }

    // Define mutator (setter) methods
    public void setNumber(int number)
    {
        this.number = number;
    }

    public void setName(String name) { this.name = name; }

    // Define other methods
    public void printDetails()
    {
        System.out.println("Number: " + number);
        System.out.println("Name: " + name);
    }
}

// Use the methods in another part of the code
Example example = new Example();
example.setNumber(123);
example.setName("GFG Write");
example.printDetails();
```

### There are several advantages to using methods in Java, including:

- ****Reusability****: Methods allow you to write code once and use it many times, making your code more modular and easier to maintain.
- ****Abstraction****: Methods allow you to abstract away complex logic and provide a simple interface for others to use. This makes your code more readable and easier to understand.
- ****Improved readability****: By breaking up your code into smaller, well-named methods, you can make your code more readable and easier to understand.
- ****Encapsulation****: Methods allow you to encapsulate complex logic and data, making it easier to manage and maintain.
- ****Separation of concerns****: By using methods, you can separate different parts of your code and assign different responsibilities to different methods, improving the structure and organization of your code.
- ****Improved modularity****: Methods allow you to break up your code into smaller, more manageable units, improving the modularity of your code.
- ****Improved testability****: By breaking up your code into smaller, more manageable units, you can make it easier to test and debug your code.
- ****Improved performance:**** By organizing your code into well-structured methods, you can improve performance by reducing the amount of code that needs to be executed and by making it easier to cache and optimize your code.
