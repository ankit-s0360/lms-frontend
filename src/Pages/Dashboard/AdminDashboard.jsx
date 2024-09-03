import { useDispatch, useSelector } from "react-redux";
import HomeLayout from "../../Layouts/HomeLayout";
import { ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import { FaUsers } from "react-icons/fa";
import { FcSalesPerformance } from "react-icons/fc";
import { GiMoneyStack } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { deleteCourse, getallCourses } from "../../Redux/Slices/CourseSlice";
import { getStatsData } from "../../Redux/Slices/StatSlice";
import { useEffect } from "react";
import { getPaymentRecord } from "../../Redux/Slices/RazorpaySlice";
import { BsCollectionPlayFill, BsTrash } from "react-icons/bs";

ChartJS.register(ArcElement, BarElement, CategoryScale, Legend, LinearScale, Title, Tooltip);

function AdminDashBoard(){
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {allPayments, monthlySalesRecord} = useSelector((state) => state?.razorpay);
    const {allUserCount, subscribedCount} = useSelector((state) => state?.stat);

    // we can pass multiple datasets for chart according to use
    const userData = {
        labels: ["Reistered User", "Enrolled User"],
        fontColor: "white",
        datasets: [
            {
                label: "User Details",
                data: [allUserCount, subscribedCount],
                // data: [80, 20],
                backgroundColor: ["yellow", "green"],
                borderWidth: 1,
                borderColor: ["yellow", "green"]
            },
        ]
    };
    const dummySalesRecord  = [2, 5, 7, 4, 5, 2, 4, 9, 5, 7, 6, 9];

    const salesData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        fontColor: "white",
        datasets: [
            {
                label: "Sales / Month",
                // data: monthlySalesRecord,
                data: dummySalesRecord,
                borderColor: ["white"],
                backgroundColor: ["red"],
                borderWidth: 2
            },
        ]
    };

    const courseData = useSelector((state) => state?.course?.courseData);

    // console.log(courseData);
    async function onCourseDelete(id) {
        if(window.confirm("Are you sure you want to delete the course? ")){
            const res = await dispatch(deleteCourse(id));
            if(res?.payload?.success){
                await dispatch((getallCourses()));
            }
        }
    }


    useEffect(() => {
        (
            async() => {
                await dispatch(getallCourses()),
                await dispatch(getStatsData());
                await dispatch(getPaymentRecord());
            }
        )
        ()
    }, []);
    
    return(
        <HomeLayout>
            <div className="min-h-[90vh] flex flex-col flex-wrap pt-5 gap-10 text-white">
                <h1 className="text-center text-5xl font-semibold text-yellow-500">
                    Admin Dashboard
                </h1>
                <div className="grid grid-cols-2 gap-5 m-auto mx-10">
                    <div className="flex flex-col items-center gap-10 p-5 shadow-lg rounded-md">
                        <div className="w-80 h-80">
                            <Pie data={userData}/>
                        </div>

                        <div className="grid grid-col-2 gap-5">
                            <div className="flex items-center justify-between p-5 gap-5 rounded-md shadow-md">
                                <div className="flex flex-col items-center">
                                    <p className="font-semibold">Registered Users</p>
                                    <h3 className="text-4xl font-semibold">
                                        {allUserCount}
                                        
                                    </h3>
                                </div>
                                <FaUsers className="text-yellow-500 text-5xl"/>
                            </div>

                            <div className="flex items-center justify-between p-5 gap-5 rounded-md shadow-md">
                                <div className="flex flex-col items-center">
                                    <p className="font-semibold">Enrolled Users</p>
                                    <h3 className="text-4xl font-semibold">
                                        {subscribedCount}
                                        
                                    </h3>
                                </div>
                                <FaUsers className="text-green-500 text-5xl"/>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-center gap-10 p-5 shadow-lg rounded-md">
                        <div className="h-80 w-full relative">
                            <Bar className="bottom-0 absolute h-80 w-full" data={salesData}/>
                        </div>

                        <div className="grid grid-cols-2 gap-5">
                            <div className="flex items-center justify-between p-5 gap-5 rounded-md shadow-md">
                                <div className="flex flex-col text-center">
                                    <p className="font-semibold">Subscription Count</p>
                                    <h3 className="text-4xl font-semibold">{allPayments?.count}</h3>
                                </div>
                                <FcSalesPerformance className="text-yellow-500 text-5xl"/>
                            </div>
                            <div className="flex items-center justify-between p-5 gap-5 rounded-md shadow-md">
                                <div className="flex flex-col text-center">
                                    <p className="font-semibold">Total Revenue</p>
                                    <h3 className="text-4xl font-semibold">{allPayments > 0 ? allPayments?.count * 499 : 32435}</h3>
                                </div>
                                <GiMoneyStack className="text-5xl text-green-500"/>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-[80%] mx-[10%] self-center flex flex-col align-center justify-center gap-10 mb-10">
                    <div className="flex w-full items-center justify-between">
                        <h1 className="text-3xl font-semibold text-center">Course overview</h1>
                        <button
                          onClick={() => navigate("/course/create")}
                          className="w-fit bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-300 
                          rounded py-2 px-4 font-semibold text-lg cursor-pointer"
                        >
                            Create new course
                        </button>
                    </div>

                    <table className="table overflow-x-scroll">
                        <thead>
                            <tr>
                                <th>S No</th>
                                <th>Course Title</th>
                                <th>Course Category</th>
                                <th>Instructor</th>
                                <th>Total Lecture</th>
                                <th>Description</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                courseData.map((course, idx) => {
                                    return(
                                        <tr id={course._id}>
                                            <td>{idx+1}</td>
                                            <td>{course.title}</td>
                                            <td>{course.category}</td>
                                            <td>{course.createdBy}</td>
                                            <td>{course.numberOfLectures}</td>
                                            <td className="max-w-28 overflow-hidden text-ellipsis whitespace-nowrap">
                                                <textarea value={course.description} readOnly className="w-80 h-auto resize-none bg-transparent"></textarea>
                                            </td>
                                            <td className="flex items-center ml-4 gap-4">
                                                <button onClick={() => navigate("/course/displaylectures", {state: {...course}})}
                                                className="text-green-500 hover:text-green-600 transition-all ease-in-out duration-300 text-2xl p-2"
                                                >
                                                    <BsCollectionPlayFill />
                                                </button>
                                                <button onClick={() => onCourseDelete(course?._id)}
                                                    className="text-red-500 hover:text-red-600 transition-all ease-in-out duration-300 text-2xl p-2"

                                                >
                                                    <BsTrash />
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </HomeLayout>
    )
}

export default AdminDashBoard;