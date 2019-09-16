# "Cookie Bouncer" web service
App Engine service that creates a POST API endpoint. The endpoint digests a JSON payload instructing what type of cookies to build into the `Set-Cookie` header.

# Why?
Safari's Intelligent Tracking Prevention caps the expiration of JavaScript cookies to max. 7 days. This is an inconvenience to first-party web analytics, which relies on persistent browser cookies for stitching together hits from a single web browser.

# How?
The point of the web service is to offer an API that sets cookies in the `Set-Cookie` HTTP response header. This alone wouldn't be very useful, as these headers would be ineffective due to being sent cross-origin.

However, you can set up a [custom domain mapping](https://cloud.google.com/appengine/docs/standard/python/mapping-custom-domains) to the Google App Engine endpoint, which effectively lets you service this API in your own domain namespace. Thus any cookies sent with the `Set-Cookie` header are treated as first-party cookies by the browser.

# Instructions
Guide: https://www.simoahava.com/google-cloud/create-cookie-rewrite-web-service-google-cloud/

Video: https://youtu.be/cmRrSeR51tc
