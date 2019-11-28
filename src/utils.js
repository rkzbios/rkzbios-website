
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


export const getMovieDatesStr = (movieDates) => {
   
  return movieDates.map( movieDate => {
    return moment(movieDate.date).format('LLLL');

  });
}

export const toReleaseDateStr = (releaseDate) => {
  return moment(releaseDate).format('YYYY');
}

export const prependHttpToUrl = (href) => {
  return href.startsWith("http") ? href : "http://" + href;
}


export const toJimboGoDomain = (value) => {
  if(value){
    const urlParts = getLocation(value);
    const path = urlParts.pathname;

    return `https://jimbogo.com${path}`;
  }
  return null;
}


export const toStringWithLineBreaks = (value) => {
  return value.split('\n').map((item, key) => {
    return <React.Fragment key={key}>{item}<br/></React.Fragment>
  })
}