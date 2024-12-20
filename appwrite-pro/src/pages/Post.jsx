import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8">
            <Container>
                {/* Image Section */}
                <div className="w-full flex justify-center mb-4 border rounded-xl overflow-hidden">
                    <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl w-full h-auto object-contain max-h-[500px] sm:max-h-[300px] md:max-h-[400px]"
                    />
                </div>

                {/* Buttons Section */}
                {isAuthor && (
                    <div className="flex space-x-4 mb-6 justify-center">
                        <Link to={`/edit-post/${post.$id}`}>
                            <Button bgColor="bg-green-500" className="px-4 py-2 text-white shadow-md hover:bg-green-600">
                                Edit
                            </Button>
                        </Link>
                        <Button bgColor="bg-red-500" onClick={deletePost} className="px-4 py-2 text-white shadow-md hover:bg-red-600">
                            Delete
                        </Button>
                    </div>
                )}

                {/* Post Title */}
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold text-center sm:text-left">{post.title}</h1>
                </div>

                {/* Post Content */}
                <div className="browser-css">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : null;
}
