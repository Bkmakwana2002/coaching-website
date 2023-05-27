import React, { useEffect, useState } from 'react';
import shortid from 'shortid';
function Director() {

  const [images, setImages]=useState([]);
  const[error, setError]=useState("Loading...")

  useEffect(()=>{
    const getData = async(e)=>{
  
      
      fetch('http://localhost:5000/api/images/get-teacher-images', {
          method:'get',
          headers:{
              'Content-Type':'application/json'
          }
      }).then((response)=>{
          response.json().then((data)=>{

            if(data.length===0){
              setImages(null);
              setError("Something went wrong loading the teacher images");
              return;
            }
            setImages(data);
          })
      })
    }

    getData();
  }, [])

  return (
        <section className="text-gray-600 body-font">

          {
            images ? (
              <div>

                <div className="container px-5 py-4 mx-auto">
                  <div className="flex flex-col text-center w-full mb-8 justify-center items-center">
                      <h1 className="border-b-2 text-center w-2/3 border-blue-700 py-2 mx-auto text-4xl md:text-6xl font-medium title-font mb-4 text-black">Our Directors</h1>
                  </div>
                  <div className="flex flex-wrap -m-4">

                    <div className="lg:w-1/2 lg:mb-0 mb-6 mx-auto p-4">

                      <div className="h-full text-center ">
                        <img alt="testimonial" className="md:w-96 sm:w-72 sm:h-72 md:h-96 mb-8 object-cover object-top hover:-translate-y-3 ease-in duration-300 p-1 mx-auto inline-block border-2 border-gray-200 bg-gray-300" src="../images/pradeep.jpeg" />
                        <h2 className="text-gray-900 font-medium title-font tracking-wider text-sm">PRADEEP PRAJAPATI</h2>
                        <p className="text-gray-500">Managing Director</p>
                        <span className="inline-block h-1 w-10 rounded bg-indigo-500 mt-6 mb-4" />
                      </div>

                    </div>

                    <div className="lg:w-1/2 lg:mb-0 mb-6 p-4 mx-auto">
                      <div className="h-full text-center">
                        <img alt="testimonial" className="md:w-96 sm:w-72 sm:h-72 md:h-96 mb-8 object-cover object-top hover:-translate-y-3 ease-in duration-300 p-1 inline-block  bg-gray-300" src="../images/chetna.jpeg" />
                        <h2 className="text-gray-900 font-medium title-font tracking-wider text-sm">CHETNA</h2>
                        <p className="text-gray-500">Academic Director</p>
                        <span className="inline-block h-1 w-10 rounded bg-indigo-500 mt-6 mb-4" />
                      </div>
                    </div>

                  </div>

                </div>

                <div className="container px-5 py-4 mx-auto">
                  <div className="flex flex-col text-center w-full mb-8">
                      <h1 className="border-b-2 border-orange-500 w-2/3 py-2 mx-auto text-4xl md:text-6xl font-medium title-font mb-4 text-black">Our Teachers</h1>
                  </div>

                  <div className="flex flex-col lg:grid-cols-3 lg:mx-4 lg:grid gap-4 justify-center items-center">

                    {
                      images.map((image, index)=>(
                        <div key={shortid.generate()} className="lg:w-4/5 lg:mb-0 mb-6 mx-auto p-4">

                          <div className="h-full text-center ">
                            <img alt="testimonial" className="md:w-96 w-full sm:w-72 sm:h-72 md:h-96 mb-8 object-cover object-top hover:-translate-y-3 ease-in duration-300 p-1 mx-auto inline-block border-2 border-gray-200 bg-gray-300" src={image.url} />
                            <div className='flex flex-col'>
                              <h2 className="text-gray-900 font-medium title-font tracking-wider text-sm">{image.tName}</h2>
                              <h2 className="text-gray-900 font-medium title-font tracking-wider text-sm">Exp: {image.exp} years</h2>
                            </div>
                            <span className="inline-block h-1 w-10 rounded bg-indigo-500 mt-2 mb-4" />
                          </div>

                        </div>
                      ))
                    }

                  </div>

                  <div>
                        <p className="leading-relaxed font-lato w-11/12 mx-auto">Dear students, 
                        Welcome to Vulture Institute 

                        We would like to communicate our appreciation for your belief instilled in Vulture.
                        Your faith in us has made VULTURE INSTITUTE the fastest growing and best coaching
                        institute for JEE , NEET , NTSE and Olympiads preparation in Narnaul.

                        We believe that in order to excel and to improve the quality of education on a consistent basis.
                        It is required to persistently seek and adopt innovative methods. Hence, we at vulture institute are constantly
                        putting in our efforts to transfer the knowledge of our esteemed faculty members to the young minds who have accepted the 
                        challenge to produce the brightest technocrats and medicos of the country. The excellent teaching standards at vulture spur us to pursue
                        relentless excellence.

                        We assure you that your time at vulture institute is going to be the most pleasant experience over our success lies in your accomplishment.

                        Wishing you all the best for your future endeavours
                        Sincerely,
                        Pradeep and Chetna
                      </p>
                  </div>

                </div>

              </div>
            ):
            (
              <p>
                {error}
              </p>
            )
          }



        
      </section>
    

  );
}

export default Director;