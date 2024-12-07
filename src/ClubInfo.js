import React from 'react';
import './ClubInfo.css';

const ClubInfo = () => {
  // Members data
  const members = [
    {
      name: "Dharanidharan",
      photo: "/Members/member1.jpg",
      quote: "Photography is the story I fail to put into words.",
      instagram: "@this_is_dharanidharan",
      instaLink: "https://www.instagram.com/this_is_dharanidharan",
    }
  ];

  return (
    <div className="club-info-container">
      {/* Heading */}
      <h1>Meet Our Club Members</h1>

      {/* Intro Text */}
      <p className="intro-text">
        Our team of passionate photographers is dedicated to capturing the world’s beauty one frame at a time. Get to know them!
      </p>

      {/* Members Grid */}
      <div className="members-grid">
        {members.map((member) => (
          <div className="member-card" key={member.name}>
            <img src={member.photo} alt={`${member.name}'s photo`} className="member-photo" />
            <h3 className="member-name">{member.name}</h3>
            <p className="member-quote">"{member.quote}"</p>
            <a href={member.instaLink} target="_blank" rel="noopener noreferrer" className="insta-link">
              {member.instagram}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClubInfo;
