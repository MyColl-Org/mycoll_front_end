import React from 'react';

import './About.scss';
import tmdbLogo from './img/tmdb_logo_blue.png';
import githubLogo from './img/github_logo.png';
import linkedinLogo from './img/linkedin_logo.png';


class About extends React.Component {
  render() {
    return (
      <div className="about">
        <h2>About <span className="mycoll-logo">MyColl</span></h2>
        <ProjectInfo />
        <MyInfo />
        <DataSources />
      </div>
    )
  }
}


class ProjectInfo extends React.Component {
  render() {
    return (
      <div className="project-info">
        <h3>Project Info:</h3>
        <p>The motivation behind building MyColl was sparked at a thrift store. While digging through used DVDs, Skyler often struggled to remember which movies he already posessed. Though many may not be digging around for old DVDs, Skyler knew there was need for a solution that would put easy access to a catalog of one's collection in your pocket.</p>
        <p>With the ability to purchase media in multiple formats from an endless array of sources, it becomes difficult to sort out our physical and digital collections. MyColl attempts to make cataloging those collections easier through a simple, clean web interface that helps keep track of the media you own and where to access it.</p>
      </div>
    );
  }
}


class MyInfo extends React.Component {
  render() {
    return (
      <div className="my-info">
        <h3>Developer & Architecture:</h3>
        <p>Skyler Burger is a software developer with experience in developing Python and Javascript web applications. With a background in office administration and technical theater, he is equipped with a love of art and the desire to organize anything related to it.</p>
        <p>The MyColl service is composed of a React front-end application, a Django back-end server, and a PostgreSQL database. The front and back end services are both deployed within a shared Digital Ocean Droplet and accessed with a shared domain to keep this hobby-level project manageable. For more information regarding the architecture of the project, please check out the <a href="https://www.github.com/skylerburger/mycoll" target="_blank" rel="noopener noreferrer">MyColl Org on GitHub</a>.</p>
        <div className="links">
          <a href="https://www.github.com/skylerburger" rel="noopener noreferrer" target="_blank">
            <img src={githubLogo} alt="GitHub Logo" className="social-logo" />
          </a>
          <a href="https://www.linkedin.com/in/skylerburger" rel="noopener noreferrer" target="_blank">
            <img src={linkedinLogo} alt="LinkedIn Logo" className="social-logo" />
          </a>
        </div>
      </div>
    );
  }
}


class DataSources extends React.Component {
  render() {
    return (
      <div className="data-sources">
        <h3>Data Sources:</h3>
        <p>This product uses the TMDb API but is not endorsed or certified by TMDb. Data and images gathered through the search function are sourced from TMDb.</p>
        <div className="links">
          <a href="https://www.themoviedb.org/documentation/api" rel="noopener noreferrer" target="_blank">
            <img src={tmdbLogo} alt="The Movie Database Logo" className="tmdb-logo" />
          </a>
        </div>
      </div>
    )
  }
}

export default About;
