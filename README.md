# ig.news

This is a JAMStack application. In other words, this application doesn't have a "traditional" backend. It uses thirdy party services, such as [Stripe](https://stripe.com/en-br), 
[Github OAuth](https://github.com/settings/developers), [FaunaDB](https://fauna.com/), [Prismic CMS](https://prismic.io/), to retrieve and store user data.

## What is this app about?

This is an app about the React.js ecosystem. You can register for the app for free using your Github account and view the list of posts or a preview of posted content. 
To read the full post, you need an active subscription.

## Tech used

- Next.js / TypeScript (front-end) 👨‍💻
- Stripe (for payment processing) 💸
- Github OAuth (for authentication/authorization) 🔐
- FaunaDB (for data storage) 📁
- Prismic CMS (for generating content) 📃

This app also makes use of SSR, SSG. The former is used for pages that depend on user data and the latter is used to cache some pages for faster loads.
