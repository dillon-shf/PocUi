import {NgModule} from '@angular/core';
import {APOLLO_OPTIONS} from 'apollo-angular';
import {ApolloClientOptions, InMemoryCache, ApolloLink} from '@apollo/client/core';
import {HttpLink} from 'apollo-angular/http';
import { setContext } from '@apollo/client/link/context';

const uri = 'https://admin.dev.superhi.fi/graphql'; // <-- add the URL of the GraphQL server here
export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  const basic = setContext( () => ({
    headers: {
      Accept: 'charset=utf-8'
    }
  }));

  const auth = setContext( () => ({
    headers: {
      "Authorization": "eyJraWQiOiIwbjdlRTNlZkpYejErUUxWTHlHWFRGXC84ZWg3eDgwdEVkWFJTTCtiRDA4QT0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI0MjEyZGM5Ny0yZThkLTQ1ODAtOGVhNC1kMzQzNjVhOGVjNjEiLCJhdWQiOiI2cWU3M3JzNG41c2pyazMyMjc3a2o0aWNwaSIsImNvZ25pdG86Z3JvdXBzIjpbIlFBIl0sImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJldmVudF9pZCI6IjZmYmUxMjQxLTEyNjYtNGYwZC05YTZmLTcwY2QzZTgwMTk2YiIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNTkxNDgxNjgyLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtd2VzdC0yLmFtYXpvbmF3cy5jb21cL3VzLXdlc3QtMl9mT290WjYzT00iLCJjb2duaXRvOnVzZXJuYW1lIjoiY2hhZC5idW1zdGVhZEBzdXBlcmhpZmkuY29tIiwiZXhwIjoxNTkyMzQ4ODA3LCJpYXQiOjE1OTIzNDUyMDcsImVtYWlsIjoiY2hhZC5idW1zdGVhZEBzdXBlcmhpZmkuY29tIn0.N-I8WJnHDUrvNQq6Ga-065XvhzdCgHMC2zsEyfejinUt17iPXa37tPW2a2DHTpkRW9CtzYUe8pJjO6OSW9fGfEYa3FiCnGRpzEM_f_TjV_UbMRn50IhyRd2DSZ5JxPbttUE-asWdB0s40cXYY0C-fr0bEpDjAvKQPUyZX-uuO13dp1HkIIaiiEuMEW9JprcJUzEiuMn_J2MSbDBcWf2KUDlieCxO3JLMxLwE8L5Dhy83zH9m3XTtnWtvHCpY6ThdnDpBuvP47VKL201b-gS1CELno2cZ51lyeyTFs_aZBjhlDe_cnmqG0XO012CP1RWIW-oIxILwMUgzbKW_v0QE4Q"
    }
  }));

  const link = ApolloLink.from([basic, auth, httpLink.create({ uri })]);

  return {
    link: link, //httpLink.create({uri}),
    cache: new InMemoryCache(),
    defaultOptions: {
      query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
      }
    }
  };
}

@NgModule({
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
