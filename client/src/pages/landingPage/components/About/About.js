import './about.css';

import React from 'react';

function Card({title, subtitle, text, link1, link2}) {
  return (
    <div className="card col-md-4 shadow">
      <div className="card-body m-2">
        <h5 className="card-title bold">{title}</h5>
        <p className="card-text">{text}</p>
        <a href="#" className="card-link">{link1}</a>
        <a href="#" className="card-link">{link2}</a>
      </div>
    </div>
  )
}

function About() {
  const cardsData = [
    {
      title: "Our Mission",
      text: "Our mission is to harness the power of AI to create more efficient and effective systems for human body detection. We believe that AI has the potential to significantly improve the accuracy and speed of body detection, opening up new possibilities in various fields such as security, entertainment, sports, and more.",
    },
    {
        title: "Our Story",
        text: "Founded in 2023, our project is a groundbreaking initiative in the field of AI, specifically focusing on human body detection. We embarked on this journey with a vision to revolutionize the way human bodies are detected and analyzed, leveraging the power of AI to create innovative solutions. Our team of dedicated AI specialists, data scientists, and engineers have worked tirelessly to turn this vision into a reality.",
      },
  
    {
      title: "Our Values",
      text: "We are committed to innovation, accuracy, and privacy. We continuously strive to push the boundaries of what's possible with AI, while ensuring the highest level of accuracy in our detection systems. At the same time, we understand the importance of privacy and ensure that our systems respect and protect individual privacy. We believe that these values are key to our success and guide us in all our endeavors.",
    },
  ];

  return (
    <div className='container p-0 '>
      <div className='my-4'>
        <h1 className=''><span className='bolder'>About</span> <span className='bold'>US</span></h1>

      </div>
      <div className='row g-3 w-100 m-0'>
        {cardsData.map((card, index) => <Card key={index} {...card} />)}
      </div>
    </div>
  )
}

export default About
