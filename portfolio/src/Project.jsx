import React from 'react';

const Project = ({ title, description, imageUrl, technologies }) => {
  return (
    <div className="project-card">
      <img src={imageUrl} alt={title} className="project-image" />
      <div className="project-info">
        <h3>{title}</h3>
        <p>{description}</p>
        <div className="technologies">
          {technologies.map((tech, index) => (
            <span key={index} className="tech-tag">{tech}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Project;

const ProjectGroup = ({ projects }) => {
  return (
    <div className="project-group">
      {projects.map((project, index) => (
        <Project key={index} {...project} />
      ))}
    </div>
  );
};

export { ProjectGroup };
