import { useDispatch } from "react-redux";
import HomeLayout from "../../Layouts/HomeLayout";
import { useLocation, useNavigate } from "react-router-dom";
import { useId, useState } from "react";
import { addCourseLecture } from "../../Redux/Slices/LectureSlice";
import toast from "react-hot-toast";
import { AiOutlineAlignLeft, AiOutlineArrowLeft } from "react-icons/ai";


function AddLecture(){

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const courseDetails = useLocation().state;
    // console.log(courseDetails);

    const [userInput, setUserInput] = useState({
        id: courseDetails?._id,
        title:"",
        lecture: undefined,
        description: "",
        videoSrc: ""
    });

    function handleInputChange(e) {
        const {name, value} = e.target;
        setUserInput({
            ...userInput,
            [name]: value
        })
    }

    function handleVideoUpload(e) {
        const video = e.target.files[0];
        const source = window.URL.createObjectURL(video);
        console.log("video src", source);
        setUserInput({
            ...userInput,
            lecture: video,
            videoSrc: source
        })
        
    };

    async function onFormSubmit(e) {
        e.preventDefault();
        if(!userInput.title || !userInput.description || !userInput.lecture){
            toast.error("All fields are required");
            return;
        }
        const response = await dispatch(addCourseLecture(userInput));
        if(response?.payload?.success){
            navigate(-1);
            setUserInput({
                id: courseDetails?._id,
                title:"",
                lecture: undefined,
                description: "",
                videoSrc: ""
            })
        }
    }

    return(
        <HomeLayout>
            <div className="min-h-[90vh] flex items-center justify-center gap-y-10 px-20 text-white">
                <div className="flex flex-col w-96 gap-5 p-2 shadow-[0_0_10px_black] rounded-lg">
                    <header className="flex align-center justify-center relative">
                        <button onClick={() => navigate(-1)} className="text-lg left-2 text-green-500 absolute">
                            <AiOutlineArrowLeft />
                        </button>
                        <h1 className="text-lg text-yellow-500 font-semibold">
                            Add lecture
                        </h1>
                    </header>
                    <form
                     onSubmit={onFormSubmit}
                     className="flex flex-col p-2 gap-5"
                    >
                        <input
                          type="text"
                          id="title"
                          name="title"
                          placeholder="Enter lecture title"
                          className="bg-transparent border rounded-sm text-white px-2 py-1"
                          value={userInput.title}
                          onChange={handleInputChange}
                        />

                        <textarea
                          type="text"
                          id="description"
                          name="description"
                          placeholder="Enter lecture description"
                          className="bg-transparent border rounded-sm text-white px-2 py-1 resize-none h-28 overflow-y-scroll"
                          value={userInput.description}
                          onChange={handleInputChange}
                        />
                        {
                            userInput.videoSrc ? (
                                <video 
                                muted
                                src={userInput.videoSrc}
                                controls 
                                controlsList="nodownload nofullscreen"
                                disablePictureInPicture
                                className="object-fill rounded-tl-lg rounded-tr-lg w-full"
                            >

                            </video>
                            ) : (
                                <div className="h-48 border flex items-center justify-center cursor-pointer">
                                <label className="font-semibold text-cl cursor-pointer" htmlFor="lecture">Choose your video</label>
                                <input type="file" className="hidden" id="lecture" name="lecture" onChange={handleVideoUpload} accept="video/mp4 video/x-mp4 video/*" />
                            </div>
                            )
                        }
                        <button type="submit" className="btn btn-primary px-2 py-1 text-lg rounded-sm">
                            Add lecture
                        </button>
                    </form>
                    
                </div>
            </div>
        </HomeLayout>
    )
}

export default AddLecture;