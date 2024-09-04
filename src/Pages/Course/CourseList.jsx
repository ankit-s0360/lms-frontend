import { useDispatch, useSelector } from "react-redux";
import { getallCourses } from "../../Redux/Slices/CourseSlice";
import { useEffect } from "react";
import HomeLayout from "../../Layouts/HomeLayout";
import CourseCard from "../../Components/CourseCard";


function CourseList(){
    const dispatch = useDispatch();

    const {courseData} = useSelector((state) => state.course);

    async function loadCourses(){
        await dispatch(getallCourses());
    }

    useEffect(() => {
        loadCourses();
    }, []);

    return(
        <HomeLayout>
            <div className="min-h-[90vh] pt-12 pl-20 flex flex-col gap-10 text-white">
                <h1 className="text-center text-3xl font-semibold mb-5">
                    Explore the courses made by {" "}
                    <span className="font-bold text-yellow-500">
                        Industry expersts
                    </span>
                </h1>
                <div className="mb-10 flex flex-wrap gap-14">
                    {courseData?.map((element) => {
                        return <CourseCard key={element._id} data={element}/>
                    })}
                </div>

            </div>
        </HomeLayout>
    )
}
export default CourseList;