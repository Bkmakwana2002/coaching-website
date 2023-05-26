import React from 'react'
import { useState } from 'react'
import {AiOutlinePlus} from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import shortid from 'shortid'

const AddCourse = () => {

        const navigate = useNavigate();    
        const [courseInfo, setCourseInfo ]= useState({
            title: null,
            Date: new Date(),
            JEE: false,
            NEET: false,
            category:null,
            Fees:0
        })
        const setMyCourseInfo = (e)=>{
            if(e.target.name==="Fees"){
                setCourseInfo(existingValues =>({
                    ...existingValues,
                    [e.target.name] : parseInt(e.target.value)
                    }));
            }else{
                setCourseInfo(existingValues =>({
                    ...existingValues,
                    [e.target.name] : e.target.value
                    }));

            }
        }

        const setBatch = (e)=>{
            console.log(e.target.checked)
            if(e.target.value==='JEE'){
                setCourseInfo(existingValues =>({
                    ...existingValues,
                    [e.target.id] : e.target.checked,
                    NEET:false
                    }));
                    
            }else{
                setCourseInfo(existingValues =>({
                    ...existingValues,
                    [e.target.id] : e.target.checked,
                    JEE:false
                    }));

            }
        }

        const createCourse = (e)=>{
            e.preventDefault()
            if(courseInfo.category>5 || courseInfo.category<0){
                console.log("wrong category")
                return;
            }
            if(courseInfo.title===null || courseInfo.title === undefined || courseInfo.title===""){
                return;
            }

            setCourseInfo(courseInfo)

            fetch('http://localhost:5000/api/Courses/add-course',
            {
                method:'post',
                body:JSON.stringify(courseInfo),
                headers:{
                    'Content-Type':'application/json'
                }
            }).then(response=>{
                response.json().then((data)=>{
                    console.log(data)
                    navigate('/')
                })
            })

        }
    
    return (
        <div className='pt-32'>
            <form onSubmit={createCourse} className='border border-black bg-[#FFF7E9] rounded w-fit px-8 py-8 mb-8 select-none mx-auto'>
                <div className='flex flex-col justify-center items-center'>


                    <div class="flex justify-center">
                        <div class="mb-3 xl:w-96">
                            <label for="batchlabel" class="form-label inline-block mb-2 text-gray-700"
                            >Enter Course Name</label>
                            <input required
                            onChange={setMyCourseInfo}
                            type="text"
                            class="
                                form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                            "
                            id="title"
                            name='title'
                            placeholder="Course Name"
                            />
                        </div>
                    </div>

                    <div class="flex justify-center">
                        <div class="mb-3 xl:w-96">
                            <label for="batchlabel" class="form-label inline-block mb-2 text-gray-700"
                            >Enter Course Fees</label>
                            <input required
                            onChange={setMyCourseInfo}
                            type="number"
                            class="
                                form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                            "
                            id="Fees"
                            name='Fees'
                            placeholder="Course Fees"
                            />
                        </div>
                    </div>

                    <div class="flex justify-center">
                        <div class="mb-3 xl:w-96">
                            <label for="batchlabel" class="form-label inline-block mb-2 text-gray-700"
                            >Enter Category Code</label>
                            <input required
                            onChange={setMyCourseInfo}
                            type="number"
                            class="
                                form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                            "
                            id="category"
                            name='category'
                            placeholder="Category Code"
                            />
                        </div>
                    </div>


                    <div className='w-2/3 my-4 flex justify-center flex-col md:flex-row lg:flex-row'>
                        {/* Batch menu button */} 
                        <label for="batchlabel" class="form-label inline-block mb-2 text-gray-700"
                            > Select Batches </label>
                            <div className='mx-2 px-2'>  
                            <label className='mx-2' htmlFor="JEE">JEE</label>
                            <input type="radio" onChange={setBatch} name="batch" id="JEE" value={'JEE'} />
                            </div>

                            <div className='mx-2 px-2'>
                            <label htmlFor="NEET" className='mx-2'>NEET</label>
                            <input type="radio" onChange={setBatch} name="batch" id="NEET" value={'NEET'}/>
                            </div>
                    </div>

                    <div className='w-2/3 my-4 flex justify-center'>
                        <button type='submit' className='bg-[#1746A2] text-white p-4 rounded text-2xl hover:bg-[#5F9DF7] active:bg-[#1746A2]'> 
                            Go
                        </button>
                    </div>
                </div>
            </form>
        </div>
  )
}

export default AddCourse