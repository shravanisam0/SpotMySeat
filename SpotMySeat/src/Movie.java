import java.util.ArrayList;

public class Movie {

    // ---- Private Fields (ENCAPSULATION) ----
    private int id;                    // Unique movie ID (1, 2, 3, ...)
    private String title;              // Movie title
    private int releaseYear;           // Release year (e.g., 1994, 2024)
    private String genre;              // Genre (e.g., "Animation", "Adventure")
    private String language;           // Language (e.g., "English")
    private String duration;           // Duration string (e.g., "1h 45m")
    private double rating;             // Rating out of 10 (e.g., 8.5)
    private String certification;      // Age certification (e.g., "U", "PG")
    private String description;        // Brief movie description
    private String posterPath;         // Local poster file path (e.g., "posters/coco.jpg")
    private String fallbackColor;      // Fallback hex color for poster container
    private ArrayList<Show> shows;     // COMPOSITION: list of screenings


    public Movie(int id, String title, int releaseYear, String genre, String language,
                 String duration, double rating, String certification, String description,
                 String posterPath, String fallbackColor) {
        this.id = id;
        this.title = title;
        this.releaseYear = releaseYear;
        this.genre = genre;
        this.language = language;
        this.duration = duration;
        this.rating = rating;
        this.certification = certification;
        this.description = description;
        this.posterPath = posterPath;
        this.fallbackColor = fallbackColor;
        this.shows = new ArrayList<Show>();
    }


    public void addShow(Show show) {
        shows.add(show);
    }

    // ---- Getter Methods ----

    public int getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public int getReleaseYear() {
        return releaseYear;
    }

    public String getGenre() {
        return genre;
    }

    public String getLanguage() {
        return language;
    }

    public String getDuration() {
        return duration;
    }

    public double getRating() {
        return rating;
    }

    public String getCertification() {
        return certification;
    }

    public String getDescription() {
        return description;
    }

    public String getPosterPath() {
        return posterPath;
    }

    public String getFallbackColor() {
        return fallbackColor;
    }

    public ArrayList<Show> getShows() {
        return shows;
    }

    // ---- Setter Methods ----

    public void setTitle(String title) {
        this.title = title;
    }

    public void setReleaseYear(int releaseYear) {
        this.releaseYear = releaseYear;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setPosterPath(String posterPath) {
        this.posterPath = posterPath;
    }

    public void setFallbackColor(String fallbackColor) {
        this.fallbackColor = fallbackColor;
    }


    public String toString() {
        return " " + title + " (" + releaseYear + ") | " + genre + " | " + language
             + " | " + duration + " | ★ " + rating + " | Shows: " + shows.size();
    }
}
