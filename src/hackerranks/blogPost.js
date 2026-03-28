import React from "react";
import Input from "./Input";
import PostDisplay from "./PostDisplay";

function Home() {
    const [posts, setPosts] = React.useState([]);

    return (
        <div className="text-center ma-20">
            <div className="mb-20">
                <Input setPosts={setPosts} />
            </div>
            <div className="posts-section">
                <PostDisplay posts={posts} setPosts={setPosts} />
            </div>
        </div>
    );
}

export default Home;

function Input({ setPosts }) {
    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");

    const handleAddPost = () => {
        const trimmedTitle = title.trim();
        const trimmedDescription = description.trim();

        if (trimmedTitle && trimmedDescription) {
            setPosts((prev) => [
                ...prev,
                {
                    title: trimmedTitle,
                    description: trimmedDescription,
                },
            ]);
            setTitle("");
            setDescription("");
        }
    };

    return (
        <>
            <div className="layout-column justify-content-center align-items-center">
                <input
                    className="w-100"
                    type="text"
                    placeholder="Enter Title"
                    value={title}
                    data-testid="title-input"
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    className="mt-10 w-100"
                    placeholder="Enter Description"
                    value={description}
                    data-testid="description-input"
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <button
                data-testid="create-button"
                className="mt-10"
                onClick={handleAddPost}
            >
                Create Post
            </button>
        </>
    );
}

function PostDisplay({ posts, setPosts }) {
    const handleDeletePost = (idxToDelete) => {
        // Used splice() or shift() is still O(n) since it need to shift index
        setPosts((prev) => prev.filter((_, idx) => idx !== idxToDelete));
    };

    return (
        <div data-testid="posts-container" className="flex wrap gap-10">
            {posts?.map((p, idx) => (
                <div className="post-box" key={`post-box-${idx}`}>
                    <h3>{p.title}</h3>
                    <p>{p.description}</p>
                    <button onClick={() => handleDeletePost(idx)}>
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
}
