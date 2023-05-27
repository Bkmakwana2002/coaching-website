import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useState } from 'react'
import { storage } from '../../firebase';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

const AddSliderImages = () => {
    const [image, setImage] = useState(null);
    const navigate = useNavigate();

    const setFile = (e)=>{
        setImage(e.target.files[0]);
    }

    const AddThisImage = async(e)=>{
        
        e.preventDefault();

        const imageRef = ref(storage, `slider-images/${image.name + uuidv4()}`)
        await uploadBytes(imageRef, image).then((snapshot) => {
        console.log(snapshot)
        getDownloadURL(snapshot.ref).then((URL) => {

            fetch(process.env.REACT_APP_API_URL+"/api/images/add-slider-images", {
                method:'post',
                body:JSON.stringify({url:URL}),
                headers:{
                    'Content-Type':'application/json'
                }
            }).then((response)=>{
                response.json().then((data)=>{
                    console.log(data);
                    navigate('/success/Image-Added-Successfully');
                })
            })

        })
        }).catch((er)=>{
            console.log(er);
        // setProgress(100);
        })

    }


  return (
    <div className='pt-32'>
        <form onSubmit={AddThisImage} method='post' className='border border-black bg-[#FFF7E9] rounded w-fit px-8 py-8 mb-8 select-none mx-auto'>
            <div className='flex flex-col justify-center items-center'>


                <div class="flex justify-center">
                    <div class="mb-3 xl:w-96">
                        <label for="batchlabel" class="form-label text-3xl text-bold mb-4 inline-block text-gray-700"
                        >Add Slider Images</label>
                        <input required
                        accept="image/*"
                        onChange={setFile}
                        type="file"
                        class="
                            form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                        "
                        id="testUrl"
                        name='testUrl'
                        placeholder="Test URL"
                        />
                    </div>
                </div>

                <div className='w-2/3 my-4 flex justify-center'>
                    <button type='submit' className='bg-[#1746A2] text-white p-4 rounded text-2xl hover:bg-[#5F9DF7] active:bg-[#1746A2]'> 
                        Add
                    </button>
                </div>



            </div>




        </form>
    </div>
  )
}

export default AddSliderImages