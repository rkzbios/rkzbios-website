
import moment from 'moment';
moment.locale('nl');


export const getUrlEncodedStr = (value) => {
  return encodeURI(value.replace(/ /g,"-"));
}


export const toFullMediaUrl= (url) => {
  //return `http://localhost:8000${url}`;
  return `http://rkzbiosapi.jimboplatform.nl${url}`
}

export const getMoviePosterUrl= (movie) => {
  return toFullMediaUrl(movie.moviePoster.meta.download_url);
}

export const getMovieDatesStrShort = (movieDates) => {
   
  return movieDates.map( movieDateObject => {
    const movieDate = moment(movieDateObject.date);
    movieDate.utcOffset(0); // Strange, 2019-11-29T20:30:00Z  is translated to  21.30  movieDate.utcOffset() gives 60 (minutes) so I correct it
    //console.log( "moment ", movieDate.utcOffset())

    return movieDate.format('LL');

  });
}

export const getFormatedMovieDate = (movieDateDate) => {
  const movieDate = moment(movieDateDate);
  movieDate.utcOffset(0); // Strange, 2019-11-29T20:30:00Z  is translated to  21.30  movieDate.utcOffset() gives 60 (minutes) so I correct it
  //console.log( "moment ", movieDate.utcOffset())
  return movieDate.format('LLLL');
}


export const getMovieDatesStr = (movieDates) => {
   
  return movieDates.map( movieDateObject => {
    const movieDate = moment(movieDateObject.date);
    movieDate.utcOffset(0); // Strange, 2019-11-29T20:30:00Z  is translated to  21.30  movieDate.utcOffset() gives 60 (minutes) so I correct it
    //console.log( "moment ", movieDate.utcOffset())

    return movieDate.format('LLLL');

  });
}

export const toReleaseDateStr = (releaseDateStr) => {
  return moment(releaseDateStr).format('YYYY');
}

export const prependHttpToUrl = (href) => {
  return href.startsWith("http") ? href : "http://" + href;
}




export const toStringWithLineBreaks = (value) => {
  return value.split('\n').map((item, key) => {
    return <React.Fragment key={key}>{item}<br/></React.Fragment>
  })
}