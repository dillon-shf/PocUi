import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

// import { AmplifyUIAngularModule } from '@aws-amplify/ui-angular';
// import { AppRoutingModule } from './app-routing.module';
// import Amplify from 'aws-amplify';

// Amplify.configure({
// 	Auth: {
//     // mandatorySignIn: false,
// 		region: 'us-west-2',
// 		userPoolId: 'us-west-2_fOotZ63OM',
//     userPoolWebClientId: '6qe73rs4n5sjrk32277kj4icpi',
//     identityPoolId: 'us-west-2:ed6d4f18-e122-4789-9096-74e4189a89a1',
//   }
// });

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
