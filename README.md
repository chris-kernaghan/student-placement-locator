## Table of contents
* [Introducton](#introduction)
* [Inspiraton](#technologies)
* [Demo](#demo)
* [Installation](#installation)
* [Bug or Feature Request](#bug-or-feature-request)
* [Technologies](#technologies)
* [Project Status](#project-status)
* [Team](#team)

## Introduction
Working as an Animal Management co-ordinator I would always have students enquiring about placement opportunities which they are required to achieve along with their studies. I also wanted to learn more about APIs and maps. This resulted in the creation of the Animal Management Placement Locator website. This provides students with a bit of information on placement, contains a working contact information section for them to contact our placement officer for any enquiries and a postcode locator and map containing currently known placement opportunities previous students have visited. This was my first real project created from scratch and really helped advance skills in frontend development. 

## Inspiration
This work was inspired by the placement co-ordinator who wanted an area for students to be able to visually see work placements on a map and provide information on each.

## Demo
Here is a working [live demo](https://chris-kernaghan.github.io/student-placement-locator/)
### Landing Page

![title page AMP](https://github.com/chris-kernaghan/student-placement-locator/assets/132615138/459be8eb-ad5c-4288-ac1e-264df8c5f878)

### Contact Form

![contact form AMP](https://github.com/chris-kernaghan/student-placement-locator/assets/132615138/d31fff12-4375-45fc-8f68-48837207212c)

### Placement Information

![about page AMP](https://github.com/chris-kernaghan/student-placement-locator/assets/132615138/02a1bb71-0172-47ba-95b7-76e44bab3788)

### Placement Map

![map AMP](https://github.com/chris-kernaghan/student-placement-locator/assets/132615138/addc7e95-8174-4158-b4c6-ba2a79979ac6)

## Installation
This project relies on the Google Maps API which you will need in order to use the map functionality. 

### Get a free API Key [here](https://developers.google.com/maps) - 
- Click on get started and follow the instructions. 
 *Note you will need to input payment details but no money will be taken.
  
### Clone the repo
```
https://github.com/chris-kernaghan/student-placement-locator.git
```

### Enter your API into the script and the bottom of the html file:
```
<script async src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_HERE&libraries=places"></script>
```

## Bug or Feature Request
*	If you find a bug, kindly open an issue [here](https://github.com/chris-kernaghan/student-placement-locator/issues) by including your search query and the expected result.
*	If you'd like to request a new function, feel free to do so by opening an issue [here](https://github.com/chris-kernaghan/student-placement-locator/issues). Please include sample code or how you would carry this out.

## Technologies
* HTML5
*	CSS3
*	JavaScript
*	JSON
*	Leaflet JS
*	Google Maps API

## Project Status

The project is currently in its first phase of development. 

### Features to come:
* Mobile responsive
* Enable links in popups to enable fast access to work placements webpages. 
* Drop down menu on map to enable placements to be sorted by type of placement e.g veterinary 
* Sign in for staff/ placement officer to carry out the following:
  * Access the current placements
  * Delete placement from list
  * Add new placements which will then show up on the map.

## Team
Chris Kernaghan






