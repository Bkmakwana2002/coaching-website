import React from "react";
import {HiOutlineOfficeBuilding} from 'react-icons/hi';
import {AiOutlinePhone} from 'react-icons/ai';
import {MdOutlineEmail} from 'react-icons/md';

function Contact() {
  return (
    <section className="bg-white flex justify-center pt-24">
        <div className="
        container 
        flex 
        flex-col 
        md:flex-row
        justify-center
        items-center">
            <div className="
                    flex 
                    flex-col 
                    w-full 
                    md:w-1/2
                    px-4">
                <p className="
                        font-lato
                        text-xl
                        text-blue-700
                        pb-8
                        pt-4
                        ">Contact Us</p>
                <h1 className="
                        text-black
                        text-5xl
                        font-lato
                        font-bold
                        pb-2
                        "> GET IN TOUCH WITH US
                </h1>
                <p className="
                        text-black
                        text-center
                        mx-auto
                        font-lato
                        pb-4
                        ">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit explicabo incidunt laboriosam dolorem doloribus est iure! Ab rerum soluta atque adipisci facilis tempore aperiam exercitationem?</p>
                
                {/* Location */}
                <div className="
                        location
                        flex
                        flex-row
                        justify-center
                        items-center
                        m-4">
                            <HiOutlineOfficeBuilding className="
                            text-blue-500 
                            text-6xl 
                            bg-slate-200 
                            rounded
                            mx-2
                            "/>
                            <div className="flex flex-col">
                                <p className="
                                    font-bold
                                    text-black
                                    text-3xl">Our Location</p>
                                <p className="
                                text-black
                                mx-auto
                                ">99 S.t Jomblo Park Pekanbaru 28292. Indonesia</p>
                            </div>
                </div>
                
                {/* Mobile Number */}
                <div className="
                        location
                        flex
                        flex-row
                        justify-center
                        items-center
                        m-4">
                            <AiOutlinePhone className="
                            text-blue-500 
                            text-6xl 
                            bg-slate-200 
                            rounded
                            mx-2"/>
                            <div className="flex flex-col">
                                <p className="
                                    font-bold
                                    text-black
                                    text-3xl">Mobile</p>
                                <p className="text-black">(+91)8770182096</p>
                            </div>
                </div>

                {/* Email */}
                <div className="
                        location
                        flex
                        flex-row
                        justify-center
                        items-center
                        m-4">
                            <MdOutlineEmail className="
                            text-6xl
                            text-blue-500
                            bg-slate-200 
                            border-r-2
                            mx-2"/>
                            <div className="flex flex-col justify-center text-center">
                                <p className="
                                    font-bold
                                    text-black
                                    text-3xl">Email Address</p>
                                <p className="
                                text-black
                                text-center
                                ">yamuprajapati05@gmail.com</p>
                            </div>
                </div>
            </div>

            {/* Message */}
            <div className="
                flex 
                w-11/12
                md:w-1/2
                mx-auto
                rounded-lg
                my-4
                shadow-lg
                shadow-gray-400
                flex-col
                py-8
                bg-white
                ">

                {/* Name */}
                <input type="email" name="email" id="email" placeholder="Your Name" className="
                bg-white
                p-2
                rounded
                w-2/3 
                border-gray-500 
                border
                mx-auto
                flex
                justify-center
                my-2"/>

                {/* Email */}
                <input type="email" name="email" id="email" placeholder="Your Email" className="
                bg-white
                p-2
                rounded
                w-2/3 
                border-gray-500 
                border
                mx-auto
                flex
                justify-center
                my-2"/>

                {/* Phone NUmber */}
                <input type="email" name="email" id="email" placeholder="Your Phone Number" className="
                bg-white
                p-2
                rounded
                w-2/3 
                border-gray-500 
                border
                mx-auto
                flex
                justify-center
                my-2"/>

                {/* Message */}
                <textarea
                        rows="6"
                        placeholder="Your Message"
                        class="
                        w-2/3
                        mx-auto
                        rounded
                        py-3
                        px-[14px]
                        text-body-color text-base
                        border border-gray-500
                        resize-none
                        my-2
                        focus-visible:shadow-none
                        focus:border-primary
                        "
                        ></textarea>

                        <button type="submit" className="
                        w-1/2
                        rounded
                        bg-blue-500
                        text-white
                        mx-auto
                        py-4
                        my-2
                        font-inter
                        text-lg">Send Message</button>
            </div>
        </div>

    </section>
  );
}

export default Contact;
