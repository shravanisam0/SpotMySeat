import java.util.ArrayList;

/**
 * ============================================================
 * Show.java — Represents a movie screening/showtime
 * ============================================================
 * Show uses composition — it HAS seats, it doesn't INHERIT
 * from Seat. 
 * ============================================================
 */
public class Show {

    // ---- Private Fields ----
    private String showId;          // Unique identifier for this show
    private String time;            // Display time, e.g., "10:30 AM"
    private String hallName;        // Cinema hall name, e.g., "Screen 1 - Dolby Atmos"
    private double priceVIP;        // VIP seat price (rows A-B)
    private double priceClassic;    // Classic seat price (rows C-F)
    private ArrayList<Seat> seats;  // COLLECTION: all 60 seats in this show


    public Show(String showId, String time, String hallName,
                double priceVIP, double priceClassic) {
        this.showId = showId;
        this.time = time;
        this.hallName = hallName;
        this.priceVIP = priceVIP;
        this.priceClassic = priceClassic;
        this.seats = new ArrayList<Seat>();          // Initialize empty ArrayList
        generateSeatLayout();  // Build the 60-seat matrix
    }

    /**
     * Generates the cinema hall seat layout.
     * - Creates 6 rows (A–F) with 10 seats each.
     * - Rows A and B get VIP pricing.
     * - Rows C through F get Classic pricing.
     * 
     * We use an enhanced for-loop to iterate over the rows array,
     * and a regular for-loop for seat numbers 1 to 10.
     */
    private void generateSeatLayout() {
        char[] rows = {'A', 'B', 'C', 'D', 'E', 'F'};

        for (char row : rows) {  // Enhanced for-loop (for-each)
            // Determine seat type and price based on row
            String type;
            double price;
            if (row == 'A' || row == 'B') {
                type = "VIP";
                price = priceVIP;
            } else {
                type = "Classic";
                price = priceClassic;
            }

            // Create 10 seats in this row
            for (int num = 1; num <= 10; num++) {
                Seat seat = new Seat(row, num, type, price);
                seats.add(seat);  // Add seat to the ArrayList
            }
        }
    }


    public void preBookSeats(ArrayList<String> seatIds) {
        // Iterate through all seats and mark matching ones as booked
        for (Seat seat : seats) {
            if (seatIds.contains(seat.getSeatId())) {
                seat.book();  // Uses the Bookable interface's book() method
            }
        }
    }

    // ---- Getter Methods ----

    public String getShowId() {
        return showId;
    }

    public String getTime() {
        return time;
    }

    public String getHallName() {
        return hallName;
    }

    public double getPriceVIP() {
        return priceVIP;
    }

    public double getPriceClassic() {
        return priceClassic;
    }

    public ArrayList<Seat> getSeats() {
        return seats;
    }


    public String toString() {
        return "Show at " + time + " in " + hallName
             + " (VIP: ₹" + (int) priceVIP + ", Classic: ₹" + (int) priceClassic + ")";
    }
}
