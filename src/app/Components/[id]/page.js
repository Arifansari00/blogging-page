// src/app/Components/[id]/page.js
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Use next/navigation for App Router
import 'bootstrap/dist/css/bootstrap.min.css';

const BlogDetails = () => {
    const [blogDetail, setBlogDetail] = useState(null); // Initialize as null
    const router = useRouter();
    const { query, isReady } = router;

    useEffect(() => {
        // Check if router is ready and query is defined
        if (isReady && query?.id) { // Use optional chaining to safely access query.id
            const blogs = JSON.parse(localStorage.getItem('myData')) ||'[]' ; // Handle empty localStorage
            const selectedBlog = blogs.find(blog => blog.id === parseInt(query.id));

            setBlogDetail(selectedBlog || null); // Set to null if not found
        }
    }, [isReady, query?.id]); // Use optional chaining in the dependency array

    if (!blogDetail) {
        return <div className="text-center mt-5">I tried everything but right now i have not enough knowledge to slove this problem</div>; // More descriptive loading message
    }

    return (
        <div className="container bg-light" style={{ marginTop: '5rem' }}>
            <div className="card mt-5">
                {blogDetail.imageUrl && ( // Check if imageUrl exists
                    <img
                        src={blogDetail.imageUrl}
                        style={{ maxWidth: '100%', maxHeight: '300px' }}
                        className="card-img-top"
                        alt="Blog"
                    />
                )}
                <div className="card-body">
                    <h1 className="card-title">{blogDetail.title}</h1>
                    <p className="card-text">{blogDetail.description}</p>
                    <p className="card-text">Author: {blogDetail.author}</p>
                    <p className="card-text">Date: {blogDetail.date}</p>
                </div>
            </div>
        </div>
    );
};

export default BlogDetails;