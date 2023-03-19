[![Netlify Status](https://api.netlify.com/api/v1/badges/670b5591-c98f-45ec-8c2a-996d729f31c2/deploy-status)](https://hubble30.netlify.app)

# What did Hubble see on your birthday?
Recently, NASA published [a page](https://www.nasa.gov/content/goddard/what-did-hubble-see-on-your-birthday) to celebrate the 30th flying year of [Hubble Space Telescope](https://hubblesite.org) (HST) since 24 April 1990. Visitors can input their date of birth and see what photo has been taken by HST on that day. After trying this, I am inspired to make my own, apart from core features it is going to have enhancements in terms of appearance and usability compared to the original site.

[This](https://imagine.gsfc.nasa.gov/hst_bday) is the actual site which is `iframe`’d on the NASA’s page. [Original data set](https://imagine.gsfc.nasa.gov/hst_bday/data.csv) is converted to JSON by the site, I took it and [modified its structure](/lambda/db.js) to fit into this project.
