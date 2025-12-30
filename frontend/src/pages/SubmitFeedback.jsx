import { useState } from "react"
import { useNavigate, Link } from "react-router";
import { api } from "../lib/axios";

import toast from "react-hot-toast";

import Navbar from "../components/Navbar"


const SubmitFeedback = () => {
    const [formData, setFormData] = useState({
        text: '',
        author: '',
        email: ''
    });
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate that text is not empty
        if (!formData.text.trim()) {
            toast.error("Feedback text cannot be empty!");
            return;
        }

        setLoading(true);

        try {
            toast.loading("Submitting feedback...");

            await api.post("/feedback", {
                text: formData.text,
                author: formData.author,
                email: formData.email
            });

            // Success if this is reached b/c Axios throws on error
            toast.dismiss();
            toast.success("Feedback submitted!");
            navigate("/feedback")
        } catch (error) {
            console.log("Error submitting feedback:", error);
            toast.dismiss();
            toast.error("Error submitting feedback.")
        } finally {
            setLoading(false);
        }
    }


  return (
    <div className="flex flex-col min-h-screen max-w-screen">
        <Navbar />

        <div className="flex justify-center items-center flex-grow p-8">
            <div className="w-full max-w-2xl border-2 border-gray-300 rounded-lg p-8 shadow-md bg-white">
                <h2 className="text-2xl font-bold mb-6 text-center">Submit Feedback</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="border border-gray-200 rounded-md p-4">
                        <textarea
                            placeholder="Feedback here..."
                            value={formData.text}
                            onChange={(e) => setFormData({...formData, text: e.target.value})}
                            rows={6}
                            required
                            className="w-full resize-none focus:outline-none"
                        />
                    </div>

                    <div className="border border-gray-200 rounded-md p-4">
                        <input
                            type="text"
                            placeholder="Name (optional)"
                            value={formData.author}
                            onChange={(e) => setFormData({...formData, author: e.target.value})}
                            className="w-full focus:outline-none "
                        />
                    </div>

                    <div className="border border-gray-200 rounded-md p-4">
                        <input
                            type="email"
                            placeholder="Email (optional)"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className="w-full focus:outline-none"
                        />
                    </div>

                    <div className="flex justify-end mt-6">
                        <button className="btn btn-primary px-8" type="submit" disabled={loading}>
                            { loading ? "Submitting..." : "Submit"}
                        </button>
                    </div>
                </form>
            </div>
        </div>

        <div className="text-center my-12">
            <Link to="/feedback" className="text-blue-700 hover:underline">
                View all feedback
            </Link>
        </div>

    </div>
  )
}

export default SubmitFeedback