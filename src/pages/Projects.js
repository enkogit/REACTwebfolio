import React from 'react';
import { Link } from 'react-router-dom';

import Main from '../layouts/Main';

import Cell from '../components/Projects/Cell';
import data from '../data/projects';

const { PUBLIC_URL } = process.env;

const Projects = () => (
  <Main
    title="Projects"
    description="Learn about my projects."
  >
    <article className="post" id="projects">
      <header>
        <div className="title">
          <h2><Link to="/projects">Projects</Link></h2>
          <div className="container">
            <div className="column column-center">
              <div className="float-div">
                <img src={`${PUBLIC_URL}/images/iceberg.png`} style={{ height: '150px' }} alt="iceberg" />
              </div>
            </div>
            <div className="column column-left">
              <h4 style={{ marginTop: '50px' }}>Few projects that I&apos;m not ashamed of</h4>
            </div>
          </div>
        </div>
      </header>
      {data.map((project) => (
        <Cell
          data={project}
          key={project.title}
        />
      ))}
    </article>
  </Main>
);

export default Projects;
