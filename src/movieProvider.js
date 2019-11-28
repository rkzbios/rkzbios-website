import { useQuery } from '@apollo/react-hooks'
import { NetworkStatus } from 'apollo-client'
import gql from 'graphql-tag'


// export const MOVIE_QUERY = gql`
// query{
//     film($filmId:String!){
//       id,
//       title,
//       body,
//       director,
//       country,
//       filmDates{
//         date
//       },
//       filmPoster{
//         url
//       },
//       filmBack{
//         url
//       }
//     }
//   }
// `

export const CURRENT_MOVIE_QUERY = gql`
query{
    currentFilm{
      id,
      title,
      body,
      director,
      country,
      filmDates{
        date
      },
      filmPoster{
        url
      },
      filmBack{
        url
      }
    }
  }
`



export default function MovieProvider(props) {
  const { loading, error, data, fetchMore, networkStatus } = useQuery(
    CURRENT_MOVIE_QUERY,
    {
      // Setting this value to true will make the component rerender when
      // the "networkStatus" changes, so we are able to know if it is fetching
      // more data
      notifyOnNetworkStatusChange: true
    }
  )

  console.log("query ", data, loading)

  const film = data ? data.currentFilm : null;
  return (< props.wrappedComponent loading={loading} error={error} film={film} ></props.wrappedComponent>  
  )
}