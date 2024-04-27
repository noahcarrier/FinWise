import React from 'react';
import Navbar from '../components/Navbar';
import "../app/globals.css";
import { getCacheFromPage } from '../libs/userManager';
import { NextPageContext } from 'next';
import { UserCircleIcon } from '@heroicons/react/24/solid';
/*import { createLesson } from '../libs/createFlashcards'; */ //@TODO: figure out where createLesson can be applied... - zhiyan114

type state = {
    questionsElement: JSX.Element[];
}


export default class CreateFlashCard extends React.Component<any, state>{
    questionInputRef = React.createRef<HTMLInputElement>();
    answerInputRef = React.createRef<HTMLInputElement>();
    titleInputRef = React.createRef<HTMLInputElement>();
    publishButtonRef = React.createRef<HTMLButtonElement>();

    constructor(props: any) {
        super(props);
        this.state = {
            questionsElement: []
        }
    }
    
    // show cards on page
    genCards = (question: string, answer: string) => {
        return (<div className="bg-white rounded-lg p-4 mt-4 w-96 mx-auto" style={{maxWidth: "250px", maxHeight: "150px"}}>
            <h2 className="text-gray-800 text-2xl font-bold mb-2">{question}</h2>
            <h2 className="text-gray-800 text-lg mt-2">{answer}</h2>
        </div>)
    }


    // addCard function, primarily role is to display the current set user wants to add
    // this is not considered to be cards actually being sent to DB until they are published
    addCard =  () => {
        const question = this.questionInputRef.current;
        const answer = this.answerInputRef.current;
    
        if (!question || !answer || question.value.trim() === '' || answer.value.trim() === '') {
            alert('Please enter both a question and an answer.');
            return;
        }
    
        console.log("Question: " + question.value);
        console.log("Answer: " + answer.value);

                        // call gen cards to physically display new cards on page for user
        const card = this.genCards(question.value, answer.value);
    
        // creating a grid for the cards to be displayed in as inserted
        this.setState({questionsElement: [...this.state.questionsElement, card]});
    
        question.value = '';
        answer.value = '';


    }

    buildLesson = () => {
        //@TODO: Edit this function to fit the current setup...
        const cards = document.getElementById('createdCards');
        if (cards) {
          const questions = cards.children;
          const lessonData: lessonData = {
            title: this.titleInputRef,
            userIdentity: {
              id: this.props.user.id
            },
            questions: []
          };
          for (let i = 0; i < questions.length; i++) {
            const question = questions[i].children[0].innerHTML;
            const answer = questions[i].children[1].innerHTML;
            lessonData.questions.push({ question, answer });
          }
          return lessonData;
        }
    }

    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<state>): void {
        // Unhide publish btn if there are cards
        const publishButton = this.publishButtonRef.current;
        if(publishButton)
            if(this.state.questionsElement.length > 0) 
                publishButton.style.display = 'block';
            else 
                publishButton.style.display = 'none';
    }

    render() {
        return (
            <main className="bg-gradient-to-b from-cyan-500 to-blue-700 min-h-screen">
                <Navbar isAuthed={true}/>
                <div className='mt-8'>
                    <a href="/create" className="ml-32 text-yellow-200 text-lg font-bold bg-blue-700 hover:bg-blue-600 text-white px-4 py-2 rounded-md"> ← Go Back</a>
                </div>
    
                {/* title */}
                <div className="flex flex-col items-center mt-6 ">
                    <h1 className="text-yellow-200 text-5xl font-bold">Create Flashcards</h1>
                </div>
                {/* enter name of lesson */}
                <div className="flex justify-center mt-6 mb-6 p-4 text-center">
                    <label htmlFor="lessonName"></label>
                    <input type="text" ref = {this.titleInputRef} style={{ width: "30%" }} id="lessonName" className="rounded-lg text-center text-black pt-2 pb-2" placeholder="Enter lesson name" />
                </div>
                {/* question and answer input */}
                <div className="flex justify-center mt-6 mb-6">
                    {/* enter question */}
                    <div className="bg-white rounded-lg p-4 mr-4">
                        <h2 className="text-gray-800 text-lg font-bold mb-2">Question</h2>
                        <input type="text" ref= {this.questionInputRef} id="questionInput" className="text-black border border-gray-300 rounded-md px-3 py-2 w-64" placeholder="Enter your question" />
                    </div>
                    {/* enter answer */}
                    <div className="bg-white rounded-lg p-4">
                        <h2 className="text-gray-800 text-lg font-bold mb-2">Answer</h2>
                        <input type="text" ref= {this.answerInputRef} id="answerInput" className="text-black border border-gray-300 rounded-md px-3 py-2 w-64" placeholder="Enter your answer" />
                    </div>
                </div>
                {/* add card button */}
                <div className="flex justify-center mt-10">
                    <button onClick={this.addCard} className="text-yellow-200 text-lg font-bold bg-blue-700 hover:bg-blue-600 text-white px-4 py-2 rounded-md">Add Card</button>
                </div>
                {/* div for cards to be inserted into */}
                <div id = "createdCards" style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(250px, 1fr))", gap: "0.5rem"}}>
                    {this.state.questionsElement}
                </div>
                
                {/* publish lesson button */}
                <div className="flex justify-center mt-10">
                <button id= "publishButton" onClick={this.buildLesson} ref={this.publishButtonRef} className="text-yellow-200 text-lg font-bold bg-blue-700 hover:bg-blue-600 text-white px-4 py-2 rounded-md hidden">Publish Lesson</button>
                </div>
            </main>
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
    
     // Ensure user object only contains JSON serializable data
     const serializableUser = {
        id: user.id,
    };

    /* Return anything you want from database query from here out */
    return {
        props: {
            user: serializableUser,
        }
    }
}