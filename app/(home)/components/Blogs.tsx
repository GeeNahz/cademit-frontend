import CardBlog from "../blogs/components/CardBlog";
import { Blog } from "../blogs/types";
import SectionTitle from "./SectionTitle";

export default function Blogs() {
    const blogs: Blog[] = [
        {
            id: 1,
            title: "Jason Park",
            description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eveniet magnam architecto et amet, necessitatibus sint veniam debitis aliquid odio ullam?",
            imageUrl: "https://wallpapers.com/images/hd/cool-profile-picture-87h46gcobjl5e4xu.jpg",
            link: "",
        },
        {
            id: 2,
            title: "Mark Matthews",
            description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eveniet magnam architecto et amet, necessitatibus sint veniam debitis aliquid odio ullam?",
            imageUrl: "https://wallpapers.com/images/hd/cool-profile-picture-87h46gcobjl5e4xu.jpg",
            link: "",
        },
        {
            id: 3,
            title: "Sindy Lorence",
            description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eveniet magnam architecto et amet, necessitatibus sint veniam debitis aliquid odio ullam?",
            imageUrl: "https://wallpapers.com/images/hd/cool-profile-picture-87h46gcobjl5e4xu.jpg",
            link: "",
        },
    ];
    
    return (
        <div className="container mx-auto px-5 md:px-0">
            <div className="title">
                <SectionTitle subtitle="blogs and news" title="latest blogs and news" textAlign="center" />
            </div>

            <div className="blog-list flex flex-col md:flex-row gap-5 items-center md:items-start justify-center">
                {
                    blogs.map((blog) => (
                        <div key={blog.id}>
                            <CardBlog title={blog.title} description={blog.description} imageUrl={blog.imageUrl} link={blog.link} />
                        </div>
                    ))
                }
            </div>
        </div>
    );
}