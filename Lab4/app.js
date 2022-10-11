const { closeConnection } = require('./config/mongoConnection') ;
const movies = require('./data/movies');

/*

1. Create a Movie of your choice.
2. Log the newly created Movie. (Just that movie, not all movies)
3. Create another movie of your choice.
4. Query all movies, and log them all
5. Create the 3rd movie of your choice.
6. Log the newly created 3rd movie. (Just that movie, not all movies)
7. Rename the first movie
8. Log the first movie with the updated name. 
9. Remove the second movie you created.
10. Query all movies, and log them all
11. Try to create a movie with bad input parameters to make sure it throws errors.
12. Try to remove a movie that does not exist to make sure it throws errors.
13. Try to rename a movie that does not exist to make sure it throws errors.
14. Try to rename a movie passing in invalid data for the newName parameter to make sure it throws errors.
15. Try getting a movie by ID that does not exist to make sure it throws errors.

*/

async function main(){
    let Hackers, Movie42, The_Breakfast_Club;
    try{
        // 1.Create a Movie of your choice.
        Hackers = await movies.createMovie("Hackers", "Hackers are blamed for making a virus that will capsize five oil tankers.", ["Crime", "Drama", "Romance"], "PG-13", "United Artists", "Iain Softley", ["Jonny Miller", "Angelina Jolie", "Matthew Lillard", "Fisher Stevens"], "09/15/1995", "1h 45min");
        // 2. Log the newly created Movie. (Just that movie, not all movies)
        console.log (Hackers);
    }catch(e){
        console.log (e);
    }

    try{
        // 3. Create another movie of your choice.
        Movie42 = await movies.createMovie("42", "In 1947, Jackie Robinson becomes the first African-American to play in Major League Baseball in the modern era when he was signed by the Brooklyn Dodgers and faces considerable racism in the process.", ["Biography", "Drama", "Sport"], "PG-13", "Warner Brothers", "Brian Helgeland", ["Chadwick Boseman", "Harrison Ford", "Nicole Beharie", "Christopher Meloni"], "04/09/2013", "2h 8min");
    }catch(e){
        console.log (e);
    }

    try{
        // 4. Query all movies, and log them all
        let getAllMovies = await movies.getAllMovies();
        console.log (getAllMovies);
    }catch(e){
        console.log (e);
    }

    try{
        // 5. Create the 3rd movie of your choice.
        The_Breakfast_Club = await movies.createMovie("The Breakfast Club", "Five high school students meet in Saturday detention and discover how they have a lot more in common than they thought.", ["Comedy", "Drama"], "R", "Universal Pictures", "John Hughes", ["Judd Nelson", "Molly Ringwald", "Ally Sheedy", "Anthony Hall", "Emilio Estevez"], "02/07/1985", "1h 37min");
        // 6. Log the newly created 3rd movie. (Just that movie, not all movies)
        console.log (The_Breakfast_Club);
    }catch(e){
        console.log (e);
    }
    
    try{
        // 7. Rename the first movie
        let renameMovie = await movies.renameMovie(Hackers._id, "Virus Attack")
        // 8. Log the first movie with the updated name.
        console.log (renameMovie);
    }catch(e){
        console.log (e);
    }

    try{
        // 9. Remove the second movie you created.
        let removeMovie = await movies.removeMovie(Movie42._id);
        console.log(removeMovie);
    }catch(e){
        console.log (e);
    }

    try{
        // 10. Query all movies, and log them all
        let getAllMovies = await movies.getAllMovies();
        console.log (getAllMovies);
    }catch(e){
        console.log (e);
    }
    
    try{
        // 11. Try to create a movie with bad input parameters to make sure it throws errors.
        let Harry_Potter = await movies.createMovie("Harry Potter", "Adaptation of the first of J.K. Rowling's popular children's novels about Harry Potter, a boy who learns on his eleventh birthday that he is the orphaned son of two powerful wizards and possesses unique magical powers of his own. ", ["Drama", "Sport"], "PG-13", "Warner Brothers", "Brian Helgeland", ["Daniel Radcliffe", "Rupert Grint", "Emma Watson", "Robbie Coltrane"], "04/09/2025", "2h 8min");
        console.log (Harry_Potter);
    }catch(e){
        console.log (e);
    }
    
    
    try{
        // 12. Try to remove a movie that does not exist to make sure it throws errors.
        let removeMovie = await movies.removeMovie(Movie42._id)
        console.log(removeMovie);
    }catch(e){
        console.log (e);
    }

    try{
        // 13. Try to rename a movie that does not exist to make sure it throws errors.
        let removeMovie = await movies.renameMovie(Movie42._id, "22");
        console.log(removeMovie);
    }catch(e){
        console.log (e);
    }

    try{
        // 14. Try to rename a movie passing in invalid data for the newName parameter to make sure it throws errors.
        let renameMovie = await movies.renameMovie(The_Breakfast_Club._id, "  ");
        console.log(renameMovie);
    }catch(e){
        console.log (e);
    }

    try{
        // 15. Try getting a movie by ID that does not exist to make sure it throws errors.
        let getMovieById = await movies.getMovieById(Movie42._id);
        console.log(getMovieById);
    }catch(e){
        console.log (e);
    }

    closeConnection();
}

main();