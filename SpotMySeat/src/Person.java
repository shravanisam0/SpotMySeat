/**
 * ============================================================
 * Person.java — Abstract Base Class
 * ============================================================
 * Person is abstract because we don't want to create a generic
 * 'Person' — we always want a specific type like Customer.
 * ============================================================
 */
public abstract class Person {

   
    // These fields are hidden from outside classes. Only accessible via getters/setters.
    private String name;
    private String email;
    private String phone;

    public Person(String name, String email, String phone) {
        this.name = name;    // 'this' refers to the current object's field
        this.email = email;
        this.phone = phone;
    }

    // ---- Getter Methods----
    // These allow other classes to READ the private fields.

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getPhone() {
        return phone;
    }

    // ---- Setter Methods ----
    // These allow other classes to MODIFY the private fields.

    public void setName(String name) {
        this.name = name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }


    public abstract String getRole();


    public String toString() {
        return getRole() + ": " + name + " (" + email + ", " + phone + ")";
    }
}
