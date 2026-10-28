/**
 * ============================================================
 * Seat.java — Represents a single cinema seat
 * ============================================================
 * Seat implements Bookable, so it must define all four methods
 * from the interface.
 * ============================================================
 */
public class Seat implements Bookable {


    private String seatId;      // Unique ID like "A5" (row + number)
    private char row;           // Row letter: 'A', 'B', 'C', etc.
    private int number;         // Seat number within the row: 1-10
    private String seatType;    // "VIP" (rows A-B) or "Classic" (rows C-F)
    private double price;       // Ticket price for this seat type
    private boolean booked;     // true if seat is taken, false if available


    public Seat(char row, int number, String seatType, double price) {
        this.row = row;
        this.number = number;
        this.seatId = "" + row + number;  // Concatenate: 'A' + 5 = "A5"
        this.seatType = seatType;
        this.price = price;
        this.booked = false;  // All seats start as available
    }

    // ---- Implementing Bookable Interface Methods ----


    public boolean isAvailable() {
        return !booked;  // Available if NOT booked
    }


    public void book() {
        this.booked = true;
    }


    public double getPrice() {
        return price;
    }

    public String getIdentifier() {
        return seatId;
    }

    // ---- Getter and Setter Methods ----

    public String getSeatId() {
        return seatId;
    }

    public char getRow() {
        return row;
    }

    public int getNumber() {
        return number;
    }

    public String getSeatType() {
        return seatType;
    }

    public boolean isBooked() {
        return booked;
    }

    public void setBooked(boolean booked) {
        this.booked = booked;
    }


    public String toString() {
        String status = booked ? "Booked" : "Available";
        return seatId + " (" + seatType + ", ₹" + (int) price + ", " + status + ")";
    }
}
