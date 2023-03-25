[![Netlify Status](https://api.netlify.com/api/v1/badges/670b5591-c98f-45ec-8c2a-996d729f31c2/deploy-status)](https://hubble30.netlify.app)

# What did Hubble see on your birthday?
In 2020, NASA [celebrated the 30th year in space](https://www.nasa.gov/content/goddard/what-did-hubble-see-on-your-birthday) of [Hubble Space Telescope](https://hubblesite.org) (HST) since 24 April 1990. As part of the celebration, visitors can enter their date of birth and view the stunning photograph captured by the HST on that day. While exploring this feature, I was inspired to create my own version of it. My re-designed tool does not only include the core features of the original site but also has significant improvements in terms of appearance and usability.

[This is the original site](https://imagine.gsfc.nasa.gov/hst_bday) that is embedded on NASA’s page. The site utilises [a data set](https://imagine.gsfc.nasa.gov/hst_bday/data.csv) and converts it to JSON format, which I then [modified the data](/lambda/db.js) to better suit the needs of this project.
