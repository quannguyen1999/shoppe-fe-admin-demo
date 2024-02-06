import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { NgModule } from '@angular/core';
import { ApolloClientOptions, ApolloLink, InMemoryCache,from } from '@apollo/client/core';
import { environment } from '../../environments/environment';
import { ACCESS_TOKEN } from '../constants/constant-value-model';

const customHeader = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => ({
    headers: {
      Authorization: `Bearer ` + localStorage.getItem(ACCESS_TOKEN)
    }
  }));
  return forward(operation);
})

export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  return {
    link: from([
      customHeader,
      httpLink.create({ uri: environment.apiUrl + 'graphql' }),
    ]),
    cache: new InMemoryCache(),
  };
}

@NgModule({
  exports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
