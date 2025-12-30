import { useEffect, useState } from 'react'
import { api } from '../lib/axios';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar'

const Feedback = () => {
    const [feedback, setFeedback] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchFeedback = async () => {
            try {
                const res = await api.get("/feedback");

                console.log("Response from getting feedback: ", res.data)

                setFeedback(res.data.feedback);
            } catch (error) {
                console.log(error);
                toast.error("Failed to load feedback.")
            } finally {
                setLoading(false);
            }
        }

        fetchFeedback();
    }, []);


    return (
        <div className="flex flex-col min-h-screen">
            <Navbar/>

            <div className="flex-grow p-8">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-3xl font-bold mb-8 text-center">Feedback</h1>

                    {loading ? (
                        <div className="text-center text-gray-500">Loading feedback...</div>
                    ) : feedback.length === 0 ? (
                        <div className="text-center text-gray-500">No feedback yet.</div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {feedback.map((item) => (
                                <div
                                    key={item._id}
                                    className="bg-white border border-gray-300 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
                                >
                                    <p className="text-gray-800 mb-4 whitespace-pre-wrap break-words">
                                        {item.text}
                                    </p>

                                    <div className="border-t border-gray-200 pt-3 mt-3 space-y-1">
                                        {item.author && (
                                            <p className="text-sm text-gray-600">
                                                <span className="font-semibold">Name:</span> {item.author}
                                            </p>
                                        )}
                                        {item.email && (
                                            <p className="text-sm text-gray-600">
                                                <span className="font-semibold">Email:</span> {item.email}
                                            </p>
                                        )}
                                        {!item.author && !item.email && (
                                            <p className="text-sm text-gray-400 italic">Anonymous</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Feedback