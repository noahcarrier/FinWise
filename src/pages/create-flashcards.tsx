import React from 'react';
import Navbar from '../components/Navbar';
import "../app/globals.css";
import { getCacheFromPage } from '../libs/userManager';
import { NextPageContext } from 'next';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';
import Link from 'next/link';

type state = {
    questions: {question: string; answer: string;}[];
    title: string;
}
var cardNum = 0;
export default class CreateFlashcards extends React.Component<any, state> {
    questionInput = React.createRef<HTMLInputElement>();
    answerInput = React.createRef<HTMLInputElement>();
    cardBtn = React.createRef<HTMLButtonElement>();
    pubBtn = React.createRef<HTMLButtonElement>();

    

    constructor(props: any) {
        super(props);
        this.state = {
            questions: [],
            title: "",
        }
    }

    createCard = (question: string, answer: string, index: number) => {
        cardNum++;
        return (
            <div key ={index} className="bg-slate-100 rounded-lg p-4 mt-4 w-96 mx-auto" style={{maxWidth: "250px", minHeight: "150px"}}>
                <h2 id={`card-${cardNum}-question`} className= "question text-center text-gray-800 text-2xl font-bold mb-2">{question}</h2>
                <h2 id={`card-${cardNum}-answer`} className= "answer text-gray-800 text-lg mt-2">{answer}</h2>
            </div>
        )

    }

    addCard = () => {

        const question = this.questionInput.current;
        const answer = this.answerInput.current;

        if (!question || !answer || question.value.trim() === '' || answer.value.trim() === '') {
            toast.error("Please enter both a question and an answer.", {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            });
            return;
        }

        this.setState({ questions: [...this.state.questions, {question: question.value, answer: answer.value}] });

        question.value = '';
        answer.value = '';
    }
 
    publishBtn = async () => {
        try {
            const res = await fetch('/card/publish', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title: this.state.title, questions: this.state.questions })
            });

            if (!res.ok) {
                throw new Error('Failed to publish card');
            }
            const data = await res.json();
            console.log('Published successfully:', data);
        } catch (error) {
            console.error('Error publishing card:', error);
        }
    }

    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<state>, snapshot?: any): void {
        const addBtn = this.cardBtn.current;
        const publish = this.pubBtn.current;
        if (addBtn && publish) {
            if (this.state.questions.length === 0) {

                publish.style.display = 'none';
            } else {
                publish.style.display = 'block';

            }
        }
    }

    buildLesson = async () => {
        // Get the lesson title from state
        const lessonTitle = this.state.title.trim();
    
        // Validate lesson title
        if (!lessonTitle) {
            toast.error("Please enter a lesson title.", {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            });
            return;
        }
    
        // Create the lesson object using state data
        const lessonData = {
            title: lessonTitle,
            lessonCard: this.state.questions,
        };

    }
    
    
    render() {
        return (
            <>
                <main className="bg-gradient-to-b from-cyan-500 to-blue-700 min-h-screen">
                    <Navbar isAuthed={true} />
                    <div className='mt-8'>
                        <Link href="/create" className="ml-32 text-gray-800 text-lg font-bold bg-yellow-300 hover:bg-yellow-200 px-4 py-2 rounded-md shadow-md"> ← Go Back</Link>
                    </div>
    
                    {/* title */}
                    <div className="flex flex-col items-center mt-6 ">
                        <h1 className="text-white text-5xl font-bold">Create Flashcards</h1>
                    </div>

                    {/* create lesson title */}
                    <div className = "flex justify-center m-6">
                        <input placeholder="Enter a lesson title" style = {{width :'30%'}} className = "rounded-lg text-center text-black bg-yellow-100 pl-12 pr-12 pt-2 pb-2"></input>
                    </div>

                    {/* question and answer input */}
                    <div className="flex justify-center mt-6 mb-6">
                        <div className="bg-yellow-300 rounded-lg p-4 mr-4 shadow-lg">
                            <h2 className="text-gray-800 text-lg font-bold mb-2">Question</h2>
                            <input ref={this.questionInput} type="text" id="questionInput" className="text-gray-800 bg-yellow-100 border border-gray-300 placeholder-gray-400 rounded-md px-3 py-2 w-64" placeholder="Enter your question" />
                        </div>
                        <div className="bg-yellow-300 rounded-lg p-4 shadow-lg">
                            <h2 className="text-gray-800 text-lg font-bold mb-2">Answer</h2>
                            <input ref={this.answerInput} type="text" id="answerInput" className="text-gray-800 bg-yellow-100 border border-gray-300 rounded-md px-3 py-2 w-64" placeholder="Enter your answer" />
                        </div>
                    </div>
                    {/* add card button */}
                    <div className="flex justify-center mt-10">
                        <button onClick={this.addCard} ref={this.cardBtn} className="text-lg font-bold bg-yellow-300  hover:bg-yellow-200 text-gray-800 px-4 py-2 rounded-md shadow-md">Add Card</button>
                    </div>
                    {/* div for cards to be inserted into */}
                    <div id="createdCards" style={{display: "grid", gridTemplateColumns: "repeat(4, minmax(250px, 1fr))", gap: "0.5rem"}}>
                        {this.state.questions.map((card, index) => 
                            this.createCard(card.question, card.answer, index)  // Pass index to createCard
                        )}
                    </div>
    
                    {/* publish lesson button */}
                    <div className="flex justify-center mt-10">
                        <button id="publishButton" onClick={this.publishBtn} ref={this.pubBtn} className=" text-lg font-bold bg-yellow-300 hover:bg-yellow-200 text-gray-800 px-4 py-2 rounded-md hidden">Publish Lesson</button>
                    </div>
    
    
                </main>
                <ToastContainer
                    position="top-left"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                    transition={Bounce} // Pass Slide component as the value for the transition prop
                />
            </>
        );
    }
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