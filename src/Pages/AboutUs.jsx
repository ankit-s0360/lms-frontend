import HomeLayout from "../Layouts/HomeLayout";
import AboutMainImage from "../Assets/Images/aboutMainImage.png";
import CarouselSlide from "../Components/CarouselSlide";
import {celebrities} from "../Constants/CeleberitiesData";

function AboutUs(){
    return(
        <HomeLayout>
            <div className="pl-20 pt-20 flex flex-col text-white">
                <div className="flex items-center gap-5 mx-auto">
                    <section className="w-1/2 space-y-10">
                        <h1 className="text-5xl text-yellow-500 font-semibold">
                            Affordable and quality education
                        </h1>
                        <p className="text-xl text-gray-300">
                            Our goal is to provide the affordable and quality education to the world.
                            We are providing the plateform for the aspiring teachers and students to 
                            share their skills, creativitya nd knowlwdge to each other to empower and
                            constribute in the growth and wellness of mankind.
                        </p>
                    </section>

                    <div className="w-1/2">
                        <img
                        id="test1"
                        alt="about main page"
                         src={AboutMainImage}
                        />
                    </div>
                </div>
                  
                <div className="carousel w-1/2 my-16 m-auto">
                {celebrities && celebrities.map(celebrity => (<CarouselSlide 
                                                                    {...celebrity} 
                                                                    key={celebrity.slideNumber} 
                                                                    totalSlides={celebrities.length}

                                                                />))}
                </div>
            </div>
        </HomeLayout>
    )
}
export default AboutUs;