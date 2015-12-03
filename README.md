# planet-flux-night-watch-scrapper
Using nightwatch.js to automate page interactions and save page data

## Usage
nightwatch --test tests/multiPage.js 

This command will start a nightwatch integration test targeting climate.nasa.gov/state_of_flux.
The integration test will click through all pages of the app, testing and collecting page data.
Page data is then saved to a json file for reference.
Took overnight to work through the pages..

## Goal
climate.nasa.gov has some great climate content.
Specifically http://climate.nasa.gov/state_of_flux shows some striking before/after images of global climate change related events.

I wanted to experiment with a redesign of the page with the follow goals.
-use overlapping fades for image comparisons instead of side-by-side
-use scroll events to navigate the fades between images
-use a symolic image for geographic reference, rather than google maps
-flatten the page by removing any click throughs to download images or see credits
-flatten the page by removing any click throughs to the next image, instead using a dynamic loading infinite scroll

## Constraint
The constraint is that the redesign has to be automated.
One web app in. One redesigned web app out.

## Progress
This is experimental/exploratory
Step 1 of the automated redesign was to understand and organize the relevent origional content.
Typically I would have used wget or httrack to download the page. That didn't work. Though I don't know specifically why, I have a hunch that it was to do with client-side routing and the app framework used to create the page.

To handle collecting content from the app, 
This was a great way to learn nightwatch since:
-the automated interaction sufficient to collect the relevant data meant some reasonably complex page interactions.
-the volume of interactions was high because of the number of pages visited
-the page visits had to be generated through the provided page navigation rather than through simple urls
