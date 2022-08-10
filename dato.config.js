const htmlTag = require('html-tag');

// This function helps transforming structures like:
//
// [{ tagName: 'meta', attributes: { name: 'description', content: 'foobar' } }]
//
// into proper HTML tags:
//
// <meta name="description" content="foobar" />

const toHtml = (tags) => (
  tags.map(({ tagName, attributes, content }) => (
    htmlTag(tagName, attributes, content)
  )).join("")
);

// Arguments that will receive the mapping function:
//
// * dato: lets you easily access any content stored in your DatoCMS
//   administrative area;
//
// * root: represents the root of your project, and exposes commands to
//   easily create local files/directories;
//
// * i18n: allows to switch the current locale to get back content in
//   alternative locales from the first argument.
//
// Read all the details here:
// https://github.com/datocms/js-datocms-client/blob/master/docs/dato-cli.md

module.exports = (dato, root, i18n) => {

  // Add to the existing Hugo config files some properties coming from data
  // stored on DatoCMS
  ['config.dev.toml', 'config.prod.toml'].forEach(file => {
    root.addToDataFile(file, 'toml', {
      title: dato.site.globalSeo.siteName,
      languageCode: i18n.locale
    });
  });

  // Create a YAML data file to store global data about the site
  root.createDataFile('data/settings.yml', 'yaml', {
    name: dato.site.globalSeo.siteName,
    language: dato.site.locales[0],
    intro: dato.home.introText,
    footer1: dato.home.footer1,
    footer_medalions: dato.home.footer_medalions,
    detailImage: dato.home.detailImage.url({ w: 600, fm: 'jpg', auto: 'compress' }),
    extraImages: dato.home.gallery.map(item => {
      return {
            url: item.url({ h: 300, fm: 'jpg', auto: 'compress' })
      }}),   
    copyright: dato.home.copyright,
    // iterate over all the `social_profile` item types
    socialProfiles: dato.socialProfiles.map(profile => {
      return {
        type: profile.profileType.toLowerCase().replace(/ +/, '-'),
        url: profile.url,
      };
    }),
    faviconMetaTags: toHtml(dato.site.faviconMetaTags),
    seoMetaTags: toHtml(dato.home.seoMetaTags)

  });

  // Create a markdown file with content coming from the `about_page` item
  // type stored in DatoCMS
  root.createPost(`content/about.md`, 'yaml', {
    frontmatter: {
      title: dato.aboutPage.title,
      subtitle: dato.aboutPage.subtitle,
      photo: dato.aboutPage.photo.url({ w: 800, fm: 'jpg', auto: 'compress' }),
      seoMetaTags: toHtml(dato.aboutPage.seoMetaTags),
      menu: { main: { weight: 100 } }
    },
    content: dato.aboutPage.bio
  });


  // Create a markdown file with content coming from the `about_page` item
  // type stored in DatoCMS
  root.createPost(`content/donate.md`, 'yaml', {
    frontmatter: {
      title: dato.donatePage.title,
      subtitle: dato.donatePage.subtitle,
      photo: dato.donatePage.photo.url({ w: 800, fm: 'jpg', auto: 'compress' }),
      seoMetaTags: toHtml(dato.donatePage.seoMetaTags),
      menu: { main: { weight: 100 } }
    },
    content: dato.donatePage.content
  });
  
  
  
  // Create a markdown file with content coming from the `about_page` item
  // type stored in DatoCMS
  root.createPost(`content/donate_scdhub.md`, 'yaml', {
    frontmatter: {
      title: dato.donateScdhub.title,
      subtitle: dato.donateScdhub.subtitle,
      seoMetaTags: toHtml(dato.donateScdhub.seoMetaTags),
      menu: { main: { weight: 100 } }
    },
    content: dato.donateScdhub.content
  });

    // Create a markdown file with content coming from the `about_page` item
  // type stored in DatoCMS
  root.createPost(`content/newsletter.md`, 'yaml', {
    frontmatter: {
      title: dato.newsletterPage.title,
      subtitle: dato.newsletterPage.subtitle,
      photo: dato.newsletterPage.photo.url({ w: 800, fm: 'jpg', auto: 'compress' }),
      seoMetaTags: toHtml(dato.newsletterPage.seoMetaTags),
      menu: { main: { weight: 100 } }
    },
    content: dato.newsletterPage.content
  });
  
  // Create a markdown file with content coming from the `ecoopsapp` item
  // type stored in DatoCMS
  root.createPost(`content/ecoopsapp.md`, 'yaml', {
    frontmatter: {
      title: dato.ecoopsappPage.title,
      subtitle: dato.ecoopsappPage.subtitle,
      photo: dato.ecoopsappPage.photo.url({ w: 800, fm: 'webp', auto: 'compress' }),
      seoMetaTags: toHtml(dato.ecoopsappPage.seoMetaTags),
      menu: { main: { weight: 100 } }
    },
    content: dato.ecoopsappPage.content
  });
  
  

  
  // Create a markdown file with content coming from the `about_page` item
  // type stored in DatoCMS
  root.createPost(`content/contact.md`, 'yaml', {
    frontmatter: {
      title: dato.contactPage.title,
      subtitle: dato.contactPage.subtitle,
      photo: dato.contactPage.photo.url({ w: 800, fm: 'jpg', auto: 'compress' }),
      seoMetaTags: toHtml(dato.contactPage.seoMetaTags),
      menu: { main: { weight: 101 } }
    },
    content: dato.contactPage.content
  });

  
  
  
  
    // Create a `service` directory (or empty it if already exists)...
  root.directory('content/blog', dir => {
    // ...and for each of the services stored online...
    dato.blogs.forEach((blog, index) => {
      // ...create a markdown file with all the metadata in the frontmatter
      dir.createPost(`${blog.slug}.md`, 'yaml', {
        frontmatter: {
          title: blog.title,
          coverImage: blog.coverImage.url({ w: 635, fm: 'webp', auto: 'compress' }),
          image: blog.coverImage.url({ fm: 'jpg', auto: 'compress' }),
          detailImage: blog.coverImage.url({ w: 600, fm: 'jpg', auto: 'compress' }),
          excerpt: blog.excerpt,
          seoMetaTags: toHtml(blog.seoMetaTags),
          extraImages: blog.gallery.map(item =>
            item.url({ h: 300, fm: 'jpg', auto: 'compress' })
          ),
          weight: index
        },
        content: blog.description
      });
    });
  });
  
  
  
  
  
  
  // Create a `service` directory (or empty it if already exists)...
  root.directory('content/services', dir => {
    // ...and for each of the services stored online...
    dato.services.forEach((service, index) => {
      // ...create a markdown file with all the metadata in the frontmatter
      dir.createPost(`${service.slug}.md`, 'yaml', {
        frontmatter: {
          title: service.title,
          coverImage: service.coverImage.url({ w: 635, fm: 'webp', auto: 'compress' }),
          image: service.coverImage.url({ fm: 'jpg', auto: 'compress' }),
          detailImage: service.coverImage.url({ w: 600, fm: 'webp', auto: 'compress' }),
          excerpt: service.excerpt,
          seoMetaTags: toHtml(service.seoMetaTags),
          extraImages: service.gallery.map(item =>
            item.url({ h: 300, fm: 'webp', auto: 'compress' })
          ),
          weight: index
        },
        content: service.description
      });
    });
  });




  // Create a `work` directory (or empty it if already exists)...
  root.directory('content/works', dir => {
    // ...and for each of the works stored online...
    dato.works.forEach((work, index) => {
      // ...create a markdown file with all the metadata in the frontmatter
      dir.createPost(`${work.slug}.md`, 'yaml', {
        frontmatter: {
          title: work.title,
          coverImage: work.coverImage.url({ w: 450, fm: 'webp', auto: 'compress' }),
          image: work.coverImage.url({ fm: 'jpg', auto: 'compress' }),
          detailImage: work.coverImage.url({ w: 600, fm: 'webp', auto: 'compress' }),
          excerpt: work.excerpt,
          seoMetaTags: toHtml(work.seoMetaTags),
          extraImages: work.gallery.map(item =>
            item.url({ h: 300, fm: 'webp', auto: 'compress' })
          ),
          weight: index
        },
        content: work.description
      });
    });
  });
};



