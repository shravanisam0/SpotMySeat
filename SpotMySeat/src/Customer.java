/**
 * ============================================================
 * Customer.java — Subclass of Person
 * ============================================================
 * Polymorphism means 'many forms'. The same method call (toString())
 * behaves differently depending on the actual object type at runtime.
 * ============================================================
 */
public class Customer extends Person {


    public Customer(String name, String email, String phone) {
        super(name, email, phone);  // Calls Person(name, email, phone)
    }

  
    public String getRole() {
        return "Customer";
    }


    public String toString() {
        return " Customer: " + getName() + " | Email: " + getEmail() + " | Phone: " + getPhone();
    }
}
