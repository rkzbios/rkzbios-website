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
export const HOST = "https://rkzbiosapi.jimboplatform.nl";



export const MOVIE_API_BASE_URL = `${HOST}/api/v2/`;
export const TICKET_API_BASE_URL = `${HOST}/api/tickets/`;


 
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


export const useGetTicketStatus = (ticketId) => {
  const resourceUrl = `${TICKET_API_BASE_URL}status/${ticketId}/`;
  const { data, error } = useSWR(resourceUrl, fetcher)
  console.log("ticketStatus ", data)
  return {
    ticketStatus: data,
    isLoading: !error && !data,
    isError: error
  }
}


export const useGetTicketEmailConfirmationStatus = (confirmationId) => {
  const resourceUrl = `${TICKET_API_BASE_URL}ticket-confirmation/${confirmationId}/`;
  const { data, error } = useSWR(resourceUrl, fetcher)
  console.log("ticket confiramtion Status ", data)
  return {
    ticketConfirmationStatus: data,
    isLoading: !error && !data,
    isError: error
  }
}

class TicketApi {
    
  constructor(){
   if(! TicketApi.instance){
     this._data = [];
     TicketApi.instance = this;
   }

   return TicketApi.instance;
  }


  getAvailability = async(movieDateId) => {
    const resourceUrl = `${TICKET_API_BASE_URL}availability/${movieDateId}/`;
    const res = await fetch(resourceUrl);
    const data = await res.json();
    return data;
  }
  


  getPriceAvailability = async function(ticketRequest) {
    let resourceUrl = `${TICKET_API_BASE_URL}price-availability/`;
    //console.log("Fetching ", resourceUrl);
    const res = await fetch(resourceUrl,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(ticketRequest)
      }
    );
    const data = await res.json();
    return data;
  }

  requestTicket = async function(ticketRequest){
    let resourceUrl = `${TICKET_API_BASE_URL}ticket-request/`;
    //console.log("Fetching ", resourceUrl);
    const res = await fetch(resourceUrl,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(ticketRequest)
      }
    );
    const data = await res.json();
    return data;
  }


  getTicketEmailConfirmationStatus = async(confirmationId) => {
    const resourceUrl = `${TICKET_API_BASE_URL}ticket-confirmation/${confirmationId}/`;
    const res = await fetch(resourceUrl);
    const data = await res.json();
    return data;
   }


  confirmTicket = async(confirmationId) => {
    const resourceUrl = `${TICKET_API_BASE_URL}ticket-confirmation/${confirmationId}/`;
    const res = await fetch(resourceUrl,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({})
      }
    );
    const data = await res.json();
    return data;
  }

  getTicketPrintData = async(ticketId, accessToken) => {
    const resourceUrl = `${TICKET_API_BASE_URL}ticket-print-data/${ticketId}/?accessToken=${accessToken}`;
    const res = await fetch(resourceUrl);
    const data = await res.json();
    return data;
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
      if(res.status != 200){
        throw new Error('Movie not found'); 
      }else{
         const data = await res.json();
         return data;
      }
    }

    getCurrentMovie = async function() {
      let resourceUrl = `${MOVIE_API_BASE_URL}moviePages/_current/`;
      console.log("Fetching ", resourceUrl);
      const res = await fetch(resourceUrl);

      if(res.status === 404){
        console.log("404 returned ");

        return null;
      }else{
         const data = await res.json();
         return data;
      }
    
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

export const ticketApi = new TicketApi();
//Object.freeze(ticketApi);

//export ticketApi;

export default movieApi;



