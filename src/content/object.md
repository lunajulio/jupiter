# Java Objects

An object in Java is a basic unit of Object-Oriented Programming and represents real-life entities. Objects are the instances of a class that are created to use the attributes and methods of a class.  A typical Java program creates many objects, which as you know, interact by invoking methods. An object consists of : 

1. ****State****: It is represented by attributes of an object. It also reflects the properties of an object.
2. ****Behavior****: It is represented by the methods of an object. It also reflects the response of an object with other objects.
3. ****Identity****: It gives a unique name to an object and enables one object to interact with other objects.

Example of an object: dog

![Objects in Java](https://media.geeksforgeeks.org/wp-content/uploads/20230515233144/Classes-and-Objects-in-java-1-768.webp)


Objects correspond to things found in the real world. For example, a graphics program may have objects such as “circle”, “square”, and “menu”. An online shopping system might have objects such as “shopping cart”, “customer”, and “product”.

### Declaring Objects (Also called instantiating a class)

When an object of a class is created, the class is said to be ****instantiated****. All the instances share the attributes and the behavior of the class. But the values of those attributes, i.e. the state are unique for each object. A single class may have any number of instances.

****Example:****

![Objects in Java](https://media.geeksforgeeks.org/wp-content/uploads/20230515233145/Classes-and-Objects-in-java-2-768.webp)


### Initializing a Java object

The new operator instantiates a class by allocating memory for a new object and returning a reference to that memory. The new operator also invokes the class constructor. 

****Example:****

## Java

```java
// Class Declaration
 
public class Dog {
    // Instance Variables
    String name;
    String breed;
    int age;
    String color;
 
    // Constructor Declaration of Class
    public Dog(String name, String breed, int age,
               String color)
    {
        this.name = name;
        this.breed = breed;
        this.age = age;
        this.color = color;
    }
 
    // method 1
    public String getName() { return name; }
 
    // method 2
    public String getBreed() { return breed; }
 
    // method 3
    public int getAge() { return age; }
 
    // method 4
    public String getColor() { return color; }
 
    @Override public String toString()
    {
        return ("Hi my name is " + this.getName()
                + ".\nMy breed,age and color are "
                + this.getBreed() + "," + this.getAge()
                + "," + this.getColor());
    }
 
    public static void main(String[] args)
    {
        Dog tuffy
            = new Dog("tuffy", "papillon", 5, "white");
        System.out.println(tuffy.toString());
    }
}
```

**Output**

```java
Hi my name is tuffy.
My breed,age and color are papillon,5,white
```

## Difference between Java Class and Objects

The differences between class and object in Java are as follows: 

| Class                                                              | Object                                                       |
| ------------------------------------------------------------------ | ------------------------------------------------------------ |
| Class is the blueprint of an object. It is used to create objects. | An object is an instance of the class.                       |
| No memory is allocated when a class is declared.                   | Memory is allocated as soon as an object is created.         |
| A class is a group of similar objects.                             | An object is a real-world entity such as a book, car, etc.   |
| Class is a logical entity.                                         | An object is a physical entity.                              |
| A class can only be declared once.                                 | Objects can be created many times as per requirement.        |
| An example of class can be a car.                                  | Objects of the class car can be BMW, Mercedes, Ferrari, etc. |
