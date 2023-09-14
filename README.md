Fetching the same URL inside a route handler is currently broken on edge runtime.

In [app/api/route.ts](/app/api/route.ts), we have a conditional dev hook that fetches the same URL.
This fetch is normally done via an external webhook but we don't have that in dev, so we simulate it.

The request always comes back empty though... Switching runtime to nodejs makes the fetch request come through like it should:

<img src="https://media.cleanshot.cloud/media/38032/dQli1GBC5ATrjRh5IB6MB6lU24Uc5po6cKo37ZXH.jpeg?Expires=1694747861&Signature=SyPfi9-cfh-gP4kK0DltpRm~ELEOVmGEXzT9jo2RC90XRAP5cOI4lBWHyoKoq7eg~79Qx73bjfwMgYs2M2xMSbPv-4wehzG9XUu2XaSYw9ex6KCYwKdFY5jfsA-UO3GEz0ijmJx28rdRCSevGLZOrOGH7WBx-GGQ-PMmxQzh9OjUI96y-SOHP~JCgKcGLkYQxbWSjNOpnjo8~BsYzKfTk3loLnPclaw7qocpTP-13uo65BdHw6iBvB8k6AeJCU-N1MGYZJiOl01UG1mAAexUxPkDnbm2Rx5NhCtC5QYPAP86nmD0O-iBold89AbClrqGBCtQ~XwP9iHcchr7V4cDKA__&Key-Pair-Id=K269JMAT9ZF4GZ" />
