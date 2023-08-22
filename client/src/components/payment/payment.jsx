import React, { useEffect, useState } from 'react'
import Card from './Card'
import axios from 'axios'
import shortid from 'shortid'
import { AiOutlineSearch } from 'react-icons/ai'

const Payment = () => {
    
    const [courses, setCourses] = useState([])
    const [searchQuery, setSearchQuery] = useState('');
    const [error, setError] = useState('')
    const [allCourses, setAllCourses] = useState([]);
    //const [selectedCourse, setSelectedCourse] = useState('')

    const checkoutHandler = async (amount, courseName) => {

        const Token = JSON.parse(localStorage.getItem("data")).result.token;
        console.log(Token);

        const { data: { key } } = await axios.get('http://localhost:5000/api/payment/getKey',{headers:{'Authorization':'Bearer '+Token}})

        const { data: { order } } = await axios.post("http://localhost:5000/api/payment/checkout", {
            amount
        })
        const options = {
            key: key,
            amount: order.amount,
            currency: "INR",
            name: "Vulture Institute",
            description: "Test Transaction",
            image: "https://drive.google.com/file/d/1GMudk9jWfEYGBZ19klA6qwFvDNA4w_2d/view?usp=share_link",
            order_id: order.id,
            //callback_url: "http://localhost:5000/api/payment/paymentVerification",
            handler: function (response) {
                alert(response.razorpay_payment_id);
                alert(response.razorpay_order_id);
                alert(response.razorpay_signature)
                const log = localStorage.getItem("data")
                const res = JSON.parse(log)
                if (response.razorpay_signature && response.razorpay_order_id && response.razorpay_payment_id) {
                    console.log("sucess");
                    const data = {
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature,
                        User2: res.result.email,
                        courseName: courseName
                    }
                    // axios.post('http://localhost:5000/api/payment/paymentVerification',data)
                    //   .then(function (response) {
                    //     console.log(response);
                    //   })
                    //   .catch(function (error) {
                    //     console.log(error);
                    //   });
                    fetch("http://localhost:5000/api/payment/paymentVerification", {
                        method: "POST", // or 'PUT'
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(data),
                    })
                        .then((response) => response.json())
                        .then((data) => {
                            console.log("Success:", data);
                        })
                        .catch((error) => {
                            console.error("Error:", error);
                        });
                    //console.log(data)
                }
            },
            prefill: {
                name: "Gaurav Kumar",
                email: "gaurav.kumar@example.com",
                contact: "9000090000"
            },
            notes: {
                "address": "Razorpay Corporate Office"
            },
            theme: {
                "color": "#3399cc"
            }
        }
        const razor = new window.Razorpay(options);
        razor.open()
        console.log(order)
    }


    const fetchCourses = async () => {
        const email = JSON.parse(localStorage.getItem('data')).result.email;
        return fetch('http://localhost:5000/api/Courses/fetch-course-not-in-user2', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        }).then(
            (response) =>

                response.json().then((data) => {
                    setCourses(data)
                    console.log(courses)
                    setAllCourses(data);
                })
        )
    }

    const searchCourse = async (e) => {

        e?.preventDefault();

        const email = JSON.parse(localStorage.getItem('data')).result.email;

        let newCourses = [];

        if (allCourses?.length > 0) {
            allCourses.forEach((item) => {
                if (item.title.toLowerCase().includes(searchQuery.toLowerCase())) {
                    newCourses.push(item)
                }
            })
        } else {
            setError('No Course to Show')
            return;
        }

        let searchCourses = [];

        if (newCourses.length > 0) {

            newCourses.forEach(element => {
                if (!element.user2Array.includes(email)) {
                    searchCourses.push(element);
                }
            });
            setCourses(searchCourses)
        } else {
            setCourses([]);
            setError('No Course Found')
        }



    }

    useEffect(() => {

        fetchCourses();

    }, [])


    return (


        <div>
            <form onSubmit={searchCourse} className='bg-gray-200 w-full mx-auto rounded py-2'>
                <div className='flex flex-col lg:flex-row justify-between items-center p-2'>
                    <label className='text-2xl text-black dark:text-white font-inter' htmlFor="search">Search Course by Name</label>
                    <input onChange={(e) => { setSearchQuery(e.target.value) }} className='p-2 m-2 rounded w-1/2 mx-auto border border-orange-black shadow-md' type="text" name="searchQuery" id="searchQuery" />
                    <button className='p-2 bg-blue-300 mx-auto rounded shadow-lg active:shadow-none' type="submit"><AiOutlineSearch className='text-2xl' /></button>
                </div>

            </form>

            <div>

                {
                    courses?.length > 0
                        ?
                        // mapping over all the courses and making a grid of the cards
                        <div className='grid lg:grid lg:grid-cols-3 lg:grid-row-3 flex-col justify-center items-center'>
                            {
                                courses.map((item, index) => (
                                    <Card key={shortid.generate()} amount={item.Fees} checkoutHandler={checkoutHandler} courseName={item.title} />
                                ))
                            }
                        </div>
                        :
                        // in case of any error
                        <div className='mx-auto bg-gray-200 w-full p-2 '>
                            {error}
                        </div>
                }
            </div>

        </div>
    )
}

export default Payment