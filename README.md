<!-- This README was created based on the example here: https://github.com/othneildrew/Best-README-Template/ -->
<a id="readme-top"></a>

<!-- PROJECT SHIELDS -->

[![Stargazers][stars-shield]][stars-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/meganlt/prime-solo-project">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">BorrowBurrow</h3>

  <p align="center">
    A simple social platform to enable in-person borrowing & lending of craft supplies, media, or anything else useful to your friends.
    <br />
    <a href="https://github.com/meganlt/prime-solo-project"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <!-- <a href="https://github.com/meganlt/prime-solo-project">View Demo</a>
    &middot; -->
    <a href="https://github.com/meganlt/prime-solo-project/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    &middot;
    <a href="https://github.com/meganlt/prime-solo-project/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](./public/img/feature-preview.gif)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

* [![Node][Node.js]][node-url]
* [![React][React.js]][react-url]
* [![Zustand][Zustand]][zustand-url]
* [![PostgreSQL][postgresql]][postgresql-url]
* [![Material-UI][material-ui]][material-ui-url]
* [![Express][express.js]][express-url]
* [![React-Router][react-router]][react-router-url]
* [![NPM][npm]][npm-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

To get your own version of BorrowBurrow running, follow the steps below in this section.

### Prerequisites

1. Make sure you have node and npm installed on your machine.

* npm
  ```sh
  npm install npm@latest -g
  ```

2. Setup an account on [Amazon Web Services](https://aws.amazon.com/) to utilize photo upload and storage

3. Setup a PUBLIC BUCKET on Amazon S3, and a user (via IAM) with the appropriate privileges to read & write to this bucket.

### Create Database and Required Tables

Create a new PostgreSQL database on your local machine, then create the `user`, `items`, and `requests` tables using the queries found in `database.sql`.

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/meganlt/prime-solo-project.git
   ```
2. Install all required NPM packages
   ```sh
   npm install
   ```
3. Create an '.env' file in the project root. This will hold your secret key for auth, as well as keys for Amazon Web Services. Replace `superDuperSecret` with a random string like `25POUbVtx6RKVNWszd9ERB9Bb6` to keep your application secure. Visit [Password Generator Plus](https://passwordsgenerator.net) for assistance in generating a proper string. 

   ```js
    SERVER_SESSION_SECRET=superDuperSecret
    AWS_ACCESS_KEY_ID='ENTER YOUR AWS ACCESS KEY ID HERE'
    AWS_SECRET_ACCESS_KEY='ENTER YOUR AWS SECRET ACCESS KEY HERE'
    AWS_REGION='ENTER YOUR AWS REGION HERE'
    AWS_BUCKET_NAME='ENTER YOUR AWS BUCKET NAME HERE'
   ```

4. Run `npm run server` to start the server.
5. Run `npm run client` to start the client.
6. Navigate to `localhost:5173` to view the site.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->
## Usage

* This application is currently designed to be used for a small community of people who know each other in real life, and are able to trade items with one another, but it could also be applied to digital goods for a community of users who communicate online.
* Create a user and login to keep track of all your unused craft supplies or media
* Add additional queries or utilize the database to view what items are most frequently traded.
* Gain a better understanding of items you borrow frequently, in order to decide if purchasing your own version of that item might suit your needs.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->
## Roadmap

* [ ] Add admin panel to manage forest information, members, and items
* [ ] Add ability to hold mutliple communities, each with an admin.
* [ ] Add user profile pages
* [ ] Scale item info to include section for users to update with completed projects using that item
* [ ] Scale AWS usage to allow for mutliple images for an item, and possibly other file-types for product manuals

See the [open issues](https://github.com/meganlt/prime-solo-project/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the project_license. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Megan Tegeder - [LinkedIn][linkedin-url]

Project Link: [https://github.com/meganlt/prime-solo-project](https://github.com/meganlt/prime-solo-project)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments
First, I'd like to thank my husband, Dustin, for the support, hand-delivered dinners, and much needed flying-dinosaur wrangling necessary during my courses at Prime and long coding sessions. I'd also like to thank my fellow classmates in the North Cascades cohort. We went through a lot with a merge, and still never hesitated to help one another! I'd also like to thank our instructor, Dev, and T.A. Marc, and Carlos from the part-time office hours.

* Logo created with the Google font Darumadrop One, available here: [Darumadrop One](https://fonts.google.com/specimen/Darumadrop+One)
* Background "firefly" animation customized from code provided here: []()
* Background "noise" pattern customized from code here:[]()

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/meganlt/prime-solo-project.svg?style=for-the-badge
[contributors-url]: https://github.com/meganlt/prime-solo-project/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/meganlt/prime-solo-project.svg?style=for-the-badge
[forks-url]: https://github.com/meganlt/prime-solo-project/network/members
[stars-shield]: https://img.shields.io/github/stars/meganlt/prime-solo-project.svg?style=for-the-badge
[stars-url]: https://github.com/meganlt/prime-solo-project/stargazers
[issues-shield]: https://img.shields.io/github/issues/meganlt/prime-solo-project.svg?style=for-the-badge
[issues-url]: https://github.com/meganlt/prime-solo-project/issues
[license-shield]: https://img.shields.io/github/license/meganlt/prime-solo-project.svg?style=for-the-badge
[license-url]: https://github.com/meganlt/prime-solo-project/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/megantegeder

[product-screenshot]: public/img/feature-preview.gif

[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[postgresql]: https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white
[postgresql-url]: https://www.postgresql.org/
[material-ui]: https://img.shields.io/badge/Material%20UI-007FFF?style=for-the-badge&logo=mui&logoColor=white
[material-ui-url]: https://mui.com/
[node.js]: https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white
[node-url]: https://nodejs.org/en/
[express.js]: https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white
[express-url]: https://expressjs.com/
[npm]: https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white
[npm-url]: https://www.npmjs.com
[react-router]: https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white
[react-router-url]: https://react-router.js.org/
[zustand]: https://img.shields.io/badge/Zustand-purple?style=for-the-badge&logo=react&logoColor=white
[zustand-url]: https://github.com/pmndrs/zustand