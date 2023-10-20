import SignupCard from "./components/SignupCard";

interface Option {
    id: number;
    title: string;
    imageUrl: string;
    link: string;
    isActive: boolean;
}

const Signup = () => {
    const signupOptions: Option[] = [
        {
            id: 1,
            title: "School/Parent",
            imageUrl: "/images/parent-illustration.avif",
            link: "/signup/school-parent",
            isActive: false,
        },
        {
            id: 2,
            title: "Educator",
            imageUrl: "/images/tutor-illustration.avif",
            link: "/signup/educator",
            isActive: false,
        },
        {
            id: 3,
            title: "Individual",
            imageUrl: "/images/individual-illustration.avif",
            link: "/signup/individual",
            isActive: true,
        },
    ];

    return (
        <div className="h-full w-full py-40 px-5 md:px-0">

            <div className="title mb-20">
                <h1 className="text-4xl font-bold text-center">Who do you want to sign up as?</h1>
            </div>
            
            <div className="flex w-fit mx-auto flex-col md:flex-row flex-wrap justify-center gap-5">
                {
                    signupOptions.map((option) => (
                        <SignupCard
                            key={option.id}
                            title={option.title}
                            imageUrl={option.imageUrl}
                            link={option.link}
                            isActive={option.isActive}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default Signup;