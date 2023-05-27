import React from 'react'

const AddCourse = () => {

  return (
    <div className='pt-32'>
        <form onSubmit={createTest} method='post' className='border border-black bg-[#FFF7E9] rounded w-fit px-8 py-8 mb-8 select-none mx-auto'>
            <div className='flex flex-col justify-center items-center'>

                <div className="flex justify-center">
                    <div className="mb-3 xl:w-96">
                        <label for="batchlabel" className="form-label inline-block mb-2 text-gray-700"
                        >Enter Course Name</label>
                        <input required
                        onChange={setMyTestInfo}
                        type="text"
                        className="
                            form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                        "
                        id="name"
                        name='name'
                        placeholder="Course Name"
                        />
                    </div>
                </div>

                <div className='w-2/3 my-4 flex justify-center flex-col md:flex-row lg:flex-row'>
                    {/* Batch menu button */} 
                    <label for="batchlabel" className="form-label inline-block mb-2 text-gray-700"
                        > Select Subjects </label>
                        <div className='mx-2 px-2'>  
                            <label className='mx-2' htmlFor="Physics">Physics</label>
                            <input type="checkbox" onChange={setMyTestInfo} name="Physics" id="Physics" />
                        </div>

                        <div className='mx-2 px-2'>
                            <label htmlFor="Chem" className='mx-2'>Chem</label>
                            <input type="checkbox" onChange={setMyTestInfo} name="Chem" id="Chem" />
                        </div>

                        <div className='mx-2 px-2'>
                            <label htmlFor="Maths" className='mx-2'>Maths</label>
                            <input type="checkbox" onChange={setMyTestInfo} name="Maths" id="Maths" />
                        </div>

                        <div className='mx-2 px-2'>
                            <label htmlFor="Bio" className='mx-2'>Bio</label>
                            <input type="checkbox" onChange={setMyTestInfo} name="Bio" id="Bio" />
                        </div>
                </div>

                <div className='w-2/3 my-4 flex justify-center flex-col md:flex-row lg:flex-row'>
                    {/* Category button */} 
                    <label for="batchlabel" className="form-label inline-block mb-2 text-gray-700"
                        > Select Category </label>
                        <div className='mx-2 px-2'>  
                            <label className='mx-2' htmlFor="1">1</label>
                            <input type="checkbox" onChange={setMyTestInfo} name="1" id="1" />
                        </div>

                        <div className='mx-2 px-2'>
                            <label htmlFor="2" className='mx-2'>2</label>
                            <input type="checkbox" onChange={setMyTestInfo} name="2" id="2" />
                        </div>

                        <div className='mx-2 px-2'>
                            <label htmlFor="3" className='mx-2'>3</label>
                            <input type="checkbox" onChange={setMyTestInfo} name="3" id="3" />
                        </div>

                        <div className='mx-2 px-2'>
                            <label htmlFor="4" className='mx-2'>4</label>
                            <input type="checkbox" onChange={setMyTestInfo} name="4" id="4" />
                        </div>

                        <div className='mx-2 px-2'>
                            <label htmlFor="5" className='mx-2'>5</label>
                            <input type="checkbox" onChange={setMyTestInfo} name="5" id="5" />
                        </div>
                </div>

                <div className='w-2/3 my-4 flex justify-center'>
                    <button type='submit' className='bg-[#1746A2] text-white p-4 rounded text-2xl hover:bg-[#5F9DF7] active:bg-[#1746A2]'> 
                        Create Course
                    </button>
                </div>



            </div>




        </form>
    </div>
  )
}

export default AddCourse