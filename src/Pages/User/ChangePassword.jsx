import { useDispatch } from "react-redux";
import HomeLayout from "../../Layouts/HomeLayout";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { changePassword } from "../../Redux/Slices/AuthSlice";

function ChangePassword() {

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const [passwordData, setPasswordData] = useState({
        oldPassword: "",
        newPassword: "",
    });

    function handleUserInput(e) {
        const {name, value} = e.target;
        setPasswordData({
            ...passwordData,
            [name]: value
        })
    }

    
    async function onPasswordChange(event) {
        event.preventDefault();
        if(!passwordData.oldPassword || !passwordData.newPassword ) {
            toast.error("Please fill all the details");
            return;
        }


        // dispatch create account action
        const response = await dispatch(changePassword(passwordData));
        if(response?.payload?.success)
            navigate("/user/profile");

        setPasswordData({
            oldPassword: "",
            newPassword: "",
        });

    }

    return (
        <HomeLayout>
            <div className='flex overflow-x-auto items-center justify-center h-[100vh]'>
                <form noValidate onSubmit={onPasswordChange} className='flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]'>
                    <h1 className="text-center text-2xl font-bold">Change your password</h1>

                    
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="oldPassword" className='font-semibold'> Old password </label>
                        <input 
                            type="password" 
                            required
                            name="oldPassword"
                            id="oldPassword"
                            placeholder="Enter your old password.."
                            className="bg-transparent px-2 py-1 border"
                            onChange={handleUserInput}
                            value={passwordData.oldPassword}
                        />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="newPassword" className='font-semibold'>New password </label>
                        <input 
                            type="password" 
                            required
                            name="newPassword"
                            id="newPassword"
                            placeholder="Enter your new password.."
                            className="bg-transparent px-2 py-1 border"
                            onChange={handleUserInput}
                            value={passwordData.newPassword}
                        />
                    </div>

                    <button type="submit" className='mt-2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer'>
                        Change Password
                    </button>

                    <p onClick={() => navigate(-1)} className="text-center link text-accent cursor-pointer">
                        Go back ? 
                    </p>

                </form>
            </div>
        </HomeLayout>
    );
}

export default ChangePassword;