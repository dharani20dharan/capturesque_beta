import React from 'react';
import './ClubInfo.css';

const ClubInfo = () => {
  // Club Heads
  const clubHeads = [
    {
      name: "Dharanidharan",
      photo: "/Members/member1.jpg",
      quote: "Photography is the story I fail to put into words.",
      instagram: "@this_is_dharanidharan",
      instaLink: "https://www.instagram.com/this_is_dharanidharan",
    },
    {
      name: "Another Club Head",
      photo: "/Members/clubhead2.jpg",
      quote: "Every picture tells a story, let's capture it.",
      instagram: "@another_clubhead",
      instaLink: "https://www.instagram.com/another_clubhead",
    },
  ];

  // Core Committee Members
  const coreCommittee = [
    { name: "Dharanidharan",
      photo: "/Members/member1.jpg",
      quote: "Photography is the story I fail to put into words.",
      instagram: "@this_is_dharanidharan",
      instaLink: "https://www.instagram.com/this_is_dharanidharan"},
    { name: "Core Member 2", photo: "/Members/core2.jpg", quote: "A picture is worth a thousand words.", instagram: "@core2", instaLink: "https://www.instagram.com/core2" },
    { name: "Core Member 3", photo: "/Members/core3.jpg", quote: "Finding beauty in the ordinary.", instagram: "@core3", instaLink: "https://www.instagram.com/core3" },
    { name: "Core Member 4", photo: "/Members/core4.jpg", quote: "Moments captured, memories preserved.", instagram: "@core4", instaLink: "https://www.instagram.com/core4" },
    { name: "Core Member 5", photo: "/Members/core5.jpg", quote: "Chasing light, capturing life.", instagram: "@core5", instaLink: "https://www.instagram.com/core5" },
    { name: "Core Member 6", photo: "/Members/core6.jpg", quote: "Through the lens, we see the world differently.", instagram: "@core6", instaLink: "https://www.instagram.com/core6" },
  ];

  // POC Members
  const pocMembers = [
    { name: "Dharanidharan",
      photo: "/Members/member1.jpg",
      quote: "Photography is the story I fail to put into words.",
      instagram: "@this_is_dharanidharan",
      instaLink: "https://www.instagram.com/this_is_dharanidharan"},
    { name: "POC Member 1", photo: "/Members/poc1.jpg", instagram: "@poc1", instaLink: "https://www.instagram.com/poc1" },
    { name: "POC Member 2", photo: "/Members/poc2.jpg", instagram: "@poc2", instaLink: "https://www.instagram.com/poc2" },
    { name: "POC Member 3", photo: "/Members/poc3.jpg", instagram: "@poc3", instaLink: "https://www.instagram.com/poc3" },
    { name: "POC Member 4", photo: "/Members/poc4.jpg", instagram: "@poc4", instaLink: "https://www.instagram.com/poc4" },
    { name: "POC Member 5", photo: "/Members/poc5.jpg", instagram: "@poc5", instaLink: "https://www.instagram.com/poc5" },
    { name: "POC Member 6", photo: "/Members/poc6.jpg", instagram: "@poc6", instaLink: "https://www.instagram.com/poc6" },
    { name: "POC Member 7", photo: "/Members/poc7.jpg", instagram: "@poc7", instaLink: "https://www.instagram.com/poc7" },
    { name: "POC Member 8", photo: "/Members/poc8.jpg", instagram: "@poc8", instaLink: "https://www.instagram.com/poc8" },
    { name: "POC Member 9", photo: "/Members/poc9.jpg", instagram: "@poc9", instaLink: "https://www.instagram.com/poc9" },
    { name: "POC Member 10", photo: "/Members/poc10.jpg", instagram: "@poc10", instaLink: "https://www.instagram.com/poc10" },
  ];

  // Reusable component to render members
  const MemberGrid = ({ title, members }) => (
    <div className="section">
      <h2>{title}</h2>
      <div className="members-grid">
        {members.map((member) => (
          <div className="member-card" key={member.name}>
            <img src={member.photo} alt={`${member.name}`} className="member-photo" />
            <h3 className="member-name">{member.name}</h3>
            {member.quote && <p className="member-quote">"{member.quote}"</p>}
            <a href={member.instaLink} target="_blank" rel="noopener noreferrer" className="insta-link">
              {member.instagram}
            </a>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="club-info-container">
      <h1>Meet Our Club Members</h1>
      <p className="intro-text">
        Our photography club is a collective of passionate individuals who see the world through a unique lens.
      </p>

      {/* Render Each Section */}
      <MemberGrid title="📸 Club Heads" members={clubHeads} />
      <MemberGrid title="🌟 Core Committee" members={coreCommittee} />
      <MemberGrid title="🎯 POC Members" members={pocMembers} />
    </div>
  );
};

export default ClubInfo;
