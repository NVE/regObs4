# @

 ## Introduction  RegObs is a tool for collecting observations and events <br> related to natural hazards. It is currently used by the <br> Norwegian flood, landslide and avalanche warning service in <br> Norway, but the data is openly available for anyone through this API.<br>  Regobs has been developed by the Norwegian Water resources and <br> Energy Directorate (NVE), in collaboration with the Norwegian <br> Meteorological Institute (MET) and the Norwegian Public Roads <br> Administration (Statens vegvesen).<br>  You can check out our representation of the data at [regobs.no](https://regobs.no). <br> For more info about the API, please visit the [RegObs page](https://api.nve.no/doc/regobs/) at api.nve.no.<br>  ## API lifetime  Regobs API is constantly developed, and once in the future we will probably release a new version of the API with breaking changes.<br> The old version of the API will then be shut down 6 months after the new version is released.<br> **You should already monitor the \'[Sunset](https://www.rfc-editor.org/rfc/rfc8594.html)\' header in the API response.** <br> It will contain a shutdown date for current API when the new version is released.<br>  ## Authentication  Some endpoints require a client ID used to fetch an authentication token.<br> This is primarily endpoints submitting data or fetching private data.<br> You can get a client ID by sending an email to <br> [regobs@nve.no](mailto:regobs@nve.no?subject=RegObs%20Client%20ID).<br> You must then fetch a token as outlined in<br> [NVE Account Authentication](https://api.nve.no/doc/nve-account-authentication/).<br> This is not necessary for simpler API queries, such as searching for observations.<br> To get a token with the swagger ui, log in by clicking on the green authorize button.<br> The `regObs_apptoken` header is a deprecated<br> form of client identification and is not necessary.<br>  ## Client library  To simplify interaction with the API we are working on a<br> Python client library. Currently it supports submitting data<br> as well as searching. It is available at<br> [https://pypi.org/project/regobslib/](https://pypi.org/project/regobslib/).<br>  ## Data Types  In order to find information on Regobs data types use the<br> GET/KDVElements method. KDVElements are used for describing an observation. If we look up GeoHazard in the response we get:<br> ``` GeoHazardKDV: [       {         Id: 0,         Name: Not specified,         Description: null       },       {         Id: 10,         Name: Snow,         Description: Avalanche       },       {         Id: 20,         Name: Soil,         Description: Earth slide       }, ] ``` The GeoHazardTID of 10 corresponds to snow. The GeoHazardTID of 20 corresponds to soil and so on.  Note that the naming of data types in the API ends with TID while the GET/KDVElements service returns data types with KDV. Otherwise the naming should be identical.  ## Example  Get the last 10 observations using python:  ```python import requests r = requests.post(\'https://api.regobs.no/v6/Search\',     data={\'NumberOfRecords\': 10},     headers={\'Content-Type\': \'application/json\'} ) data = r.json() print(len(data))  # 10 ``` 

The version of the OpenAPI document: v6

## Building

To install the required dependencies and to build the typescript sources run:

```console
npm install
npm run build
```

## Publishing

First build the package then run `npm publish dist` (don't forget to specify the `dist` folder!)

## Consuming

Navigate to the folder of your consuming project and run one of next commands.

_published:_

```console
npm install @ --save
```

_without publishing (not recommended):_

```console
npm install PATH_TO_GENERATED_PACKAGE/dist.tgz --save
```

_It's important to take the tgz file, otherwise you'll get trouble with links on windows_

_using `npm link`:_

In PATH_TO_GENERATED_PACKAGE/dist:

```console
npm link
```

In your project:

```console
npm link 
```

__Note for Windows users:__ The Angular CLI has troubles to use linked npm packages.
Please refer to this issue <https://github.com/angular/angular-cli/issues/8284> for a solution / workaround.
Published packages are not effected by this issue.

### General usage

In your Angular project:

```typescript

import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideApi } from '';

export const appConfig: ApplicationConfig = {
    providers: [
        // ...
        provideHttpClient(),
        provideApi()
    ],
};
```

**NOTE**
If you're still using `AppModule` and haven't [migrated](https://angular.dev/reference/migrations/standalone) yet, you can still import an Angular module:
```typescript
import { ApiModule } from '';
```

If different from the generated base path, during app bootstrap, you can provide the base path to your service.

```typescript
import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideApi } from '';

export const appConfig: ApplicationConfig = {
    providers: [
        // ...
        provideHttpClient(),
        provideApi('http://localhost:9999')
    ],
};
```

```typescript
// with a custom configuration
import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideApi } from '';

export const appConfig: ApplicationConfig = {
    providers: [
        // ...
        provideHttpClient(),
        provideApi({
            withCredentials: true,
            username: 'user',
            password: 'password'
        })
    ],
};
```

```typescript
// with factory building a custom configuration
import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideApi, Configuration } from '';

export const appConfig: ApplicationConfig = {
    providers: [
        // ...
        provideHttpClient(),
        {
            provide: Configuration,
            useFactory: (authService: AuthService) => new Configuration({
                    basePath: 'http://localhost:9999',
                    withCredentials: true,
                    username: authService.getUsername(),
                    password: authService.getPassword(),
            }),
            deps: [AuthService],
            multi: false
        }
    ],
};
```

### Using multiple OpenAPI files / APIs

In order to use multiple APIs generated from different OpenAPI files,
you can create an alias name when importing the modules
in order to avoid naming conflicts:

```typescript
import { provideApi as provideUserApi } from 'my-user-api-path';
import { provideApi as provideAdminApi } from 'my-admin-api-path';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
    providers: [
        // ...
        provideHttpClient(),
        provideUserApi(environment.basePath),
        provideAdminApi(environment.basePath),
    ],
};
```

### Customizing path parameter encoding

Without further customization, only [path-parameters][parameter-locations-url] of [style][style-values-url] 'simple'
and Dates for format 'date-time' are encoded correctly.

Other styles (e.g. "matrix") are not that easy to encode
and thus are best delegated to other libraries (e.g.: [@honoluluhenk/http-param-expander]).

To implement your own parameter encoding (or call another library),
pass an arrow-function or method-reference to the `encodeParam` property of the Configuration-object
(see [General Usage](#general-usage) above).

Example value for use in your Configuration-Provider:

```typescript
new Configuration({
    encodeParam: (param: Param) => myFancyParamEncoder(param),
})
```

[parameter-locations-url]: https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#parameter-locations
[style-values-url]: https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#style-values
[@honoluluhenk/http-param-expander]: https://www.npmjs.com/package/@honoluluhenk/http-param-expander
