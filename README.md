# SCD Hub Website via Hugo / vanilla js / Datocms / Netlify

# stripe api integration in the works


* content managed on datocms.com

* hugo code generator

* code versioned on github.com, 

* built via netlify.com


customized template removing sidebar navigation interaction in sass

This repo contains a working static website written with [Hugo](http://gohugo.io/), integrated with content coming from DatoCMS.

You can check the [live version deployed on Netlify](https://portfolio-datocms-hugo.netlify.com/), that looks like this:

![Screenshot of the porfolio website](./screenshot.png)

or you can deploy your own, together with the administrative area, with this button:



  {{ range (where .Paginator.Pages "Type" "services") }}
    <div class="showcase__item">
      <figure class="card">
          <img src="{{ .Params.coverimage }}">
        <figcaption class="card__caption">
          <h6 class="card__title">{{ .Title }}
          </h6>
          <div class="card__description">
            <p>{{ .Params.excerpt }}</p>
          </div>
        </figcaption>
      </figure>
    </div>
  {{ end }}
</div>



[![Deploy with DatoCMS](https://dashboard.datocms.com/deploy/button.svg)](https://dashboard.datocms.com/projects/new-from-template/static-website/hugo-portfolio)


## Usage

First, install the dependencies of this project:

```
npm install
```

Add an `.env` file containing the read-only API token of your DatoCMS site:
Get your API token free at https://datocms.com

```
echo 'DATO_API_TOKEN=abc123' >> .env
```

Then, to run this website in development mode (with live-reload):

```
npm start
```

To build the final, production ready static website:

```
npm run build
```

The final result will be saved in the `public` directory.

## About

The goal of this project is to show how easily you can create static sites using the content (text, images, links, etc.) stored on [DatoCMS](https://www.datocms.com). This project is configured to fetch data from a specific administrative area using [the API DatoCMS provides](https://www.datocms.com/docs/content-management-api).

This websites uses:

* [Yarn](https://yarnpkg.com/) as package manager;
* [Webpack](https://webpack.github.io/) to compile and bundle assets (Sass/ES2015 JS);
* [datocms-client](https://github.com/datocms/js-datocms-client) to integrate the website with DatoCMS.

## The `dato.config.js` file

To convert the content stored on DatoCMS into local Markdown files that can be digested by Hugo, the datocms-client plugin requires an explicit mapping file called [`dato.config.js`](https://github.com/datocms/hugo-portfolio/blob/master/dato.config.js). You can read more about the commands available in this file [in the official documentation](https://docs.datocms.com/hugo/overview.html).

--
layout / index.html
--

<code>
/*
        <! a href="{{ .Permalink }}" class="card__image">
        <! /a>
            <! a href="{{ .Permalink }}"><! /a>
*/
</code>

--
layout snippets
--

    <div class="showcase__item">
      <figure class="card" style="
             visibility:none; 
             display: flex; 
             flex-grow: 1;
             padding: 2rem;
             overflow-y: scroll;
             display: flex;
             flex-wrap: wrap;
             justify-content: space-around;
      ">
      </figure>
    </div>

