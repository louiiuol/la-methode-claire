# HttpResource

This service integrate angular's `HttpClient` with rxjs tools to provides pre-formatted methods that can be used in any service in the application, with error handling and translated notifications associated.

## Methods

This service provides the following methods:

- `get` Retrieve one item
- `getAl` Retrieve a list of items
- `getAllPaginated` Retrieve a list of items with pagination integrated
- `create` Send POST request with given item
- `update` Replace entire item in database
- `partialUpdate` Update some properties of item in database
- `delete` Delete item in database

All these methods follow the same workflow

- Send http requests with given params
- Get result as Observable:
  - If no errors occurred, format the result as HttpOutput
  - If some error occurred, catch it (so developer wont have to), and format as HttpOutput.

To simplify usage of observable returned by requests, every return will be cast into an HttpOutput (more information about this type in tis JSDoc). This way, when calling on of these methods, developers won't have to mind catching Http errors themselves (more information in usage section).

---

## Exported types

- RequestOptions
- HttpOutput
- ApiFormErrorDetails

> Each of these types has its own JSDoc defining its purpose and usage

---

## How to use

Create http requests is very simple. Just follow these steps:

1. Create a first service that ends with `Resource` suffix.
   a. This service must implement `HttpResource` which will provides all methods needed to perform requests
   b. Add property `resource` with value corresponding to the API resource you want to target (users, videos, ...)
   c. You can now easily create requests based on your need (You can customize the behavior of all requests, more information
   in `RequestOptions` documentation )
2. Note that your service's methods all returns same HttpOutput (more information in interface's documentation)
3. You can now create a second service that will consume methods you just created, but add some custom logic (state management ...)
4. Call the observable directly from your component's template

---
