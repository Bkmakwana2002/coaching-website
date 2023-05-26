import React from 'react'
import { Link } from 'react-router-dom';

function Card(props) {

      const Icon = props.iconName;
      const iconClassName = `mb-3 w-20 h-20 relative bottom-10 rounded-full shadow-lg ${props.bgColor}`;

  return (
    <div className="pt-24 my-4 w-9/12 md:w-1/4 justify-center items-center flex flex-col mx-auto">
        
        <div className="px-4 w-full border-black bg-white rounded-lg hover:drop-shadow-2xl ring-offset-transparent ring-black shadow-md dark:bg-sky-500 dark:border-gray-700">
          
        <div className="flex flex-col items-center pb-10">
          
          <Icon className={iconClassName}/>
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{props.title}</h5>
          <span className="text-sm text-white font-lato dark:text-white">{props.content}</span>

          <div className="flex mt-4 space-x-3 md:mt-6">
            <Link to="/" className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-orange-500 rounded-full hover:bg-orange-300 focus:ring-2 focus:outline-none focus:ring-blue-300 dark:bg-orange-500 dark:hover:bg-orange-700 dark:focus:ring-white-800 font-lato">Read More</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card;