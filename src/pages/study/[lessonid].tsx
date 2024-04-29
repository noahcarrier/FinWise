import React, {useEffect, useState} from "react";
import Navbar from "@/components/Navbar";
import "../../app/globals.css";
import { getCacheFromPage } from "@/libs/userManager";
import { GetServerSidePropsContext } from "next";
import { prisma } from "@/libs/db";

interface lessonquestion {
    id: number;
    question: string;
    answer: string;
    attempt: boolean;
    lesson_id: number;
}

type props = {
    lessonName: string;
    questions: lessonquestion[];
}

// Fisher-Yates Shuffle Algorithm
function shuffle(arr: any[]) {
    var i = arr.length, j, temp;
    while(--i > 0){
      j = Math.floor(Math.random()*(i+1));
      temp = arr[j];
      arr[j] = arr[i];
      arr[i] = temp;
    }
  }


export const getServerSideProps = async (context: GetServerSidePropsContext) => {
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

    if(!context.params || !context.params.lessonid || Number.isNaN(parseInt(context.params.lessonid as string)))
        return {
            redirect: {
                destination: '/dashboard',
                permanent: false,
            },
        };

    /* Return anything you want from database query from here out */
    const lessonObj = await prisma.lesson.findUnique({
        where: {
            id: parseInt(context.params.lessonid as string)
        },
        include: {
            lessonquestion: true
        }
    });
    
    // Auth failed or lesson not found
    if(!lessonObj || lessonObj.user_id !== user.id)
        return {
            redirect: {
                destination: '/dashboard',
                permanent: false,
            },
        };
    
        shuffle(lessonObj.lessonquestion);
    return {
        props: {
            lessonName: lessonObj.title,
            questions: lessonObj.lessonquestion
        }
    }
}

const Study = (props: props) => {

    const [side, setSide] = useState(false);

    const [currentQuestion, setCurrentQuestion] = useState(0);
         
    
    const handleSwitchSubmit = () => {
        console.log("Switch was pressed.");
        setSide(prevSide => !prevSide);
    }

    const handleDiffQuestion = (isNext: boolean) => {
        if(isNext && currentQuestion < props.questions.length - 1) {
            console.log("After Arrow was pressed.");
            setCurrentQuestion(currentQuestion + 1);
            setSide(false);
            return;
        }

        if (!isNext && currentQuestion > 0) {
            console.log("Before Arrow was pressed.");
            setCurrentQuestion(currentQuestion - 1);
            setSide(false);
        }
    }
    
    const handleResultSubmit = (attemptResult: boolean) => {
        console.log("Check Mark was pressed.");

        console.log(props.questions[currentQuestion].id);

        try {
            const questionid = props.questions[currentQuestion].id
            const fetchData = async () => {
                const response = await fetch(`/card/question/${questionid}`, { // Using template literals to inject the lessonId variable
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    attemptResult
                })
            });
            
            console.log(response);

            if (!response.ok) {
                throw new Error('Failed to fetch lesson data');
            }
            
            const lessonData = await response.json();
            console.log('Received lesson data:', lessonData);
            // Do something with the lesson data
            };
      
            fetchData();
        } catch (error) {
          console.error('Error fetching lesson:', error);
          // Show an error message or handle the error appropriately
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
                            {side ? props.questions[currentQuestion].answer : props.questions[currentQuestion].question}
                        </h2>
                    </div>
                </button>    
                
                <div className="flex">
                    <button onClick={()=>handleDiffQuestion(false)}>
                        <img src="/icons/beforearrow.png" className="rounded-lg mt-8 mr-16" title="Cross Mark" style={{ width: '50px', height: '30px' }}/>
                    </button>
                    <button onClick={()=>handleResultSubmit(true)}>
                        <img src="/icons/checkmark.jpg" className="rounded-lg mt-8 mr-16" title="Cross Mark" style={{ width: '50px', height: '50px' }}/>
                    </button>
                    <button onClick={()=>handleResultSubmit(false)}>
                        <img src="/icons/crossmark.jpg" className="rounded-lg mt-8" title="Check Mark" style={{ width: '50px', height: '50px' }}/>
                    </button>
                    <button onClick={()=>handleDiffQuestion(true)}>
                        <img src="/icons/nextarrow.png" className="rounded-lg mt-8 ml-16" title="Cross Mark" style={{ width: '50px', height: '30px' }}/>
                    </button>
                </div>
            </div>
        </main>
    );
}

export default Study;