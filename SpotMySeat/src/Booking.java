import java.util.ArrayList;

/**
 * ============================================================
 * Booking.java — Represents a completed ticket booking
 * ============================================================
 * 
 * OOP CONCEPT: COMPOSITION (HAS-A relationship)
 * - A Booking is composed of multiple objects:
 *   - HAS-A Customer (who made the booking)
 *   - HAS-A Movie (which movie was booked)
 *   - HAS-A Show (which showtime was selected)
 *   - HAS-A list of Seats (which seats were reserved)
 * - This demonstrates how complex objects are built by combining simpler ones.
 * 
 * OOP CONCEPT: ENCAPSULATION
 * - All fields are private with controlled access via getters.
 */
public class Booking {

    // ---- Private Fields (ENCAPSULATION) ----
    private String bookingId;               // Unique booking ID (e.g., "SMS-849204")
    private Customer customer;              // COMPOSITION: booking has-a customer
    private Movie movie;                    // COMPOSITION: booking has-a movie
    private Show show;                      // COMPOSITION: booking has-a show
    private ArrayList<Seat> bookedSeats;    // COMPOSITION: booking has seats
    private double totalAmount;             // Total amount paid
    private String bookingDate;             // Date of the booking


    public Booking(String bookingId, Customer customer, Movie movie, Show show,
                   ArrayList<Seat> bookedSeats, double totalAmount, String bookingDate) {
        this.bookingId = bookingId;
        this.customer = customer;
        this.movie = movie;
        this.show = show;
        this.bookedSeats = bookedSeats;
        this.totalAmount = totalAmount;
        this.bookingDate = bookingDate;
    }

    // ---- Getter Methods (ENCAPSULATION) ----

    public String getBookingId() {
        return bookingId;
    }

    public Customer getCustomer() {
        return customer;
    }

    public Movie getMovie() {
        return movie;
    }

    public Show getShow() {
        return show;
    }

    public ArrayList<Seat> getBookedSeats() {
        return bookedSeats;
    }

    public double getTotalAmount() {
        return totalAmount;
    }

    public String getBookingDate() {
        return bookingDate;
    }

    /**
     * Returns a formatted comma-separated list of booked seat IDs.
     * Example: "A4, A5, B3"
     */
    public String getSeatList() {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < bookedSeats.size(); i++) {
            sb.append(bookedSeats.get(i).getSeatId());
            // Add comma separator between seats, but not after the last one
            if (i < bookedSeats.size() - 1) {
                sb.append(", ");
            }
        }
        return sb.toString();
    }


    public String toString() {
        return "Booking [" + bookingId + "] "
             + movie.getTitle() + " at " + show.getTime()
             + " | Seats: " + getSeatList()
             + " | Total: ₹" + (int) totalAmount
             + " | Customer: " + customer.getName();
    }
}
