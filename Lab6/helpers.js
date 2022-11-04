//You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.

let { ObjectId } = require('mongodb')

// Start: Error Handling functions

const createMovieValidator = async (title, plot, genres, rating, studio, director, castMembers, dateReleased, runtime) => {
    if (!title || !plot || !genres || !rating || !studio || !director || !castMembers || !dateReleased || !runtime) {
        throw "All fields need to have valid values";
    }

    // Title Validation
    if (typeof title !== "string" || title.length === 0 || title.trim().length === 0){
        throw "Invalid String or Empty Title or Title with just spaces";
    }

    title = title.trim();

    if (title.length < 2){
        throw "Title must be at least two characters long";
    }

    const regexTitle = /^[0-9a-zA-Z ]+$/;
    if (!regexTitle.test(title)){
        throw "Title can contain letters a-z, A-Z or numbers only."
    }

    // Plot Validation

    if (typeof plot !== "string" || plot.length === 0 || plot.trim().length === 0){
        throw "Invalid String or Empty Plot or Plot with just spaces";
    }

    // Studio Validation

    if (typeof studio !== "string" || studio.length === 0 || studio.trim().length === 0){
        throw "Invalid String or Empty Studio or Studio with just spaces";
    }

    studio = studio.trim();

    if (studio.length < 5){
        throw "Studio must be at least five characters long";
    }

    const regexStudio = /^[a-zA-Z ]+$/;
    if (!regexStudio.test(studio)){
        throw "Studio can contain letters a-z, A-Z only.";
    }

    // Director Validation

    if (typeof director !== "string" || director.length === 0 || director.trim().length === 0){
        throw "Invalid String or Empty Director or Director with just spaces";
    }

    director = director.trim();

    // Remove extra spaces between first and last name
    director = director.replace(/ +(?= )/g,''); 

    let checkDirector = director.split(" ")

    if (checkDirector.length !== 2) {
        throw "Director name must have first name & last name";
    }

    checkDirector.forEach(element => {

        if (element.length < 3){
            throw "Director first name or last name must be atleast 3 characters long";
        }

        const regexCastMembers = /^[a-zA-Z]+$/;
        if (!regexCastMembers.test(element)){
            throw "Director name can contain letters a-z, A-Z only.";
        }
    });

    // Rating Validation

    if (typeof rating !== "string" || rating.length === 0 || rating.trim().length === 0){
        throw "Invalid String or Empty Rating or Rating with just spaces";
    }

    let ratingArray = ["G", "PG", "PG-13", "R", "NC-17"];
    let flag = 0;

    rating = rating.trim();

    for (ratingValue of ratingArray){
        if(rating === ratingValue){
            flag = 1;
            break;
        }
    }

    if (flag === 0){
        throw "Rating is not one of the following values: G, PG, PG-13, R, NC-17";
    }
    
    // Genres Validation
    if (!Array.isArray(genres) || genres.length === 0){
        throw "Genere is not an array or array with atleast one element in it";
    }

    genres.forEach(element => {
        if (typeof element !== "string" || element.length === 0 || element.trim().length === 0) {
            throw "Genere element not a valid string or Empty String or just spaces";
        }
    });    

    // Removing heading and trailing spaces from elements of genere array
    genres = genres.map(function (e){
        return e.trim();
    });

    genres.forEach(element => {
        if (element.length < 5){
            throw "Genere element must be atleast 5 character long";
        }
        const regexGenres = /^[a-zA-Z]+$/;
        if (!regexGenres.test(element)){
            throw "Genres element can contain letters a-z, A-Z only.";
        }
    });

    // Cast Members Validation
    if (!Array.isArray(castMembers) || castMembers.length === 0){
        throw "Cast Members is not an array or array with atleast one element in it";
    }

    castMembers.forEach(element => {
        if (typeof element !== "string" || element.length === 0 || element.trim().length === 0) {
            throw "CastMembers element not a valid string or Empty String or just spaces";
        }
    });

    // Removing heading and trailing spaces from elements of castMembers array
    castMembers = castMembers.map(function (e){
        return e.trim();
    });

    // Remove extra spaces between first and last name
    castMembers = castMembers.map(function (e){
        return e.replace(/ +(?= )/g,'');
    });

    castMembers.forEach(element => {        
        let checkElement = element.split(" ")
        if (checkElement.length !== 2) {
            throw "Cast Members name must have first name & last name";
        }
        checkElement.forEach(e => {
            if (e.length < 3){
                throw "Cast Member first name or last name must be atleast 3 characters long";
            }
            const regexCastMembers = /^[a-zA-Z]+$/;
            if (!regexCastMembers.test(e)){
                throw "CastMembers can contain letters a-z, A-Z only.";
            }
        });
    });

    // Date Released Validation

    if (typeof dateReleased !== "string" || dateReleased.length === 0 || dateReleased.trim().length === 0){
        throw "Invalid String or Empty Date Released or Date Released with just spaces";
    }

    dateReleased = dateReleased.trim();

    // Check for the pattern mm/dd/yyyy
    if(!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateReleased))
        throw "Date released not in pattern";
    
    const currentYear = new Date().getFullYear()

    // Parse the date parts to integers
    let parts = dateReleased.split("/");
    let month = parseInt(parts[0], 10);
    let day = parseInt(parts[1], 10);
    let year = parseInt(parts[2], 10);
    
    // Check the ranges of year
    if(year < 1900 || year > currentYear + 2){
        throw "Date released not in range";
    }

    // Check the ranges of month
    if ( month === 0 || month > 12){
        throw "Date released not in pattern";
    }

    // Check the range of the day according to month
    var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

    if (!(day > 0 && day <= monthLength[month - 1])){
        throw "Date released not in pattern";
    }

    // Runtime Validation
    if (typeof runtime !== "string" || runtime.length === 0 || runtime.trim().length === 0){
        throw "Invalid String or Empty runtime or runtime with just spaces";
    }

    runtime = runtime.trim();
    runtime = runtime.replace(/ +(?= )/g,'');

    // To check the format of the runtime
    if (!/[0-9]+h\s+[0-9]+min/.test(runtime)){
        throw "Runtime not in proper format";
    }

    // To check for decimal number in runtime
    if (!(runtime.indexOf(".") === -1)){
        throw "Runtime must be a positive whole number and not decimal.";
    }

    let time = runtime.split(" ");
    let hour = parseInt(time[0].match(/(-\d+|\d+)/)[0], 10);
    let min = parseInt(time[1].match(/(-\d+|\d+)/)[0], 10);

    // Check for positive whole number
    if (hour < 0 || hour % 1 !== 0 || min < 0 || min % 1 !== 0){
        throw "Runtime must be a positive whole number";
    }

    // To check if movie is atleast 1 hour long
    if (hour === 0 && min <= 59){
        throw "Movies are usually longer than 1 hour"
    }

    if (min >= 60){
        throw "Min cannot be more than 59 minutes"
    }

};

const idValidator = async (id) => {
    
    // Error Handling for id

    if (!id){ 
        throw 'Id cannot be empty';
    }
    if (typeof id !== "string"){ 
        throw 'Id must be a string';
    }
    if (id.length === 0 || id.trim().length === 0){
        throw 'Id cannot be an empty string or just spaces';
    }

    id = id.trim();
  
    if (!ObjectId.isValid(id)){ 
        throw 'Invalid ID';
    }
};

const newNameValidator = async (title) => {
    if (!title) {
        throw "New Name need to have valid values";
    }

    if (typeof title !== "string" || title.length === 0 || title.trim().length === 0){
        throw "Invalid String or Empty New Name or New Name with just spaces";
    }

    title = title.trim();

    if (title.length < 2){
        throw "New Name must be at least two characters long";
    }

    const regexTitle = /^[0-9a-zA-Z ]+$/;
    if (!regexTitle.test(title)){
        throw "New Name can contain letters a-z, A-Z or numbers only."
    }
};

const createReviewValidator = async (
    reviewTitle,
    reviewerName,
    review,
    rating
  ) => {
  
    if (!reviewTitle || !reviewerName || !review || !rating) {
      throw "All fields need to have valid values";
    }
    if (typeof reviewTitle !== "string" || typeof reviewerName !== "string" || typeof review !== "string" || reviewTitle.trim().length === 0 || reviewerName.trim().length === 0 || review.trim().length === 0) {
      throw "Invalid String or Empty Fields or Fields with just spaces";
    }

    if (typeof rating !== "number" || rating == NaN){
      throw "Rating needs to be a number";
    }
    if (rating < 1 || rating > 5) {
      throw `Rating needs to be between 1 and 5`;
    }
    if(rating - rating.toFixed(1) !== 0)
    {
      throw `Rating needs to be in one decimal place`;
    }
};
// End: Error Handling functions

const overallRatingCalculator = async(movie) => {
    let overallSum = 0
    if (movie.reviews.length === 0){
        return overallSum;
    }
    else {
        movie.reviews.forEach(review => {
            overallSum += review.rating
        });
    }
    let ratingAverage = overallSum/movie.reviews.length;
    return ratingAverage.toFixed(1);
}

module.exports = {
    createMovieValidator,
    idValidator,
    newNameValidator,
    createReviewValidator,
    overallRatingCalculator
  };