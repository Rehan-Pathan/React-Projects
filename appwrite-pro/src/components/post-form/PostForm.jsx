/* eslint-disable react/prop-types */
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues, formState: { errors } } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        try {
            let file = null;

            if (data.image && data.image[0]) {
                file = await appwriteService.uploadFile(data.image[0]);
                if (post && post.featuredImage) {
                    await appwriteService.deleteFile(post.featuredImage);
                }
            }

            const payload = {
                ...data,
                featuredImage: file ? file.$id : post?.featuredImage,
                userId: post ? undefined : userData.$id,
            };

            const dbPost = post
                ? await appwriteService.updatePost(post.$id, payload)
                : await appwriteService.createPost(payload);

            if (dbPost) navigate(`/post/${dbPost.$id}`);
        } catch (error) {
            console.error("Error saving post:", error);
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string") {
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");
        }
        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            {/* Left Section */}
            <div className="w-full md:w-2/3 px-2 mb-6">
                <Input
                    label="Title :"
                    placeholder="Enter a title"
                    className="mb-4"
                    error={errors.title ? "Title is required" : null}
                    {...register("title", { required: "Title is required" })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    error={errors.slug ? "Slug is required" : null}
                    {...register("slug", { required: "Slug is required" })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>

            {/* Right Section */}
            <div className="w-full md:w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post && "Image is required" })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg max-w-full h-auto"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: "Status is required" })}
                />
                <Button
                    type="submit"
                    bgColor={post ? "bg-green-500" : "bg-blue-500"}
                    className="w-full"
                >
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}
