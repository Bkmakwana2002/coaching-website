import React from 'react'
import Card from './Coursecard';
import {FcBusinesswoman} from 'react-icons/fc';
import { GiCaduceus, GiBrain } from 'react-icons/gi';

function Hero() {

  const CardInfo = [
    {
      'title':'IIT-JEE',
      'content':'Courses for JEE Main and Advanced',
      'iconName':FcBusinesswoman,
      'bgColor': 'bg-red-300'
    },
    {
      'title':'NEET',
      'content':'Courses for NEET',
      'iconName':GiCaduceus,
      'bgColor': 'bg-white'
    }
    // {
    //   'title':'Foundation',
    //   'content':'Courses for NTSE and Olympiads',
    //   'iconName':GiBrain,
    //   'bgColor': 'bg-white'
    // }

  ];

  return (
    <div className='flex flex-col md:flex-row mt-4'>
      {
      CardInfo.map((cardItem, index)=>(
        <Card title={cardItem.title} key={index} content={cardItem.content} iconName = {cardItem.iconName} bgColor = {cardItem.bgColor} />
      ))
      }
    </div>
  );
}

export default Hero;