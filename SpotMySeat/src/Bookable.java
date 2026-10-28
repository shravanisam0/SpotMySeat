/**
 * ============================================================
 * Bookable.java — Interface
 * ============================================================
 * We use the Bookable interface so that any item that can be
 * reserved  like a Seat  follows the same booking contract.
 * ============================================================
 */
public interface Bookable {

    boolean isAvailable();

    void book();

    double getPrice();

    String getIdentifier();
}
