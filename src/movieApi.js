import fetch from 'isomorphic-unfetch';
import useSWR from 'swr'


 const queryMapToQueryString = (queryObject) => {

  let queryArgs = [];

  const addQueryArgs = (value, key ) => {
    if( Array.isArray(value)){
      queryArgs = queryArgs.concat( value.map( part => `${key}=${part}`));
    }else{
       queryArgs.push(`${key}=${value}`)
    }
  }

  const queryMap = new Map(Object.entries(queryObject));
  queryMap.forEach(addQueryArgs)
  return queryArgs.join('&');
 }


 export class MovieFilter {
 

    constructor({currentActive = true, start = 0, count = 250}){
        this.currentActive = currentActive; 
        this.start = start;
        this.count = count;
    }

    getQuery(){
        
        let querymap = {};
        //querymap['start'] = this.start;
        //querymap['count'] = this.count;
        querymap['fields'] = 'director,country,moviePoster,movieDates,externalLinks,movieBackDrop,premiere,movieType,minimumAge,spokenLanguage,subtitleLanguage,lengthInMinutes,doubleBillMovie(moviePoster)'
     
        if (this.currentActive){
          querymap['currentActive'] = this.currentActive;
        }
     

        const query =  '?' + queryMapToQueryString(querymap);  

        return query;
    }

 }



//export const HOST = "http://localhost:8000";
export const HOST = "http://rkzbiosapi.jimboplatform.nl";


export const MOVIE_API_BASE_URL = `${HOST}/api/v2/`;
export const TICKET_API_BASE_URL = `${HOST}/api/tickets/`;
 //export const MOVIE_API_BASE_URL = 'http://rkzbiosapi.jimboplatform.nl/api/v2/'


 
const fetcher = async url => {
  const res = await fetch(url);
  const data = await res.json();
  console.log("returning from fetcher ", data)
  return data;
}


export const useMovie = (id) => {
  const resourceUrl = `${MOVIE_API_BASE_URL}moviePages/${id}/`;
  const { data, error } = useSWR(resourceUrl, fetcher)
  return {
    movie: data,
    isLoading: !error && !data,
    isError: error
  }
}


export const useAvailability = (movieDateId) => {
  const resourceUrl = `${TICKET_API_BASE_URL}availability/${movieDateId}/`;
  const { data, error } = useSWR(resourceUrl, fetcher)
  return {
    availability: data,
    isLoading: !error && !data,
    isError: error
  }
}


 class MovieApi {
    
    constructor(){
     if(! MovieApi.instance){
       this._data = [];
       MovieApi.instance = this;
     }
  
     return MovieApi.instance;
    }
  
   

    getMovie = async function(id) {
      let resourceUrl = `${MOVIE_API_BASE_URL}moviePages/${id}/`;
      //console.log("Fetching ", resourceUrl);
      const res = await fetch(resourceUrl);
      const data = await res.json();
      return data;
    }

    getCurrentMovie = async function() {
      
      return this.getMovie("_current");
    }

    getMovies = async function({movieFilter = null}){
      let query = movieFilter ? movieFilter.getQuery(): new MovieFilter({}).getQuery();

      //console.log(query);

      let resourceUrl = `${MOVIE_API_BASE_URL}moviePages/${query}`;
      const res = await fetch(resourceUrl);
      const data = await res.json();
      return data;
    }
    
    getMainMenu = async function(){
      let menuResourceUrl = `${MOVIE_API_BASE_URL}pages/?child_of=2&show_in_menus=true`;
      const res = await fetch(menuResourceUrl);
      const data = await res.json();
      return data.items.map(item => {
         return {id: item.id, title: item.title, slug: item.meta.slug}
      });
    }
    
    getPage = async function(id){
      let pageResourceUrl = `${MOVIE_API_BASE_URL}pages/${id}/`;
      const res = await fetch(pageResourceUrl);
      const data = await res.json();
      return data;
    }
};
  
  
  const movieApi = new MovieApi();
  Object.freeze(movieApi);

  export default movieApi;



