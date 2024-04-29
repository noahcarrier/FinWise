import React, {useEffect, useState} from "react";
import Navbar from "@/components/Navbar";
import "../app/globals.css";
import { getCacheFromPage } from "@/libs/userManager";
import { NextPageContext } from "next";

interface lessonquestion {
    id: number;
    question: string;
    answer: string;
    attempt: boolean;
    lesson_id: number;
}

// Define the type for lesson
interface Lesson {
    id: number;
    user_id: number;
    title: string;
    created_at: string; // Adjust the type if necessary based on your backend
    lessonquestion: lessonquestion[]; // Array of lesson questions
}

export const getServerSideProps = async (context: NextPageContext) => {
    /* USE THIS CODE TO TEST AUTHENTICATION (yes, just copy and paste this to page that needs authentication)*/
    const user = await getCacheFromPage(context);
    if (!user) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        };
    }

    /* Return anything you want from database query from here out */
    return {
        props: {}
    }
}

const Study = () => {
    const [lesson, setLesson] = useState<Lesson | null>(null);

    const [side, setSide] = useState(false);

    const [currentQuestion, setCurrentQuestion] = useState(0);

    useEffect(() => {
        try {
            const lessonId = 3; // Example lessonId, replace with your actual variable value
            const fetchData = async () => {
                const response = await fetch(`/card/${lessonId}`, { // Using template literals to inject the lessonId variable
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
      
            if (!response.ok) {
                throw new Error('Failed to fetch lesson data');
            }
            
            const lessonData = await response.json();
            setLesson(lessonData); // Parse the JSON response
            console.log('Received lesson data:', lessonData);
            // Do something with the lesson data
            };
      
            fetchData();
        } catch (error) {
          console.error('Error fetching lesson:', error);
          // Show an error message or handle the error appropriately
        }
      }, []);
         
    
    const handleSwitchSubmit = () => {
        console.log("Switch was pressed.");
        setSide(prevSide => !prevSide);
    }

    const handleBeforeSubmit = () => {
        console.log("Before Arrow was pressed.");

        if (lesson && lesson.lessonquestion && currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
            setSide(false);
        }
    }
    
    const handleCheckmarkSubmit = () => {
        console.log("Check Mark was pressed.");

        console.log(lesson?.lessonquestion[currentQuestion].id);

        try {
            const questionid = lesson?.lessonquestion[currentQuestion].id
            const fetchData = async () => {
                const response = await fetch(`/card/question/${questionid}/`, { // Using template literals to inject the lessonId variable
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    attemptResult: true
                })
            });
            
            console.log(response);

            if (!response.ok) {
                throw new Error('Failed to fetch lesson data');
            }
            
            const lessonData = await response.json();
            setLesson(lessonData); // Parse the JSON response
            console.log('Received lesson data:', lessonData);
            // Do something with the lesson data
            };
      
            fetchData();
        } catch (error) {
          console.error('Error fetching lesson:', error);
          // Show an error message or handle the error appropriately
        }
    }

    const handleCrossmarkSubmit = () => {
        console.log("Cross Mark was pressed.");
    }

    const handleNextSubmit = () => {
        console.log("After Arrow was pressed.");

        if (lesson && lesson.lessonquestion && currentQuestion < lesson.lessonquestion.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setSide(false);
        }
    }

    return(
        <main className="bg-gradient-to-b from-cyan-500 to-blue-700 min-h-screen">
            <Navbar isAuthed={true}/>
            <div className="flex flex-col items-center mt-6 ">
                <h1 className="text-yellow-200 text-5xl font-bold">Study Flashcards</h1>
            </div>
            <div className="flex flex-col items-center mt-6">
                <button onClick={handleSwitchSubmit}>
                    <div className="bg-white rounded-lg shadow-lg p-6" style={{ width: '500px', height: '400px' }}>
                        <h2 className="text-black m-4 text-3xl text-center font-bold mb-4 ">
                            {side ? lesson?.lessonquestion[currentQuestion].answer : lesson?.lessonquestion[currentQuestion].question}
                        </h2>
                    </div>
                </button>    
                
                <div className="flex">
                    <button onClick={handleBeforeSubmit}>
                        <img src="icons/beforearrow.png" className="rounded-lg mt-8 mr-16" title="Cross Mark" style={{ width: '50px', height: '30px' }}/>
                    </button>
                    <button onClick={handleCheckmarkSubmit}>
                        <img src="icons/checkmark.jpg" className="rounded-lg mt-8 mr-16" title="Cross Mark" style={{ width: '50px', height: '50px' }}/>
                    </button>
                    <button onClick={handleCrossmarkSubmit}>
                        <img src="icons/crossmark.jpg" className="rounded-lg mt-8" title="Check Mark" style={{ width: '50px', height: '50px' }}/>
                    </button>
                    <button onClick={handleNextSubmit}>
                        <img src="icons/nextarrow.png" className="rounded-lg mt-8 ml-16" title="Cross Mark" style={{ width: '50px', height: '30px' }}/>
                    </button>
                </div>
            </div>
        </main>
    );
}

export default Study;